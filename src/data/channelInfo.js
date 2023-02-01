import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";

const channelInfo = {
	ai: {
		name: "人工智能",
		Icon: <EmojiObjectsTwoToneIcon />,
	},
	life: {
		name: "生活常用",
		Icon: <WbSunnyTwoToneIcon />,
	},
	media: {
		name: "图片视频",
		Icon: <BurstModeIcon />,
	},
	dev: {
		name: "编程开发",
		Icon: <CodeTwoToneIcon />,
	},
	external: {
		name: "第三方 App",
		Icon: <LinkTwoToneIcon />,
	},
};

export default channelInfo;
