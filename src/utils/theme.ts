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
				main: "#f2f5fc",
				light: "#eaf1fb",
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
						fontFamily:
							"Product Sans Bold, Roboto, Helvetica, Arial, sans-serif",
					},
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: "18px",
					},
				},
			},
			MuiDialogTitle: {
				styleOverrides: {
					root: {
						background: prefersDarkMode ? "#1d2023" : "#ededf4",
					},
				},
			},
			MuiDialogContent: {
				styleOverrides: {
					root: {
						background: prefersDarkMode ? "#1d2023" : "#ededf4",
					},
				},
			},
			MuiDialogActions: {
				styleOverrides: {
					root: {
						background: prefersDarkMode ? "#1d2023" : "#ededf4",
					},
				},
			},
			MuiAccordion: {
				styleOverrides: {
					root: {
						boxShadow: "none",
					},
				},
			},
		},
	});
};

export default customTheme;
