import React from "react";

export async function getStaticProps({ locale, locales }) {
	return {
		props: {
			currentPage: {
				title: "发现",
				path: "/discover",
			},
			locale,
		},
	};
}

export default function Discover() {
	return <>即将到来</>;
}
