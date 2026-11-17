import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingSlide } from '../types/wedding';

interface ImageViewerModalProps {
  slides: WeddingSlide[];
  slide: WeddingSlide | null;
  onClose: () => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  slides,
  slide,
  onClose,
}) => {
  const initialIndex = slide ? slides.findIndex((item) => item.id === slide.id) : 0;
  const [currentIndex, setCurrentIndex] = useState(Math.max(0, initialIndex));

  useEffect(() => {
    setCurrentIndex(Math.max(0, initialIndex));
  }, [initialIndex, slide?.id]);

  const currentSlide = slides[currentIndex] || slide;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  useEffect(() => {
    if (!slide) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        goToNext();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [slide, slides.length, onClose]);

  if (!slide || !currentSlide) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black animate-fade-in">
      <img
        src={currentSlide.imageUrl}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-contain object-center"
      />

      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous photograph"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next photograph"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
      </button>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
        aria-label="Close fullscreen"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
