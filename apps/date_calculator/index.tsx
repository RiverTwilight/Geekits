import React from "react";
import DateInterval from "./Interval";
import CalcDate from "./Calculate";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

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

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		backgroundColor: theme.palette.background.paper,
		width: 500,
	},
	paper: {
		padding: theme.spacing(1)
	}
}));

const DateCalculator = () => {
	const classes = useStyles();
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Paper className={classes.paper}>
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
	);
};

export default DateCalculator;
