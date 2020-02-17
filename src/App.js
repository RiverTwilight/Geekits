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

const NoMatch = ()=>{
  return <center><h1>魔法名：404 Not Found<br></br>上琴一生推</h1></center>
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Router>     
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
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}

export default App;