/* eslint-disable react/no-unescaped-entities */
import Link from "next/link"
import Image from "next/image"
import { Tractor, ShoppingBag, ArrowRightLeft, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProductCard from "./homePages/product-card"
import EquipmentCard from "./homePages/equipment-card"
import ProductSlider from "./homePages/farm-hero-slider"

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        <section className=" mt-2">
          <ProductSlider />
          
        </section>

        <section id="products" className=" mt-2 py-16 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Our Products</h2>
                <p className="text-muted-foreground max-w-[600px]">
                  Fresh, organic produce straight from our farms to your table. Quality guaranteed.
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Products
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <ProductCard
                name="Organic Tomatoes"
                image="/placeholder.svg?height=200&width=200"
                price={4.99}
                unit="kg"
                category="Vegetables"
              />
              <ProductCard
                name="Fresh Apples"
                image="/placeholder.svg?height=200&width=200"
                price={3.49}
                unit="kg"
                category="Fruits"
              />
              <ProductCard
                name="Organic Honey"
                image="/placeholder.svg?height=200&width=200"
                price={8.99}
                unit="jar"
                category="Dairy & Honey"
              />
              <ProductCard
                name="Farm Eggs"
                image="/placeholder.svg?height=200&width=200"
                price={5.99}
                unit="dozen"
                category="Poultry"
              />
            </div>
          </div>
        </section>

        <section id="trading" className="py-16 bg-slate-50">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Trading Platform</h2>
                <p className="text-muted-foreground max-w-[600px]">
                  Connect with other farmers to trade products, seeds, and supplies.
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0">
                Go to Trading
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="overflow-hidden">
                <div className="relative h-[200px]">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Trading Platform"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Farmer-to-Farmer Trading</h3>
                  <p className="text-muted-foreground mb-4">
                    Exchange your surplus produce with other farmers. Build relationships and reduce waste.
                  </p>
                  <Button>Start Trading</Button>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-[200px]">
                  <Image src="/placeholder.svg?height=400&width=600" alt="Bulk Trading" fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Bulk Trading Opportunities</h3>
                  <p className="text-muted-foreground mb-4">
                    Find bulk trading opportunities for your farm products. Get better prices for larger quantities.
                  </p>
                  <Button>Explore Opportunities</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="equipment" className="py-16 bg-white">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Equipment Rental</h2>
                <p className="text-muted-foreground max-w-[600px]">
                  Access high-quality farming equipment without the high investment costs.
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0">
                View All Equipment
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EquipmentCard
                name="Tractor - Medium Duty"
                image="/placeholder.svg?height=200&width=300"
                price={150}
                availability="Available Now"
              />
              <EquipmentCard
                name="Harvester - Grain"
                image="/placeholder.svg?height=200&width=300"
                price={200}
                availability="Available from June 15"
              />
              <EquipmentCard
                name="Seeding Machine"
                image="/placeholder.svg?height=200&width=300"
                price={75}
                availability="Available Now"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-green-800 text-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Quality Products</h3>
                <p className="text-green-100">
                  All our products are grown with care and meet the highest quality standards.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ArrowRightLeft className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Easy Trading</h3>
                <p className="text-green-100">Our platform makes it simple to trade with other farmers in your area.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Tractor className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Modern Equipment</h3>
                <p className="text-green-100">Rent well-maintained, modern farming equipment at affordable rates.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Phone className="h-12 w-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-green-100">Our team is always available to help with any questions or issues.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 bg-slate-50">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-slate-200 w-12 h-12 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Customer" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold">John Smith</h4>
                      <p className="text-sm text-muted-foreground">Local Farmer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The equipment rental service has been a game-changer for my small farm. I can now access machinery
                    I couldn't afford to buy outright."
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-slate-200 w-12 h-12 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Customer" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Restaurant Owner</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The quality of produce I get from FarmHub is exceptional. My customers can taste the difference in
                    our farm-to-table dishes."
                  </p>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-slate-200 w-12 h-12 overflow-hidden">
                      <Image src="/placeholder.svg?height=48&width=48" alt="Customer" width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-semibold">Michael Brown</h4>
                      <p className="text-sm text-muted-foreground">Hobby Farmer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "The trading platform helped me connect with other local farmers. We now regularly exchange products
                    and knowledge."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="cta" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Transform Your Farming Experience?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of farmers who are already benefiting from our platform. Sell your products, trade with
                others, and rent equipment all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">Get Started Now</Button>
                <Button variant="outline" size="lg">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact" className="bg-slate-900 text-slate-200 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Farm Logo"
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                <span className="text-xl font-bold text-white">FarmHub</span>
              </div>
              <p className="text-slate-400 mb-4">
                Connecting farmers, streamlining agriculture, and bringing fresh produce to your table.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-slate-400 hover:text-white">
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
                <Link href="#" className="text-slate-400 hover:text-white">
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
                <Link href="#" className="text-slate-400 hover:text-white">
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
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Vegetables
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Fruits
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Dairy & Eggs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Honey & Preserves
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Organic Feed
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Equipment Rental
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Trading Platform
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Farming Consultancy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Delivery Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-400 hover:text-white">
                    Workshops & Training
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
              <address className="not-italic text-slate-400">
                <p>123 Farm Road</p>
                <p>Countryside, CS 12345</p>
                <p className="mt-2">Email: info@farmhub.com</p>
                <p>Phone: (123) 456-7890</p>
              </address>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} FarmHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


export default HomePage;