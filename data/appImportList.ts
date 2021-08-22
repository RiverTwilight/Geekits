import dynamic from "next/dynamic";

const importConfig = {
	ssr: false,
};

export default {
	date_calculator: dynamic(
		() => import("../apps/date_calculator"),
		importConfig
	),
	js_keycode: dynamic(() => import("../apps/js_keycode"), importConfig),
	dic_ci: dynamic(() => import("../apps/dic_ci"), importConfig),
	folder_tree: dynamic(() => import("../apps/folder_tree"), importConfig),
	qrcode: dynamic(() => import("../apps/qrcode"), importConfig),
	cem: dynamic(() => import("../apps/cem"), importConfig),
};
