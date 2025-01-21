import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Paper,
	Chip,
	Stack,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	CircularProgress,
	IconButton,
	InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Capacitor } from "@capacitor/core";
import { root } from "src/site.config";
import OutlinedCard from "@/components/OutlinedCard";

interface LotteryState {
	openPrice: string;
	highPrice: string;
	lowPrice: string;
	closePrice: string;
	volume: string;
	maxNumber: number;
	count: number;
	result: number[];
	stockSymbol: string;
	isLoading: boolean;
}

const LotteryTool: React.FC = () => {
	const [state, setState] = useState<LotteryState>({
		openPrice: "",
		highPrice: "",
		lowPrice: "",
		closePrice: "",
		volume: "",
		maxNumber: 100,
		count: 5,
		result: [],
		stockSymbol: "",
		isLoading: false,
	});

	const generateLotteryNumbers = () => {
		function hashPrice(price: number): number {
			return (Math.floor((price % 1) * 10000) % state.maxNumber) + 1;
		}

		const numbers = new Set<number>();

		// Add numbers from each price
		numbers.add(hashPrice(parseFloat(state.openPrice)));
		numbers.add(hashPrice(parseFloat(state.highPrice)));
		numbers.add(hashPrice(parseFloat(state.lowPrice)));
		numbers.add(hashPrice(parseFloat(state.closePrice)));
		numbers.add(
			(Math.floor((parseInt(state.volume) % 100000) / 100) %
				state.maxNumber) +
				1
		);

		// If we need more numbers, use combinations
		while (numbers.size < state.count) {
			const newNum =
				(Array.from(numbers).reduce((a, b) => a + b, 0) %
					state.maxNumber) +
				1;
			numbers.add(newNum);
		}

		// Take only the required count of numbers
		const result = Array.from(numbers)
			.slice(0, state.count)
			.sort((a, b) => a - b);
		setState((prev) => ({ ...prev, result }));
	};

	const fetchStockData = async () => {
		if (!state.stockSymbol) return;

		setState((prev) => ({ ...prev, isLoading: true }));
		try {
			const response = await fetch(
				Capacitor.getPlatform() === "web"
					? `/api/stock?symbol=${encodeURIComponent(
							state.stockSymbol
					  )}`
					: `${root}/api/stock?symbol=${encodeURIComponent(
							state.stockSymbol
					  )}`
			);

			if (!response.ok) {
				throw new Error("Failed to fetch stock data");
			}

			const data = await response.json();

			if (!data.chart?.result?.[0]) {
				throw new Error("Invalid stock symbol");
			}

			const quote = data.chart.result[0].indicators.quote[0];
			const timestamp = data.chart.result[0].timestamp;
			const lastIndex = timestamp.length - 1;

			setState((prev) => ({
				...prev,
				openPrice: quote.open[0].toFixed(2),
				highPrice: quote.high[lastIndex].toFixed(2),
				lowPrice: quote.low[lastIndex].toFixed(2),
				closePrice: quote.close[lastIndex].toFixed(2),
				volume: Math.floor(quote.volume[lastIndex]).toString(),
				isLoading: false,
			}));
		} catch (error) {
			console.error("Failed to fetch stock data:", error);
			setState((prev) => ({ ...prev, isLoading: false }));
			// You might want to add a snackbar or other UI element to show the error
		}
	};

	const handleChange =
		(field: keyof LotteryState) =>
		(event: React.ChangeEvent<HTMLInputElement | { value: unknown }>) => {
			setState((prev) => ({ ...prev, [field]: event.target.value }));
		};

	return (
		<Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
			<OutlinedCard padding={3}>
				<Stack spacing={3}>
					<TextField
						label="Stock Symbol"
						value={state.stockSymbol}
						onChange={handleChange("stockSymbol")}
						placeholder="e.g. AAPL"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={fetchStockData}
										disabled={
											state.isLoading ||
											!state.stockSymbol
										}
									>
										{state.isLoading ? (
											<CircularProgress size={24} />
										) : (
											<SearchIcon />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						fullWidth
					/>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 2,
						}}
					>
						<TextField
							label="Opening Price"
							value={state.openPrice}
							onChange={handleChange("openPrice")}
							type="number"
							inputProps={{ step: "0.01" }}
							fullWidth
						/>

						<TextField
							label="High Price"
							value={state.highPrice}
							onChange={handleChange("highPrice")}
							type="number"
							inputProps={{ step: "0.01" }}
							fullWidth
						/>

						<TextField
							label="Low Price"
							value={state.lowPrice}
							onChange={handleChange("lowPrice")}
							type="number"
							inputProps={{ step: "0.01" }}
							fullWidth
						/>

						<TextField
							label="Closing Price"
							value={state.closePrice}
							onChange={handleChange("closePrice")}
							type="number"
							inputProps={{ step: "0.01" }}
							fullWidth
						/>
					</Box>

					<TextField
						label="Volume"
						value={state.volume}
						onChange={handleChange("volume")}
						type="number"
						fullWidth
					/>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: 2,
						}}
					>
						<FormControl fullWidth>
							<InputLabel>Maximum Number</InputLabel>
							<Select
								value={state.maxNumber}
								label="Maximum Number"
								onChange={(event) =>
									setState((prev) => ({
										...prev,
										maxNumber: event.target.value as number,
									}))
								}
							>
								<MenuItem value={50}>50</MenuItem>
								<MenuItem value={100}>100</MenuItem>
								<MenuItem value={200}>200</MenuItem>
							</Select>
						</FormControl>

						<FormControl fullWidth>
							<InputLabel>Number Count</InputLabel>
							<Select
								value={state.count}
								label="Number Count"
								onChange={(event) =>
									setState((prev) => ({
										...prev,
										count: event.target.value as number,
									}))
								}
							>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
								<MenuItem value={7}>7</MenuItem>
							</Select>
						</FormControl>
					</Box>

					<Button
						variant="contained"
						onClick={generateLotteryNumbers}
						disabled={
							!state.openPrice ||
							!state.highPrice ||
							!state.lowPrice ||
							!state.closePrice ||
							!state.volume
						}
					>
						Generate Numbers
					</Button>

					{state.result.length > 0 && (
						<Box sx={{ mt: 3 }}>
							<Typography variant="h6" gutterBottom>
								Your Lucky Numbers:
							</Typography>
							<Stack direction="row" spacing={1} flexWrap="wrap">
								{state.result.map((number, index) => (
									<Chip
										key={index}
										label={number}
										color="primary"
										sx={{ fontSize: "1.2rem", p: 2 }}
									/>
								))}
							</Stack>
						</Box>
					)}
				</Stack>
			</OutlinedCard>
		</Box>
	);
};

export default LotteryTool;
