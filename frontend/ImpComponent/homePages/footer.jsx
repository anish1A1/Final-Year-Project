import React from 'react'

const footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12">
            <div className="container px-4 md:px-6">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h3 className="font-bold text-white text-lg mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Press
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-4">Services</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Trading Platform
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Online Store
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Equipment Rental
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Support
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Documentation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Guides
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        API Reference
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="hover:text-white transition-colors">
                        Community
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-4">Contact</h3>
                  <ul className="space-y-2">
                    <li>Email: info@example.com</li>
                    <li>Phone: +1 (555) 123-4567</li>
                    <li>Address: 123 Business Ave, Suite 100, City, Country</li>
                  </ul>
                  <div className="flex gap-4 mt-4">
                    <Link href="#" className="hover:text-white transition-colors">
                      <span className="sr-only">Twitter</span>
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
                        className="h-5 w-5"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <span className="sr-only">LinkedIn</span>
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
                        className="h-5 w-5"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <span className="sr-only">Facebook</span>
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
                        className="h-5 w-5"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Link>
                    <Link href="#" className="hover:text-white transition-colors">
                      <span className="sr-only">Instagram</span>
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
                        className="h-5 w-5"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-800 mt-12 pt-8 text-center">
                <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
              </div>
            </div>
          </footer>
  )
}

export default footer
