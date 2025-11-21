import { Link } from "@remix-run/react";

import DefaultPhotoCourse from "~/assets/svgs/default-photo-course.svg";

import type { GetAvailableCoursesResponse } from "~/api/generated-api";

interface TrendingCoursesProps {
  courses?: GetAvailableCoursesResponse["data"];
  isLoading?: boolean;
}

export default function TrendingCourses({ courses, isLoading }: TrendingCoursesProps) {
  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <div className="h-6 bg-gray-200 rounded mb-4 w-32 animate-pulse"></div>
                <div className="space-y-4">
                  <div className="h-20 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!courses || courses.length === 0) {
    return null;
  }

  const sections = [
    {
      title: "Most popular →",
      courses: courses.slice(0, 3),
    },
    {
      title: "Weekly spotlight →",
      courses: courses.slice(3, 6),
    },
    {
      title: "In-demand skills →",
      courses: courses.slice(6, 9),
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-900">
                {section.title}
              </h3>
              <div className="space-y-3 md:space-y-4">
                {section.courses.map((course) => (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="block bg-white border border-gray-200 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <img
                        src={course.thumbnailUrl || DefaultPhotoCourse}
                        alt={course.title}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DefaultPhotoCourse;
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-500 mb-1 line-clamp-1">
                          {course.author || "Instructor"}
                        </div>
                        <h4 className="font-semibold text-xs md:text-sm text-gray-900 line-clamp-2 mb-1">
                          {course.title}
                        </h4>
                        <div className="text-xs text-gray-500 mb-1">
                          {course.category || "Course"}
                        </div>
                        {course.priceInCents === 0 && (
                          <div className="text-xs text-green-600 font-medium">Free</div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
