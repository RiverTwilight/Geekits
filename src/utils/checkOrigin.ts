import { root } from "../site.config";

function isSameOrigin(url: string): boolean {
	return ["http://localhost:3000", root].includes(url);
}

export { isSameOrigin }
