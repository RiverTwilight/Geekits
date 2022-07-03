import OutlinedCard from "../components/OutlinedCard";
import StyledMarkdown from "../components/StyledMarkdown";
import Avatar from "@mui/material/Avatar";
import { makeStyles, createStyles, Theme } from "@mui/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

export async function getStaticProps({ locale }) {
	const pageDic = require("../data/i18n/" + locale + "/page.js")["/about"];

	const aboutContent = require("../data/article/" +
		locale +
		"/about.md").default;

	return {
		props: {
			currentPage: {
				title: pageDic.title,
				path: "/about",
			},
			aboutContent,
			locale,
		},
	};
}

// css centers the avatar
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		authorName:{
			transform:"translateY(-10px)",
		},
		avatar: {
			transform: "translateY(-50%)",
			marginLeft: "calc(50% - 50px)",
			boxShadow: "0px 0px 4px 4px rgb(0 0 0 / 10%)",
		},
		contactGroup: {
			display: "flex",
			justifyContent: "center",
		},
		authorCard: {
			marginTop: 80,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
		},
	})
);

export default function Terms({ aboutContent }) {
	const classes = useStyles();
	return (
		<div style={{ maxWidth: "600px" }}>
			<OutlinedCard className={classes.authorCard}>
				<Avatar
					className={classes.avatar}
					alt="Remy Sharp"
					src="https://avatars.githubusercontent.com/u/52880665?v=4"
					sx={{ width: 100, height: 100 }}
				/>
				<div className={classes.authorName}>
					<Typography align="center" variant="subtitle2">
						Developed and designed by{" "}
					</Typography>
					<Typography align="center" variant="h6">
						RiverTwilight
					</Typography>
				</div>

				<div className={classes.contactGroup}>
					<IconButton aria-label="github">
						<GitHubIcon />
					</IconButton>
					<IconButton aria-label="delete">
						<TwitterIcon />
					</IconButton>
				</div>
			</OutlinedCard>
			<br />
			<OutlinedCard padding={1}>
				<StyledMarkdown content={aboutContent} />
			</OutlinedCard>
		</div>
	);
}
