import { Link } from "@remix-run/react";
import {
  Briefcase,
  Sparkles,
  TrendingUp,
  Code,
  Laptop,
  Rocket,
  Shield,
  Globe,
  Users,
  PenTool,
  Atom,
  Grid3x3,
} from "lucide-react";

export default function Categories() {
  const categories = [
    { name: "Business", icon: <Briefcase className="h-6 w-6" /> },
    { name: "Artificial Intelligence", icon: <Sparkles className="h-6 w-6" /> },
    { name: "Data Science", icon: <TrendingUp className="h-6 w-6" /> },
    { name: "Computer Science", icon: <Code className="h-6 w-6" /> },
    { name: "Information Technology", icon: <Laptop className="h-6 w-6" /> },
    { name: "Personal Development", icon: <Rocket className="h-6 w-6" /> },
    { name: "Healthcare", icon: <Shield className="h-6 w-6" /> },
    { name: "Language Learning", icon: <Globe className="h-6 w-6" /> },
    { name: "Social Sciences", icon: <Users className="h-6 w-6" /> },
    { name: "Arts and Humanities", icon: <PenTool className="h-6 w-6" /> },
    { name: "Physical Science and Engineering", icon: <Atom className="h-6 w-6" /> },
    { name: "Math and Logic", icon: <Grid3x3 className="h-6 w-6" /> },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-gray-900">
          Explore categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/courses"
              className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
            >
              <div className="text-gray-600 group-hover:text-blue-600 mb-2">{category.icon}</div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
