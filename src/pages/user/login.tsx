import React from 'react'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui"' has no exported member 'mutation'.
import { snackbar, mutation } from 'mdui'
import Axios from '../../utils/axios';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/crypto-js` if it exists or... Remove this comment to see the full error message
import { MD5 } from 'crypto-js';
import { getUserInfo, setUserInfo } from '../../utils/Services/UserInfo'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Services/SendCode' was resolve... Remove this comment to see the full error message
import SendCode from '../../utils/Services/SendCode'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { Input, Tab } from 'mdui-in-react'

type SigninState = any;

class Signin extends React.Component<{}, SigninState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: "",
            password: null,
            xcode: null,
            inviteCode: null
        }
    }
    signin() {
        const { username, password, xcode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: '/ygktool/user/signin',
            withCredentials: false,
            data: {
                ...username,
                ...password,
                ...xcode,
                inviteCode: 20284
            }
        }).then(response => {
            var json = JSON.parse(response.request.response);
            switch (json.code) {
                case 1:
                    snackbar({ message: '用户已存在' });
                    break;
                case 3:
                    snackbar({ message: '验证码错误' });
                    break;
                case 666:
                    snackbar({ message: '账户创建成功，即将跳转...' });
                    setTimeout(_ => window.location.href = '/user/login', 2000)
                    break;
            }
        }).then(_ => {
            window.loadHide()
        })
    }
    render() {
        const { password, username, xcode } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={newText => {
                    this.setState({ username: newText })
                }}
                header="邮箱"
                icon="email"
                // @ts-expect-error ts-migrate(2322) FIXME: Type '"email"' is not assignable to type '"number"... Remove this comment to see the full error message
                type="email"
                value={username}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={newText => {
                    this.setState({ password: newText })
                }}
                header="密码"
                icon="lock"
                type="password"
                value={password}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className={`${username === "" && "hidden"}`}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SendCode
                    onInput={(code: any) => {
                        this.setState({ xcode: code })
                    }}
                    xcode={xcode}
                    email={username}
                />
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button
                onClick={() => {
                    this.signin()
                }}
                disabled={!xcode || !password}
                className="loadBtn mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-icon material-icons">&#xe5ca;</i>
            </button>
        </>;
    }
}

type ForgetState = any;

class Forget extends React.Component<{}, ForgetState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            password: null,
            xcode: null
        }
    }
    reset() {
        const { email, password, xcode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: '/ygktool/user/reset',
            withCredentials: false,
            data: {
                username: email,
                newPwd: password,
                xcode: xcode
            }
        }).then(response => {
            var json = JSON.parse(response.request.response);
            switch (json.code) {
                case 500:
                    snackbar({ message: '服务器错误，请联系管理员' });
                    break;
                case 2:
                    snackbar({ message: '验证码错误' });
                    break;
                case 666:
                    snackbar({ message: '修改成功，即将跳转...' });
                    setTimeout(_ => window.location.href = '/user/login', 2000)
                    break;
            }
        }).then(_ => {
            window.loadHide()
        })
    }
    render() {
        const { password, email, xcode } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={newText => {
                    this.setState({ email: newText })
                }}
                header="邮箱"
                icon="email"
                // @ts-expect-error ts-migrate(2322) FIXME: Type '"email"' is not assignable to type '"number"... Remove this comment to see the full error message
                type="email"
                value={email}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Input
                onValueChange={newText => {
                    this.setState({ password: newText })
                }}
                header="新的密码"
                icon="lock"
                type="password"
                value={password}
            />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className={`${email === "" && "hidden"}`}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <SendCode
                    onInput={(code: any) => {
                        this.setState({ xcode: code })
                    }}
                    xcode={xcode}
                    email={email}
                />
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button
                onClick={() => {
                    this.reset()
                }}
                disabled={!xcode || !password}
                className="loadBtn mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <i className="mdui-icon material-icons">&#xe5ca;</i>
            </button>
        </>;
    }
}

type LoginState = any;

class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            username: /*'wrj2014@126.com',*/"",
            password: /*'123456',*/"",
            remember: false
        }
    }
    clientServer() {
        const { username, password, remember } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: '/ygktool/user/login',
            withCredentials: false,
            data: {
                username: username,
                token: String(MD5(username + String(MD5(password))))
            }
        }).then(response => {
            var json = JSON.parse(response.request.response);
            switch (json.code) {
                case 1:
                    snackbar({ message: '邮箱或密码错误' });
                    break;
                case 666:
                    var data = JSON.stringify(json.data);
                    setUserInfo(data, remember);
                    window.location.href = "/user"
            }
        }).catch(e => {
            snackbar({ message: e })
        }).then(_ => {
            window.loadHide()
        })
    }
    render() {
        const { password, username, remember } = this.state
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText => {
                        this.setState({ username: newText })
                    }}
                    header="邮箱"
                    icon="email"
                    // @ts-expect-error ts-migrate(2322) FIXME: Type '"email"' is not assignable to type '"number"... Remove this comment to see the full error message
                    type="email"
                    value={username}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText => {
                        this.setState({ password: newText })
                    }}
                    header="密码"
                    icon="lock"
                    type="password"
                    value={password}
                    // @ts-expect-error ts-migrate(2322) FIXME: Property 'capsLock' does not exist on type 'Intrin... Remove this comment to see the full error message
                    capsLock
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button
                    onClick={() => {
                        this.clientServer()
                    }}
                    className="loadBtn mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn">
                    登录
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <label style={{ marginRight: '20px' }} className="mdui-float-right mdui-checkbox">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input onChange={e => {
                        this.setState({ remember: e.target.checked })
                    }} type="checkbox" checked={remember} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-checkbox-icon"></i>
                    记住我
                </label>
            </>
        )
    }
}

export default class extends React.Component {
    componentDidMount() {
        mutation();
        window.globalRef.title.innerText = '登录/注册'
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
        if (getUserInfo()) window.location.href = "/user"
    }
    render() {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className={`mdui-col-md-8 ${window.innerWidth >= 648 ? "mdui-card mdui-p-a-2" : ""}`} >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Tab
                    tabs={[
                        {
                            text: '登录',
                            id: 'login',
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            component: <Login />
                        }, {
                            text: '注册',
                            id: 'signin',
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            component: <Signin />
                        }, {
                            text: '找回密码',
                            id: 'forget',
                            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                            component: <Forget />
                        }
                    ]}
                />
            </div>
        )
    }
}
