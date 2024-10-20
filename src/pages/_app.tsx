import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Text from "@/components/i18n";
import { ThemeProvider } from "@mui/material/styles";
import { store as frameStore } from "@/utils/Data/frameState";
import { Device } from "@capacitor/device";
import customTheme from "@/utils/theme";
import { LocaleProvider } from "@/contexts/locale";
import { isWeb } from "@/utils/platform.js";

import type { AppProps } from "next/app";

import "./App.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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

const MainApp = React.memo(({ Component, pageProps }: AppProps) => {
	const router = useRouter();
	const [prefersDarkMode, setPrefersDarkMode] = useState(false);
	const [framed, setFramed] = useState<Boolean>(true);
	const [preferredLocale, setPreferredLocale] = useState(pageProps.locale);

	useEffect(() => {
		const isDarkMode = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		setPrefersDarkMode(isDarkMode);

		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersDarkMode(event.matches);
		};

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	useEffect(() => {
		const readLocaleConfig = async () => {
			let preferredSet = localStorage.getItem("locale");
			if (preferredSet) {
				if (preferredSet === "auto" && !isWeb()) {
					// Use device language on native apps
					setPreferredLocale(await getDeviceLanguage());
				} else if (preferredSet !== "auto" && isWeb()) {
					// Redirect to the new locale on web
					// If the path has locale, we should do nothing, as this has higher priority
					// than setting locale manually in the Settings page.
					let pathLocaleActive = router.locales.some((locale) => {
						return window.location.pathname.includes(locale);
					});

					if (!pathLocaleActive && router.locale !== preferredSet) {
						// Visitor is not using localized path, which means NextJS is using the default locale.
						// But the preferred locale is not the default one, so we need to redirect to the new locale.
						window.location.href = `/${preferredSet}${window.location.pathname}`;
					}
				}
			}
		};

		readLocaleConfig();
	}, []);

	useEffect(() => {
		const unsubscribe = frameStore.subscribe(() =>
			setFramed(frameStore.getState().value)
		);
		return () => unsubscribe();
	}, []);

	const localizedDic = useMemo(
		() => JSON.parse(pageProps.dic)[preferredLocale],
		[preferredLocale, pageProps.dic]
	);

	useEffect(() => {
		if (!isWeb()) {
			const localizedTitle =
				localizedDic[pageProps.currentPage.dicKey] ||
				pageProps.currentPage.title;

			pageProps.currentPage.title = localizedTitle;
		}
	}, [pageProps.currentPage.title]);

	const theme = useMemo(
		() => customTheme(prefersDarkMode),
		[prefersDarkMode]
	);

	useEffect(() => {
		let loadTimer: NodeJS.Timeout;

		const handleRouteChangeStart = (url: string) => {
			const currentPath = router.asPath.split("?")[0];
			const newPath = url.split("?")[0];
			console.log("handleRouteChangeStart", currentPath, newPath);
			if (newPath.endsWith(currentPath)) return;

			loadTimer = setTimeout(() => {
				window.showGlobalLoadingOverlay();
			}, 0);
		};

		const handleRouteChangeComplete = (url: string) => {
			clearTimeout(loadTimer);
			window.hideGlobalLoadingOverlay();
		};

		if (isWeb()) {
			router.events.on("routeChangeStart", handleRouteChangeStart);
			router.events.on("routeChangeComplete", handleRouteChangeComplete);
			router.events.on("routeChangeError", handleRouteChangeComplete);

			return () => {
				router.events.off("routeChangeStart", handleRouteChangeStart);
				router.events.off(
					"routeChangeComplete",
					handleRouteChangeComplete
				);
				router.events.off(
					"routeChangeError",
					handleRouteChangeComplete
				);
			};
		}
	}, [router]);

	const {
		currentPage = {
			title: "404",
		},
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
						<Component {...pageProps} />
					) : (
						<Layout currentPage={currentPage} enableFrame={framed}>
							<Component {...pageProps} />
						</Layout>
					)}
					{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
						<GoogleAnalytics
							ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
						/>
					)}
				</Text>
			</ThemeProvider>
		</LocaleProvider>
	);
});

MainApp.displayName = "MainApp";

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
