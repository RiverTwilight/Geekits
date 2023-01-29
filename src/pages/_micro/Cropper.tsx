import { makeStyles, createStyles, Theme } from "@mui/styles";

import { GetStaticProps } from "next";
import translator from "@/utils/translator";

interface AboutProps extends GetStaticProps {
	aboutContent: string;
}

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../../data/i18n/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: trans.use(""),
				description: trans.use(""),
				path: "/about",
			},
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		authorName: {
			transform: "translateY(-10px)",
		},
		avatar: {
			transform: "translateY(-50%)",
			marginLeft: "calc(50% - 50px)",
			boxShadow: "0px 0px 4px 4px rgb(0 0 0 / 10%)",
		},
		contactGroup: {
			display: "flex",
			justifyContent: "center",
			paddingBottom: "10px",
		},
		authorCard: {
			marginTop: 80,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
	})
);

export default function About({ aboutContent }: AboutProps) {
	const classes = useStyles();
	return <div style={{ maxWidth: "600px", margin: "0 auto" }}></div>;
}
