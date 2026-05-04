import { motion } from "motion/react";

import type { LandingScreenContent } from "~/types/contentful";

const DEFAULT_PARTNERS = [
  "Google",
  "Microsoft",
  "IBM",
  "Stanford",
  "Meta",
  "Adobe",
  "DeepLearning.AI",
  "MIT",
  "Vanderbilt",
];

interface PartnersProps {
  content?: LandingScreenContent;
}

export default function Partners({ content }: PartnersProps) {
  const title =
    content?.companySectionTitle ?? "Trusted by learners from 350+ world-class institutions";
  const partners = content?.companySectionCompanyNames ?? DEFAULT_PARTNERS;

  return (
    <section className="border-y border-gray-100 bg-gray-50/60 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-center text-sm font-medium text-gray-400 uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-5"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {partners.map((partner) => (
            <div
              key={partner}
              className="text-gray-300 font-bold text-lg sm:text-xl tracking-tight hover:text-gray-500 transition-colors duration-200 select-none"
            >
              {partner}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
