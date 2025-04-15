/* eslint-disable @next/next/no-img-element */
import Link from "next/link"
import {  ArrowRight, Star     } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageSlider from "@/app/components/homes/image-slider"
import HomeTrade from "@/ImpComponent/homePageComponent/HomeTrade"
import HomePageEquipmentList from "@/ImpComponent/homePageComponent/HomeEquipment"
import HomeProduct from "@/ImpComponent/homePageComponent/HomeProduct"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import JoiningSection from "@/ImpComponent/homePageComponent/JoiningSection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 ">
        <section className=" mb-8">
          <ImageSlider />
        </section>
{/* Featured Trades Section */}
    <section className="py-16 bg-slate-50 mb-3">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Trading Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore the latest trading opportunities across various markets with real-time data and analytics.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/allTrades">
                View All Trades <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="">
                <HomeTrade />
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className=" mt-12 mb-3">
        <div className="container px-4 md:px-6">
          <div className="flex  justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Products</h2>
              <p className="text-muted-foreground max-w-2xl">
                Discover our best-selling products with exclusive deals and premium quality.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/viewProduct">
                Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="">
            <HomeProduct />
          </div>
        </div>
      </section>

      {/* Equipment Rental Section */}
      <section className="mt-12 mb-3 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex  justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Equipment Rental</h2>
              <p className="text-muted-foreground max-w-2xl">
                Rent professional equipment for your projects with flexible terms and competitive rates.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/equipmentList">
                View All Equipment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="">
           <HomePageEquipmentList />
          </div>
        </div>
      </section>




      {/* Testimonials Section */}
      <section className="mt-16 mb-6 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands of clients worldwide for trading, shopping, and equipment rental needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="object-cover w-16 h-16"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating ? "bg-yellow-400 text-yellow-400 " : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* CTA Section */}
      <JoiningSection />
      

      

    </main>
    </div>
  )
}
export default HomePage;

const testimonials = [
    {
      name: "James Shrestha",
      role: "Farmer",
      avatar: "/james.png?height=48&width=48",
      rating: 4,
      comment:
        "The trading platform is incredibly intuitive and provides all the tools I need for successful product trading. The real-time data and user friendly approval process have significantly improved my product trading process.",
    },
    {
      name: "Ankush Khadka",
      role: "Business Owner",
      avatar: "/ankush.png?height=48&width=48",
      rating: 5,
      comment:
        "I've been renting equipment for my construction business for over a year now. The quality of the equipment and the flexible rental terms have saved me thousands compared to purchasing.",
    },
    {
      name: "Arjun Jung Rana",
      role: "Consumer",
      avatar: "/arjun.png?height=48&width=48",
      rating: 5,
      comment:
        "The product quality is exceptional! I purchased several Farming accessories, and they've all exceeded my expectations. The customer service team was also very helpful with my inquiries.",
    },
  ]