import React from 'react'
import { Input, RangeInput, ListControlMenu, MusicPlayer } from 'mdui-in-react'
import Axios from '../../utils/axios'

const VOICE_SOURCE = [{
	name: '度小宇',
	value: '1'
}, {
	name: '度小美',
	value: '0'
}, {
	name: '度逍遥',
	value: '3'
}, {
	name: '度丫丫',
	value: '4'
}, {
	name: '度博文',
	value: '106'
}, {
	name: '度小童',
	value: '110'
}, {
	name: '度小萌',
	value: '111'
}, {
	name: '度米朵',
	value: '103'
}, {
	name: '度小娇',
	value: '5'
}]

type State = any;

export default class extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			options: {
				text: '',
				spd: "5", //语速
				pit: "5", //音调
				vol: "5", //音量
				per: "0"
			},
			res: null
		}
	}
	loadDataFromSever() {
		window.loadShow()
		Axios.post('/api/tts', this.state.options)
			.then(response => {
				var json = JSON.parse(response.request.response);
				var buf = Buffer.from(json.data.data, 'binary')
				var blob = new Blob([buf], {
					type: 'audio/mpeg'
				});
				//var file = new File([blob], '1.mp3', {type: 'audio/mpeg', lastModified: Date.now()});
				var ourl = URL.createObjectURL(blob);
				this.setState({
					res: ourl
				})
			}).then(() => window.loadHide())
	}
	render() {
		const { options, res } = this.state
		return (

			<>

				<Input
					onValueChange={newText => {
						options.text = newText;
						this.setState({ options: options })
					}}
					header="输入文本"
					value={options.text}
					rows={3}
					// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
					maxLength="500"
				/>

				<div className="mdui-shadow-1 mdui-card mdui-p-a-1">

					<ListControlMenu
						icon="record_voice_over"
						title="声线"
						checked={options.per}
						onCheckedChange={checked => {
							options.per = checked;
							this.setState({ options: options })
						}}
						items={VOICE_SOURCE}
					/>

					<RangeInput
						value={options.vol}
						min="1" max="10"
						onValueChange={newValue => {
							options.vol = newValue;
							this.setState({ options: options })
						}}
						title={"音量：" + options.vol}
					/>

					<RangeInput
						value={options.pit}
						min="1" max="10"
						onValueChange={newValue => {
							options.pit = newValue;
							this.setState({ options: options })
						}}
						title={"音调：" + options.pit}
					/>

					<RangeInput
						value={options.spd}
						min="1" max="10"
						onValueChange={newValue => {
							options.spd = newValue;
							this.setState({ options: options })
						}}
						title={"语速：" + options.spd}
					/>
				</div>

				<button
// @ts-expect-error ts-migrate(2339) FIXME: Property 'loadBtn' does not exist on type 'default... Remove this comment to see the full error message
					ref={r => this.loadBtn = r}
					onClick={() => {
						if (options.text === "") return
						this.loadDataFromSever()
					}}
					className="mdui-color-theme loadBtn mdui-fab mdui-fab-fixed"
				>

					<i className="mdui-icon material-icons">mic</i>
				</button>

				<br></br>

				<span style={{ display: res === null ? 'none' : 'block' }}>

					<MusicPlayer
						title="合成结果"
						audio={res}
					/>
				</span>
			</>
		)
	}
}
