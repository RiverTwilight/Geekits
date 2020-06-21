import React from 'react'
import { mutation } from 'mdui'
import Wow from './wow'
import Home from './home'

const Page = props => {
    if (props.page === 'home') return <Home />
    return <Wow />
}

const Nav = ({ page, onPageChange, items }) => (
    <div className="mdui-text-color-theme mdui-bottom-nav-scroll-hide mdui-color-white mdui-bottom-nav">
        {items.map(item => (
            <a
                key={item.name}
                onClick={() => {
                    onPageChange(item.page);
                    window.location.hash = `#${item.page}`
                }}
                className={`mdui-ripple ${(page === item.page) ? "mdui-bottom-nav-active" : ""}`}>
                <i className="mdui-icon material-icons">{item.icon}</i>
                <label>{item.name}</label>
            </a>
        ))}
    </div>
)

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'home'
        }
    }
    componentDidMount() {
        if (window.location.hash) {
            this.setState({ page: /\#(\S+)/.exec(window.location.hash)[1] })
        }
        document.title = '云极客工具';
        window.globalRef.title.innerText = '云极客工具'
        mutation()
    }
    render() {
        return (
            <div className="mdui-col-md-10 mdui-col-sm-12">
                <Page
                    page={this.state.page}
                />
                <Nav
                    page={this.state.page}
                    items={[{
                        name: '收藏',
                        icon: 'favorite',
                        page: 'home'
                    }, {
                        name: '发现',
                        icon: 'apps',
                        page: 'wow'
                    }]}
                    onPageChange={newPage => {
                        this.setState({ page: newPage })
                    }}
                />
            </div>
        )
    }
}
