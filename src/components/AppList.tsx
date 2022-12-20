import React, { useMemo } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import BrightnessAutoTwoToneIcon from "@mui/icons-material/BrightnessAutoTwoTone";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import OutlinedCard from "./OutlinedCard";
import type { AppData } from "@/types/index.d";

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: "100%",
		// backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	appItem: {
		minHeight: "90px",
	},
	appItemWarpper: {
		border: "1px solid #e0e0e0",
		borderRadius: "5px",
	},
	[theme.breakpoints.up("sm")]: {
		appItem: {
			height: "100px",
		},
	},
	appItemIcon: {
		// height: "50px",
	},
	appItemText: {
		paddingLeft: "20px",
		"& .MuiListItemText-primary": {
			"font-family": "SimHei",
			fontWeight: 700,
		},
	},
}));

interface AppListItemProps extends AppData {
	selected?: boolean;
}
// TODO schema info check https://schema.org
const AppListItem = ({
	channel,
	name,
	id,
	description,
	status,
	link,
	selected,
	icon,
}: AppListItemProps) => {
	const classes = useStyles();

	const attr = useMemo(
		() =>
			channel === 5
				? {
						href: link,
						target: "_blank",
						rel: "noopener noreferrer",
				  }
				: {
						component: id,
						href: status !== "alpha" ? "/app/" + id : "#/",
				  },
		[status, id]
	);

	return (
		<OutlinedCard>
			<Link {...attr} passHref legacyBehavior>
				<ListItem
					className={classes.appItem}
					selected={selected}
					button
					key={name}
				>
					<ListItemAvatar className={classes.appItemIcon}>
						<Avatar
							imgProps={{
								loading: "lazy",
							}}
							variant="rounded"
							alt={name + "的图标"}
							src={icon}
						/>
					</ListItemAvatar>
					<ListItemText
						className={classes.appItemText}
						primary={
							<>
								{name}&nbsp;
								{status === "beta" && (
									<Chip
										label="开发中"
										size="small"
										variant="outlined"
									/>
								)}
							</>
						}
						secondary={description}
					/>
				</ListItem>
			</Link>
		</OutlinedCard>
	);
};

const MakeChannels = ({
	data: { name, apps, Icon },
}: {
	data: { name: string; apps: AppData[]; Icon: JSX.Element | JSX.Element[] };
}) => {
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
				{/* {open ? <ExpandLess /> : <ExpandMore />} */}
			</ListItem>
			{/* <Collapse in={open} timeout="auto" unmountOnExit> */}
			<List component="div" disablePadding>
				<Grid container spacing={1}>
					{apps.map((app) => (
						<Grid key={app.id} item sm={6} xl={4} xs={12}>
							<AppListItem {...app} />
						</Grid>
					))}
				</Grid>
			</List>
			{/* </Collapse> */}
		</>
	);
};

const getChannelName = (index: any) =>
	["AI人工智能", "图片视频", "编程开发", "生活常用", "第三方 & 友情链接"][
		index - 1
	];

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

const AppList = ({ appData }) => {
	const classes = useStyles();

	var channelType: any = [];

	for (let i = appData.length - 1; i >= 0; i--) {
		let app = appData[i];
		if (!channelType.includes(app.channel)) {
			channelType.unshift(app.channel);
		}
	}

	const data: { name: string; Icon: any; apps: any[] }[] = useMemo(
		() =>
			channelType.map((channel: number) => ({
				name: getChannelName(channel),
				Icon: getChannelIcon(channel),
				apps: appData.filter((app) => app.channel === channel),
			})),
		[]
	);

	console.log(appData);

	return (
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
	);
};

export { AppListItem };
export default AppList;
