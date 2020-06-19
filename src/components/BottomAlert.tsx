import React from 'react';
import { JQ } from 'mdui'

/**
 * 底部弹出菜单
 * 在640Px以上的屏幕会呈现为普通div元素
 */

export default class extends React.Component<Readonly<{
    ifShow: boolean;
    title: string;
    onClose(): void;
    children: any;
    height?: string
}>, {}>{
    render() {
        const { ifShow, title, onClose, children, height = '90%' } = this.props;
        if (window.innerWidth <= 640 && ifShow) {
            JQ.showOverlay(1001);//刚好超过头部
        }
        //用return null会每次重载图片
        return (
            <div style={{ height: ifShow ? height : '0' }} className="mdui-card bottom-alert bottom-dashboard">
                <div className="mdui-hidden-sm-up mdui-card-media">
                    <div className="mdui-card-menu">
                        <button
                            onClick={() => {
                                onClose()
                                JQ.hideOverlay();

                            }}
                            className="mdui-btn mdui-btn-icon">
                            <i className="mdui-icon material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div
                    style={{ padding: '15px 16px 16px 16px' }}
                    className="mdui-card-primary">
                    <div className="mdui-card-primary-title">{title}</div>
                </div>
                <div className="main">
                    {children}
                </div>
                <div className="mdui-card-actions">
                    {/** TODO */}
                </div>
            </div>
        )
    }
}
