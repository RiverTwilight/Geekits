import React from 'react';
import { JQ } from 'mdui'

export default class extends React.Component<Readonly<{
    ifShow: boolean;
    title: string;
    onClose(): void;
    children: any
}>, {}>{
    render() {
        const { ifShow, title, onClose, children } = this.props;
        if (ifShow) {
            JQ.showOverlay(1001);//刚好超过头部
        } else {
            JQ.hideOverlay();
        }
        //用return null会每次重载图片
        return (
            <div style={{ height: ifShow ? '90%' : '0' }} className=" bottom-alert bottom-dashboard mdui-card">
                <div className="mdui-card-media">
                    <div className="mdui-card-menu">
                        <button
                            onClick={() => {
                                onClose()
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
                    <div className="bottom-alert-mask-brace"></div>
                </div>
                <div className="bottom-alert-mask"></div>
                <div className="mdui-card-actions">
                    {/** TODO */}
                </div>
            </div>
        )
    }
}
