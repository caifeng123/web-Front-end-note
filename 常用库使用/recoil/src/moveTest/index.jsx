import React from "react";
import {RecoilRoot} from 'recoil'
import Item from "./component/Item";
import { getAllItemId, getItemState } from "./store";

const Index = () => {
	const ids = getAllItemId();
	return (
		<RecoilRoot>
			<div>
				<button onClick={() => getItemState(Math.random())}>++</button>
				<div style={{ position: "relative" }}>
					{ids.map((id) => (
						<Item id={id} />
					))}
				</div>
			</div>
		</RecoilRoot>
	);
};

export default Index;
