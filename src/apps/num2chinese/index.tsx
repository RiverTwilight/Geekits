import React from "react";
import ClipboardJS from "clipboard";
import num2chinese from "./engine";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const styles = (theme: Theme) => {
	return createStyles({
		padding: {
			padding: theme.spacing(1),
		},
	});
};

type State = any;

export default withStyles(styles)(
	class Num2Chinese extends React.Component<any, State> {
		constructor(props: {}) {
			super(props);
			this.state = {
				input: "",
				res: "",
			};
		}
		componentDidMount() {
			var clipboard = new ClipboardJS("#becopy");
			clipboard.on("success", (e) => {
				window.snackbar({ message: "已复制" });
				e.clearSelection();
			});
		}
		render() {
			const { input, res } = this.state;
			const { classes } = this.props;
			return (
				<>
					<FormControl
						className={classes.padding}
						component={Paper}
						fullWidth
					>
						<Input
							onChange={(e) => {
								let newText = e.target.value;
								var cal = new num2chinese(newText);
								var result =
									newText === "" ? "" : cal.calDirect();
								this.setState({
									input: newText,
									res: result,
								});
							}}
							autoFocus
							type="number"
							value={input}
							startAdornment={
								<InputAdornment position="start">
									<AttachMoneyIcon />
								</InputAdornment>
							}
						/>
					</FormControl>
					<br />
					<br />
					{res !== "" && (
						<Typography
							id="becopy"
							variant="h5"
							align="center"
							data-clipboard-text={res}
						>
							{res}
							<IconButton>
								<FileCopyIcon />
							</IconButton>
						</Typography>
					)}
				</>
			);
		}
	}
);
