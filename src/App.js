import React from 'react'
import './App.css'
import mdui from 'mdui'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import '../node_modules/mdui/dist/css/mdui.min.css'

//Public 

import Header from './layout/header'

//异步加载插件
import loadable from './utils/loading'

//异步组件
const Home = loadable(() => import('./pages/home'))
const Apps = loadable(() => import('./pages/app'))
const About = loadable(() => import('./pages/about'))
const Setting = loadable(() => import('./pages/setting'))
const User = loadable(() => import('./pages/user'))
const Feedback = loadable(() => import('./pages/feedback'))

const NoMatch = () => {
    return (
        <div style={{marginTop:'100px'}}>
            <center>
                <h1>
                    <i 
                        class="nologin mdui-list-item-icon mdui-icon material-icons mdui-text-color-grey">
                        close
                    </i>
                    魔法名：404 Not Found
                </h1>
                <Link to="/" class="mdui-color-theme mdui-btn mdui-btn-raised">返回首页</Link>
                <p>
                据说在第三次科技革命之前，互联网的形态就是一个大型的中央数据库，
                这个数据库就设置在404房间里面。那时候所有的请求都是由人工手动完成的，
                如果在数据库中没有找到请求者所需要的文件，或者由于请求者写错了文件编号，
                用户就会得到一个返回信息：room 404 : file not found。后来互联网兴起后，
                人们也就习惯了用404作为服务器未找到文件的错误代码了。
                当然实际考证传说中的room 404是不存在的。
                </p>
            </center>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { loading } = this.refs
        window.loadShow = ()=> loading.style.display = 'inline-block';
        window.loadHide = ()=> loading.style.display = 'none';
    }
    render(){
        return(
            <Router>  
                <div style={{display:'none'}} ref="loading" class="mdui-progress">
                    <div class="mdui-progress-indeterminate"></div>
                </div>  
                <Header 
                    getRef={ref=>{
                        window.titleRef = ref
                    }}
                />
                <br></br>      
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/user" component={User}></Route>
                    <Route path="/about" component={About} ></Route>
                    <Route path="/setting" component={Setting}></Route>
                    <Route path="/apps/:name" component={Apps}></Route>
                    <Route path="/feedback" component={Feedback}></Route>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default App;