import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";

const PREFIX = "PricingCard";

const classes = {
	root: `${PREFIX}-root`,
	header: `${PREFIX}-header`,
	list: `${PREFIX}-list`,
	button: `${PREFIX}-button`,
	action: `${PREFIX}-action`,
};

const StyledCard = styled(Card)(({ theme }) => ({ bgColor, color }) => ({
	background: bgColor,
	color: color && color,
	[`&.${classes.root}`]: {
		borderRadius: 12,
		minWidth: 100,
		textAlign: "center",
	},

	[`& .${classes.header}`]: {
		textAlign: "center",
		spacing: 10,
	},

	[`& .${classes.list}`]: {
		padding: "20px",
	},

	[`& .${classes.button}`]: {
		margin: theme.spacing(1),
	},

	[`& .${classes.action}`]: {
		display: "flex",
		justifyContent: "space-around",
	},
}));

function PricingCard({ price, title, subtitles, bgColor, color }) {
	return (
		<StyledCard bgColor={bgColor} color={color} className={classes.root}>
			<CardHeader title={title} className={classes.header} />
			<Divider variant="middle" />
			<CardContent>
				<Typography variant="h4" align="center">
					{price}
				</Typography>
				{subtitles && (
					<div className={classes.list}>
						{subtitles.map((sub) => (
							<Typography align="center">{sub}</Typography>
						))}
					</div>
				)}
			</CardContent>
			<Divider variant="middle" />
			{/* <CardActions className={classes.action}>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
				>
					Buy
				</Button>
			</CardActions> */}
		</StyledCard>
	);
}

export default PricingCard;
