import React from "react";
import { Box } from "@mui/material";

interface PreviewProps {
	src?: string;
}

export function Preview({ src }: PreviewProps) {
	if (!src) return null;

	return (
		<Box sx={{ mt: 2 }}>
			<img
				src={src}
				alt="GIF Preview"
				style={{
					maxWidth: "100%",
					height: "auto",
					display: "block",
					margin: "0 auto",
				}}
			/>
		</Box>
	);
}
