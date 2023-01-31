import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Placeholder from "@/components/Placeholder";
import { styled } from "@mui/material/styles";

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
	textAlign: "right",
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
	wordBreak: "break-all",
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
				<Typography variant="body1">{chat.text}</Typography>
			</Bubble>
		</BubbleWarpper>
	);
};

const ChatList = ({ history, loading }) => {
	return (
		<Box
			sx={{
				marginBottom: "10px",
				paddingBottom: "60px",
				"&::-webkit-scrollbar": { display: "none" },
				overflowY: "scroll",
				height: "100%",
			}}
		>
			{!!!history.length ? (
				<Placeholder illustrationUrl="/illustration/undraw_share_opinion_re_4qk7.svg" />
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
		</Box>
	);
};

export { SenderBubble, ContactBubble, BubbleWarpper, ChatItem };

export default ChatList;
