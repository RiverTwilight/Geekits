import React from 'react'
import mdui from 'mdui'
import { Link } from "react-router-dom"
import appinfo from '../../utils/appinfo'
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
                        <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-blue">apps</i> 
                        <div className="mdui-list-item-content">{a.name}</div>
                        {buttton}
                </Link>
            )
        })
        return(
            <ul className="mdui-row-md-3 mdui-list">
                <li class="mdui-subheader">
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
function AppList(){
  console.log(localStorage.getItem('homeShowNewestTool'))
  if(localStorage.getItem('homeShowNewestTool') === 'false')return null
  var applist = appinfo.getAll().map((a,i)=>{
    return(
      <Link key={i} to={'/apps/' + a.link} >
        <li className="mdui-col mdui-list-item mdui-ripple">
          <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-blue">apps</i> 
          <div className="mdui-list-item-content">{a.name}</div>
        </li>
      </Link>
    )
  })
  return(
    <ul className="mdui-row-md-3 mdui-list">
      <li class="mdui-subheader">全部工具</li>
      {applist}
    </ul>
  )
}

//公告栏
class Notice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'旧版的更多功能即将到来....',
            text:`旧版拥有的丰富功能会逐步移植到新版，加群以关注更新动态！群号：923724755`
        }
    }
    getNoticeFromSever(){
        //todo
    }
    render(){
        const { title, text } = this.state;
    	return(
        	<ul
                onClick={()=>{
                    mdui.alert(text, title, ()=>{},{
                        confirmText:'我知道了'
                    })
                }}
                className="mdui-card mdui-list">
                <li className="mdui-list-item mdui-ripple">
                <i className="mdui-list-item-avatar mdui-icon material-icons">event_note</i>
                <div className="mdui-list-item-content">
                    <div className="mdui-list-item-title mdui-list-item-one-line">{title}</div>
                    <div className="mdui-list-item-text mdui-list-item-two-line">{text}</div>
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
    var list = props.result.map((a,i)=>{
        return(
            <Link key={i} to={'/apps/' + a.link} >
              <li className="mdui-list-item mdui-ripple">
                <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-blue">apps</i> 
                <div className="mdui-list-item-content">{a.name}</div>
              </li>
            </Link>
        )
    })
    return(
        <ul className="mdui-list">
            {list}
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
        //TODO：http请求搜索结果
        const kwd = this.state.kwd;
        var res = [
          {
            name:'oce',
            icon:'apps',
            iconColor:'green',
            link:'decision'
          }
        ]
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
                    kwd={this.state.kwd}
                    result={this.state.searchResult}
                />
                <FivList />
                <AppList />
            </React.Fragment>
        )
    }
}

export default ()=> <Whole />