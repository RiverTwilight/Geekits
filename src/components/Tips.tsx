import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "../utils/axios";

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
		<Typography
			onClick={updateContent}
			sx={{
				fontStyle: "italic",
				color: (theme) => theme.palette.secondary[theme.palette.mode],
			}}
			align="center"
			variant="body2"
		>
			{content.hitokoto} ({content.from})
		</Typography>
	);
}
