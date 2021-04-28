//设置cookie
function setCookie(cname: any, cvalue: any, exdays: any) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

//获取cookie
function getCookie(cname: any) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}

//清除cookie
function clearCookie(name: any) {
	document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;`;
}

export { setCookie, clearCookie, getCookie };