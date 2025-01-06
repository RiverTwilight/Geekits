import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { createClient } from "@/utils/supabase/component";
import { useAccount } from "@/contexts/account";
import { OpenInNewRounded } from "@mui/icons-material";
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

interface AccountPanelProps {
	open: boolean;
	onClose: () => void;
}

const AccountPanel: React.FC<AccountPanelProps> = ({ open, onClose }) => {
	const { account: accountMeta } = useAccount();
	const supabase = createClient();
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	const handleLogout = async () => {
		await supabase.auth.signOut();
		onClose();
		location.reload();
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			console.error("Error logging in:", error.message);
		} else {
			onClose();
			location.reload();
		}
	};

	const openInAppBrowser = async (url: string) => {
		if (Capacitor.isNativePlatform()) {
			await Browser.open({ url, presentationStyle: 'popover' });
		} else {
			window.open(url, '_blank');
		}
	};

	const handleGoToYGeeker = () => {
		openInAppBrowser("https://www.ygeeker.com/account/manage");
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="xs"
			fullWidth
			PaperProps={{
				style: {
					borderRadius: 16,
				},
			}}
		>
			<DialogContent>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
						paddingTop: 2,
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "100%",
							marginBottom: 2,
						}}
					>
						<img
							src="https://www.ygeeker.com/logo-optimized.svg"
							alt="YGeeker Logo"
							style={{
								width: "40px",
								height: "40px",
								marginRight: "10px",
							}}
						/>
						<Typography
							sx={{
								fontFamily: "Product Sans",
							}}
							variant="h5"
							component="h2"
						>
							YGeeker Account
						</Typography>
					</Box>
					{accountMeta ? (
						<>
							<Avatar
								src={accountMeta["avatarUrl"]}
								alt={accountMeta["user"]["email"] || "User"}
								sx={{ width: 64, height: 64 }}
							/>
							<Typography variant="h5" sx={{ mb: -2 }}>
								{`${accountMeta["firstName"]} ${accountMeta["lastName"]}`}
							</Typography>
							<Typography variant="h6">
								{accountMeta["user"]["email"]}
							</Typography>
							<Box
								sx={{
									backgroundColor: "background.paper",
									borderRadius: 2,
									padding: 2,
									boxShadow: 1,
									width: "100%",
								}}
							>
								<Typography variant="body2" gutterBottom>
									Manage your YGeeker account on ygeeker.com
								</Typography>
								<Button
									variant="outlined"
									color="primary"
									onClick={handleGoToYGeeker}
									sx={{ mt: 1 }}
								>
									Go to YGeeker.com
								</Button>
							</Box>
							<Button
								variant="contained"
								color="primary"
								onClick={handleLogout}
								fullWidth
							>
								Logout
							</Button>
						</>
					) : (
						<form
							onSubmit={handleLogin}
							style={{
								width: "100%",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<TextField
								label="Email"
								type="email"
								fullWidth
								margin="normal"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<TextField
								label="Password"
								type="password"
								fullWidth
								margin="normal"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								fullWidth
								sx={{ mt: 2 }}
							>
								Login
							</Button>
							<Button
								variant="outlined"
								fullWidth
								color="primary"
								onClick={() => openInAppBrowser("https://www.ygeeker.com/account/create-account")}
								sx={{ mt: 2 }}
							>
								Create account
							</Button>
							<Button
								variant="text"
								color="primary"
								startIcon={<OpenInNewRounded />}
								onClick={() => openInAppBrowser("https://www.ygeeker.com/account/reset-password")}
								sx={{ mt: 2 }}
							>
								Forget password...
							</Button>
						</form>
					)}
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default AccountPanel;
