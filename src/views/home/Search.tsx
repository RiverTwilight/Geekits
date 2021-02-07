import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useEventListener from "../../utils/Hooks/useEventListener";
//@ts-expect-error
import pinyin from "js-pinyin";
import applist from "../../data/appData";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
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
			setActiveItem(e.keyCode === 38 ? activeItem - 1 : activeItem + 1);
		} else if (e.keyCode === 13) {
			e.preventDefault();
			handleClick(`/app/${result[activeItem].link}`);
		}
	};
	const [activeItem, setActiveItem] = useState(-1);
	useEventListener("keydown", handleKeydown);
	let history = useHistory();
	if (!result.length && kwd === "") return null;
	function handleClick(url: any) {
		history.push(url);
	}
	return (
		<List aria-labelledby="nested-list-subheader">
			{result.map((a: any) => (
				<AppListItem key={a.link + a.icon} {...a} />
			))}
			<Typography variant="subtitle1" gutterBottom>
				没找到想要的工具?试试
				<Link
					href={"https://www.google.com/search?q=" + kwd}
				>
					谷歌搜索
				</Link>
			</Typography>
		</List>
	);
};

type SearchState = any;

class Search extends React.Component<any, SearchState> {
	searchInput: any;
	constructor(props: {}) {
		super(props);
		this.state = {
			kwd: "",
			searchResult: [],
		};
	}
	handleSearchKeydown(e: any) {
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
		this.setState({ kwd: value }, () => {
			this.search();
		});
	};
	search() {
		const { kwd } = this.state;
		const res = applist.filter((app) => {
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
	}
	render() {
		const { kwd, searchResult } = this.state;
		const { classes } = this.props;
		return (
			<>
				<Paper className={classes.padding}>
					<FormControl fullWidth>
						<InputLabel htmlFor="standard-adornment-amount">
							搜索（Ctrl+F）
						</InputLabel>
						<Input
							id="standard-adornment-amount"
							value={kwd}
							onChange={this.handleInput}
						/>
					</FormControl>
					<SearchResult kwd={kwd} result={searchResult} />
				</Paper>
				<br></br>
			</>
		);
	}
}

export default withStyles(styles)(Search);
