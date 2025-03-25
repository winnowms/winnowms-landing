"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, TrendingUp, Lock } from "lucide-react";
import { WinnowLogo } from "@/app/public/assets/winnow";

export default function HeroSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div
      className={`relative min-h-[95vh] overflow-hidden flex items-center `}
      id="Home"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-500"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-red-200 to-transparent dark:from-red-900 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-blue-200 to-transparent dark:from-blue-900 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Main content */}
      <div className="mx-auto px-5 min-w-screen flex items-center relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-12 lg:gap-24 max-w-7xl w-full">
          {/* Right side image and website name */}
          <motion.div
            className="w-3/5 md:w-1/2 lg:w-2/5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="relative aspect-square w-full max-w-[450px] lg:max-w-[550px] mx-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image container */}
              <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                <WinnowLogo />
              </div>
            </motion.div>
          </motion.div>
          {/* Left side content */}
          <motion.div
            className="w-full lg:w-3/5 text-gray-900 dark:text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              {...fadeInUp}
            >
              <span className="text-winnowred">Winnow</span> Management
              Solutions
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl mb-8 text-gray-700 dark:text-gray-300"
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              Streamline your anti-money laundering processes with our
              cutting-edge solutions. Stay compliant, reduce risks, and protect
              your business.
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-4 mb-12"
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="px-8 py-4 bg-winnowred text-white font-semibold rounded-full hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center text-lg lg:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  const targetElement = document.getElementById("About");
                  if (targetElement) {
                    const offset = 80; // Adjust this value based on your needs (10vh approx. 100px)
                    const elementPosition =
                      targetElement.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.scrollY - offset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth", // This enables smooth scrolling
                    });
                  }
                }}
              >
                Get Started{" "}
                <ArrowRight className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
              </motion.button>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-between gap-4 lg:gap-6"
              {...fadeInUp}
              transition={{ delay: 0.6 }}
            >
              {[
                { icon: ShieldCheck, text: "Enhanced Security" },
                { icon: TrendingUp, text: "Improved Efficiency" },
                { icon: Lock, text: "Regulatory Compliance" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 lg:space-x-3 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-winnowred" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(237,28,36,0.1) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle, rgba(237,28,36,0.2) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle, rgba(237,28,36,0.1) 0%, rgba(255,255,255,0) 70%)",
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
