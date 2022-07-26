import React from "react";
import Image from "./image";
import Caption from "./caption";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function (_: any) {
	const [alignment, setAlignment] = React.useState("caption");

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};

	return (
		<>
			<ToggleButtonGroup
				color="primary"
				value={alignment}
				exclusive
				onChange={handleChange}
			>
				<ToggleButton value="caption">影视字幕</ToggleButton>
				<ToggleButton value="image">图片拼接</ToggleButton>
			</ToggleButtonGroup>
			{alignment === "caption" ? <Caption /> : <Image />}
		</>
	);
}
