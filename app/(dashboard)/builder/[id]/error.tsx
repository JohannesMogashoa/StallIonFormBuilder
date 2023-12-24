"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error }) => {
	useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full">
			<h2 className="text-4xl text-destructive">
				Houston we have a problem!
			</h2>
			<Button asChild>
				<Link href={"/"}>Go back home</Link>
			</Button>
		</div>
	);
};

export default ErrorPage;
