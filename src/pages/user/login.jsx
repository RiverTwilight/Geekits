import React from 'react'
import { snackbar, mutation } from 'mdui'
import Axios from 'axios';
import { MD5 } from 'crypto-js';
import { getUserInfo } from '../../utils/UserInfo'
import SendCode from '../../utils/SendCode'
import Input from '../../components/Input'

const setCookie = (name, value) => {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};path='../'`;
}

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            re_password: null,
            xcode: null,
            inviteCode: null
        }
    }
    signin() {
        const { username, password, xcode, inviteCode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: '/ygktool/user/signin',
            withCredentials: false,
            data: {
                username: username,
                password: password,
                xcode: xcode,
                inviteCode: inviteCode
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
        const { password, re_password, username, xcode, inviteCode } = this.state
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
                <Input
                    onValueChange={newText => {
                        this.setState({ re_password: newText })
                    }}
                    header="确认密码"
                    icon="lock"
                    type="password"
                    error={re_password === password ? null : true}
                    value={re_password}
                />
                <Input
                    onValueChange={newText => {
                        this.setState({ inviteCode: newText })
                    }}
                    header="邀请码"
                    placeholder="加群查看邀请码,群号:923724755"
                    icon="card_membership"
                    value={inviteCode}
                />
                <SendCode
                    onInput={code => {
                        this.setState({ xcode: code })
                    }}
                    xcode={xcode}
                    email={username}
                />
                <button
                    onClick={() => {
                        this.signin()
                    }}
                    disabled={!xcode || re_password !== password}
                    className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
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
            email: null,
            password: null,
            re_password: null,
            xcode: null
        }
    }
    reset() {
        const { email, password, xcode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: 'https://api.ygktool.cn/ygktool/user/reset',
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
        const { password, re_password, email, xcode } = this.state
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
                <Input
                    onValueChange={newText => {
                        this.setState({ re_password: newText })
                    }}
                    header="确认密码"
                    icon="lock"
                    type="password"
                    error={re_password === password ? null : true}
                    value={re_password}
                />
                <SendCode
                    onInput={code => {
                        this.setState({ xcode: code })
                    }}
                    xcode={xcode}
                    email={email}
                />
                <button
                    onClick={() => {
                        this.reset()
                    }}
                    disabled={!xcode || re_password !== password}
                    className="mdui-ripple mdui-color-theme mdui-fab mdui-fab-fixed">
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
            username: null,
            password: null,
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
                    remember && setCookie('userInfo', data);
                    sessionStorage.setItem('userInfo', data)
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
                <label style={{ marginRight: '24px' }} className="mdui-float-right mdui-checkbox">
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
        window.titleRef.innerText = '登录/注册'
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
                            text: '忘记密码',
                            id: 'forget',
                            component: <Forget />
                        }
                    ]}
                />
            </div>
        )
    }
}
