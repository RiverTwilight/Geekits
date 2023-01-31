import { useState, useEffect } from "react";
import ClipboardJS from "clipboard";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import axios from "@/utils/axios";
import useInput from "@/utils/Hooks/useInput";
import ChatList from "@/components/Chat";

export default function Chat() {
	const [history, setHistory] = useState<
		{
			text: string;
			type: string;
			date: Date;
		}[]
	>([]);
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
					max_tokens: 200,
					top_p: 1,
					n: 1,
					stream: false,
					logprobs: null,
					stop: ["\u2022"],
				},
			})
			.then((res) => {
				let timeStemp = new Date();
				setHistory((prevHistory) => [
					...prevHistory,
					{
						type: "bot",
						text: res.data.choices[0].text,
						date: timeStemp,
					},
				]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// useEffect(() => {
	// 	var clipboard = new ClipboardJS(".copy");
	// 	clipboard.on("success", (e) => {
	// 		window.snackbar({ message: "已复制" });
	// 		e.clearSelection();
	// 	});
	// 	return () => clipboard && clipboard.destroy();
	// }, []);

	return (
		<Box
			sx={{
				width: "100%",
				height: "calc(100dvh - 80px)",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<ChatList loading={loading} history={history} />
			<Box
				sx={{
					bottom: 10,
					left: 0,
					right: 0,
					position: "absolute",
					paddingX: 2,
					display: "flex",
					justifyContent: "center"
				}}
			>
				<Paper
					component="form"
					sx={{
						p: "6px 4px",
						maxWidth: "1000px",
						display: "flex",
						alignItems: "center",
						width: "100%",
					}}
				>
					<IconButton sx={{ p: "10px" }} aria-label="menu">
						<MenuIcon />
					</IconButton>
					<InputBase
						sx={{
							ml: 1,
							mr: 1,
							flex: 1,
							background: (theme) =>
								theme.palette.secondary[theme.palette.mode],
							borderRadius: "5px",
							pl: 1,
						}}
						multiline
						placeholder="Say anything you want..."
						autoComplete="off"
						aria-label="Type what you want to ask here"
						value={input}
						onChange={setInput}
						inputProps={{ "aria-label": "Say something" }}
					/>
					<IconButton
						sx={{
							backgroundColor: (theme) =>
								theme.palette.primary.main,
						}}
						size="small"
						disabled={input === ""}
						onClick={handleSend}
					>
						<ArrowUpwardIcon />
					</IconButton>
				</Paper>
			</Box>
		</Box>
	);
}
