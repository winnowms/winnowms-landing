"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { WinnowLogo } from "@/app/public/assets/winnow";

// Static nav items outside component (avoid recreation)
const NAV_ITEMS = [
  { label: "Home", href: "/", scrollToId: "Home" },
  { label: "About", href: "/", scrollToId: "About" },
  { label: "Services", href: "/", scrollToId: "Services" },
  { label: "Contact", href: "/", scrollToId: "Contact" },
  { label: "News Room", href: "/news" }, // External page, normal navigation
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll when already on homepage with hash
  useEffect(() => {
    if (!mounted) return;

    // If on homepage with hash, scroll smoothly to element
    if (pathname === "/" && window.location.hash) {
      const id = window.location.hash.substring(1);
      const target = document.getElementById(id);
      if (target) {
        const offset = 80; // navbar height
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [pathname, mounted]);

  // Handle link click for smooth scrolling and routing
  const handleScrollTo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (e: React.MouseEvent, id?: string, href?: string) => {
      if (!id) return;

      // Already on homepage: scroll smoothly
      if (pathname === "/") {
        e.preventDefault();
        setIsOpen(false);
        const target = document.getElementById(id);
        if (target) {
          const offset = 80;
          const top =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        // Navigating from other page: push router and close menu
        e.preventDefault();
        setIsOpen(false);
        router.push(`/#${id}`);
      }
    },
    [pathname, router]
  );

  // Toggle mobile menu open/close
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Determine active link styling based on current path & hash
  const isActive = useCallback(
    (href: string, scrollToId?: string) => {
      if (href === "/blogs") return pathname?.startsWith("/blogs");

      // For homepage sections, active if pathname="/" and hash matches scrollToId
      if (href === "/" && scrollToId) {
        if (pathname === "/" && window.location.hash === `#${scrollToId}`) {
          return true;
        }
        // If URL hash empty but on homepage and scrollToId is "Home", highlight Home
        if (
          pathname === "/" &&
          !window.location.hash &&
          scrollToId === "Home"
        ) {
          return true;
        }
        return false;
      }

      return pathname === href;
    },
    [pathname]
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8">
              <WinnowLogo />
            </div>
            <span className="ml-2 text-black dark:text-white text-lg font-semibold select-none">
              Winnow MS
            </span>
          </div>

          {/* Desktop nav items */}
          <div className="hidden md:flex space-x-6 items-center">
            {NAV_ITEMS.map(({ label, href, scrollToId }) => (
              <Link
                key={label}
                href={href}
                prefetch={true}
                scroll={false}
                onClick={(e) =>
                  scrollToId && handleScrollTo(e, scrollToId, href)
                }
                className={`relative text-sm font-medium px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-winnowred transition-colors ${
                  isActive(href, scrollToId)
                    ? "text-winnowred font-semibold"
                    : "text-black dark:text-white hover:text-winnowred"
                }`}
                aria-current={isActive(href, scrollToId) ? "page" : undefined}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-winnowred scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
            ))}

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-winnowred"
              aria-label="Toggle dark mode"
              type="button"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )
              ) : null}
            </button>

            {/* Login button */}
            <button
              onClick={() =>
                window.open(
                  "https://aml.winnowms.com",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="bg-winnowred text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d11920] transition-colors duration-300"
              type="button"
            >
              Login / Register
            </button>
          </div>

          {/* Mobile menu toggle + theme */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200/50 dark:bg-gray-700/50 text-black dark:text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-winnowred"
              aria-label="Toggle dark mode"
              type="button"
            >
              {mounted ? (
                theme === "dark" ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )
              ) : null}
            </button>
            <button
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-winnowred"
              type="button"
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              <div className="w-6 h-6 relative">
                <span
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? "rotate-45 top-2.5" : "-translate-y-1.5 top-1"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-5 bg-current rounded transition-opacity duration-300 ease-in-out top-2.5 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 top-2.5" : "translate-y-1.5 top-4"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          {NAV_ITEMS.map(({ label, href, scrollToId }) => (
            <Link
              key={label}
              href={href}
              scroll={false}
              onClick={(e) => scrollToId && handleScrollTo(e, scrollToId, href)}
              className="block px-3 py-2 rounded-md text-base font-medium text-black dark:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-winnowred"
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="px-4 pb-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <button
            onClick={() =>
              window.open(
                "https://aml.winnowms.com",
                "_blank",
                "noopener,noreferrer"
              )
            }
            className="bg-winnowred text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#d11920] transition-colors duration-300 w-full"
            type="button"
          >
            Login / Register
          </button>
        </div>
      </div>
    </nav>
  );
}
