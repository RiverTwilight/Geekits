import * as React from "react";
import { Input } from "mdui-in-react";

const TABLE:{
	[key: string]: number
} = {
	k: 200,
};

const JsKeycode = () => {
	const [key, setKey] = React.useState("");
	return (

		<>

			<Input
// @ts-expect-error ts-migrate(2322) FIXME: Property 'onKeyDown' does not exist on type 'Intri... Remove this comment to see the full error message
				onKeyDown={(e) => {
					console.log(e);
				}}
			/>

			<p>{TABLE[key]}</p>
		</>
	);
};

export default JsKeycode;
