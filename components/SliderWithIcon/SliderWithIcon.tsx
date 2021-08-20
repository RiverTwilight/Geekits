import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const SliderWithIcon = ({
	icon,
	children,
	title,
}: {
	icon?: any;
	title?: string;
	children: React.ReactNode;
}) => {
	return (
		<>
			{title && <Typography gutterBottom>{title}</Typography>}
			<Grid container spacing={2}>
				{icon && <Grid item>{icon}</Grid>}
				<Grid item xs>
					{children}
				</Grid>
			</Grid>
		</>
	);
};

export default SliderWithIcon;
