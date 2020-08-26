import React from 'react';

export default () => {
    window.updateTitle('关于')
    return (
        <div className="mdui-col-md-9">
            <img alt="logo" style={{ display: 'block', margin: '0 auto' }} className="mdui-img-rounded" wdith="80" height="80" src="/logo192.png" />
            <h3 className="mdui-typo-title mdui-text-center">极简，强大，高效</h3>
            <br></br>
            <div className="mdui-card mdui-p-a-2">
                <div className="mdui-typo">
                    <h3><i className="mdui-icon material-icons"></i>开发者</h3>
                    <p>一个高中生，坐标蓉城<br></br>有任何不足敬请斧正。</p>
                </div>
                <ul className="mdui-row-md-2 mdui-list">
                    {/*<a className="mdui-col mdui-list-item mdui-ripple" href="//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes">
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
    </a> */}
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
                    <a rel="noopener noreferrer" target="_blank" className="mdui-col mdui-list-item mdui-ripple" href="https://blog.yungeeker.com/blog/1">
                        <i className="mdui-list-item-icon mdui-icon material-icons">grain</i>
                        <div className="mdui-list-item-content">
                            <div className="mdui-list-item-title mdui-list-item-one-line">
                                开发博客
                        </div>
                            <div className="mdui-list-item-text mdui-list-item-one-line">
                                云极客工具の开发博客
                        </div>
                        </div>
                    </a>
                    <li
                        mdui-dialog="{target: '#donation', history: false}"
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
                        需要付出昂贵的资金、精力和时间成本，
                        而我只是一名在读高中生，没有任何收入来源。
                        你的赞赏将会是我莫大的动力。
            </p>
                </div>
            </div>
        </div>
    )
}
