import React from "react";
import axios from "../../utils/axios";
import ClipboardJS from "clipboard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Button from "@mui/material/Button";

/**
 * 樱花动漫解析
 * @author rivertwilight
 */

const VideoListItem = ({ list }: any) => {
	return list.map((video = "", i: any) => (
		<ListItem
			key={i}
			onClick={() => {
				window.open(/\$(\S+)\$/.exec(video)[1]);
			}}
			className="mdui-col mdui-list-item mdui-ripple"
		>
			<ListItemIcon>
				<OndemandVideoIcon />
			</ListItemIcon>
			<ListItemText
				primary={`第${i + 1}集`}
				secondary={/\$(\S+)\$/.exec(video)[1]}
			/>
		</ListItem>
	));
};

const Result = (props: any) => {
	const { src } = props;
	if (!src.length) return null;
	return (
		<List>
			{src.map((source: any, i: any) => (
				<React.Fragment key={i}>
					<ListSubheader>{`播放源${i + 1}`}</ListSubheader>
					<VideoListItem list={source[1]} />
				</React.Fragment>
			))}
		</List>
	);
};

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			url: "http://www.imomoe.in/player/7599-0-1.html",
			data: [],
		};
	}
	componentDidMount() {
		console.log("loaded");
		var VideoListJson;
		var clipboard = new ClipboardJS(".becopy");
		clipboard.on("success", (e) => {
			window.snackbar({ message: "已复制链接" });
			e.clearSelection();
		});
	}
	loadCommentsFromServer() {
		window.showGlobalLoadingOverlay();
		const { url } = this.state;
		function loadJosnp() {
			var VideoListJson;
			return new Promise<void>((resolve, reject) => {
				axios
					.get("/api/bangumi?url=" + url)
					.then((response) => {
						console.log(response.data);
						var tag = document.createElement("script");
						tag.innerText = response.data;
						document
							.getElementsByTagName("body")[0]
							.appendChild(tag);
						resolve();
					})
					.catch((error) => {
						window.snackbar({
							message: error,
						});
					});
			});
		}
		loadJosnp().then(() => {
			window.hideGlobalLoadingOverlay();
			// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'VideoListJson'.
			this.setState({ data: VideoListJson });
		});
	}

	handleChange = (e: { target: { value: any } }) => {
		const {
			target: { value },
		} = e;

		this.setState({ url: value });
	};

	render() {
		return (
			<>
				<FormControl fullWidth>
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<InsertLinkIcon />
								</InputAdornment>
							),
						}}
						autoFocus
						value={this.state.url}
						variant="outlined"
						onChange={this.handleChange}
						label="输入视频播放地址(一定是播放地址！)"
					/>
				</FormControl>
				<br />
				<br />
				<Button
					variant="outlined"
					onClick={this.loadCommentsFromServer.bind(this)}
				>
					获取
				</Button>
				<Result src={this.state.data} />
			</>
		);
	}
}
