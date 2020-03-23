import Axios from 'axios';

const setCookie = (name,value) =>
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie= `${name}=${escape (value)};expires=${exp.toGMTString()};path='../'`;
}

const removeCookie = name => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= `${name}=${cval};expires=${exp.toGMTString()};path='/'`;
}

const getCookie = (name) => {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
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
    if(!dataStr)return null;
    const data = JSON.parse(dataStr);
    Axios({
        method: 'post',
        //url: 'http://localhost:444/ygktool/user/login',
        url: 'https://api.ygktool.cn/ygktool/user/login',
        withCredentials: false,
        data:{
            username:data.username,
            password:data.password
        }
    }).then(response =>{
        var json = JSON.parse(response.request.response); 
        switch(json.code){
            case 1:
                removeCookie('userInfo')
                break;
            case 666:
                var newData = JSON.parse(JSON.stringify(json.data));
                newData.password = data.password;           
                newData = JSON.stringify(newData);
                localStorage.setItem('userInfo', newData)
                setCookie('userInfo', newData)
        }      
    })
    return data
}

export { getUserInfo, removeUserInfo }