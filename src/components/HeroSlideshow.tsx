import React, { useState, useEffect } from 'react';
import { WeddingSlide } from '../types/wedding';
import { ImageSlideshow } from './ImageSlideshow';

interface HeroSlideshowProps {
  slides: WeddingSlide[];
  onOpenInquiry: () => void;
  onSelectImageForViewer: (slide: WeddingSlide) => void;
  previousLabel?: string;
  nextLabel?: string;
  reservationLabel?: string;
  ctaLabels?: readonly [string, string];
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  slides,
  onOpenInquiry,
  onSelectImageForViewer,
  previousLabel = 'Previous wedding photograph',
  nextLabel = 'Next wedding photograph',
  reservationLabel = 'weddings across India & worldwide',
  ctaLabels = ['Book Us', 'Inquire'],
}) => {
  const [ctaIndex, setCtaIndex] = useState(0);
  const reservationYear = new Date().getFullYear();

  useEffect(() => {
    setCtaIndex(0);
    const textInterval = setInterval(() => {
      setCtaIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(textInterval);
  }, [ctaLabels]);

  return (
    <section className="relative w-[92%] sm:w-[70%] mx-auto pt-4 pb-8 bg-white">
      <ImageSlideshow
        images={slides.map((slide) => ({
          id: slide.id,
          imageUrl: slide.imageUrl,
          title: slide.title,
        }))}
        enableKeyboard
        autoPlayMs={2000}
        previousLabel={previousLabel}
        nextLabel={nextLabel}
        onSelectImage={(image) => {
          const slide = slides.find((item) => item.id === image.id);
          if (slide) onSelectImageForViewer(slide);
        }}
      />

      <div className="mt-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <button
          onClick={onOpenInquiry}
          className="relative px-8 sm:px-12 py-4 bg-neutral-900 text-white hover:bg-black active:scale-[0.99] transition-all duration-300 shadow-md flex items-center justify-center overflow-hidden min-w-[240px] sm:min-w-[320px]"
        >
          <div className="h-6 flex items-center justify-center overflow-hidden">
            <span
              key={ctaLabels[ctaIndex]}
              className="font-sans text-sm sm:text-base font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
            >
              {ctaLabels[ctaIndex]}
            </span>
          </div>
        </button>

        <p className="mt-2.5 text-xs text-neutral-500 text-center font-light">
          Currently reserving dates for {reservationYear} & {reservationYear + 1} {reservationLabel}
        </p>
      </div>
    </section>
  );
};
