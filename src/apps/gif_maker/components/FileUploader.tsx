import React from "react";
import { Button } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

interface FileUploaderProps {
	accept: string;
	multiple?: boolean;
	onUpload: (file: string) => void;
	label: string;
}

export function FileUploader({
	accept,
	multiple,
	onUpload,
	label,
}: FileUploaderProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (!files) return;

		Array.from(files).forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					onUpload(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		});
	};

	return (
		<Button
			variant="contained"
			component="label"
			startIcon={<FileUploadIcon />}
		>
			{label}
			<input
				type="file"
				hidden
				accept={accept}
				multiple={multiple}
				onChange={handleChange}
			/>
		</Button>
	);
}
