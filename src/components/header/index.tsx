'use client';

import Image from "next/image";
import React from "react";
import Briefcase from "../svgs/Briefcase";
import Credits from "../svgs/Credits";
import Chevron from "../svgs/Chevron";
import User from "../svgs/User";
import Link from "next/link";
import { usePathname } from 'next/navigation'

interface NavItem {
  name: string;
  href: string;
  icon: React.FC;
  active?: boolean;
}

const navItems: NavItem[] = [
  { name: "Jobs", href: "/", icon: Briefcase },
  { name: "Talent Pool", href: "/pool", icon: User },
];

const currentUser = {
  name: "Ahmad Abuyahya",
  avatar: "/avatar.png",
  credits: 5000,
};

export default function Header() {
    const pathname = usePathname()

  return (
    <header className="bg-[#130035] h-20 rounded-lg p-4 flex items-center">
      <Image src="/logo.png" width={44} alt="talent-space" height={44} />
      <nav className="ml-8">
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={
                  "text-white flex items-center space-x-2 " +
                  (pathname !== item.href  ? "opacity-70" : "")
                }
              >
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center space-x-4">
        <Image
          src={currentUser.avatar}
          width={40}
          height={40}
          className="rounded-full"
          alt={currentUser.name}
        />
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-white text-sm">{currentUser.name}</span>

            <div className="flex items-center space-x-2">
              <Credits />
              <span className="text-white text-sm">{currentUser.credits}</span>
            </div>
          </div>

          <div className="ml-4">
            <Chevron />
          </div>
        </div>
      </div>
    </header>
  );
}
