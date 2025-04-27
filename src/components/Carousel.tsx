import React, { useState, useEffect } from "react";
import { MoveLeft, MoveRight } from "lucide-react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
  interval?: number; // in milliseconds
}

const Carousel: React.FC<CarouselProps> = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval]);

  return (
    <div className="carousel flex items-center gap-2 relative h-[300px]">
      <button
        onClick={handlePrevious}
        className="bg-[#F5F3F5] hover:bg-[#B3B3B3] p-1 rounded-full"
      >
        <MoveLeft strokeWidth={1.5} width={30} height={30} />
      </button>
      <div className="carousel-image-container">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image object-contain object-center"
          width={550}
          height={550}
          priority
        />
      </div>
      <button
        onClick={handleNext}
        className="bg-[#F5F3F5] hover:bg-[#B3B3B3] p-1 rounded-full"
      >
        <MoveRight strokeWidth={1.5} width={30} height={30} />
      </button>
      <style jsx>{`
        .carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .carousel-image-container {
          width: 100%;
          max-width: 600px;
          overflow: hidden;
        }
        .carousel-image {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
      <div className="flex gap-1 absolute bottom-3 ">
        <div
          style={{
            backgroundColor: currentIndex === 0 ? "#B3B3B3" : "#F5F5F5",
          }}
          className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
        />
        <div
          style={{
            backgroundColor: currentIndex === 1 ? "#B3B3B3" : "#F5F5F5",
          }}
          className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
        />
        <div
          style={{
            backgroundColor: currentIndex === 2 ? "#B3B3B3" : "#F5F5F5",
          }}
          className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
        />
        <div
          style={{
            backgroundColor: currentIndex === 3 ? "#B3B3B3" : "#F5F5F5",
          }}
          className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
        />
        <div
          style={{
            backgroundColor: currentIndex === 4 ? "#B3B3B3" : "#F5F5F5",
          }}
          className="w-1 sm:w-3 h-1 sm:h-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default Carousel;
