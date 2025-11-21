import { motion } from "motion/react";

import Section from "~/components/landing/section";
import { cn } from "~/lib/utils";

const features = [
  {
    title: "Interactive Learning",
    description:
      "Engage with dynamic course content including videos, quizzes, and interactive exercises designed to enhance your understanding.",
    className: "hover:bg-red-500/10 transition-all duration-500 ease-out",
  },
  {
    title: "AI-Powered Guidance",
    description:
      "Get personalized learning support from AI mentors that adapt to your learning style and provide real-time assistance.",
    className: "order-3 xl:order-none hover:bg-blue-500/10 transition-all duration-500 ease-out",
  },
  {
    title: "Progress Analytics",
    description:
      "Track your learning journey with detailed analytics and insights that help you understand your strengths and areas for improvement.",
    className: "md:row-span-2 hover:bg-orange-500/10 transition-all duration-500 ease-out",
  },
  {
    title: "Flexible Learning Paths",
    description:
      "Choose from a variety of courses and learning paths tailored to your goals, whether you're a beginner or advanced learner.",
    className:
      "flex-row order-4 md:col-span-2 md:flex-row xl:order-none hover:bg-green-500/10 transition-all duration-500 ease-out",
  },
];

export default function Solution() {
  return (
    <Section
      title="Solution"
      subtitle="Empower Your Learning Journey"
      description="Generic learning platforms won't suffice. iGird is purpose-built to provide exceptional learning experiences tailored to your unique needs."
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="mx-auto mt-16 grid max-w-sm grid-cols-1 gap-6 text-gray-500 md:max-w-3xl md:grid-cols-2 xl:grid-rows-2 md:grid-rows-3 xl:max-w-6xl xl:auto-rows-fr xl:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={cn(
              "group relative items-start overflow-hidden bg-neutral-50 dark:bg-neutral-800 p-6 rounded-2xl",
              feature.className,
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-foreground">{feature.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-neutral-50 dark:from-neutral-900 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
