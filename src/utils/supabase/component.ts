import { createBrowserClient } from "@supabase/ssr";
import { isCapacitor } from "../platform";
import capacitorVariables from "../../capacitor-varibles";

export function createClient() {
	if (isCapacitor()) {
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
