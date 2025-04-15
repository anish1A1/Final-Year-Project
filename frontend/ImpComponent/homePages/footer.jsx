import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 px-3  text-gray-400 py-16 ">
      <div className="container mx-auto px-6 md:px-8 ">
        {/* Grid Section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press", "Blog"].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {[
                "Trading Platform",
                "Online Store",
                "Equipment Rental",
                "Support",
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "Guides", "API Reference", "Community"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: <span className="hover:text-white transition-colors duration-200">info@example.com</span></li>
              <li>Phone: <span className="hover:text-white transition-colors duration-200">+1 (555) 123-4567</span></li>
              <li>
                Address:{" "}
                <span className="hover:text-white  transition-colors duration-200">
                  123 Business Ave, Suite 100, City, Country
                </span>
              </li>
            </ul>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
  {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((platform, index) => (
    <Link
      href="#"
      key={index}
      className="hover:text-white transition-colors text-slate-400 duration-200"
    >
      <span className="sr-only">{platform}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-slate-400"
      >
        {platform === "Twitter" && (
          <path d="M22 4.01c-.82.37-1.7.61-2.63.72a4.47 4.47 0 0 0 1.95-2.48 8.94 8.94 0 0 1-2.82 1.08 4.47 4.47 0 0 0-7.62 3.06c0 .35.04.7.11 1.02A12.69 12.69 0 0 1 2.13 3.31 4.47 4.47 0 0 0 3.1 8a4.47 4.47 0 0 1-2.03-.56v.05a4.47 4.47 0 0 0 3.58 4.38 4.47 4.47 0 0 1-1.99.08 4.47 4.47 0 0 0 4.18 3.12A9.03 9.03 0 0 1 1 18.14a12.64 12.64 0 0 0 6.86 2.01c8.24 0 12.75-6.82 12.75-12.75v-.58A9.12 9.12 0 0 0 22 4.01z" />
        )}
        {platform === "LinkedIn" && (
          <>
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          </>
        )}
        {platform === "Facebook" && (
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        )}
        {platform === "Instagram" && (
          <>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </>
        )}
      </svg>
    </Link>
  ))}
</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FarmSajilo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;