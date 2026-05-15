import {
  Brain,
  BarChart3,
  BadgeCheck,
  PlayCircle,
  Smartphone,
  Users,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";

import { ContentfulMarkdown } from "~/components/contentful/contentful-markdown";
import Section from "~/components/landing/section";

import type { LandingScreenContent } from "~/types/contentful";

const ICON_PALETTE: { icon: LucideIcon; color: string; bg: string }[] = [
  { icon: Brain, color: "text-purple-600", bg: "bg-purple-50" },
  { icon: BarChart3, color: "text-primary-600", bg: "bg-primary-50" },
  { icon: BadgeCheck, color: "text-green-600", bg: "bg-green-50" },
  { icon: PlayCircle, color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Smartphone, color: "text-pink-600", bg: "bg-pink-50" },
  { icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: FileText, color: "text-teal-600", bg: "bg-teal-50" },
  { icon: ShieldCheck, color: "text-red-600", bg: "bg-red-50" },
];

const DEFAULT_FEATURES = [
  {
    title: "AI Mentor",
    description:
      "Personalized guidance powered by AI that adapts to each learner's pace and style.",
  },
  {
    title: "Progress Analytics",
    description: "Rich dashboards and reports for learners, instructors, and administrators.",
  },
  {
    title: "Certificates",
    description: "Automatically issue verifiable certificates on course completion.",
  },
  {
    title: "Rich Course Content",
    description: "Video lessons, quizzes, SCORM support, and interactive exercises in one place.",
  },
  {
    title: "Mobile Ready",
    description: "Fully responsive design so learners can study anywhere, on any device.",
  },
  {
    title: "Team & Group Management",
    description: "Organize learners into cohorts, assign courses, and track group progress.",
  },
  {
    title: "SCORM & xAPI Support",
    description: "Import existing SCORM packages and track xAPI statements seamlessly.",
  },
  {
    title: "Enterprise Security",
    description: "Role-based access, SSO, MFA enforcement, and audit logging built in.",
  },
];

interface FeaturesProps {
  content?: LandingScreenContent;
}

export default function Features({ content }: FeaturesProps) {
  const sectionTitle = content?.featuresTitle ?? "Features";
  const sectionDescription = content?.featuresDescription ?? undefined;

  const features =
    content?.featuresCards && content.featuresCards.length > 0
      ? content.featuresCards.map((card) => ({
          title: card.fields.title ?? "",
          description: card.fields.description ?? "",
        }))
      : DEFAULT_FEATURES;

  return (
    <Section
      id="features"
      title={sectionTitle}
      subtitle="Everything You Need to Run World-Class Training"
      description={
        <ContentfulMarkdown
          content={
            sectionDescription ??
            "Purpose-built for organizations that take learning seriously — from solo educators to global enterprises."
          }
          variant="body"
        />
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => {
          const palette = ICON_PALETTE[index % ICON_PALETTE.length];
          const Icon = palette.icon;
          return (
            <motion.div
              key={feature.title}
              className="group relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${palette.bg} mb-4`}
              >
                <Icon className={`h-5 w-5 ${palette.color}`} />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <ContentfulMarkdown content={feature.description} variant="compact" />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
