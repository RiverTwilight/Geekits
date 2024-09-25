import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const PaperBackground = ({
	children,
	padding,
	contentWidth = 1180,
	className,
	style = {},
	...props
}: {
	children?: JSX.Element | JSX.Element[];
	/**将获得10的倍数 Padding */
	padding?: number;
	contentWidth?: number;
	style?: {
		[key: string]: string | number;
	};
	className?: string;
}) => {
	return (
		<Box
			sx={{
				flexGrow: 1,
				paddingX: { sm: 4, xs: 3 },
				paddingY: { sm: 3, xs: 3 },
				marginX: { sm: 4, xs: 0 },
				background: (theme) => theme.palette.background.paper,
				borderRadius: { xs: "0px", sm: "24px" },
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Box
				sx={{
					maxWidth: `${contentWidth}px`,
					width: "100%",
				}}
			>
				{children}
			</Box>
		</Box>
	);
};

export default PaperBackground;
