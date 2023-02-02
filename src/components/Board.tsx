import { useState, useEffect } from "react";
import StyledMarkdown from ".//StyledMarkdown";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button } from "@mui/material";
import OutlinedCard from "./OutlinedCard";
import axios from "../utils/axios";

// https://github.com/RiverTwilight/ygktool/issues/21
const API =
	"https://api.github.com/repos/RiverTwilight/ygktool/issues/21/comments?sort=updated";

export default function Board() {
	const [notice, setNotice] = useState<{
		content: string;
		id: number;
	} | null>(null);

	useEffect(() => {
		axios.get(API).then((res) => {
			let latestIssue = res.data[res.data.length - 1];

			let readedRecord = JSON.parse(
				localStorage.getItem("READED_NOTICES")
			);

			if (readedRecord && readedRecord.includes(latestIssue.id)) return;

			setNotice({ content: latestIssue.body, id: latestIssue.id });
		});
	}, []);

	if (!!!notice) return null;

	const handleConfirm = () => {
		let readedRecord =
			JSON.parse(localStorage.getItem("READED_NOTICES")) || [];

		localStorage.setItem(
			"READED_NOTICES",
			JSON.stringify([...readedRecord, notice.id])
		);

		setNotice(null);
	};

	return (
		<OutlinedCard style={{ maxWidth: "500px" }}>
			<DialogTitle>公告</DialogTitle>
			<DialogContent>
				<StyledMarkdown content={notice.content} />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleConfirm}>不再显示</Button>
			</DialogActions>
		</OutlinedCard>
	);
}
