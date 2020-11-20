import React from "react";
import { Tab } from "mdui-in-react";
import DateInterval from "./Interval";
import CalcDate from "./Calculate";

export default () => (
	<Tab
		tabs={[
			{
				text: "日期&时间间隔",
				id: "calDiffer",
				component: <DateInterval />,
			},
			{
				text: "日期推算",
				id: "calWhichDay",
				component: <CalcDate />,
			},
		]}
	/>
);
