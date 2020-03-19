import React from 'react'
import mdui from 'mdui'
import { Link } from "react-router-dom"
import applist from '../../utils/applist'
import fiv from '../../utils/fiv'
import pinyin from 'js-pinyin'

//收藏列表
class FivList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            list:fiv.getAll()
        }
    }
    render(){
        const { edit, list } = this.state;       
        return(
            <ul className="mdui-row-md-3 mdui-list">
                <li className="mdui-subheader">
                    收藏&nbsp;
                    <a 
                        onClick={()=>{
                            this.setState({edit:!edit})
                        }}
                        className="mdui-text-color-theme mdui-float-right">
                        {(edit)?'确认':'编辑'}</a>
                </li>
                {(!list.length)?
                <div className="mdui-text-center mdui-typo-body-1-opacity">点击工具使用说明下方的收藏按钮即可收藏</div>
                :
                list.map((a,i)=>(
                <Link 
                    key={i} to={edit?'#':'/app/' + a.link}
                    disabled={edit} className="mdui-col mdui-list-item mdui-ripple">
                        <i className="mdui-list-item-icon mdui-icon material-icons">star_border</i> 
                        <div className="mdui-list-item-content">{a.name}</div>
                        {(edit)?
                            <button onClick={()=>fiv.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
                                <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                            </button>
                            :
                            null
                        }
                </Link>
                ))}
            </ul>
        )
    }   
}

//工具列表
const AppList = () => {
    if(localStorage.homeShowNewestTool === 'false')return null
    return(
        <ul className="mdui-row-md-3 mdui-list">
            <li className="mdui-subheader">全部工具</li>
            {applist.map((a,i)=>(
                <Link key={i} to={'/app/' + a.link} >
                    <li className="mdui-col mdui-list-item mdui-ripple">
                        <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + a.icon_color}>{a.icon}</i> 
                        <div className="mdui-list-item-content">{a.name}</div>
                    </li>
                </Link>
            ))}
        </ul>
    )
}

//公告栏
class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date:null,
            id:null,
            content:null
        }
    }
    componentDidMount() {
        this.getNoticeFromSever()
    }
    showNotice(){
        const { date, content, id } = this.state;        
        mdui.alert(content, date.split('T')[0] + '公告',
            () => {
                localStorage.setItem('readedNotice', id)
            },
            {
                confirmText: '我知道了',
                history:false,
            })
    }
    getNoticeFromSever(){
        //if(sessionStorage.loadedNotice == 1)return
        fetch('https://api.ygktool.cn/ygktool/notice')
            .then(res => res.json())
            .then(json => {
                const { primary, content, date} = json[0]
                this.setState({                    
                    id:primary,
                    content:content.replace(/\n/g,'<br>'),
                    date:date                  
                },()=>{
                    //sessionStorage.setItem('loadedNotice', 1)
                    if(!localStorage.readedNotice || localStorage.readedNotice != primary)this.showNotice()
                })
            })
    }
    render(){
        return(
            <ul
                onClick={()=>{
                    this.showNotice()
                }}
                className="mdui-list mdui-card">
                <li className="mdui-list-item mdui-ripple">
                <i className="mdui-list-item-icon mdui-icon material-icons">event_note</i>
                <div className="mdui-list-item-content">
                    <div className="mdui-list-item-title">公告</div>
                </div>
                <i className="mdui-list-item-icon mdui-icon material-icons">keyboard_arrow_right</i>
                </li>
            </ul>
        )
    }
}

//显示结果
const SearchResult = ({result, kwd}) => {
    if(!result.length)return null    
    return(
        <ul className="mdui-list">
            {result.map((a,i)=>(
            <Link key={i} to={'/app/' + a.link} className="mdui-list-item mdui-ripple" >
                <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + a.icon_color}>{a.icon}</i> 
                <div className="mdui-list-item-content">{a.name}</div>
            </Link>
            ))}
            <p className="mdui-typo mdui-text-center">
            没找到想要的工具?试试<a href={"https://www.baidu.com/s?ie=UTF-8&wd=" + kwd}>百度搜索</a>
            </p>
            <div className="mdui-divider"></div>
        </ul>
    )  
}

class Search extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            getResult:(res,kwd)=>props.getResult(res,kwd),//储存回调函数
            kwd:''
        }
    }
    componentDidMount() {
        document.addEventListener('keydown',e=>{
            if (e.ctrlKey && e.keyCode === 70){
                e.preventDefault()
                this.searchInput.focus()
            }
        })
    }
    search(){
        pinyin.setOptions({checkPolyphone: false, charCase: 0});
        const { kwd, getResult } = this.state
        var res = []
        applist.map(app=>{
            let keyword = kwd.toLowerCase()
            if(pinyin.getFullChars(app.name).toLowerCase().indexOf(keyword) !== -1 || app.name.toLowerCase().indexOf(keyword) !== -1)res.push(app)
        })       
        if(kwd !== ''){
            getResult(res,kwd)
        }else{
            getResult('')
        }
    }
    render(){
        return(
            <div className="mdui-textfield">
                <i className="mdui-icon material-icons">search</i>
                <input
                    ref={r => this.searchInput = r}
                    onChange={e=>{
                        this.setState({kwd:e.target.value},()=>{
                            this.search()
                        })
                    }}
                    value={ this.state.kwd }
                    className="mdui-textfield-input"
                    type="text" placeholder="搜索(ctrl+F)">
                </input>    
            </div>
        )
    }
}

class Whole extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            kwd:'',
            searchResult:[]
        }
    }
    render(){
        const { kwd, searchResult } = this.state
        return(
            <>            
                <Notice />
                <Search 
                    getResult={(res,kwd)=>{
                        this.setState({
                          searchResult:res,
                          kwd:kwd
                        })
                    }}
                />
                <SearchResult 
                    kwd={kwd}
                    result={searchResult}
                />
                <FivList />
                <AppList />
            </>
        )
    }
}

export default Whole
