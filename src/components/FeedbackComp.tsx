import React, { useState } from "react";
import Dialog from "./Dialog";
import { Input, Button } from "mdui-in-react";
import html2canvas from "html2canvas";

const Feedback = () => {
	const [text, setText] = useState("");
	const [img, setImg] = useState("");
	const catchScreenshot = () => {
		let target = document.body;
		target &&
			html2canvas(target, {
				ignoreElements: (ele) => {
					return (
						ele.classList.contains("mdui-overlay") ||
						ele.id === "feedback"
					);
				},
				windowHeight: document.documentElement.offsetHeight,
			}).then((canvas) => {
				let base64 = canvas.toDataURL("image/png");
				console.log(base64);
			});
	};
	return (
		<>
			<div className="mdui-dialog-content">
				<Input
					value={text}
					onValueChange={setText}
					placeholder="请描述你遇到的问题"
					rows={3}
				/>
				{img !== "" && <img src={img} alt="screenshot" />}
				<Button
					onClick={catchScreenshot}
					primary
					icon="add"
					title="添加截图"
				/>
			</div>
		</>
	);
};

// TODO 快捷反馈：截图

const FeedbackComp = (props: unknown) => {
	return (
		<Dialog
			config={{
				title: "反馈",
				confirmText: "提交",
				cancelText: "忘记密码 ",
				id: "feedback",
			}}
			{...props}
		>
			<Feedback />
		</Dialog>
	);
};

export default FeedbackComp;
