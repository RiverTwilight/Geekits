import React from 'react';
import mdui from 'mdui'
import PropTypes from 'prop-types'

class NewPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    } 
    render(){
    	const { ifShow, title, onClose, children } = this.props
    	//用return null会每次重载图片
        return (
            <span style={{display:(!ifShow)?'none':'block'}}>
                <header className="mdui-shadow-0 header mdui-appbar mdui-appbar-fixed">
                    <div className="mdui-shadow-0 mdui-appbar">
                        <div className="mdui-shadow-0 mdui-toolbar mdui-color-theme">
                            <button 
	                            onClick={()=>{
	                            	onClose()
	                            }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">close</i>
                            </button>
                            <div className="mdui-typo-title mdui-text-color-white">
                                {title}                               
                            </div>
                            <div className="mdui-toolbar-spacer"></div>
                        </div>
                    </div>        
                </header>
                {this.props.children}
            </span>
        )
    }  
}

export default NewPage