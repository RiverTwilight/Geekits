import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import Text from "@/components/i18n";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { store as frameStore } from "@/utils/Data/frameState";
import useMediaQuery from "@mui/material/useMediaQuery";
import siteConfig from "../site.config.js";
import type { AppProps } from "next/app";
import "./App.css";

function MyApp({ Component, pageProps }: AppProps) {
	const [dark, setDark] = useState(false);
	const [framed, setFramed] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("dark")) {
			setDark(!!localStorage.getItem("dark"));
		}

		window.setDark = (state) => {
			setDark(state);
		};

		console.log("Some global functions to nerds: Window.setDark()");

		frameStore.subscribe(() => setFramed(frameStore.getState().value));
	}, []);

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	// https://mui.com/material-ui/customization/palette/
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
					primary: {
						main: green[500],
					},
					secondary: {
						main: "#fff",
						light: "#ebebeb",
						dark: "#4e565c",
					},
				},
			}),
		[prefersDarkMode]
	);

	const {
		currentPage = {
			title: "404",
		},
		locale = "zh-CN",
		menuItems = [],
	} = pageProps;

	return (
		<ThemeProvider theme={theme}>
			<Text
				dictionary={pageProps.dic ? JSON.parse(pageProps.dic) : {}}
				language={locale}
			>
				<Layout
					enableFrame={framed}
					siteConfig={siteConfig}
					locale={locale}
					currentPage={currentPage}
					menuItems={menuItems}
				>
					<Component {...pageProps} siteConfig={siteConfig} />
				</Layout>
			</Text>
		</ThemeProvider>
	);
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     console.log(appProps);

//     return { ...appProps };
// };

export default MyApp;
