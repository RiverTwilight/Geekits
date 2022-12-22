import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledMarkdown from "@/components/StyledMarkdown";
import { GetStaticProps } from "next";
import type { PageProps } from "@/types/index";

interface TermsProps extends PageProps {
	termsContent: string;
}

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const pageDic = require("../data/i18n/" + locale + "/page.js")["/terms"];

	const termsContent = require("../../data/article/" +
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
};

export default function Terms({ termsContent, locale }: TermsProps) {
	return (
		<Card style={{ maxWidth: "800px" }}>
			<CardContent>
				<StyledMarkdown content={termsContent} />
			</CardContent>
		</Card>
	);
}
