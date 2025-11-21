import Section from "~/components/landing/section";

export default function HowItWorks() {
  return (
    <Section
      title="How It Works"
      subtitle="Get Started in Three Simple Steps"
      description="Join thousands of learners already using iGird to enhance their skills."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {[
          { step: "1", title: "Sign Up", description: "Create your free account in seconds" },
          { step: "2", title: "Browse Courses", description: "Explore our wide range of courses" },
          { step: "3", title: "Start Learning", description: "Begin your learning journey today" },
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">{item.step}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
