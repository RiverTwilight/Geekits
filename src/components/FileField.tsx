import React, { useState } from "react";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import adaptiveBorder from "@/utils/adaptiveBorder";

export default function FileField({ children }) {
	return (
		<Box
			sx={{
				width: "300px",
				height: "200px",
				display: "flex",
				borderRadius: "26px",
				border: (theme) => adaptiveBorder(theme, "dashed"),
				justifyContent: "center",
			}}
		>
			<CardContent
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				{children}
			</CardContent>
		</Box>
	);
}
