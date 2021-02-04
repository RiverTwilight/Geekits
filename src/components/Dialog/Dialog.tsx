import { useEffect } from "react";
import { Dialog } from "mdui";

function makeid(length: number) {
	var result = "";
	var characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

const ReactDialog = ({
	open,
	onClose,
	children,
	config,
}: {
	open?: boolean;
	onClose?: any;
	children?: any;
	config?: {
		title: string;
		confirmText?: string;
		cancelText?: string;
	};
}) => {
	var id = makeid(5)
	useEffect(() => {
		var dialogInst;
		dialogInst = new Dialog(`#${id}`, {
			history: false,
			destroyOnClosed: false,
			closeOnCancel: false,
			closeOnEsc: true,
			closeOnConfirm: false,
		});
		//@ts-expect-error
		document
			.getElementById(id)
			.addEventListener("closed.mdui.dialog", onClose);
		open && dialogInst.open();
	}, [open]);
	return (
		<div id={id} className="mdui-dialog">
			{config && config.title && (
				<div className="mdui-dialog-title">{config.title}</div>
			)}
			{children}
			{/* <div className="mdui-dialog-content">{children}</div>
			<div className="mdui-dialog-actions">
				<button className="mdui-btn mdui-ripple">{config?.cancelText}</button>
				<button className="mdui-btn mdui-ripple">{config?.confirmText}</button>
			</div> */}
		</div>
	);
};

export default ReactDialog;
