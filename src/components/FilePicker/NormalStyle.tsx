import React from "react";
import Button from "@mui/material/Button";

const NormalStyle = ({
	fileType,
	text,
	icon,
	handleReadFile,
	...props
}: any) => {
	return (
		<div>
			<input
				accept={fileType}
				id="contained-button-file"
				onInput={handleReadFile}
				type="file"
				style={{ display: "none" }}
				{...props}
			/>
			<label htmlFor="contained-button-file">
				<Button
					aria-label="upload picture"
					variant="contained"
					color="primary"
					component="span"
					startIcon={icon}
				>
					{text}
				</Button>
			</label>
		</div>
	);
};

export default NormalStyle;
