import React, { useState, useEffect } from "react";
import { getToday, calWhichDay } from "./engine";
import {
	Button,
	InputLabel,
	Typography,
	TextField,
	Box,
	FormControl,
	Tabs,
	Tab,
	InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FastForwardTwoToneIcon from "@mui/icons-material/FastForwardTwoTone";
import FastRewindTwoToneIcon from "@mui/icons-material/FastRewindTwoTone";
import OutlinedCard from "@/components/OutlinedCard";
import Grid from "@mui/material/Grid2";

const StyledTabPanel = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
	width: "100%",
}));

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

type DateDifferState = {
	dateLate: string;
	dateEarly: string;
	diffDay: number | null;
	diffHour: number;
	diffMin: number;
};

// TabPanel Component
function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;
	return (
		<Box
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			width="100%"
			{...other}
		>
			{value === index && <StyledTabPanel>{children}</StyledTabPanel>}
		</Box>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

// DateInterval Component
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
		const threeDaysLater = new Date(new Date(today).getTime() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
		setState((prev) => ({ 
			...prev, 
			dateLate: today,
			dateEarly: threeDaysLater 
		}));
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
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		key: string
	) => {
		setState((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	const { dateEarly, dateLate, diffDay, diffHour, diffMin } = state;

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid
					size={{
						sm: 6,
						xs: 12,
					}}
				>
					<InputLabel>从</InputLabel>
					<TextField
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInput(e, "dateLate")
						}
						type="date"
						value={dateLate}
						fullWidth
					/>
				</Grid>
				<Grid
					size={{
						sm: 6,
						xs: 12,
					}}
				>
					<InputLabel>到</InputLabel>
					<TextField
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							handleInput(e, "dateEarly")
						}
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
						折合{diffHour}小时{diffMin}分钟
					</Typography>
				</Box>
			)}
		</Box>
	);
};

// CalcDate Component
const CalcDate: React.FC = () => {
	const [state, setState] = useState({
		dateStart: "2020-01-06",
		day: 10,
		whichDay: "",
	});

	useEffect(() => {
		const today = getToday();
		setState((prev) => ({ ...prev, dateStart: today }));
	}, []);

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		key: string
	) => {
		setState((prev) => ({
			...prev,
			[key]: e.target.value,
		}));
	};

	const handleClick = () => {
		const { dateStart, day } = state;
		const res = calWhichDay(dateStart, day);
		const weeks = [
			"星期天",
			"星期一",
			"星期二",
			"星期三",
			"星期四",
			"星期五",
			"星期六",
		];
		const week = weeks[res.week];
		setState((prev) => ({ ...prev, whichDay: `${res.date} ${week}` }));
	};

	const { dateStart, day, whichDay } = state;

	return (
		<Box>
			<Grid container spacing={2}>
				<Grid
					size={{
						sm: 6,
						xs: 12,
					}}
				>
					<InputLabel>从</InputLabel>
					<TextField
						onChange={(e) => handleInput(e, "dateStart")}
						placeholder=" "
						type="date"
						fullWidth
						value={dateStart}
					/>
				</Grid>
				<Grid
					size={{
						sm: 6,
						xs: 12,
					}}
				>
					<InputLabel>
						{`往${day >= 0 ? "后" : "前"}推${Math.abs(day)}天`}
					</InputLabel>
					<TextField
						onChange={(e) => handleInput(e, "day")}
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
					onClick={handleClick}
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
};

// Main DateCalculator Component
const DateCalculator: React.FC = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
			<OutlinedCard>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="日期间隔" {...a11yProps(0)} />
					<Tab label="日期推算" {...a11yProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<DateInterval />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<CalcDate />
				</TabPanel>
			</OutlinedCard>
		</Box>
	);
};

export default DateCalculator;
