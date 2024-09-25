import React from "react";
import Box from "@mui/material/Box";

const Placeholder = ({
	illustrationUrl,
	TextComponent,
}: {
	TextComponent?: React.ComponentType;
	illustrationUrl: string;
}) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			height: "inherit",
		}}
	>
		<Box className="center-with-flex">
			{illustrationUrl && (
				<img height="130" width="130" src={illustrationUrl} />
			)}
			{TextComponent}
		</Box>
	</Box>
);

export default Placeholder;
