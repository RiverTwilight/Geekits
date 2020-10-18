export default class PG {
	config: {
		[profile: string]: string;
	};
	constructor() {
		this.config = {};
	}
	setConfig() {}
	generator(): string {
		return `
本协议是您与${
			this.config.firmName
		}（下称“我们”）之间关于${23}（下称“本网站”）的法律协议。
在使用本网站时，用户必须要遵从国家或地区的相关法律。`;
	}
}
