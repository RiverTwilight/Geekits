import React from 'react'
import {
    NavLink
} from "react-router-dom"
import { Drawer } from 'mdui'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../u... Remove this comment to see the full error message
import { getUserInfo } from '../utils/Services/UserInfo'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '../u... Remove this comment to see the full error message
import applist from '../utils/applist'

const list = [{
    icon: 'home',
    iconColor: 'red',
    text: '首页',
    link: '/'
}, {
    icon: 'settings',
    iconColor: '',
    text: '设置',
    link: '/setting'
}]

const Menu = () => (
    <>{
        list.map((a) => (
            <NavLink
                onClick={() => {
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'leftDrawer' does not exist on type 'Wind... Remove this comment to see the full error message
                    window.innerWidth <= 1024 && window.leftDrawer.close()
                }}
                key={a.link}
                exact className="mdui-list-item mdui-ripple"
                activeClassName="mdui-list-item-active" to={a.link}>
                <i className={"mdui-list-item-icon mdui-icon material-icons mdui-text-color-" + a.iconColor}>{a.icon}</i>
                <div className="mdui-list-item-content">{a.text}</div>
            </NavLink>
        ))
    }</>
)

class DrawerMenu extends React.Component<{}, {}> {
    componentDidMount() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'leftDrawer' does not exist on type 'Wind... Remove this comment to see the full error message
        window.leftDrawer = new Drawer('#left-drawer');
    }
    render() {
        const user = getUserInfo();
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div id="left-drawer" className="mdui-drawer">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div style={{ height: '130px' }} className="mdui-shadow-0 mdui-card">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-primary">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-primary-title mdui-text-color-theme">云极客工具</div>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-primary-subtitle">{`共有${applist.filter((app: any) => app.channel !== 5).length}个工具`}</div>
                    </div>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ul className="mdui-list">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <NavLink
                        onClick={() => {
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'leftDrawer' does not exist on type 'Wind... Remove this comment to see the full error message
                            window.innerWidth <= 1024 && window.leftDrawer.close()
                        }}
                        exact className="mdui-list-item mdui-ripple"
                        activeClassName="mdui-list-item-active" to={user ? '/user' : '/user/login'}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <i className="mdui-list-item-avatar mdui-icon material-icons">face</i>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-list-item-content">{user ? user.username : '未登录'}</div>
                    </NavLink>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-divider" />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Menu />
                </ul>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p className="mdui-text-center copyright">©2019-2020&nbsp;江村暮</p>
            </div>
        );
    }
}

export default DrawerMenu
