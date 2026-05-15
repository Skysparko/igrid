import { UserPlus, Search, Rocket, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

import { ContentfulMarkdown } from "~/components/contentful/contentful-markdown";
import Section from "~/components/landing/section";

import type { LandingScreenContent } from "~/types/contentful";

const STEP_STYLES: { icon: LucideIcon; color: string; bg: string; border: string }[] = [
  { icon: UserPlus, color: "text-primary-600", bg: "bg-primary-50", border: "border-primary-100" },
  { icon: Search, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  { icon: Rocket, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
];

const DEFAULT_STEPS = [
  {
    title: "Create Your Account",
    description: "Sign up for free in under 60 seconds. No credit card needed to get started.",
  },
  {
    title: "Explore & Enroll",
    description:
      "Browse 1,200+ courses across categories. Enroll instantly or get assigned by your organization.",
  },
  {
    title: "Learn & Grow",
    description:
      "Complete courses at your pace, earn certificates, and track your progress with detailed analytics.",
  },
];

interface HowItWorksProps {
  content?: LandingScreenContent;
}

export default function HowItWorks({ content }: HowItWorksProps) {
  const sectionTitle = content?.howItWorksTitle ?? "How It Works";
  const sectionMainTitle = content?.howItWorksMainTitle ?? "Up and Running in Minutes";
  const sectionDescription = content?.howItWorksDescription ?? undefined;

  const steps =
    content?.howItWorksSteps && content.howItWorksSteps.length > 0
      ? content.howItWorksSteps.map((step) => ({
          title: step.fields.title ?? "",
          description: step.fields.description ?? "",
        }))
      : DEFAULT_STEPS;

  return (
    <Section
      id="how-it-works"
      title={sectionTitle}
      subtitle={sectionMainTitle}
      description={
        <ContentfulMarkdown
          content={
            sectionDescription ??
            "Getting started with iGird is simple. Follow three steps to kick off your learning journey."
          }
          variant="body"
        />
      }
    >
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-14 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-gradient-to-r from-primary-200 via-primary-300 to-secondary-200" />

        {steps.map((step, index) => {
          const style = STEP_STYLES[index % STEP_STYLES.length];
          const Icon = style.icon;
          return (
            <motion.div
              key={step.title}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 ${style.border} ${style.bg} shadow-sm mb-6`}
              >
                <Icon className={`h-6 w-6 ${style.color}`} />
                <span
                  className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white border ${style.border} text-[10px] font-bold ${style.color}`}
                >
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <ContentfulMarkdown
                content={step.description}
                variant="compact"
                className="max-w-xs"
              />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
