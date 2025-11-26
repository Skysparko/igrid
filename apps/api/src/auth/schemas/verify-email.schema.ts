import { type Static, Type } from "@sinclair/typebox";

export const verifyEmailSchema = Type.Object({
  token: Type.String({ minLength: 1 }),
});

export type VerifyEmailBody = Static<typeof verifyEmailSchema>;

export const resendVerificationEmailSchema = Type.Object({
  email: Type.String({ format: "email" }),
});

export type ResendVerificationEmailBody = Static<typeof resendVerificationEmailSchema>;

export const verifyEmailResponseSchema = Type.Object({
  message: Type.String(),
});
