import React from 'react';
import Input from '../../utils/Component/Input.tsx'
import { prompt as Prompt } from 'mdui';

//输入框&清空按钮
const InputFiled = ({ onItemChange, items }) => {
    return (
        <>
            <button
                className="mdui-float-right mdui-btn mdui-btn-icon"
                onClick={() => {
                    onItemChange('')
                }}
                mdui-tooltip="{content: '清空'}"
            >
                <i className="mdui-icon material-icons">close</i>
            </button>
            <div className="mdui-clearfix"></div>
            <Input
                onValueChange={newText => {
                    onItemChange(newText)
                }}
                rows="4"
                value={items}
                helper="输入待选物品，空格间隔"
            />
        </>
    )
}

//读取本地列表
const ReadLocal = ({ local, edit, onClickLi }) => {
    return local.map((cache, i) => (
        <li
            onClick={() => {
                onClickLi(i)
            }}
            key={i}
            className="mdui-col mdui-list-item mdui-ripple"
        >
            <div className="mdui-list-item-content">
                <span className="mdui-text-color-theme">{cache}</span>
            </div>
            <i onClick={() => {
                edit(i)
            }}
                className="mdui-list-item-icon mdui-icon material-icons">edit</i>
        </li>
    ))
}

//添加组合组件
const AddLocal = ({ onLocalChange }) => {
    return (
        <li onClick={() => {
            if (!localStorage.getItem('decision')) {
                localStorage.setItem('decision', JSON.stringify([]))
            }
            const cache = JSON.parse(localStorage.decision);
            Prompt('使用空格分隔',
                value => {
                    cache.push(value);
                    localStorage.setItem('decision', JSON.stringify(cache));
                    onLocalChange()
                },
                () => {/*取消事件*/ },
                {
                    type: 'textarea',
                    confirmText: '保存',
                    cancelText: '取消'
                }
            )
        }} className="mdui-col mdui-list-item mdui-ripple">
            <div className="mdui-list-item-content">
                <span className="mdui-text-color-theme">新增一个组合</span>
            </div>
            <i className="mdui-list-item-icon mdui-icon material-icons">add</i>
        </li>
    )
}

//开始随机组件
class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statu: props.statu,
            onetime: '点我开始！',
            items: props.items,
            timer: null
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            statu: nextProps.statu,
            items: nextProps.items
        })
    }
    componentDidMount() {
        this.state.timer = setInterval(() => {
            var arr = this.state.items.split(' '); //将待选项目拆分成数组
            var maxNum = arr.length - 1; //设定随机数最大值
            var index = parseInt(Math.random() * (maxNum - 0 + 1) + 0, 10); //随机选取0到最大值之间的整数
            var onetime = arr[index];
            if (this.state.statu == 'start') {
                this.setState({
                    onetime: onetime
                })
            }
        }, 100)
    }
    render() {
        return (
            <div className="mdui-text-center">
                <h1>{this.state.onetime}</h1>
            </div>
        )
    }
}

export default class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            local: JSON.parse(localStorage.getItem('decision')) || [],
            statu: 'stop',
            items: '糖醋排骨 红烧肉 酸菜鱼 坤徐菜 酸豇豆 炸鸡 烧仙草 汉堡 薯条 可乐 牛肉面 作者'
        }
    }
    componentDidMount() {
        window.location.hash && this.setState({
            items: decodeURI(window.location.hash.substring(1))
        })
    }
    render() {
        const { statu, local, items } = this.state
        return (
            <>
                <div
                    className="mdui-card mdui-p-a-1">
                    <InputFiled
                        items={items}
                        onItemChange={newItems => {
                            this.setState({ items: newItems })
                        }}
                    />
                    <ul className="mdui-list mdui-row-md-2">
                        <ReadLocal
                            local={local}
                            onClickLi={key => {
                                this.setState({ items: local[key] })
                            }}
                            edit={key => {
                                Prompt('使用空格分隔',
                                    value => {
                                        var local = this.state.local;
                                        local.splice(key, 1, value);
                                        localStorage.setItem('decision', JSON.stringify(local))
                                    },
                                    () => {
                                        //删除组合
                                        var local = this.state.local
                                        local.splice(key, 1);
                                        localStorage.setItem('decision', JSON.stringify(local))
                                    }, {
                                    type: 'textarea',
                                    defaultValue: local[key],
                                    confirmText: '保存',
                                    cancelText: '删除'
                                }
                                )
                            }}
                        />
                        <AddLocal
                            onLocalChange={() => {
                                this.setState({ local: localStorage.item })
                            }}
                        />
                    </ul>
                </div>
                <br></br>
                <div
                    className="mdui-ripple mdui-card mdui-p-a-1"
                    onClick={() => {
                        window.history.pushState(null, null, `#${encodeURI(items)}`)
                        this.setState({ statu: 'start' })
                        setTimeout(() => this.setState({ statu: 'stop' }), 3000)
                    }}
                >
                    <Start
                        statu={statu}
                        items={items}
                    />
                </div>
            </>
        )
    }
}
