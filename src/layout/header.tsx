import React from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'confirm'.
import { confirm, snackbar } from 'mdui'
// @ts-expect-error ts-migrate(6142) FIXME: Module './drawer' was resolved to '/mnt/h/Bob/Web/... Remove this comment to see the full error message
import Drawer from './drawer'

//将一言添加到便签
const addSaying2Fiv = (saying: any) => {
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
        notes.map((note: any) => {
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

type State = any;

export default class extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
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
        fetch(`https://api.ygktool.cn/api/hitokoto?topic=${'abcdefg'[hitokotoTopic]}`, {
            cache: 'no-store'
        })
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getRef' does not exist on type 'Readonly... Remove this comment to see the full error message
        this.props.getRef([
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerTitle' does not exist on type 'def... Remove this comment to see the full error message
            { name: 'title', ref: this.headerTitle },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuBtn' does not exist on type 'default... Remove this comment to see the full error message
            { name: 'menuBtn', ref: this.menuBtn }
        ]);// 将ref传给父组件   
    }
    render() {
        const { saying } = this.state
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Drawer />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <header
                    className={`mdui-shadow-0 mdui-appbar mdui-appbar-fixed`}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-appbar mdui-shadow-0">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-toolbar mdui-color-white">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'leftDrawer' does not exist on type 'Wind... Remove this comment to see the full error message
                                onClick={() => window.leftDrawer.toggle()}
                                className="mdui-btn mdui-btn-icon mdui-text-color-theme">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">menu</i>
                            </button>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <div
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'headerTitle' does not exist on type 'def... Remove this comment to see the full error message
                                    ref={r => this.headerTitle = r}
                                    className="mdui-typo-title header-width-saying"
                                >
                                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message */}
                                    {this.props.title || '云极客工具'}
                                </div>
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <span className="mdui-typo-caption-opacity mdui-text-truncate saying">{saying.say}</span>
                            </a>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-toolbar-spacer"></div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                style={{ display: 'none' }}
                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'menuBtn' does not exist on type 'default... Remove this comment to see the full error message
                                ref={r => this.menuBtn = r}
                                onClick={() => {
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'menu' does not exist on type 'Window & t... Remove this comment to see the full error message
                                    window.menu && window.menu()
                                }}
                                className="mdui-hidden-sm-up mdui-btn mdui-btn-icon mdui-text-color-theme">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">more_vert</i>
                            </button>
                        </div>
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-divider"></div>
                </header>
            </>
        )
    }
}
