import React, { useEffect } from "react";
import AppList from "../components/AppList";
import Search from "../components/Search";
import FivList from "../components/FivList";
import Board from "../components/Board";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

export async function getStaticProps({ locale }) {
	// locale = "en-US"

	const appData = require("../data/i18n/" + locale + "/appData.ts").default;

	const pageDic = require("../data/i18n/" + locale + "/page.js")["/"];

	return {
		props: {
			currentPage: {
				title: pageDic.title,
				path: "/",
			},
			locale,
			appData,
			pageDic,
		},
	};
}

export function MenuButton() {
	return <button>test</button>;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		icon: {
			color: "rgba(255, 255, 255, 0.54)",
		},
	})
);

type IndexState = any;

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
				<Grid item xs={12} sm={3}>
					<Board />
				</Grid>
				<Grid item sm={9} xs={12}>
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
