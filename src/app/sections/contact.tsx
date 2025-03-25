"use client";

import { useCallback, useMemo, useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Users, Briefcase, Mail, Phone, MessageCircle } from "lucide-react";
import { sendMail } from "@/utils/actions/send-mail";
import { FormData } from "@/utils/types/types";
import { toast, Toaster } from "react-hot-toast";
import { countryCodes } from "@/utils/data/countryCodes";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  companyName: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
  countryCode: z.string(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

const WhatsAppButton = ({ isVisible }: { isVisible: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappNumber = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_WHATSAPP_COUNTRY_CODE}${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`;
  }, []);

  const messageText = useMemo(() => {
    return encodeURIComponent(process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "");
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${messageText}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, [whatsappNumber, messageText]);

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    normal: { width: "3.5rem" },
    hovered: { width: "12rem" },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-20 z-50"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={buttonVariants}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
            className="bg-[#25D366] hover:bg-[#1da44f] text-white rounded-full shadow-lg overflow-hidden flex items-center justify-between"
            variants={containerVariants}
            initial="normal"
            animate={isHovered ? "hovered" : "normal"}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={handleWhatsAppClick}
              className="w-full h-full p-0 flex items-center justify-between bg-transparent hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
              aria-label="Contact us on WhatsApp"
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="text-base font-medium whitespace-nowrap overflow-hidden pl-4"
                    transition={{ duration: 0.2 }}
                  >
                    Contact us
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7" />
              </div>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>();
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const componentRef = useRef(null);
  const isInView = useInView(componentRef, { once: false, amount: 0.1 });
  const [buttonText, setButtonText] = useState("Send Inquiry");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      countryCode: "+1", // Default to US country code
    },
  });

  const onSubmit = async (data: FormData) => {
    const fullPhoneNumber = `${data.countryCode}${data.phone}`;
    const submissionData = { ...data, phone: fullPhoneNumber };
    setButtonText("Sending Inquiry...");
    setFormData(submissionData);
    try {
      const result = await sendMail(submissionData);
      if (result.success) {
        toast.success("Email sent successfully!", {
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#4CAF50",
          },
        });
        setButtonText("Inquiry Successfully sent");
        setTimeout(() => {
          setButtonText("Send Inquiry");
        }, 5000);
        reset();
      } else {
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      toast.error(
        `Error: ${
          error instanceof Error ? error.message : "Failed to send email"
        }`,
        {
          style: {
            background: "#F44336",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#F44336",
          },
        }
      );
      setButtonText("Sending Inquiry Failed..Try Again");
    }
  };

  useEffect(() => {
    setIsComponentVisible(isInView);
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="min-h-fit brick-pattern py-16 px-4 sm:px-6 lg:px-8 dark:bg-gray-900"
      id="Contact"
    >
      <Toaster position="top-right" />
      <motion.div
        ref={componentRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-6 text-gray-800 dark:text-white"
          >
            Contact Us
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-600 dark:text-gray-300 mb-8"
          >
            We are here to help you with all your Management needs. Let us know
            how we can assist you today.
          </motion.p>
          <div className="md:flex md:space-x-8">
            <motion.div
              variants={itemVariants}
              className="md:w-1/2 mb-8 md:mb-0"
            >
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <Users className="text-winnowred mr-4" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Expert Consulting
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <Briefcase className="text-winnowred mr-4" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Tailored Solutions For All Your Needs
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <Mail className="text-winnowred mr-4" />
                  <span className="text-gray-700 dark:text-gray-200">
                    24/7 Support
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <Phone className="text-winnowred mr-4" />
                  <span className="text-gray-700 dark:text-gray-200">
                    Call us: +971-52-6794027
                  </span>
                </motion.div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="md:w-1/2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className={`${
                      errors.name ? "border-red-500" : ""
                    } transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="companyName"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    {...register("companyName")}
                    className={`${
                      errors.companyName ? "border-red-500" : ""
                    } transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`${
                      errors.email ? "border-red-500" : ""
                    } transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <div className="w-1/3">
                    <Label
                      htmlFor="countryCode"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      Country
                    </Label>
                    <Controller
                      name="countryCode"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value) => {
                            // Extract only the country code from the selected value
                            const [code] = value.split("-"); // Split by '-' to get the code
                            field.onChange(code); // Update form state with just the country code
                          }}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={`${country.code}-${country.name}`}
                                value={`${country.code}-${country.name}`}
                              >
                                {`${country.name} (${country.code})`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="w-2/3">
                    <Label
                      htmlFor="phone"
                      className="text-gray-700 dark:text-gray-200"
                    >
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      className={`${
                        errors.phone ? "border-red-500" : ""
                      } transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="message"
                    className="text-gray-700 dark:text-gray-200"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    className={`${
                      errors.message ? "border-red-500" : ""
                    } transition-all duration-300 hover:border-winnowred focus:border-winnowred focus:ring-winnowred dark:bg-gray-700 dark:text-white`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                  {formData ? "" : ""}
                </div>
                <Button
                  type="submit"
                  className="w-full text-gray-100 bg-winnowred hover:bg-[#c51017] transition-all duration-300 transform hover:scale-105"
                >
                  {buttonText}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <WhatsAppButton isVisible={isComponentVisible} />
    </div>
  );
}
