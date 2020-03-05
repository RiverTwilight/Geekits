import React from 'react'
import Loadable from 'react-loadable'
import mdui from 'mdui'
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from "react-router-dom"

import getInfo from '../../utils/appinfo'
import fiv from '../../utils/fiv'

const LoadApp = loader => {
  return Loadable({
    loader:() => import( '../../apps/' + loader),
    loading () {return <div className="main-load"><div className="mdui-spinner mdui-spinner-colorful"></div></div>}
  })
}

//工具信息组件
class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fived:false,           
            hideHelper:localStorage.hideHelper === 'true'
        }       
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.appinfo)this.setState({fived:fiv.get(nextProps.appinfo.link)})
    }
    render(){        
        const { fived, hideHelper } = this.state;
        if (!this.props.appinfo || hideHelper)return null      
        const { help, link, name } = this.props.appinfo
        console.log(this.props.appinfo);

        const tips = (help !== "")?
            help.split('##').map((line,i)=>(<li key={i} className="mdui-list-item">{line}</li>))
            :
            <li className="mdui-list-item">没有什么好说明的，若有疑问请加QQ群923724755</li>
                    
        return(
            <div className="mdui-card appinfo">
                <div className="mdui-card-media">
                    <div className="mdui-card-menu">
                        <button 
                            onClick={()=>{
                                this.setState({hideHelper:true})
                            }}
                            className="mdui-btn mdui-btn-icon mdui-text-color-black">
                            <i className="mdui-icon material-icons">close</i>
                        </button>
                    </div>
                </div>
                <div className="mdui-card-primary">
                    <div className="mdui-card-primary-title">使用说明</div>
                </div>
                <div>
                    <ul className="mdui-list">
                    {tips}
                    </ul>                   
                </div>
                <div className="mdui-card-actions">
                    <button 
                        onClick={()=>{
                            if(fiv.get(link)){
                                fiv.delete({
                                    link:link,
                                    name:name
                                });
                                this.setState({fived:false})
                            }else{
                                fiv.add({
                                    link:link,
                                    name:name
                                })
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
                        mdui-tooltip="{content: '获取代码'}" className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">code</i>                
                    </button>   
                    <a 
                        href="https://jq.qq.com/?_wv=1027&amp;k=59hWPFs" target="_blank"
                        mdui-tooltip="{content: '加群咨询'}" className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">help</i>                
                    </a>              
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
            appinfo: null
        }       
    }
    async componentWillMount() {
        var info = getInfo(/\/([^\/]+)$/.exec(this.props.location.pathname)[1]);
        if (info) {
            this.setState({
                appinfo: info
            });       
            window.titleRef.innerText = info.name;
            document.title = info.name + " - 云极客工具";
        }
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
                            appinfo={this.state.appinfo}
                        />              
                    </div>       
                </div>
            </div>
        )
    }
}

export default withRouter(AppContainer);