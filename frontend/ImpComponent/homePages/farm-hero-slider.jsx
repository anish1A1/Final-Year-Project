"use client";

import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductContext } from "@/utils/prod";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function FarmHeroSlider() {
  const { loading, fetchSliderDatas, sliderData } = useContext(ProductContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Fetch data only once when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchSliderDatas();
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === (sliderData?.length || 0) - 1 ? 0 : prev + 1
    );
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? (sliderData?.length || 0) - 1 : prev - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    if (!loading && sliderData && sliderData.length > 0) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loading, sliderData]); // Depend on loading and sliderData to start interval only when data is loaded

  // Show loading state if data is still being fetched
  if (loading) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-muted flex items-center justify-center">
        <Skeleton className="w-full h-full absolute top-0 left-0 z-0" />
        <div className="z-10 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Loading FarmSajilo...
          </h1>
        </div>
      </div>
    );
  }

  // Show message if no slides are available
  if (!sliderData || sliderData.length === 0) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-muted flex items-center justify-center">
        <div className="z-10 text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">No slides available.</h1>
        </div>
      </div>
    );
  }

  // Render the slider once data is available
  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
      {sliderData.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          {slide.product_image && (
            <img
              src={slide.product_image}
              alt={slide.name}
              className="object-cover w-full h-full"
            />
          )}
          <div className="relative z-20 container h-full flex flex-col justify-center items-start text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
              {slide.name}
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-xl">
              {slide.description}
            </p>
            <Button
              asChild
              size="lg"
              onClick={() => router.push(`/viewProduct/${slide.id}`)}
            >
              View
            </Button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
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

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {sliderData.map((_, index) => (
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
  );
}
