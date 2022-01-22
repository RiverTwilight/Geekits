import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledMarkdown from "../components/StyledMarkdown";

export async function getStaticProps({ locale }) {

	const pageDic = require("../data/i18n/" + locale + "/page.js")["/terms"];

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
		<Card style={{ maxWidth: "900px" }}>
			<CardContent>
				<StyledMarkdown content={termsContent} />
			</CardContent>
		</Card>
	);
}
