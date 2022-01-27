import dynamic from "next/dynamic";

const importConfig = {
	ssr: false,
};

export default {
	date_calculator: dynamic(
		() => import("../apps/date_calculator"),
		importConfig
	),
	pomodoro: dynamic(() => import("../apps/pomodoro"), importConfig),
	imomoe_parse: dynamic(() => import("../apps/imomoe_parse"), importConfig),
	js_keycode: dynamic(() => import("../apps/js_keycode"), importConfig),
	dic_ci: dynamic(() => import("../apps/dic_ci"), importConfig),
	dic_idiom: dynamic(() => import("../apps/dic_idiom"), importConfig),
	folder_tree: dynamic(() => import("../apps/folder_tree"), importConfig),
	qrcode: dynamic(() => import("../apps/qrcode"), importConfig),
	cem: dynamic(() => import("../apps/cem"), importConfig),
	mimetype: dynamic(() => import("../apps/mimetype"), importConfig),
	html2jsx: dynamic(() => import("../apps/html2jsx"), importConfig),
	fake_pornhub_logo: dynamic(
		() => import("../apps/fake_pornhub_logo"),
		importConfig
	),
};
