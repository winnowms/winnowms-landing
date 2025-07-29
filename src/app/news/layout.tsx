import Navbar from "@/components/navbar";
import Footer from "../sections/footer";
import { ThemeProvider } from "next-themes";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
