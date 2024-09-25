import React from "react";
import mimeTypes from "./dictionary";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Export the Result component for testing
export function Result({ kwd }: { kwd: string }) {
	if (kwd === "") return null;
	const length = Object.getOwnPropertyNames(mimeTypes).length;
	const type = Object.values(mimeTypes);
	const extension = Object.keys(mimeTypes);
	var res = [];
	for (var i = length - 1; i >= 0; i--) {
		// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
		if (extension[i].indexOf(kwd) !== -1 || type[i].indexOf(kwd) !== -1) {
			//console.log(Object.keys(mimeTypes)[i]); //输出键值（类型）
			res.push({
				type: type[i],
				extension: extension[i],
			});
		}
	}
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell>扩展名</TableCell>
						<TableCell>类型/子类型</TableCell>
					</TableRow>
					{res.map((piece, i) => (
						<TableRow key={i}>
							<TableCell>{piece.extension}</TableCell>
							<TableCell>{piece.type}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

type ComponentState = any;

export default class Mimetype extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			kwd: "",
		};
	}
	// compomenetDidMount() {
	// 	var clipboard = new ClipboardJS("tr td:nth-child(2)", {
	// 		// @ts-expect-error ts-migrate(2322) FIXME: Type 'default' is missing the following properties... Remove this comment to see the full error message
	// 		target: () => {
	// 			return this;
	// 		},
	// 	});
	// 	clipboard.on("success", (e) => {
	// 		console.log(e);
	// 		window.snackbar({
	// 			message: "已复制",
	// 		});
	// 	});
	// }
	handleInput = (e: any) => {
		this.setState({
			kwd: e.target.value,
		});
	};
	render() {
		const { kwd } = this.state;
		return (
			<>
				<FormControl fullWidth>
					<InputLabel htmlFor="search">输入类型/扩展名</InputLabel>
					<Input
						autoComplete="off"
						id="search"
						value={kwd}
						onChange={this.handleInput}
						placeholder={
							"从" +
							Object.getOwnPropertyNames(mimeTypes).length +
							"条数据中查找"
						}
					/>
				</FormControl>
				<Result kwd={this.state.kwd} />
			</>
		);
	}
}
