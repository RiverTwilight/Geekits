import React, { useState } from "react";
import html2canvas from "html2canvas";
import saveFile from "../../utils/fileSaver";
import {
	Slider,
	List,
	ListItem,
	ListItemIcon,
	ListItemSecondaryAction,
	ListItemText,
	Switch,
	Box,
	Paper,
	Stack,
	IconButton,
	Tooltip,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import OutlinedCard from "../../components/OutlinedCard";
import Text, { t } from "@/components/i18n";

const IfBr = ({ statu }: { statu: string }) =>
	statu === "vertical" ? <br /> : null;

const FakeLogo = ({
	hStyle,
	frontStyle,
	lastStyle,
	scale = 1,
	aspectRatio,
}: any) => {
	return (
		<Paper
			elevation={3}
			sx={{
				width: "100%",
				maxWidth: "600px",
				height: 0,
				paddingTop: {
					"1/1": "100%",
					"4/3": "75%",
					"16/9": "56.25%",
					"2/1": "50%",
				}[aspectRatio],
				position: "relative",
				bgcolor: "#000000",
				overflow: "hidden",
			}}
			id="blackborad"
		>
			<Box
				sx={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						transform: `scale(${scale})`,
						width: "100%",
						px: 2,
					}}
				>
					<Typography
						component="h1"
						sx={{
							fontFamily: `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif, SimHei,STHeiti`,
							fontWeight: 1000,
							letterSpacing: "-1.5px",
							fontSize: {
								xs: `${hStyle.size * 0.7}em`,
								sm: `${hStyle.size}em`,
							},
							textAlign: "center",
							wordBreak: "break-word",
						}}
					>
						<Box
							component="span"
							sx={{
								borderRadius: 1,
								color: frontStyle.color,
								bgcolor: frontStyle.backgroundColor,
								px: 0.5,
							}}
							contentEditable
							suppressContentEditableWarning
						>
							Ygkt
						</Box>
						<IfBr statu={hStyle.array} />
						<Box
							component="span"
							sx={{
								display: "inline",
								bgcolor: lastStyle.backgroundColor,
								borderRadius: 1,
								color: lastStyle.color,
								px: 0.5,
								ml: 0.5,
							}}
							contentEditable
							suppressContentEditableWarning
						>
							ool
						</Box>
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

const FakePornhubLogo = () => {
	const [hStyle, setHStyle] = useState({
		size: 4.0,
		array: "transverse",
	});

	const [front, setFront] = useState({
		color: "#ffffff",
		backgroundColor: "transparent",
	});

	const [last, setLast] = useState({
		color: "#000000",
		backgroundColor: "#f79817",
	});

	const [scale, setScale] = useState(1);

	// Add Safari detection
	const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

	// Add new aspect ratio state
	const [aspectRatio, setAspectRatio] = useState("2/1");

	const handleDownload = async () => {
		const canvas = await html2canvas(document.querySelector("#blackborad"));
		const base64 = canvas.toDataURL("image/png");
		saveFile({
			file: base64,
			type: "png",
			filename: "ygktool-logo.png",
		});
	};

	const handleCopy = async () => {
		const canvas = await html2canvas(document.querySelector("#blackborad"));
		canvas.toBlob(async (blob) => {
			if (blob) {
				try {
					await navigator.clipboard.write([
						new ClipboardItem({ "image/png": blob }),
					]);
					window.snackbar({
						message: "Copied to clipboard",
						duration: 2000,
					});
				} catch (err) {
					console.error("Failed to copy:", err);
				}
			}
		});
	};

	const handleFontSizeChange = (
		event: Event,
		newValue: number | number[]
	) => {
		console.log("handleFontSizeChange", event, newValue);
		if (typeof newValue === "number") {
			setHStyle({ ...hStyle, size: newValue });
		}
	};

	const handleScaleChange = (event: Event, newValue: number | number[]) => {
		if (typeof newValue === "number") {
			setScale(newValue);
		}
	};

	return (
		<Stack
			direction={{ xs: "column", md: "row" }}
			spacing={3}
			sx={{
				px: { xs: 0, sm: 2 },
				py: 3,
				width: "100%",
				maxWidth: "1200px",
				mx: "auto",
			}}
		>
			{/* Left Column - Preview */}
			<Stack
				spacing={3}
				alignItems="center"
				sx={{
					width: { xs: "100%", md: "50%" },
				}}
			>
				<Box
					sx={{
						width: "100%",
						maxWidth: "600px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						bgcolor: "background.paper",
						borderRadius: 2,
						overflow: "hidden",
					}}
				>
					<FakeLogo
						hStyle={hStyle}
						frontStyle={front}
						lastStyle={last}
						scale={scale}
						aspectRatio={aspectRatio}
					/>
				</Box>

				<Stack direction="row" spacing={2} justifyContent="center">
					<Tooltip
						title={
							isSafari
								? t("Safari doesn't support copying images")
								: t("Copy")
						}
					>
						<span>
							<IconButton
								onClick={handleCopy}
								color="primary"
								disabled={isSafari}
							>
								<ContentCopyIcon />
							</IconButton>
						</span>
					</Tooltip>
					<Tooltip title={t("Download")}>
						<IconButton onClick={handleDownload} color="primary">
							<FileDownloadIcon />
						</IconButton>
					</Tooltip>
				</Stack>
			</Stack>

			{/* Right Column - Settings */}
			<List
				sx={{
					width: { xs: "100%", md: "50%" },
					maxWidth: { xs: 600, md: "100%" },
					padding: 0,
				}}
			>
				<OutlinedCard padding={2}>
					<Typography gutterBottom>
						{`${t("app.pornhub.fontSize")}: ${hStyle.size}`}
					</Typography>
					<Slider
						aria-label="Font Size"
						value={hStyle.size}
						onChange={handleFontSizeChange}
						min={1}
						max={10}
						marks
						step={0.5}
					/>
				</OutlinedCard>

				<OutlinedCard padding={2} style={{ marginTop: 10 }}>
					<Typography gutterBottom>
						{`${t("Size Scale")}: ${scale.toFixed(1)}`}
					</Typography>
					<Slider
						aria-label="Scale"
						value={scale}
						onChange={handleScaleChange}
						min={0.5}
						max={2}
						step={0.1}
					/>
					<FormControl size="small">
						<Select
							value={aspectRatio}
							onChange={(e) => setAspectRatio(e.target.value)}
						>
							<MenuItem value="1/1">1:1</MenuItem>
							<MenuItem value="4/3">4:3</MenuItem>
							<MenuItem value="16/9">16:9</MenuItem>
							<MenuItem value="2/1">2:1</MenuItem>
						</Select>
					</FormControl>
				</OutlinedCard>

				<OutlinedCard padding={1} style={{ marginTop: 10 }}>
					<ListItem>
						<ListItemIcon>
							<BorderVerticalIcon />
						</ListItemIcon>
						<ListItemText
							primary={<Text k="app.pornhub.vertical" />}
						/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								onChange={(_, checked) =>
									setHStyle({
										...hStyle,
										array: checked
											? "vertical"
											: "transverse",
									})
								}
								checked={hStyle.array === "vertical"}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</OutlinedCard>

				<OutlinedCard padding={1} style={{ marginTop: 10 }}>
					<ListItem>
						<ListItemIcon>
							<ColorLensIcon />
						</ListItemIcon>
						<ListItemText
							primary={<Text k="app.pornhub.colorRevert" />}
						/>
						<ListItemSecondaryAction>
							<Switch
								edge="end"
								onChange={(_, checked) => {
									if (checked) {
										setFront({
											color: "#000000",
											backgroundColor:
												last.backgroundColor,
										});
										setLast({
											color: "#ffffff",
											backgroundColor: "transparent",
										});
									} else {
										setFront({
											color: "#ffffff",
											backgroundColor: "transparent",
										});
										setLast({
											color: "#000000",
											backgroundColor:
												front.backgroundColor,
										});
									}
								}}
								checked={front.color === "#000000"}
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</OutlinedCard>
			</List>
		</Stack>
	);
};

export default FakePornhubLogo;
