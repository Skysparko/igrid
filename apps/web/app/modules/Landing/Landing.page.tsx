import { useEffect } from "react";

import { useAvailableCourses } from "~/api/queries/useAvailableCourses";
import Categories from "~/components/landing/sections/categories";
import Footer from "~/components/landing/sections/footer";
import Header from "~/components/landing/sections/header";
import HotReleases from "~/components/landing/sections/hot-releases";
import LearningPaths from "~/components/landing/sections/learning-paths";
import Partners from "~/components/landing/sections/partners";
import PromotionalBanners from "~/components/landing/sections/promotional-banners";
import TrendingCourses from "~/components/landing/sections/trending-courses";

import type { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "iGird - Girding Minds for a Changing World" },
    { name: "description", content: "Learn with iGird. Girding Minds for a Changing World." },
  ];
};

export default function LandingPage() {
  const { data: courses, isLoading, error } = useAvailableCourses();

  useEffect(() => {
    if (error) {
      console.error("Error fetching courses:", error);
    }
    if (courses) {
      console.log("Courses loaded:", courses.length, courses);
    }
  }, [courses, error]);

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <div className="w-full">
        <PromotionalBanners />
        <LearningPaths />
        <Partners />
        <TrendingCourses courses={courses} isLoading={isLoading} />
        <Categories />
        <HotReleases courses={courses} isLoading={isLoading} />
      </div>
      <Footer />
    </main>
  );
}
