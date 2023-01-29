class translator {
	locale: string;
	dic: any;

	constructor(dic, locale: string) {
		this.locale = locale;
		this.dic = dic;
	}

	use(key: string) {
		const currentDic = this.dic[this.locale];
		if (key in currentDic) {
			return currentDic[key];
		}
		return this.dic["zh-CN"][key] || "";
	}

	get() {
		return this.dic[this.locale];
	}
}

export default translator;
