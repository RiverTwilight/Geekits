import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GoogleIcon from "@mui/icons-material/Google";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppListItem } from "../AppGallery";
import Text from "@/components/i18n";
import pinyin from "js-pinyin";
import useEventListener from "@/utils/Hooks/useEventListener";
import type { AppData } from "@/types/index";
import { InputBase } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

const Shortcuts = ({ kwd }: { kwd: string }) => {
	return (
		<List>
			<Link
				legacyBehavior
				href={"https://www.google.com/search?q=" + kwd}
				passHref
			>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<GoogleIcon />
						</ListItemIcon>
						<ListItemText primary={`使用谷歌搜索"${kwd}"`} />
					</ListItemButton>
				</ListItem>
			</Link>
			<Link
				legacyBehavior
				href={"https://cn.bing.com/search?q=" + kwd}
				passHref
			>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<SearchSharpIcon />
						</ListItemIcon>
						<ListItemText primary={`使用必应搜索"${kwd}"`} />
					</ListItemButton>
				</ListItem>
			</Link>
			<Link
				legacyBehavior
				href={"https://www.baidu.com/#ie=UTF-8&wd=" + kwd}
				passHref
			>
				<ListItem>
					<ListItemButton>
						<ListItemIcon>
							<SearchSharpIcon />
						</ListItemIcon>
						<ListItemText primary={`使用百度搜索"${kwd}"`} />
					</ListItemButton>
				</ListItem>
			</Link>
		</List>
	);
};

const SearchResult = ({ result = [], kwd }: any) => {
	if (kwd === "") return null;

	const handleKeydown = (e: any) => {
		if (e.keyCode === 38 || e.keyCode === 40) {
			e.preventDefault();
			setSelectedItem(
				e.keyCode === 38 ? selectedItem - 1 : selectedItem + 1
			);
		} else if (e.keyCode === 13) {
			e.preventDefault();
			handleClick(`/app/${result[selectedItem].id}`);
		}
	};

	const [selectedItem, setSelectedItem] = useState(-1);

	let history = useRouter();
	function handleClick(url: any) {
		history.push(url);
	}

	useEventListener("keydown", handleKeydown);

	return (
		<Box paddingY={1}>
			<List component="div" disablePadding>
				<Grid container spacing={1}>
					{!!result.length &&
						result.map((a: any, i: number) => (
							<Grid key={a.id} item sm={6} xl={4} xs={12}>
								<AppListItem
									selected={selectedItem === i}
									key={a.link + a.icon}
									{...a}
								/>
							</Grid>
						))}
				</Grid>
			</List>

			<Shortcuts kwd={kwd} />
		</Box>
	);
};

type Procedure = (...args: any[]) => void;

const debounce = <F extends Procedure>(
	func: F,
	timeout: number = 300
): ((...args: Parameters<F>) => void) => {
	let timer: NodeJS.Timeout;
	return (...args: Parameters<F>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

interface SearchProps {
	appData: AppData[];
}

const Search = ({ appData }: SearchProps) => {
	const [kwd, setKwd] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const searchInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		pinyin.setOptions({ checkPolyphone: false, charCase: 0 });

		const handleSearchKeydown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.keyCode === 70) {
				e.preventDefault();
				searchInputRef.current?.focus();
			}
		};

		document.addEventListener("keydown", handleSearchKeydown);

		return () =>
			document.removeEventListener("keydown", handleSearchKeydown);
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKwd(e.target.value);
		searchRes();
	};

	const searchRes = debounce(() => search(), 500);

	const search = () => {
		const keyword = kwd.toLowerCase().trim();
		const res = appData.filter((app) => {
			return (
				pinyin.getFullChars(app.name).toLowerCase().indexOf(keyword) !==
					-1 ||
				(app.name.toLowerCase().indexOf(keyword) !== -1 &&
					kwd !== "") ||
				app.link === kwd
			);
		});
		setSearchResult(res || []);
	};

	return (
		<Box
			sx={{
				padding: (theme) => theme.spacing(0),
			}}
		>
			<FormControl fullWidth>
				<Box
					flex={1}
					sx={{
						width: "100%",
						display: "flex",
						alignItems: "center",
						gap: "1em",
					}}
				>
					<InputBase
						sx={{
							borderRadius: "36px",
							paddingY: 1,
							paddingX: 2,
							border: (theme) =>
								({
									light: "1.5px solid #e0e0e0",
									dark: "1.5px solid rgba(255, 255, 255, 0.23)",
								}[theme.palette.mode]),
							display: "flex",
							alignItems: "center",
						}}
						fullWidth
						inputRef={searchInputRef}
						autoComplete="off"
						id="search"
						type="search"
						aria-label="Type the search keywords here"
						value={kwd}
						onChange={handleChange}
						placeholder={ReactDOMServer.renderToString(
							<Text k="homePage.searchBarPlaceholder" />
						)}
						startAdornment={
							<SearchSharpIcon sx={{ marginRight: 1 }} />
						}
					/>
				</Box>
			</FormControl>
			<SearchResult kwd={kwd} result={searchResult} />
		</Box>
	);
};

export default Search;
