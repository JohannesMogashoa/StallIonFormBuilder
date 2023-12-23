import { GetFormStats, GetForms } from "@/actions/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

export default function Home() {
	return (
		<div className="container pt-4">
			<Suspense fallback={<StatsCards loading={true} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className="my-6" />
			<h2 className="col-span-2 text-4xl font-bold">Your forms</h2>
			<Separator className="my-6" />
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				<CreateFormButton />
				<Suspense
					fallback={[1, 2, 3, 4].map((el) => (
						<FormCardSkeleton key={el} />
					))}
				>
					<FormCards />
				</Suspense>
			</div>
		</div>
	);
}

async function CardStatsWrapper() {
	const stats = await GetFormStats();

	return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
	data?: Awaited<ReturnType<typeof GetFormStats>>;
	loading: boolean;
}

function StatsCards(props: StatsCardProps) {
	const { data, loading } = props;

	return (
		<div className="grid w-full grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				icon={<LuView className="text-blue-600" />}
				helperText="All time form visits"
				value={data?.visits.toLocaleString() || ""}
				loading={loading}
				className="shadow-md shadow-blue-600"
			/>
			<StatsCard
				title="Total submissions"
				icon={<FaWpforms className="text-yellow-600" />}
				helperText="All time form submissions"
				value={data?.submissions.toLocaleString() || ""}
				loading={loading}
				className="shadow-md shadow-yellow-600"
			/>
			<StatsCard
				title="Submission rate"
				icon={<HiCursorClick className="text-green-600" />}
				helperText="Visits that result in form submission"
				value={data?.submissionRate.toLocaleString() + "%" || ""}
				loading={loading}
				className="shadow-md shadow-green-600"
			/>
			<StatsCard
				title="Bounce rate"
				icon={<TbArrowBounce className="text-red-600" />}
				helperText="Visits that leave without interacting"
				value={data?.bounceRate.toLocaleString() + "%" || ""}
				loading={loading}
				className="shadow-md shadow-red-600"
			/>
		</div>
	);
}

function StatsCard({
	title,
	value,
	icon,
	helperText,
	loading,
	className,
}: {
	title: string;
	value: string;
	helperText: string;
	loading: boolean;
	icon: ReactNode;
	className: string;
}) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{loading && (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
					)}
					{!loading && value}
				</div>
				<p className="pt-1 text-xs text-muted-foreground">
					{helperText}
				</p>
			</CardContent>
		</Card>
	);
}

const FormCardSkeleton = () => {
	return <Skeleton className="border-2 border-primary/20 h-[190px] w-full" />;
};

const FormCards = async () => {
	const forms = await GetForms();

	return (
		<>
			{forms.map((form) => (
				<FormCard key={form.id} form={form} />
			))}
		</>
	);
};

const FormCard = ({ form }: { form: Form }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between gap-2">
					<span>{form.name}</span>
					{form.published ? (
						<Badge>Published</Badge>
					) : (
						<Badge variant="destructive">Draft</Badge>
					)}
				</CardTitle>
			</CardHeader>
		</Card>
	);
};
