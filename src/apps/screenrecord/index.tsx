import React from 'react'

type State = any;

export default class extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            recorder:undefined,
            onRecord:false,
            finished:false
        }
    }
    async record(){
        const video = this.refs.video
        let recorder: any
        let captureStream

        try {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'getDisplayMedia' does not exist on type ... Remove this comment to see the full error message
            captureStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                // audio: true,   not support
                cursor: 'always'
            })
        } catch (e) {
            return
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Component<a... Remove this comment to see the full error message
        window.URL.revokeObjectURL(video.src)

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'autoplay' does not exist on type 'Compon... Remove this comment to see the full error message
        video.autoplay = true
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'srcObject' does not exist on type 'Compo... Remove this comment to see the full error message
        video.srcObject = captureStream

        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'MediaRecorder'.
        recorder = new MediaRecorder(captureStream)
        recorder.start()
        this.setState({onRecord:true})

        captureStream.getVideoTracks()[0].onended = () => {
            recorder.stop()
        }

        recorder.addEventListener("dataavailable", (event: any) => {
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 2.
            let videoUrl = URL.createObjectURL(event.data, {
                type: 'video/ogg'
            })
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'srcObject' does not exist on type 'Compo... Remove this comment to see the full error message
            video.srcObject = null
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Component<a... Remove this comment to see the full error message
            video.src = videoUrl
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'autoplay' does not exist on type 'Compon... Remove this comment to see the full error message
            video.autoplay = false
        })
        this.setState({recorder:recorder})
    }
    stop(){
        const { recorder } = this.state;
        const video = this.refs.video
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'srcObject' does not exist on type 'Compo... Remove this comment to see the full error message
        let tracks = video.srcObject.getTracks()
        tracks.forEach((track: any) => track.stop())
        recorder.stop()
        this.setState({onRecord:false})
    }
    download(){
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type 'Component<a... Remove this comment to see the full error message
        const url = this.refs.video.src
        const name = new Date().toISOString().slice(0, 19).replace('T', ' ').replace(" ", "_").replace(/:/g, "-")
        const a = document.createElement('a')

        // @ts-expect-error ts-migrate(2540) FIXME: Cannot assign to 'style' because it is a read-only... Remove this comment to see the full error message
        a.style = 'display: none'
        a.download = `${name}.ogg`
        a.href = url

        document.body.appendChild(a)

        a.click()
    }
    render(){
        const { onRecord, finished } = this.state
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>    
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <video ref="video" className="mdui-video-fluid" controls>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <source type="video/ogg"/>
                </video>     
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <br></br> 
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-row-xs-2">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">                   
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
