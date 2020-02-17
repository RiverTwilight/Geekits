import React from 'react';
import mdui from 'mdui';
import '../../App.css';

const About = props =>{
  window.titleRef.innerText = '关于'
  return(
    <React.Fragment> 
      <div className="draw-title">
      <img style={{borderRadius:'5px'}} wdith="80"height="80" src="/logo192.png"></img>
        {/*<span className="mdui-text-color-green">Y</span><span className="mdui-text-color-orange">G</span><span className="mdui-text-color-blue">K</span><span className="mdui-text-color-indigo">TOOL</span>*/}
      </div> 
      <div className="mdui-typo"> 
        <h3 className="mdui-typo-title mdui-text-center">极简，强大，高效</h3>  
        <br></br> 
        <div className="mdui-card mdui-p-a-2"> 
          <h3><i className="mdui-icon material-icons"></i>开发者</h3> 
          <p>我(在读高一学生)利用
          <s>几乎没有的</s>业余时间独自开发了云极客工具,虽然它并不那么美好,但正努力前行。希望她能在生活、学习、工作中给你帮助。<br></br>这个网站的建设初衷是提升我的编程技术，每个工具都是我自己构思、编写的，有任何不足敬请斧正。</p> 
        </div> 
      </div>
      <ul className="mdui-list">
        <a href="//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes">
          <li className="mdui-list-item mdui-ripple"> 
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
          </li>
        </a> 
        <a href="https://jq.qq.com/?_wv=1027&amp;k=59hWPFs">
          <li className="mdui-list-item mdui-ripple">
            <i className="mdui-list-item-icon mdui-icon material-icons">account_circle</i> 
            <div className="mdui-list-item-content"> 
              <div className="mdui-list-item-title mdui-list-item-one-line">
              加入群组
              </div> 
              <div className="mdui-list-item-text mdui-list-item-one-line">
              与其它GEEKER交流互水
              </div> 
            </div>
          </li>
        </a> 
      </ul> 
    </React.Fragment>
  )
}

export default ()=><About />;