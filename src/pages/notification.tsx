import {
	Card,
	CardContent,
	CardActions,
	Button,
	Typography,
	Link,
	Divider,
	Box,
} from "@mui/material";
import StyledMarkdown from "@/components/StyledMarkdown"; // Adjust the import path as needed
import useNotifications from "@/utils/hooks/useNotification"; // Adjust the import path as needed
import { useMemo } from "react";
import OutlinedCard from "@/components/OutlinedCard";

export const getStaticProps: GetStaticProps = ({
	locale = "zh-CN",
	...ctx
}) => {
	const dic = require("../data/i18n.json");

	return {
		props: {
			currentPage: {
				title: "更新公告",
				path: "/notification",
			},

			locale,
			dic: JSON.stringify(dic[locale]),
		},
	};
};

const NotificationPage = () => {
	const [notifications, handleMarkAsRead] = useNotifications();

	return (
		<Box sx={{ marginBottom: 4, paddingX: { sm: 0, xs: 2 } }}>
			{notifications
				.reverse()
				.slice(0, 5)
				.map((notification) => (
					<Card
						key={notification.id}
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
						{!notification.isRead && (
							<CardActions>
								<Button
									size="small"
									onClick={() =>
										handleMarkAsRead(notification.id)
									}
								>
									Mark as read
								</Button>
							</CardActions>
						)}
					</Card>
				))}

			<Link
				href="https://github.com/RiverTwilight/ygktool/issues/21"
				target="_blank"
			>
				Check archived notification
			</Link>
		</Box>
	);
};

export default NotificationPage;
