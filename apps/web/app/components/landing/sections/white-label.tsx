import { Link } from "@remix-run/react";
import {
  Palette,
  Globe,
  ShieldCheck,
  Zap,
  Building2,
  Headphones,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "~/components/ui/button";

const capabilities = [
  {
    icon: Palette,
    title: "Full Brand Customization",
    description: "Your logo, colors, fonts, and messaging applied throughout the entire platform.",
  },
  {
    icon: Globe,
    title: "Custom Domain & Email",
    description: "Deploy on your own domain with white-labeled transactional emails.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-Grade Security",
    description: "SSO, SAML 2.0, MFA enforcement, role-based permissions, and full audit trails.",
  },
  {
    icon: Zap,
    title: "Fast Time-to-Market",
    description: "Go live in days, not months. We handle all infrastructure, updates, and scaling.",
  },
  {
    icon: Building2,
    title: "Multi-Tenant Architecture",
    description: "Serve multiple clients or departments from a single, fully isolated instance.",
  },
  {
    icon: Headphones,
    title: "Dedicated Success Team",
    description: "White-glove onboarding, priority support, and a dedicated account manager.",
  },
];

const highlights = [
  "Your brand, zero iGird branding",
  "Full API access & webhook integrations",
  "Custom feature development on request",
  "Revenue sharing & reseller programs",
  "SLA-backed 99.9% uptime guarantee",
  "Data residency & compliance options",
];

export default function WhiteLabel() {
  return (
    <section id="white-label" className="relative overflow-hidden bg-gray-950 py-24 sm:py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 right-0 h-[500px] w-[500px] rounded-full bg-primary-900/30 blur-3xl" />
        <div className="absolute bottom-0 -left-40 h-[400px] w-[400px] rounded-full bg-primary-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-primary-700/50 bg-primary-900/40 px-4 py-1.5 text-sm font-medium text-primary-400 mb-6"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="flex h-2 w-2 rounded-full bg-primary-400" />
            White Label Solution
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Launch Your Own LMS Platform — Powered by iGird
          </motion.h2>

          <motion.p
            className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            License the full iGird platform under your own brand. We provide the technology; you own
            the experience. Perfect for EdTech startups, training companies, and enterprises
            building internal academies.
          </motion.p>
        </div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20 mb-4">
                <cap.icon className="h-5 w-5 text-primary-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Highlights + CTA row */}
        <motion.div
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-10 flex flex-col lg:flex-row gap-10 items-start lg:items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-6">
              What&apos;s included in every white-label deal
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col gap-4 items-start lg:items-center text-center lg:text-left">
            <p className="text-gray-400 text-sm max-w-xs">
              Interested in launching your branded LMS? Our team is ready to walk you through a
              personalized demo.
            </p>
            <Link to="mailto:sales@igird.com">
              <Button
                size="lg"
                className="bg-primary-600 hover:bg-primary-500 text-white px-8 h-12 font-semibold shadow-lg shadow-primary-900/40 gap-2"
              >
                Talk to Sales
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-gray-500">No commitment · Response within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
