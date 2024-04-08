import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET,OPTIONS,PATCH,DELETE,POST,PUT"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	if (req.method === "OPTIONS") {
		// Handle preflight requests
		res.status(200).end();
		return;
	}

	const { message } = req.body;

	if (!!!message) {
		return res.status(400).json({});
	}

	const { data, error } = await resend.emails.send({
		from: "Geekits <geekits@ygeeker.com>",
		to: ["rene@ygeeker.com"],
		subject: "Feedback from Geekits",
		react: EmailTemplate({ content: message }),
	});

	if (error) {
		return res.status(400).json(error);
	}

	res.status(200).json(data);
};
