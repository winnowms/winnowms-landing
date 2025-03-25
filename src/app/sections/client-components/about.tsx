"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedCardProps {
  iconName: "Globe" | "Shield" | "Target";
  title: string;
  content: string;
}

const iconComponents = {
  Globe,
  Shield,
  Target,
};

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  iconName,
  title,
  content,
}) => {
  const Icon = iconComponents[iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-xl border-none h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <Icon className="w-12 h-12 mb-4 text-winnowred" />
          <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 flex-grow">
            {content}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ContactButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const targetElement = document.getElementById("Contact");
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Button
      className="px-8 py-6 text-lg font-semibold rounded-full bg-white text-winnowred hover:bg-gray-300 transition duration-300"
      onClick={handleClick}
    >
      Contact Us
    </Button>
  );
};
