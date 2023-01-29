import * as React from "react";

export interface IMetaInfo {
	title: string;
	keywords: string[];
	description?: string;
	root?: string;
	authorName?: string;
}

const MetaInfo: React.FC<IMetaInfo> = ({
	title,
	keywords,
	description,
	authorName,
	root,
}) => {
	return (
		<>
			<meta name="keywords" content={keywords.join(",")} />
			<meta
				itemProp="description"
				name="description"
				content={description}
			/>
			<meta itemProp="name" content="云极客工具" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:url" content={root} />
			<meta property="og:site_name" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:locale" content="zh_CN" />
			<meta property="article:author" content={authorName} />
			<meta property="article:tag" content={authorName} />
			<meta property="article:tag" content="云极客" />
			<meta name="twitter:card" content={description} />
			<meta
				name="google-site-verification"
				content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I"
			/>
			<meta
				name="viewport"
				content="viewport-fit=cover,width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=no"
			/>
			<title>{title}</title>
		</>
	);
};

export default MetaInfo;
