import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
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
import { Theme, useMediaQuery } from "@mui/material";

export async function getStaticProps({ locale = defaultLocale }) {
	let appData: any[];
	if (isCapacitor()) {
		appData = getAllApps(true);

		// Process icons for capacitor
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
	} else {
		// For web, only get apps for current locale to reduce initial payload
		appData = getAllApps(true, locale);
	}

	const dic = require("../data/i18n.json");
	const trans = new translator(dic, locale);

	// Write the full app data to public JSON file during build
	if (true) {
		const fs = require("fs");
		const path = require("path");
		const fullAppData = getAllApps(true);

		// Ensure the public/data directory exists
		const publicDir = path.join(process.cwd(), "public", "data");
		fs.mkdirSync(publicDir, { recursive: true });

		fs.writeFileSync(
			path.join(publicDir, "apps.json"),
			JSON.stringify(fullAppData)
		);
	}

	const pageProps = {
		currentPage: {
			title: trans.use("homePage.meta.title"),
			description: trans.use("homePage.meta.description"),
			path: "/",
			dicKey: "homePage.meta.title",
		},
		// We still need to pass down the app data for home page,
		// which is great for SEO
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

	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.only("xs"));

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
					{isXs && (
						<Grid
							size={{
								xs: 12,
							}}
						>
							<Search appData={localizedAppData} />
						</Grid>
					)}
					<Grid
						size={{
							xs: 12,
						}}
					>
						<Bookmark />
					</Grid>
					<Grid
						size={{
							xs: 12,
						}}
					>
						<AppList
							channelInfo={channelInfo}
							appData={localizedAppData}
						/>
					</Grid>
					<Grid
						size={{
							xs: 12,
						}}
					>
						<Tips />
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
});

Index.displayName = "Index";

export default Index;
