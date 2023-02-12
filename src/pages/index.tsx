import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppList from "@/components/AppList";
import Board from "@/components/Board";
import Search from "@/components/SearchBox";
import Tips from "@/components/Tips";
import Bookmark from "@/components/Bookmark";
import { getAllApps } from "@/utils/appData";
import channelInfo from "@/data/channelInfo";
import translator from "@/utils/translator";

export async function getStaticProps({ locale }) {
	const appData = getAllApps(true);

	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "云极客工具",
				// title: trans.use("homePage.meta.title"),
				description: trans.use("homePage.meta.description"),
				path: "/",
			},
			appData: appData.filter((app) => app.status !== "alpha"),
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
}

export function MenuButton() {
	return <button>test</button>;
}

// TODO 移动端头部添加搜索按钮以聚焦搜索框
export default function Index({ appData, setAction }: any) {
	useEffect(() => {
		setAction(() => {
			return null;
		});
	}, []);

	return (
		<Box
			sx={{
				flexGrow: 1,
				maxWidth: "1400px",
				margin: "0 auto",
				paddingX: 2,
				paddingBottom: 10,
			}}
		>
			<Grid container direction="row-reverse" spacing={1}>
				<Grid item xs={12} md={3}>
					<Board />
				</Grid>
				<Grid item xs={12} md={9}>
					<Search appData={appData} />
					<br />
					<Bookmark />
					<br />
					<AppList channelInfo={channelInfo} appData={appData} />
					<br />
					<Tips />
				</Grid>
			</Grid>
		</Box>
	);
}
