import React, { useState } from "react";
import { useRouter } from "next/router";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import withStyles from "@mui/styles/withStyles";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import GoogleIcon from "@mui/icons-material/Google";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppListItem } from "./AppList";
import pinyin from "js-pinyin";
import useEventListener from "@/utils/Hooks/useEventListener";
import type { AppData } from "../data/i18n/zh-CN/appData";

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
		</List>
	);
};

const styles = (theme: Theme) => {
	return createStyles({
		searchBox: {
			padding: theme.spacing(1),
		},
		input: {
			marginBottom: theme.spacing(1),
		},
	});
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
		<>
			{!!result.length &&
				result.map((a: any, i: number) => (
					<AppListItem
						selected={selectedItem === i}
						key={a.link + a.icon}
						{...a}
					/>
				))}
			<Shortcuts kwd={kwd} />
		</>
	);
};

type SearchState = any;

interface SearchProps {
	appData: AppData[];
	classes: any;
}

const debounce = (func, timeout = 300) => {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};

class Search extends React.Component<SearchProps, SearchState> {
	searchInput: any;
	searchRes: any;
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
		const { classes } = this.props;

		return (
			<Paper className={classes.searchBox}>
				<FormControl fullWidth className={classes.input}>
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
						value={kwd}
						variant="outlined"
						onChange={this.handleChange}
						label="搜索（Ctrl+F）"
					/>
				</FormControl>
				<SearchResult kwd={kwd} result={searchResult} />
			</Paper>
		);
	}
}

export default withStyles(styles)(Search);
