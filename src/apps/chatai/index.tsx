import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import axios from "@/utils/axios";
import useInput from "@/utils/Hooks/useInput";
import { styled } from "@mui/material/styles";

const SenderBubble = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	padding: theme.spacing(1),
	borderRadius: "20px 20px 2px 20px",
	margin: theme.spacing(1),
	maxWidth: "80%",
	marginLeft: "auto",
	textAlign: "right",
	wordBreak: "break-all",
	wordWrap: "break-word",
	overflowWrap: "break-word",
	hyphens: "auto",
}));

const ContactBubble = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.secondary.main,
	color: theme.palette.secondary.contrastText,
	padding: theme.spacing(1),
	borderRadius: "20px 20px 20px 2px",
	margin: theme.spacing(1),
	maxWidth: "80%",
	textAlign: "left",
	wordBreak: "break-all",
	wordWrap: "break-word",
	overflowWrap: "break-word",
	hyphens: "auto",
}));

const ChatItemWarpper = styled("div")(({ theme }) => ({
	display: "flex",
}));

export default function Chat() {
	const [history, setHistory] = useState([]);
	const [input, setInput] = useInput<String>("");
	const [loading, setLoading] = useState(false);

	const handleSend = () => {
		setHistory((prevHistory) => [
			...prevHistory,
			{
				type: "human",
				text: input,
				date: new Date(),
			},
		]);
		setInput("");
		setLoading(true);
		axios
			.post("/api/apps/openai", {
				packedData: {
					model: "text-davinci-003",
					prompt: input,
					temperature: 0.9,
					max_tokens: 150,
					top_p: 1,
					n: 1,
					stream: false,
					logprobs: null,
					stop: ["\u2022"],
				},
			})
			.then((res) => {
				setHistory((prevHistory) => [
					...prevHistory,
					{
						type: "bot",
						text: res.data.choices[0].text,
						date: new Date(),
					},
				]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		var clipboard = new ClipboardJS(".copy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制" });
			e.clearSelection();
		});
		return () => clipboard && clipboard.destroy();
	}, []);

	return (
		<>
			<Box
				sx={{
					width: "100%",
					height: "85vh",
					position: "relative",
					"&::-webkit-scrollbar": { display: "none" },
				}}
				padding={2}
			>
				<Box
					sx={{
						marginBottom: "10px",
paddingBottom: "40px",
						overflowY: "scroll",
						height: "100%",
					}}
				>
					{!!!history.length ? (
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								height: "inherit",
							}}
						>
							<div className="center-with-flex">
								<img
									height="130"
									width="130"
									src="/illustration/undraw_share_opinion_re_4qk7.svg"
								/>
								<Typography align="center" variant="subtitle1">
									聊天，提问，抑或是请求帮助
									<br />
									更多玩法等你探索
								</Typography>
							</div>
						</Box>
					) : (
						history.map((chat, i) => {
							return (
								<ChatItemWarpper>
									{chat.type === "bot" ? (
										<ContactBubble>
											<Typography variant="body1">
												{chat.text}
											</Typography>
										</ContactBubble>
									) : (
										<SenderBubble>
											<Typography variant="body1">
												{chat.text}
											</Typography>
										</SenderBubble>
									)}
								</ChatItemWarpper>
							);
						})
					)}
					{loading && (
						<Typography
							className="shakingText"
							align="center"
							variant="subtitle1"
						>
							对方正在输入...
						</Typography>
					)}
				</Box>
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: "100%",
						position: "absolute",
						bottom: 0,
						left: 0,
					}}
				>
					<IconButton sx={{ p: "10px" }} aria-label="menu">
						<MenuIcon />
					</IconButton>
					<InputBase
						sx={{ ml: 1, flex: 1 }}
						placeholder="Say anything you want..."
						autoComplete="off"
						type="search"
						aria-label="Type the search keywords here"
						value={input}
						onChange={setInput}
						inputProps={{ "aria-label": "Say something" }}
					/>
					<IconButton onClick={handleSend}>
						<ArrowUpwardIcon />
					</IconButton>
				</Paper>
			</Box>
		</>
	);
}
