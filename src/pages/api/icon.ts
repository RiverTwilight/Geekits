import { NextApiRequest, NextApiResponse } from "next";
import * as MuiIcons from "@mui/icons-material";
import sharp from "sharp";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const {
		iconName = "Home",
		iconColor = "fff",
		backgroundColor1,
		backgroundColor2,
	} = req.query;

	if (!iconName || typeof iconName !== "string") {
		return res.status(400).json({ message: "Invalid icon name" });
	}

	const IconComponent = (MuiIcons as any)[iconName];

	if (!IconComponent) {
		return res.status(404).json({ message: "Icon not found" });
	}

	const svgString = renderToStaticMarkup(
		React.createElement(IconComponent, {
			viewBox: "0 0 24 24",
			style: { color: `#${iconColor}` },
		})
	);

	try {
		let backgroundFill: string;

		if (backgroundColor1 && backgroundColor2) {
			backgroundFill = `
				<defs>
					<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#${backgroundColor1};stop-opacity:1" />
						<stop offset="100%" style="stop-color:#${backgroundColor2};stop-opacity:1" />
					</linearGradient>
				</defs>
				<rect width="200" height="200" fill="url(#grad)"/>
			`;
		} else if (backgroundColor1) {
			backgroundFill = `<rect width="200" height="200" fill="#${backgroundColor1}"/>`;
		} else {
			const color1 = Math.floor(Math.random() * 16777215).toString(16);
			const color2 = Math.floor(Math.random() * 16777215).toString(16);
			backgroundFill = `
				<defs>
					<linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#${color1};stop-opacity:1" />
						<stop offset="100%" style="stop-color:#${color2};stop-opacity:1" />
					</linearGradient>
				</defs>
				<rect width="200" height="200" fill="url(#grad)"/>
			`;
		}

		const svgBuffer = Buffer.from(`
			<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
				${backgroundFill}
				<g transform="translate(40, 40) scale(10)">
					${svgString}
				</g>
			</svg>
		`);

		const pngBuffer = await sharp(svgBuffer)
			.resize(200, 200)
			.png()
			.toBuffer();

		res.setHeader("Content-Type", "image/png");
		res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
		res.status(200).send(pngBuffer);
	} catch (error) {
		console.error("Error generating icon:", error);
		res.status(500).json({
			message: "Error generating icon",
			error: (error as Error).message,
		});
	}
}
