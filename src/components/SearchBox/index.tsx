import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import GoogleIcon from "@mui/icons-material/Google";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppListItem } from "../AppList";
import Text from "@/components/i18n";
import pinyin from "js-pinyin";
import useEventListener from "@/utils/Hooks/useEventListener";
import type { AppData } from "@/types/index";

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
			handleClick(`/app/${result[selectedItem].link}`);
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

const debounce = (func, timeout: number = 300) => {
	let timer: NodeJS.Timeout;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

type SearchState = any;

interface SearchProps {
	appData: AppData[];
	classes?: any;
}

class Search extends React.Component<SearchProps, SearchState> {
	searchInput: any;
	searchRes: () => void;
	timer: NodeJS.Timeout;
	constructor(props: SearchProps) {
		super(props);
		this.state = {
			kwd: "",
			searchResult: [],
		};
		this.searchRes = debounce(() => {
			this.search();
		}, 500);
	}

	handleSearchKeydown(e: KeyboardEvent) {
		if (e.ctrlKey && e.keyCode === 70) {
			e.preventDefault();
			this.searchInput && this.searchInput.focus();
		}
	}
	componentDidMount() {
		pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
		document.addEventListener(
			"keydown",
			this.handleSearchKeydown.bind(this)
		);
	}

	componentWillUnmount() {
		document.removeEventListener(
			"keydown",
			this.handleSearchKeydown.bind(this)
		);
	}

	handleChange = (e: { target: { value: any } }) => {
		const {
			target: { value },
		} = e;

		this.setState({ kwd: value });

		this.searchRes();
	};

	search() {
		const { kwd } = this.state;
		const { appData } = this.props;
		const res = appData.filter((app) => {
			let keyword = kwd.toLowerCase().trim();
			return (
				pinyin.getFullChars(app.name).toLowerCase().indexOf(keyword) !==
					-1 ||
				(app.name.toLowerCase().indexOf(keyword) !== -1 &&
					kwd !== "") ||
				app.link === kwd
			);
		});
		this.setState({
			searchResult: res || [],
		});
		// console.log(res);
	}

	render() {
		const { kwd, searchResult } = this.state;

		return (
			<Paper
				sx={{
					padding: (theme) => theme.spacing(1),
				}}
			>
				<FormControl fullWidth>
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchSharpIcon />
								</InputAdornment>
							),
						}}
						inputRef={(ref) => (this.searchInput = ref)}
						autoComplete="off"
						id="search"
						type="search"
						aria-label="Type the search keywords here"
						value={kwd}
						variant="outlined"
						onChange={this.handleChange}
						label={<Text k="homePage.searchBarPlaceholder" />}
					/>
				</FormControl>
				<SearchResult kwd={kwd} result={searchResult} />
			</Paper>
		);
	}
}

export default Search;
