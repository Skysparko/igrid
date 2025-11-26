import { authService } from "~/modules/Auth/authService";
import { useAuthStore } from "~/modules/Auth/authStore";

import { API } from "./generated-api";

export const requestManager = {
  controller: new AbortController(),

  abortAll() {
    this.controller.abort();
    this.controller = new AbortController();
  },
};

export const ApiClient = new API({
  baseURL: import.meta.env.MODE === "test" ? "http://localhost:3000" : import.meta.env.VITE_APP_URL,
  secure: true,
  withCredentials: true,
});

ApiClient.instance.interceptors.request.use((config) => {
  const isAuthEndpoint =
    config.url?.includes("/login") ||
    config.url?.includes("/refresh") ||
    config.url?.includes("/forgot-password") ||
    config.url?.includes("/register") ||
    config.url?.includes("/verify-email") ||
    config.url?.includes("/resend-verification-email");

  const isSettingsGlobalEndpoint = config.url?.includes("/dashboard/settings/global");

  const isPublicCourseEndpoint = config.url?.includes("/course/available-courses");

  if (
    !isAuthEndpoint &&
    !isSettingsGlobalEndpoint &&
    !isPublicCourseEndpoint &&
    !useAuthStore.getState().isLoggedIn
  ) {
    config.signal = requestManager.controller.signal;
  }

  return config;
});

ApiClient.instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config?.url?.includes("/logout")) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !error.config._retry &&
      useAuthStore.getState().isLoggedIn
    ) {
      error.config._retry = true;
      try {
        authService.logout();
        await authService.refreshToken();
        return ApiClient.instance(error.config);
      } catch {
        requestManager.abortAll();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
