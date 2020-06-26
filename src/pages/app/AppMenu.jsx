import React from 'react'
import { snackbar, prompt, alert as mduiAlert } from 'mdui'
import BottomAlert from '../../components/BottomAlert';
import fiv from '../../utils/fiv.ts'

/**
 * 工具菜单
 */

const ShareBtn = () => {
    if (navigator.share) {
        return (
            <button
                onClick={() => {
                    navigator.share({
                        title: window.location.title,
                        url: window.location.href
                    }).then(() => {
                        snackbar({ message: '感谢分享^_^' })
                    })
                }}
                mdui-tooltip="{content: '分享'}"
                className="mdui-btn mdui-btn-icon mdui-ripple">
                <i className="mdui-text-color-theme mdui-icon material-icons">share</i>
            </button>
        )
    }
    return null
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fived: fiv.get(this.props.appinfo.link),
            showHelper: false
        }
    }
    fiv() {
        const { link, name } = this.props.appinfo;
        if (!fiv.get(link)) {
            fiv.add({
                link: link,
                name: name
            })
            this.setState({ fived: true })
        } else {
            fiv.delete({
                link: link,
                name: name
            });
            this.setState({ fived: false })
        }
    }
    componentDidMount() {
        (this.props.appinfo.network && !navigator.onLine) && mduiAlert('此工具需要联网才能使用', '', () => { }, { history: false })
        window.globalRef.menuBtn.style.display = 'block'
        window.menu = () => {
            this.setState({
                showHelper: true
            })
        }
        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.keyCode === 65) {
                e.preventDefault()
                this.fiv()
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', () => { })
        window.globalRef.menuBtn.style.display = 'none'
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.appinfo) this.setState({ fived: fiv.get(nextProps.appinfo.link) })
    }
    render() {
        const { fived, showHelper } = this.state;
        if (!this.props.appinfo) return null
        const { help, link } = this.props.appinfo;
        return (
            <BottomAlert
                title="菜单"
                ifShow={window.innerWidth <= 640 ? showHelper : true}
                height=""
                onClose={() => {
                    this.setState({ showHelper: false })
                }}
            >
                <ul className="mdui-list">
                    {help !== "" ?
                        help.split('##').map((line, i) => (<li key={i} className="mdui-list-item">{line}</li>))
                        :
                        <li className="mdui-list-item">暂无说明</li>
                    }
                </ul>
                <div className="mdui-card-actions">
                    <button
                        onClick={() => {
                            this.fiv()
                        }}
                        mdui-tooltip={fived ? "{content: '取消收藏'}" : "{content: '收藏'}"}
                        className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">
                            {fived ? 'star' : 'star_border'}
                        </i>
                    </button>
                    <ShareBtn />
                    <button
                        onClick={() => {
                            this.setState({ showHelper: false }, () => {
                                prompt('将以下嵌入代码粘贴到您的网页即可使用。欲获取应用源代码，请加群联系开发者',
                                    () => {
                                        window.open('https://jq.qq.com/?_wv=1027&k=59hWPFs')
                                    },
                                    () => { },
                                    {
                                        history: false,
                                        type: 'textarea',
                                        confirmText: '加群',
                                        cancelText: '关闭',
                                        defaultValue: `<iframe src="https://www.ygktool.cn/app/${link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`
                                    }
                                )
                            })
                        }}
                        mdui-tooltip="{content: '获取代码'}" className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">code</i>
                    </button>
                    <a
                        href="https://jq.qq.com/?_wv=1027&amp;k=59hWPFs" target="_blank"
                        mdui-tooltip="{content: '获取帮助'}" className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">help</i>
                    </a>
                </div>
            </BottomAlert>
        )
    }
}
