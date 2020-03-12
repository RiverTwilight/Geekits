import React from 'react';
import mdui from 'mdui';
import { Input } from 'mdui-in-react'
import axios from 'axios'

const $ = mdui.JQ;

function viewCode(code){
	var patt_js = /\.(js$|js\?\S+|css$|css\?\S+)/;//匹配是否为Js/css文件
	var patt_http = /^(http|\/\/)/;//匹配是否为远程连接
	var patt_abridge = /^\/\//;//匹配是否有协议头
	var patt_absolute = /^\/(\S+)/;//匹配绝对&相对路径
	//匹配主域名链接
	var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
	if (patt_js.test(code)) {
		//console.log(patt_main.exec($("#url").val()));
		var url = (patt_http.test(code))?((patt_abridge.test(code))?"http:"+code:code):(patt_absolute.test(code))?patt_main.exec(url)[0]+code:url+code
		console.log({
			"完整的路径":url,
			"是否为直链":patt_http.test(code),
			"是否省略协议头":patt_abridge.test(code)
		})		
	} else {		
    }
    return 'dfdsafs'
}

function GetStyle({jqEle}){
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
    var style = style.concat(link);
    //style.splice(link.length - 1,1);
	return (
		<ul className="mdui-list">{
            style.map((e,index)=>(
                <li onClick={()=>{
                    console.log(style[index].src);
                    viewCode(style[index].src)
                }} key={index} className="mdui-list-item mdui-ripple">
                    <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
                    <div className="mdui-list-item-content mdui-text-truncate">{String(e.src)}</div>
                </li>
            ))
        }</ul>
	)
}

const GetScript = ({jqEle}) => {
    if(!jqEle)return null;
    var $html = $(jqEle).find('script')
    var data = [];
    Object.keys($html).forEach(function(key) {
        let html = $html[key];
        data.push({
            src:$(html).attr("src")||$(html).text()
        })
    })
    //data.splice(data.length-4,4);
	return (
        <div className="mdui-panel" mdui-panel="true">
        {data.map((script,index)=>(
            <div key={index} className="mdui-panel-item">
                <div className="mdui-panel-item-header">
                    <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
                    <span style={{maxWidth:'80%'}} className="mdui-text-truncate">{script.src}</span>
                </div>
                <div className="mdui-panel-item-body">
                    {viewCode(script.src)}
                </div>
            </div>
        ))}
        </div>
	)
}

function GetOther(props){
	return(
		<p>更多功能开发中...</p>
		)
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

const GetCode = ({html}) => {
    if(!html)return null
    return(
        <div className="mdui-typo">
            <pre>{html}</pre>
        </div>
    )
}

class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url:'',
            html:null,
            jqEle:null
		}		
    }
    catchPage(){
        window.loadShow();
        axios({
            method: 'get',
            url: 'https//api.ygktool.cn/api/console?url=' + this.state.url,
            withCredentials: false
        }).then(response =>{
            var json = JSON.parse(response.request.response);
            console.log(json)
            this.setState({
                html:json.html,
                jqEle:html2Jq(json.html)
            })        
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            window.loadHide()
        })
    }
	render(){
        const { url, html, jqEle } = this.state
		return(
		    <React.Fragment>
                <Input
                    icon="link"
                    value={url}
                    onValueChange={newText=>{
                        this.setState({url:newText})
                    }}
                    type="url"
                />
                <button 
                    onClick={()=>this.catchPage()}
                    className="mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn"
                >
                    获取
                </button>
                <div className="mdui-clearfix"></div>
                <div className="mdui-tab" mdui-tab="true">
                    <a href="#code" className="mdui-ripple">源码</a>
                    <a href="#script" className="mdui-ripple">脚本</a>
                    <a href="#css" className="mdui-ripple">样式</a>
                    <a href="#image" className="mdui-ripple">图片</a>
                    <a href="#other" className="mdui-ripple">其他</a>
                </div>
                <div id="code"><GetCode html={html} /></div>
                <div id="script"><GetScript jqEle={jqEle}/></div>
                <div id="css"><GetStyle jqEle={jqEle}/></div>
                <div id="image"><GetImg url={url} jqEle={jqEle}/></div>
                <div id="other"><GetOther html={html}/></div>
		    </React.Fragment>
		)
	}
}

export default Ui