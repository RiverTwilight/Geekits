import React from 'react'

import Img2Gif from './img2gif'
import Video2Gif from './video2gif'


function Ui(){
	return(
		<React.Fragment>		    
		    <div className="mdui-tab" mdui-tab="true">
                <a href="#img" className="mdui-ripple">图片合成</a>
                <a href="#video" className="mdui-ripple">视频转GIF</a>
            </div>
            <div id="img"><Img2Gif /></div>
            <div id="video"><Video2Gif /></div>
        </React.Fragment>
	)

}
export default Ui