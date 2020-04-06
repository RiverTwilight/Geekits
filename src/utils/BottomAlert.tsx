import React from 'react';
import { JQ } from 'mdui'

export default class BottomAlert extends React.Component<{
    ifShow: boolean;
    title: string;
    onClose(): void;
    children: any
},{}>{
    constructor(props: Readonly<{ ifShow: boolean; title: string; onClose(): void; children: any; }>) {
        super(props);
        this.state = {
        }
    } 
    render(){
        const { ifShow, title, onClose, children } = this.props;
        if(ifShow){
            JQ.showOverlay(1001);//刚好超过头部
        }else{
            JQ.hideOverlay();
        }
    	//用return null会每次重载图片
        return (
            <div style={{height:(ifShow)?'450px':'0'}} className=" bottom-alert bottom-dashboard mdui-card">
                <div className="mdui-card-media">
                    <div className="mdui-card-menu">
                        <button 
                            onClick={()=>{
                                onClose()
                            }}
                            className="mdui-btn mdui-btn-icon">
                            <i className="mdui-icon material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div className="mdui-card-primary">
                    <div className="mdui-card-primary-title">{title}</div>
                </div>
                <div className="main">{this.props.children}</div>
                <div className="mdui-card-actions">            
                </div>             
            </div>
        )
    }  
}
