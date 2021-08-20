import React from "react";
import Head from "next/head";
import Header from "../Header";
import { ICurrentPage, ISiteConfig } from "../../types";

const Layout = (props: {
	/**网站配置 */
	siteConfig: ISiteConfig;
	/**全部文章 */
	allPosts: ISiteConfig[];
	/** 当前页面 */
	currentPage: ICurrentPage;
	/**目录 */
	catalog?: any[];
	locale?: string;
	children: JSX.Element | JSX.Element[];
	menuItems: any[];
}) => {
	const { currentPage, siteConfig, locale, children, menuItems } = props;
	const { author, title } = siteConfig;
	const showTitle = `${currentPage ? `${currentPage.title} - ` : ""}${title}`;
	const showDescription = currentPage.description || siteConfig.description;
	// const childrenWithProps = React.Children.map(props.children, (child) => {
	// 	// checking isValidElement is the safe way and avoids a typescript error too
	// 	const props = { locale };
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, props);
	// 	}
	// 	return child;
	// });
	return (
		<>
			<Head>
				<meta name="description" content={showDescription} />
				<meta name="keywords" content={siteConfig.keywords.join(",")} />
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
			<Header
				handleLeftDrawerOpen={() => {
					this.setState({
						LeftDrawerOpen: true,
					});
				}}
				open={LeftDrawerOpen}
				title={currentPage.title}
			/>
			<LeftDrawer handleLoginOpen={() => {}} />
			<main className={classes.content}>{children}</main>
		</>
	);
};

export default Layout;
