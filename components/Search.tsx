import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useEventListener from "../utils/Hooks/useEventListener";
import pinyin from "js-pinyin";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchSharpIcon from "@material-ui/icons/SearchSharp";
import Link from "@material-ui/core/Link";
import { AppListItem } from "./AppList";

const styles = (theme: Theme) => {
	return createStyles({
		padding: {
			padding: theme.spacing(1),
		},
	});
};

/**
 * 搜索结果
 */
const SearchResult = ({ result = [], kwd }: any) => {
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
	if (!result.length && kwd === "") return null;
	function handleClick(url: any) {
		history.push(url);
	}
	useEffect(() => {
		useEventListener("keydown", handleKeydown);
		return () => {
			window.removeEventListener("keydown", handleKeydown);
		};
	}, []);
	return (
		<List aria-labelledby="nested-list-subheader">
			{result.map((a: any, i: number) => (
				<AppListItem
					selected={selectedItem === i}
					key={a.link + a.icon}
					{...a}
				/>
			))}
			<Typography variant="subtitle1" gutterBottom>
				没找到想要的工具?试试
				<Link href={"https://www.google.com/search?q=" + kwd}>
					谷歌搜索
				</Link>
			</Typography>
		</List>
	);
};

type SearchState = any;

function throttle(callback, limit) {
	var waiting = false; // Initially, we're not waiting
	return function () {
		if (!waiting) {
			// If we're not waiting
			callback.apply(this, arguments); // Execute users function
			waiting = true; // Prevent future invocations
			setTimeout(function () {
				// After a period of time
				waiting = false; // And allow future invocations
			}, limit);
		}
	};
}

class Search extends React.Component<any, SearchState> {
	searchInput: any;
	timer: NodeJS.Timeout;
	constructor(props: {}) {
		super(props);
		this.state = {
			kwd: "",
			searchResult: [],
		};
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
	handleInput = (e: { target: { value: any } }) => {
		const {
			target: { value },
		} = e;

		console.log("input");

		throttle(() => {
			console.log(123);
			this.search();
		}, 1000);

		// FIXME 搜索节流

		this.setState({ kwd: value });
	};
	search() {
		const { kwd } = this.state;
		const { appData } = this.props;
		const res = appData.filter((app) => {
			let keyword = kwd.toLowerCase().trim();
			return (
				(pinyin
					.getFullChars(app.name)
					.toLowerCase()
					.indexOf(keyword) !== -1 ||
					app.name.toLowerCase().indexOf(keyword) !== -1) &&
				kwd !== ""
			);
		});
		this.setState({
			searchResult: res,
		});
		console.log(res);
	}
	render() {
		const { kwd, searchResult } = this.state;
		const { classes } = this.props;
		return (
			<Paper className={classes.padding}>
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
						autoComplete="on"
						id="search"
						value={kwd}
						variant="outlined"
						onChange={this.handleInput}
						label="搜索（Ctrl+F）"
					/>
				</FormControl>
				{/* <SearchResult kwd={kwd} result={searchResult} /> */}
			</Paper>
		);
	}
}

export default withStyles(styles)(Search);
