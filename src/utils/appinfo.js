//日期推算 2020/01/20 19:20:30
function conDate(dateEarly, dateLate) {
    function split(date){
        var day = date.split(" ")[0];
        var time = date.split(" ")[1];
        var info = {
            year:day.split("/")[0],
            month:day.split("/")[1],
            day:day.split("/")[2],
            hour:time.split(":")[0],
            min:time.split(":")[1],
            sec:time.split(":")[2]
        }
        return info
    }
    var earlyInfo = split(dateEarly);
    var lateInfo = split(dateLate);
    var yearDiff = (lateInfo.year - earlyInfo.year)*8928;
    var monthDiff = (lateInfo.month - earlyInfo.month)*744;
    var dayDiff = (lateInfo.day - earlyInfo.day)*24;
    var hourDiff = (lateInfo.hour - earlyInfo.hour);
    var totalDiff = yearDiff + monthDiff + dayDiff +hourDiff
    return totalDiff
}

function getFormDate(){
    var today = new Date;        
    var time = today.toTimeString().split(" ")[0];//13:25:30
    var date = today.toLocaleDateString();//2020/1/31
    var wholeDate = date+" "+time;
    return wholeDate
}

var appinfo = {
	get: async link => {
		if (localStorage.applist) {
			var cache = JSON.parse(localStorage.applist);
			if (conDate(cache.date, getFormDate()) <= 3 || !navigator.onLine) {
				console.log('缓存没过期')
				var data = cache.data
				for (let i in data) {
					if (data[i].link == link) return data[i]
				}
			}
		}
		var data = await fetch('https://api.ygktool.cn/apps');
		//console.log(data)
		var back = await data.json();
		localStorage.setItem('applist', JSON.stringify({
			data: back,
			date: getFormDate()
		}))
		for(let i in back){
			if (back[i].link == link) return back[i]
		}
	},
	getAll: async () => {
		if (localStorage.applist) {
			var cache = JSON.parse(localStorage.applist);
			if (conDate(cache.date, getFormDate()) <= 3 || !navigator.onLine) {
				let data = await cache.data
				return data
			}
		}
		var data = await fetch('https://api.ygktool.cn/apps');
		//console.log(data)
		var back = await data.json();
		localStorage.setItem('applist', JSON.stringify({
			data: back,
			date: getFormDate()
		}))
		return back
	}
}

export default appinfo