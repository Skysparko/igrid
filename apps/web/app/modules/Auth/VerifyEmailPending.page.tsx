import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams } from "@remix-run/react";
import { Mail, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { useResendVerificationEmail } from "~/api/mutations/useResendVerificationEmail";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { setPageTitle } from "~/utils/setPageTitle";

import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = ({ matches }) =>
  setPageTitle(matches, "pages.verifyEmailPending");

const resendEmailSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ResendEmailForm = z.infer<typeof resendEmailSchema>;

export default function VerifyEmailPendingPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const emailFromParams = searchParams.get("email") || "";
  const { mutate: resendEmail, isPending } = useResendVerificationEmail();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendEmailForm>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: {
      email: emailFromParams,
    },
  });

  const onSubmit = (data: ResendEmailForm) => {
    resendEmail({ email: data.email });
  };

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">{t("verifyEmailPendingView.header")}</CardTitle>
        <CardDescription className="mt-2">{t("verifyEmailPendingView.subHeader")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-muted/50 p-4 text-center">
          <p className="text-sm text-muted-foreground">{t("verifyEmailPendingView.description")}</p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            {t("verifyEmailPendingView.didntReceive")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("verifyEmailPendingView.field.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                {...register("email")}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  {t("verifyEmailPendingView.button.sending")}
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("verifyEmailPendingView.button.resend")}
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <Link to="/auth/login" className="text-sm text-primary hover:underline">
            {t("verifyEmailPendingView.button.backToLogin")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
