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
import { Box, Typography } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";
import { useStateWithQuery } from "use-query-sync";

const CharDictionary = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useStateWithQuery("", {
		name: "char",
		initFromQuery: true,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const cachedData = await localForage.getItem(
					"charDictionaryData"
				);
				if (cachedData) {
					setData(cachedData);
				} else {
					const response = await fetch("/data/char_detail.json");
					const jsonData = await response.json();

					setData(jsonData);
					localForage.setItem("charDictionaryData", jsonData);
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
		if (searchTerm.length !== 1) return [];

		return data.filter((entry) => {
			return entry.char == searchTerm.trim();
		});
	}, [searchTerm]);

	return (
		<>
			<FormControl fullWidth>
				<TextField
					autoFocus
					onChange={(event) => setSearchTerm(event.target.value)}
					placeholder="输入汉字"
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
							正在下载字典，大约消耗 12MB
							流量。下次使用将无需下载。
						</Typography>
					</Box>
				</OutlinedCard>
			) : (
				<Box>
					{filteredData.length > 0 &&
						filteredData[0].pronunciations.map((entry) => (
							<React.Fragment key={entry.char}>
								<TableContainer component={OutlinedCard}>
									<Table>
										<TableBody>
											<TableRow key={entry.pinyin}>
												<TableCell
													sx={{
														whiteSpace: "nowrap",
													}}
												>
													拼音
												</TableCell>
												<TableCell>
													{entry.pinyin.trim()}
												</TableCell>
											</TableRow>
											<TableRow key={entry.pinyin}>
												<TableCell
													sx={{
														whiteSpace: "nowrap",
													}}
												>
													释义
												</TableCell>
												<TableCell>{`${entry.explanations.map(
													(exp) => `${exp.content}\n`
												)}`}</TableCell>
											</TableRow>
										</TableBody>
										<br />
									</Table>
								</TableContainer>
								<br />
							</React.Fragment>
						))}
				</Box>
			)}
		</>
	);
};

export default CharDictionary;
