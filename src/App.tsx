/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Header, GalleryTab, GALLERY_TABS } from './components/Header';
import { HeroSlideshow } from './components/HeroSlideshow';
import { AboutUs } from './components/AboutUs';
import { CuratedStories } from './components/CuratedStories';
import { WeddingVideoSection } from './components/WeddingVideoSection';
import { FooterGalleries } from './components/FooterGalleries';
import { InquiryModal } from './components/InquiryModal';
import { ImageViewerModal } from './components/ImageViewerModal';

import { HERO_SLIDES, CURATED_STORIES, VIDEO_CHAPTERS } from './data/weddingData';
import { CANDID_HERO_SLIDES, CANDID_STORIES } from './data/candidData';
import { TRAVEL_HERO_SLIDES, TRAVEL_STORIES, TRAVEL_VIDEO_CHAPTERS } from './data/travelData';
import { InquiryCategory, WeddingSlide } from './types/wedding';

const GALLERIES = {
  weddings: {
    slides: HERO_SLIDES,
    stories: CURATED_STORIES,
    films: VIDEO_CHAPTERS,
    cinemaTitle: 'Wedding Cinema',
    photoLabel: 'wedding',
    reservationLabel: 'weddings across India & worldwide',
    ctaLabels: ['Book Us', 'Inquire'] as const,
  },
  candid: {
    slides: CANDID_HERO_SLIDES,
    stories: CANDID_STORIES,
    films: [],
    cinemaTitle: '',
    photoLabel: 'candid',
    reservationLabel: 'sessions across India & worldwide',
    ctaLabels: ['Get Clicked', 'Plan your shoot'] as const,
  },
  travel: {
    slides: TRAVEL_HERO_SLIDES,
    stories: TRAVEL_STORIES,
    films: TRAVEL_VIDEO_CHAPTERS,
    cinemaTitle: 'Travel Cinema',
    photoLabel: 'travel',
    reservationLabel: 'travel assignments across India & worldwide',
    ctaLabels: ['Travel with us', 'Plan your travel'] as const,
  },
} as const;

export default function App() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryCategory | null>(null);
  const [selectedSlideForViewer, setSelectedSlideForViewer] = useState<WeddingSlide | null>(null);
  const [activeTab, setActiveTab] = useState<GalleryTab>('weddings');
  const [direction, setDirection] = useState(0);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const activeTabRef = useRef(activeTab);
  const inquiryOpenRef = useRef(isInquiryOpen);
  const viewerOpenRef = useRef(selectedSlideForViewer);

  activeTabRef.current = activeTab;
  inquiryOpenRef.current = isInquiryOpen;
  viewerOpenRef.current = selectedSlideForViewer;

  const openInquiryPicker = () => {
    setInquiryCategory(null);
    setIsInquiryOpen(true);
  };

  const openInquiryForPage = () => {
    setInquiryCategory(activeTab);
    setIsInquiryOpen(true);
  };

  const gallery = GALLERIES[activeTab];

  const handleSelectTab = (tab: GalleryTab) => {
    const current = activeTabRef.current;
    if (tab === current) return;
    const from = GALLERY_TABS.indexOf(current);
    const to = GALLERY_TABS.indexOf(tab);
    setDirection(to > from ? 1 : -1);
    setActiveTab(tab);
    setSelectedSlideForViewer(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGalleryCategory = (name: string) => {
    if (name === 'WEDDING') {
      handleSelectTab('weddings');
      return;
    }
    if (name === 'CELEBRITY & PORTRAIT') {
      handleSelectTab('candid');
      return;
    }
    if (name === 'TRAVEL') {
      handleSelectTab('travel');
    }
  };

  const shouldIgnoreSwipe = (target: EventTarget | null) => {
    if (!(target instanceof Element)) return false;
    return Boolean(
      target.closest('[data-no-page-swipe], input, textarea, select, video, button, a'),
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isInquiryOpen || selectedSlideForViewer || shouldIgnoreSwipe(event.target)) {
      swipeStart.current = null;
      return;
    }
    swipeStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!swipeStart.current) return;
    const dx = event.clientX - swipeStart.current.x;
    const dy = event.clientY - swipeStart.current.y;
    swipeStart.current = null;

    if (Math.abs(dx) < 72 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    const index = GALLERY_TABS.indexOf(activeTabRef.current);
    if (dx < 0 && index < GALLERY_TABS.length - 1) {
      handleSelectTab(GALLERY_TABS[index + 1]);
    } else if (dx > 0 && index > 0) {
      handleSelectTab(GALLERY_TABS[index - 1]);
    }
  };

  useEffect(() => {
    let accumulated = 0;
    let lockedUntil = 0;
    let resetTimer = 0;

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented) return;
      if (Date.now() < lockedUntil) return;
      if (inquiryOpenRef.current || viewerOpenRef.current) return;
      if (shouldIgnoreSwipe(event.target)) return;

      const dx = event.shiftKey ? event.deltaY || event.deltaX : event.deltaX;
      const dy = event.shiftKey ? 0 : event.deltaY;
      const atTop = window.scrollY < 32;
      const horizontal = Math.abs(dx) >= 6 && Math.abs(dx) >= Math.abs(dy);
      const verticalAtTop = atTop && Math.abs(dy) >= 10 && Math.abs(dy) > Math.abs(dx);
      if (!horizontal && !verticalAtTop) return;

      event.preventDefault();
      accumulated += horizontal ? dx : dy;
      window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        accumulated = 0;
      }, 200);

      const index = GALLERY_TABS.indexOf(activeTabRef.current);
      if (accumulated > 80 && index < GALLERY_TABS.length - 1) {
        accumulated = 0;
        lockedUntil = Date.now() + 700;
        handleSelectTab(GALLERY_TABS[index + 1]);
      } else if (accumulated < -80 && index > 0) {
        accumulated = 0;
        lockedUntil = Date.now() + 700;
        handleSelectTab(GALLERY_TABS[index - 1]);
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.clearTimeout(resetTimer);
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-neutral-900 selection:text-white overflow-x-clip">
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenInquiry={openInquiryPicker}
      />

      <div
        className="relative flex-1 overflow-x-clip touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        <main
          key={activeTab}
          className={`w-full bg-white ${
            direction > 0
              ? 'gallery-slide-from-right'
              : direction < 0
                ? 'gallery-slide-from-left'
                : ''
          }`}
        >
          <HeroSlideshow
            slides={gallery.slides}
            onOpenInquiry={openInquiryForPage}
            onSelectImageForViewer={(slide) => setSelectedSlideForViewer(slide)}
            previousLabel={`Previous ${gallery.photoLabel} photograph`}
            nextLabel={`Next ${gallery.photoLabel} photograph`}
            reservationLabel={gallery.reservationLabel}
            ctaLabels={gallery.ctaLabels}
          />

          <AboutUs category={activeTab} />

          <CuratedStories stories={gallery.stories} />

          {gallery.films.length > 0 && (
            <WeddingVideoSection
              chapters={[...gallery.films]}
              title={gallery.cinemaTitle}
            />
          )}
        </main>
      </div>

      <FooterGalleries
        onOpenInquiry={openInquiryPicker}
        onSelectCategory={handleSelectGalleryCategory}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        initialCategory={inquiryCategory}
        onClose={() => setIsInquiryOpen(false)}
      />

      <ImageViewerModal
        slides={gallery.slides}
        slide={selectedSlideForViewer}
        onClose={() => setSelectedSlideForViewer(null)}
      />
    </div>
  );
}
