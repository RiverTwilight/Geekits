import React from 'react'
// @ts-expect-error ts-migrate(6142) FIXME: Module './image' was resolved to '/mnt/h/Bob/Web/P... Remove this comment to see the full error message
import Image from './image'
// @ts-expect-error ts-migrate(6142) FIXME: Module './caption' was resolved to '/mnt/h/Bob/Web... Remove this comment to see the full error message
import Caption from './caption'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { Tab } from 'mdui-in-react'

// @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
export default (_: any) => <Tab
    tabs={[
        {
            text: '图片拼接',
            id: 'imagex',
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            component: <Image />
        }, {
            text: '字幕拼接',
            id: 'caption',
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            component: <Caption />
        }
    ]}
/>;
