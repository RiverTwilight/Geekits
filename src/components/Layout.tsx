import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Navbar";
// import MetaInfo from "../MetaInfo";
import Sidebar from "@/components/Sidebar";
import LoginDialog from "@/components/LoginDialog";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import GlobalLoading from "@/components/GlobalLoading";
import siteConfig from "../site.config.js";
import { SidebarProvider } from "@/contexts/sidebar";
import { ActionProvider } from "@/contexts/action";
import { AppBarProvider } from "@/contexts/appBar";

const Root = styled("main")<{ disableTopPadding?: boolean }>(
	({ theme }) =>
		({ disableTopPadding }) => ({
			flexGrow: 1,
			paddingTop: disableTopPadding
				? 0
				: "calc(var(--ion-safe-area-top) + 56px)",
			minHeight: "100vh",
			position: "relative",
		})
);

const GlobalSnackbar = () => {
	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
	const [snackbarConfig, setSnackbarConfig] = useState({
		message: "无消息",
	});
	useEffect(() => {
		window.snackbar = (config) => {
			setSnackbarConfig(config);
			setOpenSnackbar(true);
		};
	});
	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};
	return (
		<Snackbar
			{...snackbarConfig}
			open={openSnackbar}
			onClose={handleSnackbarClose}
		/>
	);
};

const Layout = ({ currentPage, children, enableFrame }) => {
	const [sidebar, setSidebar] = useState(true);
	const [appBar, setAppBar] = useState(true);
	const [loading, setLoading] = useState(true);
	const [action, setAction] = useState(null);

	useEffect(() => {
		window.loadShow = () => {
			window.loadingDelay = setTimeout(() => {
				setLoading(true);
				delete window.loadingDelay;
			}, 700);
		};

		window.loadHide = () => {
			if (window.loadingDelay) {
				clearTimeout(window.loadingDelay);
				delete window.loadingDelay;
			} else {
				setLoading(false);
			}
		};

		return () => {
			delete window.loadHide;
			delete window.loadShow;
		};
	}, []);

	const metaTitle = `${
		currentPage
			? `${currentPage.title} - ${siteConfig.title}`
			: siteConfig.title
	}`;

	const activeDescription = currentPage.description || siteConfig.description;

	return (
		<SidebarProvider value={{ sidebar: sidebar, setSidebar: setSidebar }}>
			<AppBarProvider value={{ appBar, setAppBar }}>
				<ActionProvider
					value={{ action: action, setAction: setAction }}
				>
					<Head>
						<link
							rel="alternate"
							href={`${siteConfig.root}/zh-CN`}
							hrefLang="zh-CN"
						></link>
						<link
							rel="alternate"
							href={`${siteConfig.root}/en-US`}
							hrefLang="en-US"
						></link>

						<title>{metaTitle}</title>
						<meta
							name="keywords"
							content={siteConfig.keywords.join(",")}
						/>
						<meta
							itemProp="description"
							name="description"
							content={activeDescription}
						/>
						<meta itemProp="name" content={metaTitle} />
						<meta property="og:type" content="website" />
						<meta property="og:title" content={metaTitle} />
						<meta property="og:url" content={siteConfig.root} />
						<meta
							property="og:site_name"
							content={siteConfig.title}
						/>
						<meta
							property="og:description"
							content={activeDescription}
						/>
						<meta property="og:locale" content={"zh_CN"} />
						<meta
							property="og:image"
							content="/image/general_og.png"
						/>
						<meta
							name="twitter:card"
							content="summary_large_image"
						/>
						<meta name="twitter:site" content="@YGeeker_Official" />
						<meta
							name="google-site-verification"
							content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
						/>
						<meta
							name="viewport"
							content="viewport-fit=cover,width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=no"
						/>

						<link
							rel="sitemap"
							type="application/xml"
							title="Sitemap"
							href="/sitemap.xml"
						/>
					</Head>
					<CssBaseline />
					<LoginDialog />
					{enableFrame && (
						<Header
							repo={siteConfig.repo}
							PageAction={action}
							title={
								[].includes(currentPage.path)
									? ""
									: currentPage.title
							}
						/>
					)}
					<Box sx={{ display: "flex" }}>
						<CssBaseline />
						<Root disableTopPadding={!enableFrame}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									marginTop: { xs: 0, sm: 2 },
								}}
							>
								<Sidebar />
								{children}
							</Box>
						</Root>
					</Box>
					<GlobalSnackbar />
					<GlobalLoading />
				</ActionProvider>
			</AppBarProvider>
		</SidebarProvider>
	);
};

export default Layout;
