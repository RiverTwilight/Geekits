import { root } from "../site.config";
import { isWeb } from "./platform";

function isSameOrigin(url: string): boolean {
	if(!isWeb()){
		// We do not need this security check for native app
		return true
	}

	return ["http://localhost:3000", "http://localhost:3001", root].includes(url);
}

export { isSameOrigin }
