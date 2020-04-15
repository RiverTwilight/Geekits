import React from 'react'
import ListControlMenu from '../../utils/Component/ListControlMenu'
import ListControlCheck from '../../utils/Component/ListControlCheck'

const setFunc = {
    homeShowNewestTool: checked => {
        localStorage.setItem('homeShowNewestTool', String(checked))
    },
    hideHelper: checked => {
        localStorage.setItem('hideHelper', String(checked))
        if (!checked) localStorage.removeItem('hideHelper')
    },
    hitokotoTopic: checked => {
        localStorage.setItem('hitokotoTopic', hitokotoItems[checked].value)
    }
}

const hitokotoItems = [{
    name: '随机',
    value: ''
}, {
    name: '动漫',
    value: 'a'
}, {
    name: '漫画',
    value: 'b'
}, {
    name: '游戏',
    value: 'c'
}, {
    name: '小说',
    value: 'd'
},{
    name: '原创',
    value: 'e'
},{
    name: '网络',
    value: 'f'
},{
    name: '其他',
    value: 'g'
}]

const parseHitokoto = value => {
    for(let i in hitokotoItems) {
        if (hitokotoItems[i].value === value)return i
    }
}

export default class Ui extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            homeShowNewestTool:localStorage.homeShowNewestTool || 'true',
            hideHelper:localStorage.hideHelper || 'false',
            hitokotoTopic:parseHitokoto(localStorage.hitokotoTopic) || 0
        }
    }
    render(){
        const { homeShowNewestTool, hideHelper, hitokotoTopic } = this.state
        window.titleRef.innerText = '设置'
        return(
            <div className="mdui-col-md-10">
                <ul className="mdui-list">
                    <li className="mdui-subheader">通用</li>
                    <ListControlCheck
                        icon="apps"
                        title="首页展示最新工具"
                        checked={homeShowNewestTool === 'true'}
                        onCheckedChange={checked=>{
                            this.setState({homeShowNewestTool:String(checked)})
                            setFunc.homeShowNewestTool(checked)
                        }}
                    />
                    <ListControlCheck
                        icon="help"
                        title="隐藏使用说明"
                        checked={hideHelper === 'true'}
                        onCheckedChange={checked=>{
                            this.setState({hideHelper:String(checked)})
                            setFunc.hideHelper(checked)
                        }}
                    />
                    <li className="mdui-subheader">个性化</li>
                    <ListControlMenu
                        icon="stars"
                        title="一言来源"
                        checked={hitokotoTopic}
                        onCheckedChange={checked=>{
                            this.setState({hitokotoTopic:checked})
                            setFunc.hitokotoTopic(checked)
                        }}
                        items={hitokotoItems}
                    />
                </ul>
            </div>
        )
    }
}
