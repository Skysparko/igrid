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
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import type { GetAllCategoriesResponse } from "~/api/generated-api";
import type { LandingScreenContent } from "~/types/contentful";

const STYLE_PALETTE: { icon: LucideIcon; color: string; bg: string; border: string }[] = [
  { icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
  {
    icon: TrendingUp,
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  { icon: Code, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  { icon: Laptop, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
  { icon: Rocket, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" },
  { icon: HeartPulse, color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-100" },
  { icon: Globe, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
  { icon: Users, color: "text-green-600", bg: "bg-green-50", border: "border-green-100" },
  { icon: PenTool, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-100" },
  { icon: Atom, color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
  { icon: Calculator, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
];

const FALLBACK_CATEGORIES = [
  "Business",
  "Artificial Intelligence",
  "Data Science",
  "Computer Science",
  "Information Technology",
  "Personal Development",
  "Healthcare",
  "Language Learning",
  "Social Sciences",
  "Arts & Humanities",
  "Physical Science",
  "Math & Logic",
];

interface CategoriesProps {
  content?: LandingScreenContent;
  categories?: GetAllCategoriesResponse["data"];
  isLoading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50 animate-pulse">
      <div className="h-10 w-10 rounded-xl bg-gray-200" />
      <div className="h-3 w-16 rounded bg-gray-200" />
    </div>
  );
}

export default function Categories({ content, categories, isLoading }: CategoriesProps) {
  const sectionTitle = content?.categoryTitle ?? "Explore by category";

  const items: { id: string; name: string }[] =
    categories && categories.length > 0
      ? categories.map((c) => ({ id: c.id, name: c.title }))
      : FALLBACK_CATEGORIES.map((name) => ({ id: name, name }));

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{sectionTitle}</h2>
          <Link
            to="/courses"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 hidden sm:block"
          >
            Browse all categories →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
            : items.map((cat, index) => {
                const style = STYLE_PALETTE[index % STYLE_PALETTE.length];
                const Icon = style.icon;
                return (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <Link
                      to={`/courses?category=${encodeURIComponent(cat.name)}`}
                      className={`group flex flex-col items-center gap-3 p-4 rounded-2xl border ${style.border} ${style.bg} hover:shadow-md hover:-translate-y-1 transition-all duration-200`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                        <Icon className={`h-5 w-5 ${style.color}`} />
                      </div>
                      <span
                        className={`text-xs font-semibold text-center leading-tight ${style.color}`}
                      >
                        {cat.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
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
