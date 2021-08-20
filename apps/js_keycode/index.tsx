import * as React from "react";
import { TABLE, TABLE_REVERSE } from "./dic";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";

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
