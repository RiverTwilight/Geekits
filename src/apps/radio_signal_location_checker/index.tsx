import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
	useTheme,
	useMediaQuery,
} from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard/index";
import { Search } from "@mui/icons-material";

const countryList = {
	china: { name: "中国大陆" },
	hsr: { name: "中国香港" },
	macao: { name: "中国澳门" },
	usa: { name: "美国" },
	canada: { name: "加拿大" },
	japan: { name: "日本" },
	southKorea: { name: "韩国" },
	uk: { name: "英国" },
	germany: { name: "德国" },
	france: { name: "法国" },
	australia: { name: "澳大利亚" },
};

// https://zh.wikipedia.org/wiki/%E4%B8%9A%E4%BD%99%E6%97%A0%E7%BA%BF%E7%94%B5%E5%8F%B0%E5%91%BC%E5%8F%B7

const RadioCodeLocation = () => {
	const [radioCode, setRadioCode] = useState("");
	const [location, setLocation] = useState("");
	const [country, setCountry] = useState(null);
	const [details, setDetials] = useState("");

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRadioCode(event.target.value);
	};

	const findLocation = () => {
		const normalizedCode = radioCode.toLocaleUpperCase();
		const firstChar = normalizedCode[0];
		const secondChar = normalizedCode[1];

		switch (firstChar) {
			case "B":
				setCountry(countryList["china"]);
				let typeCode = secondChar;

				if (typeCode.match(/[A-L]/)) {
					setDetials("一般业余无线电台");
				} else if (typeCode === "J") {
					setDetials("业余无线电信标台和空间业余无线电台");
				} else if (typeCode === "R") {
					setDetials("业余无线电中继台");
				}
				break;

			case "V":
				if (secondChar === "R" && normalizedCode[2] === "2") {
					setCountry(countryList["hsr"]);
				}
				break;

			case "X":
				if (secondChar === "X" && normalizedCode[2] === "9") {
					setCountry(countryList["macao"]);
				}
				break;

			case "A":
			case "K":
			case "N":
			case "W":
				setCountry(countryList["usa"]);
				setDetials("美国业余无线电台");
				break;

			case "J":
				if (secondChar === "A") {
					setCountry(countryList["japan"]);
					setDetials("日本业余无线电台");
				}
				break;

			case "H":
				if (secondChar === "L") {
					setCountry(countryList["southKorea"]);
					setDetials("韩国业余无线电台");
				}
				break;

			case "V":
				if (secondChar === "E") {
					setCountry(countryList["canada"]);
					setDetials("加拿大业余无线电台");
				}
				break;

			case "G":
			case "M":
				setCountry(countryList["uk"]);
				setDetials("英国业余无线电台");
				break;

			case "D":
				setCountry(countryList["germany"]);
				setDetials("德国业余无线电台");
				break;

			case "F":
				setCountry(countryList["france"]);
				setDetials("法国业余无线电台");
				break;

			case "V":
				if (secondChar === "K") {
					setCountry(countryList["australia"]);
					setDetials("澳大利亚业余无线电台");
				}
				break;

			default:
				setCountry(null);
				setDetials("未知国家或地区");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				maxWidth: "800px",
				margin: "0 auto",
				padding: theme.spacing(3),
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: isMobile ? "column" : "row",
					gap: theme.spacing(2),
					width: "100%",
					marginBottom: theme.spacing(4),
				}}
			>
				<TextField
					label="Radio Code"
					value={radioCode}
					onChange={handleCodeChange}
					error={radioCode.length < 4 || radioCode.length > 6}
					helperText={
						radioCode.length < 4 || radioCode.length > 6
							? "Code must be 4-6 characters"
							: ""
					}
					fullWidth
					variant="outlined"
				/>
				<Button
					startIcon={<Search />}
					onClick={findLocation}
					disabled={!radioCode}
					variant="contained"
					color="primary"
					sx={{
						minWidth: isMobile ? "100%" : "120px",
						height: isMobile ? "48px" : "56px",
					}}
				>
					查询
				</Button>
			</Box>
			{country && (
				<OutlinedCard sx={{ width: "100%" }}>
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell
										component="th"
										scope="row"
										sx={{ fontWeight: "bold" }}
									>
										国家或地区
									</TableCell>
									<TableCell>{country.name}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell
										component="th"
										scope="row"
										sx={{ fontWeight: "bold" }}
									>
										类型
									</TableCell>
									<TableCell>{details}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</OutlinedCard>
			)}
		</Box>
	);
};

export default RadioCodeLocation;
