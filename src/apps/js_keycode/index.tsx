import * as React from "react";
import { Input } from "mdui-in-react";

const TABLE = {
	k: 200,
};

const JsKeycode = () => {
	const [key, setKey] = React.useState("");
	return (
		<>
			<Input
				onKeyDown={(e) => {
					console.log(e);
				}}
			/>
			<p>{TABLE[key]}</p>
		</>
	);
};

export default JsKeycode;
