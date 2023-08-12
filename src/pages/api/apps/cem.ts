import cem from "@/apps/cem/dic";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { rawStr, htmlMark } = req.body;

    console.log(rawStr)

	if (!!!rawStr) {
		res.status(403).json({ message: "No string provided." });
	}

	try {
		const response = cem(rawStr, htmlMark).resultRaw;
		res.status(200).json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
