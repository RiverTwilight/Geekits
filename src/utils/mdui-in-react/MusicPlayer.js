import React from 'react'
import PropTypes from 'prop-types'
import mdui from 'mdui'
import RangeInput from './RangeInput'

/**
  *音乐播放器组件
  **/

/***必须要class组件，因为需要用到Ref***/
class MusicPlayer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onPlay:false,
			playProgress:0,
		}
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.audio) {
			var {
				audioDom
			} = this.refs;
			audioDom.load();
			audioDom.addEventListener('play', () => {
				this.setState({
					audioLength: Math.round(audioDom.duration)//设置音频总长度
				})
				window.progress = setInterval(() => {
					this.setState({
						playProgress: audioDom.currentTime
					})
					mdui.updateSliders()//调整滑块长度
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
		const { audio } = this.props;
		const { onPlay, playProgress, audioLength } = this.state
		const { audioDom } = this.refs 
		return(
			<React.Fragment>
				<div className="mdui-card mdui-p-a-1">
				<h3 className="mdui-typo-title">{this.props.title}</h3>
					<RangeInput 
					    value={String(playProgress)}
						min="0" max={String(audioLength)}
						onValueChange={newValue=>{
							this.setState({playProgress:newValue})
							audioDom.currentTime = newValue
						}}
				    />	
				    <center>
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
							    <i className="mdui-icon material-icons">{(onPlay)?'pause':'play_arrow'}</i>
							</button>
						    <button
							    type="button" 
							    onClick={()=>window.open(audio)}
							    className="mdui-btn">
							    <i className="mdui-icon material-icons">file_download</i>
							</button>
						</div>
					</center>
				   	<audio ref="audioDom" style={{display:'none'}} controls="controls">
					    <source src={this.props.audio} type="audio/mpeg"/>
					    Your browser does not support the audio tag.
					</audio>
			    </div>
			</React.Fragment>
		)
	}
}

MusicPlayer.defaultProps = {

}

MusicPlayer.propTypes={

}

export default MusicPlayer