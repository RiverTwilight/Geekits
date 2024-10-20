import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AppList from "@/components/AppGallery";
import Search from "@/components/SearchBox";
import Tips from "@/components/Tips";
import Bookmark from "@/components/Bookmark";
import { getAllApps } from "@/utils/appData";
import channelInfo from "@/data/channelInfo";
import translator from "@/utils/translator";
import { useAction } from "@/contexts/action";
import { defaultLocale } from "src/site.config";
import { useLocale } from "@/contexts/locale";
import { isCapacitor } from "@/utils/platform";
import fetch from "node-fetch";

export async function getStaticProps({ locale = defaultLocale }) {
	const appData = getAllApps(true, locale);

	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	if (isCapacitor()) {
		await Promise.all(
			appData.map(async (app) => {
				if (app.icon && app.icon.startsWith("/api/")) {
					try {
						const iconUrl = `http://localhost:3000${app.icon}`;
						const response = await fetch(iconUrl);
						const arrayBuffer = await response.arrayBuffer();
						const buffer = Buffer.from(arrayBuffer);
						const base64 = buffer.toString("base64");
						const mimeType = response.headers.get("content-type");
						app.icon = `data:${mimeType};base64,${base64}`;
					} catch (error) {
						console.error(
							`Failed to convert icon to base64 for app ${app.id}:`,
							error
						);
					}
				}
			})
		);
	}

	const pageProps = {
		currentPage: {
			title: trans.use("homePage.meta.title"),
			description: trans.use("homePage.meta.description"),
			path: "/",
			dicKey: "homePage.meta.title",
		},
		appData: appData.filter((app) => app.status !== "alpha"),
		dic: JSON.stringify(dic),
		locale,
	};

	return {
		props: pageProps,
	};
}

const Index = React.memo(({ appData }: any) => {
	const { setAction } = useAction();
	const { locale } = useLocale();

	useEffect(() => {
		setAction(null);
	}, []);

	const localizedAppData = useMemo(
		() => appData.filter((app) => app.locale === locale),
		[locale]
	);

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
				<Grid container direction="row-reverse" spacing={2}>
					<Grid item xs={12}>
						<Search appData={localizedAppData} />
					</Grid>
					<Grid item xs={12}>
						<Bookmark />
					</Grid>
					<Grid item xs={12}>
						<AppList
							channelInfo={channelInfo}
							appData={localizedAppData}
						/>
					</Grid>
					<Grid item xs={12}>
						<Tips />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
});

Index.displayName = "Index";

export default Index;
