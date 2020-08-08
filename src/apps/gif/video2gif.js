import React from 'react'
import { mutation, snackbar } from 'mdui'
import GIF from 'gif.js'
import Input from '../../components/Input.tsx'
import FileRead from '../../components/FileReader'

function engine(config, videoRef, callback, loading) {

	var v = videoRef,
		delay = config.delay * 100 || 200,
		gif = new GIF({
			workers: 4,
			quality: 10,
			width: v.videoWidth,
			height: v.videoHeight,
			workerScript: '/gif.worker.js'
		}),
		i,
		readVideo

	v.addEventListener('play', () => {
		i = window.setInterval(() => {
			gif.addFrame(v, {
				copy: true,
				delay: i
			});
		}, delay);

		readVideo = window.setInterval(()=>{
			loading('正在读取视频', v.currentTime / v.duration)
		}, 1000)
	}, false)

	v.addEventListener('ended', () => {
		clearInterval(i)
		clearInterval(readVideo)
		gif.render()
	}, false)

	gif.on('start', (blob) => {
	})

	gif.on('finished', (blob) => {
		var reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onload = e => {
			callback(e.target.result),
			loading('', 0)
		}

	})

	gif.on('progress', p => loading('正在生成GIF', p))

	v.play()
}

//预览图片
const Preview = ({ src }) => {
	if (!src) return null
	return <img alt="预览" height="100%" width='100%' src={src} />
}

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			config: {
				delay: 1
			},
			onConv: false,
			res: null,
			process: 0,
			state: ''
		}
	}
	componentDidUpdate() {
		mutation()
	}
	render() {
		const { file, config, onConv, res, process, state } = this.state;
		return (
			<>
				<video
					style={{ display: 'none' }}
					ref={r => this.videoDom = r}
					src={file}>
				</video>
				<Input
					header="速度(数值越低速度越快，建议使用默认值)"
					value={config.delay}
					onValueChange={newText => {
						this.setState({ config: { delay: newText } })
					}}
					type="number"
				/>
				<FileRead
					fileType="video/*"
					onFileChange={video => {
						this.setState({ file: video })
					}}
				/>
				<br></br>
				<p>{state}</p>
				<div class="mdui-progress" style={{
					display: process === 0 ? 'none' : ''
				}}>
					<div class="mdui-progress-determinate" style={{
						width: `${process * 100}%`
					}}></div>
				</div>
				<button
					className="mdui-fab mdui-fab-fixed mdui-color-theme"
					disabled={onConv}
					onClick={() => {
						this.setState({ onConv: true })
						engine(config, this.videoDom, blob => {
							this.setState({
								onConv: false,
								res: blob
							})
						}, (state, process) => {
							this.setState({
								process: process,
								state: state
							})
						})
					}}>
					<i className="mdui-icon material-icons">&#xe5ca;</i>
				</button>
				<br></br>
				<Preview src={res} />
			</>
		)
	}
}
