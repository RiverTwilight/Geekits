import Box from "@mui/material/Box";
import { GetStaticProps } from "next";
import translator from "@/utils/translator";
import PaperBackground from "@/components/PaperBackground";
import Typography from "@mui/material/Typography";
import { useAction } from "@/contexts/action";
import { defaultLocale } from "src/site.config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect, useState } from "react";
import Text from "@/components/i18n";

export const getStaticProps: GetStaticProps = ({ locale = defaultLocale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "Settings",
				description: trans.use(""),
				path: "/donate",
			},
			dic: JSON.stringify(dic),
			locale,
		},
	};
};

export default function Settings() {
	const { setAction } = useAction();
	const [age, setAge] = useState("auto");

	const handleChange = (event: SelectChangeEvent) => {
		setAge(event.target.value as string);
		localStorage.setItem("locale", event.target.value);
		window.location.reload(false);
	};

	setAction(null);

	useEffect(() => {
		if (localStorage.getItem("locale")) {
			setAge(localStorage.getItem("locale"));
		}
	});

	return (
		<PaperBackground contentWidth={900}>
			<Box
				display={"flex"}
				sx={{
					minWidth: "400px",
					width: "100%",
				}}
				justifyContent={"space-between"}
				alignItems={"center"}
			>
				<Typography variant="body1">
					<Text k="settings.language.title" />
				</Typography>
				<FormControl sx={{ width: 180 }}>
					<InputLabel id="settings-language-label">
						<Text k="settings.language.title" />
					</InputLabel>
					<Select
						labelId="settings-language-label"
						id="settings-language"
						value={age}
						onChange={handleChange}
					>
						<MenuItem value={"auto"}>
							<Text k="settings.language.auto" />
						</MenuItem>
						<MenuItem value={"zh-CN"}>
							<Text k="settings.language.zh_cn" />
						</MenuItem>
						<MenuItem value={"en-US"}>
							<Text k="settings.language.en_us" />
						</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<br />
		</PaperBackground>
	);
}
