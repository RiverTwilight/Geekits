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
import { Box, Typography } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";
import { useStateWithQuery } from "use-query-sync";

interface CommandData {
	command: string;
	description: string;
	usage: string;
	examples: string[];
}

const MinecraftCommands = () => {
	const [data, setData] = useState<CommandData[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useStateWithQuery("", {
		name: "cmd",
		initFromQuery: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/data/minecraft_commands.json");
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
		if (!searchTerm) return data;

		return data.filter(
			(entry) =>
				entry.command
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				entry.description
					.toLowerCase()
					.includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, data]);

	return (
		<>
			<FormControl fullWidth>
				<TextField
					autoFocus
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="Search commands..."
					value={searchTerm}
					data-testId="inputKey"
				/>
			</FormControl>

			<br />
			<br />

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
							Loading Minecraft commands...
						</Typography>
					</Box>
				</OutlinedCard>
			) : (
				<TableContainer component={OutlinedCard}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Command</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Usage</TableCell>
								<TableCell>Examples</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredData.map((entry) => (
								<TableRow key={entry.command}>
									<TableCell sx={{ whiteSpace: "nowrap" }}>
										/{entry.command}
									</TableCell>
									<TableCell>{entry.description}</TableCell>
									<TableCell>{entry.usage}</TableCell>
									<TableCell>
										{entry.examples.map(
											(example, index) => (
												<div key={index}>{example}</div>
											)
										)}
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

export default MinecraftCommands;
