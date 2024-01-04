import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../Header";
// import MetaInfo from "../MetaInfo";
import LeftDrawer from "../LeftDrawer";
import LoginDialog from "../LoginDialog";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import GlobalLoading from "@/components/GlobalLoading";
import type { ICurrentPage, ISiteConfig } from "@/types/index";

const Root = styled("main")<{ disableTopPadding?: boolean }>(
	({ theme }) =>
		({ disableTopPadding }) => ({
			flexGrow: 1,
			paddingTop: disableTopPadding ? 0 : "70px",
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

class Layout extends React.Component<
	{
		siteConfig: ISiteConfig;
		currentPage: ICurrentPage;
		locale?: string;
		children: JSX.Element | JSX.Element[];
		menuItems: any[];
		enableFrame;
	},
	{
		LeftDrawerOpen: boolean;
		anchorEl: null | HTMLElement;
		loading: boolean;
		title: string;
		PageAction: () => JSX.Element;
	}
> {
	loading: any;
	constructor(props: any) {
		super(props);
		this.state = {
			LeftDrawerOpen: false,
			anchorEl: null,
			loading: true,
			title: "首页",
			PageAction: null,
		};
	}
	setAction = (Comp) => {
		this.setState({
			PageAction: Comp,
		});
	};
	componentDidMount() {
		window.loadShow = () => {
			window.loadingDelay = setTimeout(() => {
				this.setState({
					loading: true,
				});
				// toggleDisabled(true);
				delete window.loadingDelay;
			}, 700);
		};
		window.loadHide = () => {
			if (window.loadingDelay) {
				clearTimeout(window.loadingDelay);
				delete window.loadingDelay;
			} else {
				this.setState({
					loading: false,
				});
				// toggleDisabled(false);?
			}
		};
	}
	render() {
		const { PageAction } = this.state;
		const {
			currentPage,
			siteConfig,
			locale,
			children,
			menuItems,
			enableFrame,
		} = this.props;
		const { author, title } = siteConfig;
		const activeTitle = `${currentPage ? `${currentPage.title} - ` : ""}${
			title[locale]
		}`;

		const activeDescription =
			currentPage.description || siteConfig.description;

		const childrenWithProps = React.Children.map(children, (child) => {
			// checking isValidElement is the safe way and avoids a typescript error too
			const props = { setAction: this.setAction };
			if (React.isValidElement(child)) {
				return React.cloneElement(child, props);
			}
			return child;
		});

		return (
			<>
				<Head>
					<title>{activeTitle}</title>
					<meta
						name="keywords"
						content={siteConfig.keywords.join(",")}
					/>
					<meta
						itemProp="description"
						name="description"
						content={activeDescription}
					/>
					<meta itemProp="name" content="云极客工具" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={title} />
					<meta property="og:url" content={siteConfig.root} />
					<meta property="og:site_name" content={title} />
					<meta
						property="og:description"
						content={activeDescription}
					/>
					<meta property="og:locale" content="zh_CN" />
					<meta property="article:author" content={author.name} />
					<meta property="article:tag" content={author.name} />
					<meta property="article:tag" content="云极客" />
					<meta name="twitter:card" content={activeDescription} />
					<meta
						name="google-site-verification"
						content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
					/>
					<meta
						name="viewport"
						content="viewport-fit=cover,width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=no"
					/>
				</Head>
				<LoginDialog />
				{enableFrame && (
					<Header
						repo={siteConfig.repo}
						PageAction={PageAction}
						title={
							[].includes(currentPage.path)
								? ""
								: currentPage.title
						}
					/>
				)}
				<Box sx={{ display: "flex" }}>
					<CssBaseline />
					<LeftDrawer repo={siteConfig.repo} />
					<Root disableTopPadding={!enableFrame}>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							{childrenWithProps}
						</Box>
					</Root>
				</Box>
				<GlobalSnackbar />
				<GlobalLoading />
			</>
		);
	}
}

export default Layout;
