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

async function loadImg(src: any) {
	var img = await new Image();
	img.src = src;
	return img;
}

async function imgMosaic_X(assets: string[], callback) {
	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");

	var imgs = [];
	c.width = 0;
	c.height = 0;

	for (var i = 0; i < assets.length; i++) {
		// Corrected the loop condition
		var ele = await loadImg(assets[i]);

		c.width += ele.width;

		if (ele.height > c.height) c.height = ele.height; // Adjust canvas height

		imgs.push(ele);
	}

	var startX = 0;
	var startY = 0;
	console.log(imgs);

	for (var j = 0; j < imgs.length; j++) {
		// Corrected the loop condition
		ctx.drawImage(imgs[j], startX, 0, imgs[j].width, imgs[j].height);
		startX += imgs[j].width;
	}

	var res = c.toDataURL();
	callback(res);
}

async function imgMosaic_Y(assests: string[], callback) {
	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");

	var imgs = [];
	c.width = 0;
	c.height = 0;

	for (var i = 0; i <= assests.length; i++) {
		var ele = await loadImg(assests[i]);

		c.height += ele.height;

		if (ele.width > c.width) c.width = ele.width;

		imgs.push(ele);
	}

	var startX = 0;
	var startY = 0;
	console.log(imgs);

	for (var j = 0; j <= imgs.length - 1; j++) {
		//console.log(imgs[j])
		ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
		startY += imgs[j].height;
	}

	var res = c.toDataURL();
	callback(res);
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
				return;
			case 1:
				imgMosaic_Y.apply(this, [...params]);
				return;
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
