import * as React from "react";
import { Input } from "mdui-in-react";

const TABLE = {
	k: 200,
};

const JsKeycode = () => {
	const [key, setKey] = React.useState("");
	return (
// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
		<>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<Input
// @ts-expect-error ts-migrate(2322) FIXME: Property 'onKeyDown' does not exist on type 'Intri... Remove this comment to see the full error message
				onKeyDown={(e) => {
					console.log(e);
				}}
			/>
{/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
			<p>{TABLE[key]}</p>
		</>
	);
};

export default JsKeycode;
