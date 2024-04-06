import React, { useState, useEffect, useMemo } from "react";
import Layout from "@/components/Layout";
import Text from "@/components/i18n";
import { ThemeProvider } from "@mui/material/styles";
import { store as frameStore } from "@/utils/Data/frameState";
import siteConfig from "../site.config.js";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { Device } from "@capacitor/device";
import customTheme from "@/utils/theme";
import { useMediaQuery } from "@mui/material";
import { LocaleProvider } from "@/contexts/locale";

import "./App.css";
import { isCapacitor, isWeb } from "@/utils/platform.js";

async function getDeviceLanguage() {
	let { value } = await Device.getLanguageCode();

	if (value === "en") {
		value = "en-US";
	}
	if (value === "zh") {
		value = "zh-CN";
	}

	return value;
}

function MainApp({ Component, pageProps }: AppProps) {
	const [framed, setFramed] = useState<Boolean>(true);

	// The auto-detected locale from NextJS
	// If user has no preferred locale, use auto
	const [preferredLocale, setPreferredLocale] = useState(pageProps.locale);

	useEffect(() => {
		const readLocaleConfig = async () => {
			// https://en.wikipedia.org/wiki/IETF_language_tag
			let preferredSet = localStorage.getItem("locale");
			if (preferredSet) {
				if (preferredSet === "auto" && !isWeb()) {
					setPreferredLocale(await getDeviceLanguage());
				} else {
					setPreferredLocale(preferredSet);
				}
			}
		};

		readLocaleConfig();
	}, []);

	useEffect(() => {
		frameStore.subscribe(() => setFramed(frameStore.getState().value));
	}, []);

	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	const localizedDic = useMemo(
		() => JSON.parse(pageProps.dic)[preferredLocale],
		[preferredLocale, pageProps.dic]
	);

	const theme = useMemo(
		() => customTheme(prefersDarkMode),
		[prefersDarkMode]
	);

	const {
		currentPage = {
			title: "404",
		},
		menuItems = [],
		hideFrame,
	} = pageProps;

	return (
		<LocaleProvider
			value={{ locale: preferredLocale, setLocale: setPreferredLocale }}
		>
			<ThemeProvider theme={theme}>
				<Text
					dictionary={localizedDic || {}}
					language={preferredLocale}
				>
					{hideFrame ? (
						<Component {...pageProps} siteConfig={siteConfig} />
					) : (
						<Layout
							enableFrame={framed}
							currentPage={currentPage}
							menuItems={menuItems}
						>
							{/**@ts-ignore */}
							<Component {...pageProps} siteConfig={siteConfig} />
						</Layout>
					)}
					<Analytics />
				</Text>
			</ThemeProvider>
		</LocaleProvider>
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

export default MainApp;
