import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: green[300],
		},
	},
});

export default theme
