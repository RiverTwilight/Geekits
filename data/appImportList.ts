import dynamic from "next/dynamic";

// next/dynamic options must be an object literal

export default {
	date_calculator: dynamic(() => import("../apps/date_calculator"), {
		ssr: false,
	}),
	screen_recorder: dynamic(() => import("../apps/screen_recorder"), {
		ssr: false,
	}),
	decision: dynamic(() => import("../apps/decision"), {
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
	dic_ci: dynamic(() => import("../apps/dic_ci"), {
		ssr: false,
	}),
	img_mosaic: dynamic(() => import("../apps/img_mosaic"), {
		ssr: false,
	}),
	dic_idiom: dynamic(() => import("../apps/dic_idiom"), {
		ssr: false,
	}),
	folder_tree: dynamic(() => import("../apps/folder_tree"), {
		ssr: false,
	}),
	qrcode: dynamic(() => import("../apps/qrcode"), {
		ssr: false,
	}),
	cem: dynamic(() => import("../apps/cem"), {
		ssr: false,
	}),
	mimetype: dynamic(() => import("../apps/mimetype"), {
		ssr: false,
	}),
	html2jsx: dynamic(() => import("../apps/html2jsx"), {
		ssr: false,
	}),
	fake_pornhub_logo: dynamic(() => import("../apps/fake_pornhub_logo"), {
		ssr: false,
	}),
};
