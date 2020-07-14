import React from 'react'
import { confirm, snackbar } from 'mdui'
import Drawer from './drawer'

//将一言添加到便签
const addSaying2Fiv = saying => {
    var content = `  <br>${saying.say}  ———来自 ${saying.from}`
    var today = new Date()
    var newNote = {
        title: '一言收藏',
        content: content,
        tags: 'a b c',
        date: today.toLocaleString()
    }
    if (localStorage.note) {
        var notes = JSON.parse(localStorage.note);
        var hasNote = false;
        notes.map(note => {
            if (note.title === '一言收藏') hasNote = true
        })
        if (hasNote) {
            for (let i = 0; i <= notes.length; i++) {
                var note = notes[i];
                if (note && note.title === '一言收藏') {
                    note.content += content;
                    note.date = today.toLocaleString()
                }
            }
        } else {
            notes.push(newNote)
        }
    } else {
        notes = [newNote]
    }
    localStorage.setItem('note', JSON.stringify(notes))
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true,
            searchResult: '',
            kwd: '',//用于传给结果组件的百度搜索,
            saying: {
                say: '我一路向北，离开有你的季节',
                from: '《头文字D》'
            }
        }
    }
    loadSaying() {
        const { hitokotoTopic = 0 } = JSON.parse(localStorage.setting || '{}');
        fetch(`https://api.ygktool.cn/api/hitokoto?topic=${'abcdefg'[hitokotoTopic]}`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    saying: {
                        say: json.hitokoto,
                        from: json.from
                    }
                })
            })
    }
    componentDidMount() {
        this.loadSaying()
        this.props.getRef([
            { name: 'title', ref: this.headerTitle },
            { name: 'menuBtn', ref: this.menuBtn }
        ]);//将ref传给父组件   
        window.addEventListener("scroll", () => {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            this.setState({
                isTop: t <= 56
            })
        })
    }
    render() {
        const { saying, isTop } = this.state
        return (
            <>
                <Drawer />
                <header
                    className={`mdui-shadow-0 mdui-appbar mdui-appbar-fixed`}>
                    <div className="mdui-appbar mdui-shadow-0">
                        <div className="mdui-toolbar mdui-color-white">
                            <button
                                onClick={() => window.leftDrawer.toggle()}
                                className="mdui-btn mdui-btn-icon mdui-text-color-theme">
                                <i className="mdui-icon material-icons">menu</i>
                            </button>
                            <a
                                onClick={() => {
                                    confirm(
                                        `${saying.say}<br>来自：${saying.from}`,
                                        '一言',
                                        () => {
                                            addSaying2Fiv(saying);
                                            snackbar({
                                                message: '已收藏至便签',
                                                buttonText: '打开便签',
                                                onButtonClick: () => {
                                                    window.location.href = "/app/note"
                                                }
                                            })
                                        },
                                        () => {
                                            this.loadSaying()
                                        }, {
                                        history: false,
                                        confirmText: '收藏',
                                        cancelText: '刷新'
                                    }
                                    )
                                }}
                            >
                                <div
                                    ref={r => this.headerTitle = r}
                                    className="mdui-typo-title header-width-saying"
                                >
                                    {this.props.title || '云极客工具'}
                                </div>
                                <span className="mdui-typo-caption-opacity mdui-text-truncate saying">{saying.say}</span>
                            </a>
                            <div className="mdui-toolbar-spacer"></div>
                            <button
                                style={{ display: 'none' }}
                                ref={r => this.menuBtn = r}
                                onClick={() => {
                                    window.menu && window.menu()
                                }}
                                className="mdui-hidden-sm-up mdui-btn mdui-btn-icon mdui-text-color-theme">
                                <i className="mdui-icon material-icons">more_vert</i>
                            </button>
                        </div>
                    </div>
                    <div className={`mdui-divider ${isTop ? 'mdui-hidden' : ''} `}></div>
                </header>
            </>
        )
    }
}
