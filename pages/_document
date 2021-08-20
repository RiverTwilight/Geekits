import Document, { Html, Head, Main, NextScript } from "next/document";
// SEO 问题
export default class extends Document {
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
