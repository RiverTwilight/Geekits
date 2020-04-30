import * as React from 'react'
import { updateSliders } from 'mdui'
import { MusicProps, MusicState } from './types/development'
import RangeInput from './RangeInput'

/**
  *音乐播放器组件
  **/

 declare global {
    interface Window {
        progress: any;
    }
}

/**
 * 必须要class组件，因为需要用到Ref
 * */

export default class MusicPlayer extends React.Component<MusicProps, MusicState> {
    audioDom: any;
    constructor(props: any) {
        super(props);
        this.state = {
            onPlay:false,
            playProgress:0,
            audioLength:2000
        }
    }
    componentWillReceiveProps(nextProps: { audio: any; }) {
        if (nextProps.audio) {
            var {
                audioDom
            } = this;           
            audioDom.addEventListener('loadedmetadata', () => {
                this.setState({
                    audioLength: Math.round(audioDom.duration)//设置音频总长度             
                },()=> updateSliders())
            })
            audioDom.load();
            audioDom.addEventListener('play', () => {
                window.progress = setInterval(() => {
                    this.setState({
                        playProgress: audioDom.currentTime
                    })
                     updateSliders()//调整滑块长度
                }, 100)
            })
            audioDom.addEventListener('ended', () => {
                clearInterval(window.progress)
                this.setState({
                    onPlay: false
                })
            })
        }
    }
    render(){
        const { 
            audio, 
            title = "音频播放器", 
            subtitle, 
            cover = "https://s4.music.126.net/style/web2/img/default/default_album.jpg", 
            ...other } = this.props;
        const { onPlay, playProgress, audioLength } = this.state
        const { audioDom } = this
        return(
            <React.Fragment>
                <div style={{
                    maxWidth:'500px'
                }} className="mdui-card mdui-p-l-3">
                    <div className="mdui-row mdui-row-gapless">
                        <div className="mdui-col-xs-8 mdui-p-t-1">
                            <div className="mdui-typo-headline">{title}</div>
                            {subtitle &&
                                <div className="mdui-typo-subheading-opacity">{subtitle}</div>
                            }
                            <RangeInput 
                                value={String(playProgress)}
                                title=""
                                min="0" max={String(audioLength)}
                                onValueChange={newValue=>{
                                    this.setState({playProgress: parseInt(newValue)})
                                    audioDom.currentTime = newValue
                                }}
                            />  
                            <div className="center">
                                <div className="mdui-btn-group">
                                    <button 
                                        onClick={()=>{
                                            if (onPlay) {
                                                audioDom.pause();
                                                this.setState({
                                                    onPlay: false
                                                })
                                            } else {
                                                audioDom.play();
                                                this.setState({
                                                    onPlay: true
                                                })
                                            }
                                        }}
                                        type="button" className="mdui-btn">
                                        <i className="mdui-icon material-icons">
                                            {onPlay?'pause':'play_arrow'}
                                        </i>
                                    </button>
                                    <a rel="noopener noreferrer" target="_blank" href={audio} download>
                                        <button
                                            type="button" 
                                            className="mdui-btn">
                                            <i className="mdui-icon material-icons">file_download</i>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            height:(window.innerWidth) >= 1024 ? '160px': "130px"
                        }} className="mdui-col-xs-4">
                            <img style={{
                                width:'100%',
                                height:'100%'
                            }} alt="cover" src={cover}></img>
                    </div>
                </div>
                    <audio 
                        {...other} ref={r => this.audioDom = r} 
                        style={{display:'none'}} controls={true}
                    >
                        <source src={audio} type="audio/mpeg"/>
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            </React.Fragment>
        )
    }
}
