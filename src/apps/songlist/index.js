import React from 'react'
import mdui from 'mdui'
import axios from 'axios'

//提取url中的id
const url2Id = url => {
    const pattweb = /id=(\d+)/,
        pattmob = /\/(playlist)\/(\d+)\//,
        pattid = /^\d+$/;

    if (url.search(pattid) !== -1) return url //如果是纯数字(id)

    if (url.search(pattmob) !== -1 || url.search(pattweb) !== -1) {
        if (url.search(pattmob) !== -1) {
            //类似http://music.163.com/playlist/10222067/11720510/?userid=11720510的链接
            return pattmob.exec(url)[2]
        } else {
            //类似https://music.163.com/#/my/m/music/playlist?id=2995734275的链接
            return pattweb.exec(url)[1]
        }
    } else {
        //既不是ID，又不是合法链接
        return false;
    }
}

//提取相同歌曲
const exportSame = (a,b) =>{

}

const Result = props =>{
    //var songs = props.songlist.map((a,i)=>{

    //})
    return null
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listidA:32211954,
            listidB:0,
            url:'http://api.ygktool.cn/api/bilibili?av=',
            dataA:[],
            dataB:[]
        }
    }
    componentWillMount(){
    }
    loadCommentsFromServer(callback){
        this.refs.load.style.display = 'block'
        axios.get(this.state.url + this.state.av).then(response =>{
            var json = JSON.parse(response.request.response);
            callback &&　callback(json)       
        }).catch(error => {
            mdui.snackbar({message:error})
        }).then(()=>{
            this.refs.load.style.display = 'none'
        })
    }
    render(){
        const { listidA, listidB, dataA, dataB } = this.state;
        return (
        <React.Fragment>
            <div ref="load" style={{display:'none',position:'absolute',top:'0'}} className="mdui-progress">
                <div className="mdui-progress-indeterminate"></div>
            </div>
            <div className="mdui-textfield mdui-textfield-floating-label">
                <i className="mdui-icon material-icons">link</i>
                <label className="mdui-textfield-label">歌单A的id/链接</label>
                <input 
                    onChange={e=>{
                        this.setState({av:e.target.value})
                    }} 
                    value={listidA}
                    autoFocus={true} type="text" className="mdui-textfield-input">
                </input>
            </div>  
            <div className="mdui-textfield mdui-textfield-floating-label">
                <i className="mdui-icon material-icons">link</i>
                <label className="mdui-textfield-label">歌单B的id/链接</label>
                <input 
                    onChange={e=>{
                        this.setState({av:e.target.value})
                    }} 
                    value={listidB}
                    autoFocus={true} type="text" className="mdui-textfield-input">
                </input>
            </div>           
            <button 
                onClick={()=>{
                    this.loadCommentsFromServer()
                }} 
                className="mdui-ripple mdui-color-red-600 mdui-float-right mdui-btn-raised mdui-btn">
                音樂的力量
            </button>
            <div className="mdui-clearfix"></div>
            <Result songlist={exportSame(dataA,dataB)}/>
        </React.Fragment>
    )
    }
}

export default ()=><Ui />;

/*
var netease = {
    decodeUnicode: function(str) {
        str = str.replace(/\\/g, "%");
        return unescape(str)
    }
    request: function(id, callback) {
        $.ajax({
            url: "/tools/163_similardegree/run.php",
            type: "POST",
            dataType: "JSON",
            timeout: 15000,
            data: {
                "id": id
            },
            beforeSend: () => {
                $(".main-load").show()
            },
            success: (result) => {
                $(".main-load").hide();
                callback && callback(result)
                //$(".back").append('<a href="https://music.163.com/#/song?id='+result[count-1][i]+'"><li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-icon mdui-icon material-icons">music_note</i><div class="mdui-list-item-content">' + result[i] + '</div></li></a>')                           
            },
            error: () => {
                $(".main-load").hide();
                mdui.snackbar({
                    message:'请求超时，请重试'
                })
            }
        })
    },
    start: function(mode) {
        $(".back").html('');

        var list_A = $("#list_a").val()
          , list_B = $("#list_b").val();

        if (!list_A || !list_B) {
            mdui.snackbar({
                message: '请输入ID或链接'
            });
        } else {

            var a = this.url2id(list_A)
              , b = this.url2id(list_B);
            if (!a || !b) {
                mdui.snackbar({
                    message: '暂不支持这种链接，请尝试输入ID或使用其他客户端分享'
                });
            } else {
                if (a == b) {
                    mdui.snackbar({
                        message: '两个歌单的ID不能相同<(￣︶￣)>'
                    });
                } else {
                    console.log("歌单Aid:" + a);
                    console.log("歌单Bid:" + b);
                    netease.request(a, function(result_a) {
                        console.log(result_a);
                        const list_a = result_a['Body'];  
                        const total = list_a.length;                   
                        if (list_a !== null) {
                            netease.request(b, function(result_b) {
                                console.log(result_b);                               
                                var list_b = result_b['Body'];
                                if (list_b == null) {
                                    mdui.snackbar({
                                        message: '未找到歌单B信息'
                                    })
                                }else{
                                    var degree = 0;
                                    for (var i = list_b.length - 1; i >= 0; i--) {
                                        for (var x = list_a.length - 1; x >= 0; x--) {
                                            if(list_a[x]['id'] == list_b[i]['id']){
                                                degree += 1;
                                                $(".back").append('<a target="_blank"href="https://music.163.com/#/song?id='+list_b[i]['id']+'"><li class="mdui-list-item mdui-ripple"><i class="mdui-list-item-icon mdui-icon material-icons">music_note</i><div class="mdui-list-item-content">' + list_b[i]['title'] + '</div></li></a>')                           
                                            }
                                        }
                                    }
                                    console.log(degree);
                                    $(".back").prepend("共有"+degree+"首歌曲相似,相似度为"+Math.round((degree/total)*100)+"%")
                                }

                            })
                        } else {
                            mdui.snackbar({
                                message: '未找到歌单A信息'
                            })
                        }

                    })
                }
            }
        }
        //判断ID是否输入
    }

}

$('#list_a,#list_b').bind('keyup', function(event) {
    if (event.keyCode == "13") {
        //回车执行查询
        netease.start()
    }
});*/