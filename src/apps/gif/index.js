import React from 'react'
import Img2Gif from './img2gif'
import Video2Gif from './video2gif'
import Tab from '../../components/Tab'

export default () => (
    <Tab
        tabs={[
            {
                text: '图片转GIF',
                id: 'image2gif',
                component: <Img2Gif />
            }, {
                text: '视频转GIF',
                id: 'video2gif',
                component: <Video2Gif />
            }
        ]}
    />
)

