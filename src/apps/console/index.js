import React from 'react';
import mdui from 'mdui';
import axios from 'axios'
import Template from '../../utils/AskForTemplate.jsx'

const $ = mdui.JQ;

//检查资源类型，链接或代码
const codeType = (code, domain) => {
	var patt_js = /\.(js$|js\?\S+|css$|css\?\S+)/;//匹配是否为Js/css文件
	var patt_http = /^(http|\/\/)/;//匹配是否为远程连接
	var patt_abridge = /^\/\//;//匹配是否有协议头
	var patt_absolute = /^\/(\S+)/;//匹配绝对&相对路径
	//匹配主域名链接
	var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
	if (patt_js.test(code)) {
		var url = (patt_http.test(code))?((patt_abridge.test(code))?"http:"+code:code):(patt_absolute.test(code))?patt_main.exec(domain)[0]+code:domain+code
		console.log({
			"完整的路径":url,
			"是否为直链":patt_http.test(code),
			"是否省略协议头":patt_abridge.test(code)
        })		
        return 'url'
	}
    return 'code'
}

const GetCode = ({html}) => {
    if(!html)return null
    return(
        <div className="mdui-typo">
            <pre>{html}</pre>
        </div>
    )
}

const GetStyle = ({jqEle, url}) => {
    if(!jqEle)return null;
	//分为style内联和link外联两种获取
    var $style = $(jqEle).find("style");
    var $link = $(jqEle).find("link[rel='stylesheet']")
    var style = []
      , link = [];
	Object.keys($style).forEach(function(key) {
		var result = $($style[key]).text();
		if (result !== "" && result) {
			style.push({
				src: result
			})
		}
	})
    Object.keys($link).forEach(function(key) {
        let html = $link[key];
        if($(html).attr("href")){
            link.push({
                src:$(html).attr("href")
            })
        }        
    })   
    var data = style.concat(link);
    //style.splice(link.length - 1,1);
	return (
        <ul className="mdui-list">
        {data.map((script,index)=>(
            <ShowCode index={index} type={codeType(script.src, url)} src={script.src} />
        ))}
        </ul>
	)
}

const ShowCode = ({src, index, type}) => {
    return(
        <React.Fragment key={index} >
            <li 
                onClick={()=>{
                    if(type === 'url'){
                        window.open(src)
                    }
                }}
                className="mdui-list-item mdui-ripple">
                <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
                <div className="mdui-list-item-content">{src}</div>
            </li>
            <li class="mdui-subheader-inset"></li>
        </React.Fragment>
    )
}

const GetScript = ({jqEle, url}) => {
    if(!jqEle)return null;
    var $html = $(jqEle).find('script')
    var data = [];
    Object.keys($html).forEach(function(key) {
        let html = $html[key];
        data.push({
            src:$(html).attr("src")||$(html).text()
        })
    })
    data.splice(data.length-1,1);
	return (
        <ul className="mdui-list">
        {data.map((script,index)=>(
            <ShowCode index={index} type={codeType(script.src, url)} src={script.src} />
        ))}
        </ul>
	)
}

function GetOther(props){
	return(
		<p>更多功能开发中...</p>
	)
}

class ToTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isHide:true
        }
    }
    componentDidMount(){
        window.addEventListener("scroll",e => {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t <= 148){
                this.setState({isHide:true})
            }else{
                this.setState({isHide:false})
            }
        })
    }
    componentWillUnmount(){
        window.removeEventListener("scroll",()=>{})
    }
    render(){
        const { isHide } = this.state
        return(
            <button 
                onClick={()=>{
                    window.toTop = setInterval(() => {
                        if(document.documentElement.scrollTop === 0)clearInterval(window.toTop)
                        document.documentElement.scrollTop -= 200
                    }, 50);
                }}
                className={`mdui-color-theme mdui-fab mdui-fab-fixed ${isHide?'mdui-fab-hide':''}`}>
                <i className="mdui-icon material-icons">&#xe5d8;</i>
            </button>
        )
    }
}

const GetImg = ({jqEle, url}) => {
    if(!jqEle)return null;
    var $html = $(jqEle).find("img");
    var data = [];
    Object.keys($html).forEach(function(key) {
        let html = $html[key];
        data.push({
            src:$(html).attr("src")
        })
    })
	var list = [];
	var patt_img = /\.(jpeg$|gif$|png$|jpg$)/; //匹配是否为图片文件
	var patt_http = /(\/\/|http)\S+\.(jpeg$|gif$|png$|jpg$)/; //匹配是否为远程连接
	var patt_absolute = /^\/(\S+)/; //匹配绝对&相对路径
	//匹配主域名链接
	var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
	for (let i = data.length - 1; i >= 0; i--) {
		let img = data[i]['src'];
		if (!img)continue;
        let imgUrl = (patt_http.test(img)) ? img : (patt_absolute.test(img)) ? patt_main.exec(url)[0] + img : img
        console.log({
            "获取的图片src": url,
            "是否为直链": patt_http.test(img),
            "是否为绝对路径": patt_absolute.test(img)
        })
        list.push(  
            <div key={i} className="mdui-col">
                <div className="mdui-grid-tile">
                    <img src={imgUrl}/>
                </div>
            </div>
        )
	}
	return (
		<div className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
        {list}
        </div>
	)
}

const html2Jq = html => {
    var container = document.createElement('div');
    container.innerHTML = html;
    var Obj = $(container);
    return Obj
}

class Ui extends React.Component {
    render(){
        return(
            <>
                <Template
                    Result={Result}
                    api="https://api.ygktool.cn/api/console?url="
                    inputOpt={{
                        header:'要获取的网址url',
                        icon:'link'
                    }}
                />
                <ToTop />
            </>
        )
    }
}

class Result extends React.Component {
	constructor(props) {
        super(props);
    }
	render(){
        if(!this.props.data)return null
        const { html } = this.props.data;
        const jqEle = html2Jq(html);
        const dataToPass = {
            jqEle: jqEle,
            url: this.props.input
        }
		return(
		    <>
                <div className="mdui-tab" mdui-tab="true">
                    <a href="#code" className="mdui-ripple">源码</a>
                    <a href="#script" className="mdui-ripple">脚本</a>
                    <a href="#css" className="mdui-ripple">样式</a>
                    <a href="#image" className="mdui-ripple">图片</a>
                    <a href="#other" className="mdui-ripple">其他</a>
                </div>
                <div id="code"><GetCode html={html} /></div>
                <div id="script"><GetScript {...dataToPass}/></div>
                <div id="css"><GetStyle {...dataToPass}/></div>
                <div id="image"><GetImg {...dataToPass}/></div>
                <div id="other"><GetOther html={html}/></div>
		    </>
		)
	}
}

export default Ui