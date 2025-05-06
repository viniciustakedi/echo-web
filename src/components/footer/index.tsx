import React from "react";
import { FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-travel-blue">Echo</span>
            </Link>
            <p className="mb-6 text-gray-400">
              Discover the world's most amazing destinations with our curated
              travel experiences. From stunning beaches to cultural landmarks,
              we make travel planning easy and enjoyable.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="p-2 transition-colors rounded-full bg-gray-800 hover:bg-travel-blue"
              >
                <FaTwitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 transition-colors rounded-full bg-gray-800 hover:bg-travel-blue"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="p-2 transition-colors rounded-full bg-gray-800 hover:bg-travel-blue"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Destinations</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Europe
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Asia
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  North America
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  South America
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Africa
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Oceania
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Experiences</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Tours & Activities
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Food & Dining
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Adventure Sports
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Cultural Experiences
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Wellness & Spa
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Wildlife & Nature
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-12 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Echo. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
