import { Link } from "@remix-run/react";

import Section from "~/components/landing/section";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { siteConfig } from "~/lib/landing-config";
import { cn } from "~/lib/utils";

export default function Pricing() {
  return (
    <Section
      id="pricing"
      title="Pricing"
      subtitle="Choose Your Plan"
      className="bg-neutral-100 dark:bg-neutral-900"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {siteConfig.pricing.map((plan, index) => (
          <Card
            key={index}
            className={cn("relative", plan.isPopular && "border-primary shadow-lg scale-105")}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link to={plan.href} className="w-full">
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  {plan.buttonText}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
}
