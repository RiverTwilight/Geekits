import React, { useState } from "react";
import {
	TextField,
	Card,
	List,
	ListSubheader,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
	Grid,
} from "@mui/material";

interface RegExpPattern {
	exp: string;
	description: string;
}

const commonPatterns: RegExpPattern[] = [
	{
		exp: "\\d+\\.\\d+\\.\\d+\\.\\d+",
		description: "IP Address",
	},
	{
		exp: "\\d{4}-\\d{1,2}-\\d{1,2}",
		description: "Date (yyyy-mm-dd)",
	},
	{
		exp: "[1-9][0-9]{4,}",
		description: "QQ Number",
	},
	{
		exp: "(((ht|f)tps?)://)?[w-]+(.[w-]+)+([w.,@?^=%&:/~+#-]*[w@?^=%&/~+#-])?",
		description: "URL",
	},
	{
		exp: "[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}",
		description: "E-mail",
	},
	{
		exp: "thunderx?://[a-zA-Z\\d]+=",
		description: "Thunder Link",
	},
	{
		exp: "[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF][A-HJ-NP-Z0-9][0-9]{4}))",
		description: "License Plate (Non-NEV)",
	},
	{
		exp: "(?:(?:\\+|00)86)?1(?:(?:3[\\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\\d])|(?:9[1|8|9]))\\d{8}",
		description: "Phone Number (CN)",
	},
];

const testRegExp = (pattern: string, text: string): string => {
	try {
		const markedPattern = pattern
			.replace(/\\/g, "\\")
			.replace(/\</, "&lt;");

		const markedText = text
			.replace(/\</, "&lt;")
			.replace(/\>/, "&gt;")
			.replace(/\n/g, "<br/>")
			.replace(/\s/g, "&nbsp;");

		const regex = new RegExp(markedPattern, "g");

		return markedText.replace(
			regex,
			'<span style="background-color:#9be49e">$&</span>'
		);
	} catch (err) {
		return String(err);
	}
};

const RegExpTester: React.FC = () => {
	const [pattern, setPattern] = useState("\\d+\\.\\d+\\.\\d+\\.\\d+");
	const [text, setText] = useState(
		"IP address: 118.484.15.11\nLocation: Tokyo, Japan"
	);

	return (
		<Box sx={{ p: 2 }}>
			<TextField
				fullWidth
				label="Regular Expression"
				value={pattern}
				onChange={(e) => setPattern(e.target.value)}
				margin="normal"
				variant="outlined"
			/>

			<Card sx={{ mb: 2 }}>
				<List>
					<ListSubheader>Common Patterns</ListSubheader>
					<Grid container>
						{commonPatterns.map((item, index) => (
							<Grid item xs={12} sm={4} md={3} key={index}>
								<ListItem disablePadding>
									<ListItemButton
										onClick={() => setPattern(item.exp)}
									>
										<ListItemText
											primary={item.description}
										/>
									</ListItemButton>
								</ListItem>
							</Grid>
						))}
					</Grid>
				</List>
			</Card>

			<Card>
				<Box
					sx={{
						position: "relative",
						minHeight: text.split("\n").length * 40 + 100,
					}}
				>
					<Box
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							p: 2,
							color: "transparent",
						}}
						dangerouslySetInnerHTML={{
							__html: testRegExp(pattern, text).replace(
								/\n/g,
								"<br>"
							),
						}}
					/>
					<TextField
						multiline
						fullWidth
						value={text}
						onChange={(e) => setText(e.target.value)}
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							right: 0,
							"& .MuiInputBase-root": {
								backgroundColor: "transparent",
							},
							"& .MuiOutlinedInput-notchedOutline": {
								border: "none",
							},
						}}
					/>
				</Box>
			</Card>
		</Box>
	);
};

export default RegExpTester;
