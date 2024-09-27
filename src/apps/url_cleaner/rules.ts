export interface DomainRule {
	domain: string;
	queryParams: string[];
}

const initialDomainRules: DomainRule[] = [
	{ domain: "bilibili.com", queryParams: ["share_source", "vd_source"] },
	{ domain: "v.qq.com", queryParams: ["url_from"] },
	{ domain: "m.tb.cn", queryParams: ["share_source", "vd_source"] },
	{
		domain: "item.m.jd.com",
		queryParams: [
			"utm_term",
			"utm_user",
			"utm_source",
			"utm_campaign",
			"utm_medium",
			"ad_od",
			"gx",
			"gxd",
		],
	},
];

export default initialDomainRules;
