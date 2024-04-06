import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
// https://mui.com/material-ui/customization/palette/

const customTheme = (prefersDarkMode: boolean) => {
	return createTheme({
		typography: {
			fontFamily: `"Product Sans", "Roboto", "Helvetica", "Arial", sans-serif`,
		},
		palette: {
			mode: prefersDarkMode ? "dark" : "light",
			primary: {
				main: green[500],
				light: "#ebebeb",
				dark: "#4e565c",
			},
			secondary: {
				main: "#fff",
				light: "#ebebeb",
				dark: "#4e565c",
			},
			background: {
				default: prefersDarkMode ? "#1e2020" : "#f0f4f9",
				paper: prefersDarkMode ? "#141414" : "#ffffff",
			},
		},
	});
};

export default customTheme;
