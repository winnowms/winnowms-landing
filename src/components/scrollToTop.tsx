"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollHeight =
      window.pageYOffset || document.documentElement.scrollTop;
    const viewportHeight = document.documentElement.clientHeight;
    const scrolledPercentage = (scrollHeight / viewportHeight) * 100;

    if (scrolledPercentage > 50) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-winnowred text-white hover:bg-white hover:text-winnowred dark:hover:bg-gray-700 shadow-lg"
        onClick={scrollToTop}
      >
        <ChevronDown className="h-8 w-6 transform rotate-180" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
