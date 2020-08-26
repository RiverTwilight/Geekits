import React from 'react'
import Image from './image'
import Caption from './caption'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { Tab } from 'mdui-in-react'

export default (_: any) => <Tab
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
/>;
