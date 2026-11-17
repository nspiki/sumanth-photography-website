import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

export interface SlideshowImage {
  id: string | number;
  imageUrl: string;
  title?: string;
}

interface ImageSlideshowProps {
  images: SlideshowImage[];
  onSelectImage?: (image: SlideshowImage) => void;
  onCollapse?: () => void;
  enableKeyboard?: boolean;
  autoPlayMs?: number;
  previousLabel?: string;
  nextLabel?: string;
}

const wheelDelta = (index: number, current: number, count: number) => {
  if (count <= 0) return 0;
  let delta = index - current;
  delta %= count;
  if (delta > count / 2) delta -= count;
  if (delta < -count / 2) delta += count;
  return delta;
};

export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({
  images,
  onSelectImage,
  onCollapse,
  enableKeyboard = false,
  autoPlayMs,
  previousLabel = 'Previous photograph',
  nextLabel = 'Next photograph',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stride, setStride] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const strideRef = useRef(0);
  const dragPxRef = useRef(0);
  const pointerRef = useRef<{ id: number; x: number; moved: boolean } | null>(null);
  const skipClickRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const snapTimerRef = useRef<number>(0);
  const currentImage = images[currentIndex] || images[0];
  const count = images.length;

  currentIndexRef.current = currentIndex;
  strideRef.current = stride;

  const wrapIndex = (index: number) => {
    if (count <= 0) return 0;
    return ((index % count) + count) % count;
  };

  const pauseAutoplay = (ms = 4000) => {
    pauseUntilRef.current = Date.now() + ms;
  };

  const setDragPx = (px: number) => {
    dragPxRef.current = px;
    wheelRef.current?.style.setProperty('--drag', `${px}px`);
  };

  const applyScrollDelta = (dx: number) => {
    if (!dx || count < 2) return;
    const step = strideRef.current;
    let extra = dragPxRef.current + dx;
    let index = currentIndexRef.current;

    if (step > 0) {
      while (extra <= -step / 2) {
        extra += step;
        index = wrapIndex(index + 1);
      }
      while (extra >= step / 2) {
        extra -= step;
        index = wrapIndex(index - 1);
      }
    }

    setDragPx(extra);
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setCurrentIndex(index);
    }
  };

  const snapDrag = () => {
    const step = strideRef.current;
    let extra = dragPxRef.current;
    let index = currentIndexRef.current;

    if (step > 0 && Math.abs(extra) > step * 0.28) {
      index = wrapIndex(index + (extra < 0 ? 1 : -1));
    }

    wheelRef.current?.classList.remove('is-dragging');
    setDragPx(0);
    if (index !== currentIndexRef.current) {
      currentIndexRef.current = index;
      setCurrentIndex(index);
    }
  };

  const scheduleSnap = () => {
    window.clearTimeout(snapTimerRef.current);
    snapTimerRef.current = window.setTimeout(snapDrag, 140);
  };

  useLayoutEffect(() => {
    const measure = () => {
      const wheel = wheelRef.current;
      if (!wheel) return;
      const visible = window.innerWidth < 640 ? 5 : 10;
      const gap = 8;
      const itemWidth = (wheel.clientWidth - gap * (visible - 1)) / visible;
      setStride(itemWidth + gap);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!autoPlayMs || images.length < 2) return undefined;
    const interval = window.setInterval(() => {
      if (pointerRef.current || Date.now() < pauseUntilRef.current) return;
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayMs);
    return () => window.clearInterval(interval);
  }, [autoPlayMs, images.length]);

  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || count < 2) return undefined;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      pointerRef.current = { id: event.pointerId, x: event.clientX, moved: false };
      try {
        wheel.setPointerCapture(event.pointerId);
      } catch {
        /* Pointer capture is unavailable for some synthetic events. */
      }
      wheel.classList.add('is-dragging');
      window.clearTimeout(snapTimerRef.current);
      pauseAutoplay();
    };

    const onPointerMove = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      const dx = event.clientX - pointer.x;
      if (!pointer.moved && Math.abs(dx) < 6) return;
      pointer.moved = true;
      pointer.x = event.clientX;
      event.preventDefault();
      applyScrollDelta(dx);
    };

    const onPointerUp = (event: PointerEvent) => {
      const pointer = pointerRef.current;
      if (!pointer || pointer.id !== event.pointerId) return;
      skipClickRef.current = pointer.moved;
      pointerRef.current = null;
      pauseAutoplay();
      snapDrag();
    };

    const onWheel = (event: WheelEvent) => {
      const dx =
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? -event.deltaX : -event.deltaY;
      if (!dx) return;
      event.preventDefault();
      event.stopPropagation();
      wheel.classList.add('is-dragging');
      pauseAutoplay();
      applyScrollDelta(dx);
      scheduleSnap();
    };

    const onClickCapture = (event: MouseEvent) => {
      if (!skipClickRef.current) return;
      skipClickRef.current = false;
      event.preventDefault();
      event.stopPropagation();
    };

    wheel.addEventListener('pointerdown', onPointerDown);
    wheel.addEventListener('pointermove', onPointerMove);
    wheel.addEventListener('pointerup', onPointerUp);
    wheel.addEventListener('pointercancel', onPointerUp);
    wheel.addEventListener('wheel', onWheel, { passive: false });
    wheel.addEventListener('click', onClickCapture, true);

    return () => {
      window.clearTimeout(snapTimerRef.current);
      wheel.removeEventListener('pointerdown', onPointerDown);
      wheel.removeEventListener('pointermove', onPointerMove);
      wheel.removeEventListener('pointerup', onPointerUp);
      wheel.removeEventListener('pointercancel', onPointerUp);
      wheel.removeEventListener('wheel', onWheel);
      wheel.removeEventListener('click', onClickCapture, true);
    };
  }, [count]);

  useEffect(() => {
    if (!enableKeyboard) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, images.length]);

  if (!currentImage) return null;

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-white group aspect-[3/2]">
        <div className="relative w-full h-full">
          {images.map((image, idx) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={image.imageUrl}
                alt={image.title || ''}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain object-center"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={goToPrevious}
          aria-label={previousLabel}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label={nextLabel}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-14 sm:h-14 bg-black/40 hover:bg-black/75 backdrop-blur-md text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.2]" />
        </button>

        {onCollapse ? (
          <button
            type="button"
            onClick={onCollapse}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-colors"
            aria-label="Collapse gallery"
          >
            <X className="w-4 h-4" />
          </button>
        ) : onSelectImage ? (
          <button
            type="button"
            onClick={() => onSelectImage(currentImage)}
            className="absolute top-4 right-4 z-20 p-2.5 bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-colors"
            title="View fullscreen"
            aria-label="View fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        ) : null}
      </div>

      <div ref={wheelRef} className="thumb-wheel mt-3" data-no-page-swipe>
        {images.map((image, index) => {
          const delta = wheelDelta(index, currentIndex, images.length);
          const isActive = index === currentIndex;
          const itemWidth = stride > 0 ? stride - 8 : undefined;

          return (
            <button
              key={image.id}
              type="button"
              onClick={() => {
                pauseAutoplay();
                setCurrentIndex(index);
              }}
              style={{
                width: itemWidth,
                ['--shift' as string]: `${delta * stride}px`,
                zIndex: isActive ? 20 : 10 - Math.abs(delta),
              }}
              className={`thumb-item p-0 bg-transparent overflow-hidden ${
                isActive ? 'opacity-100' : 'opacity-40 hover:opacity-80'
              }`}
              aria-label={`Jump to image ${index + 1}${image.title ? `: ${image.title}` : ''}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <img
                src={image.imageUrl}
                alt=""
                referrerPolicy="no-referrer"
                draggable={false}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
