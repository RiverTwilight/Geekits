import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import OutlinedCard from "../../components/OutlinedCard";
import { styled } from "@mui/material/styles";
import DiffMatchPatch from "diff-match-patch";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EditorContainer = styled("div")(({ theme }) => ({
	width: "100%",
	overflow: "hidden",
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: "12px",
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	"& .cm-editor": {
		width: "100%",
		overflow: "scroll",
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
	"& .cm-content": {
		overflowX: "scroll",
		width: "100%",
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
	"& .cm-gutters": {
		backgroundColor: theme.palette.background.default,
		color: theme.palette.text.primary,
	},
}));

const DiffContainer = styled("pre")(({ theme }) => ({
	margin: 0,
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	width: "100%",
	minWidth: "100%",
	whiteSpace: "pre",
	overflowX: "auto",
	color: theme.palette.text.primary,
	backgroundColor: theme.palette.background.default,
	"& .diff-add": {
		backgroundColor: "#e6ffe6",
		textDecoration: "none",
		padding: "2px 0",
	},
	"& .diff-remove": {
		backgroundColor: "#ffe6e6",
		textDecoration: "none",
		padding: "2px 0",
	},
	"& .diff-equal": {
		padding: "2px 0",
	},
}));

const TextDiff = () => {
	const [leftText, setLeftText] = useState("");
	const [rightText, setRightText] = useState("");
	const [diffResult, setDiffResult] = useState<JSX.Element | null>(null);

	const compareTexts = () => {
		const dmp = new DiffMatchPatch();
		const diffs = dmp.diff_main(leftText, rightText);
		dmp.diff_cleanupSemantic(diffs);

		const diffElements = diffs.map((diff, index) => {
			const [type, text] = diff;
			let className = "diff-equal";
			if (type === -1) className = "diff-remove";
			if (type === 1) className = "diff-add";

			return (
				<span key={index} className={className}>
					{text}
				</span>
			);
		});

		setDiffResult(<>{diffElements}</>);
	};

	return (
		<Box sx={{ width: "100%", overflow: "hidden" }}>
			<Grid
				container
				spacing={2}
				sx={{
					width: "100%",
					margin: 0,
					maxWidth: "80vw",
				}}
			>
				<Grid item xs={12} md={6}>
					<OutlinedCard padding={2}>
						<h3>Original Text</h3>
						<Typography variant="body2" color="textSecondary">
							Character Count: {leftText.length}
						</Typography>
						<EditorContainer>
							<CodeMirror
								value={leftText}
								height="400px"
								onChange={(value) => setLeftText(value)}
								extensions={[javascript()]}
							/>
						</EditorContainer>
					</OutlinedCard>
				</Grid>
				<Grid item xs={12} md={6}>
					<OutlinedCard padding={2}>
						<h3>Modified Text</h3>
						<Typography variant="body2" color="textSecondary">
							Character Count: {rightText.length}
						</Typography>
						<EditorContainer>
							<CodeMirror
								value={rightText}
								height="400px"
								onChange={(value) => setRightText(value)}
								extensions={[javascript()]}
							/>
						</EditorContainer>
					</OutlinedCard>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<Button variant="contained" onClick={compareTexts}>
						Compare Texts
					</Button>
				</Grid>
				{diffResult && (
					<Grid item xs={12}>
						<OutlinedCard padding={2}>
							<h3>Differences</h3>
							<DiffContainer>{diffResult}</DiffContainer>
						</OutlinedCard>
					</Grid>
				)}
			</Grid>
		</Box>
	);
};

export default TextDiff;
