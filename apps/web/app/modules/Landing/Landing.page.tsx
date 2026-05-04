import { useEffect } from "react";

import { useAvailableCourses } from "~/api/queries/useAvailableCourses";
import { useCategories } from "~/api/queries/useCategories";
import Categories from "~/components/landing/sections/categories";
import CTA from "~/components/landing/sections/cta";
import Features from "~/components/landing/sections/features";
import Footer from "~/components/landing/sections/footer";
import Header from "~/components/landing/sections/header";
import Hero from "~/components/landing/sections/hero";
import HotReleases from "~/components/landing/sections/hot-releases";
import HowItWorks from "~/components/landing/sections/how-it-works";
import LearningPaths from "~/components/landing/sections/learning-paths";
import Partners from "~/components/landing/sections/partners";
import PromotionalBanners from "~/components/landing/sections/promotional-banners";
import TrendingCourses from "~/components/landing/sections/trending-courses";
import WhiteLabel from "~/components/landing/sections/white-label";
import { useLandingContent } from "~/hooks/useLandingContent";
import { isContentfulConfigured } from "~/lib/contentful";

import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "iGird — Girding Minds for a Changing World" },
    {
      name: "description",
      content:
        "iGird is a modern learning management platform for organizations, educators, and learners. AI-powered mentoring, rich course content, and detailed analytics in one place.",
    },
  ];
};

function ContentSourceBadge({ isLive }: { isLive: boolean }) {
  if (!import.meta.env.DEV) return null;
  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm select-none pointer-events-none"
      style={
        isLive
          ? { background: "#f0fdf4", borderColor: "#86efac", color: "#15803d" }
          : { background: "#fff7ed", borderColor: "#fdba74", color: "#c2410c" }
      }
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: isLive ? "#22c55e" : "#f97316" }}
      />
      {isLive ? "CMS: Contentful" : "CMS: Local fallback"}
    </div>
  );
}

export default function LandingPage() {
  const { data: courses, isLoading, error } = useAvailableCourses();
  const { data: categories, isLoading: categoriesLoading } = useCategories({ archived: false });
  const { data: content } = useLandingContent();

  useEffect(() => {
    if (error) {
      console.error("Error fetching courses:", error);
    }
  }, [error]);

  return (
    <main className="bg-white min-h-screen">
      <ContentSourceBadge isLive={isContentfulConfigured() && content != null} />
      <Header />

      <Hero content={content ?? undefined} />

      <Partners content={content ?? undefined} />

      <LearningPaths content={content ?? undefined} />

      <PromotionalBanners content={content ?? undefined} />

      <Features content={content ?? undefined} />

      <HowItWorks content={content ?? undefined} />

      <TrendingCourses courses={courses} isLoading={isLoading} content={content ?? undefined} />
      <Categories
        content={content ?? undefined}
        categories={categories}
        isLoading={categoriesLoading}
      />
      <HotReleases courses={courses} isLoading={isLoading} content={content ?? undefined} />

      <WhiteLabel content={content ?? undefined} />

      <CTA content={content ?? undefined} />

      <Footer />
    </main>
  );
}
