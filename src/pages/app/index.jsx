import React from 'react'
import Loadable from 'react-loadable'
import { alert as mduiAlert, mutation } from 'mdui'
import {
    BrowserRouter as Router,
    Route,
    withRouter
} from "react-router-dom"
import getInfo from '../../utils/appinfo'
import AppMenu from './AppMenu'

/**
 * 工具加载框架
 */

const LoadApp = loader => {
    return Loadable({
        loader: () => import('../../apps/' + loader),
        delay: 1000,
        loading() {
            return (
                <div style={{ display: 'inline-block' }} className="mdui-color-green-100 mdui-progress loading">
                    <div className="mdui-progress-indeterminate"></div>
                </div>
            )
        }
    })
}

export default withRouter(class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appinfo: null
        }
    }
    componentDidCatch(error, info) {
        mduiAlert(error, '您的浏览器捕获到一个错误')
    }
    componentWillMount() {
        const info = getInfo(/\/([^\/]+)$/.exec(this.props.location.pathname)[1]);
        if (info) {
            this.setState({
                appinfo: info
            });
            window.globalRef.title.innerText = info.name;
            document.title = info.name + " - 云极客工具";
        }
    }
    componentWillUnmount() {
        window.loadHide() //清除滚动条
    }
    componentDidMount() {
        setInterval(_ => mutation(), 100)
        //链接带有全屏参数，隐藏头部
        if (window.location.search.indexOf('fullscreen=true') !== -1) {
            document.getElementsByTagName('header')[0].style.display = 'none'
            document.body.classList.remove('mdui-appbar-with-toolbar')
        }
    }
    render() {
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
                        <AppMenu
                            appinfo={this.state.appinfo}
                        />
                    </div>
                </div>
            </div>
        )
    }
})
