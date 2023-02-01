
import { styled } from '@mui/material/styles';

import { GetStaticProps } from "next";
import translator from "@/utils/translator";

const PREFIX = 'Cropper';

const classes = {
    authorName: `${PREFIX}-authorName`,
    avatar: `${PREFIX}-avatar`,
    contactGroup: `${PREFIX}-contactGroup`,
    authorCard: `${PREFIX}-authorCard`
};

// TODO Cropper

const Root = styled('div')((
    {
        theme: Theme
    }
) => ({
    [`& .${classes.authorName}`]: {
        transform: "translateY(-10px)",
    },

    [`& .${classes.avatar}`]: {
        transform: "translateY(-50%)",
        marginLeft: "calc(50% - 50px)",
        boxShadow: "0px 0px 4px 4px rgb(0 0 0 / 10%)",
    },

    [`& .${classes.contactGroup}`]: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: "10px",
    },

    [`& .${classes.authorCard}`]: {
        marginTop: 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
}));

interface AboutProps extends GetStaticProps {
	aboutContent: string;
}

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			currentPage: {
				title: trans.use(""),
				description: trans.use(""),
				path: "/about",
			},
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
};

export default function About({ aboutContent }: AboutProps) {

	return <Root style={{ maxWidth: "600px", margin: "0 auto" }}></Root>;
}
