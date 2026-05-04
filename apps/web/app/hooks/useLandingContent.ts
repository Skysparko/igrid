import { useQuery } from "@tanstack/react-query";

import { fetchLandingContent, isContentfulConfigured } from "~/lib/contentful";

export function useLandingContent() {
  return useQuery({
    queryKey: ["contentful", "landing-screen"],
    queryFn: fetchLandingContent,
    enabled: isContentfulConfigured(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
}
