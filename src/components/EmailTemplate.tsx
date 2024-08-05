import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  content,
}) => {
  const previewText = "New feedback from Geekits";

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Feedback from Geekits</Heading>
          <Section style={feedbackSection}>
            <Text style={feedbackContent}>{content}</Text>
          </Section>
          <Text style={footer}>
            This email was sent from the Geekits feedback system.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  padding: "17px 0 0",
  textAlign: "center" as const,
};

const feedbackSection = {
  background: "#ffffff",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
  margin: "16px 0",
  padding: "24px",
};

const feedbackContent = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};
