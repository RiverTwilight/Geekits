import Axios from 'axios';

const setCookie = (name, value) => {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path='../'`;
}

const removeCookie = name => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path='../'`;
}

const getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

const removeUserInfo = _ => {
    removeCookie('userInfo');
    localStorage.userInfo && localStorage.removeItem('userInfo')
}

const getUserInfo = _ => {
    const dataStr = getCookie('userInfo') || localStorage.userInfo
    if (!dataStr) return null;
    const data = JSON.parse(dataStr);
    Axios({
        method: 'post',
        url: '/ygktool/user/login',
        withCredentials: false,
        data: {
            username: data.username,
            token: data.trueToken
        }
    }).then(response => {
        var json = JSON.parse(response.request.response);
        switch (json.code) {
            case 1:
                removeCookie('userInfo');
                localStorage.userInfo && localStorage.removeItem('userInfo')
                window.location.reload()
                break;
            case 666:
                var newData = JSON.stringify(json.data);
                localStorage.userInfo && localStorage.setItem('userInfo', newData)
                setCookie('userInfo', newData)
        }
    })
    return data
}

export { getUserInfo, removeUserInfo }