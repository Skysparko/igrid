import { Link } from "@remix-run/react";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { motion } from "motion/react";

import { PlatformLogo } from "~/components/PlatformLogo";
import { Button } from "~/components/ui/button";

import type { LandingScreenContent } from "~/types/contentful";

const ease = [0.16, 1, 0.3, 1] as const;

interface HeroProps {
  content?: LandingScreenContent;
}

export default function Hero({ content }: HeroProps) {
  const badge = content?.tag ?? "The Modern Learning Management Platform";
  const title = content?.title ?? "Girding Minds for a Changing World";
  const description =
    content?.description ??
    "iGird is a full-featured LMS that empowers organizations, educators, and learners with AI-powered tools, rich course content, and actionable insights — all in one platform.";
  const buttonText1 = content?.buttonText1 ?? "Start for Free";
  const buttonText2 = content?.buttonText2 ?? "Browse Courses";
  const infoText = content?.info ?? "No credit card required · Free courses included";

  const titleWords = title.trim().split(/\s+/);
  const titleFirstThreeWords = titleWords.slice(0, 3).join(" ");
  const titleRemainingWords = titleWords.slice(3).join(" ");

  const stats = [
    {
      icon: Users,
      value: content?.activeLearnerNumbers ?? "50,000+",
      label: content?.activeLearnerText ?? "Active Learners",
    },
    {
      icon: BookOpen,
      value: content?.coursesAvailableNumber ?? "1,200+",
      label: content?.coursesAvailableText ?? "Courses Available",
    },
    {
      icon: Award,
      value: content?.completionRateNumber ?? "98%",
      label: content?.completionRateText ?? "Completion Rate",
    },
  ];

  const imageUrl = content?.image1?.fields?.file?.url
    ? `https:${content.image1.fields.file.url}`
    : null;

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary-50 opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-100 opacity-40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-500" />
            {badge}
          </motion.div>

          <motion.h1
            className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <span className="bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
              {titleFirstThreeWords}
            </span>
            {titleRemainingWords ? ` ${titleRemainingWords}` : null}
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {description}
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-primary-200 gap-2"
              >
                {buttonText1}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                {buttonText2}
              </Button>
            </Link>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {infoText}
          </motion.p>

          <motion.div
            className="mt-16 w-full max-w-5xl"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease }}
          >
            <div className="relative rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/80 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-100 bg-gray-50">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="mx-auto text-xs text-gray-400">app.igird.com/courses</span>
              </div>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={content?.image1?.fields?.title ?? "iGird platform preview"}
                  className="w-full aspect-[16/9] object-cover"
                />
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-50 via-primary-100 to-white flex items-center justify-center p-12">
                  <div className="flex flex-col items-center gap-4">
                    <PlatformLogo
                      variant="full"
                      className="h-16 w-auto opacity-80"
                      alt="iGird Platform"
                    />
                    <p className="text-sm text-gray-400 font-medium">
                      Your personalized learning dashboard
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-16 w-full max-w-3xl grid grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 bg-white py-6 px-4">
                <Icon className="h-5 w-5 text-primary-500 mb-1" />
                <span className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</span>
                <span className="text-xs sm:text-sm text-gray-500 text-center">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
