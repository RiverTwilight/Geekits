import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import saveFile from "../../utils/fileSaver";
import {
	Button,
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
} from "@mui/material";
import BorderVerticalIcon from "@mui/icons-material/BorderVertical";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import OutlinedCard from "../../components/OutlinedCard";
import SliderWithIcon from "../../components/SliderWithIcon";
import Text, { t } from "@/components/i18n";

const IfBr = ({ statu }: { statu: string }) =>
	statu === "vertical" ? <br /> : null;

const FakeLogo = ({ hStyle, frontStyle, lastStyle, scale = 1 }: any) => {
	return (
		<Paper
			elevation={3}
			sx={{
				width: "600px",
				height: "300px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				bgcolor: "#000000",
				overflow: "hidden",
			}}
			id="blackborad"
		>
			<Box sx={{ transform: `scale(${scale})` }}>
				<Typography
					component="h1"
					sx={{
						fontFamily: `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif, SimHei,STHeiti`,
						fontWeight: 1000,
						letterSpacing: "-1.5px",
						fontSize: `${hStyle.size}em`,
						textAlign: "center",
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

	return (
		<Stack spacing={3} alignItems="center" sx={{ px: 2, py: 3 }}>
			<Box
				sx={{
					width: "100%",
					maxWidth: "600px",
					aspectRatio: "2/1",
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
				/>
			</Box>

			<Stack direction="row" spacing={2} justifyContent="center">
				<Tooltip title={t("Copy")}>
					<IconButton onClick={handleCopy} color="primary">
						<ContentCopyIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title={t("Download")}>
					<IconButton onClick={handleDownload} color="primary">
						<FileDownloadIcon />
					</IconButton>
				</Tooltip>
			</Stack>

			<List sx={{ width: "100%", maxWidth: 600 }}>
				<OutlinedCard padding={2}>
					<SliderWithIcon
						title={`${t("app.pornhub.fontSize")}: ${hStyle.size}`}
					>
						<Slider
							value={hStyle.size}
							onChange={(_, value) =>
								setHStyle({ ...hStyle, size: value as number })
							}
							min={1}
							max={10}
						/>
					</SliderWithIcon>
				</OutlinedCard>

				<OutlinedCard padding={2} style={{ marginTop: 10 }}>
					<SliderWithIcon
						title={`${t("Size Scale")}: ${scale.toFixed(1)}`}
						icon={<AspectRatioIcon />}
					>
						<Slider
							value={scale}
							onChange={(_, value) => setScale(value as number)}
							min={0.5}
							max={2}
							step={0.1}
						/>
					</SliderWithIcon>
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
