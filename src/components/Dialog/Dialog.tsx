import React, { useEffect } from "react";
import { Dialog } from "mdui";

const ReactDialog = ({
	ifOpen,
	closeLoginDialog,
	children,
	config,
}: {
	ifOpen?: boolean;
	closeLoginDialog?: any;
	children?: any;
	config?: {
        title: string,
        confirmText?: string,
        cancelText?: string
    };
}) => {
	useEffect(() => {
		var dialogInst;
		dialogInst = new Dialog("#loginDialog", {
			history: false,
			destroyOnClosed: false,
			closeOnCancel: false,
			closeOnEsc: true,
			closeOnConfirm: false,
		});
		//@ts-expect-error
		document
			.getElementById("loginDialog")
            .addEventListener("closed.mdui.dialog", closeLoginDialog);
		ifOpen && dialogInst.open();
	}, [ifOpen]);
	return (
		<div id="loginDialog" className="mdui-dialog">
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
