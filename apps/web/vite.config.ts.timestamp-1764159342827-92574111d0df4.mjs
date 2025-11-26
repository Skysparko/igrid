// vite.config.ts
import path from "path";
import { vitePlugin as remix } from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/@remix-run+dev@2.15.0_@remix-run+react@2.15.0_react-dom@18.3.1_react@18.3.1__react@18.3_5a2604a42105a534fb46ec3e7289aa1b/node_modules/@remix-run/dev/dist/index.js";
import { sentryVitePlugin } from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/@sentry+vite-plugin@2.22.6/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { defineConfig, loadEnv } from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.6_terser@5.36.0/node_modules/vite/dist/node/index.js";
import { cjsInterop } from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/vite-plugin-cjs-interop@2.1.4/node_modules/vite-plugin-cjs-interop/dist/index.js";
import { viteStaticCopy } from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/vite-plugin-static-copy@1.0.6_vite@5.4.11_@types+node@20.17.6_terser@5.36.0_/node_modules/vite-plugin-static-copy/dist/index.js";
import svgr from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@4.27.4_typescript@5.4.5_vite@5.4.11_@types+node@20.17.6_terser@5.36.0_/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///home/skysparko/projects/igrid/node_modules/.pnpm/vite-tsconfig-paths@5.0.0_typescript@5.4.5_vite@5.4.11_@types+node@20.17.6_terser@5.36.0_/node_modules/vite-tsconfig-paths/dist/index.js";

// routes.ts
var routes = (defineRoutes) => {
  return defineRoutes((route) => {
    route("", "modules/layout.tsx", () => {
      route("", "modules/Landing/Landing.page.tsx", { index: true });
      route("auth", "modules/Auth/Auth.layout.tsx", () => {
        route("login", "modules/Auth/Login.page.tsx", { index: true });
        route("register", "modules/Auth/Register.page.tsx");
        route("create-new-password", "modules/Auth/CreateNewPassword.page.tsx");
        route("password-recovery", "modules/Auth/PasswordRecovery.page.tsx");
        route("mfa", "modules/Auth/MFA.page.tsx");
        route("verify-email", "modules/Auth/VerifyEmail.page.tsx");
        route("verify-email-pending", "modules/Auth/VerifyEmailPending.page.tsx");
      });
      route("", "modules/Navigation/NavigationWrapper.tsx", () => {
        route("", "modules/Dashboard/PublicDashboard.layout.tsx", () => {
          route("courses", "modules/Courses/Courses.page.tsx");
          route("course/:id", "modules/Courses/CourseView/CourseView.page.tsx");
        });
        route("dashboard", "modules/Dashboard/UserDashboard.layout.tsx", () => {
          route("", "modules/Statistics/Statistics.page.tsx", {
            index: true
          });
          route("settings", "modules/Dashboard/Settings/Settings.page.tsx");
          route("provider-information", "modules/ProviderInformation/ProviderInformation.page.tsx");
          route("announcements", "modules/Announcements/Announcements.page.tsx");
          route("profile/:id", "modules/Profile/Profile.page.tsx");
          route("course/:courseId/lesson", "modules/Courses/Lesson/Lesson.layout.tsx", () => {
            route(":lessonId", "modules/Courses/Lesson/Lesson.page.tsx");
          });
          route("admin", "modules/Admin/Admin.layout.tsx", () => {
            route("courses", "modules/Admin/Courses/Courses.page.tsx", {
              index: true
            });
            route("envs", "modules/Admin/Envs/Envs.page.tsx");
            route("beta-courses/new", "modules/Admin/AddCourse/AddCourse.tsx");
            route("courses/new-scorm", "modules/Admin/Scorm/CreateNewScormCourse.page.tsx");
            route("beta-courses/:id", "modules/Admin/EditCourse/EditCourse.tsx");
            route("users", "modules/Admin/Users/Users.page.tsx");
            route("users/:id", "modules/Admin/Users/User.page.tsx");
            route("users/new", "modules/Admin/Users/CreateNewUser.page.tsx");
            route("categories", "modules/Admin/Categories/Categories.page.tsx");
            route("categories/:id", "modules/Admin/Categories/Category.page.tsx");
            route("categories/new", "modules/Admin/Categories/CreateNewCategory.page.tsx");
            route("groups", "modules/Admin/Groups/Groups.page.tsx");
            route("groups/new", "modules/Admin/Groups/CreateGroup.page.tsx");
            route("groups/:id", "modules/Admin/Groups/EditGroup.page.tsx");
            route("announcements/new", "modules/Announcements/CreateAnnouncement.page.tsx");
            route("promotion-codes", "modules/Admin/PromotionCodes/PromotionCodes.page.tsx");
            route(
              "promotion-codes/new",
              "modules/Admin/PromotionCodes/CreatePromotionCode.page.tsx"
            );
            route(
              "promotion-codes/:id",
              "modules/Admin/PromotionCodes/PromotionCodeDetails.page.tsx"
            );
          });
        });
      });
    });
  });
};

// vite.config.ts
var __vite_injected_original_dirname = "/home/skysparko/projects/igrid/apps/web";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      svgr(),
      cjsInterop({
        dependencies: ["react-use"]
      }),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
          v3_singleFetch: true
        },
        ssr: false,
        // SPA MODE - Might migrate to React Router 7
        routes
      }),
      viteStaticCopy({
        targets: [
          {
            src: "app/locales/en/translation.json",
            dest: "locales/en"
          },
          {
            src: "app/locales/pl/translation.json",
            dest: "locales/pl"
          }
        ]
      }),
      tsconfigPaths(),
      sentryVitePlugin({
        org: env.SENTRY_ORG,
        project: env.SENTRY_PROJECT,
        authToken: env.SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: "./build/client/**"
        },
        telemetry: false
      })
    ],
    ssr: {
      noExternal: ["posthog-js", "posthog-js/react", "react-easy-crop"]
    },
    // https://github.com/remix-run/remix/issues/10156
    server: {
      warmup: {
        clientFiles: ["./app/**/*.tsx"]
      },
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        "~/": path.resolve(__vite_injected_original_dirname, "./app")
      }
    },
    build: {
      outDir: "build",
      sourcemap: true,
      rollupOptions: {
        external: ["fsevents"],
        output: {
          manualChunks: (id) => {
            if (id.includes("@remix-run")) {
              return "remix";
            }
          }
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true,
        include: [/node_modules\/posthog-js/, /node_modules\/posthog-js\/react/, /node_modules/]
      }
    },
    optimizeDeps: {
      include: ["@remix-run/react", "crypto-js", "posthog-js", "posthog-js/react"],
      exclude: ["fsevents"]
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicm91dGVzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvc2t5c3BhcmtvL3Byb2plY3RzL2lncmlkL2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9za3lzcGFya28vcHJvamVjdHMvaWdyaWQvYXBwcy93ZWIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvc2t5c3BhcmtvL3Byb2plY3RzL2lncmlkL2FwcHMvd2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgdml0ZVBsdWdpbiBhcyByZW1peCB9IGZyb20gXCJAcmVtaXgtcnVuL2RldlwiO1xuaW1wb3J0IHsgc2VudHJ5Vml0ZVBsdWdpbiB9IGZyb20gXCJAc2VudHJ5L3ZpdGUtcGx1Z2luXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgY2pzSW50ZXJvcCB9IGZyb20gXCJ2aXRlLXBsdWdpbi1janMtaW50ZXJvcFwiO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tIFwidml0ZS1wbHVnaW4tc3RhdGljLWNvcHlcIjtcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuXG5pbXBvcnQgeyByb3V0ZXMgfSBmcm9tIFwiLi9yb3V0ZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCksIFwiXCIpO1xuXG4gIHJldHVybiB7XG4gICAgcGx1Z2luczogW1xuICAgICAgc3ZncigpLFxuICAgICAgY2pzSW50ZXJvcCh7XG4gICAgICAgIGRlcGVuZGVuY2llczogW1wicmVhY3QtdXNlXCJdLFxuICAgICAgfSksXG4gICAgICByZW1peCh7XG4gICAgICAgIGZ1dHVyZToge1xuICAgICAgICAgIHYzX2ZldGNoZXJQZXJzaXN0OiB0cnVlLFxuICAgICAgICAgIHYzX3JlbGF0aXZlU3BsYXRQYXRoOiB0cnVlLFxuICAgICAgICAgIHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG4gICAgICAgICAgdjNfc2luZ2xlRmV0Y2g6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHNzcjogZmFsc2UsIC8vIFNQQSBNT0RFIC0gTWlnaHQgbWlncmF0ZSB0byBSZWFjdCBSb3V0ZXIgN1xuICAgICAgICByb3V0ZXMsXG4gICAgICB9KSxcbiAgICAgIHZpdGVTdGF0aWNDb3B5KHtcbiAgICAgICAgdGFyZ2V0czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJhcHAvbG9jYWxlcy9lbi90cmFuc2xhdGlvbi5qc29uXCIsXG4gICAgICAgICAgICBkZXN0OiBcImxvY2FsZXMvZW5cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogXCJhcHAvbG9jYWxlcy9wbC90cmFuc2xhdGlvbi5qc29uXCIsXG4gICAgICAgICAgICBkZXN0OiBcImxvY2FsZXMvcGxcIixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICB0c2NvbmZpZ1BhdGhzKCksXG4gICAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgICAgb3JnOiBlbnYuU0VOVFJZX09SRyxcbiAgICAgICAgcHJvamVjdDogZW52LlNFTlRSWV9QUk9KRUNULFxuICAgICAgICBhdXRoVG9rZW46IGVudi5TRU5UUllfQVVUSF9UT0tFTixcbiAgICAgICAgc291cmNlbWFwczoge1xuICAgICAgICAgIGFzc2V0czogXCIuL2J1aWxkL2NsaWVudC8qKlwiLFxuICAgICAgICB9LFxuICAgICAgICB0ZWxlbWV0cnk6IGZhbHNlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICBzc3I6IHtcbiAgICAgIG5vRXh0ZXJuYWw6IFtcInBvc3Rob2ctanNcIiwgXCJwb3N0aG9nLWpzL3JlYWN0XCIsIFwicmVhY3QtZWFzeS1jcm9wXCJdLFxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3JlbWl4LXJ1bi9yZW1peC9pc3N1ZXMvMTAxNTZcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHdhcm11cDoge1xuICAgICAgICBjbGllbnRGaWxlczogW1wiLi9hcHAvKiovKi50c3hcIl0sXG4gICAgICB9LFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgXCIvYXBpXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwifi9cIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL2FwcFwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgb3V0RGlyOiBcImJ1aWxkXCIsXG4gICAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOiBbXCJmc2V2ZW50c1wiXSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcyhcIkByZW1peC1ydW5cIikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwicmVtaXhcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgICB0cmFuc2Zvcm1NaXhlZEVzTW9kdWxlczogdHJ1ZSxcbiAgICAgICAgaW5jbHVkZTogWy9ub2RlX21vZHVsZXNcXC9wb3N0aG9nLWpzLywgL25vZGVfbW9kdWxlc1xcL3Bvc3Rob2ctanNcXC9yZWFjdC8sIC9ub2RlX21vZHVsZXMvXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBvcHRpbWl6ZURlcHM6IHtcbiAgICAgIGluY2x1ZGU6IFtcIkByZW1peC1ydW4vcmVhY3RcIiwgXCJjcnlwdG8tanNcIiwgXCJwb3N0aG9nLWpzXCIsIFwicG9zdGhvZy1qcy9yZWFjdFwiXSxcbiAgICAgIGV4Y2x1ZGU6IFtcImZzZXZlbnRzXCJdLFxuICAgIH0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvc2t5c3BhcmtvL3Byb2plY3RzL2lncmlkL2FwcHMvd2ViXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9za3lzcGFya28vcHJvamVjdHMvaWdyaWQvYXBwcy93ZWIvcm91dGVzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3NreXNwYXJrby9wcm9qZWN0cy9pZ3JpZC9hcHBzL3dlYi9yb3V0ZXMudHNcIjtpbXBvcnQgdHlwZSB7IERlZmluZVJvdXRlRnVuY3Rpb24sIFJvdXRlTWFuaWZlc3QgfSBmcm9tIFwiQHJlbWl4LXJ1bi9kZXYvZGlzdC9jb25maWcvcm91dGVzXCI7XG5cbmV4cG9ydCBjb25zdCByb3V0ZXM6IChcbiAgZGVmaW5lUm91dGVzOiAoY2FsbGJhY2s6IChkZWZpbmVSb3V0ZTogRGVmaW5lUm91dGVGdW5jdGlvbikgPT4gdm9pZCkgPT4gUm91dGVNYW5pZmVzdCxcbikgPT4gUm91dGVNYW5pZmVzdCB8IFByb21pc2U8Um91dGVNYW5pZmVzdD4gPSAoZGVmaW5lUm91dGVzKSA9PiB7XG4gIHJldHVybiBkZWZpbmVSb3V0ZXMoKHJvdXRlKSA9PiB7XG4gICAgcm91dGUoXCJcIiwgXCJtb2R1bGVzL2xheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgcm91dGUoXCJcIiwgXCJtb2R1bGVzL0xhbmRpbmcvTGFuZGluZy5wYWdlLnRzeFwiLCB7IGluZGV4OiB0cnVlIH0pO1xuICAgICAgcm91dGUoXCJhdXRoXCIsIFwibW9kdWxlcy9BdXRoL0F1dGgubGF5b3V0LnRzeFwiLCAoKSA9PiB7XG4gICAgICAgIHJvdXRlKFwibG9naW5cIiwgXCJtb2R1bGVzL0F1dGgvTG9naW4ucGFnZS50c3hcIiwgeyBpbmRleDogdHJ1ZSB9KTtcbiAgICAgICAgcm91dGUoXCJyZWdpc3RlclwiLCBcIm1vZHVsZXMvQXV0aC9SZWdpc3Rlci5wYWdlLnRzeFwiKTtcbiAgICAgICAgcm91dGUoXCJjcmVhdGUtbmV3LXBhc3N3b3JkXCIsIFwibW9kdWxlcy9BdXRoL0NyZWF0ZU5ld1Bhc3N3b3JkLnBhZ2UudHN4XCIpO1xuICAgICAgICByb3V0ZShcInBhc3N3b3JkLXJlY292ZXJ5XCIsIFwibW9kdWxlcy9BdXRoL1Bhc3N3b3JkUmVjb3ZlcnkucGFnZS50c3hcIik7XG4gICAgICAgIHJvdXRlKFwibWZhXCIsIFwibW9kdWxlcy9BdXRoL01GQS5wYWdlLnRzeFwiKTtcbiAgICAgICAgcm91dGUoXCJ2ZXJpZnktZW1haWxcIiwgXCJtb2R1bGVzL0F1dGgvVmVyaWZ5RW1haWwucGFnZS50c3hcIik7XG4gICAgICAgIHJvdXRlKFwidmVyaWZ5LWVtYWlsLXBlbmRpbmdcIiwgXCJtb2R1bGVzL0F1dGgvVmVyaWZ5RW1haWxQZW5kaW5nLnBhZ2UudHN4XCIpO1xuICAgICAgfSk7XG4gICAgICByb3V0ZShcIlwiLCBcIm1vZHVsZXMvTmF2aWdhdGlvbi9OYXZpZ2F0aW9uV3JhcHBlci50c3hcIiwgKCkgPT4ge1xuICAgICAgICByb3V0ZShcIlwiLCBcIm1vZHVsZXMvRGFzaGJvYXJkL1B1YmxpY0Rhc2hib2FyZC5sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICByb3V0ZShcImNvdXJzZXNcIiwgXCJtb2R1bGVzL0NvdXJzZXMvQ291cnNlcy5wYWdlLnRzeFwiKTtcbiAgICAgICAgICByb3V0ZShcImNvdXJzZS86aWRcIiwgXCJtb2R1bGVzL0NvdXJzZXMvQ291cnNlVmlldy9Db3Vyc2VWaWV3LnBhZ2UudHN4XCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcm91dGUoXCJkYXNoYm9hcmRcIiwgXCJtb2R1bGVzL0Rhc2hib2FyZC9Vc2VyRGFzaGJvYXJkLmxheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgIHJvdXRlKFwiXCIsIFwibW9kdWxlcy9TdGF0aXN0aWNzL1N0YXRpc3RpY3MucGFnZS50c3hcIiwge1xuICAgICAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcm91dGUoXCJzZXR0aW5nc1wiLCBcIm1vZHVsZXMvRGFzaGJvYXJkL1NldHRpbmdzL1NldHRpbmdzLnBhZ2UudHN4XCIpO1xuICAgICAgICAgIHJvdXRlKFwicHJvdmlkZXItaW5mb3JtYXRpb25cIiwgXCJtb2R1bGVzL1Byb3ZpZGVySW5mb3JtYXRpb24vUHJvdmlkZXJJbmZvcm1hdGlvbi5wYWdlLnRzeFwiKTtcbiAgICAgICAgICByb3V0ZShcImFubm91bmNlbWVudHNcIiwgXCJtb2R1bGVzL0Fubm91bmNlbWVudHMvQW5ub3VuY2VtZW50cy5wYWdlLnRzeFwiKTtcbiAgICAgICAgICByb3V0ZShcInByb2ZpbGUvOmlkXCIsIFwibW9kdWxlcy9Qcm9maWxlL1Byb2ZpbGUucGFnZS50c3hcIik7XG4gICAgICAgICAgcm91dGUoXCJjb3Vyc2UvOmNvdXJzZUlkL2xlc3NvblwiLCBcIm1vZHVsZXMvQ291cnNlcy9MZXNzb24vTGVzc29uLmxheW91dC50c3hcIiwgKCkgPT4ge1xuICAgICAgICAgICAgcm91dGUoXCI6bGVzc29uSWRcIiwgXCJtb2R1bGVzL0NvdXJzZXMvTGVzc29uL0xlc3Nvbi5wYWdlLnRzeFwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByb3V0ZShcImFkbWluXCIsIFwibW9kdWxlcy9BZG1pbi9BZG1pbi5sYXlvdXQudHN4XCIsICgpID0+IHtcbiAgICAgICAgICAgIHJvdXRlKFwiY291cnNlc1wiLCBcIm1vZHVsZXMvQWRtaW4vQ291cnNlcy9Db3Vyc2VzLnBhZ2UudHN4XCIsIHtcbiAgICAgICAgICAgICAgaW5kZXg6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvdXRlKFwiZW52c1wiLCBcIm1vZHVsZXMvQWRtaW4vRW52cy9FbnZzLnBhZ2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJiZXRhLWNvdXJzZXMvbmV3XCIsIFwibW9kdWxlcy9BZG1pbi9BZGRDb3Vyc2UvQWRkQ291cnNlLnRzeFwiKTtcbiAgICAgICAgICAgIHJvdXRlKFwiY291cnNlcy9uZXctc2Nvcm1cIiwgXCJtb2R1bGVzL0FkbWluL1Njb3JtL0NyZWF0ZU5ld1Njb3JtQ291cnNlLnBhZ2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJiZXRhLWNvdXJzZXMvOmlkXCIsIFwibW9kdWxlcy9BZG1pbi9FZGl0Q291cnNlL0VkaXRDb3Vyc2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJ1c2Vyc1wiLCBcIm1vZHVsZXMvQWRtaW4vVXNlcnMvVXNlcnMucGFnZS50c3hcIik7XG4gICAgICAgICAgICByb3V0ZShcInVzZXJzLzppZFwiLCBcIm1vZHVsZXMvQWRtaW4vVXNlcnMvVXNlci5wYWdlLnRzeFwiKTtcbiAgICAgICAgICAgIHJvdXRlKFwidXNlcnMvbmV3XCIsIFwibW9kdWxlcy9BZG1pbi9Vc2Vycy9DcmVhdGVOZXdVc2VyLnBhZ2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJjYXRlZ29yaWVzXCIsIFwibW9kdWxlcy9BZG1pbi9DYXRlZ29yaWVzL0NhdGVnb3JpZXMucGFnZS50c3hcIik7XG4gICAgICAgICAgICByb3V0ZShcImNhdGVnb3JpZXMvOmlkXCIsIFwibW9kdWxlcy9BZG1pbi9DYXRlZ29yaWVzL0NhdGVnb3J5LnBhZ2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJjYXRlZ29yaWVzL25ld1wiLCBcIm1vZHVsZXMvQWRtaW4vQ2F0ZWdvcmllcy9DcmVhdGVOZXdDYXRlZ29yeS5wYWdlLnRzeFwiKTtcbiAgICAgICAgICAgIHJvdXRlKFwiZ3JvdXBzXCIsIFwibW9kdWxlcy9BZG1pbi9Hcm91cHMvR3JvdXBzLnBhZ2UudHN4XCIpO1xuICAgICAgICAgICAgcm91dGUoXCJncm91cHMvbmV3XCIsIFwibW9kdWxlcy9BZG1pbi9Hcm91cHMvQ3JlYXRlR3JvdXAucGFnZS50c3hcIik7XG4gICAgICAgICAgICByb3V0ZShcImdyb3Vwcy86aWRcIiwgXCJtb2R1bGVzL0FkbWluL0dyb3Vwcy9FZGl0R3JvdXAucGFnZS50c3hcIik7XG4gICAgICAgICAgICByb3V0ZShcImFubm91bmNlbWVudHMvbmV3XCIsIFwibW9kdWxlcy9Bbm5vdW5jZW1lbnRzL0NyZWF0ZUFubm91bmNlbWVudC5wYWdlLnRzeFwiKTtcbiAgICAgICAgICAgIHJvdXRlKFwicHJvbW90aW9uLWNvZGVzXCIsIFwibW9kdWxlcy9BZG1pbi9Qcm9tb3Rpb25Db2Rlcy9Qcm9tb3Rpb25Db2Rlcy5wYWdlLnRzeFwiKTtcbiAgICAgICAgICAgIHJvdXRlKFxuICAgICAgICAgICAgICBcInByb21vdGlvbi1jb2Rlcy9uZXdcIixcbiAgICAgICAgICAgICAgXCJtb2R1bGVzL0FkbWluL1Byb21vdGlvbkNvZGVzL0NyZWF0ZVByb21vdGlvbkNvZGUucGFnZS50c3hcIixcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByb3V0ZShcbiAgICAgICAgICAgICAgXCJwcm9tb3Rpb24tY29kZXMvOmlkXCIsXG4gICAgICAgICAgICAgIFwibW9kdWxlcy9BZG1pbi9Qcm9tb3Rpb25Db2Rlcy9Qcm9tb3Rpb25Db2RlRGV0YWlscy5wYWdlLnRzeFwiLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UyxPQUFPLFVBQVU7QUFFeFQsU0FBUyxjQUFjLGFBQWE7QUFDcEMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyxjQUFjLGVBQWU7QUFDdEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxzQkFBc0I7QUFDL0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1COzs7QUNObkIsSUFBTSxTQUVpQyxDQUFDLGlCQUFpQjtBQUM5RCxTQUFPLGFBQWEsQ0FBQyxVQUFVO0FBQzdCLFVBQU0sSUFBSSxzQkFBc0IsTUFBTTtBQUNwQyxZQUFNLElBQUksb0NBQW9DLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDN0QsWUFBTSxRQUFRLGdDQUFnQyxNQUFNO0FBQ2xELGNBQU0sU0FBUywrQkFBK0IsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUM3RCxjQUFNLFlBQVksZ0NBQWdDO0FBQ2xELGNBQU0sdUJBQXVCLHlDQUF5QztBQUN0RSxjQUFNLHFCQUFxQix3Q0FBd0M7QUFDbkUsY0FBTSxPQUFPLDJCQUEyQjtBQUN4QyxjQUFNLGdCQUFnQixtQ0FBbUM7QUFDekQsY0FBTSx3QkFBd0IsMENBQTBDO0FBQUEsTUFDMUUsQ0FBQztBQUNELFlBQU0sSUFBSSw0Q0FBNEMsTUFBTTtBQUMxRCxjQUFNLElBQUksZ0RBQWdELE1BQU07QUFDOUQsZ0JBQU0sV0FBVyxrQ0FBa0M7QUFDbkQsZ0JBQU0sY0FBYyxnREFBZ0Q7QUFBQSxRQUN0RSxDQUFDO0FBQ0QsY0FBTSxhQUFhLDhDQUE4QyxNQUFNO0FBQ3JFLGdCQUFNLElBQUksMENBQTBDO0FBQUEsWUFDbEQsT0FBTztBQUFBLFVBQ1QsQ0FBQztBQUNELGdCQUFNLFlBQVksOENBQThDO0FBQ2hFLGdCQUFNLHdCQUF3QiwwREFBMEQ7QUFDeEYsZ0JBQU0saUJBQWlCLDhDQUE4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
