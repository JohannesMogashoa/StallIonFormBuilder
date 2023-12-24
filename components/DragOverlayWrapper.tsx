import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { ElementsType, FormElements } from "./FormElements";
import React, { useState } from "react";

import { SidebarBtnElementDragOverlay } from "./SidebarBtnElement";

const DragOverlayWrapper = () => {
	const [draggedItem, setDraggedItem] = useState<Active | null>(null);
	useDndMonitor({
		onDragStart: (event) => {
			setDraggedItem(event.active);
		},
		onDragCancel: () => {
			setDraggedItem(null);
		},
		onDragEnd: () => {
			setDraggedItem(null);
		},
	});

	let node = <div></div>;
	const isDesignerBtnElement =
		draggedItem?.data?.current?.isDesignerBtnElement;

	if (isDesignerBtnElement) {
		const type = draggedItem?.data?.current?.type as ElementsType;
		node = (
			<SidebarBtnElementDragOverlay formElement={FormElements[type]} />
		);
	}

	return <DragOverlay>{node}</DragOverlay>;
};

export default DragOverlayWrapper;
