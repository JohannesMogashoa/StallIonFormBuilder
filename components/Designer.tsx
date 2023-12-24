"use client";

import {
	DragEndEvent,
	useDndMonitor,
	useDraggable,
	useDroppable,
} from "@dnd-kit/core";
import {
	ElementsType,
	FormElementInstance,
	FormElements,
} from "./FormElements";
import React, { useState } from "react";

import { BiSolidTrash } from "react-icons/bi";
import { Button } from "./ui/button";
import DesignerSidebar from "./DesignerSidebar";
import { cn } from "@/lib/utils";
import { idGenerator } from "@/lib/idGenerator";
import useDesigner from "./hooks/useDesigner";

const Designer = () => {
	const { elements, addElement } = useDesigner();

	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		},
	});

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event;

			if (!active || !over) return;

			const isDesignerBtnElement =
				active.data?.current?.isDesignerBtnElement;

			if (isDesignerBtnElement) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(
					idGenerator()
				);

				addElement(0, newElement);
			}
		},
	});

	return (
		<div className="flex w-full h-full">
			<div className="w-full p-4">
				<div
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
						droppable.isOver && "ring-2 ring-primary/20"
					)}
				>
					{!droppable.isOver && elements.length === 0 && (
						<p className="flex items-center flex-grow text-3xl font-bold text-muted-foreground">
							{" "}
							Drop here...
						</p>
					)}
					{droppable.isOver && (
						<div className="w-full p-4">
							<div className="h-[120px] rounded-md bg-primary/20"></div>
						</div>
					)}

					{elements.length > 0 && (
						<div className="flex flex-col w-full gap-2 p-4">
							{elements.map((el) => (
								<DesignerElementWrapper
									key={el.id}
									element={el}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	);
};

const DesignerElementWrapper = ({
	element,
}: {
	element: FormElementInstance;
}) => {
	const { removeElement } = useDesigner();

	const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

	const topHalf = useDroppable({
		id: element.id + "-top",
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	});
	const bottomHalf = useDroppable({
		id: element.id + "-bottom",
		data: {
			type: element.type,
			elementId: element.id,
			isBottomHalfDesignerElement: true,
		},
	});

	const DesignerElement = FormElements[element.type].designerComponent;

	const draggable = useDraggable({
		id: element.id + "-drag-handler",
		data: {
			type: element.type,
			elementId: element.id,
			isDesignerElement: true,
		},
	});

	if (draggable.isDragging) return null;

	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
			className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
			onMouseEnter={() => setMouseIsOver(true)}
			onMouseLeave={() => setMouseIsOver(false)}
		>
			<div
				ref={topHalf.setNodeRef}
				className="absolute w-full h-1/2 rounded-t-md"
			></div>
			<div
				ref={bottomHalf.setNodeRef}
				className="absolute bottom-0 w-full h-1/2 rounded-b-md"
			></div>
			{mouseIsOver && (
				<>
					<div className="absolute right-0 h-full">
						<Button
							className="flex justify-center h-full bg-red-500 border rounded-md rounded-l-none"
							variant={"outline"}
							onClick={() => {
								removeElement(element.id);
							}}
						>
							<BiSolidTrash className="w-6 h-6" />
						</Button>
					</div>
					<div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 animate-pulse">
						<p className="text-sm text-muted-foreground">
							Click for properties or drag to move
						</p>
					</div>
				</>
			)}
			{topHalf.isOver && (
				<div className="absolute top-0 w-full rounded-md rounded-b-none h-[7px] bg-primary" />
			)}
			{bottomHalf.isOver && (
				<div className="absolute bottom-0 w-full rounded-md rounded-t-none h-[7px] bg-primary" />
			)}
			<div
				className={cn(
					"flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
					mouseIsOver && "opacity-10"
				)}
			>
				<DesignerElement elementInstance={element} />
			</div>
		</div>
	);
};

export default Designer;
