/* eslint-disable react/prop-types */
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/qrcode` if it exists or ad... Remove this comment to see the full error message
import QRCode from "qrcode";
import FileInput from "../../components/FileInput";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import { TabPanel, a11yProps } from "../../components/TabToolkits";
import { moveMessagePortToContext } from "worker_threads";

const create = (opts: any, text: any, callback: any, iconData: any) => {
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'url' implicitly has an 'any' type.
	const loadImgae = (url) => {
		return new Promise((resolve) => {
			const image = new Image();
			image.addEventListener("load", () => {
				resolve(image);
			});
			image.src = url;
		});
	};

	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'qrData' implicitly has an 'any' type.
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
	// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
	QRCode.toDataURL(text, opts, (err, url) => {
		if (err) throw err;
		if (iconData) {
			addIcon(url, iconData);
		} else {
			callback(url);
		}
	});
};

// @ts-expect-error ts-migrate(7031) FIXME: Binding element 'qrcode' implicitly has an 'any' t... Remove this comment to see the full error message
const Result = ({ qrcode }) => {
	if (!qrcode) return null;
	return (
		<Card>
			<img alt="qrcode" src={qrcode}></img>
		</Card>
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
		const {
			text,
			colorDark,
			colorLight,
			mode,
			wifi,
			width,
			icon,
		} = this.state;
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
		// @ts-expect-error ts-migrate(7006) FIXME: Parameter 'qrcode' implicitly has an 'any' type.
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
						label="链接或文本"
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
					<br /><br />
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
			<>
				<Paper>
					<Tabs
						value={currentTab}
						onChange={this.handleTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
						aria-label="options"
					>
						<Tab label="基本" {...a11yProps(0)} />
						<Tab label="高级" {...a11yProps(1)} />
					</Tabs>
					<TabPanel value={currentTab} index={0}>
						<FormControl fullWidth component="fieldset">
							<FormLabel component="legend">类型</FormLabel>
							<RadioGroup
								aria-label="type"
								name="类型"
								value={mode}
								onChange={this.handleModeChange}
							>
								<FormControlLabel
									value="normal"
									control={<Radio />}
									label="文本"
								/>
								<FormControlLabel
									value="wifi"
									control={<Radio />}
									label="WIFI"
								/>
							</RadioGroup>
						</FormControl>
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
										label="亮色"
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
										label="暗色"
									></TextField>
								</FormControl>
							</Grid>
						</Grid>

						<br />

						<Typography variant="h6">图标</Typography>

						<FileInput
							fileType="image/*"
							// @ts-expect-error ts-migrate(2769) FIXME: Property 'file' does not exist on type 'IntrinsicA... Remove this comment to see the full error message
							file={icon}
							handleFileUpload={(file) => {
								this.setState({
									icon: file,
								});
							}}
						/>
					</TabPanel>
				</Paper>

				<br></br>

				<Result qrcode={qrcode} />

				<Button onClick={this.handleClick} variant="outlined">
					生成
				</Button>
			</>
		);
	}
}

export default Qrcode;
