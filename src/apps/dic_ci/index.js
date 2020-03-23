import React from 'react'
import Template from '../../utils/AskForTemplate.jsx'

const Result = ({data}) =>{
    if(!data)return null
    if(!data.length)return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return(
        <>   
            {data.map(item=>(
            <div key={item.ci} className="mdui-card mdui-p-a-1 appinfo">
                <div className="mdui-card-primary">
                    <div className="mdui-card-primary-title">{item.ci}</div>
                </div>
                <div className="mdui-card-content mdui-typo">            
                    <p dangerouslySetInnerHTML={{__html: item.explanation.replace(/\n/g, '<br>')}}></p>
                </div>
            </div>
            ))}
        </>
    )
}

class Ui extends React.Component {
    render(){
        return(
            <Template
                Result={Result}
                api="https://api.ygktool.cn/api/dic_ci?ci="
                inputOpt={{
                    header:'从262274个词语中查询',
                    icon:'search'
                }}
            />
        )
    }
}

export default Ui