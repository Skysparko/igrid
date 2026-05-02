import { Link } from "@remix-run/react";
import { ArrowRight, Flame } from "lucide-react";
import { motion } from "motion/react";

import DefaultPhotoCourse from "~/assets/svgs/default-photo-course.svg";
import { Button } from "~/components/ui/button";

import type { GetAvailableCoursesResponse } from "~/api/generated-api";

interface HotReleasesProps {
  courses?: GetAvailableCoursesResponse["data"];
  isLoading?: boolean;
}

const gradients = [
  "from-primary-400 to-primary-600",
  "from-orange-400 to-pink-500",
  "from-violet-400 to-purple-600",
  "from-emerald-400 to-teal-600",
];

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-32 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
      </div>
    </div>
  );
}

export default function HotReleases({ courses, isLoading }: HotReleasesProps) {
  const featuredCourses = courses?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-14 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="h-64 rounded-2xl bg-gray-200 animate-pulse flex-shrink-0 lg:w-72" />
            <div className="grid grid-cols-2 gap-4 flex-1">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row items-stretch gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left promo card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-900 p-8 text-white flex flex-col justify-between min-h-[240px] lg:w-72 flex-shrink-0 shadow-lg shadow-primary-200/40">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/8 blur-xl" />
            </div>
            <div className="relative">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white mb-4">
                <Flame className="h-3 w-3" />
                New This Week
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-snug">Hot new releases</h2>
              <p className="text-primary-100 text-sm leading-relaxed">
                Discover the latest courses from top instructors and institutions, added this week.
              </p>
            </div>
            <Link to="/courses" className="relative mt-6 inline-block">
              <Button className="bg-white text-primary-700 hover:bg-primary-50 font-semibold gap-2 shadow-sm">
                Explore all courses
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Course cards grid */}
          {featuredCourses.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 flex-1">
              {featuredCourses.map((course, index) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="relative h-32 overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DefaultPhotoCourse;
                        }}
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                      />
                    )}
                    {course.priceInCents === 0 && (
                      <span className="absolute top-2 left-2 text-xs font-semibold bg-white text-emerald-600 px-2 py-0.5 rounded-full shadow-sm">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-400 mb-1 truncate">
                      {course.author || "Instructor"}
                    </p>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-primary-700 transition-colors">
                      {course.title}
                    </h3>
                    {course.category && (
                      <p className="mt-1.5 text-xs text-gray-400 truncate">{course.category}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
              <div>
                <p className="text-gray-400 text-sm">No courses yet — check back soon!</p>
                <Link
                  to="/courses"
                  className="mt-3 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Browse available courses →
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
