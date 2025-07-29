"use client";

import { Button } from "@/../../src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ShareButtonProps {
  title: string;
  summary?: string;
}

export function ShareButton({ title, summary }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: summary || title,
        url: window.location.href,
      });
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleShare}>
      Share
    </Button>
  );
}

export function BackToBlogButton() {
  return (
    <Link href="/news">
      <Button
        variant="ghost"
        className="gap-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>
    </Link>
  );
}

export function ViewMoreButton() {
  return (
    <Link href="/news">
      <Button variant="outline" className="gap-2">
        View More Articles
        <ArrowLeft className="w-4 h-4 rotate-180" />
      </Button>
    </Link>
  );
}

export const BlogHeader = () => {
  return (
    <>
      {" "}
      <section className="relative bg-gradient-to-r from-winnowred to-red-600 dark:from-[#7f1519] dark:to-[#a71f23] text-white py-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-15 dark:opacity-25 bg-gradient-to-tr from-[#9e1f25] to-[#6e1013] animate-gradient-xy"
          style={{ backgroundSize: "100% 100%" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-snug mb-4 ">
            Latest News and Insights
          </h1>
          <p className="text-base sm:text-lg max-w-2xl mx-auto font-medium tracking-wide ">
            Stay updated with the latest in AML compliance and risk management
          </p>
          <div className="mt-6 h-1.5 w-20 mx-auto rounded-full bg-white/20 shadow-sm" />
        </div>

        <style jsx>{`
          @keyframes gradient-xy {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-xy {
            animation: gradient-xy 15s ease infinite;
          }
        `}</style>
      </section>
    </>
  );
};
