import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useInput from "@/utils/Hooks/useInput";
import { Box, Card, IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";

import toYuepin from "./yuepin";
import handleCopy from "@/utils/copyToClipboard";

const Result = ({ res }: any) => {
	if (res === "") return null;

	return (
		<>
			<Card sx={{ paddingX: 2, paddingY: 1 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<code>{res}</code>
					<IconButton onClick={() => handleCopy(res)}>
						<ContentCopy />
					</IconButton>
				</Box>
			</Card>
		</>
	);
};

const Converter = () => {
	const [input, setInput] = useInput("");
	const [res, setRes] = React.useState("");

	const handleConvert = () => {
		setRes(toYuepin(input));
	};

	return (
		<>
			<Grid container spacing={2}>
				<Grid
					size={{
						md: 6,
						xs: 12,
					}}
				>
					<FormControl fullWidth>
						<TextField
							autoComplete="off"
							value={input}
							variant="outlined"
							onChange={setInput}
							rows={6}
							multiline
							label="输入汉字，简繁均可。"
						/>
					</FormControl>
					<div className="clearfix"></div>
					<br></br>
					<Grid container spacing={2}>
						<Grid
							size={{
								xs: 12,
							}}
						>
							<Button
								fullWidth
								onClick={handleConvert}
								variant="contained"
							>
								转换为粤拼
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					size={{
						md: 6,
						xs: 12,
					}}
				>
					<Result res={res} />
				</Grid>
			</Grid>
		</>
	);
};

export default Converter;
