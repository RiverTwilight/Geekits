import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/palette/
// Create by https://material-foundation.github.io/material-theme-builder/
const customTheme = (prefersDarkMode: boolean) => {
	return createTheme({
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: "#415f91",
				light: "#ebebeb",
				dark: "#aac7ff",
			},
			secondary: {
				main: "#586249",
				light: "#001b3e",
				dark: "#dae2f9",
			},
			background: {
				default: prefersDarkMode ? "#1d2023" : "#ededf4",
				paper: prefersDarkMode ? "#111218" : "#f9f9ff",
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						fontFamily: "Product Sans Bold, Roboto, Helvetica, Arial, sans-serif",
					},
				},
			},
		},
	});
};

// const customTheme = (prefersDarkMode: boolean) => {
// 	return createTheme({
// 		typography: {
// 			fontFamily: `"Product Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
// 		},
// 		palette: {
// 			mode: prefersDarkMode ? "dark" : "light",
// 			primary: {
// 				main: "#4c662b",
// 				light: "#ebebeb",
// 				dark: "#b1d18a",
// 			},
// 			secondary: {
// 				main: "#586249",
// 				light: "#ebebeb",
// 				dark: "#bfcbad",
// 			},
// 			background: {
// 				default: prefersDarkMode ? "#12130e" : "#eeefe3",
// 				paper: prefersDarkMode ? "#1e1f1a" : "#f9faef",
// 			},
// 		},
// 	});
// };

export default customTheme;
