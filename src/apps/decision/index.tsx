import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	TextField,
	Typography,
	List,
	ListItemButton,
	ListItemText,
	Fab,
	useTheme,
	IconButton,
	Chip,
	ListItemSecondaryAction,
} from "@mui/material";
import {
	RefreshRounded as RefreshIcon,
	Close as CloseIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Text from "@/components/i18n";

const PREFIX = "RandomChooser";

const classes = {
	root: `${PREFIX}-root`,
	wheel: `${PREFIX}-wheel`,
	wheelText: `${PREFIX}-wheelText`,
	wheelBorder: `${PREFIX}-wheelBorder`,
};

const StyledBox = styled(Box)(({ theme }) => ({
	[`&.${classes.root}`]: {
		maxWidth: "100vw",
		// margin: "0 auto",
		padding: theme.spacing(3),
	},
	[`& .${classes.wheel}`]: {
		transition: "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)",
	},
	[`& .${classes.wheelText}`]: {
		fill: theme.palette.primary.main,
		stroke: theme.palette.primary.main,
		fontFamily: theme.typography.fontFamily,
	},
	[`& .${classes.wheelBorder}`]: {
		stroke: theme.palette.primary.main,
	},
}));

const R = 150;

const calcLocation = (r, percent) => {
	const x = r * Math.cos(percent * 2 * Math.PI);
	const y = r * Math.sin(percent * 2 * Math.PI);
	return { x, y };
};

const RandomChooser = () => {
	const [items, setItems] = useState(["Option 1", "Option 2", "Option 3"]);
	const [inputValue, setInputValue] = useState("");
	const [resultIndex, setResultIndex] = useState(null);
	const [rotation, setRotation] = useState(0);
	const [presets, setPresets] = useState([]);

	const theme = useTheme();

	useEffect(() => {
		const storedPresets = localStorage.getItem("DECISION_MAKER_PRESETS");
		if (storedPresets) {
			setPresets(JSON.parse(storedPresets));
		}
	}, []);

	const handleSpin = () => {
		const newIndex = Math.floor(Math.random() * items.length);
		const extraRotations = 360 * 5; // 5 full rotations
		const offset = items.length === 4 ? 45 : 0; // Adjust offset for 4 items
		const newRotation =
			rotation -
			extraRotations -
			(360 / items.length) * newIndex +
			offset;
		setRotation(newRotation);
		setResultIndex(newIndex);
	};

	const handleAddItem = () => {
		if (inputValue.trim()) {
			setItems([...items, inputValue.trim()]);
			setInputValue("");
		}
	};

	const handleRemoveItem = (index) => {
		const newItems = items.filter((_, i) => i !== index);
		setItems(newItems);
	};

	const handleSavePreset = () => {
		const newPresets = [...presets, { options: items }];
		setPresets(newPresets);
		localStorage.setItem(
			"DECISION_MAKER_PRESETS",
			JSON.stringify(newPresets)
		);
	};

	const handleLoadPreset = (options) => {
		setItems(options);
	};

	const handleDeletePreset = (index) => {
		const newPresets = presets.filter((_, i) => i !== index);
		setPresets(newPresets);
		localStorage.setItem(
			"DECISION_MAKER_PRESETS",
			JSON.stringify(newPresets)
		);
	};

	return (
		<StyledBox className={classes.root}>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				mb={4}
				position="relative"
			>
				<ArrowDropDownIcon
					sx={{
						transform: "scale(2, 2)",
						position: "absolute",
						top: -20,
					}}
				/>
				<Box
					sx={{
						borderRadius: "50%",
						padding: 2,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						background: theme.palette.background.paper,
						boxShadow: theme.shadows[4],
						overflow: "hidden",
					}}
				>
					<svg
						height={`${R * 2 + 4}px`}
						width={`${R * 2 + 4}px`}
						className={classes.wheel}
						style={{
							transform: `rotate(${rotation}deg)`,
						}}
					>
						{items.map((item, i) => {
							const percent = 1 / items.length;
							return (
								<React.Fragment key={item}>
									<path
										className={classes.wheelText}
										d={`M${R + 2} ${R + 2} L${
											R +
											2 +
											calcLocation(R, percent * i).x
										} ${
											R +
											2 +
											calcLocation(R, percent * i).y
										}`}
									/>
									<g
										fontSize="20"
										className={classes.wheelText}
										transform={`rotate(${
											360 * (percent * i + percent / 2)
										})`}
										transform-origin="center"
									>
										<text
											x={1.5 * R}
											y={R}
											dy={10}
											textAnchor="middle"
										>
											{item}
										</text>
									</g>
								</React.Fragment>
							);
						})}
						<circle
							className={classes.wheelBorder}
							stroke={theme.palette.primary.main}
							strokeWidth="4px"
							fill="transparent"
							cx={R + 2}
							cy={R + 2}
							r={R}
						/>
					</svg>
				</Box>
				<Fab
					color="primary"
					size="small"
					onClick={handleSpin}
					sx={{ position: "absolute", bottom: 8, right: 8 }}
				>
					<RefreshIcon />
				</Fab>
			</Box>

			<Box mb={4}>
				<Typography variant="h6" gutterBottom>
					<Text k="app.decision.currentOption" />
				</Typography>
				<Box display="flex" flexWrap="wrap" gap={1}>
					{items.map((item, index) => (
						<Chip
							key={index}
							label={item}
							onDelete={() => handleRemoveItem(index)}
							color="primary"
							variant="outlined"
						/>
					))}
				</Box>
			</Box>

			<Box mb={4}>
				<TextField
					fullWidth
					variant="outlined"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					placeholder="Add new option"
					sx={{ mb: 2 }}
				/>
				<Box display="flex" justifyContent="space-between">
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddItem}
					>
						<Text k="app.decision.addOption" />
					</Button>
					<Button
						variant="outlined"
						color="primary"
						onClick={handleSavePreset}
					>
						<Text k="app.decision.savePreset" />
					</Button>
				</Box>
			</Box>

			{presets.length > 0 && (
				<Box>
					<Typography variant="h6" gutterBottom>
						Presets
					</Typography>
					<List>
						{presets.map((preset, index) => (
							<ListItemButton
								key={index}
								onClick={() => handleLoadPreset(preset.options)}
							>
								<ListItemText
									primary={preset.options.join(", ")}
								/>
								<ListItemSecondaryAction>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() =>
											handleDeletePreset(index)
										}
									>
										<DeleteIcon />
									</IconButton>
								</ListItemSecondaryAction>
							</ListItemButton>
						))}
					</List>
				</Box>
			)}
		</StyledBox>
	);
};

export default RandomChooser;
