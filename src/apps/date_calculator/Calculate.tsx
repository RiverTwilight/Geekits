import React from "react";
import { calWhichDay, getToday } from "./engine";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FastForwardTwoToneIcon from "@mui/icons-material/FastForwardTwoTone";
import FastRewindTwoToneIcon from "@mui/icons-material/FastRewindTwoTone";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import { Button, FormControl } from "@mui/material";

type CalcDateState = any;

export default class CalcDate extends React.Component<{}, CalcDateState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			dateStart: "2020-01-06",
			day: 10,
			whichDay: "",
		};
	}
	componentDidMount() {
		var today = getToday();
		this.setState({
			dateStart: today,
		});
	}
	handleInput = (e: any, key: string) => {
		// debugger
		this.setState({
			[key]: e.target.value,
		});
	};
	handleClick = () => {
		const { dateStart, day, whichDay } = this.state;
		const res = calWhichDay(dateStart, day),
			weeks = [
				"星期天",
				"星期一",
				"星期二",
				"星期三",
				"星期四",
				"星期五",
				"星期六",
			],
			week = weeks[res.week];
		this.setState({ whichDay: `${res.date} ${week}` });
	};
	render() {
		const { dateStart, day, whichDay } = this.state;
		return (
			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<InputLabel>从</InputLabel>
						<TextField
							onChange={(e) => {
								this.handleInput(e, "dateStart");
							}}
							placeholder=" "
							type="date"
							fullWidth
							value={dateStart}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<InputLabel>{`往${day >= 0 ? "后" : "前"}推${Math.abs(
							day
						)}天`}</InputLabel>
						<TextField
							onChange={(e) => {
								this.handleInput(e, "day");
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										{day >= 0 ? (
											<FastForwardTwoToneIcon />
										) : (
											<FastRewindTwoToneIcon />
										)}
									</InputAdornment>
								),
							}}
							fullWidth
							type="number"
							value={day}
						/>
					</Grid>
				</Grid>

				<br />
				<br />

				<FormControl fullWidth>
					<Button
						onClick={this.handleClick}
						variant="contained"
						color="primary"
					>
						计算
					</Button>
				</FormControl>

				{whichDay && (
					<Box marginTop={2}>
						<Typography variant="h5" align="center">
							{whichDay}
						</Typography>
					</Box>
				)}
			</Box>
		);
	}
}
