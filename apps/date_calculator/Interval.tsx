import React from "react";
import { calDiffer, getToday } from "./engine";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

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
			diffDayMin,
			diffDayHour,
			diffHour,
			diffMin,
		} = this.state;
		return (
			<>
				<InputLabel>从</InputLabel>
				<Grid container>
					<Grid item xs={12}>
						<Input
							onChange={(e) => {
								this.handleInput(e, "dateEarly");
							}}
							type="date"
							value={dateEarly}
						/>
					</Grid>
				</Grid>
				<br />
				<InputLabel>到</InputLabel>
				<Grid container>
					<Grid item xs={12}>
						<Input
							onChange={(e: any) => {
								this.handleInput(e, "dateLate");
							}}
							type="date"
							value={dateLate}
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
						{diffDayHour}
						<small>小时</small>
						{diffDayMin}
						<small>分钟</small>

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
