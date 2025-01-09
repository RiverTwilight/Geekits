import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import customTheme from "@/utils/theme";
import { Preferences } from "@capacitor/preferences";

type ColorMode = "light" | "dark" | "system";

interface ColorModeContextType {
	mode: ColorMode;
	setMode: (mode: ColorMode) => void;
	actualMode: "light" | "dark";
}

const ColorModeContext = createContext<ColorModeContextType>({
	mode: "system",
	setMode: () => {},
	actualMode: "light",
});

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const [mode, setMode] = useState<ColorMode>("system");

	useEffect(() => {
		const getSavedMode = async () => {
			const { value } = await Preferences.get({ key: "themeMode" });
			if (value) {
				setMode(value as ColorMode);
			}
		};
		getSavedMode();
	}, []);

	const handleSetMode = async (newMode: ColorMode) => {
		setMode(newMode);
		await Preferences.set({ key: "themeMode", value: newMode });
	};

	const actualMode =
		mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

	const theme = customTheme(actualMode === "dark");

	return (
		<ColorModeContext.Provider
			value={{ mode, setMode: handleSetMode, actualMode }}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export const useColorMode = () => useContext(ColorModeContext);
