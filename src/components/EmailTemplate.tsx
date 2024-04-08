import * as React from "react";
import StyledMarkdown from "./StyledMarkdown";

interface EmailTemplateProps {
	content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	content,
}) => (
	<div>
		<StyledMarkdown content={content}></StyledMarkdown>
	</div>
);
