import * as React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import { TABLE, TABLE_REVERSE } from "./dic";

const JsKeycode = () => {
	const [value, setValue] = React.useState("");
	const [lock, setLock] = React.useState(true);
	const resKey = TABLE_REVERSE[value.toLocaleLowerCase()] || "未找到",
		resCode = TABLE[value.toLocaleLowerCase()] || "未找到";
	return (
		<>
			<FormControl fullWidth>
				<TextField
					autoFocus
					onChange={(newText) => {
						!lock && setValue(newText.target.value);
					}}
					helperText="按ESC解除锁定"
					placeholder="支持按键和键盘码相互查询"
					value={value}
					onKeyDown={(e) => {
						console.log(e.key);
						if (e.key === "Escape") {
							setLock(false);
							setValue("27");
						} else {
							lock && setValue(e.key);
						}
					}}
					data-testId="inputKey"
				/>
			</FormControl>
			<FormControlLabel
				control={
					<Checkbox
						checked={lock}
						onChange={(_, checked) => setLock(checked)}
					/>
				}
				label="锁定"
			/>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>键盘码</TableCell>
							<TableCell>按键名</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell>{lock ? resCode : value}</TableCell>
							<TableCell>{lock ? value : resKey}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default JsKeycode;
