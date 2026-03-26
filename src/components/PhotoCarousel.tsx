"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: "/il_1588xN.5749747626_bqt9.jpg",
    alt: "Hot Balls insulated warming sack with golf ball setup"
  },
  {
    src: "/il_1588xN.5749747700_43vq.jpg",
    alt: "Hot Balls golf warmer product photo in use"
  },
  {
    src: "/il_1588xN.5797825449_9q76.jpg",
    alt: "Hot Balls product detail and included accessories"
  },
  {
    src: "/Gemini_Generated_Image_urnqvvurnqvvurnq.png",
    alt: "Hot Balls branded creative golf product image"
  }
];

function getVisibleSlides(current: number): Slide[] {
  const prevIndex = (current - 1 + slides.length) % slides.length;
  const nextIndex = (current + 1) % slides.length;
  return [slides[prevIndex], slides[current], slides[nextIndex]];
}

export default function PhotoCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const visibleSlides = getVisibleSlides(current);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 2400);

    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  const goPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="photoCarouselSection" aria-label="Product photo carousel">
      <div className="photoCarouselHeader">
        <h2>On-Course Look</h2>
      </div>

      <div
        className="photoCarouselFrame"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="carouselArrow carouselArrowLeft"
          onClick={goPrevious}
          aria-label="Show previous photo"
        >
          &#10094;
        </button>

        <div className="photoCarouselTrack">
          {visibleSlides.map((slide, index) => {
            const isCenter = index === 1;
            return (
              <div
                className={`photoSlide${isCenter ? " photoSlideCenter" : ""}`}
                key={`${slide.src}-${index}`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={1588}
                  height={1588}
                  priority={slide.src === slides[0].src}
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="carouselArrow carouselArrowRight"
          onClick={goNext}
          aria-label="Show next photo"
        >
          &#10095;
        </button>
      </div>

      <div className="carouselDots" aria-hidden="true">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className={`carouselDot${index === current ? " carouselDotActive" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
