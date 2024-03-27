import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import OutlinedCard from "@/components/OutlinedCard/index";
import { Alert, Typography } from "@mui/material";

const ScreenRecorder = () => {
	const videoRef = useRef(null);
	const [recorder, setRecorder] = useState(null);
	const [onRecord, setOnRecord] = useState(false);
	const [finished, setFinished] = useState(false);
	const [recordAudio, setRecordAudio] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		// Check browser compatibility for getDisplayMedia and MediaRecorder
		if (
			!navigator.mediaDevices ||
			!navigator.mediaDevices.getDisplayMedia ||
			!window.MediaRecorder
		) {
			console.error("Browser does not support screen recording.");
			setErrorMsg("Browser does not support screen recording.");
			// Handle error appropriately, e.g., display a message to the user
		}
	}, []);

	const record = async () => {
		try {
			const captureStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
				audio: recordAudio,
			});

			const audioStream = recordAudio
				? await navigator.mediaDevices.getUserMedia({
						audio: true,
						video: false,
				  })
				: null;

			const combination = audioStream
				? new MediaStream([
						...captureStream.getTracks(),
						...audioStream.getTracks(),
				  ])
				: captureStream;

			const newRecorder = new MediaRecorder(combination);

			newRecorder.start();
			setOnRecord(true);

			captureStream.getVideoTracks()[0].onended = () => {
				newRecorder.stop();
			};

			newRecorder.addEventListener("dataavailable", (event) => {
				const videoUrl = URL.createObjectURL(event.data, {
					type: "video/webm",
				}); // Use webm for broader compatibility
				videoRef.current.srcObject = null;
				videoRef.current.src = videoUrl;
				videoRef.current.autoplay = false;
			});

			newRecorder.addEventListener("stop", () => {
				setFinished(true);
			});

			setRecorder(newRecorder);
		} catch (error) {
			console.error("Error recording screen:", error);
			// Handle error appropriately, e.g., display a message to the user
		}
	};

	const stop = () => {
		if (recorder) {
			recorder.stop();
			setOnRecord(false);
		}
	};

	const download = () => {
		if (finished) {
			const url = videoRef.current.src;
			const name = new Date()
				.toISOString()
				.slice(0, 19)
				.replace("T", " ")
				.replace(" ", "_")
				.replace(/:/g, "-");
			const a = document.createElement("a");
			a.style.display = "none";
			a.download = `${name}.webm`;
			a.href = url;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	return (
		<>
			{errorMsg && (
				<Alert severity="warning">
					Your browser does not support screen recording.
				</Alert>
			)}
			<Box display="flex" justifyContent="center" sx={{ width: "100%" }}>
				<Box padding={1} sx={{ maxWidth: "600px", width: "100%" }}>
					<video style={{ width: "100%" }} ref={videoRef} controls>
						<source type="video/webm" />
					</video>

					<OutlinedCard padding={2}>
						<Box
							sx={{
								display: "flex",
								gap: 1,
								justifyContent: "space-between",
							}}
						>
							<FormControlLabel
								onChange={(e) =>
									setRecordAudio(e.target.checked)
								}
								checked={recordAudio}
								control={<Switch />}
								label="麦克风"
							/>
							<Box display="flex" alignItems="center" gap={1}>
								<Button
									onClick={() => {
										if (!onRecord) {
											record();
										} else {
											stop();
										}
									}}
									variant="contained"
									sx={{
										color: "#fff",
									}}
									disabled={onRecord}
								>
									{onRecord ? "停止" : "录制"}
								</Button>
								<Button
									onClick={download}
									variant="outlined"
									disabled={onRecord}
								>
									导出
								</Button>
							</Box>
						</Box>
					</OutlinedCard>
				</Box>
			</Box>
		</>
	);
};

export default ScreenRecorder;
