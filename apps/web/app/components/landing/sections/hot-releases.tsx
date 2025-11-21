import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

import DefaultPhotoCourse from "~/assets/svgs/default-photo-course.svg";
import { Button } from "~/components/ui/button";

import type { GetAvailableCoursesResponse } from "~/api/generated-api";

interface HotReleasesProps {
  courses?: GetAvailableCoursesResponse["data"];
  isLoading?: boolean;
}

const gradients = [
  "from-blue-400 to-blue-600",
  "from-orange-400 to-orange-600",
  "from-purple-400 to-pink-500",
  "from-green-400 to-blue-500",
];

export default function HotReleases({ courses, isLoading }: HotReleasesProps) {
  const featuredCourses = courses?.slice(0, 4) || [];

  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8 mb-8">
            <div className="bg-blue-600 text-white rounded-lg p-8 flex-1 h-64 animate-pulse"></div>
            <div className="hidden lg:grid grid-cols-2 gap-4 flex-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 mb-8">
          <div className="bg-blue-600 text-white rounded-lg p-8 flex-1 min-h-[200px] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hot new releases</h2>
              <p className="text-blue-100 mb-6">
                Discover the latest courses from top instructors and institutions
              </p>
            </div>
            <Link to="/courses">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Explore courses <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          {featuredCourses.length > 0 && (
            <div className="hidden lg:grid grid-cols-2 gap-4 flex-1">
              {featuredCourses.map((course, index) => (
                <Link
                  key={course.id}
                  to={`/course/${course.id}`}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-32">
                    <img
                      src={course.thumbnailUrl || DefaultPhotoCourse}
                      alt={course.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DefaultPhotoCourse;
                      }}
                    />
                    {!course.thumbnailUrl && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                      ></div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">
                      {course.author || "Instructor"}
                    </div>
                    <h3 className="font-semibold text-sm mb-2 text-gray-900 line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-2">{course.category || "Course"}</div>
                    {course.priceInCents === 0 && (
                      <div className="text-xs text-green-600 font-medium">Free</div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        {featuredCourses.length > 0 && (
          <div className="lg:hidden grid grid-cols-2 gap-4">
            {featuredCourses.map((course, index) => (
              <Link
                key={course.id}
                to={`/course/${course.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-24">
                  <img
                    src={course.thumbnailUrl || DefaultPhotoCourse}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DefaultPhotoCourse;
                    }}
                  />
                  {!course.thumbnailUrl && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]}`}
                    ></div>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">{course.author || "Instructor"}</div>
                  <h3 className="font-semibold text-xs mb-1 text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  {course.priceInCents === 0 && (
                    <div className="text-xs text-green-600 font-medium">Free</div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
