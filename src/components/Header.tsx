import React from 'react';
import { Calendar } from 'lucide-react';

export type GalleryTab = 'weddings' | 'candid' | 'travel';

export const GALLERY_TABS: GalleryTab[] = ['weddings', 'candid', 'travel'];

interface HeaderProps {
  activeTab: GalleryTab;
  onSelectTab: (tab: GalleryTab) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenInquiry,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm py-2 px-4 sm:px-6 lg:px-8 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:flex sm:justify-between">
        <a href="/" className="order-1 flex items-center gap-2.5 shrink-0 group focus:outline-none">
          <h1 className="sr-only">Sumanth Photography</h1>
          <img
            src="/logo.png"
            alt="Sumanth Photography"
            className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
          />
          <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.28em] text-neutral-500 font-medium leading-none">
            Storyteller
          </p>
        </a>

        <nav
          aria-label="Portfolio Category Navigation"
          className="order-3 col-span-2 flex items-center justify-center gap-6 sm:gap-10 sm:order-2 sm:flex-1"
        >
          {([
            ['weddings', 'Weddings'],
            ['candid', 'Candid'],
            ['travel', 'Travel'],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              className={`py-1 px-0.5 text-[10px] sm:text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-black'
                  : 'text-neutral-400 hover:text-neutral-700'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <button
          onClick={onOpenInquiry}
          className="order-2 flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.18em] text-neutral-900 hover:text-neutral-600 transition-colors py-1.5 px-2 group font-medium shrink-0 sm:order-3"
        >
          <Calendar className="w-3.5 h-3.5 text-neutral-900 transition-transform group-hover:rotate-6" />
          <span className="sm:hidden">Book</span>
          <span className="hidden sm:inline">Book Your Shoot</span>
        </button>
      </div>
    </header>
  );
};
