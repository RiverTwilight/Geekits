import React from 'react'

import Image from './image'
import Caption from './caption'

const Ui = props => {
	return(
		<React.Fragment>		    
		    <div className="mdui-tab" mdui-tab="true">
                <a href="#image" className="mdui-ripple">图片拼接</a>
                <a href="#caption" className="mdui-ripple">字幕拼接</a>
            </div>
            <div id="image"><Image /></div>
            <div id="caption"><Caption /></div>
        </React.Fragment>
	)
}

export default ()=><Ui />;