import { Link } from "@remix-run/react";
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

import { siteConfig } from "~/lib/landing-config";

export default function Footer() {
  const footerSections = [
    {
      title: "iGird",
      links: [
        { text: "About", href: "#" },
        { text: "What We Offer", href: "#" },
        { text: "Leadership", href: "#" },
        { text: "Careers", href: "#" },
        { text: "Catalog", href: "/courses" },
        { text: "iGird Plus", href: "#" },
        { text: "Professional Certificates", href: "#" },
        { text: "Degrees", href: "#" },
        { text: "For Enterprise", href: "#" },
        { text: "For Government", href: "#" },
        { text: "For Campus", href: "#" },
        { text: "Become a Partner", href: "#" },
        { text: "Free Courses", href: "/courses" },
      ],
    },
    {
      title: "Community",
      links: [
        { text: "Learners", href: "#" },
        { text: "Partners", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Tech Blog", href: "#" },
      ],
    },
    {
      title: "More",
      links: [
        { text: "Press", href: "#" },
        { text: "Investors", href: "#" },
        { text: "Terms", href: "#" },
        { text: "Privacy", href: "#" },
        { text: "Help", href: "#" },
        { text: "Accessibility", href: "#" },
        { text: "Contact", href: "#" },
        { text: "Affiliates", href: "#" },
        { text: "Manage Cookie Preferences", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Get the App</h3>
            <div className="space-y-3">
              <button className="w-full bg-black text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                Download on the App Store
              </button>
              <button className="w-full bg-black text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                GET IT ON Google Play
              </button>
            </div>
            <div className="mt-6">
              <div className="text-xs text-gray-600 mb-2">Certified B Corporation</div>
              <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center">
                <span className="text-xl font-bold">B</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} {siteConfig.name} Inc. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
