import { memo } from "react";

import { usePlatformSimpleLogo } from "~/api/queries";
import { usePlatformLogo } from "~/hooks/usePlatformLogo";
import { cn } from "~/lib/utils";

import iGirdFavi from "../assets/iGird favi.png";
import iGirdLogo from "../assets/iGird logo.png";

interface PlatformLogoProps {
  className?: string;
  variant?: "full" | "signet";
  alt?: string;
}

export const PlatformLogo = memo(
  ({ className, variant = "full", alt = "Platform Logo" }: PlatformLogoProps) => {
    const { data: customLogoUrl, isLoading } = usePlatformLogo();
    const { data: customSimpleLogoUrl, isLoading: isSimpleLogoLoading } = usePlatformSimpleLogo();

    if (isLoading) {
      return <div className={className}></div>;
    }

    if (customLogoUrl && !isLoading && variant === "full") {
      return (
        <img
          src={customLogoUrl}
          alt={alt}
          className={cn("object-contain", className)}
          loading="eager"
          decoding="async"
        />
      );
    }

    if (customSimpleLogoUrl && !isSimpleLogoLoading && variant === "signet") {
      return (
        <img
          src={customSimpleLogoUrl}
          alt={alt}
          className={cn("object-contain", className)}
          loading="eager"
          decoding="async"
        />
      );
    }

    if (variant === "signet") {
      return (
        <img
          src={iGirdFavi}
          alt={alt}
          className={cn("object-contain", className)}
          loading="eager"
          decoding="async"
        />
      );
    }

    return (
      <img
        src={iGirdLogo}
        alt={alt}
        className={cn("object-contain", className)}
        loading="eager"
        decoding="async"
      />
    );
  },
);

PlatformLogo.displayName = "PlatformLogo";
