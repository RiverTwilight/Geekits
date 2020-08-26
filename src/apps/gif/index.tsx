import React from 'react'
import GIF from 'gif.js'
import { FileInput, BottomAlert } from 'mdui-in-react'

type FormComp = {
    name: string,
    value: any
}

/**
 * 配置表单
 * @todo 独立表单组件
 */

class Setting extends React.Component<{
    saveConfig(config: gifConfig): void
}, {
    form: FormComp[]
}> {
    constructor(props: {
    saveConfig(config: gifConfig): void;
}) {
        super(props);
        this.state = {
            form: [{
                name: '高度（留空则自适应）',
                value: ""
            }, {
                name: '宽度（留空则自适应）',
                value: ""
            }, {
                name: '质量（数值越低质量越好）',
                value: "10"
            }, {
                name: '每一帧间隔（秒）',
                value: "1"
            }],
        }
    }
    onValueChange(i: number, value: string | number) {
        var { form } = this.state;
        form[i].value = value;
        this.setState({ form: form })
    }
    render() {
        const { form } = this.state;
        const { saveConfig } = this.props;
        return (
            
            <>
                
                <div className="mdui-dialog-content">{
                    form.map((a, i) => (
                        
                        <div key={i} className="mdui-textfield">
                            
                            <label className="mdui-textfield-label">{a.name}</label>
                            
                            <input
                                value={a.value}
                                onChange={e => {
                                    this.onValueChange(i, e.target.value)
                                }}
                                className="mdui-textfield-input" type="number"
                            />
                        </div>
                    ))
                }</div>
                
                <div className="mdui-dialog-actions">
                    
                    <button
                        onClick={() => {
                            const data: gifConfig = {
                                height: (form[0].value === "") ? null : form[0].value,
                                width: (form[1].value === "") ? null : form[1].value,
                                quality: form[2].value,
                                delay: parseFloat(form[3].value)
                            }
                            saveConfig(data);
                        }}
                        className="mdui-btn mdui-ripple">保存</button>
                </div>
            </>
        )
    }
}

// 预览相册组件
const Alubm = (
    { assets, onDelete }: { onDelete(index: number): void, assets: Array<string> }) => {
    if (!assets) return null
    return (
        
        <div className="mdui-row-xs-3">{
            assets.map((a: string, i: number) => (
                
                <div className="mdui-card mdui-col">
                    
                    <div key={i} className="mdui-card-media mdui-center">
                        
                        <img width="100" height="120" src={a} />
                        
                        <div className="mdui-card-menu">
                            
                            <button
                                style={{ background: 'rgba(0, 0, 0, 0.27)' }}
                                onClick={() => {
                                    onDelete(i)
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-white">
                                
                                <i className="mdui-icon material-icons">close</i>
                            </button>
                        </div>
                    </div>
                </div>
            ))
        }</div>
    )
}

interface gifConfig {
    delay: number
    workers?: number,
    quality?: number,
    width?: string | number | null,
    height?: string | number | null
}

type ILoading = (state: string, process: number) => void;

function video2gif(
    src: string,
    config: gifConfig,
    callback: (res: any) => void,
    loading: ILoading,
    videoDom: any
): void {

    var v = videoDom;
    v.volume = 0;

    var gif: any, i: number, readVideo: number

    gif = new GIF({
        workers: 4,
        quality: config.quality || 10,
        width: config.width || v.videoWidth,
        height: config.height || v.videoHeight,
        workerScript: '/gif.worker.js'
    });

    console.log(gif)

    gif.on('finished', (blob: Blob) => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = e => {
            e.target && callback(e.target.result);
            loading('', 0)
        }
    })

    gif.on('start', function (b: any) { console.log(b) })

    gif.on('progress', (p: number) => {
        loading('正在生成GIF', p)
    })

    v.addEventListener('play', () => {
        i = window.setInterval(() => {
            gif.addFrame(v, {
                copy: true,
                delay: i 
            });
            console.log(gif)
        }, config.delay * 1000 || 1000);

        readVideo = window.setInterval(() => {
            loading('正在读取视频', v.currentTime / v.duration)
        }, 1000)

    }, false)

    v.addEventListener('ended', () => {
        clearInterval(i)
        clearInterval(readVideo)
        gif.render()
    }, false)

    v.play()
}

function img2gif(assets: Array<string>, config: gifConfig, callback: { (res: any): void; (arg0: string): void; }, loading: ILoading) {
    var image = new Image(); //载入图片获取真实尺寸
    image.src = assets[0];
    image.onload = function () {
        const { height, width, quality, delay } = config;

        console.table({
            delay: delay,
            height: height,
            width: width,
            quality: quality,
        })

        var gif = new GIF({
            workers: 2,
            quality: quality,
            height: height,
            width: width,
            workerScript: '/gif.worker.js'
        })

        assets.map((src: string) => {
            let img = document.createElement('img');
            img.src = src;
            gif.addFrame(img, {
                delay: delay
            })
        })

        gif.on('finished', function (blob: any) {
            console.log(blob)
            callback(URL.createObjectURL(blob));
            loading('', 0)
        })

        gif.on('progress', (p: number) => loading('正在生成GIF', p))

        gif.render();
    }
}

const Preview = ({ src }: { src?: string }) => {
    if (!src) return null
    
    return <img alt="预览" className="mdui-img-fluid" src={src} />
}

export default class extends React.Component<{}, {
    assets: Array<string>,
    config: gifConfig,
    videoFile: string,
    state: string,
    type: 'image' | 'video',
    process: number,
    res?: string,
    openConfigPanel: boolean
}> {
    videoDom: any
    constructor(props: {}) {
        super(props);
        this.state = {
            assets: [],
            videoFile: "",
            type: 'image',
            config: {
                height: null,
                width: null,
                quality: 10,
                delay: 0.1
            },
            state: "",
            process: 0,
            openConfigPanel: false
        }
    }
    render() {
        const { state, process, type, videoFile, assets, config, res, openConfigPanel } = this.state;
        return (
            
            <>
                
                <Alubm
                    assets={assets}
                    onDelete={i => {
                        assets.splice(i, 1);
                        this.setState({ assets: assets })
                    }}
                />
                
                <br></br>
                
                <FileInput
                    title="选择照片"
                    fileType="image/*"
                    multiple={true}
                    onFileChange={file => {
                        file && assets.push(file)
                        this.setState({
                            assets: assets,
                            type: 'image'
                        })
                    }}
                />
                
                <span className="mdui-p-a-1">或者</span>
                
                <FileInput
                    title="选择视频"
                    fileType="video/*"
                    multiple={true}
                    onFileChange={(file) => {
                        file && this.setState({ videoFile: file, type: 'video' })
                    }}
                />
                
                <button
                    onClick={() => {
                        this.setState({ openConfigPanel: !openConfigPanel })
                    }}
                    className="mdui-btn mdui-btn-icon "
                >
                    
                    <i className="mdui-icon material-icons">&#xe8b8;</i>
	            </button>
                
                <br></br>
                
                <p>{state}</p>
                
                <div className="mdui-progress" style={{
                    display: process === 0 ? 'none' : ''
                }}>
                    
                    <div className="mdui-progress-determinate" style={{
                        width: `${process * 100}%`
                    }}></div>
                </div>
                
                <br></br><br></br>
                
                <Preview src={res} />
                
                <button
                    className="mdui-fab mdui-fab-fixed mdui-color-theme"
                    onClick={() => {
                        if (type === 'image') {
                            img2gif(assets, config, (res: any) => {
                                this.setState({
                                    res: res
                                })
                            }, (state, process) => {
                                this.setState({
                                    state,
                                    process,
                                })
                            })
                        } else if (type === 'video') {
                            video2gif(videoFile, config, (res) => {
                                this.setState({
                                    res: res
                                })
                            }, (state, process) => {
                                console.log(process)
                                this.setState({
                                    state,
                                    process,
                                })
                            }, this.videoDom)
                        }
                    }}>
                    
                    <i className="mdui-icon material-icons">&#xe5ca;</i>
                </button>
                
                <BottomAlert
                    title="配置"
                    ifShow={openConfigPanel}
                    onClose={() => {
                        this.setState({ openConfigPanel: false })
                    }}
                >
                    
                    <Setting
                        saveConfig={config => {
                            this.setState({
                                config: config,
                                openConfigPanel: false
                            })
                        }}
                    />
                </BottomAlert>
                
                <video
                    style={{ display: 'none' }}
                    ref={r => this.videoDom = r}
                    src={videoFile}>
                </video>
            </>
        )
    }
}
