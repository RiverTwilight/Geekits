import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import openai from "@/utils/openai";
import type { CreateCompletionRequest } from "openai";

type Data = {
	packedData: CreateCompletionRequest;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { packedData } = req.body as Data;

	try {
		const response = await openai.createCompletion(packedData);
		console.log(response.data);
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
