import React from 'react'
import Loadable from 'react-loadable'
import mdui from 'mdui'
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from "react-router-dom"

import getInfo from '../utils/appinfo'
import fiv from '../utils/fiv'

const LoadApp = loader => {
    return Loadable({
        loader:() => import( '../apps/' + loader),
        loading () {return(
            <div style={{display:'inline-block'}} className="mdui-color-green-100 mdui-progress loading">
                <div className="mdui-progress-indeterminate"></div>
            </div> 
        )}
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
                        mdui-tooltip={fived?"{content: '取消收藏'}":"{content: '收藏'}"}
                        className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">
                            {fived?'star':'star_border'}
                        </i>
                    </button>
                    {navigator.share && <button 
                        onClick={()=>{
                            navigator.share({
                                title:window.location.title,
                                href:window.location.href
                            }).then(()=>{
                                mdui.snackbar({message: '感谢分享^_^'})
                            })
                        }}
                        mdui-tooltip="{content: '分享'}"
                        className="mdui-btn mdui-btn-icon mdui-ripple">
                        <i className="mdui-text-color-theme mdui-icon material-icons">share</i>
                    </button>}
                    <button 
                        onClick={()=>{
                            mdui.prompt('将以下嵌入代码粘贴到您的网页即可使用。欲获取应用源代码，请加群联系开发者',
                                () => {
                                    window.open('https://jq.qq.com/?_wv=1027&k=59hWPFs')
                                },
                                () => {},
                                {
                                    history: false,
                                    type: 'textarea',
                                    confirmText:'加群',
                                    cancelText:'关闭',
                                    defaultValue:`<iframe src="https://www.ygktool.cn/app/${link}?fullscreen=true" width="100%" height="400px" scrolling="no" style="border:0;"></iframe>`
                                }
                            )                          
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
        clearInterval(this.state.timer);
        window.loadHide()
    }
    componentDidMount(){
        this.setState({timer:setInterval(()=>mdui.mutation(), 100)})
        //隐藏头部
        if(window.location.search.indexOf('fullscreen=true') !== -1)document.getElementsByTagName('header')[0].style.display='none'
    }
    render(){
        const { showHelper } = this.state;
        return (
            <div className="mdui-row mdui-row-gapless">
                <div className="mdui-col-md-12">
                    <div className="mdui-col-md-8">
                        <Router> 
                            <Route path="/app/:name" component={LoadApp(this.props.match.params.name)}></Route>                     
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