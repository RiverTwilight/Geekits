import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// !! next/dynamic options must be an object literal !!

const appImportList: Record<string, ComponentType> = {
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
	dic_word: dynamic(() => import("../apps/dic_word"), {
		ssr: false,
	}),
	dic_idiom: dynamic(() => import("../apps/dic_idiom"), {
		ssr: false,
	}),
	dic_char: dynamic(() => import("../apps/dic_char"), {
		ssr: false,
	}),
	url_cleaner: dynamic(() => import("../apps/url_cleaner"), {
		ssr: false,
	}),
	fuel_consumption_calculator: dynamic(
		() => import("../apps/fuel_consumption_calculator"),
		{
			ssr: false,
		}
	),
	length_unit_convertor: dynamic(
		() => import("../apps/length_unit_convertor"),
		{
			ssr: false,
		}
	),
	fake_pornhub_logo: dynamic(() => import("../apps/fake_pornhub_logo"), {
		ssr: false,
	}),
	screen_recorder: dynamic(() => import("../apps/screen_recorder"), {
		ssr: false,
	}),
	icon_slasher: dynamic(() => import("../apps/icon_slasher"), {
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
	img_compress: dynamic(() => import("../apps/img_compress"), {
		ssr: false,
	}),
	img_mosaic: dynamic(() => import("../../src/apps/img_mosaic"), {
		ssr: false,
	}),
	folder_tree: dynamic(() => import("../apps/folder_tree"), {
		ssr: false,
	}),
	qrcode: dynamic(() => import("../apps/qrcode"), {
		ssr: false,
	}),
	tax_calculator: dynamic(() => import("../apps/tax_calculator"), {
		ssr: false,
	}),
	mimetype: dynamic(() => import("../apps/mimetype"), {
		ssr: false,
	}),
	manifest: dynamic(() => import("../apps/manifest"), {
		ssr: false,
	}),
	html2jsx: dynamic(() => import("../apps/html2jsx"), {
		ssr: false,
	}),
	icon_generator: dynamic(() => import("../apps/icon_generator"), {
		ssr: false,
	}),
	chatai: dynamic(() => import("../apps/chatai"), {
		ssr: false,
	}),
	jyutping_converter: dynamic(
		() => import("../apps/jyutping_converter/index"),
		{
			ssr: false,
		}
	),
	num2roman: dynamic(() => import("../apps/num2roman"), {
		ssr: false,
	}),
	grid_splitter: dynamic(() => import("../apps/grid_splitter"), {
		ssr: false,
	}),
	base64toimg: dynamic(() => import("../apps/base64toimg"), {
		ssr: false,
	}),
	radio_signal_location_checker: dynamic(
		() => import("../apps/radio_signal_location_checker"),
		{
			ssr: false,
		}
	),
};

export default appImportList;
