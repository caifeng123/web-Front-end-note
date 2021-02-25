import React, { useRef, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// import {widgets} from '../stores/widgets'
import { InitalData, getDetailWidget } from "../stores";
import CarveItem from "./CarveItem";

const MoveCarve = () => {
	const carveRef = useRef();
	const allFunc = useRef();
	const [widgetAtoms, setWidgetAtoms] = useState([]);

	useEffect(() => {
		const getData = async (userId) => {
			const {
				addWidget,
				modifyWidget,
				deleteWidget,
				renderWidget,
			} = await InitalData(userId);
			setWidgetAtoms(renderWidget);
			allFunc.current = {
				addWidget,
				modifyWidget,
				deleteWidget,
			};
		};
		getData("cc");
	}, []);

    const dragEnd = (e, { component, item ,func}) => {
		const { modifyWidget } = allFunc.current;
		const { id, position } = item;
		const { x, y } = position;
        const { layerX, layerY } = e.nativeEvent;
		const { clientWidth, clientHeight } = carveRef.current;
		let percentX = +x.slice(0, -1) + (layerX / clientWidth) * 100;
		let percentY = +y.slice(0, -1) + (layerY / clientHeight) * 100;
		if (percentX < 0) {
			percentX = 0;
		}
		if (percentX > 100) {
			percentX = 100;
		}
		if (percentY < 0) {
			percentY = 0;
		}
		if (percentY > 100) {
			percentY = 100;
        }
		const newPosition = {
            x: percentX + "%",
            y: percentY + "%"
        }
        func(newPosition)
		modifyWidget(component, {id,position:newPosition});
    };
	return (
		<div style={{ flex: 2, position: "relative" }} ref={carveRef}>
			<CarveItem atoms={widgetAtoms} dragEnd = {dragEnd} />
		</div>
	);
};

export default MoveCarve;
