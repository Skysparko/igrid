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
        <div className="grid md:grid-cols-3 gap-8 mb-8">
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
