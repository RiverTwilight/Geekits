import React from "react";
import ReactMarkdown from "react-markdown";
import Typography from "@material-ui/core/Typography";

const StyledMarkdown = ({ content }: { content: string }) => {
	return (
		<ReactMarkdown
			renderers={{
				image: ({ src }) => <img alt="" src={src} />,
				// link: ({href, children})=>(<Link>{children</Link>)
				heading: ({ children }) => (
					<Typography variant="h4" gutterBottom>
						{children}
					</Typography>
				),
				paragraph: ({ children }) => {
					console.log(children);
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
