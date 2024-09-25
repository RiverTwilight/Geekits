import React from "react";
import EmojiObjectsTwoToneIcon from "@mui/icons-material/EmojiObjectsTwoTone";
import BurstModeIcon from "@mui/icons-material/BurstMode";
import CodeTwoToneIcon from "@mui/icons-material/CodeTwoTone";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";
import WbSunnyTwoToneIcon from "@mui/icons-material/WbSunnyTwoTone";
import Text from "@/components/i18n";

const channelInfo = {
	ai: {
		name: <Text k="channel.ai" />,
		Icon: <EmojiObjectsTwoToneIcon />,
	},
	life: {
		name: <Text k="channel.life" />,
		Icon: <WbSunnyTwoToneIcon />,
	},
	media: {
		name: <Text k="channel.image" />,
		Icon: <BurstModeIcon />,
	},
	dev: {
		name: <Text k="channel.developer" />,
		Icon: <CodeTwoToneIcon />,
	},
	external: {
		name: <Text k="channel.external" />,
		Icon: <LinkTwoToneIcon />,
	},
};

export default channelInfo;
