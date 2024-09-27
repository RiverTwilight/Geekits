import { createBrowserClient } from "@supabase/ssr";
import { isCapacitor } from "../platform";

export function createClient() {
	if (isCapacitor()) {
		const capacitorVariables = require("../../capacitor-variables");

		return createBrowserClient(
			capacitorVariables.NextPublicSupabaseUrl,
			capacitorVariables.NextPublicSupabaseAnonKey
		);
	}

	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	return supabase;
}
