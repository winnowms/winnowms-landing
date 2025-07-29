import Navbar from "@/components/navbar";
import Footer from "../sections/footer";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Head>
        <title>Winnow Management Solutions - News Room</title>
        <meta
          name="description"
          content="Latest News and insights on AML compliance and risk management"
        />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
