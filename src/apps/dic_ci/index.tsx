import React from 'react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.tsx' extension.... Remove this comment to see the full error message
import Template from '../../layout/EnquireTemplate.tsx'

const Result = ({
    data
}: any) => {
    if (!data) return null
    
    if (!data.length) return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    
    return <>
        
        {data.map((item: any) => <div key={item.ci} className="mdui-card mdui-p-a-1 appinfo">
            
            <div className="mdui-card-primary">
                
                <div className="mdui-card-primary-title">{item.ci}</div>
            </div>
            
            <div className="mdui-card-content mdui-typo">
                
                <p dangerouslySetInnerHTML={{ __html: item.explanation.replace(/\n/g, '<br>') }}></p>
            </div>
        </div>)}
    </>;
}

export default () => (
    
    <Template
        Result={Result}
        api="https://api.ygktool.cn/api/dic_ci?ci="
        inputOpt={{
            header: '从262274个词语中查询',
            icon: 'search'
        }}
    />
)
