import React, { useMemo } from "react";
import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import OutlinedCard from "./OutlinedCard";
import type { AppData, IChannel } from "@/types/index.d";
import { Capacitor } from "@capacitor/core";
import Text from "./i18n";
import { ListItemButton } from "@mui/material";

interface AppListItemProps extends AppData {
	selected?: boolean;
}

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
						href: "/app/" + id,
				  },
		[status, id]
	);

	const Inner = () => (
		<ListItemButton
			sx={{
				height: "93px",
				overflow: "hidden",
				padding: "0 18px",
			}}
			selected={selected}
			key={id}
			itemScope
			itemType="https://schema.org/SoftwareApplication"
		>
			<ListItemAvatar>
				<Avatar
					variant="circular"
					alt={name + "的图标"}
					src={icon}
					itemProp="image"
				/>
			</ListItemAvatar>
			<ListItemText
				sx={{
					"& .MuiListItemText-primary": {
						fontFamily: "Product Sans Bold",
					},
				}}
				primary={
					<>
						<span itemProp="name">{name}</span>&nbsp;
						{status === "beta" && (
							<Chip
								label={<Text k="channel.wip" />}
								size="small"
								variant="outlined"
							/>
						)}
					</>
				}
				secondary={<span itemProp="description">{description}</span>}
			/>
			<meta itemProp="applicationCategory" content="Utility" />
			<meta itemProp="operatingSystem" content="Web" />
		</ListItemButton>
	);

	if (status === "beta") {
		return (
			<OutlinedCard>
				<Inner />
			</OutlinedCard>
		);
	}

	return (
		<Link {...attr} passHref legacyBehavior>
			<OutlinedCard>
				<Inner />
			</OutlinedCard>
		</Link>
	);
};

const Channel = ({
	info: { name, Icon },
	apps,
}: {
	apps: AppData[];
	info: IChannel;
}) => {
	if (!!!apps.length) return null;

	// Sort apps alphabetically by name
	const sortedApps = useMemo(
		() => [...apps].sort((a, b) => a.name.localeCompare(b.name)),
		[apps]
	);

	return (
		<>
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
					{sortedApps.map((app) => (
						<Grid key={app.id} item md={6} xl={4} xs={12}>
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
	console.log(appData);
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
