import dynamic from "next/dynamic";

// !! next/dynamic options must be an object literal !!

const appImportList = {
	cem: dynamic(() => import("../src/apps/cem"), {
		ssr: false,
	}),
	clipboard: dynamic(() => import("../src/apps/clipboard"), {
		ssr: false,
	}),
	date_calculator: dynamic(() => import("../src/apps/date_calculator"), {
		ssr: false,
	}),
	decision: dynamic(() => import("../src/apps/decision"), {
		ssr: false,
	}),
	dic_ci: dynamic(() => import("../src/apps/dic_ci"), {
		ssr: false,
	}),
	dic_idiom: dynamic(() => import("../src/apps/dic_idiom"), {
		ssr: false,
	}),
	fake_pornhub_logo: dynamic(() => import("../src/apps/fake_pornhub_logo"), {
		ssr: false,
	}),
	screen_recorder: dynamic(() => import("../src/apps/screen_recorder"), {
		ssr: false,
	}),
	pomodoro: dynamic(() => import("../src/apps/pomodoro"), {
		ssr: false,
	}),
	imomoe_parse: dynamic(() => import("../src/apps/imomoe_parse"), {
		ssr: false,
	}),
	js_keycode: dynamic(() => import("../src/apps/js_keycode"), {
		ssr: false,
	}),
	// policy_generator: dynamic(() => import("../src/apps/policy_generator"), {
	// 	ssr: false,
	// }),
	img2base64: dynamic(() => import("../src/apps/img2base64"), {
		ssr: false,
	}),
	// img_mosaic: dynamic(() => import("../../src/apps/img_mosaic"), {
	// 	ssr: false,
	// }),
	folder_tree: dynamic(() => import("../src/apps/folder_tree"), {
		ssr: false,
	}),
	qrcode: dynamic(() => import("../src/apps/qrcode"), {
		ssr: false,
	}),
	mimetype: dynamic(() => import("../src/apps/mimetype"), {
		ssr: false,
	}),
	html2jsx: dynamic(() => import("../src/apps/html2jsx"), {
		ssr: false,
	}),
	__development: dynamic(() => import("../src/apps/__development"), {
		ssr: false,
	}),
};

export default appImportList;
