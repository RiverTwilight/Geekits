import Button from "@mui/material/Button";
import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import translator from "@/utils/translator";

export async function getStaticProps({ locale = "zh-CN" }) {
	const path = "/feedback";
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "反馈",
				path,
			},
			locale,
			dic: JSON.stringify(dic),
		},
	};
}

export default function Feedback({ currentPage }) {
	const [feedback, setFeedback] = React.useState("");
	const [contact, setContact] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = () => {
		const fbTemplate = `
New feedback
---------
*Content*:

${feedback}
---------
*Contact*:

${contact}
---------
*Create Date*: ${new Date().toLocaleString()}

*Source Page*: [${window.location.href}](${window.location.href})

*Browser*: ${window.navigator.userAgent}

*Device*: ${window.navigator.platform}

`;

		window.loadShow();
		setIsLoading(true);

		axios
			.post("/api/sendToTelegram", {
				message: fbTemplate,
			})
			.then(() => {
				window.snackbar({ message: "已提交反馈，感谢您的反馈！" });
			})
			.catch(() => {
				window.snackbar({ message: "反馈提交失败，请稍后再试！" });
			})
			.finally(() => {
				window.loadHide();
				setIsLoading(false);
			});
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
			<Button disabled={isLoading} onClick={handleSubmit}>
				提交
			</Button>
		</div>
	);
}
