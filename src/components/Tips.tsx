import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "../utils/axios";
import { Box } from "@mui/material";
import { AutoAwesome, Star } from "@mui/icons-material";

const API = "https://v1.hitokoto.cn/?c=";

export default function Tips() {
	const [content, setContent] = useState<{
		hitokoto: string;
		from: string;
	}>(null);

	const updateContent = () => {
		axios.get(API).then((res) => {
			setContent(res.data);
		});
	};

	useEffect(() => {
		updateContent();
	}, []);

	if (!content) return null;

	return (
		<Box
			display="flex"
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			paddingY={1}
		>
			<AutoAwesome
				sx={{
					color: (theme) =>
						theme.palette.secondary[theme.palette.mode],
				}}
			/>
			<br />
			<Typography
				onClick={updateContent}
				sx={{
					color: (theme) =>
						theme.palette.secondary[theme.palette.mode],
				}}
				align="center"
				variant="body2"
			>
				{content.hitokoto} ({content.from})
			</Typography>
		</Box>
	);
}
