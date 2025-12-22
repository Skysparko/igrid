import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";

export default function PromotionalBanners() {
  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
        {/* Coursera Plus Style Banner */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-6 md:p-8 text-white relative overflow-hidden min-h-[280px] flex flex-col justify-between">
          <div className="relative z-10">
            <div className="text-blue-200 text-sm font-semibold mb-2">iGird PLUS</div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Enjoy the gift of unlimited learning
            </h2>
            <p className="text-blue-100 mb-6 text-base md:text-lg">
              Get access to 10,000+ programs from leading institutions and companies.
            </p>
            <Link to="/auth/register">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold text-sm md:text-base">
                Save on iGird Plus <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="mt-6 flex items-center gap-4">
              <div className="text-sm">
                <span className="line-through text-blue-200">$13,999</span>
                <span className="ml-2 text-xl md:text-2xl font-bold">$7,999</span>
                <span className="text-blue-200">/year</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3 flex-wrap">
              <div className="text-xs text-blue-200">Google</div>
              <div className="text-xs text-blue-200">Microsoft</div>
              <div className="text-xs text-blue-200">IBM</div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* AI Skills Banner */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-6 md:p-8 text-white relative overflow-hidden min-h-[280px] flex flex-col justify-between">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Boost Your Career with AI Skills
            </h2>
            <p className="text-purple-100 mb-6 text-base md:text-lg">
              Explore AI, machine learning, and data science with expert-led online programs.
            </p>
            <Link to="/courses">
              <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold text-sm md:text-base">
                Start Your AI Course <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="mt-6 flex gap-3 flex-wrap">
              <div className="text-xs text-purple-200">Microsoft</div>
              <div className="text-xs text-purple-200">IBM</div>
              <div className="text-xs text-purple-200">Google</div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36"></div>
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -ml-28 -mb-28"></div>
        </div>
      </div>
    </section>
  );
}
