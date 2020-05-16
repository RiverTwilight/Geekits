import React from 'react'

export class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recorder:undefined,
            onRecord:false,
            finished:false
        }
    }
    async record(){
        const video = this.refs.video
        let recorder
        let captureStream

        try {
            captureStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                // audio: true,   not support
                cursor: 'always'
            })
        } catch (e) {
            return
        }

        window.URL.revokeObjectURL(video.src)

        video.autoplay = true
        video.srcObject = captureStream

        recorder = new MediaRecorder(captureStream)
        recorder.start()
        this.setState({onRecord:true})

        captureStream.getVideoTracks()[0].onended = () => {
            recorder.stop()
        }

        recorder.addEventListener("dataavailable", event => {
            let videoUrl = URL.createObjectURL(event.data, {
                type: 'video/ogg'
            })
            video.srcObject = null
            video.src = videoUrl
            video.autoplay = false
        })
        this.setState({recorder:recorder})
    }
    stop(){
        const { recorder } = this.state;
        const video = this.refs.video
        let tracks = video.srcObject.getTracks()
        tracks.forEach(track => track.stop())
        recorder.stop()
        this.setState({onRecord:false})
    }
    download(){
        const url = this.refs.video.src
        const name = new Date().toISOString().slice(0, 19).replace('T', ' ').replace(" ", "_").replace(/:/g, "-")
        const a = document.createElement('a')

        a.style = 'display: none'
        a.download = `${name}.ogg`
        a.href = url

        document.body.appendChild(a)

        a.click()
    }
    render(){
        const { onRecord, finished } = this.state
        return (
            <>    
                <video ref="video" className="mdui-video-fluid" controls>
                    <source type="video/ogg"/>
                </video>     
                <br></br> 
                <div className="mdui-row-xs-2">
                    <div className="mdui-col">                   
                    <button 
                        onClick={()=>{
                            if(!onRecord){
                                this.record()
                            }else{
                                this.stop()
                            }
                        }} 
                        className="mdui-btn-block mdui-color-theme mdui-ripple mdui-btn-raised mdui-btn">
                        {(!onRecord)?"录制":"停止"}
                    </button>
                    </div>
                    <div className="mdui-col">
                        <button 
                            onClick={()=>{
                                this.download()
                            }} 
                            disabled={onRecord}
                            className="mdui-btn-block mdui-color-theme mdui-ripple mdui-btn-raised mdui-btn">
                            下载
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
