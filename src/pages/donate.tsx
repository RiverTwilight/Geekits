import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { GetStaticProps } from "next";
import Placeholder from "@/components/Placeholder";
import translator from "@/utils/translator";
import OutlinedCard from "@/components/OutlinedCard/index";
import PaperBackground from "@/components/PaperBackground";
import {
	Alert,
	Avatar,
	ListItem,
	ListItemAvatar,
	ListItemText,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AttachMoney, Coffee, Fastfood, LocalBar } from "@mui/icons-material";
import { useAction } from "@/contexts/action";
import { defaultLocale } from "src/site.config";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FREE_DONATION_WAYS = [
	{
		title: "支付宝",
		subtitles: ["你可以获得随机红包"],
		price: "¥0.1",
		href: "/image/alipay_pocket.png",
		bgColor: "#0e78ff",
		color: "#fff",
	},
	{
		title: "GitHub",
		subtitles: ["给我打个⭐"],
		price: "¥1.00",
		href: "https://github.com/rivertwilight/ygktool",
		bgColor: "#000",
		color: "#fff",
	},
	{
		title: "DigitalOcean",
		subtitles: ["注册后你可获得 $200"],
		price: "$100",
		href: "https://m.do.co/c/eed8a86797c9",
		bgColor: "linear-gradient(to top right, #031b4e 52%, #00359c)",
		color: "#fff",
	},
	{
		title: "Wise",
		subtitles: ["注册后你可获得 4500 元免费转账额度"],
		price: "¥450",
		href: "https://wise.com/invite/imc/renew279",
		bgColor: "#87eb5c",
		color: "#000",
	},
	{
		title: "N26",
		subtitles: ["注册后你可免费获得德万事达银行卡一张"],
		price: "¥312",
		href: "https://n26.com/r/renjiew1161",
		bgColor: "#36a18c",
		color: "#fff",
	},
	{
		title: "OKX",
		subtitles: ["注册后你可获得神秘盲盒（最高50刀）"],
		price: "$50",
		href: "https://ouxyi.space/join/82087068",
		bgColor: "#000",
		color: "#fff",
	},
];

const PAIED_DONATION_WAYS = [
	{
		title: "请我一杯咖啡",
		amount: "¥6.00",
		icon: <Coffee />,
		href: "",
	},
	{
		title: "请我一杯奶茶",
		amount: "¥15.00",
		icon: <LocalBar />,
		href: "",
	},
	{
		title: "请我一顿饭",
		amount: "¥25.00",
		icon: <Fastfood />,
		href: "",
	},
	{
		title: "自定义金额",
		amount: "",
		icon: <AttachMoney />,
		href: "",
	},
];

const DONATION_HISTORY = [
	{
		amount: "¥80.0",
		donator: "Yunser",
		method: "微信",
	},
	{
		amount: "¥5",
		donator: "SJX",
		method: "微信",
	},
	{
		amount: "⭐️ * 1",
		donator: "Gloridust",
		method: "GitHub",
	},
];

export const getStaticProps: GetStaticProps = ({ locale = defaultLocale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "捐赠",
				description: trans.use(""),
				path: "/donate",
			},
			dic: JSON.stringify(dic),
			locale,
		},
	};
};

const ProductItem = ({ href, ...props }) => (
	<Grid item xs={6} sm={4}>
		<OutlinedCard padding={1}>
			<CardContent>
				<Typography
					sx={{ fontSize: 14 }}
					color="text.secondary"
					gutterBottom
				>
					{props.title}
				</Typography>
				<Typography variant="h5" component="div">
					{props.price}
				</Typography>
				<Typography
					sx={{ height: { xs: "4em", sm: "2em" } }}
					variant="body2"
				>
					{props.subtitles}
				</Typography>
			</CardContent>
			<CardActions>
				<Link href={href} target="_blank">
					<Button
						sx={{ background: props.bgColor, color: props.color }}
						size="small"
					>
						前往
					</Button>
				</Link>
			</CardActions>
		</OutlinedCard>
	</Grid>
);
const PaidOptionItem = ({ href, ...props }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid item xs={6} sm={4}>
				<OutlinedCard
					padding={1}
					onClick={handleClick}
					sx={{ cursor: "pointer" }}
				>
					<ListItem sx={{ height: { xs: "6em", sm: "4em" } }}>
						<ListItemAvatar>
							<Avatar>{props.icon}</Avatar>
						</ListItemAvatar>
						{!!props.amount ? (
							<ListItemText
								primary={props.title}
								secondary={props.amount}
							/>
						) : (
							<ListItemText primary={props.title} />
						)}
					</ListItem>
				</OutlinedCard>
			</Grid>

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>选择支付方式</DialogTitle>
				<DialogContent>
					<Accordion defaultExpanded>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>Gumroad</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Button
								fullWidth
								variant="contained"
								color="primary"
								href={`https://gumroad.com/l/your-product-link?wanted=true&price=${props.amount}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								通过 Gumroad 支付
							</Button>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>微信支付</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box display="flex" justifyContent="center">
								<Image
									src="/image/wechat_6.jpg"
									alt="WeChat QR Code"
									width={200}
									height={200}
									style={{ borderRadius: "8px" }}
								/>
							</Box>
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary expandIcon={<ExpandMoreIcon />}>
							<Typography>支付宝</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Box display="flex" justifyContent="center">
								<Image
									src="/image/alipay_6.jpg"
									alt="Alipay QR Code"
									width={200}
									height={200}
									style={{ borderRadius: "8px" }}
								/>
							</Box>
						</AccordionDetails>
					</Accordion>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						取消
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default function Donate() {
	const { setAction } = useAction();

	setAction(null);

	return (
		<PaperBackground contentWidth={900}>
			<Box height="200px">
				<Placeholder illustrationUrl="/illustration/undraw_fatherhood_-7-i19.svg" />
			</Box>

			<Typography variant="body1">
				感谢您对我的开源项目的关注。Geekits
				已经开发了五年多，这期间我投入了大量的时间、精力和金钱，包括购买域名和服务器。作为一名没有收入的学生，这一切对我来说是非常昂贵的。但是，我仍然坚守着对这个项目的热爱。
				你可以通过捐赠来支持我，帮助我继续开发这个项目，使其对更多人有所帮助。非常感谢你的支持！
				<br />
				<br />
				所有的收益都将用于开发、维护、运行 Geekits。
			</Typography>

			<br />
			<Alert severity="info">
				以下方式都是免费的，你只需要动动手指，我和你都能从中获益。
			</Alert>
			<Grid
				spacing={{ xs: 1, md: 2 }}
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{FREE_DONATION_WAYS.map((way) => (
					<ProductItem {...way} />
				))}
			</Grid>

			<br />
			<br />

			<Typography variant="h6">其他方式</Typography>

			<br />

			<Grid
				spacing={{ xs: 1, md: 2 }}
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{PAIED_DONATION_WAYS.map((way) => (
					<PaidOptionItem {...way} />
				))}
			</Grid>

			<br />
			<br />

			<Typography variant="h6">捐赠记录</Typography>

			<br />

			<TableContainer component={OutlinedCard}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>方式</TableCell>
							<TableCell>金额</TableCell>
							<TableCell>捐赠者</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{DONATION_HISTORY.map((row, i) => (
							<TableRow key={i}>
								<TableCell>{row.method}</TableCell>
								<TableCell>{row.amount}</TableCell>
								<TableCell>{row.donator}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Box
					display={"flex"}
					width={"full"}
					justifyContent={"center"}
					paddingY={2}
				>
					<Button LinkComponent={Link} href="mailto:rene@ygeeker.com">
						问题反馈
					</Button>
				</Box>
			</TableContainer>
		</PaperBackground>
	);
}
