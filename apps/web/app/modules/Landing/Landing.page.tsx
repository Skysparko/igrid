import { useEffect } from "react";

import { useAvailableCourses } from "~/api/queries/useAvailableCourses";
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

export default function LandingPage() {
  const { data: courses, isLoading, error } = useAvailableCourses();

  useEffect(() => {
    if (error) {
      console.error("Error fetching courses:", error);
    }
  }, [error]);

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Above-the-fold hero */}
      <Hero />

      {/* Social proof — partner logos */}
      <Partners />

      {/* Goal-based learning paths */}
      <LearningPaths />

      {/* Promotional offers */}
      <PromotionalBanners />

      {/* Platform capabilities */}
      <Features />

      {/* Onboarding clarity */}
      <HowItWorks />

      {/* Course discovery */}
      <TrendingCourses courses={courses} isLoading={isLoading} />
      <Categories />
      <HotReleases courses={courses} isLoading={isLoading} />

      {/* White label pitch */}
      <WhiteLabel />

      {/* Pricing */}
      {/*<Pricing />*/}

      {/* Final conversion CTA */}
      <CTA />

      <Footer />
    </main>
  );
}
