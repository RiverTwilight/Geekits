import React from "react";
import FileInput from "../../components/FileInput";


// TODO 种子转磁链

type State = any;

class Torrent2Magnet extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = {
			file: null,
			res: null,
		};
	}
	render() {
		const { file, res} = this.state;
		return (
			<>
				<div className="center-with-flex">
					<FileInput
						readbydrag
						fileType="application/x-bittorrent"
						handleFileUpload={(data, file) => {
							this.setState({
								file: data,
								// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
								type: file.type,
							});
						}}
						maxWidth="200px"
					/>
				</div>

				<button
					onClick={() => {

					}}
					disabled={file === null}
					className="mdui-fab mdui-color-theme mdui-fab-fixed"
				>
					<i className="mdui-icon material-icons">check</i>
				</button>

				<img alt="处理结果" src={res} className="mdui-img-fluid" />
			</>
		);
	}
}

export default Torrent2Magnet;
