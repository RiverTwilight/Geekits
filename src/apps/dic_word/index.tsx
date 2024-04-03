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
import localForage from "localforage";
import { Box, Typography } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";

const WordDictionary = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedData = await localForage.getItem("dictionaryData");
				if (cachedData) {
					setData(cachedData);
				} else {
					const response = await fetch("/data/word.json");
					const jsonData = await response.json();
					setData(jsonData);
					localForage.setItem("dictionaryData", jsonData);
				}
			} catch (error) {
				console.error("Error fetching data:", error);
				// Display error message to the user
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredData = useMemo(() => {
		if (!!!searchTerm.length) return [];

		return data.filter((entry) => {
			return entry.word.startsWith(searchTerm);
		});
	}, [searchTerm]);

	return (
		<>
			<FormControl fullWidth>
				<TextField
					autoFocus
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="输入词语"
					value={searchTerm}
					data-testId="inputKey"
				/>
			</FormControl>

			<br />
			<br />

			{loading ? (
				<OutlinedCard>
					<Box
						display={"flex"}
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
							正在下载词典，大约消耗 60MB
							流量。下次使用将无需下载。
						</Typography>
					</Box>
				</OutlinedCard>
			) : (
				<TableContainer component={OutlinedCard}>
					{filteredData.length > 0 && (
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>词语</TableCell>
									<TableCell>拼音</TableCell>
									<TableCell>释义</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredData.map((entry) => (
									<TableRow key={entry.word}>
										<TableCell
											sx={{ whiteSpace: "nowrap" }}
										>
											{entry.word}
										</TableCell>
										<TableCell>{entry.pinyin}</TableCell>
										<TableCell>
											{entry.explanation}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</TableContainer>
			)}
		</>
	);
};

export default WordDictionary;
