import { createTheme } from "@mui/material";

// https://mui.com/material-ui/customization/palette/
// Create by https://material-foundation.github.io/material-theme-builder/
const customTheme = (prefersDarkMode: boolean) => {
	return createTheme({
		typography: {
			fontFamily: "Roboto, sans-serif",
			h1: {
				fontSize: "2.25rem",
				fontWeight: 400,
				letterSpacing: "-0.022em",
			},
			h2: {
				fontSize: "1.75rem",
				fontWeight: 400,
				letterSpacing: "-0.018em",
			},
			h3: {
				fontSize: "1.5rem",
				fontWeight: 400,
				letterSpacing: "-0.015em",
			},
			body1: {
				fontSize: "1rem",
				letterSpacing: "0.031em",
				lineHeight: 1.5,
			},
			button: {
				textTransform: "none",
				letterSpacing: "0.016em",
			},
		},
		shape: {
			borderRadius: 16,
		},
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
						borderRadius: "100px",
						padding: "10px 24px",
						textTransform: "none",
						fontSize: "0.875rem",
					},
					contained: {
						boxShadow: "none",
						"&:hover": {
							boxShadow: "none",
						},
					},
					outlined: {
						borderWidth: "1px",
						"&:hover": {
							borderWidth: "1px",
						},
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiOutlinedInput-root": {
							borderRadius: "12px",
						},
					},
				},
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: "28px",
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
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: "28px",
						boxShadow: "none",
						transition: "all 0.3s ease",
						background: prefersDarkMode ? "#1d2023" : "#ededf4",
						"&:hover": {
							transform: "translateY(-2px)",
							boxShadow: prefersDarkMode
								? "0px 2px 6px 2px rgba(0, 0, 0, 0.15)"
								: "0px 2px 6px 2px rgba(0, 0, 0, 0.08)",
						},
					},
				},
			},
			MuiChip: {
				styleOverrides: {
					root: {
						borderRadius: "8px",
						height: "32px",
					},
				},
			},
			MuiSwitch: {
				styleOverrides: {
					root: {
						padding: 8,
					},
					track: {
						borderRadius: 22 / 2,
					},
					thumb: {
						boxShadow: "none",
					},
				},
			},
			MuiListItem: {
				styleOverrides: {
					root: {
						borderRadius: "12px",
						marginBottom: "4px",
					},
				},
			},
		},
	});
};

export default customTheme;
