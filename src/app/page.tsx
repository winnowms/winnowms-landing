import React from "react";
import Navbar from "@/components/navbar";
import ContactUs from "./sections/contact";
import ProductServices from "./sections/services";
import HeroSection from "./sections/hero";
import AboutUs from "./sections/about";
import Footer from "./sections/footer";
import ScrollToTop from "@/components/scrollToTop";
import ProgressBar from "@/components/progressbar";
import TestProducts from "./sections/macbookslider";
import { ThemeProvider } from "next-themes";

function Home() {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Navbar />
        <ProgressBar />
        <ScrollToTop />
        <HeroSection />
        <AboutUs />
        <TestProducts />
        <ProductServices />
        <ContactUs />
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default Home;
