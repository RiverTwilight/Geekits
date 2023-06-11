import { styled } from "@mui/material/styles";

const StyledOutlinedCard = styled("div")(({ theme }) => ({
	border: {
		light: "thin solid #e0e0e0",
		dark: "thin solid rgba(255, 255, 255, 0.23)",
	}[theme.palette.mode],
	borderRadius: theme.spacing(1),
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
	style: {
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
			sx={{
				overflow: "hidden",
			}}
		>
			{children}
		</StyledOutlinedCard>
	);
};

export default OutlinedCard;
