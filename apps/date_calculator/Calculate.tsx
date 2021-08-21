import React from "react";
import { calWhichDay, getToday } from "./engine";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FastForwardTwoToneIcon from "@material-ui/icons/FastForwardTwoTone";
import FastRewindTwoToneIcon from "@material-ui/icons/FastRewindTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";

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
					<Grid item xs={6}>
						<InputLabel>从</InputLabel>
						<Input
							onChange={(e) => {
								this.handleInput(e, "dateStart");
							}}
							placeholder=" "
							type="date"
							value={dateStart}
						/>
					</Grid>
					<Grid item xs={6}>
						<InputLabel>{`往${day >= 0 ? "后" : "前"}推${Math.abs(
							day
						)}天`}</InputLabel>
						<Input
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
				<Button
					variant="contained"
					color="primary"
					onClick={this.handleClick}
				>
					计算
				</Button>
				{whichDay && (
					<Typography variant="body1" align="center">
						{whichDay}
					</Typography>
				)}
			</div>
		);
	}
}
