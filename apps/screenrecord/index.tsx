import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

type State = any;

export default class extends React.Component<{}, State> {
	video: any;
	constructor(props: {}) {
		super(props);
		this.state = {
			recorder: undefined,
			onRecord: false,
			finished: false,
		};
	}
	async record() {
		const video = this.video;
		let recorder: any;
		let captureStream;

		try {
			// @ts-expect-error ts-migrate(2339) FIXME: Property 'getDisplayMedia' does not exist on type ... Remove this comment to see the full error message
			captureStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				// audio: true,   not support
				cursor: "always",
			});
		} catch (e) {
			return;
		}

		window.URL.revokeObjectURL(video.src);

		video.autoplay = true;
		video.srcObject = captureStream;

		// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'MediaRecorder'.
		recorder = new MediaRecorder(captureStream);
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
			video.srcObject = null;
			video.src = videoUrl;
			video.autoplay = false;
		});
		this.setState({ recorder: recorder });
	}
	stop() {
		const { recorder } = this.state;
		const { video } = this;
		let tracks = video.srcObject.getTracks();
		tracks.forEach((track: any) => track.stop());
		recorder.stop();
		this.setState({ onRecord: false });
	}
	download() {
		const url = this.video.src;
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
		const { onRecord, finished } = this.state;
		return (
			<>
				<video ref={(r) => (this.video = r)} controls>
					<source type="video/ogg" />
				</video>
				<br></br>
				<ButtonGroup variant="contained" color="primary">
					<Button
						onClick={() => {
							if (!onRecord) {
								this.record();
							} else {
								this.stop();
							}
						}}
					>
						{!onRecord ? "录制" : "停止"}
					</Button>
					<Button
						onClick={() => {
							finished && this.download();
						}}
						disabled={onRecord}
					>
						下载
					</Button>
				</ButtonGroup>
			</>
		);
	}
}
