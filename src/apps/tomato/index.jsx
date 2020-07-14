import React from 'react'
import './style.css'
import mdui from 'mdui'

function d2a(n) {
    return n * Math.PI / 180;
}

const Saying = () => {

}

const Tomato = ({ r = 20, ang1 = 20, ang2 = 360 }) => (
    <svg style={{
        margin: '0 auto'
    }} width="300" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d={
            `M50 50 
                 L${50 + Math.sin(d2a(ang1)) * r} ${50 - Math.cos(d2a(ang1)) * r}
                 A${r} ${r} 0 ${ang2 - ang1 >= 180 ? 1 : 0} 1 ${50 + Math.sin(d2a(ang2)) * r} ${50 - Math.cos(d2a(ang2)) * r} Z`
        } stroke="#7a7a7a" fill="red" stroke-width="1"></path>
        <path d={
            `M50 ${50 - r} 
                 L50 ${50 + r}
                 Z`
        } stroke="#7a7a7a" stroke-width="0.5"></path>
        <path d={
            `M${50 - r} 50
                 L${50 + r} 50
                 Z`
        } stroke="#7a7a7a" stroke-width="0.5"></path>
    </svg>
)

export default class extends React.Component {
    constructor() {
        super();
        const now = new Date()
        this.state = {
            min: 25,
            sec: 0,
            state: 'pause',
            originTitle: document.title
        }
    }
    startATomato() {
        const cb = () => {
            const { min, sec } = this.state;
            const newTime = {
                sec: (sec - 1 <= 0) ? 59 : (sec - 1),
                min: (sec - 1 <= 0) ? min - 1 : min
            }
            this.setState(newTime, () => {
                document.title = `${min}:${sec} | ${this.state.originTitle}`
            })
        }
        this.setState({
            state: 'playing'
        })
        window.tomato = setInterval(cb, 1000)
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
        const { min, sec, state } = this.state
        return (
            <>
                    <div className="mdui-valign mdui-center">
                        <Tomato ang1={(1501 - min * 60 - sec) / 3600 * 360} />
                    </div>
                    <div className="score mdui-center mdui-valign">
                        {min}
                        <small>{sec < 10 ? `0${sec}` : sec}</small>
                    </div>
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
            </>
        )
    }
}