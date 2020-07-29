import React from 'react'
import { snackbar, mutation } from 'mdui'
import Axios from '../../utils/axios';
import { MD5 } from 'crypto-js';
import { getUserInfo, setUserInfo } from '../../utils/UserInfo'
import SendCode from '../../utils/SendCode'
import Input from '../../components/Input'
import Tab from '../../components/Tab'

class Signin extends React.Component {
    constructor(props) {
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
        return (
            <>
                <Input
                    onValueChange={newText => {
                        this.setState({ username: newText })
                    }}
                    header="邮箱"
                    icon="email"
                    type="email"
                    value={username}
                />
                <Input
                    onValueChange={newText => {
                        this.setState({ password: newText })
                    }}
                    header="密码"
                    icon="lock"
                    type="password"
                    value={password}
                />
                <div className={`${username === "" && "hidden"}`}>
                    <SendCode
                        onInput={code => {
                            this.setState({ xcode: code })
                        }}
                        xcode={xcode}
                        email={username}
                    />
                </div>
                <button
                    onClick={() => {
                        this.signin()
                    }}
                    disabled={!xcode || !password}
                    className="loadBtn mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
            </>
        )
    }
}

class Forget extends React.Component {
    constructor(props) {
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
        return (
            <>
                <Input
                    onValueChange={newText => {
                        this.setState({ email: newText })
                    }}
                    header="邮箱"
                    icon="email"
                    type="email"
                    value={email}
                />
                <Input
                    onValueChange={newText => {
                        this.setState({ password: newText })
                    }}
                    header="新的密码"
                    icon="lock"
                    type="password"
                    value={password}
                />
                <div className={`${email === "" && "hidden"}`}>
                    <SendCode
                        onInput={code => {
                            this.setState({ xcode: code })
                        }}
                        xcode={xcode}
                        email={email}
                    />
                </div>
                <button
                    onClick={() => {
                        this.reset()
                    }}
                    disabled={!xcode || !password}
                    className="loadBtn mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
            </>
        )
    }
}

class Login extends React.Component {
    constructor(props) {
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
            <>
                <Input
                    onValueChange={newText => {
                        this.setState({ username: newText })
                    }}
                    header="邮箱"
                    icon="email"
                    type="email"
                    value={username}
                />
                <Input
                    onValueChange={newText => {
                        this.setState({ password: newText })
                    }}
                    header="密码"
                    icon="lock"
                    type="password"
                    value={password}
                    capsLock
                />
                <button
                    onClick={() => {
                        this.clientServer()
                    }}
                    className="loadBtn mdui-ripple mdui-color-theme mdui-float-right mdui-btn-raised mdui-btn">
                    登录
                </button>
                <label style={{ marginRight: '20px' }} className="mdui-float-right mdui-checkbox">
                    <input onChange={e => {
                        this.setState({ remember: e.target.checked })
                    }} type="checkbox" checked={remember} />
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
        if (getUserInfo()) window.location.href = "/user"
    }
    render() {
        return (
            <div className={`mdui-col-md-8 ${window.innerWidth >= 648 ? "mdui-card mdui-p-a-2" : ""}`} >
                <Tab
                    tabs={[
                        {
                            text: '登录',
                            id: 'login',
                            component: <Login />
                        }, {
                            text: '注册',
                            id: 'signin',
                            component: <Signin />
                        }, {
                            text: '找回密码',
                            id: 'forget',
                            component: <Forget />
                        }
                    ]}
                />
            </div>
        )
    }
}
