import React from 'react'
import Template from '../../utils/AskForTemplate.jsx'

const Result = ({data}) =>{
    if(!data)return null
    if(!data.length)return <p className="mdui-text-center">暂未收录，建议谷歌一下</p>
    return(
        <div className="mdui-row-sm-2">
            {data.map(item=>(
            <div key={item.anwser} className="mdui-col mdui-typo">
                <blockquote>
                    {item.riddle}
                    <footer>{item.answer}</footer>
                </blockquote>
            </div>
            ))}
        </div>
    )
}

class Ui extends React.Component {
    render(){
        return(
            <Template
                Result={Result}
                api="https://api.ygktool.cn/api/xiehouyu?text="
                inputOpt={{
                    header:'从14032条歇后语中查询谜面/谜底',
                    icon:'search'
                }}
            />
        )
    }
}

export default Ui