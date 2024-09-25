import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StyledMarkdown from "@/components/StyledMarkdown";
import type { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { defaultLocale } from "src/site.config";
import translator from "@/utils/translator";
import { useAction } from "@/contexts/action";
import { useLocale } from "@/contexts/locale";

export const getStaticProps: GetStaticProps = ({ locale = defaultLocale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "使用条款",
				path: "/terms",
			},
			dic: JSON.stringify(dic),
			locale,
		},
	};
};

export default function Terms({ ...props }) {
	const { locale } = useLocale();
	const { setAction } = useAction();
	const [content, setContent] = useState("");

	setAction(null);

	useEffect(() => {
		fetch(`/data/article/${locale}/terms.md`)
			.then((res) => res.text())
			.then((res) => {
				setContent(res);
			});
	}, []);

	return (
		<Card style={{ maxWidth: "800px" }}>
			<CardContent>
				<StyledMarkdown content={content} />
			</CardContent>
		</Card>
	);
}
