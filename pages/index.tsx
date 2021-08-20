import React, { useEffect } from "react";
import AppList from "../components/AppList";
import Search from "../components/Search";
import FivList from "../components/FivList";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import getAllApps from "../utils/getAllApps";

export async function getStaticProps({ locale, locales }) {

	const appData = getAllApps(
		{},
		require.context("../posts", true, /\.md$/),
		true
	);


	return {
		props: {
			currentPage: {
				title: "首页",
				path: "/",
			},
			locale,
			appData
		},
	};
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
export default function Index({ appData }: any) {
	const classes = useStyles();
	useEffect(() => {
		window.setHeaderButton(null);
		window.updateTitle();
	}, [props]);

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item sm={9} xs={12}>
					<Search />
					<br />
					<FivList />
					<br />
					<AppList appData={appData} />
				</Grid>
				{/* <Grid item sm={3}>
					fdsf
				</Grid> */}
			</Grid>
		</div>
	);
}
