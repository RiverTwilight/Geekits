import React from 'react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from '../../utils/AskForTemplate.tsx'

const Result = ({
    data
}: any) => {
    if (!data) return null
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (!data.length) return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {data.map((item: any) => <div key={item.ci} className="mdui-card mdui-p-a-1 appinfo">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-card-primary">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-card-primary-title">{item.ci}</div>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-card-content mdui-typo">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p dangerouslySetInnerHTML={{ __html: item.explanation.replace(/\n/g, '<br>') }}></p>
            </div>
        </div>)}
    </>;
}

export default () => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Template
        Result={Result}
        api="https://api.ygktool.cn/api/dic_ci?ci="
        inputOpt={{
            header: '从262274个词语中查询',
            icon: 'search'
        }}
    />
)
