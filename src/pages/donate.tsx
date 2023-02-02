import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { GetStaticProps } from "next";
import translator from "@/utils/translator";
import Placeholder from "@/components/Placeholder";
import PricingCard from "@/components/PricingCard";

const PREFIX = "about";

const classes = {
	contactGroup: `${PREFIX}-contactGroup`,
	authorCard: `${PREFIX}-authorCard`,
};

const Root = styled("div")(({ theme: Theme }) => ({
	maxWidth: "600px",
	margin: "0 auto",
	padding: `${Theme.spacing(2)}`,
	paddingBottom: "50px",
}));

const FREE_DONATION_WAYS = [
	{
		title: "支付宝",
		subtitles: ["获得随机红包"],
		price: "$0.00",
		href: "/alipay_pocket.jpg",
		bgColor: "#0e78ff",
	},
	{
		title: "Github",
		subtitles: ["给我打个⭐"],
		price: "$0.00",
		href: "https://github.com/rivertwilight/ygktool",
		bgColor: "#000",
	},
	{
		title: "DigitalOcean",
		subtitles: ["注册可获得 $200"],
		price: "$0.00",
		href: "https://m.do.co/c/eed8a86797c9",
		bgColor: "linear-gradient(to top right, #031b4e 52%, #00359c)",
	},
];

const PAIED_DONATION_WAYS = [
	{
		title: "☕一杯咖啡",
		price: "$2.00",
		href: "",
	},
	{
		title: "📗一本好书",
		price: "$5.00",
		href: "",
	},
];

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: "捐赠",
				description: trans.use(""),
				path: "/donate",
			},
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
};

const ProductItem = ({ href, ...props }) => (
	<Grid underline="none" component={Link} href={href} item xs={6} sm={4}>
		<PricingCard {...props} />
	</Grid>
);

export default function Donate() {
	return (
		<Root>
			<Box height="200px">
				<Placeholder illustrationUrl="/illustration/undraw_fatherhood_-7-i19.svg" />
			</Box>

			<Typography variant="body1">
				感谢您对我们的开源项目的关注。我们的项目已经开发了三年多，这期间我投入了大量的时间、精力和金钱，包括购买域名和服务器。作为一名没有收入的学生，这一切对我来说是非常昂贵的。但是，我仍然坚守着对这个项目的热爱。如果您愿意，您可以通过捐赠来支持我们，帮助我们继续开发这个项目，使其对更多人有所帮助。我们非常感谢您的支持！
				<br />
				无论哪种捐赠方式，都是对我们莫大的支持。所有的收益都将用于开发、维护、运行云极客工具。
			</Typography>

			<br />

			<Typography variant="h5">免费捐赠</Typography>
			<Grid
				spacing="10px"
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{FREE_DONATION_WAYS.map((way) => (
					<ProductItem {...way} />
				))}
			</Grid>

			<Typography variant="h5">付费捐赠</Typography>
			<Grid
				spacing="10px"
				sx={{ paddingY: (theme) => theme.spacing(1) }}
				container
			>
				{PAIED_DONATION_WAYS.map((way) => (
					<ProductItem {...way} />
				))}
			</Grid>
		</Root>
	);
}
