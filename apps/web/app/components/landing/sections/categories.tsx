import { Link } from "@remix-run/react";
import {
  Briefcase,
  Sparkles,
  TrendingUp,
  Code,
  Laptop,
  Rocket,
  HeartPulse,
  Globe,
  Users,
  PenTool,
  Atom,
  Calculator,
} from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    name: "Business",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-100",
  },
  {
    name: "Artificial Intelligence",
    icon: Sparkles,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    name: "Data Science",
    icon: TrendingUp,
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    name: "Computer Science",
    icon: Code,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    name: "Information Technology",
    icon: Laptop,
    color: "text-sky-600",
    bg: "bg-sky-50",
    border: "border-sky-100",
  },
  {
    name: "Personal Development",
    icon: Rocket,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    color: "text-rose-600",
    bg: "bg-rose-50",
    border: "border-rose-100",
  },
  {
    name: "Language Learning",
    icon: Globe,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-100",
  },
  {
    name: "Social Sciences",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    name: "Arts & Humanities",
    icon: PenTool,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "border-pink-100",
  },
  {
    name: "Physical Science",
    icon: Atom,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "border-cyan-100",
  },
  {
    name: "Math & Logic",
    icon: Calculator,
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-100",
  },
];

export default function Categories() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore by category</h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 hidden sm:block"
          >
            Browse all categories →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <Link
                to="/courses"
                className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border ${cat.border} ${cat.bg} hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm`}
                >
                  <cat.icon className={`h-5 w-5 ${cat.color}`} />
                </div>
                <span className={`text-xs font-semibold text-center leading-tight ${cat.color}`}>
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 sm:hidden text-center">
          <Link
            to="/courses"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Browse all categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
