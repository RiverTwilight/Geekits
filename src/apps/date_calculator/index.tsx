import React from "react";
import DateInterval from "./Interval";
import CalcDate from "./Calculate";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import OutlinedCard from "@/components/OutlinedCard";

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

const DateCalculator = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box
			display={"flex"}
			sx={{
				width: "100%",
			}}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Paper component={OutlinedCard} padding={1}>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="日期&时间间隔" {...a11yProps(0)} />
					<Tab label="日期推算" {...a11yProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<DateInterval />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<CalcDate />
				</TabPanel>
			</Paper>
		</Box>
	);
};

export default DateCalculator;
