import React from "react";
import { calDiffer, getToday } from "./engine";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

type DateDifferState = any;

export default class DateInterval extends React.Component<{}, DateDifferState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			dateLate: "2020-04-17",
			dateEarly: "2004-04-12",
			timeEarly: "12:00",
			timeLate: "14:00",
			diffDay: null,
			diffHour: 0,
			diffMin: 0,
		};
	}
	componentDidMount() {
		var today = getToday();
		this.setState({
			dateLate: today,
		});
	}
	handleClick = () => {
		const { timeEarly, timeLate, dateEarly, dateLate } = this.state;
		var res = calDiffer(dateEarly, dateLate, timeEarly, timeLate);
		this.setState({
			diffDay: res.day,
			diffDayHour: res.overflowHour,
			diffDayMin: res.overflowMin,
			diffHour: res.hour,
			diffMin: res.min,
		});
	};
	handleInput = (e: any, key: string) => {
		this.setState({
			[key]: e.target.detail,
		});
	};
	render() {
		const {
			dateEarly,
			dateLate,
			diffDay,
			diffHour,
			diffMin,
		} = this.state;
		return (
			<>
				<Grid container spacing={{ sm: 2 }}>
					<Grid item sm={6}>
						<InputLabel>从</InputLabel>
						<TextField
							onChange={(e: any) => {
								this.handleInput(e, "dateLate");
							}}
							type="date"
							value={dateLate}
						/>
					</Grid>
					<Grid item sm={6}>
						<InputLabel>到</InputLabel>
						<TextField
							onChange={(e) => {
								this.handleInput(e, "dateEarly");
							}}
							type="date"
							value={dateEarly}
						/>
					</Grid>
				</Grid>
				<br />
				<br />
				<Button
					onClick={this.handleClick}
					variant="contained"
					color="primary"
				>
					计算
				</Button>
				{typeof diffDay === "number" && (
					<Typography align="center" variant="h6">
						<small>相差</small>
						{diffDay}
						<small>天</small>

						<br></br>

						<small>折合</small>
						{diffHour}
						<small>小时</small>
						{diffMin}
						<small>分钟</small>
					</Typography>
				)}
			</>
		);
	}
}
