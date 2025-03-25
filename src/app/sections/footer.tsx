import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { WinnowLogo } from "@/app/public/assets/winnow";
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12">
                <WinnowLogo />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                Winnow Management Solutions
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Streamline your anti-money laundering processes with our
              cutting-edge solutions. Stay compliant, reduce risks, and protect
              your business.
            </p>
            <div className="flex space-x-6">
              <Link
                href={process.env.FB_URL || "#"}
                className="text-gray-400 hover:text-winnowred"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href={process.env.TWITTER_URL || "#"}
                className="text-gray-400 hover:text-winnowred"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href={process.env.LINKEDIN_URL || "#"}
                className="text-gray-400 hover:text-winnowred"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href={process.env.INSTAGRAM_URL || "#"}
                className="text-gray-400 hover:text-winnowred"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-winnowred flex-shrink-0 mt-1" />
                <p className="text-gray-600 dark:text-gray-400">
                  Shams Business Center, Sharjah Media City Freezone, Al
                  Messanad, Sharjah, UAE.
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-winnowred flex-shrink-0" />
                <Link
                  href={`tel:${process.env.TELEPHONE_NUMBER}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-winnowred"
                >
                  {process.env.TELEPHONE_NUMBER}
                </Link>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-winnowred flex-shrink-0" />
                <Link
                  href={`mailto:${process.env.SUPPORT_EMAIL}`}
                  className="text-gray-600 dark:text-gray-400 hover:text-winnowred"
                >
                  {process.env.SUPPORT_EMAIL}
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-start md:justify-end">
              <Link
                href="https://aml.winnowms.com"
                target="_blank"
                className="bg-winnowred text-white px-6 py-3 rounded-md font-medium hover:bg-[#d11820] transition-colors"
              >
                Login / Register
              </Link>
            </div>
          </div>
        </div>
        <div className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
          &copy; {new Date().getFullYear()} Winnow Management Solutions LLC. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
