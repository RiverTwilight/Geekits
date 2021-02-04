import React from "react";
import Dialog from "../components/Dialog";

class Feedback extends React.Component<{}, {}> {
	constructor(props: any) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<>
				<div className="mdui-dialog-content">反馈功能开发中</div>
			</>
		);
	}
}

// TODO 快捷反馈

const FeedbackComp = (props: any) => {
	return (
		<Dialog
			config={{
				title: "反馈",
				confirmText: "登录/注册",
				cancelText: "忘记密码 ",
			}}
			{...props}
		>
			<Feedback />
		</Dialog>
	);
};

export default FeedbackComp;
