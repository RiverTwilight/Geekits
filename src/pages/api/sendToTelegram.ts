import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	message: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { message } = req.body as Data;
	const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
	if (!TELEGRAM_BOT_TOKEN) {
		res.status(500).json({ message: "TELEGRAM_BOT_TOKEN is not defined" });
		return;
	}
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	console.log(message);
	const data = {
		chat_id: TELEGRAM_CHAT_ID,
		text: message,
		parse_mode: "Markdown",
	};
	try {
		const response = await axios.post(url, data);
		console.log(response);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
