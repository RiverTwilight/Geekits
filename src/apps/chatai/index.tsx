import React, { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import OutlinedCard from "@/components/OutlinedCard";
import axios from "@/utils/axios";
import { TextField } from "@mui/material";
import useInput from "@/utils/Hooks/useInput";
import { styled } from "@mui/material/styles";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
		console.log(history);
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
			<Box sx={{ height: "85vh", overflowY: "scroll" }} padding={2}>
				<Box sx={{ marginBottom: "10px" }}>
					{history.map((chat, i) => {
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
					})}
				</Box>
				<Paper
					component="form"
					sx={{
						p: "2px 4px",
						display: "flex",
						alignItems: "center",
						width: "100%",
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
