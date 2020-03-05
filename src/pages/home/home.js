import React from 'react'
import mdui from 'mdui'
import { Link } from "react-router-dom"
import applist from '../../utils/applist'
import fiv from '../../utils/fiv'
import TextInput from '../../utils/mdui-in-react/TextInput'

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
        const { edit } = this.state;
        //if(this.state.list === [])return <p>暂无收藏</p>
        var fivlist = this.state.list.map((a,i)=>{
            //如果处于编辑状态显示删除按钮                        
            let buttton = (edit)?
                <button onClick={()=>fiv.delete(i)} className="mdui-btn mdui-list-item-icon mdui-btn-icon">
                    <i className="mdui-icon material-icons mdui-text-color-red">delete</i>
                </button>
                :
                null
            return(
                <Link 
                    key={i} to={(edit)?'#':'/apps/' + a.link}
                    disabled={edit} className="mdui-col mdui-list-item mdui-ripple">
                        <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-yellow-500">star</i> 
                        <div className="mdui-list-item-content">{a.name}</div>
                        {buttton}
                </Link>
            )
        })
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
                {fivlist}
            </ul>
        )
    }   
}

//工具列表
const AppList = props => {
    if(localStorage.getItem('homeShowNewestTool') === 'false')return null
    return(
        <ul className="mdui-row-md-3 mdui-list">
            <li className="mdui-subheader">全部工具</li>
            {applist.map((a,i)=>(
                <Link key={i} to={'/apps/' + a.link} >
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
        mdui.alert(content, date + '公告',
            () => {
                localStorage.setItem('readedNotice', id)
            },
            {
                confirmText: '我知道了',
                history:false,
            })
    }
    getNoticeFromSever(){
        fetch('https://api.ygktool.cn/ygktool/notice')
            .then(res => res.json())
            .then(json => {
                console.log(json[0]);
                const { primary, content, date} = json[0]
                this.setState({                    
                    id:primary,
                    content:content.replace(/\n/g,'<br>'),
                    date:date                  
                },()=>{
                    if(!localStorage.readedNotice || localStorage.readedNotice != primary)this.showNotice()
                })
            })
    }
    render(){
        const { date, content } = this.state;
    	return(
        	<ul
                onClick={()=>{
                    this.showNotice()
                }}
                className="mdui-card mdui-list">
                <li className="mdui-list-item mdui-ripple">
                <i className="mdui-list-item-avatar mdui-icon material-icons">event_note</i>
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
const SearchResult = (props) => {
    if(!props.result.length)return null    
    return(
        <ul className="mdui-list">
            {props.result.map((a,i)=>(
            <Link key={i} to={'/apps/' + a.link} className="mdui-list-item mdui-ripple" >
                <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + a.icon_color}>{a.icon}</i> 
                <div className="mdui-list-item-content">{a.name}</div>
            </Link>
            ))}
            <p className="mdui-typo mdui-text-center">
            没找到想要的工具?试试<a href={"https://www.baidu.com/s?ie=UTF-8&wd=" + props.kwd}>百度搜索</a>
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
            if (e.ctrlKey && e.keyCode == 70){
                e.preventDefault()
                this.refs.search.focus()
            }
        })
    }
    search(){
        const kwd = this.state.kwd;
        var res = []
        applist.map(app=>{
            if(app.name.toLowerCase().indexOf(kwd.toLowerCase()) !== -1)res.push(app)
        })       
        if(kwd !== ''){
          this.state.getResult(res,kwd)
        }else{
          this.state.getResult('')
        }
    }
  render(){
    return(
        <div className="mdui-textfield">
            <i className="mdui-icon material-icons">search</i>
            <input
                ref="search"
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
        const { kwd, searchResult, applist } = this.state
        return(
            <React.Fragment>            
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
            </React.Fragment>
        )
    }
}

export default ()=> <Whole />
