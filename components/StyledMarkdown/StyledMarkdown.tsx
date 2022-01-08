import React from "react";
import ReactMarkdown from "react-markdown";
import Typography from "@mui/material/Typography";

const StyledMarkdown = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			renderers={{
				image: ({ src }) => <img alt="" src={src} />,
				// link: ({href, children})=>(<Link>{children</Link>)
				heading: ({ level, children }: { level: number, children: React.ReactNode }) => {
					return (
						//@ts-expect-error
						<Typography variant={`h${level}`} gutterBottom>
							{children}
						</Typography>
					);
				},
				paragraph: ({ children }) => {
					// console.log(children);
					return (
						<Typography variant="body1" gutterBottom>
							{children}
						</Typography>
					);
				},
			}}
			children={content}
		/>
	);
};

export default StyledMarkdown;
