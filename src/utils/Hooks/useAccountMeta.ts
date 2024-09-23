import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";

export function useAccountMeta() {
	const [user, setUser] = useState(null);
	const [avatarUrl, setAvatarUrl] = useState(null);
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const fetchUserData = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				const { data, error } = await supabase
					.from("Account")
					.select("email, first_name, last_name, avatarUrl, uid")
					.eq("uid", user.id)
					.single();

				if (error) {
					console.error("Error fetching user data:", error);
				} else {
					setUser(data);
					setAvatarUrl(data.avatarUrl);
				}
			}
		};

		fetchUserData();
	}, [router]);

	return { user, avatarUrl };
}
