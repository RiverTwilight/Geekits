import dynamic from "next/dynamic";

// !! next/dynamic options must be an object literal !!

const appImportList = {
	cem: dynamic(() => import("../apps/cem"), {
		ssr: false,
	}),
	clipboard: dynamic(() => import("../apps/clipboard"), {
		ssr: false,
	}),
	date_calculator: dynamic(() => import("../apps/date_calculator"), {
		ssr: false,
	}),
	decision: dynamic(() => import("../apps/decision"), {
		ssr: false,
	}),
	dic_ci: dynamic(() => import("../apps/dic_ci"), {
		ssr: false,
	}),
	dic_idiom: dynamic(() => import("../apps/dic_idiom"), {
		ssr: false,
	}),
	fake_pornhub_logo: dynamic(() => import("../apps/fake_pornhub_logo"), {
		ssr: false,
	}),
	screen_recorder: dynamic(() => import("../apps/screen_recorder"), {
		ssr: false,
	}),
	pomodoro: dynamic(() => import("../apps/pomodoro"), {
		ssr: false,
	}),
	imomoe_parse: dynamic(() => import("../apps/imomoe_parse"), {
		ssr: false,
	}),
	js_keycode: dynamic(() => import("../apps/js_keycode"), {
		ssr: false,
	}),
	img2base64: dynamic(() => import("../apps/img2base64"), {
		ssr: false,
	}),
	// img_mosaic: dynamic(() => import("../../src/apps/img_mosaic"), {
	// 	ssr: false,
	// }),
	folder_tree: dynamic(() => import("../apps/folder_tree"), {
		ssr: false,
	}),
	qrcode: dynamic(() => import("../apps/qrcode"), {
		ssr: false,
	}),
	mimetype: dynamic(() => import("../apps/mimetype"), {
		ssr: false,
	}),
	html2jsx: dynamic(() => import("../apps/html2jsx"), {
		ssr: false,
	}),
	chatai: dynamic(() => import("../apps/chatai"), {
		ssr: false,
	}),
	jyutping_converter: dynamic(() => import("../apps/jyutping_converter/index"), {
		ssr: false,
	}),
};

export default appImportList;
