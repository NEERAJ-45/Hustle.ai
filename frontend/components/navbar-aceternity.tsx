"use client";

import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { useUserContext } from "@/context/user-context";
import {
  IconBolt,
  IconListDetails,
  IconCurrencyDollar,
  IconMessageCircle,
  IconQuestionMark,
  IconUser,
  IconLayoutDashboard,
  IconUserPlus,
} from "@tabler/icons-react";

export function NavbarAceternity() {
  const { isAuthenticated } = useUserContext();

  const navItems = [
    {
      title: "Features",
      href: "#features",
      icon: <IconBolt className="h-full w-full text-neutral-300" />,
    },
    {
      title: "How it Works",
      href: "#how-it-works",
      icon: <IconListDetails className="h-full w-full text-neutral-300" />,
    },
    {
      title: "Pricing",
      href: "#pricing",
      icon: <IconCurrencyDollar className="h-full w-full text-neutral-300" />,
    },
    {
      title: "Testimonials",
      href: "#testimonials",
      icon: <IconMessageCircle className="h-full w-full text-neutral-300" />,
    },
    {
      title: "FAQ",
      href: "#faq",
      icon: <IconQuestionMark className="h-full w-full text-neutral-300" />,
    },
    ...(isAuthenticated
      ? [
          {
            title: "Dashboard",
            href: "/dashboard",
            icon: (
              <IconLayoutDashboard className="h-full w-full text-neutral-300" />
            ),
          },
        ]
      : [
          {
            title: "Login",
            href: "/login",
            icon: <IconUser className="h-full w-full text-neutral-300" />,
          },
          {
            title: "Sign Up",
            href: "/signup",
            icon: <IconUserPlus className="h-full w-full text-neutral-300" />,
          },
        ]),
  ];

  return (
    <div className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <FloatingDock
        items={navItems}
        desktopClassName="bg-black/90 backdrop-blur-md border border-white/15"
        mobileClassName="bg-black/90 backdrop-blur-md border border-white/15"
      />
    </div>
  );
}
