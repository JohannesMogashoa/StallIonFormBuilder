import Link from "next/link";
import React from "react";

const Logo = () => {
	return (
		<Link
			href={"/"}
			className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text hover:cursor-pointer"
		>
			Stallion FormBuilder
		</Link>
	);
};

export default Logo;
