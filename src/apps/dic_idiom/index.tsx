import React, { useState, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CircularProgress from "@mui/material/CircularProgress";
import localForage from "localforage";
import { Box, Chip, Typography } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";

// https://github.com/mapull/chinese-dictionary
const IdiomDictionary = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedData = await localForage.getItem(
					"idiomDictionaryData"
				);
				if (cachedData) {
					setData(cachedData);
				} else {
					const response = await fetch("/data/idiom.json");
					const jsonData = await response.json();
					setData(jsonData);
					localForage.setItem("idiomDictionaryData", jsonData);
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
					placeholder="输入成语"
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
							正在下载词典，大约消耗 20MB
							流量。下次使用将无需下载。
						</Typography>
					</Box>
				</OutlinedCard>
			) : (
				filteredData.length > 0 &&
				filteredData.map((entry) => (
					<TableContainer component={OutlinedCard}>
						<Table key={entry.word}>
							<TableBody>
								<TableRow>
									<TableCell>拼音</TableCell>
									<TableCell>{entry.pinyin}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>释义</TableCell>
									<TableCell>{entry.explanation}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>用例</TableCell>
									<TableCell>{entry.usage}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>近义词</TableCell>
									<TableCell>
										<Box
											display={"flex"}
											gap={1}
											alignItems={"center"}
										>
											{entry.similar.map((w) => (
												<Chip
													key={w}
													label={w}
													onClick={() => {
														setSearchTerm(w);
													}}
												/>
											))}
										</Box>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<br />
					</TableContainer>
				))
			)}
		</>
	);
};

export default IdiomDictionary;
