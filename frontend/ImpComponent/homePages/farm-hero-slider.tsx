"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/FarmSajiloSlider.jpeg",
    title: "Fresh Farm Products",
    description: "Direct from our farms to your table. Experience the freshness difference.",
    cta: "Shop Now",
    link: "#products",
  },
  {
    image: "/tradingImage.png",
    title: "Trade with Fellow Farmers",
    description: "Connect with other farmers to exchange products and knowledge.",
    cta: "Start Trading",
    link: "#trading",
  },
  {
    image: "/tradingImage.png",
    title: "Rent Quality Equipment",
    description: "Access high-quality farming equipment without the high investment costs.",
    cta: "View Equipment",
    link: "#equipment",
  },
]

const FarmHeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  console.log('Slider Opened')

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
      <div className="relative h-[500px] overflow-hidden mt-28 border border-gray-300">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black/40" />
  
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
  
            <div className="relative z-20 container h-full flex flex-col justify-center items-start text-white p-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-6 max-w-xl">{slide.description}</p>
              <Button asChild size="lg">
                <a href={slide.link}>{slide.cta}</a>
              </Button>
            </div>
          </div>
        ))}
  
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20 h-12 w-12 rounded-full"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
          <span className="sr-only">Previous slide</span>
        </Button>
  
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white hover:bg-white/20 h-12 w-12 rounded-full"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
          <span className="sr-only">Next slide</span>
        </Button>
  
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
  
  export default FarmHeroSlider