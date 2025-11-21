import { Link } from "@remix-run/react";

import Section from "~/components/landing/section";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/lib/landing-config";

export default function CTA() {
  return (
    <Section className="bg-primary text-primary-foreground">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-lg mb-8 opacity-90">{siteConfig.tagline}</p>
        <div className="flex gap-4 justify-center">
          <Link to="/auth/register">
            <Button variant="secondary" size="lg">
              Get Started for Free
            </Button>
          </Link>
          <Link to="/courses">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              Browse Courses
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
