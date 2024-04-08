import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { message } = req.body;

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
