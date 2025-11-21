import { useLocation, useNavigate } from "@remix-run/react";
import { useLayoutEffect } from "react";

import { routeAccessConfig } from "~/config/routeAccessConfig";
import { useUserRole } from "~/hooks/useUserRole";

import type { ReactNode } from "react";
import type { UserRole } from "~/config/userRoles";

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["courses", "course"];

export const checkRouteAccess = (path: string, userRole: UserRole | undefined) => {
  // Allow public access to courses routes
  if (!userRole) {
    const isPublicRoute = PUBLIC_ROUTES.some(
      (route) => path === route || path.startsWith(`${route}/`),
    );
    if (isPublicRoute) {
      return true;
    }
    return false;
  }

  for (const [pattern, roles] of Object.entries(routeAccessConfig)) {
    const patternSegments = pattern.split("/");
    const pathSegments = path.split("/");

    if (pattern.endsWith("/*")) {
      const prefix = pattern.slice(0, -2);
      if (path.startsWith(prefix) && roles.includes(userRole)) {
        return true;
      }
      continue;
    }

    if (patternSegments.length !== pathSegments.length) {
      continue;
    }

    const matches = patternSegments.every((segment, index) => {
      if (segment.startsWith(":")) {
        return true;
      }

      return segment === pathSegments[index];
    });

    if (matches && roles.includes(userRole)) {
      return true;
    }
  }

  return false;
};

export const RouteGuard = ({ children }: { children: ReactNode }) => {
  const { role } = useUserRole();
  const navigate = useNavigate();
  const location = useLocation();

  const hasAccess = checkRouteAccess(location.pathname.replace("/", ""), role as UserRole);

  useLayoutEffect(() => {
    if (!hasAccess) {
      navigate("/dashboard");
    }
  }, [hasAccess, navigate]);

  if (!hasAccess) return null;

  return <>{children}</>;
};
