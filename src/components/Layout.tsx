import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@/components/Navbar";
// import MetaInfo from "../MetaInfo";
import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import GlobalLoading from "@/components/GlobalLoading";
import siteConfig from "../site.config.js";
import { SidebarProvider } from "@/contexts/sidebar";
import { ActionProvider } from "@/contexts/action";
import { AppBarProvider } from "@/contexts/appBar";
import { AccountProvider } from "@/contexts/account";
import { createClient } from "@/utils/supabase/component";

const Root = styled("main")<{ disableTopPadding?: boolean }>(
	({ theme }) =>
		({ disableTopPadding }) => ({
			flexGrow: 1,
			paddingTop: disableTopPadding
				? 0
				: "calc(var(--ion-safe-area-top) + 56px)",
			minHeight: "100vh",
			// position: "relative",
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
	const [action, setAction] = useState(null);
	const [account, setAccount] = useState(null);
	const supabase = createClient();

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				console.log("***fetching");
				const { data, error } = await supabase
					.from("Account")
					.select("email, first_name, last_name, avatarUrl, uid")
					.eq("uid", user.id)
					.single();

				if (error) {
					console.error("Error fetching user data:", error);
				} else {
					setAccount({
						user,
						avatarUrl: data.avatarUrl,
						firstName: data.first_name,
						lastName: data.last_name,
					});
				}
			}
		};
		fetchUserData();
	}, []);

	const metaTitle = `${
		currentPage
			? `${currentPage.title} - ${siteConfig.appName}`
			: siteConfig.appName
	}`;

	const activeDescription = currentPage.description || siteConfig.description;

	return (
		<SidebarProvider value={{ sidebar: sidebar, setSidebar: setSidebar }}>
			<AppBarProvider value={{ appBar, setAppBar }}>
				<ActionProvider
					value={{ action: action, setAction: setAction }}
				>
					<Head>
						<title>{metaTitle}</title>
						<meta charSet="utf-8" />
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1, user-scalable=no"
						/>
						<meta name="description" content={activeDescription} />
						<meta
							name="keywords"
							content={siteConfig.keywords.join(",")}
						/>
						<meta name="author" content={siteConfig.author.name} />

						<link
							rel="canonical"
							href={`${siteConfig.root}${currentPage.path}`}
						/>
						<link
							rel="alternate"
							href={`${siteConfig.root}/zh-CN`}
							hrefLang="zh-CN"
						/>
						<link
							rel="alternate"
							href={`${siteConfig.root}/en-US`}
							hrefLang="en-US"
						/>

						<meta property="og:title" content={metaTitle} />
						<meta
							property="og:description"
							content={activeDescription}
						/>
						<meta property="og:type" content="website" />
						<meta
							property="og:url"
							content={`${siteConfig.root}${currentPage.path}`}
						/>
						<meta
							property="og:site_name"
							content={siteConfig.appName}
						/>
						<meta
							property="og:image"
							content={`${siteConfig.root}/image/general_og.png`}
						/>
						<meta property="og:locale" content="zh_CN" />

						<meta
							name="twitter:card"
							content="summary_large_image"
						/>
						<meta name="twitter:site" content="@YGeeker_Official" />
						<meta name="twitter:title" content={metaTitle} />
						<meta
							name="twitter:description"
							content={activeDescription}
						/>
						<meta
							name="twitter:image"
							content={`${siteConfig.root}/image/general_og.png`}
						/>

						<meta
							name="google-site-verification"
							content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
						/>

						<link
							rel="sitemap"
							type="application/xml"
							title="Sitemap"
							href="/sitemap.xml"
						/>
					</Head>
					<CssBaseline />
					<AccountProvider value={{ account, setAccount }}>
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
					</AccountProvider>
					<GlobalSnackbar />
					<GlobalLoading />
				</ActionProvider>
			</AppBarProvider>
		</SidebarProvider>
	);
};

export default Layout;
