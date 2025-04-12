import Link from "next/link"
import {  ArrowRight  } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageSlider from "@/app/components/homes/image-slider"
import HomePageEquipmentList from "@/ImpComponent/homePageComponent/HomeEquipment"
const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        <section className=" mt-2">
          <ImageSlider />
        </section>
{/* Featured Trades Section */}
    <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Trading Opportunities</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore the latest trading opportunities across various markets with real-time data and analytics.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/trades">
                View All Trades <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Popular Products</h2>
              <p className="text-muted-foreground max-w-2xl">
                Discover our best-selling products with exclusive deals and premium quality.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/products">
                Browse All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          </div>
        </div>
      </section>

      {/* Equipment Rental Section */}
      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Equipment Rental</h2>
              <p className="text-muted-foreground max-w-2xl">
                Rent professional equipment for your projects with flexible terms and competitive rates.
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link href="/equipment">
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
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands of clients worldwide for trading, shopping, and equipment rental needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
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
                          i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))} */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Get Started?</h2>
            <p className="text-slate-300 max-w-2xl mb-8">
              Join thousands of satisfied customers who trust our platform for trading, shopping, and equipment rental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-slate-800">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      

      

    </main>
    </div>
  )
}
export default HomePage;