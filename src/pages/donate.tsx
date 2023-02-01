import OutlinedCard from "../components/OutlinedCard";
import { styled } from "@mui/material/styles";
import StyledMarkdown from "../components/StyledMarkdown";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailIcon from "@mui/icons-material/Mail";
import { GetStaticProps } from "next";
import { author, repo } from "../site.config";
import translator from "@/utils/translator";
import { version } from "../../package.json";

const PREFIX = "about";

const classes = {
	authorName: `${PREFIX}-authorName`,
	avatar: `${PREFIX}-avatar`,
	contactGroup: `${PREFIX}-contactGroup`,
	authorCard: `${PREFIX}-authorCard`,
};

const Root = styled("div")(({ theme: Theme }) => ({
	maxWidth: "600px",
	margin: "180px auto 0 auto",
	padding: `${Theme.spacing(2)}`,
	paddingBottom: "50px",
	[`& .${classes.authorName}`]: {
		transform: "translateY(-10px)",
	},

	[`& .${classes.avatar}`]: {
		transform: "translateY(-50%)",
		marginLeft: "calc(50% - 50px)",
		boxShadow: "0px 0px 4px 4px rgb(0 0 0 / 10%)",
	},

	[`& .${classes.contactGroup}`]: {
		display: "flex",
		justifyContent: "center",
		paddingBottom: "10px",
	},

	[`& .${classes.authorCard}`]: {
		marginTop: 80,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
}));

interface AboutProps extends GetStaticProps {
	aboutContent: string;
}

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	const aboutContent = require("../../data/article/" +
		locale +
		"/about.md").default;

	return {
		props: {
			currentPage: {
				title: trans.use(""),
				description: trans.use(""),
				path: "/donate",
			},
			dic: JSON.stringify(trans.get()),
			aboutContent,
			locale,
		},
	};
};

export default function About({ aboutContent }: AboutProps) {
	return <Root></Root>;
}
