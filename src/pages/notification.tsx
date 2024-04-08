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
import StyledMarkdown from "@/components/StyledMarkdown";
import useNotifications from "@/utils/Hooks/useNotification";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = ({ locale = "zh-CN" }) => {
	const dic = require("../data/i18n.json");

	return {
		props: {
			currentPage: {
				title: "更新公告",
				path: "/notification",
			},

			locale,
			dic: JSON.stringify(dic),
		},
	};
};

const NotificationPage = () => {
	const [notifications, handleMarkAsRead] = useNotifications();

	return (
		<Box
			sx={{
				width: { sm: "768px", xs: "100%" },
				marginBottom: 4,
				paddingX: { sm: 0, xs: 2 },
			}}
		>
			{notifications
				.reverse()
				.filter((not) => !not.isRead)
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

			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Link
					href="https://github.com/RiverTwilight/ygktool/issues/21"
					target="_blank"
					component={Button}
					underline="none"
				>
					Check archived notification
				</Link>
			</Box>
		</Box>
	);
};

export default NotificationPage;
