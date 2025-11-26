import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useToast } from "~/components/ui/use-toast";

import { ApiClient } from "../api-client";

type ResendVerificationEmailOptions = {
  email: string;
};

export function useResendVerificationEmail() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (options: ResendVerificationEmailOptions) => {
      const response = await ApiClient.instance.post("/api/auth/resend-verification-email", {
        email: options.email,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        description: "Verification email sent! Please check your inbox.",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          variant: "destructive",
          description: error.response?.data.message || "Failed to send verification email",
        });
      }
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}
