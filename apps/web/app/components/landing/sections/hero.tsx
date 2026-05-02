import { Link } from "@remix-run/react";
import { ArrowRight, BookOpen, Users, Award } from "lucide-react";
import { motion } from "motion/react";

import { PlatformLogo } from "~/components/PlatformLogo";
import { Button } from "~/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { icon: Users, value: "50,000+", label: "Active Learners" },
  { icon: BookOpen, value: "1,200+", label: "Courses Available" },
  { icon: Award, value: "98%", label: "Completion Rate" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-50 opacity-60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-50 opacity-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500" />
            The Modern Learning Management Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="max-w-4xl text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Girding Minds for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              a Changing World
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 max-w-2xl text-lg sm:text-xl text-gray-500 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            iGird is a full-featured LMS that empowers organizations, educators, and learners with
            AI-powered tools, rich course content, and actionable insights — all in one platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
          >
            <Link to="/auth/register">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-semibold shadow-lg shadow-blue-200 gap-2"
              >
                Start for Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/courses">
              <Button
                size="lg"
                variant="outline"
                className="px-8 h-12 text-base font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Browse Courses
              </Button>
            </Link>
          </motion.div>

          <motion.p
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            No credit card required · Free courses included
          </motion.p>

          {/* Platform preview */}
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
                <span className="mx-auto text-xs text-gray-400">app.igird.com/dashboard</span>
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 via-indigo-50 to-white flex items-center justify-center p-12">
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
            </div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            className="mt-16 w-full max-w-3xl grid grid-cols-3 gap-px bg-gray-200 rounded-2xl overflow-hidden shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8, ease }}
          >
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 bg-white py-6 px-4">
                <Icon className="h-5 w-5 text-blue-500 mb-1" />
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
