import { Link } from "@remix-run/react";
import { ChevronRight, Zap, BarChart3, Shield, TrendingUp, PenTool } from "lucide-react";

interface Career {
  title: string;
  description: string;
  salary: string;
  jobs: string;
  icon: React.ReactNode;
  gradient: string;
}

export default function CareerPaths() {
  const careers: Career[] = [
    {
      title: "Data Scientist",
      description: "Analyzes large datasets to extract insights",
      salary: "₹493,271",
      jobs: "23,492",
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      gradient: "from-yellow-400 to-blue-500",
    },
    {
      title: "Business Intelligence Analyst",
      description: "Analyzes and visualizes data",
      salary: "₹958,188",
      jobs: "78,973",
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      gradient: "from-yellow-400 to-blue-500",
    },
    {
      title: "Cyber Security Analyst",
      description: "Monitors IT systems, analyzes threats",
      salary: "₹1,257,500",
      jobs: "2,373",
      icon: <Shield className="h-8 w-8 text-blue-500" />,
      gradient: "from-blue-400 to-white",
    },
    {
      title: "Data Analyst",
      description: "Collects, cleans, and interprets data",
      salary: "₹303,299",
      jobs: "26,461",
      icon: <TrendingUp className="h-8 w-8 text-yellow-500" />,
      gradient: "from-yellow-400 to-blue-500",
    },
    {
      title: "Content Creator",
      description: "Produces various content formats",
      salary: "₹450,000",
      jobs: "15,234",
      icon: <PenTool className="h-8 w-8 text-pink-500" />,
      gradient: "from-blue-400 to-white",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Explore careers</h2>
          <Link to="/courses" className="text-blue-600 hover:text-blue-700 font-medium">
            Explore all <ChevronRight className="inline h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {careers.map((career, index) => (
            <Link
              key={index}
              to="/courses"
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div
                className={`h-32 bg-gradient-to-br ${career.gradient} flex items-center justify-center`}
              >
                {career.icon}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{career.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{career.description}</p>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-900">
                    <span className="font-semibold">Median salary:</span> {career.salary}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Jobs available:</span> {career.jobs}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
