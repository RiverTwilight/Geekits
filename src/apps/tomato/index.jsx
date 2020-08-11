import React from 'react'
import mdui from 'mdui'
import BottomAlert from '../../components/BottomAlert'
import Input from '../../components/Input'
import './style.css'

function d2a(n) {
    return n * Math.PI / 180;
}

const sayings = [
    {
        content: '自律是一种秩序，一种对快乐和欲望的控制。',
        author: '柏拉图'
    }, {
        content: '时刻提醒自己，要自律，要保持份内在的从容与安静。',
        author: '网络'
    }, {
        content: '越自律，越自由。',
        author: '网络'
    }
]

const Saying = ({ index }) => {
    const saying = sayings[index]
    return (
        <div className="mdui-typo">
            <blockquote>
                {saying.content}
                <footer>{saying.author}</footer>
            </blockquote>
        </div>
    )
}

const Record = ({ closeBottomAlert }) => {
    !localStorage.tomato && localStorage.setItem('tomato', '[]')
    const historyData = JSON.parse(localStorage.tomato)
    const now = new Date()
    return (
        <>
            <div className="mdui-progress">
                <div className="mdui-progress-determinate" style={{
                    width: `${(historyData.length / 4 > 1 ? historyData.length / 4 - 1 : historyData.length / 4) * 100}%`
                }}></div>
            </div>
            <div className="mdui-p-a-2 mdui-typo">
                <b>今日：</b>{historyData.filter(item => item.metaDate === now.toLocaleDateString()).length}
                <br></br>
                <b>总计：</b>{historyData.length}
                <p className="mdui-text-color-black-secondary">
                    每个番茄完成后，你可以休息5分钟。每四个番茄完成后，你可以休息地更久一点。
                </p>
            </div>
            <div className="mdui-divider"></div>
            <ul className="mdui-list">
                {historyData.map((item, i) => (
                    <li key={i} className="mdui-list-item mdui-ripple">
                        <i className="mdui-icon mdui-text-color-red material-icons">access_alarms</i>
                        <div className="mdui-list-item-content">
                            <div className="mdui-list-item-title">{item.name}</div>
                            <div className="mdui-list-item-text">{item.date}</div>
                        </div>
                    </li>
                ))}
                <button
                    onClick={() => {
                        mdui.JQ.hideOverlay();
                        closeBottomAlert && closeBottomAlert()
                        mdui.confirm('此操作不可逆！', '清除历史记录', () => {
                            localStorage.setItem('tomato', '[]');
                        }, () => { }, {
                            confirmText: '确定',
                            cancelText: '我手残了',
                            history: false,
                        });
                    }}
                    className="mdui-btn mdui-btn-block mdui-ripple">清空记录</button>
            </ul>
        </>
    )
}

const Tomato = ({ r = 20, ang1 = 20, ang2 = 360 }) => (
    <svg style={{
        margin: '0 auto'
    }} width="300" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="15 15 70 70">
        <circle cx="50" cy="50" r="20" stroke="#4caf50"
            stroke-width="0.5" fill="transparent" />
        <path d={
            `M50 50 
                 L${50 + Math.sin(d2a(ang1)) * r} ${50 - Math.cos(d2a(ang1)) * r}
                 A${r} ${r} 0 ${ang2 - ang1 >= 180 ? 1 : 0} 1 ${50 + Math.sin(d2a(ang2)) * r} ${50 - Math.cos(d2a(ang2)) * r} Z`
        } stroke="red" fill="transparent" stroke-width="1"></path>
    </svg>
)

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            min: 25,
            sec: 0,
            state: 'pause',
            originTitle: document.title,
            showHistory: false,
            title: '',
            sayingIndex: parseInt(Math.random() * (sayings.length - 1 - 0 + 1) + 0, 10)
        }
    }
    startATomato() {
        const cb = () => {
            const { min, sec, title, originTitle } = this.state;
            if (!min && !sec) {
                clearInterval(window.tomato);
                this.playRingtone();
                mdui.snackbar({
                    message: '你完成了一个番茄，现在休息五分钟吧！'
                })
                const originData = JSON.parse(localStorage.tomato)
                    , now = new Date();
                originData.push({
                    metaDate: now.toLocaleDateString(),
                    date: now.toLocaleString(),
                    name: title === "" ? "未命名" : title
                })
                localStorage.setItem('tomato', JSON.stringify(originData));
                this.setState({
                    state: 'pause',
                    min: 25,
                    sec: 0
                })
                document.title = originTitle
            } else {
                const newTime = {
                    sec: (sec - 1 < 0) ? 59 : (sec - 1),
                    min: (sec - 1 < 0) ? min - 1 : min
                }
                document.title = `${newTime.min}:${newTime.sec < 10 ? `0${newTime.sec}` : newTime.sec} | ${this.state.originTitle}`
                this.setState(newTime)
            }
        }
        this.setState({
            state: 'playing'
        })
        window.tomato = setInterval(cb, 1000)
    }
    playRingtone() {
        var sound = new Audio('http://s.aigei.com/pvaud_mp3/aud/mp3/59/593fcac86e7944c8b53869dee85ab959.mp3?download/04_%E7%88%B1%E7%BB%99%E7%BD%91_aigei_com.mp3&e=1594766640&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:r56zc5YReNaKgqJzler4JGSdg1c=');
        if (!sound.paused) sound.pause();
        sound.currentTime = 0;
        sound.play();

    }
    endATomato() {
        // 含文本、标题和确认按钮回调
        mdui.confirm('此次专注将无法保存', '确定要放弃这1/4个番茄吗？', () => {
            this.setState({
                state: 'pause',
                min: 25,
                sec: 0
            })
            clearInterval(window.tomato)
        }, () => { }, {
            confirmText: '确定',
            cancelText: '不，自律使我自由！',
            history: false
        });
    }
    render() {
        const { min, sec, state, showHistory, title, sayingIndex } = this.state
        return (
            <>
                <div className="mdui-center">
                    <Input
                        value={title}
                        placeholder="给这颗番茄起个名字吧"
                        onValueChange={newText => {
                            this.setState({
                                title: newText
                            })
                        }}
                    />
                    <div className="mdui-valign">
                        <Tomato ang1={(1501 - min * 60 - sec) / 1500 * 360} />
                    </div>
                    <div className="score">
                        {min}
                        <small>{sec < 10 ? `0${sec}` : sec}</small>
                    </div>
                </div>
                <button onClick={() => { this.setState({ showHistory: !showHistory }) }}
                    className="mdui-btn mdui-btn-icon">
                    <i className="mdui-icon material-icons">&#xe192;</i>
                </button>
                <Saying index={sayingIndex} />
                <button
                    onClick={() => {
                        if (state === 'playing') {
                            this.endATomato()
                        } else {
                            this.startATomato()
                        }
                    }}
                    className="mdui-color-theme mdui-fab mdui-fab-fixed"
                >
                    <i className="mdui-icon material-icons">{state === 'playing' ? 'close' : 'play_arrow'}</i>
                </button>
                <br></br>
                <BottomAlert
                    title="记录"
                    onClose={() => {
                        this.setState({
                            showHistory: false
                        })
                    }}
                    ifShow={showHistory}
                >
                    <Record closeBottomAlert={() => {
                        this.setState({ showHistory: false })
                    }} />
                </BottomAlert>
            </>
        )
    }
}