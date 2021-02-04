import React from "react";
import { calDiffer, getToday } from "./engine";
import { Button, Input } from "mdui-in-react";

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
			dateLate: today
		});
	}
	render() {
		const {
			timeEarly,
			timeLate,
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
				<div className="">
					<Input
						onValueChange={(newText) => {
							this.setState({ dateEarly: newText });
						}}
						header="从"
						placeholder=" "
						icon="date_range"
						type="date"
						value={dateEarly}
					/>

					<Input
						onValueChange={(newText) => {
							this.setState({ timeEarly: newText });
						}}
						value={timeEarly}
						icon="access_time"
						// @ts-expect-error ts-migrate(2322) FIXME: Type '"time"' is not assignable to type '"number" ... Remove this comment to see the full error message
						type="time"
					/>

					<Input
						onValueChange={(newText) => {
							this.setState({ dateLate: newText });
						}}
						header="到"
						placeholder=" "
						icon="date_range"
						type="date"
						value={dateLate}
					/>

					<Input
						onValueChange={(newText) => {
							this.setState({ timeLate: newText });
						}}
						value={timeLate}
						icon="access_time"
						// @ts-expect-error ts-migrate(2322) FIXME: Type '"time"' is not assignable to type '"number" ... Remove this comment to see the full error message
						type="time"
					/>
					<Button
						onClick={() => {
							var res = calDiffer(
								dateEarly,
								dateLate,
								timeEarly,
								timeLate
							);
							this.setState({
								diffDay: res.day,
								diffDayHour: res.overflowHour,
								diffDayMin: res.overflowMin,
								diffHour: res.hour,
								diffMin: res.min,
							});
						}}
						title="计算"
						raised
						primary
					/>
					{typeof diffDay === "number" && (
						<p className="mdui-typo-title mdui-text-center">
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
						</p>
					)}
				</div>
			</>
		);
	}
}
