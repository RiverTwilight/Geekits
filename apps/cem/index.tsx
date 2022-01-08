import React from "react";
import ClipboardJS from "clipboard";
import table from "./table";
import cem from "./dic";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import BorderColorSharpIcon from "@mui/icons-material/BorderColorSharp";
import { Theme } from "@mui/material/styles";
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const styles = (theme: Theme) => {
	return createStyles({
		padding: {
			padding: theme.spacing(1),
		},
	});
};

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

// TODO 离子方程式配平

const Result = ({ result, eleClass }: any) => {
	const classes = useStyles();
	if (result === "") return null;
	const pt = JSON.parse(table);
	var info: any = [];
	pt.map((stance: any) => {
		eleClass.map((ele: any) => {
			if (ele.ele === stance.symbol) info.push(stance);
		});
	});
	return (
		<>
			<Typography
				data-clipboard-text={"sdfasdf"}
				align="center"
				variant="h5"
				dangerouslySetInnerHTML={{ __html: result }}
			></Typography>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>原子序数</TableCell>
							<TableCell>元素名</TableCell>
							<TableCell>相对原子质量</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'stance' implicitly has an 'any' type.
							info.map((stance, i) => (
								<TableRow key={i}>
									<TableCell>{stance.atomicNumber}</TableCell>

									<TableCell>{stance.symbol}</TableCell>

									<TableCell>{stance.atomicMass}</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

type UiState = any;

class Cem extends React.Component<{ classes: any }, UiState> {
	constructor(props: { classes: any } | Readonly<{ classes: any }>) {
		super(props);
		this.state = {
			input: "Cu + HNO3 = Cu(NO3)2 + NO2 + H2O",
			result: "",
			eleClass: [],
			snackbar: false,
		};
	}
	handleClose = () => {
		this.setState({
			snackbar: false,
		});
	};
	componentDidMount() {
		var clipboard = new ClipboardJS("h5");
		clipboard.on("success", (e) => {
			window.snackbar({
				message: "复制成功",
			});
			e.clearSelection();
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<>
				<Paper className={classes.padding}>
					<FormControl fullWidth>
						<InputLabel htmlFor="standard-adornment-amount">
							输入化学方程式
						</InputLabel>
						<Input
							onChange={(newText) => {
								this.setState({ input: newText.target.value });
							}}
							startAdornment={
								<InputAdornment position="start">
									<BorderColorSharpIcon />
								</InputAdornment>
							}
							value={this.state.input}
							multiline
							rows={2}
						/>
					</FormControl>
					<br />
					<br />
					<Button
						onClick={() => {
							try {
								var library = cem(this.state.input);
								this.setState({
									result: library.result,
									eleClass: library.eleClass,
								});
							} catch (err) {
								window.snackbar({
									message: "方程式有误",
								});
							}
						}}
						variant="contained"
						color="primary"
					>
						配平
					</Button>
				</Paper>
				<Result
					eleClass={this.state.eleClass}
					result={this.state.result}
				/>
			</>
		);
	}
}

export default withStyles(styles)(Cem);
