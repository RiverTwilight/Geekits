import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
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
		padding: theme.spacing(1),
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
	const [help, setHelp] = useState("暂无帮助文本");
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
		// const helpMdPath = require(`../../apps/${appConfig.id}/README.md`);
		// fetch(helpMdPath.default)
		// 	.then((response) => {
		// 		return response.text();
		// 	})
		// 	.then((text) => {
		// 		setHelp(text === "" ? "暂无帮助文本" : text);
		// 	});
	});
	return (
		<Root className={classes.content}>
			<ButtonGroup aria-label="more options">
				<IconButton
					component="a"
					href={`https://github.com/RiverTwilight/ygktool/tree/master/src/apps/${id}`}
					aria-label="在Github上编辑此页面"
					size="large"
				>
					<GitHubIcon fontSize="inherit" />
				</IconButton>
				<IconButton onClick={handleFiv} aria-label="收藏" size="large">
					{fiv ? <StarIcon /> : <StarBorderIcon />}
				</IconButton>
				<IconButton
					onClick={handleCode}
					aria-label="框架引用"
					size="large"
				>
					<CodeIcon fontSize="inherit" />
				</IconButton>
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
			</ButtonGroup>

			{showCode && (
				<TextField
					onClick={handleClickCode}
					value={`<iframe src="${window.location.origin}/app/${appConfig.id}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`}
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
