import Button from "@mui/material/Button";
import React from "react";
import ClipboardJS from "clipboard";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import axios from "axios";

export async function getStaticProps({ locale }) {
	const path = "/feedback";

	const pageDic = require("../data/i18n/" + locale + "/page.js")[path];

	const { title } = pageDic;

	return {
		props: {
			currentPage: {
				title,
				path,
			},
			locale,
			pageDic,
		},
	};
}

export default function Feedback({ currentPage }) {
	const [feedback, setFeedback] = React.useState("");
	const [contact, setContact] = React.useState("");

	const handleSubmit = () => {
		const fbTemplate = `
📤 New feedback
---------
Content:

*${feedback}*
---------
Contact:

*${contact}*
---------
Create Date: *${new Date().toLocaleString()}* 

Source Page: [${window.location.href}](${window.location.href})

Browser: *${window.navigator.userAgent}*

Device: *${window.navigator.platform}*

`;

		axios.post("/api/sendToTelegram", {
			data: {
				message: fbTemplate,
			},
		});

		// // const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
		// const url = `https://api.telegram.org/bot2107169731:AAEaVSk361VzRDdOJjLTLDQxIeZ0gXLsWZ0/sendMessage`;
		// const data = {
		// 	chat_id: 2126810553,
		// 	text: fbTemplate,
		// };
		// axios(url, {
		// 	method: "POST",
		// 	data,
		// })
	};

	const handleChange = (event) => {
		setFeedback(event.target.value);
	};

	const handleContactChange = (event) => {
		setContact(event.target.value);
	};

	return (
		<div style={{ maxWidth: "800px" }}>
			<FormControl fullWidth>
				<TextField
					autoComplete="off"
					id="feedback"
					value={feedback}
					variant="outlined"
					onChange={handleChange}
					rows={6}
					required
					multiline
					label="输入内容"
				/>
			</FormControl>
			<br />
			<br />
			<FormControl fullWidth>
				<TextField
					autoComplete="off"
					id="contact"
					value={contact}
					variant="outlined"
					onChange={handleContactChange}
					label="联系方式"
				/>
			</FormControl>
			<Button onClick={handleSubmit}>提交</Button>
		</div>
	);
}
