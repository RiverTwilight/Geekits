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
			<div className="">
				<Grid container>
					<Grid item sm={6}>
						<InputLabel>从</InputLabel>
						<TextField
							onChange={(e) => {
								this.handleInput(e, "dateStart");
							}}
							placeholder=" "
							type="date"
							value={dateStart}
						/>
					</Grid>
					<Grid item sm={6}>
						<InputLabel>{`往${day >= 0 ? "后" : "前"}推${Math.abs(
							day
						)}天`}</InputLabel>
						<TextField
							onChange={(e) => {
								this.handleInput(e, "day");
							}}
							startAdornment={
								<InputAdornment position="start">
									{day >= 0 ? (
										<FastForwardTwoToneIcon />
									) : (
										<FastRewindTwoToneIcon />
									)}
								</InputAdornment>
							}
							type="number"
							value={day}
						/>
					</Grid>
				</Grid>

				<br />
				<br />
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						alignItems: "center",
						p: 1,
						m: 1,
					}}
				>
					<Fab
						onClick={this.handleClick}
						color="primary"
						aria-label="add"
					>
						<CheckIcon />
					</Fab>
				</Box>
				{whichDay && (
					<Typography variant="body1" align="center">
						{whichDay}
					</Typography>
				)}
			</div>
		);
	}
}
