import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import '../node_modules/mdui/dist/css/mdui.min.css'

import Header from './layout/header'

//异步加载插件
import loadable from './utils/loading'

const RouterList = [{
    component:loadable(() => import('./pages/home')),
    path:"/",
    exact:true
},{
    component:loadable(() => import('./pages/user')),
    path:"/user"
},{
    component:loadable(() => import('./pages/user/login')),
    path:"/user/login"
},{
    component:loadable(() => import('./pages/about.js')),
    path:"/about"
},{
    component:loadable(() => import('./pages/setting')),
    path:"/setting"
},{
    component:loadable(() => import('./pages/app.js')),
    path:"/app/:name"
},{
    component:loadable(() => import('./pages/feedback.js')),
    path:"/feedback"
}]

const NoMatch = _ => {
    return (
        <p className="center-panel">
            <h2 className="mdui-text-center">电波无法到达哦</h2>
            <p>
            是不是地址拼错了？是/app不是/apps哦<br></br>
            想要的工具不见了？返回首页找找吧！<br></br>
            </p>
            <Link to="/" className="mdui-color-theme mdui-btn mdui-btn-raised">返回首页</Link>
        </p>
    )
}

class App extends React.Component {
    componentDidMount() {
        const { loading } = this
        window.loadShow = ()=> loading.style.display = 'inline-block';
        window.loadHide = ()=> loading.style.display = 'none';
    }
    render(){
        return(
            <Router>  
                <div style={{display:'none'}} ref={r => this.loading = r} className="mdui-color-green-100 mdui-progress loading">
                    <div className="mdui-progress-indeterminate"></div>
                </div>  
                <Header 
                    getRef={ref=>{
                        window.titleRef = ref
                    }}
                />
                <br></br>      
                <Switch>
                    {RouterList.map(route=>(
                        <Route {...route}></Route>
                    ))}
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default App;