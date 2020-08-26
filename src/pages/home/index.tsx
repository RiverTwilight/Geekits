import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
import { alert as mduiAlert, mutation } from 'mdui'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/js-pinyin` if it exists or... Remove this comment to see the full error message
import pinyin from 'js-pinyin'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { ToTop } from 'mdui-in-react'
import axios from '../../utils/axios'
import applist from '../../utils/applist'
import fiv from '../../utils/Services/fiv'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Hooks/useEventListener' was re... Remove this comment to see the full error message
import useEventListener from '../../utils/Hooks/useEventListener'

const AppListItem = ({
    isActive,
    channel,
    icon,
    icon_color,
    name,
    link,
    description
}: any) => {
    return (
        channel === 5 ?
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <a className={`${isActive && 'mdui-list-item-active'} mdui-col mdui-list-item mdui-ripple`} target="_blank" rel="noopener noreferrer" href={link}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey"}>link</i>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-list-item-content">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-list-item-title">{name}</div>
                    </div>
                </a>
            </>
            :
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link
                    to={'/app/' + link}
                    className={`${isActive && 'mdui-list-item-active'} mdui-col mdui-list-item mdui-ripple`}
                >
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + icon_color}>{icon}</i>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-list-item-content">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-list-item-title">{name}</div>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {description && <div className="mdui-list-item-text">{description}</div>}
                    </div>
                </Link>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ul className="mdui-row-md-3 mdui-list">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <li className="mdui-subheader">
                收藏&nbsp;
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <div className="mdui-text-center mdui-typo-body-1-opacity">
                    点击工具菜单中的星型按钮收藏
                </div>
                :
                list.map((a, i) => (
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Link
                        key={a.link + a.icon} to={edit ? '#' : '/app/' + a.link}
                        // @ts-expect-error ts-migrate(2322) FIXME: Property 'disabled' does not exist on type 'Intrin... Remove this comment to see the full error message
                        disabled={edit} className="mdui-col mdui-list-item mdui-ripple">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-list-item-icon mdui-icon material-icons">star_border</i>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-list-item-content">{a.name}</div>
                        {edit &&
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            <button onClick={() => fiv.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                            </button>
                        }
                    </Link>
                ))}
        </ul>
    )
}

/**
 * 搜索结果
 */

const SearchResult = ({
    result = [],
    kwd
}: any) => {
    const handleKeydown = (e: any) => {
        if (e.keyCode === 38 || e.keyCode === 40) {
            e.preventDefault()
            setActiveItem(e.keyCode === 38 ? (activeItem - 1) : (activeItem + 1))
        } else if (e.keyCode === 13) {
            e.preventDefault();
            handleClick(`/app/${result[activeItem].link}`);
        }
    }
    const [activeItem, setActiveItem] = useState(-1);
    // @ts-expect-error ts-migrate(7041) FIXME: The containing arrow function captures the global ... Remove this comment to see the full error message
    useEventListener('keydown', handleKeydown.bind(this))
    let history = useHistory();
    if (!result.length || kwd === '') return null
    function handleClick(url: any) {
        history.push(url);
    }
    console.log(activeItem)
    return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ul className="mdui-list">
            {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type. */}
            {result.map((a, i) => (
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <AppListItem isActive={activeItem === i} key={a.link + a.icon} {...a} />
            ))}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p className="mdui-typo mdui-text-center">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                没找到想要的工具?试试<a href={"https://www.baidu.com/s?ie=UTF-8&wd=" + kwd}>百度搜索</a>
            </p>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-divider"></div>
        </ul>
    )
}

type SearchState = any;

class Search extends React.Component<{}, SearchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            kwd: '',
            searchResult: []
        }
    }
    handleSearchKeydown(e: any) {
        if (e.ctrlKey && e.keyCode === 70) {
            e.preventDefault()
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchInput' does not exist on type 'Sea... Remove this comment to see the full error message
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
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-textfield">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon material-icons">search</i>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input
                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'searchInput' does not exist on type 'Sea... Remove this comment to see the full error message
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
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SearchResult
                    kwd={kwd}
                    result={searchResult}
                />
            </>
        )
    }
}

//分类栏目
const MakeChannels = ({
    data: { name, apps, icon }
}: any) => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <li className="mdui-collapse-item mdui-collapse-item-open">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-collapse-item-header mdui-list-item mdui-ripple">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-list-item-icon mdui-icon material-icons">{icon}</i>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-list-item-content">{name}</div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-collapse-item-arrow mdui-icon material-icons">keyboard_arrow_down</i>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ul className="mdui-collapse-item-body mdui-row-md-2 mdui-list">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {apps.map((app: any) => <AppListItem key={app.name} {...app} />)}
            </ul>
        </li>
    </>
)

const getChannelName = (index: any) => {
    const channels = ['AI人工智能', '图片视频', '编程开发', '生活常用', "第三方工具&友情链接"]
    return channels[index - 1]
}

const getChannelIcon = (index: any) => {
    const icons = ['brightness_auto', 'photo', 'code', 'brightness_7', "link"]
    return icons[index - 1]
}

class AppList extends React.Component {
    constructor(props: any) {
        super(props);
    }
    componentDidMount() {
        mutation()
    }
    render() {
        var channelType: any = []
        for (let i = applist.length - 1; i >= 0; i--) {
            let app = applist[i];
            if (!channelType.includes(app.channel)) {
                channelType.unshift(app.channel)
            }
        }

        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'channel' implicitly has an 'any' type.
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
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ul className="mdui-list" mdui-collapse="{accordion: true}">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <li className="mdui-subheader">
                    所有工具
                </li>
                {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type. */}
                {data.map((a, i) => (<MakeChannels key={i} data={a} />))}
            </ul>
        )
    }
}

type IndexState = any;

class Index extends React.Component<{}, IndexState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            notice: null
        }
    }
    showNotice() {
        const { notice: { date, content, id } } = this.state;
        mduiAlert(content, date.split('T')[0] + '公告',
            () => {
                localStorage.setItem('readedNotice', id)
            },
            {
                confirmText: '我知道了',
                history: false,
            })
    }
    componentDidMount() {
        this.getNotice()
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        window.updateTitle()
    }
    getNotice() {
        //if(sessionStorage.loadedNotice == 1)return
        axios.get('/ygktool/notice')
            .then(json => {
                const { primary, content, date } = json.data[0]
                this.setState({
                    notice: {
                        id: primary,
                        content: content.replace(/\n/g, '<br>'),
                        date: date
                    }
                }, () => {
                    //sessionStorage.setItem('loadedNotice', 1)
                    if (window.innerWidth <= 640 && (!localStorage.readedNotice || localStorage.readedNotice != primary)) this.showNotice()
                })
            })
    }
    render() {
        const { notice } = this.state
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="mdui-row">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-col-md-9 mdui-p-r-1">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Search />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <FivList />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <AppList />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <ToTop />
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-col-md-3">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-primary">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-card-primary-title">公告</div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-card-primary-subtitle">{notice && notice.date.split('T')[0]}</div>
                        </div>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div dangerouslySetInnerHTML={{ __html: notice ? notice.content : '没有公告' }} className="mdui-card-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index
