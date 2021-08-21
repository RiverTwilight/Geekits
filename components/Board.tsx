import { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import StyledMarkdown from ".//StyledMarkdown";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "../utils/axios";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		padding: {
			padding: theme.spacing(1),
		},
		closeButton: {
			float: "right",
		},
	})
);

// https://github.com/RiverTwilight/ygktool/issues/21
const API =
	"https://api.github.com/repos/RiverTwilight/ygktool/issues/21/comments?sort=updated";

export default function Board() {
	const [notice, setNotice] = useState<{
		content: string;
		id: number;
	} | null>(null);

	const classes = useStyles();

	useEffect(() => {
		axios.get(API).then((res) => {
			let latestIssue = res.data[res.data.length - 1];
			if (latestIssue.id == localStorage.getItem("LATEST_READED_NOTICE"))
				return;
			setNotice({ content: latestIssue.body, id: latestIssue.id });
		});
	}, []);
	if (!!!notice) return null;

	const handleClick = () => {
		localStorage.setItem("LATEST_READED_NOTICE", String(notice.id));
		setNotice(null);
	};

	return (
		<>
			<Card className={classes.padding}>
				<IconButton
					onClick={handleClick}
					className={classes.closeButton}
				>
					<CloseIcon />
				</IconButton>
				<br />
				<br />
				<StyledMarkdown content={notice.content} />
			</Card>
		</>
	);
}
