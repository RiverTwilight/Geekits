import React, { useRef, useEffect } from "react";
import Cropper from "react-cropper";
import { GetStaticProps } from "next";
import translator from "@/utils/translator";
import { isSameOrigin } from "@/utils/checkOrigin";

import "cropperjs/dist/cropper.css";

export const getStaticProps: GetStaticProps = ({ locale = "zh-CN" }) => {
	const dic = require("../../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			hideFrame: true,
			currentPage: {
				title: trans.use(""),
				description: trans.use(""),
				path: "/_micro/cropper",
			},
			dic: JSON.stringify(dic),
			locale,
		},
	};
};

export default function FramedCropper() {
	const cropperRef = useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);

	useEffect(() => {
		const receiveMessage = (event) => {
			if (!isSameOrigin(event.origin)) return;

			if (event.data.type === "SEND_RAW") {
				if (event.data.data instanceof File) {
					const reader = new FileReader();
					reader.onload = (e) => setImgSrc(e.target.result);
					reader.readAsDataURL(event.data.data);
				} else {
					setImgSrc(event.data.data);
				}
			} else if (event.data.type === "REQUEST_RESULT") {
				const cropper = cropperRef.current?.cropper;
				if (cropper) {
					const croppedImageURI = cropper
						.getCroppedCanvas()
						.toDataURL();
					window.parent.postMessage(
						{ type: "SEND_RESULT", data: croppedImageURI },
						"*"
					);
				}
			}
		};

		window.addEventListener("message", receiveMessage, false);
		window.parent.postMessage({ type: "ready" }, "*");

		return () => window.removeEventListener("message", receiveMessage);
	}, []);

	return (
		imgSrc && (
			<Cropper
				ref={cropperRef}
					src={imgSrc}
					style={{ height: "100%", width: "100%" }}
					aspectRatio={1}
					guides={true}
					viewMode={1}
					background={false}
			/>
		)
	);
}
