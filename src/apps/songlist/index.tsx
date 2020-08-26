import React from 'react'
import mdui from 'mdui'
import axios from '../../utils/axios'
import { Input } from 'mdui-in-react'

//提取url中的id
const url2Id = (url: any) => {
    const pattweb = /id=(\d+)/,
        pattmob = /\/(playlist)\/(\d+)\//,
        pattid = /^\d+$/;

    if (url.search(pattid) !== -1) return url //如果是纯数字(id)

    if (url.search(pattmob) !== -1 || url.search(pattweb) !== -1) {
        if (url.search(pattmob) !== -1) {
            //类似http://music.163.com/playlist/10222067/11720510/?userid=11720510的链接
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return pattmob.exec(url)[2]
        } else {
            //类似https://music.163.com/#/my/m/music/playlist?id=2995734275的链接
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return pattweb.exec(url)[1]
        }
    } else {
        //既不是ID，又不是合法链接
        return false;
    }
}

//提取相同歌曲
const exportSame = (a: any, b: any) => {
    if (!a || !b) return false;
    var num = 0;
    var same: any = [];
    a.forEach((songa: any) => {
        b.forEach((songb: any) => {
            if(songa.name === songb.name){
                same.push(songb);
                num ++
            }
        })
    })
    return { same, num }
}

const Result = (props: any) => {
    if(!props.similar)return null
    window.loadHide()
    return (
        
        <ul className="mdui-list">
            
            <li className="mdui-subheader">对比歌单</li>
            
            <li className="mdui-list-item mdui-ripple">
                
                <i className="mdui-list-item-icon mdui-text-color-red-600 mdui-icon material-icons">queue_music</i>
                
                <div className="mdui-list-item-content">{props.songlistA}</div>
            </li>
            
            <li className="mdui-list-item mdui-ripple">
                
                <i className="mdui-list-item-icon mdui-text-color-red-600 mdui-icon material-icons">queue_music</i>
                
                <div className="mdui-list-item-content">{props.songlistB}</div>
            </li>
            
            <li className="mdui-subheader">有{props.similar.num}首相同歌曲</li>
            {props.similar.same.map((song: any,i: any)=>(
                
                <a target="_blank" href={"https://music.163.com/#/song?id=" + song.id} key={i} className="mdui-list-item mdui-ripple">
                    
                    <i className="mdui-list-item-icon mdui-icon material-icons">audiotrack</i>
                    
                    <div className="mdui-list-item-content">{song.name}</div>
                </a>
            ))}
        </ul>
    );
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            listidA:"https://music.163.com/playlist/10222067/11720510/?userid=11720510",
            listidB:"https://music.163.com/#/my/m/music/playlist?id=2995734275",
            url:'https://v1.hitokoto.cn/nm/playlist/',
            dataA:{
                list:null,
                name:""
            },
            dataB:{
                list:null,
                name:""
            },
            engine:'netease'
        }
    }
    loadCommentsFromServer(url: any, callback: any) {
        if(!url2Id(url)){
            mdui.snackbar({message:'解析链接失败'})
            return
        }
        const listid = url2Id(url);
        window.loadShow()
        axios.get(this.state.url + listid).then(response => {
            var json = JSON.parse(response.request.response);
            callback && callback(json.playlist)
        }).catch(error => {
            mdui.snackbar({
                message: error
            })
            window.loadHide()
        })
    }
    render(){
        const { listidA, listidB, dataA, dataB, engine } = this.state;
        
        return <>
            
            <Input
                onValueChange={newText=>{
                    this.setState({listidA:newText});
                }}
                header="歌单A链接/ID"
                placeholder=""
                icon="attachment"
                value={this.state.listidA}
            />  
            
            <Input
                onValueChange={newText=>{
                    this.setState({listidB:newText});
                }}
                header="歌单B链接/ID"
                placeholder=""
                icon="attachment"
                value={this.state.listidB}
            />      
            
            <select 
                value={engine}
                onChange={e=>{
                    this.setState({engine:e.target.value})
                }}
                className="mdui-select" mdui-select="{position:'top'}"
            >
                
                <option value="normal">网易云音乐</option>
                
                <option disabled value="qq">QQ音乐</option>         
            </select>    
            
            <button 
                onClick={()=>{
                    this.loadCommentsFromServer(listidA,(data: any) => {
                        this.setState({dataA:{
                            list:data.tracks || null,
                            name:data.name || ''
                        }})
                    })
                    this.loadCommentsFromServer(listidB,(data: any) => {
                        this.setState({dataB:{
                            list:data.tracks || null,
                            name:data.name || ''
                        }})
                    })
                }} 
                className="mdui-ripple mdui-color-red-600 mdui-float-right mdui-btn-raised mdui-btn">
                音樂的力量
            </button>
            
            <div className="mdui-clearfix"></div>
            
            <Result
                similar={exportSame(dataA.list,dataB.list)}
                songlistA={dataA.name}
                songlistB={dataB.name}
            />
        </>;
    }
}

export default Ui
