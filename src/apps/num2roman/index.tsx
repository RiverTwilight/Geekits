import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import OutlinedCard from "@/components/OutlinedCard";
import useInput from "@/utils/Hooks/useInput";
import toRoman from "./api";

const Result = ({ res }: any) => {
	if (res === "") return null;
	return (
		<>
			<OutlinedCard>
				<code>{res}</code>
			</OutlinedCard>
		</>
	);
};

const Converter = () => {
	const [input, setInput] = useInput("");
	const [res, setRes] = React.useState("");

	const handleConvert = () => {
		setRes(toRoman(input));
	};

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
						/>
					</FormControl>
					<div className="clearfix"></div>
					<br></br>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button
								fullWidth
								onClick={handleConvert}
								variant="contained"
							>
								转换
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								disabled={input === ""}
								fullWidth
								variant="outlined"
								id="becopy"
								data-clipboard-text={res}
							>
								复制结果
							</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item md={6} xs={12}>
					<Result res={res} />
				</Grid>
			</Grid>
		</>
	);
};

export default Converter;
