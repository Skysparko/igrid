import Section from "~/components/landing/section";

export default function Features() {
  return (
    <Section
      title="Features"
      subtitle="Everything You Need to Succeed"
      description="Powerful features designed to enhance your learning experience."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {[
          { title: "AI Mentor", description: "Get personalized guidance from AI-powered mentors" },
          {
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics",
          },
          { title: "Certificates", description: "Earn certificates upon course completion" },
          {
            title: "Interactive Content",
            description: "Engage with videos, quizzes, and exercises",
          },
          {
            title: "Mobile Access",
            description: "Learn on the go with our mobile-friendly platform",
          },
          {
            title: "Community Support",
            description: "Connect with fellow learners and instructors",
          },
        ].map((feature, index) => (
          <div key={index} className="p-6 border rounded-lg">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
