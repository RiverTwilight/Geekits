import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
	Box,
	Fab,
	FormControl,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard/index";
import { Search } from "@mui/icons-material";

const countryList = {
	china: {
		name: "中国大陆",
	},
	hsr: {
		name: "中国香港",
	},
	macao: {
		name: "中国澳门",
	},
};

// https://zh.wikipedia.org/wiki/%E4%B8%9A%E4%BD%99%E6%97%A0%E7%BA%BF%E7%94%B5%E5%8F%B0%E5%91%BC%E5%8F%B7

const RadioCodeLocation = () => {
	const [radioCode, setRadioCode] = useState("");
	const [location, setLocation] = useState("");
	const [country, setCountry] = useState(null);
	const [details, setDetials] = useState("");

	const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRadioCode(event.target.value);
	};

	const findLocation = () => {
		const normalizedCode = radioCode.toLocaleUpperCase();
		switch (normalizedCode[0]) {
			case "B":
				setCountry(countryList["china"]);
				let typeCode = normalizedCode[1];

				if (typeCode.match(/[A-L]/)) {
					setDetials("一般业余无线电台");
				} else if (typeCode === "J") {
					setDetials("业余无线电信标台和空间业余无线电台");
				} else if (typeCode === "R") {
					setDetials("业余无线电中继台");
				}

				break;

			case "V":
				if (normalizedCode[1] === "R" && normalizedCode[2] === "2") {
					setCountry(countryList["hsr"]);
				}

			case "X":
				if (normalizedCode[1] === "X" && normalizedCode[2] === "9") {
					setCountry(countryList["macao"]);
				}

			default:
				setCountry(countryList["china"]);
		}
	};

	return (
		<Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
			<Box sx={{ maxWidth: "600px", width: "100%" }}>
				<Box sx={{ display: "flex", gap: 1 }}>
					<TextField
						label="Radio Code"
						value={radioCode}
						fullWidth
						onChange={handleCodeChange}
						error={radioCode.length < 4 || radioCode.length > 6}
					/>

					<Button
						startIcon={<Search />}
						onClick={findLocation}
						disabled={!radioCode}
						sx={{ whiteSpace: "nowrap" }}
						variant="outlined"
					>
						查询
					</Button>
				</Box>
				<br />
				{country && (
					<TableContainer component={OutlinedCard}>
						<Table aria-label="simple table">
							<TableBody>
								<TableRow>
									<TableCell>国家或地区</TableCell>
									<TableCell>{country.name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>类型</TableCell>
									<TableCell>{details}</TableCell>
								</TableRow>
								<br />
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Box>
		</Box>
	);
};

export default RadioCodeLocation;
