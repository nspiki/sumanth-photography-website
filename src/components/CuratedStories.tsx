import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CuratedStory } from '../types/wedding';
import { ImageSlideshow } from './ImageSlideshow';

interface CuratedStoriesProps {
  stories: CuratedStory[];
}

export const CuratedStories: React.FC<CuratedStoriesProps> = ({
  stories,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);

  const openStory = stories.find((story) => story.id === openStoryId) ?? null;

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const scroller = scrollRef.current;
    if (!scroller) return;
    const card = scroller.querySelector('button');
    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap || '8') || 8;
    const step = (card?.getBoundingClientRect().width ?? 240) + gap;
    scroller.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    setTimeout(checkScroll, 350);
  };

  const handleSelectStory = (story: CuratedStory) => {
    setOpenStoryId((prev) => (prev === story.id ? null : story.id));
  };

  useEffect(() => {
    if (!openStory) return;
    const timer = window.setTimeout(() => {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [openStory?.id]);

  return (
    <section id="curated-stories" className="w-[92%] sm:w-[70%] md:w-[55%] mx-auto py-12 bg-white">
      <div className="relative flex items-center justify-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-tight text-center px-14">
          Curated Stories
        </h2>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 shrink-0">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous story"
            className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next story"
            className="w-10 h-10 rounded-full bg-neutral-900 hover:bg-black text-white disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        data-no-page-swipe
        className="flex gap-2 sm:gap-6 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar snap-x snap-mandatory touch-pan-x w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stories.map((story) => {
          const isOpen = story.id === openStoryId;

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => handleSelectStory(story)}
              aria-expanded={isOpen}
              className={`w-[calc((100%-1rem)/3)] sm:w-[288px] lg:w-[304px] shrink-0 snap-start overflow-hidden transition-opacity duration-300 cursor-pointer text-left p-0 bg-transparent ${
                isOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={story.coverImage}
                  alt={story.coupleName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-1.5 pb-2 sm:px-4 sm:pb-4 flex flex-col items-center text-center">
                  <h3 className="font-serif text-[13px] sm:text-2xl lg:text-3xl text-white leading-snug drop-shadow-sm">
                    {story.coupleName}
                  </h3>
                  {story.season ? (
                    <p className="text-[8px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-white/90 mt-0.5 sm:mt-1 font-medium">
                      {story.season}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        className={`transition-all duration-500 ease-out ${
          openStory ? 'max-h-[1400px] mt-6 opacity-100' : 'max-h-0 mt-0 opacity-0 overflow-hidden pointer-events-none'
        }`}
      >
        <div>
          {openStory && (
            <ImageSlideshow
              key={openStory.id}
              images={openStory.galleryImages.map((imageUrl, index) => ({
                id: `${openStory.id}-${index}`,
                imageUrl,
                title: `${openStory.coupleName} ${openStory.season}`.trim(),
              }))}
              autoPlayMs={2000}
              previousLabel={`Previous ${openStory.coupleName} photograph`}
              nextLabel={`Next ${openStory.coupleName} photograph`}
              onCollapse={() => setOpenStoryId(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
};
