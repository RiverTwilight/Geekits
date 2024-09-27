export interface DomainRule {
	domain: string;
	needRedirect?: boolean;
	queryParams: string[];
}

// 【淘宝】限时每300减30 http://e.tb.cn/h.gsNHORCRSKcwKnK?tk=gCL538kXC7i HU9196 「USB免驱动无线网卡笔记本台式机电脑wifi6接收发射器无限上网卡连接热点外置网络外接千兆5G双频信号免驱动」
const initialDomainRules: DomainRule[] = [
	{ domain: "bilibili.com", queryParams: ["share_source", "vd_source"] },
	{ domain: "v.qq.com", queryParams: ["url_from"] },
	{ domain: "m.tb.cn", queryParams: ["share_source", "vd_source"] },
	{ domain: "youtu.be", queryParams: ["si"] },
	{
		domain: "e.tb.cn",
		needRedirect: true,
		queryParams: ["utm_term", "utm_user", "utm_source"],
	},
	{
		domain: "coolapk.com",
		queryParams: ["shareKey", "shareFrom"],
	},
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
