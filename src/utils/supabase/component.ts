import { createBrowserClient } from "@supabase/ssr";
import { isCapacitor } from "../platform";

export function createClient() {
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	return supabase;
}
