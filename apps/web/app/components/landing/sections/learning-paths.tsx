import { Link } from "@remix-run/react";
import { TrendingUp, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const paths = [
  {
    icon: TrendingUp,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    title: "Launch a New Career",
    description:
      "Build job-ready skills with professional certificates designed with top employers.",
  },
  {
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    title: "Gain In-Demand Skills",
    description: "Learn from industry experts and stay ahead of the curve in your field.",
  },
  {
    icon: GraduationCap,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
    title: "Earn a Degree",
    description: "Pursue accredited online degrees from top universities at your own pace.",
  },
];

export default function LearningPaths() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What do you want to achieve?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-5">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Link
                to="/courses"
                className={`group flex flex-col h-full rounded-2xl border ${path.border} bg-white p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-300`}
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${path.bg} mb-5`}
                >
                  <path.icon className={`h-6 w-6 ${path.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{path.description}</p>
                <div className={`mt-5 flex items-center gap-1.5 text-sm font-medium ${path.color}`}>
                  Explore paths
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
