import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Text from "@/components/i18n";
import { store as frameStore } from "@/utils/Data/frameState";
import { Device } from "@capacitor/device";
import { ColorModeProvider } from "@/contexts/colorMode";
import type { AppProps } from "next/app";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LocaleProvider } from "@/contexts/locale";
import { isWeb } from "@/utils/platform";
import "./App.css";
import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";

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
	const [framed, setFramed] = useState<Boolean>(true);
	const [preferredLocale, setPreferredLocale] = useState(pageProps.locale);

	useEffect(() => {
		const readLocaleConfig = async () => {
			try {
				const { value: preferredSet } = await Preferences.get({
					key: "locale",
				});

				if (preferredSet) {
					if (
						preferredSet === "auto" &&
						Capacitor.isNativePlatform()
					) {
						// Use device language on native apps
						setPreferredLocale(await getDeviceLanguage());
					} else if (preferredSet !== "auto" && isWeb()) {
						// Redirect to the new locale on web
						let pathLocaleActive = router.locales.some((locale) => {
							return window.location.pathname.includes(locale);
						});

						if (
							!pathLocaleActive &&
							router.locale !== preferredSet
						) {
							window.location.href = `/${preferredSet}${window.location.pathname}`;
						}
					} else if (
						preferredSet !== "auto" &&
						Capacitor.isNativePlatform()
					) {
						// Use preferred locale on native apps
						setPreferredLocale(preferredSet);
					}
				}
			} catch (error) {
				console.error("Error reading locale from storage:", error);
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

	const {
		currentPage = {
			title: "404",
		},
		hideFrame,
	} = pageProps;

	return (
		<ColorModeProvider>
			<LocaleProvider
				value={{
					locale: preferredLocale,
					setLocale: setPreferredLocale,
				}}
			>
				<Text
					dictionary={localizedDic || {}}
					language={preferredLocale}
				>
					{hideFrame ? (
						<Component {...pageProps} />
					) : (
						<Layout
							appData={pageProps.appData}
							currentPage={currentPage}
							enableFrame={framed}
						>
							<Component {...pageProps} />
						</Layout>
					)}
					{process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
						<GoogleAnalytics
							ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}
						/>
					)}
				</Text>
			</LocaleProvider>
		</ColorModeProvider>
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
