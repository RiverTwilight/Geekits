import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import AppList from "@/components/AppList";
import Search from "@/components/SearchBox";
import FivList from "@/components/FivList";
import Board from "@/components/Board";
import { getAllApps } from "@/utils/appData";
import translator from "@/utils/translator";

export async function getStaticProps({ locale }) {
	const appData = getAllApps(true);

	const dic = require("../data/i18n/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: trans.use("homePage.meta.title"),
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

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
}));

// TODO 移动端头部添加搜索按钮以聚焦搜索框
export default function Index({ appData, setAction }: any) {
	const classes = useStyles();

	useEffect(() => {
		setAction(() => {
			return null;
		});
	}, []);

	return (
		<div className={classes.root}>
			<Grid container direction="row-reverse" spacing={1}>
				<Grid item xs={12} md={3}>
					<Board />
				</Grid>
				<Grid item xs={12} md={9}>
					<Search appData={appData} />
					<br />
					<FivList />
					<br />
					<AppList appData={appData} />
				</Grid>
			</Grid>
		</div>
	);
}
