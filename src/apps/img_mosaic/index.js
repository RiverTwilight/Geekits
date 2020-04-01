import React from 'react'

import Image from './image'
import Caption from './caption'

const Ui = _ => {
	return(
		<>		    
		    <div className="mdui-tab" mdui-tab="true">
                <a href="#imagex" className="mdui-ripple">图片拼接</a>
                <a href="#caption" className="mdui-ripple">字幕拼接</a>
            </div>
            <div id="imagex"><Image /></div>
            <div id="caption"><Caption /></div>
        </>
	)
}

export default Ui