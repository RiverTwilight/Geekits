import React from "react";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const StyledMarkdown = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			components={{
				image: ({ src }) => <img alt="" src={src} />,
				a: ({ href, children }) => <Link href={href}>{children}</Link>,
				h1: ({ children }) => (
					<Typography gutterBottom variant="h2">
						{children}
					</Typography>
				),
				h2: ({ children }) => (
					<Typography gutterBottom variant="h3">
						{children}
					</Typography>
				),
				h3: ({ children }) => (
					<Typography gutterBottom variant="h4">
						{children}
					</Typography>
				),
				h4: ({ children }) => (
					<Typography gutterBottom variant="h5">
						{children}
					</Typography>
				),
				h5: ({ children }) => (
					<Typography gutterBottom variant="h6">
						{children}
					</Typography>
				),
				h6: ({ children }) => (
					<Typography gutterBottom variant="h6">
						{children}
					</Typography>
				),
				p: ({ children }) => (
					<Typography gutterBottom paragraph variant="body1">
						{children}
					</Typography>
				),
			}}
			children={content}
		/>
	);
};

export default StyledMarkdown;
