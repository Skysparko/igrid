import { Brain, Shield, Zap } from "lucide-react";

import BlurFade from "~/components/landing/magicui/blur-fade";
import Section from "~/components/landing/section";
import { Card, CardContent } from "~/components/ui/card";

const problems = [
  {
    title: "Learning Overload",
    description:
      "Students struggle to manage multiple courses and learning resources, missing out on valuable knowledge that could enhance their skills and career growth.",
    icon: Brain,
  },
  {
    title: "Slow Progress Tracking",
    description:
      "Traditional learning methods lack real-time progress insights, causing learners to lose motivation and miss opportunities for improvement.",
    icon: Zap,
  },
  {
    title: "Limited Personalization",
    description:
      "One-size-fits-all learning approaches don't adapt to individual learning styles, making it difficult for students to achieve their full potential.",
    icon: Shield,
  },
];

export default function Problem() {
  return (
    <Section title="Problem" subtitle="Traditional learning platforms fall short.">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
