import { useRecoilValue, useSetRecoilState } from "recoil";
import Widget from "../components/Widget";

// 创建component映射表【当前只有widget】
export function DiffComponent(atom, dragEnd) {
  const { id, component, position } = useRecoilValue(atom);
  const changeAtom = useSetRecoilState(atom);
	const widgetProps = {
		id,
		position,
		key: component + id,
		dragEnd,
		dragItem: {
			component,
			item: { id, position },
			func: (newVal) => changeAtom((old) => ({ ...old, position:newVal })),
		},
	};
	switch (component) {
		case "Widget":
			return <Widget {...widgetProps} />;
		default:
			break;
	}
}
