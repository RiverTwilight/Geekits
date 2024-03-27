import React, { useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import {
	Box,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Tooltip,
} from "@mui/material";
import { ContentCopy, SwapVert } from "@mui/icons-material";

const units = ["mm", "mil", "cm", "m", "km"];

// Validation: https://www.unitconverters.net/length/mil-to-millimeter.htm
const Converter = () => {
	const [inputValue, setInputValue] = useState("");
	const [inputUnit, setInputUnit] = useState("mm");
	const [outputUnit, setOutputUnit] = useState("cm");

	async function copyTextToClipboard(text) {
		if ("clipboard" in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand("copy", true, text);
		}
	}

	const handleCopy = (text) => {
		copyTextToClipboard(text)
			.then(() => {
				window.snackbar({ message: "已复制" });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const convert = useMemo(() => {
		const value = parseFloat(inputValue);
		if (isNaN(value)) return;

		let convertedValue;
		switch (inputUnit) {
			case "mm":
				convertedValue = value;
				break;
			case "mil":
				convertedValue = value * 0.0254;
				break;
			case "cm":
				convertedValue = value * 10;
				break;
			case "m":
				convertedValue = value * 1000;
				break;
			case "km":
				convertedValue = value * 1000000;
				break;
		}

		switch (outputUnit) {
			case "mm":
				convertedValue /= 1;
				break;
			case "mil":
				convertedValue /= 0.0254;
				break;
			case "cm":
				convertedValue /= 10;
				break;
			case "m":
				convertedValue /= 1000;
				break;
			case "km":
				convertedValue /= 1000000;
				break;
		}

		return convertedValue.toFixed(2);
	}, [inputUnit, inputValue, outputUnit]);

	const swapUnits = () => {
		const temp = inputUnit;
		setInputUnit(outputUnit);
		setOutputUnit(temp);
	};

	return (
		<Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
			<Box sx={{ maxWidth: "500px", width: "100%" }}>
				<Box display="flex" gap={1}>
					<TextField
						label="原始值"
						fullWidth
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						type="number"
					/>

					<FormControl fullWidth sx={{ maxWidth: "10em" }}>
						<InputLabel id="input-unit-label">原始单位</InputLabel>
						<Select
							labelId="input-unit-label"
							value={inputUnit}
							onChange={(e) => setInputUnit(e.target.value)}
						>
							{units.map((unit) => (
								<MenuItem key={unit} value={unit}>
									{unit}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					sx={{ width: "100%", paddingY: 1 }}
				>
					<IconButton onClick={swapUnits}>
						<SwapVert />
					</IconButton>
				</Box>
				<Box display="flex" gap={1}>
					<OutlinedInput
						endAdornment={
							<InputAdornment position="end">
								<Tooltip
									onClick={() => handleCopy(convert)}
									title="点击复制"
								>
									<IconButton
										aria-label="Copy Result"
										onClick={() => handleCopy(convert)}
										edge="end"
									>
										<ContentCopy />
									</IconButton>
								</Tooltip>
							</InputAdornment>
						}
						fullWidth
						value={convert}
						disabled
					/>
					<FormControl fullWidth sx={{ maxWidth: "10em" }}>
						<InputLabel id="output-unit-label">目标单位</InputLabel>
						<Select
							labelId="output-unit-label"
							value={outputUnit}
							onChange={(e) => setOutputUnit(e.target.value)}
						>
							{units.map((unit) => (
								<MenuItem key={unit} value={unit}>
									{unit}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>
		</Box>
	);
};

export default Converter;
