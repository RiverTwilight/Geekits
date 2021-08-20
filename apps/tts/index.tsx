import React from "react";
import Axios from "../../utils/axios";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import DoneIcon from "@material-ui/icons/Done";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import MicIcon from "@material-ui/icons/Mic";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MusicPlayer from "../../components/MusicPlayer";
import SliderWithIcon from "../../components/SliderWithIcon";

const styles = (theme: Theme) => {
	return createStyles({
		padding: {
			padding: theme.spacing(3),
		},
	});
};

const VOICE_SOURCE = [
	{
		name: "度小宇",
		value: "1",
	},
	{
		name: "度小美",
		value: "0",
	},
	{
		name: "度逍遥",
		value: "3",
	},
	{
		name: "度丫丫",
		value: "4",
	},
	{
		name: "度博文",
		value: "106",
	},
	{
		name: "度小童",
		value: "110",
	},
	{
		name: "度小萌",
		value: "111",
	},
	{
		name: "度米朵",
		value: "103",
	},
	{
		name: "度小娇",
		value: "5",
	},
];

type State = any;

class Tts extends React.Component<any, State> {
	constructor(props: any) {
		super(props);
		this.state = {
			options: {
				text: "",
				spd: "5", //语速
				pit: "5", //音调
				vol: "5", //音量
				per: "0",
			},
			res: null,
		};
	}
	loadDataFromSever = () => {
		const { options } = this.state;
		if (options.text === "") return;
		window.loadShow();
		Axios.post("/api/tts", options)
			.then((response) => {
				var json = JSON.parse(response.request.response);
				var buf = Buffer.from(json.data.data, "binary");
				var blob = new Blob([buf], {
					type: "audio/mpeg",
				});
				//var file = new File([blob], '1.mp3', {type: 'audio/mpeg', lastModified: Date.now()});
				var ourl = URL.createObjectURL(blob);
				this.setState(
					{
						res: ourl,
					},
					() => {
						window.snackbar({
							message: "✔ 转换成功",
						});
					}
				);
			})
			.then(() => window.loadHide());
	};
	render() {
		const { options, res } = this.state;
		const { classes } = this.props;
		return (
			<>
				<FormControl
					component={Paper}
					className={classes.padding}
					fullWidth
				>
					<InputLabel htmlFor="text to convert">输入文本</InputLabel>
					<Input
						id="text to convert"
						onChange={(newText) => {
							options.text = newText.target.value;
							this.setState({ options: options });
						}}
						value={this.state.input}
						multiline
						rows={3}
					/>
				</FormControl>
				<br />
				<br />
				<Paper className={classes.padding}>
					<FormControl>
						<InputLabel id="demo-simple-select-label">
							声线
						</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={options.per}
							onChange={(_, value) => {
								options.per = value;
								this.setState({ options: options });
							}}
						>
							{VOICE_SOURCE.map((voice) => (
								<MenuItem key={voice.value} value={voice.value}>
									{voice.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<SliderWithIcon
						title={"音量：" + options.vol}
						icon={<VolumeDown />}
					>
						<Slider
							value={options.vol}
							onChange={(_, value) => {
								options.vol = value;
								this.setState({ options: options });
							}}
							aria-labelledby="continuous-slider"
							min={1}
							max={10}
						/>
					</SliderWithIcon>
					<SliderWithIcon
						title={"音调：" + options.pit}
						icon={<MicIcon />}
					>
						<Slider
							value={options.pit}
							onChange={(_, value) => {
								options.pit = value;
								this.setState({ options: options });
							}}
							aria-labelledby="continuous-slider"
							min={1}
							max={10}
						/>
					</SliderWithIcon>
					<SliderWithIcon
						title={"语速：" + options.spd}
						icon={<MicIcon />}
					>
						<Slider
							value={options.spd}
							onChange={(_, value) => {
								options.spd = value;
								this.setState({ options: options });
							}}
							aria-labelledby="continuous-slider"
							min={1}
							max={10}
						/>
					</SliderWithIcon>
					<Button
						color="primary"
						onClick={this.loadDataFromSever}
						startIcon={<DoneIcon />}
					>
						确认
					</Button>
				</Paper>
				<br></br>
				{/*//@ts-expect-error */}
				{res && <MusicPlayer title="合成结果" audio={res} />}
			</>
		);
	}
}

export default withStyles(styles)(Tts);
