import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import prisma from "../../utils/prisma";

export async function getStaticProps({ locale }) {
	// get data with prisma
	// const data = await prisma.query.users({
	// 	where: {},
	// });

	const pageDic = require("../../data/i18n/" + locale + "/page.js")["/admin"];

	return {
		props: {
			currentPage: {
				title: pageDic.title,
				path: "/admin",
			},
			locale,
		},
	};
}

export default function Terms({ termsContent }) {
	return (
		<Card style={{ maxWidth: "800px" }}>
			<CardContent></CardContent>
		</Card>
	);
}
