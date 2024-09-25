import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Placeholder from "@/components/Placeholder";
import { styled } from "@mui/material/styles";
import { useEffect, useRef } from "react";

export interface IMessageItem {
	type: string;
}

const SenderBubble = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	padding: theme.spacing(1),
	borderRadius: "20px 20px 2px 20px",
	margin: theme.spacing(1),
	maxWidth: "80%",
	marginLeft: "auto",
	textAlign: "left",
	wordBreak: "break-all",
	wordWrap: "break-word",
	overflowWrap: "break-word",
	hyphens: "auto",
}));

const ContactBubble = styled("div")(({ theme }) => ({
	backgroundColor: theme.palette.secondary[theme.palette.mode],
	color:
		theme.palette.mode === "dark"
			? "#FFF"
			: theme.palette.primary.contrastText,
	padding: theme.spacing(1),
	borderRadius: "20px 20px 20px 2px",
	margin: theme.spacing(1),
	maxWidth: "80%",
	textAlign: "left",
	wordWrap: "break-word",
	overflowWrap: "break-word",
	hyphens: "auto",
}));

const BubbleWarpper = styled("div")(({ theme }) => ({
	display: "flex",
}));

const ChatItem = ({ chat }) => {
	const Bubble = chat.type === "bot" ? ContactBubble : SenderBubble;
	return (
		<BubbleWarpper>
			<Bubble>
				{chat.type === "bot" && (
					<Typography
						align="left"
						sx={{
							fontWeight: 700,
							color: "white",
						}}
						variant="button"
					>
						{
							["🥦", "🥬", "🥒", "🌽", "🍅", "🍑", "🍍", "🪴"][
								Math.floor(Math.random() * 8)
							]
						}
						GPT-3
					</Typography>
				)}
				<Typography variant="body1">{chat.text}</Typography>
			</Bubble>
		</BubbleWarpper>
	);
};

const ChatList = ({ history, loading }) => {
	const bottomPoint = useRef(null);

	console.log(bottomPoint);

	useEffect(() => {
		history.length >= 2 &&
			bottomPoint.current.scrollIntoView({ behavior: "smooth" });
	}, [history]);

	return (
		<Box
			sx={{
				marginBottom: "10px",
				paddingBottom: "70px",
				paddingX: 1,
				"&::-webkit-scrollbar": { display: "none" },
				overflowY: "scroll",
				height: "100%",
			}}
		>
			{!!!history.length ? (
				<Placeholder
					TextComponent={
						<Typography align="center" variant="subtitle1">
							聊天，提问，抑或是请求帮助
							<br />
							更多玩法等你探索
						</Typography>
					}
					illustrationUrl="/illustration/undraw_share_opinion_re_4qk7.svg"
				/>
			) : (
				history.map((chat, i) => (
					<ChatItem key={chat.date.toString()} chat={chat} />
				))
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
			<div ref={bottomPoint}></div>
		</Box>
	);
};

export { SenderBubble, ContactBubble, BubbleWarpper, ChatItem };

export default ChatList;
