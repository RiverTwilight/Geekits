import React, { useEffect } from "react";
import {
	Card,
	CardContent,
	Typography,
	Link,
	Divider,
	Box,
	Button,
} from "@mui/material";
import StyledMarkdown from "@/components/StyledMarkdown";
import useNotifications from "@/utils/Hooks/useNotification";
import { GetStaticProps } from "next";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const getStaticProps: GetStaticProps = ({ locale = "zh-CN" }) => {
	const dic = require("../data/i18n.json");

	return {
		props: {
			currentPage: {
				title: "更新公告",
				path: "/changelog",
			},
			locale,
			dic: JSON.stringify(dic),
		},
	};
};

const NotificationPage = () => {
	const [notifications, handleMarkAsRead] = useNotifications();

	useEffect(() => {
		// Mark all notifications as read when the page is opened
		notifications.forEach((notification) => {
			if (!notification.isRead) {
				handleMarkAsRead(notification.id);
			}
		});
	}, [notifications, handleMarkAsRead]);

	return (
		<Box
			sx={{
				width: { sm: "768px", xs: "100%" },
				marginBottom: 4,
				paddingX: { sm: 0, xs: 2 },
			}}
		>
			{notifications
				.slice()
				.reverse()
				.slice(0, 5)
				.map((notification) => (
					<Card
						key={notification.id}
						id={`notification-${notification.id}`}
						sx={{
							marginBottom: 2,
							borderRadius: "24px",
							background: (theme) =>
								theme.palette.background.paper,
							boxShadow: "none",
						}}
					>
						<CardContent>
							<Typography variant="h5">
								{notification.createDate.split("T")[0]}
							</Typography>
							<Divider />
							<Box sx={{ paddingY: 2 }}>
								<StyledMarkdown
									content={notification.content}
								/>
							</Box>
						</CardContent>
					</Card>
				))}

			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Link
					href="https://github.com/RiverTwilight/ygktool/issues/21"
					target="_blank"
					rel="noopener noreferrer"
					underline="none"
				>
					<Button
						endIcon={<OpenInNewIcon />}
					>
						Check archived notification
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default NotificationPage;
