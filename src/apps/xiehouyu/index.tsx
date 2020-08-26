import React from 'react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from '../../utils/AskForTemplate.tsx'

const Result = ({
    data
}: any) => {
    if (!data) return null
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    if (!data.length) return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-row-sm-2">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {data.map((item: any) => <div key={item.anwser} className="mdui-col mdui-typo">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <blockquote>
                    {item.riddle}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <footer>{item.answer}</footer>
                </blockquote>
            </div>)}
        </div>
    );
}

export default () => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Template
        Result={Result}
        api="/api/xiehouyu?text="
        inputOpt={{
            header: '从14032条歇后语中查询谜面/谜底',
            icon: 'search'
        }}
    />
)
