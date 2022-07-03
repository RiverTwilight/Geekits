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
		var dom = document.getElementById("insertLink");
		//@ts-expect-error
		dom && dom.addEventListener("confirm.mdui.dialog", onConfirm);
		//@ts-expect-error
		dom && dom.addEventListener("close.mdui.dialog", onConfirm);

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
				<button mdui-dialog-cancel="true" className="mdui-btn mdui-ripple">取消</button>
				<button mdui-dialog-confirm="true" className="mdui-btn mdui-ripple">
					确认
				</button>
			</div>
		</div>
	);
};

export default InsertLink;
