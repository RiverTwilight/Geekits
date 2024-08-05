import React, { useState } from "react";
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	IconButton,
	Tab,
	Tabs,
	Box,
	Typography,
	Switch,
	FormControlLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Delete, Add, Apps, InsertPhoto } from "@mui/icons-material";
import saveFile from "../../utils/fileSaver";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#6750A4",
		},
		secondary: {
			main: "#958DA5",
		},
	},
});

const displays = [
	{ name: "全屏显示", value: "fullscreen" },
	{ name: "独立的应用程序（不含浏览器UI）", value: "standalone" },
	{ name: "独立的应用程序（含有浏览器UI）", value: "minimal-ui" },
	{ name: "传统模式", value: "browser" },
];

const orientations = [
	"any",
	"natural",
	"landscape",
	"landscape-primary",
	"landscape-secondary",
	"portrait",
	"portrait-primary",
	"portrait-secondary",
];

const Preview = ({ config }) => {
	if (!config) return null;

	const exportConfig = { ...config };
	exportConfig.relatedApp = config.relatedApp.data;
	exportConfig.display = displays[config.display].value;
	exportConfig.icons = config.icons.map((icon) => ({
		...icon,
		sizes: `${icon.sizes}x${icon.sizes}`,
	}));

	const res = JSON.stringify(exportConfig, null, 4);

	return (
		<Box>
			<TextField
				multiline
				rows={10}
				fullWidth
				value={res}
				variant="outlined"
				margin="normal"
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					const blob = new Blob([res], {
						type: "application/json;charset=utf-8",
					});
					saveFile({ file: blob, filename: "manifest.json" });
				}}
			>
				下载manifest.json
			</Button>
		</Box>
	);
};

const Icons = ({ list, onAdd, onDelete, onUpdate }) => {
	const [open, setOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [currentIcon, setCurrentIcon] = useState({
		src: "",
		sizes: "",
		type: "png",
	});
	const [updateIndex, setUpdateIndex] = useState(-1);

	const handleOpen = (
		icon = { src: "", sizes: "", type: "png" },
		index = -1
	) => {
		setCurrentIcon(icon);
		setUpdateIndex(index);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentIcon({ src: "", sizes: "", type: "png" });
		setUpdateIndex(-1);
	};

	const handleSave = () => {
		if (updateIndex === -1) {
			onAdd(currentIcon);
		} else {
			onUpdate(updateIndex, currentIcon);
		}
		handleClose();
	};

	return (
		<>
			<Typography variant="subtitle1">
				图标
				<IconButton color="primary" onClick={() => handleOpen()}>
					<Add />
				</IconButton>
				<IconButton
					color="primary"
					onClick={() => setEditMode(!editMode)}
				>
					{editMode ? "确定" : "编辑"}
				</IconButton>
			</Typography>
			<List>
				{list.map((icon, i) => (
					<ListItem
						key={i}
						button
						onClick={() => handleOpen(icon, i)}
						secondaryAction={
							editMode && (
								<IconButton
									edge="end"
									aria-label="delete"
									onClick={() => onDelete(i)}
								>
									<Delete />
								</IconButton>
							)
						}
					>
						<ListItemIcon>
							<InsertPhoto />
						</ListItemIcon>
						<ListItemText primary={`${icon.sizes}x${icon.sizes}`} />
					</ListItem>
				))}
			</List>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					{updateIndex === -1 ? "添加图标" : "编辑图标"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="图标路径"
						fullWidth
						value={currentIcon.src}
						onChange={(e) =>
							setCurrentIcon({
								...currentIcon,
								src: e.target.value,
							})
						}
					/>
					<TextField
						margin="dense"
						label="尺寸"
						type="number"
						fullWidth
						value={currentIcon.sizes}
						onChange={(e) =>
							setCurrentIcon({
								...currentIcon,
								sizes: e.target.value,
							})
						}
					/>
					<TextField
						margin="dense"
						label="图标文件类型"
						fullWidth
						value={currentIcon.type}
						onChange={(e) =>
							setCurrentIcon({
								...currentIcon,
								type: e.target.value,
							})
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>取消</Button>
					<Button onClick={handleSave}>保存</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const RelatedApp = ({ list, onAdd, onDelete, onUpdate }) => {
	return null;
};

const Create = ({ onComplete, onPreview }) => {
	const [state, setState] = useState({
		name: "",
		short_name: "",
		description: "",
		lang: "zh-CN",
		display: 3,
		icons: [],
		relatedApp: { open: false, data: [] },
		background_color: "#FFFFFF",
		theme_color: "#6750A4",
		start_url: "/",
		scope: "/",
		orientation: "any",
		categories: [],
		screenshots: [],
		prefer_related_applications: false,
		iarc_rating_id: "",
		shortcuts: [],
	});

	const handleChange = (name, value) => {
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<Box>
			<TextField
				fullWidth
				label="应用名称"
				value={state.name}
				onChange={(e) => handleChange("name", e.target.value)}
				margin="normal"
			/>
			<TextField
				fullWidth
				label="短名称"
				value={state.short_name}
				onChange={(e) => handleChange("short_name", e.target.value)}
				margin="normal"
			/>
			<TextField
				fullWidth
				label="应用描述"
				value={state.description}
				onChange={(e) => handleChange("description", e.target.value)}
				margin="normal"
			/>
			<TextField
				fullWidth
				label="语言标记"
				value={state.lang}
				onChange={(e) => handleChange("lang", e.target.value)}
				margin="normal"
			/>
			<TextField
				fullWidth
				label="起始URL"
				value={state.start_url}
				onChange={(e) => handleChange("start_url", e.target.value)}
				margin="normal"
			/>
			<TextField
				fullWidth
				label="作用域"
				value={state.scope}
				onChange={(e) => handleChange("scope", e.target.value)}
				margin="normal"
			/>
			<Select
				fullWidth
				label="显示模式"
				value={state.display}
				onChange={(e) => handleChange("display", e.target.value)}
				margin="normal"
			>
				{displays.map((display, index) => (
					<MenuItem key={index} value={index}>
						{display.name}
					</MenuItem>
				))}
			</Select>
			<br />
			<br />
			<Select
				fullWidth
				label="屏幕方向"
				value={state.orientation}
				onChange={(e) => handleChange("orientation", e.target.value)}
				margin="normal"
			>
				{orientations.map((orientation) => (
					<MenuItem key={orientation} value={orientation}>
						{orientation}
					</MenuItem>
				))}
			</Select>
			<FormControlLabel
				control={
					<Switch
						checked={state.relatedApp.open}
						onChange={(e) =>
							handleChange("relatedApp", {
								...state.relatedApp,
								open: e.target.checked,
							})
						}
					/>
				}
				label="推荐安装原生APP"
			/>
			<Icons
				list={state.icons}
				onAdd={(newIcon) =>
					handleChange("icons", [...state.icons, newIcon])
				}
				onDelete={(index) =>
					handleChange(
						"icons",
						state.icons.filter((_, i) => i !== index)
					)
				}
				onUpdate={(index, updatedIcon) =>
					handleChange(
						"icons",
						state.icons.map((icon, i) =>
							i === index ? updatedIcon : icon
						)
					)
				}
			/>
			{state.relatedApp.open && (
				<RelatedApp
					list={state.relatedApp.data}
					onAdd={(newApp) =>
						handleChange("relatedApp", {
							...state.relatedApp,
							data: [...state.relatedApp.data, newApp],
						})
					}
					onDelete={(index) =>
						handleChange("relatedApp", {
							...state.relatedApp,
							data: state.relatedApp.data.filter(
								(_, i) => i !== index
							),
						})
					}
					onUpdate={(index, updatedApp) =>
						handleChange("relatedApp", {
							...state.relatedApp,
							data: state.relatedApp.data.map((app, i) =>
								i === index ? updatedApp : app
							),
						})
					}
				/>
			)}
			<TextField
				fullWidth
				label="IARC 评级 ID"
				value={state.iarc_rating_id}
				onChange={(e) => handleChange("iarc_rating_id", e.target.value)}
				margin="normal"
			/>
			<Button
				variant="contained"
				color="primary"
				onClick={() => {
					onComplete(state);
					onPreview();
				}}
			>
				完成
			</Button>
		</Box>
	);
};

const ManifestGenerator = () => {
	const [tabValue, setTabValue] = useState(0);
	const [result, setResult] = useState("");
	return (
		<Box sx={{ width: "100%" }}>
			<Tabs
				value={tabValue}
				onChange={(_, newValue) => setTabValue(newValue)}
			>
				<Tab label="编辑" />
				<Tab label="预览" />
			</Tabs>
			<Box sx={{ padding: 3 }}>
				{tabValue === 0 && (
					<Create
						onComplete={setResult}
						onPreview={() => setTabValue(1)}
					/>
				)}
				{tabValue === 1 && <Preview config={result} />}
			</Box>
		</Box>
	);
};

export default ManifestGenerator;
