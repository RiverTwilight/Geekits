import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export async function getStaticProps() {
	const dic = require("../data/i18n.json");

	const pageProps = {
		currentPage: {
			title: "500",
			path: "/",
		},
		dic: JSON.stringify(dic),
	};

	return {
		props: pageProps,
	};
}

export default function Custom500() {
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			justifyContent="center"
		>
			<Image
				alt="Illustration of a 500 page"
				height="200"
				width="200"
				src="/illustration/undraw_server_down.svg"
			/>
			<Typography variant="h4">内部服务器错误</Typography>
			<Typography variant="body1">
				哎呀，发生了一些问题！请稍后再试。
			</Typography>
			<br />
			<Link href="/">
				<Button variant="outlined">返回首页</Button>
			</Link>
		</Box>
	);
}
