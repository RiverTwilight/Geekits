import { useState, useEffect } from "react";
import StyledMarkdown from ".//StyledMarkdown";
import { DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import { Button } from "@mui/material";
import OutlinedCard from "./OutlinedCard";
import axios from "../utils/axios";
import useNotification from "@/utils/Hooks/useNotification";

// https://github.com/RiverTwilight/ygktool/issues/21
const API =
	"https://api.github.com/repos/RiverTwilight/ygktool/issues/21/comments?sort=updated";

export default function Board() {
	const [notice, handleRead] = useNotification();

	if (!!!notice) return null;

	console.log("===>", notice);

	return (
		<Box style={{ maxWidth: "500px" }}>
			<DialogTitle>公告</DialogTitle>
			<DialogContent>
				<StyledMarkdown content={notice.content} />
			</DialogContent>
			<DialogActions>
				<Button onClick={handleRead}>不再显示</Button>
			</DialogActions>
		</Box>
	);
}
