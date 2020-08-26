import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-loadable` if it exis... Remove this comment to see the full error message
import Loadable from 'react-loadable'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'alert'.
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

const LoadApp = (loader: any) => {
    return Loadable({
        loader: () => {
            const info = getInfo(loader);
            info && window.updateTitle(info.name)
            return import('../../apps/' + loader)
        },
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

// @ts-expect-error ts-migrate(2345) FIXME: Type 'Readonly<{}> & Readonly<{ children?: ReactNo... Remove this comment to see the full error message
export default withRouter(class AppContainer extends React.Component {
    constructor(props: any) {
        super(props);
    }
    componentDidCatch(error: any, info: any) {
        mduiAlert(error, '您的浏览器捕获到一个错误', null, { history: false })
    }
    componentWillUnmount() {
        window.loadHide() //清除滚动条
        document.getElementsByClassName('mdui-overlay').length && document.getElementsByClassName('mdui-overlay')[0].remove()
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
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
        const appInfo = getInfo(this.props.match.params.name);
        return (
            
            <div className="mdui-row mdui-row-gapless">
                <div className="mdui-col-md-12">
                    <div className="mdui-col-md-8">
                        <Router>
                            {/**@ts-expect-error */}
                            <Route path="/app/:name" component={LoadApp(this.props.match.params.name)}></Route>
                        </Router>
                    </div>
                    <div className="mdui-col-md-4 mdui-p-l-2">
                        <AppMenu
                            appinfo={appInfo}
                        />
                    </div>
                </div>
            </div>
        )
    }
})
