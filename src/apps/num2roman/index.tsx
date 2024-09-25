import React, { useMemo } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import useInput from "@/utils/Hooks/useInput";
import toRoman from "./api";
import { Box, Card, IconButton } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
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

	const res = useMemo(() => {
		return toRoman(input);
	}, [input]);

	return (
		<>
			<Grid container spacing={2}>
				<Grid item md={6} xs={12}>
					<FormControl fullWidth>
						<TextField
							autoComplete="off"
							value={input}
							variant="outlined"
							type="number"
							onChange={setInput}
							label="输入整数"
							data-testid="roman-numeral-input"
						/>
					</FormControl>
				</Grid>
				<Grid item md={6} xs={12}>
					<Result res={res} />
				</Grid>
			</Grid>
		</>
	);
};

export default Converter;
