import React, { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	Chip,
	Stack,
	IconButton,
	Grid,
	Card,
	CardContent,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import OutlinedCard from "@/components/OutlinedCard";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";
import { alpha } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

interface TimerItem {
	id: string;
	name: string;
	duration: number; // in seconds
	remainingTime: number;
	isRunning: boolean;
}

interface PresetDishProps {
	dish: { name: string; duration: number };
	onClick: () => void;
}

const PRESET_DISHES = [
	// 肉类
	{ name: "毛肚", duration: 7 }, // 快速翻动3-5秒
	{ name: "牛肉片", duration: 10 }, // 5-8秒，以变色为准
	{ name: "羊肉片", duration: 12 }, // 8-10秒，以变色为准
	{ name: "猪肉片", duration: 15 }, // 12-15秒

	// 丸类
	{ name: "牛肉丸", duration: 180 }, // 3分钟左右
	{ name: "虾丸", duration: 180 },
	{ name: "鱼丸", duration: 180 },

	// 豆制品
	{ name: "豆腐", duration: 120 }, // 2分钟
	{ name: "油豆腐", duration: 90 },
	{ name: "腐竹", duration: 120 },

	// 蔬菜类
	{ name: "生菜", duration: 20 }, // 快速烫熟
	{ name: "菠菜", duration: 30 },
	{ name: "白菜", duration: 60 },
	{ name: "土豆片", duration: 180 }, // 3分钟左右

	// 菌菇类
	{ name: "金针菇", duration: 120 },
	{ name: "香菇", duration: 180 },
	{ name: "杏鲍菇", duration: 180 },

	// 其他
	{ name: "粉条", duration: 120 }, // 2分钟
	{ name: "面条", duration: 120 },
	{ name: "饺子", duration: 240 }, // 4分钟，以浮起为准
];

const PresetDishCard: React.FC<PresetDishProps> = ({ dish, onClick }) => {
	const theme = useTheme();

	return (
		<Card
			onClick={onClick}
			elevation={0}
			sx={{
				cursor: "pointer",
				transition: "all 0.2s ease",
				borderRadius: 3,
				backgroundColor: alpha(theme.palette.background.paper, 0.5),
				"&:hover": {
					backgroundColor: alpha(theme.palette.primary.main, 0.08),
					transform: "translateY(-2px)",
					boxShadow: theme.shadows[2],
				},
			}}
		>
			<CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
				<Typography
					variant="body1"
					align="center"
					sx={{
						fontWeight: 500,
						mb: 0.5,
					}}
				>
					{dish.name}
				</Typography>
				<Typography
					variant="body2"
					align="center"
					color="text.secondary"
				>
					{dish.duration}秒
				</Typography>
			</CardContent>
		</Card>
	);
};

const HotpotTimer: React.FC = () => {
	const [timers, setTimers] = useState<TimerItem[]>([]);
	const [selectedPreset, setSelectedPreset] = useState("");
	const [customDish, setCustomDish] = useState("");
	const [customDuration, setCustomDuration] = useState("120");
	const [isPresetDialogOpen, setIsPresetDialogOpen] = useState(false);
	const theme = useTheme();

	useEffect(() => {
		const interval = setInterval(() => {
			setTimers((currentTimers) =>
				currentTimers.map((timer) => {
					if (timer.isRunning && timer.remainingTime > 0) {
						return {
							...timer,
							remainingTime: timer.remainingTime - 1,
						};
					}
					return timer;
				})
			);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const addPresetTimer = () => {
		const preset = PRESET_DISHES.find(
			(dish) => dish.name === selectedPreset
		);
		if (preset) {
			const newTimer: TimerItem = {
				id: Date.now().toString(),
				name: preset.name,
				duration: preset.duration,
				remainingTime: preset.duration,
				isRunning: false,
			};
			setTimers((prev) => [...prev, newTimer]);
			setSelectedPreset("");
		}
	};

	const addCustomTimer = () => {
		if (customDish && customDuration) {
			const duration = parseInt(customDuration);
			const newTimer: TimerItem = {
				id: Date.now().toString(),
				name: customDish,
				duration: duration,
				remainingTime: duration,
				isRunning: false,
			};
			setTimers((prev) => [...prev, newTimer]);
			setCustomDish("");
			setCustomDuration("120");
		}
	};

	const toggleTimer = (id: string) => {
		setTimers((prev) =>
			prev.map((timer) =>
				timer.id === id
					? { ...timer, isRunning: !timer.isRunning }
					: timer
			)
		);
	};

	const deleteTimer = (id: string) => {
		setTimers((prev) => prev.filter((timer) => timer.id !== id));
	};

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleOpenPresetDialog = () => setIsPresetDialogOpen(true);
	const handleClosePresetDialog = () => setIsPresetDialogOpen(false);

	return (
		<Box sx={{ maxWidth: 800, mx: "auto" }}>
			<OutlinedCard
				padding={3}
				style={{
					background: alpha(theme.palette.background.paper, 0.8),
					backdropFilter: "blur(10px)",
				}}
			>
				<Stack spacing={4}>
					<Button
						variant="outlined"
						onClick={handleOpenPresetDialog}
						sx={{
							borderRadius: 3,
							py: 2,
							borderStyle: 'dashed',
							borderWidth: 2,
							"&:hover": {
								borderStyle: 'dashed',
								borderWidth: 2,
							}
						}}
					>
						<Stack spacing={1} alignItems="center">
							<AddIcon />
							<Typography>从预设菜品中选择</Typography>
						</Stack>
					</Button>

					<Stack spacing={3}>
						<TextField
							label="自定义菜品"
							value={customDish}
							onChange={(e) => setCustomDish(e.target.value)}
							sx={{
								"& .MuiOutlinedInput-root": {
									borderRadius: 3,
								},
							}}
						/>
						<Stack
							direction={{ xs: "column", sm: "row" }}
							spacing={2}
						>
							<TextField
								label="时长(秒)"
								type="number"
								value={customDuration}
								onChange={(e) =>
									setCustomDuration(e.target.value)
								}
								sx={{
									width: { xs: "100%", sm: "120px" },
									"& .MuiOutlinedInput-root": {
										borderRadius: 3,
									},
								}}
							/>
							<Button
								variant="contained"
								onClick={addCustomTimer}
								disabled={!customDish || !customDuration}
								startIcon={<AddIcon />}
								sx={{
									borderRadius: 3,
									textTransform: "none",
									px: 3,
									width: { xs: "100%", sm: "auto" },
									height: "56px", // Match TextField height
								}}
							>
								添加
							</Button>
						</Stack>
					</Stack>

					<Stack spacing={2}>
						{timers.map((timer) => (
							<OutlinedCard
								key={timer.id}
								padding={2}
								style={{
									background: alpha(
										timer.remainingTime === 0
											? theme.palette.success.main
											: timer.isRunning
											? theme.palette.primary.main
											: theme.palette.grey[100],
										0.1
									),
									transition: "all 0.3s ease",
									transform: "translateY(0)",
									"&:hover": {
										transform: "translateY(-2px)",
										boxShadow: theme.shadows[4],
									},
								}}
							>
								<Stack
									direction="row"
									alignItems="center"
									spacing={2}
								>
									<Typography
										variant="h6"
										sx={{
											flexGrow: 1,
											fontWeight: "medium",
											color:
												timer.remainingTime === 0
													? theme.palette.success.main
													: timer.isRunning
													? theme.palette.primary.main
													: theme.palette.text
															.primary,
										}}
									>
										{timer.name}
									</Typography>
									<Chip
										label={formatTime(timer.remainingTime)}
										color={
											timer.remainingTime === 0
												? "success"
												: timer.isRunning
												? "primary"
												: "default"
										}
										sx={{
											borderRadius: 2,
											fontWeight: "medium",
										}}
									/>
									<IconButton
										onClick={() => toggleTimer(timer.id)}
										color={
											timer.isRunning
												? "error"
												: "primary"
										}
										disabled={timer.remainingTime === 0}
										sx={{
											backgroundColor: alpha(
												timer.isRunning
													? theme.palette.error.main
													: theme.palette.primary
															.main,
												0.1
											),
										}}
									>
										{timer.isRunning ? (
											<PauseIcon />
										) : (
											<PlayArrowIcon />
										)}
									</IconButton>
									<IconButton
										onClick={() => deleteTimer(timer.id)}
										color="error"
										sx={{
											backgroundColor: alpha(
												theme.palette.error.main,
												0.1
											),
										}}
									>
										<DeleteIcon />
									</IconButton>
								</Stack>
							</OutlinedCard>
						))}
					</Stack>
				</Stack>
			</OutlinedCard>

			<Dialog 
				open={isPresetDialogOpen} 
				onClose={handleClosePresetDialog}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>
					<Typography variant="h6" sx={{ fontWeight: 500 }}>
						选择预设菜品
					</Typography>
				</DialogTitle>
				<DialogContent>
					<Box sx={{ pt: 2 }}>
						<Grid container spacing={2}>
							{PRESET_DISHES.map((dish) => (
								<Grid
									item
									xs={6}
									sm={4}
									md={3}
									key={dish.name}
								>
									<PresetDishCard
										dish={dish}
										onClick={() => {
											const newTimer: TimerItem = {
												id: Date.now().toString(),
												name: dish.name,
												duration: dish.duration,
												remainingTime: dish.duration,
												isRunning: false,
											};
											setTimers((prev) => [...prev, newTimer]);
											handleClosePresetDialog();
										}}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button 
						onClick={handleClosePresetDialog}
						sx={{ 
							borderRadius: 3,
							textTransform: "none",
							px: 3,
						}}
					>
						关闭
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default HotpotTimer;
