class translator {
	locale: string;
	dic: {
		[key: string]: string;
	};

	constructor(locale, dic) {
		this.locale = locale;
		this.dic = dic;
	}

	set(key) {
		return JSON.parse(this.dic)[key][this.locale];
	}
}
