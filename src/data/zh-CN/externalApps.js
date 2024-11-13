/**
 * Add a config to this file to make the external app available.
 */

const data = [
	{
		id: "hellotool",
		name: "哈兔 Box",
		status: "stable",
		locale: "zh-CN",
		link: "https://jesse205.netlify.app/hellotool/",
		icon: "https://jesse205.netlify.app/hellotool/img/logo/rabbit4-wbg.svg",
		channel: "external",
		platform: ["web", "ios", "android"],
	},
	{
		id: "DrawLink",
		name: "DrawLink",
		description: "为 URL 生成精美的卡片，由 YGeeker 出品。",
		status: "stable",
		locale: "zh-CN",
		link: "https://drawl.ink",
		icon: "https://drawl.ink/ms-icon-144x144.png",
		channel: "external",
		platform: ["web", "ios", "android"],
	},
	{
		id: "imyshare",
		name: "精品网站导航",
		description: "",
		status: "stable",
		locale: "zh-CN",
		link: "https://imyshare.com/?from=ygktool",
		platform: ["web", "ios", "android"],
		channel: "external",
	},
	{
		id: "logosc",
		name: "免费 Logo 生成器",
		description: "",
		status: "stable",
		locale: "zh-CN",
		link: "https://www.logosc.cn/start",
		platform: ["web"],
		channel: "external",
	},
];

module.exports = data;
