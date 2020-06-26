import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
import Header from './layout/header'
import loadable from './utils/loading'
import './App.css'
import '../node_modules/mdui/dist/css/mdui.min.css'

const RouterList = [{
    component: loadable(() => import('./pages/home')),
    path: "/",
    exact: true
}, {
    component: loadable(() => import('./pages/user')),
    path: "/user",
    exact: true
}, {
    component: loadable(() => import('./pages/user/login.jsx')),
    path: "/user/login"
}, {
    component: loadable(() => import('./pages/about.js')),
    path: "/about"
}, {
    component: loadable(() => import('./pages/setting')),
    path: "/setting"
}, {
    component: loadable(() => import('./pages/app/index')),
    path: "/app/:name"
}, {
    component: loadable(() => import('./pages/feedback.js')),
    path: "/feedback"
}]

const NoMatch = () => (
    <div className="mdui-text-color-theme-text center-panel">
        <h2 className="mdui-text-center">电波无法到达哦</h2>
        <p>
            是不是地址拼错了？是/app不是/apps哦<br></br>
        想要的工具不见了？返回首页找找吧！<br></br>
        </p>
        <Link to="/" className="mdui-color-theme mdui-btn mdui-btn-raised">返回首页</Link>
    </div>
)

export default class extends React.Component {
    componentDidMount() {
        const { loading } = this;
        const toggleDisabled = (isDisabled) => {
            var btns = document.getElementsByClassName('loadBtn');
            for (let i = 0; i < btns.length; i++) {
                btns[i].disabled = isDisabled
            }
        }
        window.loadShow = () => {
            window.loadingDelay = setTimeout(() => {
                loading.style.display = 'inline-block';
                toggleDisabled(true);
                delete window.loadingDelay
            }, 1000)
        }
        window.loadHide = () => {
            if (window.loadingDelay) {
                clearTimeout(window.loadingDelay);
                delete window.loadingDelay
            } else {
                loading.style.display = 'none';
                toggleDisabled(false)
            }
        }
    }
    render() {
        return (
            <Router>
                <div ref={r => this.loading = r} style={{ display: 'none' }} className="mdui-color-green-100 mdui-progress loading">
                    <div className="mdui-progress-indeterminate"></div>
                </div>
                <Header
                    getRef={(refs) => {
                        window.globalRef = {}
                        refs.map(ref => {
                            window.globalRef[ref.name] = ref.ref
                        })
                    }}
                />
                <br></br>
                <Switch>
                    {RouterList.map(route => (
                        <Route key={route.path} {...route}></Route>
                    ))}
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        )
    }
}
