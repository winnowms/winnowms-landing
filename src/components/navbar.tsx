"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { WinnowLogo } from "@/app/public/assets/winnow";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8">
                <WinnowLogo />
              </div>
            </div>
            <div className="ml-2 text-black dark:text-white text-lg font-semibold">
              Winnow MS
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const targetElement = document.getElementById(item);
                    if (targetElement) {
                      const offset = 80;
                      const elementPosition =
                        targetElement.getBoundingClientRect().top;
                      const offsetPosition =
                        elementPosition + window.scrollY - offset;
                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className="text-black dark:text-white hover:text-winnowred dark:hover:text-winnowred px-3 py-2 rounded-md text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-winnowred transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
              className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-sm"
              aria-label="Toggle dark mode"
            >
              {mounted &&
                (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
            <button
              onClick={() =>
                window.open(
                  "https://aml.winnowms.com",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="bg-winnowred text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d11920] transition-colors duration-300"
            >
              Login / Register
            </button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
              }
              className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-sm"
              aria-label="Toggle dark mode"
            >
              {mounted &&
                (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50 backdrop-blur-sm"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-6 flex items-center justify-center">
                <span
                  className={`bg-current block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                    isOpen ? "rotate-45" : "-translate-y-1.5"
                  }`}
                ></span>
                <span
                  className={`bg-current block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                    isOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`bg-current block absolute h-0.5 w-5 transform transition duration-500 ease-in-out ${
                    isOpen ? "-rotate-45" : "translate-y-1.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-black dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50 block px-3 py-2 rounded-md text-base font-medium"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200/30 dark:border-gray-700/30 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md">
          <button
            onClick={() =>
              window.open(
                "https://aml.winnowms.com",
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="bg-winnowred text-white px-4 py-2 rounded-md text-sm font-medium mx-auto block hover:bg-[#d11920] transition-colors duration-300"
          >
            Login / Register
          </button>
        </div>
      </div>
    </nav>
  );
}
