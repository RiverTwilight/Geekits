import React from 'react';
import { JQ } from 'mdui';
import Template from '../../utils/AskForTemplate'
import { ToTop } from 'mdui-in-react'
const $ = JQ;

//检查资源类型，链接或代码
const codeType = (code: any, domain: any) => {
    var patt_js = /\.(js$|js\?\S+|css$|css\?\S+)/;//匹配是否为Js/css文件
    var patt_http = /^(http|\/\/)/;//匹配是否为远程连接
    var patt_abridge = /^\/\//;//匹配是否有协议头
    var patt_absolute = /^\/(\S+)/;//匹配绝对&相对路径
    //匹配主域名链接
    var patt_main = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*/;
    if (patt_js.test(code)) {
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        var url = (patt_http.test(code)) ? ((patt_abridge.test(code)) ? "http:" + code : code) : (patt_absolute.test(code)) ? patt_main.exec(domain)[0] + code : domain + code
        console.log({
            "完整的路径": url,
            "是否为直链": patt_http.test(code),
            "是否省略协议头": patt_abridge.test(code)
        })
        return {
            type: 'url',
            path: url
        }
    }
    return 'code'
}

const GetCode = ({
    html
}: any) => {
    if (!html) return null
    return (
        
        <div className="mdui-typo">
            
            <pre>{html}</pre>
        </div>
    )
}

const GetStyle = ({
    jqEle,
    url
}: any) => {
    if (!jqEle) return null;
    //分为style内联和link外联两种获取
    var $style = $(jqEle).find("style");
    var $link = $(jqEle).find("link[rel='stylesheet']")
    var style: any = []
        , link: any = [];
    Object.keys($style).forEach(function (key) {
        // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        var result = $($style[key]).text();
        if (result !== "" && result) {
            style.push({
                src: result
            })
        }
    })
    Object.keys($link).forEach(function (key) {
        // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        let html = $link[key];
        if ($(html).attr("href")) {
            link.push({
                src: $(html).attr("href")
            })
        }
    })
    var data = style.concat(link);
    //style.splice(link.length - 1,1);
    return (
        
        <ul className="mdui-list">
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'script' implicitly has an 'any' type. */}
            {data.map((script, index) => (
                
                <ShowCode index={index} type={codeType(script.src, url)} src={script.src} />
            ))}
        </ul>
    )
}

const ShowCode = ({
    src,
    index,
    type
}: any) => (
    
    <React.Fragment key={index} >
        
        <li
            onClick={() => {
                if (type.type === 'url') {
                    window.open(type.path)
                }
            }}
            className="mdui-list-item mdui-ripple">
            
            <i className="mdui-list-item-icon mdui-icon material-icons">code</i>
            
            <div className="mdui-list-item-content">{src}</div>
        </li>
        
        <li className="mdui-subheader-inset"></li>
    </React.Fragment>
)

const GetScript = ({
    jqEle,
    url
}: any) => {
    if (!jqEle) return null;
    var $html = $(jqEle).find('script')
    var data: any = [];
    Object.keys($html).forEach(function (key) {
        // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        let html = $html[key];
        data.push({
            src: $(html).attr("src") || $(html).text()
        })
    })
    data.splice(data.length - 1, 1);
    return (
        
        <ul className="mdui-list">
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'script' implicitly has an 'any' type. */}
            {data.map((script, index) => (
                
                <ShowCode index={index} type={codeType(script.src, url)} src={script.src} />
            ))}
        </ul>
    )
}

function GetOther(props: any) {
    return (
        
        <p>更多功能开发中...</p>
    )
}

const GetImg = ({
    jqEle,
    url
}: any) => {
    if (!jqEle) return null;
    var $html = $(jqEle).find("img");
    var data: any = [];
    Object.keys($html).forEach(function (key) {
        // @ts-expect-error ts-migrate(7015) FIXME: Element implicitly has an 'any' type because index... Remove this comment to see the full error message
        let html = $html[key];
        data.push({
            src: $(html).attr("src")
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
        if (!img) continue;
        // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
        let imgUrl = (patt_http.test(img)) ? img : (patt_absolute.test(img)) ? patt_main.exec(url)[0] + img : img
        console.log({
            "获取的图片src": url,
            "是否为直链": patt_http.test(img),
            "是否为绝对路径": patt_absolute.test(img)
        })
        list.push(
            
            <div key={i} className="mdui-col">
                
                <div className="mdui-grid-tile">
                    
                    <img src={imgUrl} />
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

const html2Jq = (html: any) => {
    var container = document.createElement('div');
    container.innerHTML = html;
    var Obj = $(container);
    return Obj
}

export default () => (
    
    <>
        
        <Template
            Result={Result}
            api="https://api.ygktool.cn/api/console?url="
            inputOpt={{
                header: '要获取的网址url',
                icon: 'link'
            }}
            btnText="获取"
        />
        
        <ToTop />
    </>
)

class Result extends React.Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        if (!this.props.data) return null
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { html } = this.props.data;
        const jqEle = html2Jq(html);
        const dataToPass = {
            jqEle: jqEle,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'input' does not exist on type 'Readonly<... Remove this comment to see the full error message
            url: this.props.input
        }
        return (
            
            <>
                
                <div className="mdui-tab" mdui-tab="true">
                    
                    <a href="#code" className="mdui-ripple">源码</a>
                    
                    <a href="#script" className="mdui-ripple">脚本</a>
                    
                    <a href="#css" className="mdui-ripple">样式</a>
                    
                    <a href="#imagex" className="mdui-ripple">图片</a>
                </div>
                
                <div id="code"><GetCode html={html} /></div>
                
                <div id="script"><GetScript {...dataToPass} /></div>
                
                <div id="css"><GetStyle {...dataToPass} /></div>
                
                <div id="imagex"><GetImg {...dataToPass} /></div>
            </>
        )
    }
}
