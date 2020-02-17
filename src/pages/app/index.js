import React from 'react'
import Loadable from 'react-loadable'
import mdui from 'mdui'
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom"

import appinfo from '../../utils/appinfo'
import fiv from '../../utils/fiv'

const LoadApp = loader => {
  return Loadable({
    loader:() => import( '../../apps/' + loader),
    loading () {return <div className="main-load"><div className="mdui-spinner mdui-spinner-colorful"></div></div>}
  })
}

//问题&反馈
const bugReport = ()=> {
    mdui.prompt(
        '请详细描述您遇到的问题，可以附加联系方式以便我反馈', 
        window.titleRef.innerText,
        value => {},
        value => {}, {
            type: 'textarea',
            maxlength: 200,
            confirmText: '提交',
            cancelText: '取消'
        }
    )
}

//工具信息组件
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appInfo: this.props.appInfo,
            fived: (fiv.get(this.props.appInfo.link)),
            showHelper:!Boolean(localStorage.getItem('showHelper'))
        }       
    }
    render(){
        const { appInfo, fived, showHelper } = this.state
        if(!showHelper)return null
        return(
            <div className="mdui-card appinfo">
                <div className="mdui-card-media">
                    <div className="mdui-card-menu">
                        <button 
                            onClick={()=>{
                                this.setState({showHelper:false})
                            }}
                            className="mdui-btn mdui-btn-icon mdui-text-color-black">
                            <i className="mdui-icon material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div className="mdui-card-primary">
                    <div className="mdui-card-primary-title">使用说明</div>
                </div>
                <div className="mdui-card-content">
                    TODO:收藏功能/首页收藏
                </div>
                <div className="mdui-card-actions">
                    <button 
                        onClick={()=>{
                            if(fiv.get(appInfo.link)){
                                fiv.delete(appInfo);
                                this.setState({fived:false})
                            }else{
                                fiv.add(appInfo)
                                this.setState({fived:true})                           
                            }
                        }}
                        mdui-tooltip={(fived)?"{content: '取消收藏'}":"{content: '收藏'}"}
                        className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">
                            {(fived)?'star':'star_border'}
                        </i>
                    </button>
                    <button 
                        onClick={bugReport}
                        mdui-tooltip="{content: '问题反馈'}" className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">mode_comment</i>                
                    </button>               
                </div>             
            </div>
        )
    }
}

class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            timer:null,
            appInfo: appinfo.get(/\/([^\/]+)$/.exec(this.props.location.pathname)[1])
        }       
    }
    componentWillMount() {
        window.titleRef.innerText = this.state.appInfo.name;
        document.title = this.state.appInfo.name + " - 云极客工具"
    }
    componentWillUnmount(){
        clearInterval(this.state.timer)
    }
    componentDidMount(){
        this.setState({timer:setInterval(()=>mdui.mutation(), 100)})
    }
    render(){
        const { showHelper } = this.state;
        return (
            <div className="mdui-row mdui-row-gapless">
                <div className="mdui-col-md-12">
                    <div className="mdui-col-md-8">
                        <Router> 
                            <Route path="/apps/:name" component={LoadApp(this.props.match.params.name)}></Route>                     
                        </Router>
                    </div>
                    <div className="mdui-col-md-3 mdui-col-offset-md-1">
                        <br></br>
                        <Info 
                            appInfo={this.state.appInfo}
                        />              
                    </div>       
                </div>
            </div>
        )
    }
}

export default withRouter(AppContainer);