import { UserPlus, Search, Rocket } from "lucide-react";
import { motion } from "motion/react";

import Section from "~/components/landing/section";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Account",
    description: "Sign up for free in under 60 seconds. No credit card needed to get started.",
    color: "text-primary-600",
    bg: "bg-primary-50",
    border: "border-primary-100",
  },
  {
    icon: Search,
    step: "02",
    title: "Explore & Enroll",
    description:
      "Browse 1,200+ courses across categories. Enroll instantly or get assigned by your organization.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-100",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Learn & Grow",
    description:
      "Complete courses at your pace, earn certificates, and track your progress with detailed analytics.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
];

export default function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      title="How It Works"
      subtitle="Up and Running in Minutes"
      description="Getting started with iGird is simple. Follow three steps to kick off your learning journey."
    >
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line (desktop) */}
        <div className="hidden md:block absolute top-14 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] h-px bg-gradient-to-r from-primary-200 via-primary-300 to-secondary-200" />

        {steps.map((s, index) => (
          <motion.div
            key={s.step}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div
              className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 ${s.border} ${s.bg} shadow-sm mb-6`}
            >
              <s.icon className={`h-6 w-6 ${s.color}`} />
              <span
                className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white border ${s.border} text-[10px] font-bold ${s.color}`}
              >
                {index + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
