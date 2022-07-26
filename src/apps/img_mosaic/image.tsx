import React from "react";
import FileInput from "../../components/FileInput";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

async function loadImg(src: any) {
	var img = await new Image();
	img.src = src;
	return img;
}

async function imgMosaic_X(assests, callback) {
	var c = document.createElement("canvas");
	var ctx = c.getContext("2d");

	var imgs = [];
	c.width = 0;
	c.height = 0;

	for (var i = 0; i <= assests.length - 1; i++) {
		var ele = await loadImg(assests[i]);

		c.width += ele.width;

		if (ele.height > c.height) c.height = ele.height;

		imgs.push(ele);
	}

	var startX = 0;
	var startY = 0;
	console.log(imgs);

	for (var j = 0; j <= imgs.length - 1; j++) {
		//console.log(imgs[j])
		ctx.drawImage(imgs[j], startX, 0, imgs[j].width, imgs[j].height);
		startX += imgs[j].width;
	}

	var res = c.toDataURL();
	console.log(res);
	callback(res);
}

async function imgMosaic_Y(assests, callback) {
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

	console.log("the canvas size is " + c.width + " x " + c.height);

	var startX = 0;
	var startY = 0;
	console.log(imgs);

	for (var j = 0; j <= imgs.length - 1; j++) {
		//console.log(imgs[j])
		ctx.drawImage(imgs[j], 0, startY, imgs[j].width, imgs[j].height);
		startY += imgs[j].height;
	}

	var res = c.toDataURL();
	console.log(res);
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
		<>
			<img alt="结果" src={props.res} />
			<Button onClick={handleDownload} />
		</>
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

	render() {
		const { assests, res, direction } = this.state;
		return (
			<>
				<ImageList sx={{ width: 500, height: 450 }}>
					{assests &&
						assests.map((item) => {
							const title = ``;
							return (
								<ImageListItem key={item.img}>
									<img
										src={`${item.img}?w=248&fit=crop&auto=format`}
										srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
										alt={title}
										loading="lazy"
									/>
									<ImageListItemBar
										title={title}
										actionIcon={
											<IconButton
												sx={{
													color: "rgba(255, 255, 255, 0.54)",
												}}
												onClick={() => {
													assests.splice(i, 1);
													this.setState({
														assests: assests,
													});
												}}
												aria-label={`info about ${title}`}
											>
												<InfoIcon />
											</IconButton>
										}
									/>
								</ImageListItem>
							);
						})}
					<ImageListItem key={"AddNew"}>
						<img
							src={`w=248&fit=crop&auto=format`}
							srcSet={`?w=248&fit=crop&auto=format&dpr=2 2x`}
							alt={"添加新照片"}
							loading="lazy"
						/>
					</ImageListItem>
				</ImageList>

				<FileInput
					fileType="image/*"
					multiple={true}
					handleFileUpload={(file) => {
						assests.push({
							img: file,
						});
						this.setState({ assests: assests });
					}}
				/>

				<br></br>
				<FormGroup row>
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
				</FormGroup>

				<Preview res={res} />
			</>
		);
	}
}
