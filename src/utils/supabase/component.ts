import { createBrowserClient } from "@supabase/ssr";
import { isCapacitor } from "../platform";

export function createClient() {
	if (isCapacitor()) {
		const getCapacitorVariables = () => require("../../capacitor-varibles");
		const capacitorVariables = getCapacitorVariables();

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
