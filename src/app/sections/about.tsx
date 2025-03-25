import { AnimatedCard, ContactButton } from "./client-components/about";
import Image from "next/image";
import bg from "@/app/public/assets/buildings.jpeg";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 relative"
      id="About"
    >
      <main className="relative z-10">
        <section className="relative h-[20vh] flex items-center justify-center overflow-hidden">
          <Image
            src={bg}
            alt="Background image of buildings"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="text-2xl md:text-6xl lg:text-4xl font-bold mb-4">
              About Winnow Management Solutions LLC
            </h2>
          </div>
        </section>

        <section className="py-10 pb-15 px-4">
          <div className="container mx-auto">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto text-center">
              <span className="text-winnowred font-bold">
                Winnow Management Solutions LLC
              </span>
              , based in the UAE, specializes in Compliance Consultancy
              services. Founded by ACAMS-certified professionals with extensive
              knowledge and experience in Anti-Money Laundering (AML)
              compliance, our company is dedicated to helping businesses
              navigate complex regulatory landscapes and maintain strong
              compliance frameworks.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedCard
                iconName="Globe"
                title="Our Expertise"
                content="Our team specializes in navigating the complex regulatory landscapes of the DNFBP, Financial Institutions, and Insurance sectors. With extensive experience in these highly regulated industries, we possess a deep understanding of the unique compliance and risk management challenges that our clients face."
              />
              <AnimatedCard
                iconName="Shield"
                title="Our Approach"
                content="We provide expert guidance and tailored compliance solutions to help businesses navigate regulatory landscapes and achieve operational excellence. Our approach is rooted in deep industry knowledge and a commitment to staying ahead of regulatory changes."
              />
              <AnimatedCard
                iconName="Target"
                title="Our Mission"
                content="We are dedicated to ensuring our clients meet industry and regulatory standards, mitigating risks and fostering trust. Our mission is to empower businesses with the tools and knowledge they need to thrive in complex regulatory environments."
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gradient-to-r from-winnowred to-[#ff6b6b] text-white relative overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Elevate Your Compliance Strategy?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Let&apos;s work together to ensure your business meets and exceeds
              regulatory standards.
            </p>
            <ContactButton />
          </div>
          <div className="absolute inset-0 bg-black opacity-10" />
        </section>
      </main>
    </div>
  );
}
