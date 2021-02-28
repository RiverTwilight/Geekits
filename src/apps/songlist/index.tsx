import React from "react";
import axios from "../../utils/axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";

const styles = (theme: Theme) =>
	createStyles({
		button: {
			float: "right",
		},
		paper: {
			padding: theme.spacing(2),
		},
	});

// TODO 多歌单互相比较
//提取url中的id
const url2Id = (url: string): string | boolean => {
	const pattweb = /id=(\d+)/,
		pattmob = /\/(playlist)\/(\d+)\//,
		pattid = /^\d+$/;

	if (url.search(pattid) !== -1) return url; //如果是纯数字(id)

	if (url.search(pattmob) !== -1 || url.search(pattweb) !== -1) {
		if (url.search(pattmob) !== -1) {
			//类似http://music.163.com/playlist/10222067/11720510/?userid=11720510的链接
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			return pattmob.exec(url)[2];
		} else {
			//类似https://music.163.com/#/my/m/music/playlist?id=2995734275的链接
			// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
			return pattweb.exec(url)[1];
		}
	} else {
		//既不是ID，又不是合法链接
		return false;
	}
};

//提取相同歌曲
const exportSame = (a: any, b: any) => {
	if (!a || !b) return false;
	var num = 0;
	var same: any = [];
	a.forEach((songa: any) => {
		b.forEach((songb: any) => {
			if (songa.id === songb.id) {
				same.push(songb);
				num++;
			}
		});
	});
	return { same, num };
};

const Result = (props: any) => {
	if (!props.similar) return null;
	window.loadHide();
	return (
		<>
			<List
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						对比歌单
					</ListSubheader>
				}
				component={Paper}
				aria-label="main mailbox folders"
			>
				<ListItem>
					<ListItemIcon>
						<AudiotrackIcon />
					</ListItemIcon>
					<ListItemText primary={props.songlistA} />
				</ListItem>
				<ListItem>
					<ListItemIcon>
						<AudiotrackIcon />
					</ListItemIcon>
					<ListItemText primary={props.songlistB} />
				</ListItem>
			</List>
			<br />
			<List
				component={Paper}
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						有{props.similar.num}首相同歌曲
					</ListSubheader>
				}
			>
				{props.similar.same.map((song: any, i: any) => (
					<ListItem
						key={i}
						component="a"
						href={"https://music.163.com/#/song?id=" + song.id}
					>
						<ListItemIcon>
							<AudiotrackIcon />
						</ListItemIcon>
						<ListItemText primary={song.id} />
					</ListItem>
				))}
			</List>
		</>
	);
};

type UiState = any;

class Songlist extends React.Component<any, UiState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			listidA:
				"https://music.163.com/playlist/10222067/11720510/?userid=11720510",
			listidB:
				"https://music.163.com/#/my/m/music/playlist?id=2995734275",
			url: "https://v1.hitokoto.cn/nm/playlist/",
			dataA: {
				list: null,
				name: "",
			},
			dataB: {
				list: null,
				name: "",
			},
			engine: "netease",
		};
	}
	handleClick = () => {
		const { listidA, listidB } = this.state;
		this.doRequest(listidA, (data: any) => {
			this.setState({
				dataA: {
					list: data.trackIds || null,
					name: data.name || "",
				},
			});
		});
		this.doRequest(listidB, (data: any) => {
			this.setState({
				dataB: {
					list: data.trackIds || null,
					name: data.name || "",
				},
			});
		});
	};
	doRequest(url: any, callback: any) {
		if (!url2Id(url)) {
			window.snackbar({ message: "解析链接失败" });
			return;
		}
		const listid = url2Id(url);
		window.loadShow();
		axios
			.get(this.state.url + listid)
			.then((response) => {
				var json = JSON.parse(response.request.response);
				callback && callback(json.playlist);
			})
			.catch((error) => {
				window.snackbar({
					message: error,
				});
				window.loadHide();
			});
	}
	render() {
		const { dataA, dataB, engine } = this.state;
		const { classes } = this.props;
		return (
			<>
				<Paper className={classes.paper}>
					<FormControl fullWidth>
						<TextField
							variant="outlined"
							onChange={({ target: { value } }) => {
								this.setState({ listidA: value });
							}}
							label="歌单A链接/ID"
							value={this.state.listidA}
						/>
					</FormControl>
					<br />
					<br />
					<FormControl fullWidth>
						<TextField
							variant="outlined"
							onChange={({ target: { value } }) => {
								this.setState({ listidB: value });
							}}
							label="歌单B链接/ID"
							value={this.state.listidB}
						/>
					</FormControl>
					<br />
					<br />
					<Select
						labelId="engine-select"
						id="engine-select"
						value={engine}
						onChange={(name, value) => {
							this.setState({ engine: value });
						}}
					>
						{[
							{
								name: "网易云音乐",
								value: "netease",
							},
						].map((item) => (
							<MenuItem value={item.value} key={item.value}>
								{item.name}
							</MenuItem>
						))}
					</Select>
					<Button
						onClick={this.handleClick}
						variant="contained"
						className={classes.button}
					>
						确定
					</Button>
				</Paper>
				<br />

				<Result
					similar={exportSame(dataA.list, dataB.list)}
					songlistA={dataA.name}
					songlistB={dataB.name}
				/>
			</>
		);
	}
}

export default withStyles(styles)(Songlist);
