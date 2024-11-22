import { createBrowserClient } from "@supabase/ssr";
import { Preferences } from "@capacitor/preferences";
import { Capacitor } from "@capacitor/core";

const customStorage = {
	async getItem(key: string) {
		if (Capacitor.isNativePlatform()) {
			const { value } = await Preferences.get({ key });
			return value;
		}
		return localStorage.getItem(key);
	},
	async setItem(key: string, value: string) {
		if (Capacitor.isNativePlatform()) {
			await Preferences.set({ key, value });
		} else {
			localStorage.setItem(key, value);
		}
	},
	async removeItem(key: string) {
		if (Capacitor.isNativePlatform()) {
			await Preferences.remove({ key });
		} else {
			localStorage.removeItem(key);
		}
	},
};

export function createClient() {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			auth: {
				storage: customStorage,
				persistSession: true,
				autoRefreshToken: true,
			},
		}
	);

	return supabase;
}
