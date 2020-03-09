import React from 'react'
import mdui from 'mdui'

import Drawer from './drawer'

//将一言添加到便签
const addSaying2Fiv = saying => {
    var content = `  <br>${saying.say}  ———来自 ${saying.from}`
    var today = new Date()   
    var newNote = {
        title: '一言收藏',
        content: content,
        tags: 'a b c',
        date: today.toLocaleString()
    }
    if (localStorage.note) {
        var notes = JSON.parse(localStorage.note);
        var hasNote = false;
        notes.map(note => {
            if (note.title === '一言收藏') hasNote = true
        })
        if (hasNote) {
            for (let i = 0; i <= notes.length; i++) {
                var note = notes[i];
                if (note && note.title === '一言收藏') {
                    note.content += content;
                    note.date = today.toLocaleString()
                }
            }
        } else {
            notes.push(newNote)
        }
    } else {
        notes = [newNote]
    }
    localStorage.setItem('note', JSON.stringify(notes))
}

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title:props.title,
            searchResult:'',
            kwd:'',//用于传给结果组件的百度搜索,
            saying:{
                say:'即使与全世界为敌，我也要保护她和她所在的世界',
                from:'《魔法禁书目录》'
            }
        }
    } 
    loadSaying(){
        const { hitokotoTopic } = localStorage;
        const url = (!hitokotoTopic)?"":`?topic=${hitokotoTopic}`       
        fetch('https://api.ygktool.cn/api/hitokoto' + url)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    saying:{
                        say:json.hitokoto,
                        from:json.from
                    }
                })
            })
    }
    componentDidMount(){
        this.loadSaying()
        this.props.getRef(this.headerTitle);//将ref传给父组件，方便修改标题       
    }
    render(){
        const { saying, title } = this.state
        return (
            <React.Fragment>
                <Drawer drawerBtn={this.refs.drawerBtn}/> 
                <header className="header mdui-appbar mdui-appbar-fixed">
                    <div className="mdui-appbar">
                        <div className="mdui-toolbar mdui-color-theme">
                            <button 
                                onClick={()=>window.leftDrawer.toggle()}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                <i className="mdui-icon material-icons">menu</i>
                            </button>
                            <a
                                onClick={()=>{
                                    mdui.confirm(
                                        `${saying.say}<br>来自：${saying.from}`,
                                        '一言',
                                        () => {
                                            addSaying2Fiv(saying);
                                            mdui.snackbar({
                                                message:'已收藏至便签',
                                                buttonText: '打开便签',
                                                onButtonClick: () => {
                                                    window.location.href = "/apps/note"
                                                }
                                            })
                                        },
                                        () => {
                                            this.loadSaying()
                                        },{
                                            history:false,
                                            confirmText:'收藏',
                                            cancelText:'刷新'
                                        }
                                    )
                                }}
                            >
                            <div 
                                ref={r => this.headerTitle = r}
                                className="mdui-typo-title mdui-text-color-white header-width-saying"
                            >
                            {title || '云极客工具'}                               
                            </div>
                            <span className="mdui-typo-caption-opacity mdui-text-truncate saying mdui-text-color-white">{saying.say}</span>
                            </a>
                            <div className="mdui-toolbar-spacer"></div>
                        </div>
                    </div>        
                </header>
            </React.Fragment>
        )
    }  
}

export default Header