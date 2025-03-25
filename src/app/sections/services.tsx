"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

import { services } from "@/utils/data/services";
import { iconMap } from "@/utils/data/services";

const ProductServiceCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  const Icon = iconMap[title as keyof typeof iconMap];

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <Icon className="w-8 h-8 text-winnowred mr-3" />
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-2 h-2 bg-winnowred rounded-full mt-2 mr-2 flex-shrink-0"></span>
              <span className="dark:text-gray-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default function ProductsServices() {
  return (
    <div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
      id="Services"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Stay{" "}
            <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-sm transform -skew-x-3">
              compliant
            </span>{" "}
            reduce{" "}
            <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-sm transform -skew-x-3">
              risks
            </span>{" "}
            and{" "}
            <span className="inline-block px-2 py-1 bg-red-500 text-white rounded-sm transform -skew-x-3">
              protect your business.
            </span>{" "}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ProductServiceCard
              key={index}
              title={service.title}
              items={service.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
