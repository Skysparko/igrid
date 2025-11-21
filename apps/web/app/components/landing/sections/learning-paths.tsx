import { Link } from "@remix-run/react";
import { TrendingUp, BookOpen, GraduationCap } from "lucide-react";

export default function LearningPaths() {
  const paths = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Launch a new career",
      description: "Build job-ready skills with professional certificates",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      title: "Gain in-demand skills",
      description: "Learn from industry experts and stay ahead",
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-purple-600" />,
      title: "Earn a degree",
      description: "Pursue accredited degrees from top universities",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {paths.map((path, index) => (
            <Link
              key={index}
              to="/courses"
              className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="mb-4">{path.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{path.title}</h3>
              <p className="text-gray-600">{path.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
