import React from 'react'
import {
  Link
} from "react-router-dom"
import { getUserInfo, removeUserInfo } from '../../../../utils/Services/UserInfo'

const SettingMenu = (_: any) => {
    return(
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div id="set" className="mdui-dialog">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-dialog-title">账号设置</div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-dialog-content">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ul className="mdui-list">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Link mdui-dialog-close="true" to="rePwd" className="mdui-list-item mdui-ripple">修改密码</Link>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Link mdui-dialog-close="true" to="reEmail" className="mdui-list-item mdui-ripple">改绑邮箱</Link>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <a 
                        href="//wpa.qq.com/msgrd?v=3&amp;uin=1985386335&amp;site=qq&amp;menu=yes"
                        className="mdui-list-item mdui-ripple">
                            客服支持
                    </a>
                </ul>
            </div>
        </div>
    )
}

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
// @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
			userInfo: getUserInfo()
        }       
	}
    render(){
        const { userInfo } = this.state
        return(
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-card">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-primary">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-primary-title">{userInfo.username}</div>
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-content">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <p className="mdui-text-color-red">您已经是高级会员，尽情享受完整功能吧。
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button className="mdui-btn mdui-btn-icon"><i className="mdui-icon material-icons mdui-text-color-indigo">help</i></button>
                        </p>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <p>到期时间：2020-4-12 9:00:00</p>
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-actions">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button className="mdui-float-right mdui-btn mdui-color-theme mdui-ripple">我知道了</button>
                    </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                </div><br></br>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-card mdui-p-b-1">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <ul className="mdui-list app">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <li mdui-dialog="{target:'#set', history: false}" className="mdui-list-item mdui-ripple">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-indigo">account_circle</i>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-list-item-content">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <div className="mdui-list-item-title">账号设置</div>
                            </div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <i className="mdui-list-item-icon mdui-icon material-icons">chevron_right</i>
                        </li>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Link to="sync" className="mdui-list-item mdui-ripple">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <i className="mdui-list-item-icon mdui-icon material-icons mdui-text-color-yellow">star</i>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-list-item-content">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <div className="mdui-list-item-title">收藏同步</div>
                            </div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <i className="mdui-list-item-icon mdui-icon material-icons">chevron_right</i>
                        </Link>
                    </ul>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button
                        onClick={_=>{
                            removeUserInfo()
                            window.location.href = '/user/login'
                        }}
                        className="mdui-btn-block mdui-btn mdui-text-color-red">
                            退出登录
                    </button>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <SettingMenu />
                </div>
            </>
        )
    }
}
