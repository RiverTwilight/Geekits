import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/EmailTemplate";

const FEISHU_WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface FeedbackRequest {
	message: string;
	contact?: string;
	device?: string;
	system?: string;
	appIdentifier?: string;
	appName?: string;
	sourceUrl?: string;
}

async function sendFeishuMessage(data: FeedbackRequest) {
	try {
		const response = await fetch(FEISHU_WEBHOOK_URL!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				msg_type: "interactive",
				card: {
					schema: "2.0",
					config: {
						wide_screen_mode: true,
					},
					header: {
						title: {
							tag: "plain_text",
							content: "新反馈通知",
						},
						template: "blue",
					},
					body: {
						direction: "vertical",
						elements: [
							{
								tag: "markdown",
								content: data.message,
							},
							{
								tag: "div",
								text: {
									tag: "lark_md",
									content: [
										data.contact
											? `📧 **联系方式**：${data.contact}\n`
											: "",
										`• 设备：${data.device || "未知"}\n`,
										`• 系统：${data.system || "未知"}\n`,
										`• 应用：${
											data.appIdentifier || "未知"
										}\n`,
										`• 来源：${data.sourceUrl || "未知"}\n`,
										`• 时间：${new Date().toLocaleString()}`,
									].join(""),
								},
							},
						],
					},
				},
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to send Feishu message");
		}

		return await response.json();
	} catch (error) {
		console.error("Error sending Feishu message:", error);
		throw error;
	}
}

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

	const feedbackData: FeedbackRequest = {
		message: req.body.message,
		contact: req.body.contact,
		device: req.body.device,
		system: req.body.system,
		appIdentifier: req.body.appIdentifier,
		appName: req.body.appName || "Geekits",
		sourceUrl: req.body.sourceUrl,
	};

	if (!feedbackData.message) {
		return res.status(400).json({ error: "Message is required" });
	}

	try {
		// Send email
// 		if (RESEND_API_KEY) {
// 			const resend = new Resend(process.env.RESEND_API_KEY);
// 			const emailContent = `
// ${feedbackData.message}

// Contact: ${feedbackData.contact || "Not provided"}
// Device: ${feedbackData.device}
// System: ${feedbackData.system}
// App: ${feedbackData.appIdentifier}
// Source: ${feedbackData.sourceUrl}
// Date: ${new Date().toLocaleString()}
// 			`;

// 			const { data: emailData, error: emailError } =
// 				await resend.emails.send({
// 					from: "YGeeker Feedback Center <geekits@ygeeker.com>",
// 					to: ["rene@ygeeker.com"],
// 					subject: `Feedback from ${feedbackData.appName}`,
// 					react: await EmailTemplate({
// 						content: emailContent,
// 						appName: feedbackData.appName,
// 					}),
// 				});

// 			if (emailError) {
// 				throw emailError;
// 			}
// 		}

		// Send Feishu message
		if (FEISHU_WEBHOOK_URL) {
			await sendFeishuMessage(feedbackData);
		}

		res.status(200).json({ message: "Feedback sent successfully" });
	} catch (error) {
		console.error("Error processing feedback:", error);
		res.status(400).json({ error });
	}
};
