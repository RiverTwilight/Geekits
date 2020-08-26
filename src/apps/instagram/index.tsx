import React from "react";
import ClipboardJS from "clipboard";
import { snackbar } from "mdui";
import Template from "../../utils/AskForTemplate";

class Result extends React.Component {
	componentDidMount() {
		var clipboard = new ClipboardJS("#input");
		clipboard.on("success", (e) => {
			snackbar({ message: "已复制" });
			e.clearSelection();
		});
	}
	render() {
		// @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
		const { data } = this.props;
		if (!data) return null;
		var src = data.url;
		return (
			<>
				<div
					id="input"
					data-clipboard-text={src}
					className="mdui-textfield"
				>
					<label className="mdui-textfield-label">点击即可复制</label>

					<input
						disabled={true}
						value={src}
						className="mdui-textfield-input"
						type="text"
					/>
				</div>

				<img alt="预览封面" src={src} className="mdui-img-fluid" />
			</>
		);
	}
}

export default () => (
	<Template
		Result={Result}
		api="/api/instagram?type=0&url="
		inputOpt={{
			header: "输入Instagram图片链接",
			icon: "link",
		}}
		btnText="获取"
	/>
);
