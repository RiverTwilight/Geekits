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
import OutlinedCard from "./OutlinedCard";
import type { AppData, IChannel } from "@/types/index.d";
import { Capacitor } from "@capacitor/core";

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
	const attr = useMemo(
		() =>
			channel === "external"
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
					sx={{
						height: "93px",
					}}
					selected={selected}
					button
					key={name}
				>
					<ListItemAvatar>
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
						sx={{
							paddingLeft: "20px",
							"& .MuiListItemText-primary": {
								fontWeight: 700,
							},
						}}
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

const Channel = ({
	info: { name, Icon },
	apps,
}: {
	apps: AppData[];
	info: IChannel;
}) => {
	const [open, setOpen] = React.useState(true);

	if (!!!apps.length) return null;

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<>
			{/* {name && Icon && (
				<ListItem button onClick={handleClick}>
					<ListItemIcon>{Icon}</ListItemIcon>
					<ListItemText primary={name} />
				</ListItem>
			)} */}
			{/* <Collapse in={open} timeout="auto" unmountOnExit> */}
			<List
				subheader={
					<ListSubheader
						sx={{ background: "unset" }}
						component="div"
						id="nested-list-subheader"
					>
						{name}
					</ListSubheader>
				}
				component="div"
				disablePadding
			>
				<Grid container spacing={2}>
					{apps.map((app) => (
						<Grid key={app.id} item sm={6} xl={4} xs={12}>
							<AppListItem {...app} />
						</Grid>
					))}
				</Grid>
			</List>
		</>
	);
};

const AppList = ({
	appData,
	channelInfo,
}: {
	appData: AppData[];
	channelInfo;
}) => {
	return (
		<List
			aria-labelledby="nested-list-subheader"
			// subheader={
			// 	<ListSubheader component="div" id="nested-list-subheader">
			// 		所有工具
			// 	</ListSubheader>
			// }
		>
			{Object.keys(channelInfo).map((key) => {
				let channelizedApps = appData.filter(
					(app) =>
						app.channel === key &&
						app.platform.includes(Capacitor.getPlatform())
				);
				return (
					<>
						<Channel
							info={channelInfo[key]}
							key={key}
							apps={channelizedApps}
						/>
					</>
				);
			})}
		</List>
	);
};

export { AppListItem, Channel };

export default AppList;
