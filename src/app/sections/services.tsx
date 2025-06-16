"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Shield, Bell, FileText, CheckCircle, Users, Globe, Eye, ArrowRight } from "lucide-react";

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

const SanctionScreeningSection = () => {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const sanctionFeatures = [
    {
      title: "Comprehensive Sanctions Database",
      description: "Screening against 100+ sanctions including UAE, UN list",
      icon: Globe,
      features: ["UAE Sanctions List", "UN Security Council Lists", "OFAC SDN Database", "EU Consolidated List", "UK HM Treasury Sanctions"]
    },
    {
      title: "PEP Check",
      description: "Politically Exposed Persons verification and monitoring",
      icon: Users,
      features: ["Global PEP Database", "Real-time Profile Updates", "Risk Classification System"]
    },
    {
      title: "Adverse Media Check",
      description: "Continuous monitoring of negative news and media coverage",
      icon: Eye,
      features: ["Multiple Sources","Risk Categorization", "Historical Archives"]
    },
    {
      title: "Ongoing Monitoring",
      description: "24/7 surveillance with instant email notifications",
      icon: Bell,
      features: ["Real-time Monitoring", "Instant Email Alerts", "Dashboard Notifications"]
    },
    {
      title: "Record Keeping",
      description: "Comprehensive audit trails and regulatory documentation",
      icon: FileText,
      features: ["Complete Audit Trails", "Compliance Reporting", "Data Export Capabilities", "Regulatory Documentation"]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % sanctionFeatures.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Following Winnow's clean, professional style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Advanced AML Screening Tool
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Our comprehensive AML compliance solution provides real-time screening against global sanctions databases, 
            ensuring your business maintains the highest standards of regulatory compliance.
          </p>

          {/* Key Stats - Winnow style */}
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">100+ Sanctions Lists</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Real-time Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Automated Compliance</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature Display */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center mr-4">
                  {(() => {
                    const Icon = sanctionFeatures[activeFeatureIndex].icon;
                    return <Icon className="w-6 h-6 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {sanctionFeatures[activeFeatureIndex].title}
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                {sanctionFeatures[activeFeatureIndex].description}
              </p>

              <div className="space-y-3">
                {sanctionFeatures[activeFeatureIndex].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Feature Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            {sanctionFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeatureIndex(index)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border ${
                  activeFeatureIndex === index
                    ? 'bg-white dark:bg-gray-800 border-red-600 shadow-lg'
                    : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    activeFeatureIndex === index 
                      ? 'bg-gradient-to-r from-red-600 to-red-700' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {feature.icon && <feature.icon className="w-5 h-5 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                  {activeFeatureIndex === index && (
                    <ArrowRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA - Winnow Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Enhance Your AML Compliance Strategy?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s work together to ensure your business meets and exceeds regulatory standards 
              with our advanced sanction screening capabilities.
            </p>
            <a href="#Contact" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started Today
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function ProductsServices() {
  return (
    <>
      {/* Original ProductsServices Component */}
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

      {/* New Sanction Screening Section */}
      <SanctionScreeningSection />
    </>
  );
}