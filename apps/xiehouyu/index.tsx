import React from 'react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from '../../components/EnquireTemplate.tsx'

const Result = ({
    data
}: any) => {
    if (!data) return null
    
    if (!data.length) return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return (
        
        <div className="mdui-row-sm-2">
            
            {data.map((item: any) => <div key={item.anwser} className="mdui-col mdui-typo">
                
                <blockquote>
                    {item.riddle}
                    
                    <footer>{item.answer}</footer>
                </blockquote>
            </div>)}
        </div>
    );
}

export default () => (
    
    <Template
        Result={Result}
        api="/api/xiehouyu?text="
        inputOpt={{
            header: '从14032条歇后语中查询谜面/谜底',
            icon: 'search'
        }}
    />
)
