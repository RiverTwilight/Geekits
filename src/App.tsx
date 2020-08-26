import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"
// @ts-expect-error ts-migrate(6142) FIXME: Module './layout/header' was resolved to '/mnt/h/B... Remove this comment to see the full error message
import Header from './layout/header'
// @ts-expect-error ts-migrate(6142) FIXME: Module './utils/loading' was resolved to '/mnt/h/B... Remove this comment to see the full error message
import loadable from './utils/loading'
import './App.css'
import '../node_modules/mdui/dist/css/mdui.min.css'

const RouterList = [{
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/home' was resolved to '/mnt/h/Bob/... Remove this comment to see the full error message
    component: loadable(() => import('./pages/home')),
    path: "/",
    exact: true
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/user' was resolved to '/mnt/h/Bob/... Remove this comment to see the full error message
    component: loadable(() => import('./pages/user')),
    path: "/user",
    exact: true
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/user/login.jsx' was resolved to '/... Remove this comment to see the full error message
    component: loadable(() => import('./pages/user/login.jsx')),
    path: "/user/login"
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/about.js' was resolved to '/mnt/h/... Remove this comment to see the full error message
    component: loadable(() => import('./pages/about.js')),
    path: "/about"
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/setting' was resolved to '/mnt/h/B... Remove this comment to see the full error message
    component: loadable(() => import('./pages/setting')),
    path: "/setting"
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/app/index' was resolved to '/mnt/h... Remove this comment to see the full error message
    component: loadable(() => import('./pages/app/index')),
    path: "/app/:name"
}, {
    // @ts-expect-error ts-migrate(6142) FIXME: Module './pages/feedback.js' was resolved to '/mnt... Remove this comment to see the full error message
    component: loadable(() => import('./pages/feedback.js')),
    path: "/feedback"
}]

const NoMatch = () => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="mdui-text-color-theme-text center-panel">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <h2 className="mdui-text-center">电波无法到达哦</h2>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <p>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            是不是地址拼错了？是/app不是/apps哦<br></br>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        想要的工具不见了？返回首页找找吧！<br></br>
        </p>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Link to="/" className="mdui-color-theme mdui-btn mdui-btn-raised">返回首页</Link>
    </div>
)

export default class extends React.Component {
    componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'loading' does not exist on type 'default... Remove this comment to see the full error message
        const { loading } = this;
        const toggleDisabled = (isDisabled: any) => {
            var btns = document.getElementsByClassName('loadBtn');
            for (let i = 0; i < btns.length; i++) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'Elemen... Remove this comment to see the full error message
                btns[i].disabled = isDisabled
            }
        }
        window.loadShow = () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
            window.loadingDelay = setTimeout(() => {
                loading.style.display = 'inline-block';
                toggleDisabled(true);
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
                delete window.loadingDelay
            }, 700)
        }
        window.loadHide = () => {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
            if (window.loadingDelay) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
                clearTimeout(window.loadingDelay);
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'loadingDelay' does not exist on type 'Wi... Remove this comment to see the full error message
                delete window.loadingDelay
            } else {
                loading.style.display = 'none';
                toggleDisabled(false)
            }
        }
        window.updateTitle = (pageName) => {
            window.globalRef.title.innerText = pageName || '云极客工具'
            document.title = pageName ? `${pageName} - 云极客工具` : '云极客工具'
        }
    }
    render() {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Router>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div ref={r => this.loading = r} style={{ display: 'none' }} className="mdui-color-green-100 mdui-progress loading">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-progress-indeterminate"></div>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Header
                    getRef={(refs: any) => {
                        window.globalRef = {}
                        refs.map((ref: any) => {
                            window.globalRef[ref.name] = ref.ref
                        })
                    }}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <br></br>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Switch>
                    {RouterList.map(route => (
                        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <Route key={route.path} {...route}></Route>
                    ))}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Route component={NoMatch} />
                </Switch>
            </Router>
        );
    }
}
