/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Trade with Confidence",
    description: "Access global markets with our advanced products trading platform",
    image: "/tradingImage.png?height=600&width=1200",
    cta: "Start Trading",
    color: "from-emerald-800 to-emerald-950",
    links: '/allTrades',
  },
  {
    id: 2,
    title: "Premium Products",
    description: "Discover our exclusive collection of high-quality products",
    image: "/FarmSajiloSlider.jpeg?height=600&width=1200",
    cta: "Shop Now",
    color: "from-amber-700 to-amber-950",
    links: '/viewProduct',
  },
  {
    id: 3,
    title: "Equipment Rental",
    description: "Rent professional equipment for your next farming venture",
    image: "/equipmentRental.jpeg?height=600&width=1200",
    cta: "Rent Equipment",
    color: "from-indigo-800 to-indigo-950",
    links: 'equipmentList',
  },
]

export default function ImageSlider() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState<NodeJS.Timeout | null>(null)

  // Handle slide change
  const handleSlideChange = () => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
  }

  // Set up autoplay
  useEffect(() => {
    if (!api) return

    api.on("select", handleSlideChange)

    // Start autoplay
    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    setAutoplay(interval)

    return () => {
      api.off("select", handleSlideChange)
      if (autoplay) clearInterval(autoplay)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api])

  // Pause autoplay on hover
  const pauseAutoplay = () => {
    if (autoplay) clearInterval(autoplay)
  }

  // Resume autoplay on mouse leave
  const resumeAutoplay = () => {
    if (autoplay) clearInterval(autoplay)
    const interval = setInterval(() => {
      api?.scrollNext()
    }, 5000)
    setAutoplay(interval)
  }

  return (
    <div className="relative w-full overflow-hidden" onMouseEnter={pauseAutoplay} onMouseLeave={resumeAutoplay}>
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id} className="relative p-0 overflow-hidden">
              <div className={cn("relative h-[60vh] min-h-[500px] w-full overflow-hidden")}>
                {/* Background gradient overlay */}
                <div className={cn("absolute inset-0 bg-gradient-to-r opacity-80 z-10", slide.color)} />

                {/* Background image */}
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex items-center">
                  <div className="container px-4 md:px-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: current === index ? 1 : 0, y: current === index ? 0 : 20 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-lg text-white"
                    >
                      <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{slide.title}</h2>
                      <p className="mb-6 text-lg md:text-xl opacity-90">{slide.description}</p>
                        <Link href={slide.links}>
                      <Button size="lg" className="font-medium">
                        {slide.cta}
                        
                      </Button>
                        </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Custom navigation buttons */}
        <div className="absolute bottom-8 right-24 z-30 flex items-center gap-2">
          <CarouselPrevious className="relative h-10 w-10 rounded-full border-2 border-white/20 bg-black/30 hover:bg-black/50 text-white" />
          <CarouselNext className="relative h-10 w-10 rounded-full border-2 border-white/20 bg-black/30 hover:bg-black/50 text-white" />
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  current === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  )
}
