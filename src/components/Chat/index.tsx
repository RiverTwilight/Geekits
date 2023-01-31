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

export { SenderBubble, ContactBubble, BubbleWarpper };
