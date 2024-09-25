import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import OutlinedCard from "@/components/OutlinedCard";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import CurrencyYuanIcon from "@mui/icons-material/CurrencyYuan";

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
			{value === index && (
				<StyledTabPanel>
					<Typography>{children}</Typography>
				</StyledTabPanel>
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

const TaxCalculator = () => {
	const router = useRouter();
	const [value, setValue] = useState(0);
	const [income, setIncome] = useState<number | string>("");
	const [tax, setTax] = useState<number | string>("");

	useEffect(() => {
		const { amount } = router.query;
		if (amount) {
			setIncome(amount);
		}
	}, [router.query]);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = event.target.value;
		if (newValue === "") {
			setIncome("");
			router.push({
				query: { ...router.query, amount: "" },
			});
			return;
		}
		const parsedValue = parseFloat(newValue);
		if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 999999) {
			setIncome(newValue);
			router.push({
				query: { ...router.query, amount: newValue },
			});
		}
	};

	const calculatePersonalTax = () => {
		const incomeValue = parseFloat(income as string);
		let taxableIncome = incomeValue - 5000; // Apply tax only to the part larger than 5000 CNY
		let taxAmount = 0;

		if (taxableIncome <= 0) {
			taxAmount = 0;
		} else if (taxableIncome <= 36000) {
			taxAmount = taxableIncome * 0.03;
		} else if (taxableIncome <= 144000) {
			taxAmount = taxableIncome * 0.1 - 2520;
		} else if (taxableIncome <= 300000) {
			taxAmount = taxableIncome * 0.2 - 16920;
		} else if (taxableIncome <= 420000) {
			taxAmount = taxableIncome * 0.25 - 31920;
		} else if (taxableIncome <= 660000) {
			taxAmount = taxableIncome * 0.3 - 52920;
		} else if (taxableIncome <= 960000) {
			taxAmount = taxableIncome * 0.35 - 85920;
		} else {
			taxAmount = taxableIncome * 0.45 - 181920;
		}

		setTax(taxAmount.toFixed(2));
	};

	const calculateOrganizationTax = () => {
		// Placeholder for organization tax calculation logic
		setTax("Organization tax calculation not implemented yet.");
	};

	const calculateTax = () => {
		if (value === 0) {
			calculatePersonalTax();
		} else {
			calculateOrganizationTax();
		}
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
					<Tab label="个人收入" {...a11yProps(0)} />
					<Tab label="组织收入" {...a11yProps(1)} />
				</StyledTabs>
				<TabPanel value={value} index={0}>
					<Box component="form" noValidate autoComplete="off">
						<TextField
							label="收入 (元)"
							variant="outlined"
							fullWidth
							margin="normal"
							value={income}
							onChange={handleIncomeChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<CurrencyYuanIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateTax}
						>
							计算税额
						</Button>
						{tax && (
							<Typography
								variant="h6"
								align="center"
								marginTop={2}
							>
								应缴税额: ¥{tax}
							</Typography>
						)}
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Box component="form" noValidate autoComplete="off">
						<TextField
							label="收入 (元)"
							variant="outlined"
							fullWidth
							margin="normal"
							value={income}
							onChange={handleIncomeChange}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<CurrencyYuanIcon />
									</InputAdornment>
								),
							}}
						/>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateTax}
						>
							计算税额
						</Button>
						{tax && (
							<Typography
								variant="h6"
								align="center"
								marginTop={2}
							>
								应缴税额: ¥{tax}
							</Typography>
						)}
					</Box>
				</TabPanel>
			</StyledOutlinedCard>
		</StyledBox>
	);
};

export default TaxCalculator;
