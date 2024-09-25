import React from "react";
import { styled } from "@mui/material/styles";

const StyledOutlinedCard = styled("div")(({ theme }) => ({
	// border: {
	// 	light: "1.5px solid #e0e0e0",
	// 	dark: "1.5px solid rgba(255, 255, 255, 0.23)",
	// }[theme.palette.mode],
	borderRadius: "28px",
	boxShadow: "1px black",
	transition: "border-radius 0.5s ease", // Add this line to create the transition effect
	// "&:hover": { // Add this block to define the hover state
	// 	borderRadius: "5px",
	// },
	background: theme.palette.background.default,
}));

const OutlinedCard = ({
	children,
	padding,
	className,
	style = {},
	...props
}: {
	children?: JSX.Element | JSX.Element[];
	/**将获得10的倍数 Padding */
	padding?: number;
	style?: {
		[key: string]: string | number;
	};
	className?: string;
}) => {
	return (
		<StyledOutlinedCard
			{...props}
			style={Object.assign(
				{ padding: padding ? `${padding * 10}px` : 0 },
				style
			)}
		>
			{children}
		</StyledOutlinedCard>
	);
};

export default OutlinedCard;
