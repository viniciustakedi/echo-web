"use client";

import Link from "next/link";
import React from "react";

export default function Menu() {
  const menuItems = [
    { href: "/", label: "Discover" },
    { href: "/map", label: "Map" },
    {
      href: "",
      label: "ECHO",
      className: "text-black font-black",
    },
    { href: "/reviews", label: "Reviews" },
    { href: "/help", label: "Help" },
  ];

  return (
    <nav className="bg-white shadow-md rounded-full fixed top-10 left-1/2 transform -translate-x-1/2 z-30">
      <ul className="px-5 py-4 flex items-center justify-between space-x-6">
        {menuItems.map(({ href, label, className }, index) => (
          <li key={index}>
            <Link
              href={href}
              className={`${className ?? "text-gray-700 hover:text-black"}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
