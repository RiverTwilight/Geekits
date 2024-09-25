import React, { useState, useEffect } from "react";
import { getToday } from "./engine";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Box, FormControl } from "@mui/material";

type DateDifferState = {
	dateLate: string;
	dateEarly: string;
	diffDay: number | null;
	diffHour: number;
	diffMin: number;
};

const DateInterval: React.FC = () => {
	const [state, setState] = useState<DateDifferState>({
		dateLate: "",
		dateEarly: "",
		diffDay: null,
		diffHour: 0,
		diffMin: 0,
	});

	useEffect(() => {
		const today = getToday();
		setState((prev) => ({ ...prev, dateLate: today }));
	}, []);

	const handleClick = () => {
		const { dateEarly, dateLate } = state;

		const diffTime = Math.abs(
			new Date(dateLate).getTime() - new Date(dateEarly).getTime()
		);

		const diffDayMs = 1000 * 60 * 60 * 24;
		const diffDay = Math.floor(diffTime / diffDayMs);

		const diffHour = diffDay * 24;

		setState({
			...state,
			diffDay,
			diffHour,
		});
	};

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		key: keyof DateDifferState
	) => {
		setState((prev) => ({ ...prev, [key]: e.target.value }));
	};

	const { dateEarly, dateLate, diffDay, diffHour, diffMin } = state;

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<InputLabel>从</InputLabel>
					<TextField
						onChange={(e) => handleInput(e, "dateLate")}
						type="date"
						value={dateLate}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InputLabel>到</InputLabel>
					<TextField
						onChange={(e) => handleInput(e, "dateEarly")}
						fullWidth
						type="date"
						value={dateEarly}
					/>
				</Grid>
			</Grid>
			<br />
			<br />
			<FormControl fullWidth>
				<Button
					onClick={handleClick}
					variant="contained"
					color="primary"
				>
					计算
				</Button>
			</FormControl>

			{typeof diffDay === "number" && (
				<Box marginTop={2}>
					<Typography align="center" variant="h5">
						相差{diffDay}天
					</Typography>
					<Typography align="center" variant="h5">
						折合
						{diffHour}
						小时
						{diffMin}
						分钟
					</Typography>
				</Box>
			)}
		</Box>
	);
};

export default DateInterval;
