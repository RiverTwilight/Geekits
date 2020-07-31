import React, { useState, useRef } from 'react'
import { Link, useHistory } from "react-router-dom"
import { alert as mduiAlert } from 'mdui'
import pinyin from 'js-pinyin'
import axios from '../../utils/axios'
import applist from '../../utils/applist'
import fiv from '../../utils/fiv'
import useEventListener from '../../utils/Hooks/useEventListener'
import ToTop from '../../components/ToTop'
import { mutation } from 'mdui'

const AppListItem = ({ isActive, channel, icon, icon_color, name, link, description }) => {
    return (
        channel === 5 ?
            <>
                <a className={`${isActive && 'mdui-list-item-active'} mdui-col mdui-list-item mdui-ripple`} target="_blank" rel="no_reffer" href={link}>
                    <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey"}>link</i>
                    <div className="mdui-list-item-content">
                        <div className="mdui-list-item-title">{name}</div>
                    </div>
                </a>
            </>
            :
            <>
                <Link
                    to={'/app/' + link}
                    className={`${isActive && 'mdui-list-item-active'} mdui-col mdui-list-item mdui-ripple`}
                >
                    <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + icon_color}>{icon}</i>
                    <div className="mdui-list-item-content">
                        <div className="mdui-list-item-title">{name}</div>
                        {description && <div className="mdui-list-item-text">{description}</div>}
                    </div>
                </Link>
                <li className="mdui-hidden-md-up mdui-divider-inset mdui-m-y-0"></li>
            </>
    )
}

/**
 * 收藏列表
 * */
const FivList = () => {
    const [edit, setEdit] = useState(false)
    const [list, ,] = useState(fiv.getAll())
    return (
        <ul className="mdui-row-md-3 mdui-list">
            <li className="mdui-subheader">
                收藏&nbsp;
                <a
                    onClick={() => {
                        setEdit(!edit)
                    }}
                    style={{
                        display: list.length > 0 ? 'block' : 'none'
                    }}
                    className="mdui-text-color-theme mdui-float-right">
                    {edit ? '保存' : '编辑'}
                </a>
            </li>
            {!list.length ?
                <div className="mdui-text-center mdui-typo-body-1-opacity">点击工具菜单中的星型按钮或Ctrl + A收藏</div>
                :
                list.map((a, i) => (
                    <Link
                        key={a.link + a.icon} to={edit ? '#' : '/app/' + a.link}
                        disabled={edit} className="mdui-col mdui-list-item mdui-ripple">
                        <i className="mdui-list-item-icon mdui-icon material-icons">star_border</i>
                        <div className="mdui-list-item-content">{a.name}</div>
                        {edit &&
                            <button onClick={() => fiv.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
                                <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                            </button>
                        }
                    </Link>
                ))}
        </ul>
    )
}

/**
 * 公告栏
 **/
class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            id: null,
            content: null
        }
    }
    componentDidMount() {
        this.getNoticeFromSever()
    }
    showNotice() {
        const { date, content, id } = this.state;
        mduiAlert(content, date.split('T')[0] + '公告',
            () => {
                localStorage.setItem('readedNotice', id)
            },
            {
                confirmText: '我知道了',
                history: false,
            })
    }
    getNoticeFromSever() {
        //if(sessionStorage.loadedNotice == 1)return
        axios.get('/ygktool/notice')
            .then(json => {
                const { primary, content, date } = json.data[0]
                this.setState({
                    id: primary,
                    content: content.replace(/\n/g, '<br>'),
                    date: date
                }, () => {
                    //sessionStorage.setItem('loadedNotice', 1)
                    if (!localStorage.readedNotice || localStorage.readedNotice != primary) this.showNotice()
                })
            })
    }
    render() {
        return null
    }
}

/**
 * 搜索结果
 */

const SearchResult = ({ result = [], kwd }) => {
    if (!result.length || kwd === '') return null
    const [activeItem, setActiveItem] = useState(-1);
    let history = useHistory();
    function handleClick(url) {
        history.push(url);
    }
    const handleKeydown = e => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault()
            setActiveItem(e.keyCode === 38 ? (activeItem - 1) : (activeItem + 1))
        } else if (e.keyCode === 13) {
            e.preventDefault();
            handleClick(`/app/${result[activeItem].link}`);
        }
    }
    useEventListener('keydown', handleKeydown.bind(this))
    console.log(activeItem)
    return (
        <ul className="mdui-list">
            {result.map((a, i) => (
                <AppListItem isActive={activeItem === i} key={a.link + a.icon} {...a} />
            ))}
            <p className="mdui-typo mdui-text-center">
                没找到想要的工具?试试<a href={"https://www.baidu.com/s?ie=UTF-8&wd=" + kwd}>百度搜索</a>
            </p>
            <div className="mdui-divider"></div>
        </ul>
    )
}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kwd: '',
            searchResult: []
        }
    }
    handleSearchKeydown(e) {
        if (e.ctrlKey && e.keyCode === 70) {
            e.preventDefault()
            this.searchInput.focus()
        }
    }
    componentDidMount() {
        document.addEventListener('keydown', this.handleSearchKeydown.bind(this))
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleSearchKeydown.bind(this))
    }
    search() {
        pinyin.setOptions({ checkPolyphone: false, charCase: 0 });
        const { kwd } = this.state;
        const res = applist.filter(app => {
            let keyword = kwd.toLowerCase().trim()
            return (pinyin.getFullChars(app.name).toLowerCase().indexOf(keyword) !== -1 || app.name.toLowerCase().indexOf(keyword) !== -1)
        })
        if (kwd !== '') {
            this.setState({
                searchResult: res
            })
        }
    }
    render() {
        const { kwd, searchResult } = this.state;
        return (
            <>
                <div className="mdui-textfield">
                    <i className="mdui-icon material-icons">search</i>
                    <input
                        ref={r => this.searchInput = r}
                        onChange={e => {
                            this.setState({ kwd: e.target.value }, () => {
                                this.search()
                            })
                        }}
                        value={this.state.kwd}
                        className="mdui-textfield-input"
                        placeholder="搜索(ctrl+F)">
                    </input>
                </div>
                <SearchResult
                    kwd={kwd}
                    result={searchResult}
                />
            </>
        )
    }
}

//分类栏目
const MakeChannels = ({ data: { name, apps, icon } }) => (
    <>
        <li className="mdui-collapse-item mdui-collapse-item-open">
            <div className="mdui-collapse-item-header mdui-list-item mdui-ripple">
                <i className="mdui-list-item-icon mdui-icon material-icons">{icon}</i>
                <div className="mdui-list-item-content">{name}</div>
                <i className="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
            </div>
            <ul className="mdui-collapse-item-body mdui-row-md-2 mdui-list">
                {apps.map(app => <AppListItem key={app.name} {...app} />)}
            </ul>
        </li>
    </>
)

const getChannelName = index => {
    const channels = ['AI人工智能', '图片视频', '编程开发', '生活常用', "第三方工具&友情链接"]
    return channels[index - 1]
}

const getChannelIcon = index => {
    const icons = ['brightness_auto', 'photo', 'code', 'brightness_7', "link"]
    return icons[index - 1]
}

class AppList extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        mutation()
    }
    render() {
        var channelType = []
        for (let i = applist.length - 1; i >= 0; i--) {
            let app = applist[i];
            if (!channelType.includes(app.channel)) {
                channelType.unshift(app.channel)
            }
        }

        var data = channelType.map(channel => ({
            name: getChannelName(channel),
            icon: getChannelIcon(channel),
            apps: applist.filter(app => app.channel === channel)
        }))

        /**
         * accordion 是否启用手风琴效果。
         * 为 true 时，最多只能有一个内容块处于打开状态，打开一个内容块时会关闭其他内容块。
         * 为 false 时，可同时打开多个内容块。
         */
        return (
            <ul className="mdui-list" mdui-collapse="{accordion: true}">
                <li className="mdui-subheader">
                    所有工具
                </li>
                {data.map((a, i) => (<MakeChannels key={i} data={a} />))}
            </ul>
        )
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
    }/*
    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("on route change");
        });
    }
    componentWillUnmount(){
        this.unlisten();
    }*/
    componentDidMount() {
        window.globalRef.title.innerText = '云极客工具'
    }
    render() {
        return (
            <div className="mdui-col-md-10">
                <Notice />
                <Search />
                <FivList />
                <AppList />
                <ToTop />
            </div>
        )
    }
}
