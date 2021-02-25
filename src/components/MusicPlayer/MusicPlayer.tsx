import React from "react";
import { Theme, createStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";

const styles = (theme: Theme) => {
	createStyles({
		root: {
			display: "flex",
		},
		details: {
			display: "flex",
			flexDirection: "column",
		},
		content: {
			flex: "1 0 auto",
		},
		cover: {
			width: 151,
		},
		controls: {
			display: "flex",
			alignItems: "center",
			paddingLeft: theme.spacing(1),
			paddingBottom: theme.spacing(1),
		},
		playIcon: {
			height: 38,
			width: 38,
		},
		audio: {
			display: "none",
		},
	});
};

declare global {
	interface Window {
		progress: any;
	}
}

declare interface MusicProps {
	/** 音频链接 */
	audio?: string;
	/** 卡片标题 */
	title?: string;
	/** 卡片副标题 */
	subtitle?: string;
	/** 封面图片 */
	cover?: string;
	classes: any;
	theme: any;
}

declare interface MusicState {
	onPlay: boolean;
	playProgress: number;
	audioLength: number;
}

class MusicPlayer extends React.Component<MusicProps, MusicState> {
	audioDom: any;
	constructor(props: any) {
		super(props);
		this.state = {
			onPlay: false,
			playProgress: 0,
			audioLength: 2000,
		};
	}
	play = () => {
		const { onPlay } = this.state;
		const { audioDom } = this;
		if (onPlay) {
			audioDom.pause();
			this.setState({
				onPlay: false,
			});
		} else {
			audioDom.play();
			this.setState({
				onPlay: true,
			});
		}
	}
	// @ts-expect-error
	componentWillReceiveProps(nextProps: { audio: any }) {
		if (nextProps.audio) {
			const { audioDom } = this;
			audioDom.addEventListener("loadedmetadata", () => {
				this.setState({
					audioLength: Math.round(audioDom.duration), //设置音频总长度
				});
			});
			audioDom.load();
			audioDom.addEventListener("play", () => {
				window.progress = setInterval(() => {
					this.setState({
						playProgress: audioDom.currentTime,
					});
				}, 100);
			});
			audioDom.addEventListener("ended", () => {
				clearInterval(window.progress);
				this.setState({
					onPlay: false,
				});
			});
		}
	}
	render() {
		const {
			audio,
			title = "音频播放器",
			subtitle,
			classes,
			theme,
			cover = "/default_album.jpg",
			...other
		} = this.props;
		const { onPlay, playProgress, audioLength } = this.state;
		const { audioDom } = this;
		return (
			<Card className={classes.root}>
				<div className={classes.details}>
					<CardContent className={classes.content}>
						<Typography component="h5" variant="h5">
							{title}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							Mac Miller
						</Typography>
					</CardContent>
					<div className={classes.controls}>
						<IconButton aria-label="previous">
							<SkipPreviousIcon />
						</IconButton>
						<IconButton onClick={this.play} aria-label="play/pause">
							{onPlay ? (
								<PauseIcon className={classes.playIcon} />
							) : (
								<PlayArrowIcon className={classes.playIcon} />
							)}
						</IconButton>

						<IconButton aria-label="next">
							<SkipNextIcon />
						</IconButton>
					</div>
				</div>
				<CardMedia
					className={classes.cover}
					image={cover}
					title="Live from space album cover"
				/>
				<audio
					className={classes.audio}
					controls={true}
					ref={(r) => (this.audioDom = r)}
				>
					<source src={audio} type="audio/mpeg" />
					Your browser does not support the audio tag.
				</audio>
			</Card>
		);
	}
}

export default withStyles(styles)(MusicPlayer);
