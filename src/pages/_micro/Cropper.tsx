import React, { useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { GetStaticProps } from "next";
import translator from "@/utils/translator";
import { isSameOrigin } from "@/utils/checkOrigin";

export const getStaticProps: GetStaticProps = ({ locale }) => {
	const dic = require("../../data/i18n.json");

	const trans = new translator(dic, locale);

	return {
		props: {
			hideFrame: true,
			currentPage: {
				title: trans.use(""),
				description: trans.use(""),
				path: "/about",
			},
			dic: JSON.stringify(trans.get()),
			locale,
		},
	};
};

export default function FramedCropper() {
	const cropperRef = useRef(null);
	const [imgSrc, setImgSrc] = React.useState(null);

	useEffect(() => {

		const receiveMessage = (event) => {
			if (!isSameOrigin(event.origin))  return;
			setImgSrc(event.data);
		};

		window.addEventListener("message", receiveMessage, false);

		window.parent.postMessage("ready", "*");

		return () => window.removeEventListener("message", receiveMessage);
	}, []);

	const onCrop = () => {
		const cropper = cropperRef.current?.cropper;
		const croppedImageURI = cropper.getCroppedCanvas().toDataURL()
		window.parent.postMessage(croppedImageURI, "*");
	};

	return (
		<div>
			{imgSrc && (
				<Cropper
					ref={cropperRef}
					src={imgSrc}
					style={{ height: 400, width: "100%" }}
					aspectRatio={1 / 1}
					guides={true}
					crop={onCrop}
				/>
			)}
		</div>
	);
}
