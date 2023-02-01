import Box from "@mui/material/Box";

const Placeholder = ({ illustrationUrl, TextComponent }:{
	TextComponent?: React.ComponentType;
	illustrationUrl: string;
}) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			height: "inherit",
		}}
	>
		<div className="center-with-flex">
			{illustrationUrl && (
				<img height="130" width="130" src={illustrationUrl} />
			)}
			{TextComponent}
		</div>
	</Box>
);

export default Placeholder;
