import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export type EmailVerificationEmailProps = {
  name: string;
  verificationLink: string;
};

export const EmailVerificationEmail = ({ name, verificationLink }: EmailVerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Verify your email address</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Thank you for registering! Please click the button below to verify your email address
              and complete your registration.
            </Text>
            <Button style={button} href={verificationLink}>
              Verify Email Address
            </Button>
            <Text style={text}>
              If you didn&apos;t create an account, you can safely ignore this email.
            </Text>
            <Text style={smallText}>
              This link will expire in 24 hours. If you need a new verification link, please visit
              the login page.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  borderRadius: "8px",
};

const heading = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "0 0 30px",
};

const section = {
  padding: "0 20px",
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
};

const smallText = {
  color: "#888",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "16px 0",
};

const button = {
  backgroundColor: "#000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "14px 24px",
  margin: "24px 0",
};

export default EmailVerificationEmail;
