import { Twitter, Youtube, Instagram } from "lucide-react";

import { Icons } from "~/components/landing/icons";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "iGird",
  description: "Girding Minds for a Changing World",
  tagline: "Learn with iGird.",
  url: typeof window !== "undefined" ? window.location.origin : "http://localhost:5173",
  keywords: ["Education", "Learning", "Courses", "iGird", "LMS"],
  links: {
    email: "support@igird.com",
    twitter: "https://twitter.com/igird",
    discord: "#",
    github: "#",
    instagram: "#",
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "AI-Powered Learning",
          description: "Enhance your learning experience with intelligent tools.",
          href: "#",
        },
        items: [
          {
            href: "#",
            title: "Interactive Courses",
            description: "Engage with dynamic, interactive course content.",
          },
          {
            href: "#",
            title: "AI Mentor",
            description: "Get personalized guidance from AI-powered mentors.",
          },
          {
            href: "#",
            title: "Progress Tracking",
            description: "Monitor your learning journey with detailed analytics.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Students",
            href: "/courses",
            description: "Access courses and track your learning progress.",
          },
          {
            title: "For Educators",
            href: "/admin/courses",
            description: "Create and manage courses for your students.",
          },
          {
            title: "For Organizations",
            href: "#",
            description: "Enterprise solutions for team training and development.",
          },
        ],
      },
    },
    {
      href: "#",
      label: "Blog",
    },
  ],
  pricing: [
    {
      name: "BASIC",
      href: "/auth/register",
      price: "Free",
      period: "",
      yearlyPrice: "Free",
      features: [
        "Access to Free Courses",
        "Basic Progress Tracking",
        "Community Support",
        "Limited AI Mentor Access",
      ],
      description: "Perfect for getting started with learning",
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "PRO",
      href: "/auth/register",
      price: "$29",
      period: "month",
      yearlyPrice: "$24",
      features: [
        "All Free Courses",
        "Premium Course Access",
        "Unlimited AI Mentor",
        "Advanced Analytics",
        "Certificate Generation",
      ],
      description: "Ideal for serious learners and professionals",
      buttonText: "Subscribe",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "Custom",
      period: "",
      yearlyPrice: "Custom",
      features: [
        "Everything in Pro",
        "Custom Course Creation",
        "Team Management",
        "Dedicated Support",
        "API Access",
      ],
      description: "For organizations and large teams",
      buttonText: "Contact Sales",
      isPopular: false,
    },
  ],
  faqs: [
    {
      question: "What is iGird?",
      answer: (
        <span>
          iGird is a modern learning management platform that helps you build and manage your
          educational journey. It provides tools and services to streamline learning and
          development.
        </span>
      ),
    },
    {
      question: "How can I get started with iGird?",
      answer: (
        <span>
          You can get started with iGird by signing up for an account, browsing available courses,
          and enrolling in courses that interest you. We offer both free and premium courses to suit
          your needs.
        </span>
      ),
    },
    {
      question: "What types of courses does iGird offer?",
      answer: (
        <span>
          iGird offers a wide range of courses covering various topics including technology,
          business, design, and more. Our courses include video lessons, interactive content, AI
          mentor support, and quizzes to enhance your learning experience.
        </span>
      ),
    },
    {
      question: "Is iGird suitable for beginners?",
      answer: (
        <span>
          Yes, iGird is designed to be user-friendly for learners of all levels. We offer courses
          for beginners, intermediate learners, and advanced professionals. Our intuitive interface
          and AI mentor support make learning accessible to everyone.
        </span>
      ),
    },
    {
      question: "What kind of support does iGird provide?",
      answer: (
        <span>
          iGird provides comprehensive support including documentation, video tutorials, community
          forums, and customer support. Premium users also get access to AI mentor assistance and
          priority support.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#features", text: "Features", icon: null },
        { href: "#pricing", text: "Pricing", icon: null },
        { href: "/courses", text: "Courses", icon: null },
        { href: "#", text: "Documentation", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null },
      ],
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: <Twitter className="h-4 w-4" />,
        },
        {
          href: "#",
          text: "Instagram",
          icon: <Instagram className="h-4 w-4" />,
        },
        {
          href: "#",
          text: "Youtube",
          icon: <Youtube className="h-4 w-4" />,
        },
      ],
    },
  ],
};

export type SiteConfig = typeof siteConfig;
