import { Capacitor } from "@capacitor/core";

const isCapacitor = () => process.env.CAPACITOR_BUILD === "true";

const isWeb = () => Capacitor.getPlatform() === "web";

export { isCapacitor, isWeb };
