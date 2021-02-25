import {
	atom,
} from "recoil";
import { configData } from "../api";

const InitalWidgetAtom = (config) => {
	const allWidgetAtoms = {};
	for (let component in config) {
		for (let id in config[component]) {
			const key = component + id;
			allWidgetAtoms[key] = atom({
				key,
				default: { position:{...config[component][id]}, component, id },
			});
		}
	}
	const renderWidget = Object.values(allWidgetAtoms);
	return { allWidgetAtoms, renderWidget };
};

export const InitalData = async (userid) => {
	// 通过userID 获取对应 config 数据
	const config = await configData(userid);
	// 初始化所有组件的atmoFamily&渲染所有组件
	const { allWidgetAtoms, renderWidget } = InitalWidgetAtom(config);

	// 重新渲染单个组件
	// const reRenderWidget = selectorFamily({
	//   key: 'renderWidget',
	//   get: (component,item) => ({get}) => {
	//     get(allWidgetAtoms[component])
	//   }
	// })

	// 添加组件
	const addWidget = (component, item) => {
		const detail = config[component];
		const { id, position } = item;
		if (detail) {
			detail[id] = position;
		} else {
			config[component] = {
				[id]: position,
			};
		}
		const key = component + id;
		allWidgetAtoms[key] = atom({
			key,
			default: { ...position, component, id },
		});
	};
	// 操作组件
	const modifyWidget = (component, item) => {
		const detail = config[component];
		if (!detail) {
			addWidget(component, item);
		} else {
			const { id, position } = item;
			detail[id] = position;
		}
	};
	// 删除组件
	const deleteWidget = (component, { id }) => {
		const detail = config[component];
		const key = component + id;
		delete detail.id;
		delete allWidgetAtoms[key];
	};

	return {
		addWidget,
		modifyWidget,
		deleteWidget,
		renderWidget,
	};
};
