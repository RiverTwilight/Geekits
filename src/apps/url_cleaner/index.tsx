import React, { useState } from "react";
import {
	Box,
	TextField,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	IconButton,
	ListItemAvatar,
	Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OutlinedCard from "@/components/OutlinedCard";
import initialDomainRules, { DomainRule } from "./rules";
import { Language } from "@mui/icons-material";

const UrlCleaner: React.FC = () => {
	const [url, setUrl] = useState("");
	const [cleanedUrl, setCleanedUrl] = useState("");
	const [domainRules, setDomainRules] =
		useState<DomainRule[]>(initialDomainRules);

	const cleanUrl = () => {
		try {
			const urlObj = new URL(url);
			const hostname = urlObj.hostname;

			const matchedRule = domainRules.find((rule) =>
				hostname.includes(rule.domain)
			);

			if (matchedRule) {
				if (matchedRule.needRedirect) {
					// We can't follow redirects due to CORS, so we'll just clean the original URL
					console.warn(
						"Cannot follow redirects due to CORS restrictions. Cleaning original URL."
					);
				}

				matchedRule.queryParams.forEach((param) => {
					urlObj.searchParams.delete(param);
				});
			}

			setCleanedUrl(urlObj.toString());
		} catch (error) {
			setCleanedUrl("Invalid URL");
		}
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(cleanedUrl);
	};

	return (
		<Box sx={{ maxWidth: 600, margin: "auto", p: 2 }}>
			<TextField
				fullWidth
				label="Enter URL"
				variant="outlined"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				sx={{ mb: 2 }}
			/>

			<Button
				variant="contained"
				onClick={cleanUrl}
				sx={{
					mb: 2,
					bgcolor: "primary.main",
					"&:hover": {
						bgcolor: "primary.dark",
					},
				}}
			>
				Clean URL
			</Button>

			{cleanedUrl && (
				<OutlinedCard padding={2}>
					<Box display="flex" alignItems="center" mb={1}>
						<VerifiedUserIcon color="success" fontSize="small" />
						<Typography variant="subtitle1" sx={{ ml: 1 }}>
							Cleaned URL
						</Typography>
					</Box>
					<Typography variant="body1" sx={{ wordBreak: "break-all" }}>
						{cleanedUrl}
					</Typography>
					<Button
						startIcon={<ContentCopyIcon />}
						onClick={copyToClipboard}
						sx={{ mt: 1 }}
					>
						Copy
					</Button>
				</OutlinedCard>
			)}

			<Typography
				variant="h6"
				gutterBottom
				sx={{ mt: 4, fontFamily: "Product Sans" }}
			>
				Domain Rules
			</Typography>

			<List>
				{domainRules.map((rule, index) => (
					<ListItem
						key={index}
						secondaryAction={
							<IconButton
								edge="end"
								aria-label="delete"
								onClick={() => {
									setDomainRules(
										domainRules.filter(
											(_, i) => i !== index
										)
									);
								}}
							>
								<DeleteIcon />
							</IconButton>
						}
					>
						<ListItemAvatar>
							<Avatar
								sx={{ width: 24, height: 24 }}
								src={`https://${rule.domain}/favicon.ico`}
							>
								<Language />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={rule.domain}
							secondary={`${rule.queryParams.join(", ")}`}
						/>
					</ListItem>
				))}
			</List>
		</Box>
	);
};

export default UrlCleaner;
