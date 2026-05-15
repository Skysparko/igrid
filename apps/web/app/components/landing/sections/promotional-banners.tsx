import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles, Bot } from "lucide-react";
import { motion } from "motion/react";

import { ContentfulMarkdown } from "~/components/contentful/contentful-markdown";
import { Button } from "~/components/ui/button";

import type { LandingScreenContent } from "~/types/contentful";

const GRADIENTS = [
  {
    wrapper: "from-primary-600 to-primary-800",
    shadow: "shadow-primary-200/40",
    body: "text-primary-100",
    button: "bg-white text-primary-700 hover:bg-primary-50",
    icon: Sparkles,
  },
  {
    wrapper: "from-violet-600 to-indigo-700",
    shadow: "shadow-indigo-200/40",
    body: "text-indigo-100",
    button: "bg-white text-indigo-700 hover:bg-indigo-50",
    icon: Bot,
  },
];

interface PromotionalBannersProps {
  content?: LandingScreenContent;
}

export default function PromotionalBanners({ content }: PromotionalBannersProps) {
  const cards = content?.infoCards && content.infoCards.length > 0 ? content.infoCards : null;

  if (cards) {
    return (
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
          {cards.slice(0, 2).map((card, index) => {
            const style = GRADIENTS[index % GRADIENTS.length];
            const Icon = style.icon;
            return (
              <motion.div
                key={card.sys.id}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.wrapper} p-8 text-white min-h-[280px] flex flex-col justify-between shadow-lg ${style.shadow}`}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -top-16 -right-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/8 blur-xl" />
                </div>
                <div className="relative">
                  {card.fields.tag && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/30 px-3 py-1 text-xs font-semibold text-white mb-4">
                      <Icon className="h-3 w-3" />
                      {card.fields.tag}
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold leading-snug mb-3">
                    {card.fields.title}
                  </h2>
                  {card.fields.description && (
                    <ContentfulMarkdown
                      content={card.fields.description}
                      variant="compact"
                      className={`${style.body} mb-6 max-w-xs`}
                    />
                  )}
                  <Link to="/auth/register">
                    <Button className={`${style.button} font-semibold gap-2 shadow-sm`}>
                      {card.fields.buttonText ?? "Get Started"}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="relative mt-6 flex items-end justify-between">
                  {card.fields.pricing && (
                    <div className="text-sm">
                      <span className="text-2xl font-bold">{card.fields.pricing}</span>
                    </div>
                  )}
                  {card.fields.multipleTags && card.fields.multipleTags.length > 0 && (
                    <div className="flex gap-2 flex-wrap justify-end">
                      {card.fields.multipleTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-white/15 border border-white/20 rounded-full px-2.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-5">
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 text-white min-h-[280px] flex flex-col justify-between shadow-lg shadow-primary-200/40"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
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
            <p className="text-primary-100 text-sm md:text-base leading-relaxed mb-6 max-w-xs">
              Access 10,000+ programs from leading universities and companies — at one flat rate.
            </p>
            <Link to="/auth/register">
              <Button className="bg-white text-primary-700 hover:bg-primary-50 font-semibold gap-2 shadow-sm">
                Save on iGird Plus
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative mt-6 flex items-end justify-between">
            <div className="text-sm">
              <span className="line-through text-primary-300 mr-2">$13,999</span>
              <span className="text-2xl font-bold">$7,999</span>
              <span className="text-primary-200 text-sm">/year</span>
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
