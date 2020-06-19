import * as React from 'react'
import ListControlMenu from '../../components/ListControlMenu'
import ListControlCheck from '../../components/ListControlCheck'

interface ISetting {
    homeShowNewestTool: boolean,
    hideHelper: boolean,
    hitokotoTopic: number,
    theme: number
}

declare global {
    interface Window {
        webchatMethods:any;
    }
}

function setFunc<T extends keyof ISetting>(name?: T, value?: any): ISetting {
    var originSetting: ISetting = JSON.parse(localStorage.getItem('setting') || '{}');
    if (!name || !value && value !== 0) return originSetting
    originSetting[name] = value;
    localStorage.setItem('setting', JSON.stringify(originSetting))
    return originSetting
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
}, {
    name: '原创',
    value: 'e'
}, {
    name: '网络',
    value: 'f'
}, {
    name: '其他',
    value: 'g'
}]

const parseHitokoto = (value: string): string => {
    for (let i in hitokotoItems) {
        if (hitokotoItems[i].value === value) return i
    }
    return ''
}


export default class extends React.Component<{}, { setting: ISetting }> {
    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            setting: setFunc()
        }
    }
    render() {
        const { homeShowNewestTool, hideHelper, hitokotoTopic, theme } = this.state.setting
        //window.titleRef.innerText = '设置'
        return (
            <div className="mdui-col-md-10">
                <ul className="mdui-list">
                    <li className="mdui-subheader">通用</li>
                    <ListControlCheck
                        icon="apps"
                        title="首页展示最新工具"
                        checked={homeShowNewestTool || true}
                        onCheckedChange={checked => {
                            this.setState({ setting: setFunc('homeShowNewestTool', checked) })
                        }}
                    />
                    <ListControlCheck
                        icon="help"
                        title="隐藏使用说明"
                        checked={hideHelper || false}
                        onCheckedChange={checked => {
                            this.setState({ setting: setFunc('hideHelper', checked) })
                        }}
                    />
                    <li className="mdui-subheader">个性化</li>
                    <ListControlMenu
                        icon="stars"
                        title="一言来源"
                        checked={hitokotoTopic || 0}
                        onCheckedChange={checked => {
                            this.setState({ setting: setFunc('hitokotoTopic', checked) })
                        }}
                        items={hitokotoItems}
                    />
                    <ListControlMenu
                        title="主题"
                        checked={theme || 0}
                        onCheckedChange={checked => {
                            this.setState({ setting: setFunc('theme', checked) })
                        }}
                        items={[{
                            name: '跟随系统',
                            value: 'auto'
                        }, {
                            name: '浅色模式',
                            value: 'light'
                        }, {
                            name: '深色模式',
                            value: 'dark'
                        }]}
                    />
                </ul>
            </div>
        )
    }
}
