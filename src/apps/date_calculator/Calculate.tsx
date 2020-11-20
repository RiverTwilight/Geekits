import React from "react";
import { calWhichDay, getToday } from "./engine";
import { Button, Input } from "mdui-in-react";

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
	render() {
		const { dateStart, day, whichDay } = this.state;
		return (
			<div className="">
				<Input
					onValueChange={(newText) => {
						this.setState({ dateStart: newText });
					}}
					header="从"
					placeholder=" "
					icon="date_range"
					type="date"
					value={dateStart}
				/>
				<Input
					onValueChange={(newText) => {
						this.setState({ day: newText });
					}}
					header={`${Math.abs(day)}天之${day >= 0 ? "后" : "前"}`}
					icon={day >= 0 ? "fast_forward" : "fast_rewind"}
					type="number"
					value={day}
				/>
				<Button
					onClick={() => {
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
					}}
					primary
					raised
					ripple
					title="计算"
				/>
				<p
					style={{ display: whichDay === "" ? "none" : "block" }}
					className="mdui-typo-title mdui-text-center"
				>
					{whichDay}
				</p>
			</div>
		);
	}
}
