import { createTheme, adaptV4Theme } from "@mui/material/styles";
import { green } from '@mui/material/colors';

const theme = ({ darkTheme }: { darkTheme?: boolean }) =>
	createTheme(adaptV4Theme({
		palette: {
			mode: darkTheme ? "dark" : "light",
			primary: {
				main: green[500],
			},
			secondary: {
				main: green[300],
			},
		},
	}));

export default theme;
