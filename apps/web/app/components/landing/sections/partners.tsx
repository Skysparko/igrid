import { motion } from "motion/react";

const partners = [
  { name: "Google", abbr: "G" },
  { name: "Microsoft", abbr: "Ms" },
  { name: "IBM", abbr: "IBM" },
  { name: "Stanford", abbr: "Su" },
  { name: "Meta", abbr: "M" },
  { name: "Adobe", abbr: "Ae" },
  { name: "DeepLearning.AI", abbr: "DL" },
  { name: "MIT", abbr: "MIT" },
  { name: "Vanderbilt", abbr: "Vu" },
];

export default function Partners() {
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
          Trusted by learners from 350+ world-class institutions
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
              key={partner.name}
              className="text-gray-300 font-bold text-lg sm:text-xl tracking-tight hover:text-gray-500 transition-colors duration-200 select-none"
            >
              {partner.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
