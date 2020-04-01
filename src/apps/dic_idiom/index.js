import React from 'react'
import Template from '../../utils/AskForTemplate.jsx'

const Result = ({data}) =>{
    if(!data)return null
    if(!data.length)return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return(
        <>   
            {data.map(item=>(
            <div key={item.ci} className="mdui-card">
                <div className="mdui-card-primary">
                    <div className="mdui-card-primary-title">{item.word}</div>
                    <div className="mdui-card-primary-subtitle">{item.pinyin}</div>
                </div>
                <div className="mdui-card-content mdui-typo">
                    <h4>语出</h4>
                        <p dangerouslySetInnerHTML={{__html: item.derivation.replace(/\n/g, '<br>')}}></p>
                    <h4>用例</h4>
                        <p dangerouslySetInnerHTML={{__html: item.example.replace(/\n/g, '<br>')}}></p>
                    <h4>解释</h4>
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
                api="/api/dic_idiom?word="
                inputOpt={{
                    header:'从30849条成语中查询',
                    icon:'search'
                }}
            />
        )
    }
}

export default Ui