import { Link } from "@remix-run/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { ContentfulMarkdown } from "~/components/contentful/contentful-markdown";
import { Button } from "~/components/ui/button";

import type { LandingScreenContent } from "~/types/contentful";

interface CTAProps {
  content?: LandingScreenContent;
}

export default function CTA({ content }: CTAProps) {
  const tag = content?.lastSectionTag ?? "Start Learning Today";
  const title = content?.lastSectionTitle ?? "Ready to Transform Your Learning?";
  const description =
    content?.lastSectionDecription ??
    "Join over 50,000 learners and hundreds of organizations already growing with iGird. Free to get started — no credit card required.";
  const buttonText1 = content?.lastSectionButtonText1 ?? "Get Started for Free";
  const buttonText2 = content?.lastSectionButtonText2 ?? "Browse Courses";
  const infoText = content?.lastSectionInfo ?? null;

  return (
    <section id="cta" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 px-8 py-16 sm:px-16 sm:py-20 text-center shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          </div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 border border-white/30 px-4 py-1.5 text-sm font-medium text-white mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              {tag}
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            <ContentfulMarkdown
              content={description}
              variant="inverse"
              className="max-w-2xl mx-auto mb-10"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/register">
                <Button
                  size="lg"
                  className="bg-white text-primary-700 hover:bg-primary-50 px-8 h-12 font-semibold shadow-lg gap-2"
                >
                  {buttonText1}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/40 text-white hover:bg-white/10 px-8 h-12 font-medium"
                >
                  {buttonText2}
                </Button>
              </Link>
            </div>

            {infoText && (
              <p className="mt-6 text-sm text-primary-200">
                {infoText.includes("sales@igird.com") ? (
                  <>
                    {infoText.split("sales@igird.com")[0]}
                    <Link
                      to="mailto:sales@igird.com"
                      className="underline underline-offset-2 hover:text-white transition-colors"
                    >
                      sales@igird.com
                    </Link>
                    {infoText.split("sales@igird.com")[1]}
                  </>
                ) : (
                  infoText
                )}
              </p>
            )}
            {!infoText && (
              <p className="mt-6 text-sm text-primary-200">
                Need a custom solution?{" "}
                <Link
                  to="mailto:sales@igird.com"
                  className="underline underline-offset-2 hover:text-white transition-colors"
                >
                  Contact our sales team
                </Link>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
