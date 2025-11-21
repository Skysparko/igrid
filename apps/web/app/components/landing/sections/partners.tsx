export default function Partners() {
  const partners = [
    "Google",
    "Microsoft",
    "IBM",
    "Stanford",
    "Meta",
    "Adobe",
    "DeepLearning.AI",
    "University of Michigan",
    "Vanderbilt",
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold text-center mb-8 text-gray-900">
          Learn from 350+ leading universities and companies
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="text-gray-400 font-semibold text-lg hover:text-gray-600 transition-colors"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
