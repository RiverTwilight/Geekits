import React, { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../Header";
import LeftDrawer from "../LeftDrawer";
import LoginDialog from "../LoginDialog";
import { ICurrentPage, ISiteConfig } from "../../types";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
	createStyles,
	Theme,
	withStyles,
	makeStyles,
} from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		loading: {
			position: "fixed",
			top: 0,
			width: "100%",
			zIndex: 1101,
		},
	})
);

const styles = (theme: Theme) => {
	return createStyles({
		root: {
			display: "flex",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(2),
			paddingTop: "75px",
			minHeight: "100vh",
			position: "relative",
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
	});
};

/**
 * 全局snackbar
 */
const GlobalSnackbar = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
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

/**
 * 全局Loading
 */
const GlobalLoading = () => {
	const [loading, setLoading] = useState(false);
	const classes = useStyles();
	useEffect(() => {
		window.loadShow = () => {
			setLoading(true);
		};
		window.loadHide = () => {
			setLoading(false);
		};
	});
	if (loading) {
		return <LinearProgress color="primary" className={classes.loading} />;
	}
	return null;
};

class Layout extends React.Component<
	{
		siteConfig: ISiteConfig;
		currentPage: ICurrentPage;
		locale?: string;
		children: JSX.Element | JSX.Element[];
		menuItems: any[];
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
			classes,
			children,
			menuItems,
		} = this.props;
		const { author, title } = siteConfig;
		const showTitle = `${currentPage ? `${currentPage.title} - ` : ""}${
			title[locale]
		}`;
		const showDescription =
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
					<meta name="description" content={showDescription} />
					<meta
						name="keywords"
						content={siteConfig.keywords.join(",")}
					/>
					<meta
						itemProp="description"
						name="description"
						content={showDescription}
					/>
					<meta itemProp="name" content="云极客工具" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content={showTitle} />
					<meta property="og:url" content={siteConfig.root} />
					<meta property="og:site_name" content={showTitle} />
					<meta property="og:description" content={showDescription} />
					<meta property="og:locale" content="zh_CN" />
					<meta property="article:author" content={author.name} />
					<meta property="article:tag" content={author.name} />
					<meta property="article:tag" content="云极客" />
					<meta name="twitter:card" content={showDescription} />
					<meta
						name="google-site-verification"
						content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
					/>
					<meta name="viewport" content="viewport-fit=cover" />
					<meta
						name="viewport"
						content="width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=0"
					/>
					<title>{showTitle}</title>
				</Head>
				<div className={classes.root}>
					<CssBaseline />
					<LoginDialog />
					<Header PageAction={PageAction} title={currentPage.title} />
					<LeftDrawer />
					<main className={classes.content}>{childrenWithProps}</main>
				</div>
				<GlobalSnackbar />
				<GlobalLoading />
			</>
		);
	}
}

export default withStyles(styles)(Layout);
