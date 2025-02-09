import React, { useState, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";
import { useStateWithQuery } from "use-query-sync";

interface CheatCode {
	code: string;
	effect: string;
	game: string;
	platform: string;
}

const games = [
	"All Games",
	"GTA III",
	"GTA: Vice City",
	"GTA: San Andreas",
	"GTA IV",
	"GTA V",
];

const GtaCheatCodes = () => {
	const [data, setData] = useState<CheatCode[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useStateWithQuery("", {
		name: "search",
		initFromQuery: true,
	});
	const [selectedGame, setSelectedGame] = useStateWithQuery("All Games", {
		name: "game",
		initFromQuery: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/data/gta_cheat_codes.json");
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredData = useMemo(() => {
		return data.filter((entry) => {
			const matchesSearch = searchTerm
				? entry.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
				  entry.effect.toLowerCase().includes(searchTerm.toLowerCase())
				: true;

			const matchesGame =
				selectedGame === "All Games" || entry.game === selectedGame;

			return matchesSearch && matchesGame;
		});
	}, [searchTerm, selectedGame, data]);

	return (
		<>
			<Box
				sx={{
					display: "flex",
					gap: 2,
					mb: 2,
					flexDirection: { xs: "column", sm: "row" },
				}}
			>
				<FormControl fullWidth>
					<TextField
						autoFocus
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Search cheat codes..."
						value={searchTerm}
						data-testId="inputKey"
					/>
				</FormControl>
				<FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
					<Select
						value={selectedGame}
						onChange={(event) =>
							setSelectedGame(event.target.value)
						}
					>
						{games.map((game) => (
							<MenuItem key={game} value={game}>
								{game}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			{loading ? (
				<OutlinedCard>
					<Box
						display="flex"
						sx={{
							width: "100%",
							justifyContent: "center",
							flexDirection: "column",
							alignItems: "center",
							paddingY: 2,
						}}
					>
						<CircularProgress />
						<br />
						<Typography variant="body1">
							Loading GTA cheat codes...
						</Typography>
					</Box>
				</OutlinedCard>
			) : (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell width="15%">Game</TableCell>
								<TableCell width="15%">Platform</TableCell>
								<TableCell width="30%">Cheat Code</TableCell>
								<TableCell width="40%">Effect</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredData.map((entry, index) => (
								<TableRow
									key={`${entry.game}-${entry.code}-${index}`}
								>
									<TableCell
										sx={{
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{entry.game}
									</TableCell>
									<TableCell
										sx={{
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{entry.platform}
									</TableCell>
									<TableCell
										sx={{
											fontFamily: "monospace",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{entry.code}
									</TableCell>
									<TableCell
										sx={{
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{entry.effect}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</>
	);
};

export default GtaCheatCodes;
