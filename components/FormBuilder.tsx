"use client";

import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import SaveFormBtn from "./SaveFormBtn";
import PublishFormBtn from "./PublishFormBtn";
import Designer from "./Designer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
	return (
		<DndContext>
			<main className="flex flex-col w-full">
				<nav className="flex items-center justify-between gap-3 p-4 border-b-2">
					<h2 className="font-medium truncate">
						<span className="mr-2 text-muted-forground">
							Form:{" "}
						</span>
						{form.name}
					</h2>
					<div className="flex items-center gap-2">
						<PreviewDialogBtn />
						{!form.published && (
							<>
								<SaveFormBtn />
								<PublishFormBtn />
							</>
						)}
					</div>
				</nav>
				<div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
					<Designer />
				</div>
			</main>
			<DragOverlayWrapper />
		</DndContext>
	);
};

export default FormBuilder;
