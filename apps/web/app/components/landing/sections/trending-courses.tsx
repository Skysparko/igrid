import { Link } from "@remix-run/react";
import { Star, Flame, Zap } from "lucide-react";
import { motion } from "motion/react";

import DefaultPhotoCourse from "~/assets/svgs/default-photo-course.svg";

import type { GetAvailableCoursesResponse } from "~/api/generated-api";
import type { LandingScreenContent } from "~/types/contentful";

interface TrendingCoursesProps {
  courses?: GetAvailableCoursesResponse["data"];
  isLoading?: boolean;
  content?: LandingScreenContent;
}

const sections = [
  { label: "Most Popular", icon: Flame, color: "text-orange-500" },
  { label: "Weekly Spotlight", icon: Star, color: "text-yellow-500" },
  { label: "In-Demand Skills", icon: Zap, color: "text-primary-500" },
];

function SkeletonCard() {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 animate-pulse">
      <div className="h-14 w-14 rounded-lg bg-gray-200 flex-shrink-0" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3.5 bg-gray-200 rounded w-full" />
        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
      </div>
    </div>
  );
}

export default function TrendingCourses({ courses, isLoading, content }: TrendingCoursesProps) {
  const sectionTitle = content?.trendingTitle ?? "Trending right now";

  if (isLoading) {
    return (
      <section className="py-14 px-4 bg-gray-50/60">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8 animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-36 animate-pulse" />
                {[0, 1, 2].map((j) => (
                  <SkeletonCard key={j} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!courses || courses.length === 0) return null;

  const splits = [courses.slice(0, 3), courses.slice(3, 6), courses.slice(6, 9)];

  return (
    <section className="py-14 px-4 bg-gray-50/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{sectionTitle}</h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 hidden sm:block"
          >
            View all courses →
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {sections.map(({ label, icon: Icon, color }, si) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: si * 0.1 }}
            >
              <div className={`flex items-center gap-2 mb-4`}>
                <Icon className={`h-4 w-4 ${color}`} />
                <h3 className="text-base font-semibold text-gray-800">{label}</h3>
              </div>
              <div className="space-y-2.5">
                {splits[si].map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="group flex items-start gap-3 p-3 rounded-xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
                  >
                    <img
                      src={course.thumbnailUrl || DefaultPhotoCourse}
                      alt={course.title}
                      className="h-14 w-14 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DefaultPhotoCourse;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-400 mb-0.5 truncate">
                        {course.author || "Instructor"}
                      </p>
                      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary-700 transition-colors">
                        {course.title}
                      </h4>
                      <div className="mt-1.5 flex items-center gap-2">
                        {course.category && (
                          <span className="text-xs text-gray-400 truncate">{course.category}</span>
                        )}
                        {course.priceInCents === 0 && (
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                            Free
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
