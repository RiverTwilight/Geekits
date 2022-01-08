import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledMarkdown from "../components/StyledMarkdown";

export async function getStaticProps({ locale, locales }) {
	const privacyPolicy = require("../data/articles/" +
		locale +
		"/privacy.md").default;

	return {
		props: {
			currentPage: {
				title: "隐私政策",
				path: "/setting",
			},
			privacyPolicy,
			locale,
		},
	};
}

export default function Privacy({ privacyPolicy }) {
	return (
		<Card style={{ maxWidth: "900px" }}>
			<CardContent>
				<StyledMarkdown content={privacyPolicy} />
			</CardContent>
		</Card>
	);
}
