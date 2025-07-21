import React, { useRef } from "react";
import QRCode from "qrcode";
import FilePicker from "@/components/FilePicker";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import { TabPanel, a11yProps } from "../../components/TabToolkits";
import OutlinedCard from "@/components/OutlinedCard";
import { Box, Fab, IconButton } from "@mui/material";
import { CheckOutlined, Download } from "@mui/icons-material";
import Text from "@/components/i18n";
import saveFile from "@/utils/fileSaver";

const create = (opts: any, text: any, callback: any, iconData: any) => {
	const loadImgae = (url) => {
		return new Promise((resolve) => {
			const image = new Image();
			image.addEventListener("load", () => {
				resolve(image);
			});
			image.src = url;
		});
	};

	const addIcon = (qrData, iconData) => {
		const qr = loadImgae(qrData);
		const icon = loadImgae(iconData);

		Promise.all([qr, icon]).then((arr) => {
			let icon = arr[1];
			let qr = arr[0];
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.height = qr.height;
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			canvas.width = qr.width;
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(qr, 0, 0, qr.width, qr.height);
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconSize = qr.width * 0.2;
			// @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
			let iconPos = qr.width / 2 - qr.width * 0.1;
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			ctx.drawImage(icon, iconPos, iconPos, iconSize, iconSize);
			callback(canvas.toDataURL());
		});
	};
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err;
		if (iconData) {
			addIcon(url, iconData);
		} else {
			callback(url);
		}
	});
};
const Result = ({ qrcode }) => {
	const imageContainer = useRef(null);

	const handleDownload = () => {
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		const img = new Image();
		img.src = qrcode;

		img.onload = () => {
			canvas.width = img.width;
			canvas.height = img.height;
			context.drawImage(img, 0, 0);

			const dataURL = canvas.toDataURL();
			saveFile({
				file: dataURL,
				type: "png",
				filename: "geekits-qrcode.png",
			});
		};
	};

	return (
		<OutlinedCard style={{ height: "100%" }}>
			<Box
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				sx={{ height: "100%" }}
				paddingY={2}
			>
				<Paper sx={{ height: "150px", width: "150px" }}>
					{qrcode && (
						<img
							ref={imageContainer}
							height="100%"
							width="100%"
							alt="qrcode"
							src={qrcode}
						></img>
					)}
				</Paper>
				{qrcode && (
					<>
						<br />
						<Box>
							<IconButton onClick={handleDownload}>
								<Download />
							</IconButton>
						</Box>
					</>
				)}
			</Box>
		</OutlinedCard>
	);
};

type QrcodeState = any;

class Qrcode extends React.Component<{}, QrcodeState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			text: "",
			wifi: {
				account: "",
				pwd: "",
			},
			mode: "normal",
			icon: null,
			colorLight: "#ffffff",
			colorDark: "#000000",
			width: "100",
			qrcode: null,
			currentTab: 0,
		};
	}
	handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
		this.setState({
			currentTab: newValue,
		});
	};
	handleClick = () => {
		const { text, colorDark, colorLight, mode, wifi, width, icon } =
			this.state;
		var opts = {
			errorCorrectionLevel: "H",
			type: "image/jpeg",
			quality: 0.3,
			margin: 1,
			width: width,
			color: {
				dark: colorDark,
				light: colorLight,
			},
		};
		const string =
			mode === 1
				? `WIFI:S:${wifi.account};P:${wifi.pwd};T:;H:;`
				: text === ""
				? "ygktool.cn"
				: text;
		const callback = (qrcode) => {
			this.setState({ qrcode: qrcode });
		};
		create(opts, string, callback, icon);
	};
	handleModeChange = (_e: any, value: string | number) => {
		this.setState({
			mode: value,
		});
	};
	render() {
		const {
			text,
			colorDark,
			colorLight,
			qrcode,
			mode,
			wifi,
			width,
			icon,
			currentTab,
		} = this.state;
		const Form =
			mode === "normal" ? (
				<FormControl fullWidth>
					<TextField
						onChange={(e) => {
							this.setState({ text: e.target.value });
						}}
						value={text}
						label={<Text k="qrcode.basic.placeholder" />}
						variant="outlined"
					/>
				</FormControl>
			) : (
				<>
					<FormControl fullWidth>
						<TextField
							onChange={(e) => {
								this.setState({
									wifi: {
										account: e.target.value,
										pwd: wifi.pwd,
									},
								});
							}}
							label="账号(SSID)"
							variant="outlined"
							value={wifi.account}
						/>
					</FormControl>
					<br />
					<br />
					<FormControl fullWidth>
						<TextField
							onChange={(e) => {
								this.setState({
									wifi: {
										account: e.target.value,
										pwd: wifi.pwd,
									},
								});
							}}
							label="密码"
							variant="outlined"
							value={wifi.pwd}
						/>
					</FormControl>
				</>
			);
		return (
			<Grid
				direction={{ xs: "column-reverse", sm: "row" }}
				container
				spacing={2}
			>
				<Grid item xs={12} sm={6}>
					<OutlinedCard>
						<Tabs
							value={currentTab}
							onChange={this.handleTabChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="options"
						>
							<Tab
								label={<Text k="qrcode.basic.title" />}
								{...a11yProps(0)}
							/>
							<Tab
								label={<Text k="qrcode.advanced.title" />}
								{...a11yProps(1)}
							/>
						</Tabs>
						<TabPanel value={currentTab} index={0}>
							<FormControl fullWidth component="fieldset">
								<FormLabel component="legend">
									<Text k="qrcode.basic.type" />
								</FormLabel>
								<RadioGroup
									aria-label="type"
									name={<Text k="qrcode.basic.type" />}
									row
									value={mode}
									onChange={this.handleModeChange}
								>
									<FormControlLabel
										value="normal"
										control={<Radio />}
										label={<Text k="qrcode.basic.text" />}
									/>
									<FormControlLabel
										value="wifi"
										control={<Radio />}
										label={<Text k="qrcode.basic.wifi" />}
									/>
								</RadioGroup>
							</FormControl>
							<br />
							<br />
							{Form}

							{/* 
						<RangeInput
							value={width}
							min="50"
							max="200"
							onValueChange={(newValue) => {
								this.setState({ width: newValue });
							}}
							title={"大小" + width + "px"}
						/> */}
						</TabPanel>
						<TabPanel value={currentTab} index={1}>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<FormControl fullWidth>
										<TextField
											onChange={(e) => {
												this.setState({
													colorLight: e.target.value,
												});
											}}
											value={colorLight}
											type="color"
											label={
												<Text k="qrcode.advanced.light" />
											}
										></TextField>
									</FormControl>
								</Grid>
								<Grid item xs={6}>
									<FormControl fullWidth>
										<TextField
											onChange={(e) => {
												this.setState({
													colorDark: e.target.value,
												});
											}}
											value={colorDark}
											type="color"
											label={
												<Text k="qrcode.advanced.dark" />
											}
										></TextField>
									</FormControl>
								</Grid>
							</Grid>

							<br />

							<Typography variant="h6">
								<Text k="qrcode.advanced.icon" />
							</Typography>

							<FilePicker
								fileType="image/*"
								// @ts-expect-error ts-migrate(2769) FIXME: Property 'file' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
								file={icon}
								multiple={false}
								handleFileUpload={(file) => {
									this.setState({
										icon: file,
									});
								}}
							/>
						</TabPanel>
						<Box
							justifyContent={"center"}
							display={"center"}
							paddingY={2}
						>
							<Fab color="primary" onClick={this.handleClick}>
								<CheckOutlined />
							</Fab>
						</Box>
					</OutlinedCard>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Result qrcode={qrcode} />
				</Grid>
			</Grid>
		);
	}
}

export default Qrcode;
