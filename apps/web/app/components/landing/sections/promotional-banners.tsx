import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Bot } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "~/components/ui/button";

export default function PromotionalBanners() {
  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        {/* iGird Plus banner */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white min-h-[280px] flex flex-col justify-between shadow-lg shadow-blue-200/40"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/8 blur-xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white mb-4">
              <Sparkles className="h-3 w-3" />
              iGird PLUS
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
              Unlimited learning, one subscription
            </h2>
            <p className="text-blue-100 text-sm md:text-base leading-relaxed mb-6 max-w-xs">
              Access 10,000+ programs from leading universities and companies — at one flat rate.
            </p>
            <Link to="/auth/register">
              <Button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold gap-2 shadow-sm">
                Save on iGird Plus
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative mt-6 flex items-end justify-between">
            <div className="text-sm">
              <span className="line-through text-blue-300 mr-2">$13,999</span>
              <span className="text-2xl font-bold">$7,999</span>
              <span className="text-blue-200 text-sm">/year</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-end">
              {["Google", "Microsoft", "IBM"].map((b) => (
                <span
                  key={b}
                  className="text-xs bg-white/15 border border-white/20 rounded-full px-2.5 py-0.5"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* AI Skills banner */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white min-h-[280px] flex flex-col justify-between shadow-lg shadow-indigo-200/40"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-16 -right-16 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/8 blur-xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white mb-4">
              <Bot className="h-3 w-3" />
              AI & Machine Learning
            </div>
            <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
              Boost Your Career with AI Skills
            </h2>
            <p className="text-indigo-100 text-sm md:text-base leading-relaxed mb-6 max-w-xs">
              Explore AI, machine learning, and data science with expert-led programs from top
              institutions.
            </p>
            <Link to="/courses">
              <Button className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold gap-2 shadow-sm">
                Start Your AI Journey
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative mt-6 flex gap-2 flex-wrap">
            {["Microsoft", "IBM", "Google", "DeepLearning.AI"].map((b) => (
              <span
                key={b}
                className="text-xs bg-white/15 border border-white/20 rounded-full px-2.5 py-0.5"
              >
                {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
