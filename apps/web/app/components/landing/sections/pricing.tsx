import { Link } from "@remix-run/react";
import { Check, Zap } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/landing-config";
import { cn } from "~/lib/utils";

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50/60">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-blue-600 uppercase tracking-widest mb-3">
            Pricing
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Start for free. Upgrade when you need more. No hidden fees.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {siteConfig.pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-white p-8 shadow-sm transition-shadow hover:shadow-md",
                plan.isPopular
                  ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-100"
                  : "border-gray-200",
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-600 px-3.5 py-1 text-xs font-semibold text-white shadow">
                    <Zap className="h-3 w-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 text-base mb-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center">
                      <Check className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to={plan.href} className="block">
                <Button
                  className={cn(
                    "w-full h-11 font-semibold",
                    plan.isPopular
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-200"
                      : "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50",
                  )}
                  variant={plan.isPopular ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-gray-400 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          All plans include a 14-day free trial. Cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}
