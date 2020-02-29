const getList = async () => {
	if (localStorage.applist) {
		fetch('https://api.ygktool.cn/apps')
			.then(res => res.json())
			.then(json => {
				localStorage.setItem('applist', JSON.stringify(json))
		})
		var cache = JSON.parse(localStorage.applist);
		return cache
	}
	var data = await fetch('https://api.ygktool.cn/apps');
	var back = await data.json();
	localStorage.setItem('applist', JSON.stringify(back))
	return back
}

var appinfo = {
	get: async link => {
		var list = await getList();
		for(let i in list){
			if (list[i].link == link) return list[i]
		}
	},
	getAll: async () => {
		var list = await getList();
		return list
	}
}

export default appinfo