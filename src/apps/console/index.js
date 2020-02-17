import React from 'react';
import mdui from 'mdui';
import $ from "jquery";

function viewCode(code){
	var patt_js = /\.(js$|js\?\S+|css$|css\?\S+)/;//匹配是否为Js/css文件
	var patt_http = /^(http|\/\/)/;//匹配是否为远程连接
	var patt_abridge = /^\/\//;//匹配是否有协议头
	var patt_absolute = /^\/(\S+)/;//匹配绝对&相对路径
	//匹配主域名链接
	var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
	var inst = new mdui.Dialog('#preCode');
	$("#preCode code").text("");
	if (patt_js.test(code)) {
		//console.log(patt_main.exec($("#url").val()));
		var url = (patt_http.test(code))?((patt_abridge.test(code))?"http:"+code:code):(patt_absolute.test(code))?patt_main.exec($("#url").val())[0]+code:$("#url").val()+code
		console.log({
			"完整的路径":url,
			"是否为直链":patt_http.test(code),
			"是否省略协议头":patt_abridge.test(code)
		})		
		/*$.ajax({
			url: "run.php",
			data: {
				url: url
			},
			type: "GET",
			timeout: 10000,
			beforeSend: () => $(".main-load").show(),
			success: (e) => {
				$(".main-load").hide();
				$("#preCode code").text(e).attr("class", "hljs");
				inst.handleUpdate()
			},
			error:()=>{
				mdui.snackBar({message:'请求失败，请重试'});
				$(".main-load").hide()
			}
		})*/
	} else {
		$("#preCode code").text(code).attr("class","hljs");
		inst.handleUpdate();		
	}
	inst.open();
	document.querySelectorAll('pre code').forEach((block) => {
		//hljs.highlightBlock(block);
	});
}

function GetStyle(props){
	//分为style内联和link外联两种获取
    var Obj = $("<div></div>").append($(props.html));
    var $style = $("style", Obj);
    var $link = $("link[rel='stylesheet']", Obj);
    var style = []
      , link = [];
	Object.keys($style).forEach(function(key) {
		var result = $($style[key]).text();
		if (result !== "") {
			style.push({
				src: result
			})
		}
	});
    Object.keys($link).forEach(function(key) {
       var html = $link[key];
       link.push({
       	src:$(html).attr("href")
       })
    });   
    console.log(link);
    console.log(style);
    var style = style.concat(link);
    //console.log(style);
    style.splice(link.length-4,4);
	var list = [];
	style.map((e,index)=>{
		list.push(
		<li onClick={()=>{
		    console.log(style[index].src);
		    viewCode(style[index].src)
		}} key={index} className="mdui-list-item mdui-ripple">
        <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
        <div className="mdui-list-item-content mdui-text-truncate">{String(e.src)}</div>
        </li>
        )
	})
	return (
		<ul className="mdui-list">{list}</ul>
		)
}

function GetScript(props){
    var Obj = $("<div></div>").append($(props.html));
    var $html = $("script", Obj);
    var data = [];
    Object.keys($html).forEach(function(key) {
       var html = $html[key];
       data.push({
       	src:$(html).attr("src")||$(html).text()
       })
    });
    data.splice(data.length-4,4);
	var list = [];
	data.map((e,index)=>{
		list.push(
		<li onClick={()=>{
		    //console.log(data[index].src);
		    viewCode(data[index].src)
		}} key={index} className="mdui-list-item mdui-ripple">
        <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
        <div className="mdui-list-item-content mdui-text-truncate">{String(e.src)}</div>
        </li>
        )
	})
	return (
		<ul className="mdui-list">{list}</ul>
		)
}

function GetOther(props){
	return(
		<p>更多功能开发中...</p>
		)
}

function GetImg(props){
    var Obj = $("<div></div>").append($(props.html));
    var $html = $("img", Obj);
    var data = [];
    Object.keys($html).forEach(function(key) {
       var html = $html[key];
       data.push({
       	src:$(html).attr("src")
       })
    });
    data.splice(data.length-4,4);
	var list = [];
	console.log(data);
	var patt_img = /\.(jpeg$|gif$|png$|jpg$)/; //匹配是否为图片文件
	var patt_http = /(\/\/|http)\S+\.(jpeg$|gif$|png$|jpg$)/; //匹配是否为远程连接
	var patt_absolute = /^\/(\S+)/; //匹配绝对&相对路径
	//匹配主域名链接
	var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
	for (var i = data.length - 1; i >= 0; i--) {
		var img = data[i]['src'];
		if (img !== 'undefined') {
			var url = (patt_http.test(img)) ? img : (patt_absolute.test(img)) ? patt_main.exec($("#url").val())[0] + img : img
			//(".main-load").show()
			console.log({
				"获取的图片src": url,
				"是否为直链": patt_http.test(img),
				"是否为绝对路径": patt_absolute.test(img)
			})
			list.push(  
		    <div key={i} className="mdui-col">
            <div className="mdui-grid-tile">
            <img src={url}/>
            </div>
            </div>)
		}
	}
	return (
		<div className="mdui-row-xs-3 mdui-row-sm-4 mdui-row-md-5 mdui-row-lg-6 mdui-row-xl-7 mdui-grid-list">
        {list}
        </div>
		)
}


class Ui extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			html:null
		}		
	}
	render(){
		return(
		   <React.Fragment>
		   <div className="mdui-textfield mdui-textfield-floating-label">
              <i className="mdui-icon material-icons">link</i>
              <label className="mdui-textfield-label">http(s)://www.example.com</label>
              <input autoFocus={true} id={"url"} type={"url"} className="mdui-textfield-input"></input>
           </div>
           <button onClick={()=>{
     	/*$.ajax({
			url: "run.php",
			data: {
				url: $("#url").val()
			},
			type: "GET",
			timeout: 10000,
			beforeSend: () => $(".main-load").show(),
			success: (e) => {
				ReactDOM.render(
                  <Ui html={e}/>,
                  $("#console")[0],
                  ()=>{mdui.mutation();$(".main-load").hide()}
                )
			},
			error:()=>{
				mdui.snackBar({message:'请求失败，请重试'});
				$(".main-load").hide()
			}
		})*/
     }} className="mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn">获取</button>
           <div className="mdui-clearfix"></div>
		   <div className="mdui-tab" mdui-tab="true">
             <a href="#script" className="mdui-ripple">脚本</a>
             <a href="#css" className="mdui-ripple">样式</a>
             <a href="#image" className="mdui-ripple">图片</a>
             <a href="#other" className="mdui-ripple">其他</a>
           </div>
		   <div id="script"><GetScript html={this.state.html}/></div>
		   <div id="css"><GetStyle html={this.state.html}/></div>
		   <div id="image"><GetImg html={this.state.html}/></div>
		   <div id="other"><GetOther html={this.state.html}/></div>
		   </React.Fragment>
		)

	}
}

export default ()=><Ui />;