import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppList from "@/components/AppList";
import Search from "@/components/SearchBox";
import Tips from "@/components/Tips";
import Bookmark from "@/components/Bookmark";
import { getAllApps } from "@/utils/appData";
import channelInfo from "@/data/channelInfo";
import translator from "@/utils/translator";
import { useAction } from "@/contexts/action";

export async function getStaticProps({ locale }) {
	const appData = getAllApps(true);

	const dic = require("../data/i18n.json");

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

export default function Index({ appData }: any) {
	const { setAction } = useAction();

	useEffect(() => {
		setAction(null);
	}, []);

	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingX: { sm: 4, xs: 3 },
				paddingY: { sm: 3, xs: 3 },
				marginX: { sm: 4, xs: 0 },
				background: (theme) => theme.palette.background.paper,
				borderRadius: { xs: "0px", sm: "24px" },
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					maxWidth: "1180px",
				}}
			>
				<Grid container direction="row-reverse" spacing={1}>
					<Grid item xs={12} md={12}>
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
		</Box>
	);
}
