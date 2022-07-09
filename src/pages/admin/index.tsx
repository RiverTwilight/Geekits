import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import prisma from "../../prisma";

export async function getStaticProps({ locale }) {
	// get data with prisma
	const data = await prisma.query.users({
		where: {},
	});
 
	const pageDic = require("../data/i18n/" + locale + "/page.js")["/admin"];

	const termsContent = require("../data/article/" +
		locale +
		"/terms.md").default;

	return {
		props: {
			currentPage: {
				title: pageDic.title,
				path: "/terms",
			},
			termsContent,
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
