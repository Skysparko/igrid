import { Link } from "@remix-run/react";
import { Facebook, Linkedin, Twitter, Youtube, Instagram, Mail } from "lucide-react";

import { PlatformLogo } from "~/components/PlatformLogo";
import { siteConfig } from "~/lib/landing-config";

const columns = [
  {
    title: "Platform",
    links: [
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "#pricing" },
      { text: "Browse Courses", href: "/courses" },
      { text: "White Label", href: "#white-label" },
      { text: "Enterprise", href: "#" },
      { text: "Documentation", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About Us", href: "#" },
      { text: "Careers", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Press", href: "#" },
      { text: "Partners", href: "#" },
      { text: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Help Center", href: "#" },
      { text: "Community", href: "#" },
      { text: "Status", href: "#" },
      { text: "Accessibility", href: "#" },
      { text: "Affiliates", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Terms of Service", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Cookie Policy", href: "#" },
      { text: "Security", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <PlatformLogo
                variant="full"
                className="h-8 w-auto brightness-0 invert opacity-90"
                alt="iGird"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-5 max-w-xs">
              The world&apos;s first Faith-based education platform. Equipping believers with
              world-class learning through the lens of Kingdom purpose.
            </p>
            <Link
              to="mailto:support@igird.com"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@igird.com
            </Link>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 hover:text-gray-200 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 order-2 md:order-1">
            © {new Date().getFullYear()} {siteConfig.name} Inc. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4 order-1 md:order-2">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                to={href}
                aria-label={label}
                className="h-8 w-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-500 hover:text-gray-200 transition-all"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
