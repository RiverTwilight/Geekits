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
import ChildCare from "@mui/icons-material/ChildCare";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
}));

const StyledOutlinedCard = styled(OutlinedCard)(({ theme }) => ({
	width: "100%",
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
	marginBottom: theme.spacing(2),
}));

const StyledTabPanel = styled(Box)(({ theme }) => ({
	maxWidth: "100%",
	padding: theme.spacing(3),
	paddingTop: 0,
	borderRadius: theme.shape.borderRadius,
	[theme.breakpoints.up("sm")]: {
		width: "500px",
	},
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
	const [childrenCount, setChildrenCount] = useState(0);
	const [isRenting, setIsRenting] = useState(false);
	const [cityType, setCityType] = useState("other");
	const [siblingCount, setSiblingCount] = useState(0);

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

	const handleChildrenCountChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setChildrenCount(parseInt(event.target.value) || 0);
	};

	const handleRentingChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setIsRenting(event.target.checked);
	};

	const handleCityTypeChange = (
		event: React.ChangeEvent<{ value: unknown }>
	) => {
		setCityType(event.target.value as string);
	};

	const handleSiblingCountChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSiblingCount(parseInt(event.target.value) || 0);
	};

	const calculatePersonalTax = () => {
		const incomeValue = parseFloat(income as string);
		let taxableIncome = incomeValue - 5000;

		// Apply deductions
		const childDeduction = childrenCount * 1000;

		let rentDeduction = 0;
		if (isRenting) {
			if (cityType === "municipality") {
				rentDeduction = 1500;
			} else if (cityType === "large") {
				rentDeduction = 1100;
			} else {
				rentDeduction = 800;
			}
		}

		let elderCareDeduction = 0;
		if (siblingCount === 0) {
			elderCareDeduction = 2000;
		} else if (siblingCount === 1) {
			elderCareDeduction = 1000;
		} else if (siblingCount === 2) {
			elderCareDeduction = 667;
		} else if (siblingCount === 3) {
			elderCareDeduction = 500;
		} else if (siblingCount >= 4) {
			elderCareDeduction = 400;
		}

		taxableIncome -= childDeduction + rentDeduction + elderCareDeduction;

		let taxAmount = 0;

		if (taxableIncome <= 0) {
			taxAmount = 0;
		} else if (taxableIncome <= 3000) {
			taxAmount = taxableIncome * 0.03;
		} else if (taxableIncome <= 12000) {
			taxAmount = taxableIncome * 0.1 - 210;
		} else if (taxableIncome <= 25000) {
			taxAmount = taxableIncome * 0.2 - 1410;
		} else if (taxableIncome <= 35000) {
			taxAmount = taxableIncome * 0.25 - 2660;
		} else if (taxableIncome <= 55000) {
			taxAmount = taxableIncome * 0.3 - 4410;
		} else if (taxableIncome <= 80000) {
			taxAmount = taxableIncome * 0.35 - 7160;
		} else {
			taxAmount = taxableIncome * 0.45 - 15160;
		}

		setTax(taxAmount.toFixed(2));
	};

	const calculateOrganizationTax = () => {
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
					<Tab label="月度工资" {...a11yProps(0)} />
					<Tab label="全年工资" {...a11yProps(1)} />
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
						<TextField
							label="3岁以上受教育子女数量"
							type="number"
							variant="outlined"
							fullWidth
							margin="normal"
							value={childrenCount}
							onChange={handleChildrenCountChange}
							inputProps={{
								min: 0,
								startAdornment: (
									<InputAdornment position="start">
										<ChildCare />
									</InputAdornment>
								),
							}}
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={isRenting}
									onChange={handleRentingChange}
								/>
							}
							label="是否在工作城市租房"
						/>
						{isRenting && (
							<FormControl fullWidth margin="normal">
								<InputLabel>城市类型</InputLabel>
								<Select
									value={cityType}
									onChange={handleCityTypeChange}
								>
									<MenuItem value="municipality">
										直辖市
									</MenuItem>
									<MenuItem value="large">
										人口超过100万的城市
									</MenuItem>
									<MenuItem value="other">其他城市</MenuItem>
								</Select>
							</FormControl>
						)}
						<TextField
							label="兄弟姐妹数量"
							type="number"
							variant="outlined"
							fullWidth
							margin="normal"
							value={siblingCount}
							onChange={handleSiblingCountChange}
							inputProps={{ min: 0 }}
						/>
						<br />
						<br />
						<Button
							variant="contained"
							color="primary"
							fullWidth
							onClick={calculateTax}
							disabled={!income}
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
