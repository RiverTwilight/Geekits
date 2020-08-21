import React from 'react'
import Image from './image'
import Caption from './caption'
import { Tab } from 'mdui-in-react'

export default _ => (
    <Tab
        tabs={[
            {
                text: '图片拼接',
                id: 'imagex',
                component: <Image />
            }, {
                text: '字幕拼接',
                id: 'caption',
                component: <Caption />
            }
        ]}
    />
)
