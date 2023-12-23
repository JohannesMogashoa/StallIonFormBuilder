"use client";

import { formSchema, formSchemaType } from "@/schemas/form";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "./ui/use-toast";
import { CreateForm } from "@/actions/form";

const CreateFormButton = () => {
	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: formSchemaType) => {
		try {
			const formId = await CreateForm(values);
			toast({
				title: "Success",
				description: "Houston we have takeoff!",
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Oops! Houston we have a problem.",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={"outline"}
					className="group border border-primary/20 h-[190px] flex flex-col items-center justify-center hover:border-primary hover:cursor-pointer border-dashed gap-4"
				>
					<BsFileEarmarkPlus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
					<p className="text-xl font-bold text-muted-foreground group-hover:text-primary">
						Create new form
					</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create form</DialogTitle>
					<DialogDescription>
						Create a new form to start collecting responses
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-2"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={form.formState.isSubmitting}
						className="w-full mt-4"
					>
						{!form.formState.isSubmitting ? (
							<span>Save</span>
						) : (
							<ImSpinner2 className="animate-spin" />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateFormButton;
