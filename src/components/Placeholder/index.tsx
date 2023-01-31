import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Placeholder = ({ illustrationUrl }) => (
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
			<Typography align="center" variant="subtitle1">
				聊天，提问，抑或是请求帮助
				<br />
				更多玩法等你探索
			</Typography>
		</div>
	</Box>
);

export default Placeholder;
