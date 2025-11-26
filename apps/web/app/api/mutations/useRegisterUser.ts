import { useNavigate } from "@remix-run/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useToast } from "~/components/ui/use-toast";

import { ApiClient } from "../api-client";

import type { RegisterBody } from "../generated-api";

type RegisterUserOptions = {
  data: RegisterBody;
};

export function useRegisterUser() {
  const navigate = useNavigate();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (options: RegisterUserOptions) => {
      const response = await ApiClient.api.authControllerRegister(options.data);

      return { ...response.data, email: options.data.email };
    },
    onSuccess: (data) => {
      toast({
        description: "Registration successful! Please check your email to verify your account.",
      });
      navigate(`/auth/verify-email-pending?email=${encodeURIComponent(data.email)}`);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          variant: "destructive",
          description: error.response?.data.message,
        });
      }
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });
}
