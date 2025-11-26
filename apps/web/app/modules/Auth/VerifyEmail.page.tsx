import { Link, useSearchParams } from "@remix-run/react";
import { CheckCircle, Loader2, Mail, XCircle } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useVerifyEmail } from "~/api/mutations/useVerifyEmail";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { setPageTitle } from "~/utils/setPageTitle";

import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = ({ matches }) => setPageTitle(matches, "pages.verifyEmail");

type VerificationState = "pending" | "verifying" | "success" | "error" | "declined";

export default function VerifyEmailPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState<VerificationState>("pending");

  const { mutate: verifyEmail, isPending, error } = useVerifyEmail();

  const handleAccept = () => {
    if (!token) return;
    setState("verifying");
    verifyEmail(
      { token },
      {
        onSuccess: () => setState("success"),
        onError: () => setState("error"),
      },
    );
  };

  const handleDecline = () => {
    setState("declined");
  };

  // No token provided
  if (!token) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.invalidToken.header")}</CardTitle>
          <CardDescription className="mt-2">
            {t("verifyEmailView.invalidToken.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/auth/verify-email-pending">
            <Button variant="outline" className="mr-2">
              {t("verifyEmailView.button.requestNew")}
            </Button>
          </Link>
          <Link to="/auth/login">
            <Button>{t("verifyEmailView.button.backToLogin")}</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Pending - waiting for user action
  if (state === "pending") {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.confirm.header")}</CardTitle>
          <CardDescription className="mt-2">
            {t("verifyEmailView.confirm.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">{t("verifyEmailView.confirm.info")}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleDecline}>
              <XCircle className="mr-2 h-4 w-4" />
              {t("verifyEmailView.button.decline")}
            </Button>
            <Button className="flex-1" onClick={handleAccept}>
              <CheckCircle className="mr-2 h-4 w-4" />
              {t("verifyEmailView.button.accept")}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Verifying
  if (state === "verifying" || isPending) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.verifying.header")}</CardTitle>
          <CardDescription className="mt-2">
            {t("verifyEmailView.verifying.description")}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Success
  if (state === "success") {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.success.header")}</CardTitle>
          <CardDescription className="mt-2">
            {t("verifyEmailView.success.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link to="/auth/login">
            <Button className="w-full">{t("verifyEmailView.button.login")}</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Declined
  if (state === "declined") {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <XCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.declined.header")}</CardTitle>
          <CardDescription className="mt-2">
            {t("verifyEmailView.declined.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <Button variant="outline" onClick={() => setState("pending")} className="mr-2">
            {t("verifyEmailView.button.goBack")}
          </Button>
          <Link to="/auth/login">
            <Button>{t("verifyEmailView.button.backToLogin")}</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Error
  if (state === "error") {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{t("verifyEmailView.error.header")}</CardTitle>
          <CardDescription className="mt-2">
            {(error as Error)?.message || t("verifyEmailView.error.description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Link to="/auth/verify-email-pending">
              <Button variant="outline" className="mr-2">
                {t("verifyEmailView.button.requestNew")}
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button>{t("verifyEmailView.button.backToLogin")}</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
