import React from "react";
import { Dialog } from "mdui";
import { Input } from "mdui-in-react";
import useInput from "../../utils/Hooks/useInput";

const InsertLink = ({
	onConfirm,
	isOpen,
}: {
	onConfirm?: (link: string, text: string) => void;
	isOpen?: boolean;
}) => {
	React.useEffect(() => {
		var insertDialogIns;
		insertDialogIns = new Dialog("#insertLink", {
			history: false,
			destroyOnClosed: false,
			closeOnCancel: false,
			closeOnEsc: true,
			closeOnConfirm: false,
		});
		isOpen && insertDialogIns.open();
		// @ts-expect-error
		document
			.getElementById("insertLink")
			.addEventListener("closed.mdui.dialog", onConfirm);
	}, [isOpen]);
	const [link, setLink] = useInput("");
	const [text, setText] = useInput("");
	const ok = () => {
		onConfirm && onConfirm(link, text);
	};
	return (
		<div id="insertLink" className="mdui-dialog">
			<div className="mdui-dialog-content">
				<Input placeholder="链接" onInput={setText} />
				<Input placeholder="链接文字" onInput={setLink} />
			</div>
			<div className="mdui-dialog-actions">
				<button className="mdui-btn mdui-ripple">取消</button>
				<button onClick={ok} className="mdui-btn mdui-ripple">
					确认
				</button>
			</div>
		</div>
	);
};

export default InsertLink;
