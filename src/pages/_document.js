import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { apiConfig, appstore, playstore } from "../site.config";

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

		return {
			...initialProps,
		};
	}
	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="apple-itunes-app"
						content={`app-id=${appstore.appId}`}
					/>
					<meta
						name="google-play-app"
						content={`app-id=${playstore.appId}`}
					/>
					<link
						rel="apple-touch-icon"
						sizes="57x57"
						href="/logo/v3/apple-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="60x60"
						href="/logo/v3/apple-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="72x72"
						href="/logo/v3/apple-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href="/logo/v3/apple-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="/logo/v3/apple-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="/logo/v3/apple-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="/logo/v3/apple-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="/logo/v3/apple-icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/logo/v3/apple-icon-180x180.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="/logo/v3/android-icon-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/logo/v3/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="96x96"
						href="/logo/v3/favicon-96x96.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/logo/v3/favicon-16x16.png"
					/>

					<link rel="icon" href="/logo/v3/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<meta
						http-equiv="Content-Security-Policy"
						content="object-src 'none'; base-uri 'none'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: http: 'nonce-${nonce}'; 'strict-dynamic';"
					/>

					<meta
						name="theme-color"
						media="(prefers-color-scheme: light)"
						content="#ededf4"
					/>
					<meta
						name="theme-color"
						media="(prefers-color-scheme: dark)"
						content="#1d2023"
					/>
					<meta name="renderer" content="webkit" />
					<meta name="force-rendering" content="webkit" />
					<meta
						httpEquiv="X-UA-Compatible"
						content="IE=edge,chrome=1"
					/>
					<link rel="dns-prefetch" href={apiConfig.url} />
					<link rel="preconnect" href={apiConfig.url} crossOrigin />
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
// MyDocument.getInitialProps = async (ctx) => {
// 	// Resolution order
// 	//
// 	// On the server:
// 	// 1. app.getInitialProps
// 	// 2. page.getInitialProps
// 	// 3. document.getInitialProps
// 	// 4. app.render
// 	// 5. page.render
// 	// 6. document.render
// 	//
// 	// On the server with error:
// 	// 1. document.getInitialProps
// 	// 2. app.render
// 	// 3. page.render
// 	// 4. document.render
// 	//
// 	// On the client
// 	// 1. app.getInitialProps
// 	// 2. page.getInitialProps
// 	// 3. app.render
// 	// 4. page.render

// 	// Render app and page and get the context of the page with collected side effects.
// 	const sheets = new ServerStyleSheets();
// 	const originalRenderPage = ctx.renderPage;

// 	ctx.renderPage = () =>
// 		originalRenderPage({
// 			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
// 		});

// 	const initialProps = await Document.getInitialProps(ctx);

// 	return {
// 		...initialProps,
// 		// Styles fragment is rendered after the app and page rendering finish.
// 		styles: [
// 			<React.Fragment key="styles">
// 				{initialProps.styles}
// 				{sheets.getStyleElement()}
// 			</React.Fragment>,
// 		],
// 	};
// };

export default MyDocument;
