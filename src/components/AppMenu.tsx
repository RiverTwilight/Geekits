import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Toolbar from "@mui/material/Toolbar";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ShareIcon from "@mui/icons-material/Share";
import StyledMarkdown from "./StyledMarkdown";
import CodeIcon from "@mui/icons-material/Code";
import fivkits from "@/utils/Services/fiv";
import type { AppData } from "@/types/index";

const PREFIX = "AppMenu";

const classes = {
	content: `${PREFIX}-content`,
	margin: `${PREFIX}-margin`,
};

const Root = styled("div")(({ theme }) => ({
	[`&.${classes.content}`]: {
		paddingX: theme.spacing(1),
		button: {
			width: "100%",
		},
	},

	[`& .${classes.margin}`]: {
		marginBottom: theme.spacing(1),
	},
}));

const AppMenu = ({
	appConfig,
	feedback,
	appDoc,
}: {
	appConfig: AppData;
	feedback: () => void;
	appDoc: string;
}) => {
	const { id, name } = appConfig;
	const [fiv, setFiv] = useState(false);
	const [showCode, setShowCode] = useState(false);

	const handleFiv = () => {
		const { id, name } = appConfig;
		if (!fivkits.get(id)) {
			fivkits.add({
				id,
				name,
			});
			setFiv(true);
			window.snackbar({ message: "已收藏" });
		} else {
			fivkits.delete({
				id,
				name,
			});
			setFiv(false);
			window.snackbar({ message: "已取消" });
		}
	};
	const handleShare = () => {
		navigator
			.share({
				title: document.title,
				url: window.location.href,
			})
			.then(() => {
				window.snackbar({ message: "感谢分享^_^" });
			});
	};
	const handleClickCode = (e: any) => {
		e.target.select();
	};
	const handleCode = () => {
		setShowCode(!showCode);
	};
	useEffect(() => {
		if (fivkits.get(id)) {
			setFiv(true);
		}
	}, [appConfig]);
	return (
		<Root className={classes.content}>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				marginBottom: 2,
				"button": {
					marginTop: 1,
				},
				paddingX: 1
			}}>
				<Button
					href={`https://github.com/RiverTwilight/ygktool/tree/master/src/apps/${id}`}
					aria-label="在Github上编辑此页面"
					startIcon={<GitHubIcon fontSize="inherit" />}
					variant="contained"
					sx={{
						width: "100%"
					}}
				>
					在Github上编辑
				</Button>
				<Button
					variant="outlined"
					onClick={handleFiv}
					aria-label="收藏"
					startIcon={fiv ? <StarIcon /> : <StarBorderIcon />}
				>
					收藏
				</Button>
				<Button
					variant="outlined"
					onClick={handleCode}
					aria-label="框架引用"
					startIcon={<CodeIcon fontSize="inherit" />}
				>
					框架引用
				</Button>
				{/* {typeof(navigator.share) != "undefined" && (
					<IconButton onClick={handleShare} aria-label="分享">
						<ShareIcon fontSize="inherit" />
					</IconButton>
				)} */}
				<Button
					className={classes.margin}
					onClick={feedback}
					variant="outlined"
					aria-label="Send us feedback"
				>
					反馈
				</Button>
			</Box>

			{showCode && (
				<TextField
					onClick={handleClickCode}
					value={`<iframe src="${window.location.origin}/app/${appConfig.id}?fullscreen=1" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`}
					id="frame-code"
					label="嵌入代码"
					variant="outlined"
				/>
			)}

			<StyledMarkdown content={appDoc} />
		</Root>
	);
};

export default AppMenu;
