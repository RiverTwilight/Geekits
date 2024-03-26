import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import HighwayIcon from "@mui/icons-material/LocalAtm";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { Box, Fab } from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";
import fuelConsumptionByModel from "./models";

interface FuelConsumptionCalculatorState {
	distance: number;
	brand: string;
	model: string;
	highwayFee: number;
	fuelPrice: number;
	totalCost: number;
}

export default function FuelConsumptionCalculator() {
	const [state, setState] = useState<FuelConsumptionCalculatorState>({
		distance: 100,
		brand: "",
		model: "",
		highwayFee: 0,
		fuelPrice: 8.02,
		totalCost: 0,
	});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = event.target;
		setState({ ...state, [name]: value });
	};

	const calculateCost = (): void => {
		const { distance, brand, model, highwayFee, fuelPrice } = state;
		const selectedModel = fuelConsumptionByModel[brand].models.find(
			(m) => m.name === model
		);
		if (!selectedModel) {
			return;
		}
		const fuelConsumption = selectedModel.consumption;
		const fuelCost = (distance / 100) * fuelConsumption * fuelPrice;
		const totalCost: number = Number(fuelCost) + Number(highwayFee);
		setState({ ...state, totalCost });
	};

	const availableModels = state.brand
		? Object.keys(fuelConsumptionByModel[state.brand])
		: [];

	return (
		<>
			<Box sx={{ display: "flex", gap: 1 }}>
				<FormControl fullWidth>
					<TextField
						name="distance"
						label="里程 (km)"
						type="number"
						value={state.distance}
						onChange={handleChange}
						margin="normal"
					/>
				</FormControl>
			</Box>
			<br />
			<br />
			<Box sx={{ display: "flex", gap: 1 }}>
				<FormControl fullWidth margin="normal">
					<InputLabel id="brand-label">品牌</InputLabel>
					<Select
						labelId="brand-label"
						name="brand"
						value={state.brand}
						onChange={handleChange}
						label="Brand"
					>
						{Object.keys(fuelConsumptionByModel).map((brand) => (
							<MenuItem key={brand} value={brand}>
								{fuelConsumptionByModel[brand].name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth margin="normal">
					<InputLabel id="model-label">车型</InputLabel>
					<Select
						labelId="model-label"
						name="model"
						value={state.model}
						onChange={handleChange}
						label="车型"
						disabled={!state.brand}
					>
						{state.brand &&
							fuelConsumptionByModel[state.brand].models.map(
								(model) => (
									<MenuItem
										key={model.name}
										value={model.name}
									>
										{model.name}
									</MenuItem>
								)
							)}
					</Select>
				</FormControl>
			</Box>
			<br />
			<Box sx={{ display: "flex", gap: 1 }}>
				<FormControl fullWidth>
					<TextField
						name="highwayFee"
						label="通行费"
						type="number"
						value={state.highwayFee}
						onChange={handleChange}
						margin="normal"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<HighwayIcon />
								</InputAdornment>
							),
						}}
					/>
				</FormControl>
				<FormControl fullWidth>
					<TextField
						name="fuelPrice"
						label="油价（每升）"
						type="number"
						value={state.fuelPrice}
						onChange={handleChange}
						margin="normal"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LocalGasStationIcon />
								</InputAdornment>
							),
						}}
					/>
				</FormControl>
			</Box>
			<br />
			<br />
			<br />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Fab
					color="primary"
					onClick={calculateCost}
					disabled={!(state.brand && state.model)}
				>
					<CheckOutlined />
				</Fab>
			</Box>
			<br />
			<br />
			{state.totalCost > 0 && (
				<Typography textAlign="center" variant="h5">
					本次行程总计开销&nbsp;
					<span className="Textc(green)">
						{Math.floor(state.totalCost * 100) / 100}
					</span>
					&nbsp;元
				</Typography>
			)}
		</>
	);
}
