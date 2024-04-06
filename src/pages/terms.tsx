import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledMarkdown from "@/components/StyledMarkdown";
import type { GetStaticProps } from "next";
import type { PageProps } from "@/types/index";
import { defaultLocale } from "src/site.config";
import translator from "@/utils/translator";

interface TermsProps extends PageProps {
	termsContent: string;
}

export const getStaticProps: GetStaticProps = ({ locale = defaultLocale }) => {
	const termsContent = require("../data/article/" +
		locale +
		"/terms.md").default;
		
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "使用条款",
				path: "/terms",
			},
			dic: JSON.stringify(dic),
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
