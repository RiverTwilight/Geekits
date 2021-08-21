import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;

		ctx.renderPage = () =>
			originalRenderPage({
				// useful for wrapping the whole react tree
				enhanceApp: (App) => App,
				// useful for wrapping in a per-page basis
				enhanceComponent: (Component) => Component,
			});

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx);
		// const config = await import(`../site.config.js`);

		return {
			...initialProps,
			// config: config.default,
		};
	}
	render() {
		// const { title, description, author } = this.props.config;
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					{/* <meta
						name="description"
						content="云极客工具，励志做最轻盈最好用的在线工具。以工匠精神打造功能丰富的在线工具，无需下载即可免费使用"
					/>
					<meta
						itemprop="description"
						name="description"
						content={config.description}
					/>
					<meta itemprop="name" content="云极客工具" />
					<meta
						name="keywords"
						content={config.keywords.join(",")}
					/> */}
					<link rel="icon" href="/public/image/favicon.ico" />
					<meta name="theme-color" content="#000000" />
					<link
						rel="apple-touch-icon"
						href="%PUBLIC_URL%/logo192.png"
					/>
					<meta name="renderer" content="webkit" />
					<meta name="force-rendering" content="webkit" />
					<meta
						httpEquiv="X-UA-Compatible"
						content="IE=edge,chrome=1"
					/>
					<script
						defer
						src="//hm.baidu.com/hm.js?29ab8ced8f951b925920356991531a45"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}


// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	// Render app and page and get the context of the page with collected side effects.
	const sheets = new ServerStyleSheets();
	const originalRenderPage = ctx.renderPage;

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
		});

	const initialProps = await Document.getInitialProps(ctx);

	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement(),
		],
	};
};

export default MyDocument
