import * as React from "react";
import { Input, ListControlCheck } from "mdui-in-react";
import { TABLE, TABLE_REVERSE } from "./dic";

const JsKeycode = () => {
	const [value, setValue] = React.useState("");
	const [lock, setLock] = React.useState(true);
	const resKey = TABLE_REVERSE[value.toLocaleLowerCase()] || "未找到",
		resCode = TABLE[value.toLocaleLowerCase()] || "未找到";
	return (
		<>
			<Input
				autoFocus={true}
				onKeyDown={(e) => {
					console.log(e.key);
					if (e.key === "Escape") {
						setLock(false);
						setValue("27");
					} else {
						lock && setValue(e.key);
					}
				}}
				value={value}
				helper="按ESC解除锁定"
				placeholder="支持按键和键盘码相互查询"
				onValueChange={(newText) => {
					!lock && setValue(newText);
				}}
				data-testId="inputKey"
			/>
			<ListControlCheck
				title="锁定"
				checked={lock}
				onCheckedChange={setLock}
			/>
			<div className="mdui-table-fluid">
				<table className="mdui-table">
					<thead>
						<tr>
							<th>键盘码</th>
							<th>按键名</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{lock ? resCode : value}</td>
							<td>{lock ? value : resKey}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};

export default JsKeycode;
