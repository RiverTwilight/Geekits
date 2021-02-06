import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: green[500],
		},
		secondary: {
			main: "#4caf50",
		},
	},
});

export default theme
