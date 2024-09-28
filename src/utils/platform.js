import { Capacitor } from "@capacitor/core";

/**
 * Should only use in server side
 * @returns {boolean}
 */
const isCapacitor = () => process.env.CAPACITOR_BUILD === "true";

/**
 * Should only use in client side
 * @returns {boolean}
 */
const isWeb = () => Capacitor.getPlatform() === "web";

const isIOS = () => Capacitor.getPlatform() === "ios";

export { isCapacitor, isWeb, isIOS };
