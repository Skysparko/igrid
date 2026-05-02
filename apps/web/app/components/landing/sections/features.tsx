import {
  Brain,
  BarChart3,
  BadgeCheck,
  PlayCircle,
  Smartphone,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

import Section from "~/components/landing/section";

const features = [
  {
    icon: Brain,
    title: "AI Mentor",
    description:
      "Personalized guidance powered by AI that adapts to each learner's pace and style.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Rich dashboards and reports for learners, instructors, and administrators.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: BadgeCheck,
    title: "Certificates",
    description: "Automatically issue verifiable certificates on course completion.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: PlayCircle,
    title: "Rich Course Content",
    description: "Video lessons, quizzes, SCORM support, and interactive exercises in one place.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Fully responsive design so learners can study anywhere, on any device.",
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    icon: Users,
    title: "Team & Group Management",
    description: "Organize learners into cohorts, assign courses, and track group progress.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: FileText,
    title: "SCORM & xAPI Support",
    description: "Import existing SCORM packages and track xAPI statements seamlessly.",
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "Role-based access, SSO, MFA enforcement, and audit logging built in.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export default function Features() {
  return (
    <Section
      id="features"
      title="Features"
      subtitle="Everything You Need to Run World-Class Training"
      description="Purpose-built for organizations that take learning seriously — from solo educators to global enterprises."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.07 }}
          >
            <div
              className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg} mb-4`}
            >
              <feature.icon className={`h-5 w-5 ${feature.color}`} />
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
