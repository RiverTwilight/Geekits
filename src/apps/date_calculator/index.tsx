import React from "react";
import DateInterval from "./Interval";
import CalcDate from "./Calculate";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import OutlinedCard from "@/components/OutlinedCard";
import { styled } from "@mui/material/styles";

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: any;
	value: any;
}

const StyledBox = styled(Box)(({ theme }) => ({
	display: "flex",
	width: "100%",
	justifyContent: "center",
	alignItems: "center",
	padding: theme.spacing(2),
}));

const StyledOutlinedCard = styled(OutlinedCard)(({ theme }) => ({
	width: "100%",
	maxWidth: "600px",
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
	marginBottom: theme.spacing(2),
}));

const StyledTabPanel = styled(Box)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: theme.shape.borderRadius,
}));

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
			{value === index && <StyledTabPanel>{children}</StyledTabPanel>}
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
		<StyledBox>
			<StyledOutlinedCard>
				<StyledTabs
					value={value}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant="fullWidth"
					aria-label="full width tabs example"
				>
					<Tab label="日期&时间间隔" {...a11yProps(0)} />
					<Tab label="日期推算" {...a11yProps(1)} />
				</StyledTabs>
				<TabPanel value={value} index={0}>
					<DateInterval />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<CalcDate />
				</TabPanel>
			</StyledOutlinedCard>
		</StyledBox>
	);
};

export default DateCalculator;
