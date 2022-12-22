import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

class ScreenRecorder extends React.Component<{}, {}> {
	videoRef;

	constructor(props: {}) {
		super(props);
		this.state = {
			recorder: undefined,
			onRecord: false,
			finished: false,
			recordAudio: false,
		};
		this.videoRef = React.createRef();
	}

	async record() {
		const { videoRef } = this;
		const { recordAudio } = this.state;
		let recorder: any;
		let captureStream, audioStream, combination;

		try {
			captureStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: true,
			});

			audioStream = await navigator.mediaDevices.getUserMedia({
				audio: true,
				video: false,
			});
		} catch (e) {
			return;
		}

		window.URL.revokeObjectURL(videoRef.current.src);

		videoRef.current.autoplay = true;
		videoRef.current.srcObject = captureStream;

		combination = new MediaStream([
			...captureStream.getTracks(),
			...audioStream.getTracks(),
		]);

		recorder = new MediaRecorder(recordAudio ? captureStream : combination);

		recorder.start();
		this.setState({ onRecord: true });

		captureStream.getVideoTracks()[0].onended = () => {
			recorder.stop();
		};

		recorder.addEventListener("dataavailable", (event: any) => {
			// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
			let videoUrl = URL.createObjectURL(event.data, {
				type: "video/ogg",
			});
			videoRef.current.srcObject = null;
			videoRef.current.src = videoUrl;
			videoRef.current.autoplay = false;
		});
		this.setState({ recorder: recorder });
	}

	stop() {
		const { recorder } = this.state;
		let tracks = this.videoRef.current.srcObject.getTracks();
		tracks.forEach((track: any) => track.stop());
		recorder.stop();
		this.setState({ onRecord: false });
	}

	download() {
		const url = this.videoRef.current.src;
		const name = new Date()
			.toISOString()
			.slice(0, 19)
			.replace("T", " ")
			.replace(" ", "_")
			.replace(/:/g, "-");
		const a = document.createElement("a");

		// @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'style' because it is a read-only... Remove this comment to see the full error message
		a.style = "display: none";
		a.download = `${name}.ogg`;
		a.href = url;

		document.body.appendChild(a);

		a.click();
	}

	render() {
		const { onRecord, finished, recordAudio } = this.state;
		return (
			<Paper
				style={{
					minHeight: "800px",
					maxWidth: "800px",
				}}
				component={Card}
			>
				<video style={{ width: "100%" }} ref={this.videoRef} controls>
					<source type="video/ogg" />
				</video>

				<Box padding={2}>
					<Grid container>
						<Grid item xs={6} sm={2}>
							<FormControlLabel
								onChange={(e) => {
									console.log(e);
									this.setState({
										recordAudio: e.target.checked,
									});
								}}
								checked={recordAudio}
								control={<Switch />}
								label="麦克风"
							/>
						</Grid>

						<Grid
							item
							xs={6}
							sm={4}
							component={Button}
							onClick={() => {
								if (!onRecord) {
									this.record();
								} else {
									this.stop();
								}
							}}
							variant="contained"
						>
							{!onRecord ? "录制" : "停止"}
						</Grid>

						<Grid
							item
							component={Button}
							xs={12}
							sm={6}
							onClick={() => {
								this.download();
							}}
							variant="outlined"
							disabled={onRecord}
						>
							下载
						</Grid>
					</Grid>
				</Box>
			</Paper>
		);
	}
}

export default ScreenRecorder;
