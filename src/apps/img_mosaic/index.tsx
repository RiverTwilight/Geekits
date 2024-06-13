import React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import FilePicker from "@/components/FilePicker";
import { Box, Grid } from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";

async function loadImg(src) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.onload = () => resolve(img);
		img.onerror = reject;
		img.src = src;
	});
}
async function compressAndLoadImg(src, maxWidth, maxHeight) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.onload = () => {
			var shouldCompress = false;

			// Check if UA is Safari on iOS
			var isSafariMobile =
				navigator.userAgent.match(/(iPhone|iPod|iPad)/) &&
				navigator.userAgent.match(/AppleWebKit/);

			if (
				isSafariMobile &&
				(img.width > maxWidth || img.height > maxHeight)
			) {
				shouldCompress = true;
			}

			if (shouldCompress) {
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");

				var width = img.width;
				var height = img.height;

				if (width > maxWidth) {
					height *= maxWidth / width;
					width = maxWidth;
				}

				if (height > maxHeight) {
					width *= maxHeight / height;
					height = maxHeight;
				}

				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(img, 0, 0, width, height);

				resolve(canvas.toDataURL()); // Resolve with compressed image data URL
			} else {
				resolve(src); // Resolve with original image source if no compression needed
			}
		};

		img.onerror = reject;
		img.src = src;
	});
}

async function imgMosaic_Y(assets, callback) {
	var compressedImages = await Promise.all(
		assets.map((src) => compressAndLoadImg(src, 512, 512))
	); // Adjust maxWidth and maxHeight as needed

	var totalHeight = compressedImages.reduce((acc, dataURL) => {
		var img = new Image();
		img.src = dataURL;
		return acc + img.height; // Use img.height directly
	}, 0);

	var maxWidth = Math.max(
		...compressedImages.map((dataURL) => {
			var img = new Image();
			img.src = dataURL;
			return img.width; // Use img.width directly
		})
	);

	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");
	c.width = maxWidth;
	c.height = totalHeight;

	var startY = 0;
	// Use forEach to ensure all images are drawn sequentially
	compressedImages.forEach((dataURL) => {
		var img = new Image();
		img.onload = () => {
			ctx.drawImage(img, 0, startY, img.width, img.height);
			startY += img.height;
			if (startY >= totalHeight) {
				var res = c.toDataURL();
				callback(res); // Callback once all images are drawn
			}
		};
		img.src = dataURL;
	});
}

async function imgMosaic_X(assets, callback) {
	var compressedImages = await Promise.all(
		assets.map((src) => compressAndLoadImg(src, 512, 512))
	);

	var totalWidth = compressedImages.reduce((acc, dataURL) => {
		var img = new Image();
		img.src = dataURL;
		return acc + img.width;
	}, 0);

	var maxHeight = Math.max(
		...compressedImages.map((dataURL) => {
			var img = new Image();
			img.src = dataURL;
			return img.height;
		})
	);

	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");
	c.width = totalWidth;
	c.height = maxHeight;

	var startX = 0;
	// Use forEach to ensure all images are drawn sequentially
	compressedImages.forEach((dataURL) => {
		var img = new Image();
		img.onload = () => {
			ctx.drawImage(img, startX, 0, img.width, img.height);
			startX += img.width;
			if (startX >= totalWidth) {
				var res = c.toDataURL();
				console.log("get res", res);
				callback(res); // Callback once all images are drawn
			}
		};
		img.src = dataURL;
	});
}

const Preview: React.FC<{ res: string }> = (props) => {
	if (!props.res) return null;

	const handleDownload = () => {
		var a = document.createElement("a");
		a.href = props.res;
		a.download = "";
		a.click();
	};

	return (
		<Box sx={{ marginTop: 2, overflow: "auto", maxHeight: "800px" }}>
			<img width="100%" alt="结果" src={props.res} />
			<Button onClick={handleDownload} />
		</Box>
	);
};

export default class extends React.Component<
	{},
	{ assests: { img: string }[]; direction: 0 | 1; res: string }
> {
	constructor(props: {}) {
		super(props);
		this.state = {
			assests: [],
			direction: 0,
			res: null,
		};
	}

	handleChange(value) {
		this.setState({
			direction: value,
		});
	}

	handleGenerate = () => {
		const { assests, direction } = this.state;

		const params = [
			assests.map((item) => item.img),
			(res) => {
				this.setState({
					res,
				});
			},
		];

		switch (direction) {
			case 0:
				imgMosaic_X.apply(this, [...params]);
				break;
			case 1:
				imgMosaic_Y.apply(this, [...params]);
				break;
		}
	};

	render() {
		const { assests, res, direction } = this.state;
		return (
			<>
				<Grid container spacing={{ xs: 1, sm: 1 }}>
					{assests &&
						assests.map((item, i) => {
							const title = `第${i + 1}张`;
							return (
								<Grid
									sx={{
										maxHeight: "280px",
										aspectRatio: "1",
									}}
									item
									xs={6}
									md={4}
									sm={3}
									key={item.img}
								>
									<OutlinedCard
										style={{
											height: "100%",
											width: "100%",
											overflow: "hidden",
											position: "relative",
										}}
									>
										<img
											src={`${item.img}`}
											srcSet={`${item.img} 2x`}
											alt={title}
											style={{ objectFit: "cover" }}
											height="100%"
											width="100%"
										/>
										<Box>
											<IconButton
												sx={{
													position: "absolute",
													top: "5px",
													right: "5px",
													background:
														"rgba(0, 0, 0, 0.6)",
													color: "white",
												}}
												onClick={() => {
													assests.splice(i, 1);
													this.setState({
														assests: assests,
													});
												}}
												aria-label={`info about ${title}`}
											>
												<ClearIcon />
											</IconButton>
										</Box>
									</OutlinedCard>
								</Grid>
							);
						})}
					<Grid
						sx={{
							height: "280px",
							aspectRatio: "1",
						}}
						item
						xs={6}
						md={4}
						sm={3}
					>
						<OutlinedCard
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								width: "100%",
							}}
						>
							<FilePicker
								fileType="image/*"
								multiple={true}
								handleFileUpload={(file) => {
									assests.push({
										img: file,
									});

									this.setState({
										assests: assests,
									});
								}}
							/>
						</OutlinedCard>
					</Grid>
				</Grid>

				<br></br>

				<OutlinedCard style={{ padding: "12px" }}>
					<Box
						display={"flex"}
						flexDirection={"row-reverse"}
						justifyContent={"space-between"}
						alignItems={"center"}
						gap={1}
					>
						<Button
							onClick={this.handleGenerate}
							startIcon={<CheckIcon />}
							variant="contained"
							disabled={!!!assests.length}
						>
							OK
						</Button>
						<Box>
							<FormControlLabel
								onChange={() => this.handleChange(0)}
								control={<Checkbox checked={direction === 0} />}
								label="横向"
							/>
							<FormControlLabel
								onChange={() => this.handleChange(1)}
								control={<Checkbox checked={direction === 1} />}
								label="纵向"
							/>
						</Box>
					</Box>
				</OutlinedCard>

				<Preview res={res} />
			</>
		);
	}
}
