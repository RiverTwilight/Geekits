import React from 'react';
import mdui from 'mdui';

const About = props =>{
    window.titleRef.innerText = '关于'
    return(
    <div className="mdui-col-md-9"> 
        <div className="draw-title">
            <img className="mdui-img-rounded" wdith="80" height="80" src="/logo192.png"/>
        </div> 
        <h3 className="mdui-typo-title mdui-text-center">极简，强大，高效</h3>  
        <br></br> 
        <div className="mdui-card mdui-p-a-2"> 
            <div className="mdui-typo"> 
                <h3><i className="mdui-icon material-icons"></i>开发者</h3> 
                <p>我(在读高一学生)利用
                <s>几乎没有的</s>业余时间独自开发了云极客工具,虽然它并不那么美好,但正努力前行。希望她能在生活、学习、工作中给你帮助。<br></br>这个网站的建设初衷是提升我的编程技术，每个工具都是我自己构思、编写的，有任何不足敬请斧正。</p> 
            </div>
            <ul className="mdui-row-md-2 mdui-list">
                <a className="mdui-col mdui-list-item mdui-ripple" href="//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes">
                    <div style={{marginLeft:'-8px'}} className="mdui-list-item-avatar">
                        <img src="http://q4.qlogo.cn/headimg_dl?dst_uin=1985386335&spec=100"/>
                    </div>
                    <div style={{marginLeft: '23px'}} className="mdui-list-item-content"> 
                        <div className="mdui-list-item-title mdui-list-item-one-line">
                        联系开发者
                        </div> 
                        <div className="mdui-list-item-text mdui-list-item-one-line">
                        点击添加QQ:1985386335
                        </div> 
                    </div>
                </a> 
                <a className="mdui-col mdui-list-item mdui-ripple" href="https://jq.qq.com/?_wv=1027&amp;k=59hWPFs">
                    <i className="mdui-list-item-icon mdui-icon material-icons">account_circle</i> 
                    <div className="mdui-list-item-content"> 
                        <div className="mdui-list-item-title mdui-list-item-one-line">
                        加入群组
                        </div> 
                        <div className="mdui-list-item-text mdui-list-item-one-line">
                        与其它GEEKER交流互水
                        </div> 
                    </div>
                </a> 
                <li 
                    mdui-dialog="{target: '#donation'}"
                    className="mdui-col mdui-list-item mdui-ripple">
                    <i className="mdui-list-item-icon mdui-icon material-icons">card_giftcard</i> 
                    <div className="mdui-list-item-content"> 
                        <div className="mdui-list-item-title mdui-list-item-one-line">
                        支持我
                        </div> 
                        <div className="mdui-list-item-text mdui-list-item-one-line">
                        帮助云极客走得更远
                        </div> 
                    </div>
                </li> 
            </ul> 
        </div> 
        <div className="mdui-dialog" id="donation">
            <div className="mdui-dialog-content">
            <center><img wdith="200" height="200" src="/donation_vx.png"></img></center>                 
            <p>
            目前网站只由我一人维护，
            需要支付昂贵的服务器以及其他费用，
            而我只是一名在读高中生，没有任何收入来源。
            微小的赞赏将会是我莫大的动力。
            </p>
            </div>
        </div> 
    </div>
  )
}

export default About