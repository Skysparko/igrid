import { useNavigate } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useToast } from "~/components/ui/use-toast";

import { ApiClient } from "../api-client";

type VerifyEmailOptions = {
  token: string;
};

export function useVerifyEmail() {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (options: VerifyEmailOptions) => {
      const response = await ApiClient.instance.post("/api/auth/verify-email", {
        token: options.token,
      });
      return response.data;
    },
    onSuccess: () => {
      toast({
        description: "Email verified successfully! You can now log in.",
      });
      navigate("/auth/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          variant: "destructive",
          description: error.response?.data.message || "Failed to verify email",
        });
      }
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}
