import React, { useEffect } from "react";
import AppList from "./AppList";
import Search from "./Search";
import FivList from "./FivList";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		icon: {
			color: "rgba(255, 255, 255, 0.54)",
		},
	})
);

type IndexState = any;

// export default class Index extends React.Component<{}, IndexState> {
// 	// showNotice() {
// 	// 	const {
// 	// 		notice: { date, content, id },
// 	// 	} = this.state;
// 	// 	mduiAlert(
// 	// 		content,
// 	// 		date.split("T")[0] + "公告",
// 	// 		() => {
// 	// 			localStorage.setItem("readedNotice", id);
// 	// 		},
// 	// 		{
// 	// 			confirmText: "我知道了",
// 	// 			history: false,
// 	// 		}
// 	// 	);
// 	// }
// 	componentDidMount() {
// 		this.getNotice();
// 		window.updateTitle();
// 	}
// 	getNotice() {
// 		//if(sessionStorage.loadedNotice == 1)return
// 		// const helpMdPath = require(`../../data/notice.md`);
// 		const helpMdPath = `https://api.github.com/repos/RiverTwilight/ygktool/issues/7`;
// 		fetch(helpMdPath, {
// 			headers: new Headers({
// 				Accept: "application/vnd.github.squirrel-girl-preview",
// 			}),
// 		})
// 			.then((response) => {
// 				return response.text();
// 			})
// 			.then((text) => {
// 				const notice = {
// 					content: marked(JSON.parse(text).body),
// 				};
// 				window.setRightDrawer(
// 					<div className="mdui-typo mdui-p-a-1">
// 						<div
// 							style={{
// 								// Fix word-warp doesn't work
// 								whiteSpace: "normal",
// 							}}
// 							dangerouslySetInnerHTML={{
// 								__html: notice ? notice.content : "没有公告",
// 							}}
// 						></div>
// 					</div>
// 				);
// 				// sessionStorage.setItem('loadedNotice', 1)
// 				// if (
// 				// 	window.innerWidth <= 640 &&
// 				// 	(!localStorage.readedNotice ||
// 				// 		parseInt(localStorage.readedNotice) !== primary)
// 				// )
// 				// 	this.showNotice();
// 			});
// 	}
// 	render() {
// 		return (

// 		);
// 	}
// }

export default function Index(props: any) {
	const classes = useStyles();
	useEffect(() => {
		window.setHeaderButton(null);
		window.updateTitle();
	}, [props]);
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				<Grid item sm={9} xs={12}>
					<Search />
					<FivList />
					<AppList />
				</Grid>
			</Grid>
		</div>
	);
}
