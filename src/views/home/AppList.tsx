import React from "react";
import { Link } from "react-router-dom";
import applist from "../../data/appData";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import BurstModeIcon from "@material-ui/icons/BurstMode";
import BrightnessAutoTwoToneIcon from "@material-ui/icons/BrightnessAutoTwoTone";
import CodeTwoToneIcon from "@material-ui/icons/CodeTwoTone";
import LinkTwoToneIcon from "@material-ui/icons/LinkTwoTone";
import WbSunnyTwoToneIcon from "@material-ui/icons/WbSunnyTwoTone";
import Paper from "@material-ui/core/Paper";

const AppListItem = ({
	isActive,
	channel,
	icon,
	icon_color,
	name,
	link,
	description,
	selected,
}: any) => {
	const attr =
		channel === 5
			? {
					href: link,
					target: "_blank",
					component: "a",
					rel: "noopener noreferrer",
			  }
			: {
					component: Link,
					to: "/app/" + link,
			  };
	return (
		<ListItem selected={selected} button key={name} {...attr}>
			{/* <ListItemIcon>{Icon}</ListItemIcon> */}
			<ListItemText inset primary={name} secondary={description} />
		</ListItem>
	);
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: "100%",
			backgroundColor: theme.palette.background.paper,
		},
		nested: {
			paddingLeft: theme.spacing(4),
		},
	})
);

//分类栏目
const MakeChannels = ({ data: { name, apps, Icon } }: any) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<>
			<ListItem button onClick={handleClick}>
				<ListItemIcon>{Icon}</ListItemIcon>
				<ListItemText primary={name} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Grid container spacing={3}>
						{apps.map((app: any) => (
							<Grid key={app.name} item sm={6} xs={12}>
								<AppListItem {...app} />
							</Grid>
						))}
					</Grid>
				</List>
			</Collapse>
		</>
	);
};

const getChannelName = (index: any) => {
	const channels = [
		"AI人工智能",
		"图片视频",
		"编程开发",
		"生活常用",
		"第三方工具&友情链接",
	];
	return channels[index - 1];
};

const getChannelIcon = (index: any) => {
	const Icons = [
		<BrightnessAutoTwoToneIcon />,
		<BurstModeIcon />,
		<CodeTwoToneIcon />,
		<WbSunnyTwoToneIcon />,
		<LinkTwoToneIcon />,
	];
	return Icons[index - 1];
};

const AppList = () => {
	const classes = useStyles();

	var channelType: any = [];

	for (let i = applist.length - 1; i >= 0; i--) {
		let app = applist[i];
		if (!channelType.includes(app.channel)) {
			channelType.unshift(app.channel);
		}
	}

	var data: { name: string; Icon: any; apps: any[] }[] = channelType.map(
		(channel: number) => ({
			name: getChannelName(channel),
			Icon: getChannelIcon(channel),
			apps: applist.filter((app) => app.channel === channel),
		})
	);

	return (
		<Paper>
			<List
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						所有工具
					</ListSubheader>
				}
				className={classes.root}
			>
				{data.map((a: any, i: any) => {
					return <MakeChannels key={i} data={a} />;
				})}
			</List>
		</Paper>
	);
};

export { AppListItem };
export default AppList;
