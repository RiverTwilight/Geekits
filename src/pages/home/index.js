import React from 'react'
import mdui from 'mdui'

//Pages
import Wow from './wow'
import Home from './home'

const Page = props => {
  if(props.page === 'home')return <Home />
  return <Wow />
}

function Nav(props){
    const items = [{
        name:'收藏',
        icon:'favorite',
        page:'home'
    },{
        name:'发现',
        icon:'apps',
        page:'wow'
    }].map((a,i)=>{
        return(
            <a 
                onClick={()=>{
                    props.onPageChange(a.page);
                    window.location.hash = `#${a.page}`
                }}
                className={`mdui-ripple ${(props.page === a.page)?"mdui-bottom-nav-active":null}`}>
                <i className="mdui-icon material-icons">{a.icon}</i>
                <label>{a.name}</label>
            </a>
        )
    })
    return(
        <div className="mdui-text-color-theme mdui-bottom-nav-scroll-hide mdui-color-white mdui-bottom-nav">
            {items}
        </div>
    )
}

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:'home'
        }
    }
    componentDidMount(){
        if(window.location.hash){
            this.setState({page:/\#(\S+)/.exec(window.location.hash)[1]})
        }     
        mdui.mutation()
    }
    render(){
        window.titleRef.innerText = '云极客工具'
        return(  
          <React.Fragment>
            <Page
              page={this.state.page}
            />
            <Nav
                page={this.state.page}
                onPageChange={newPage=>{
                   this.setState({page:newPage})
                }}
            />
          </React.Fragment>
        )
    }
}

export default ()=><Index />;