import React from "react";
import { styled } from '@mui/material/styles';
import Loadable from "react-loadable";
import { Theme } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const PREFIX = 'loading';

const classes = {
    loading: `${PREFIX}-loading`
};

const Root = styled('div')((
    {
        theme: Theme
    }
) => ({
    [`&.${classes.loading}`]: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
    }
}));

const Loading = (props: any) => {

	if (props.pastDelay) {
		return (
            <Root className={classes.loading}>
				<CircularProgress color="primary" />
			</Root>
        );
	}
	return null;
};

export default (loader: any) => {
	return Loadable({
		loader,
		loading: Loading,
		delay: 500,
	});
};
