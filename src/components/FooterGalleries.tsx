import React from 'react';
import { Instagram, Plane } from 'lucide-react';

interface FooterGalleriesProps {
  onOpenInquiry: () => void;
  onSelectCategory: (name: string) => void;
}

export const FooterGalleries: React.FC<FooterGalleriesProps> = ({
  onOpenInquiry,
  onSelectCategory,
}) => {
  const categories = [
    {
      name: 'WEDDING',
      icon: (
        <svg className="w-8 h-8 stroke-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 24 24">
          <circle cx="9" cy="13" r="5" />
          <circle cx="15" cy="13" r="5" />
        </svg>
      ),
    },
    {
      name: 'CELEBRITY & PORTRAIT',
      icon: (
        <svg className="w-8 h-8 stroke-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 5.4l1.55 4.05 4.3.22-3.36 2.7 1.12 4.16L12 14.7l-3.61 1.83 1.12-4.16-3.36-2.7 4.3-.22z" />
        </svg>
      ),
    },
    {
      name: 'PRODUCT & INTERIOR',
      icon: (
        <svg className="w-8 h-8 stroke-neutral-800 stroke-[1.2] fill-none" viewBox="0 0 24 24">
          <path d="M10 2.5h4v1.6h-4z" />
          <path d="M10.7 4.1h2.6v2.4c0 .5.2 1 .6 1.4l.7.8c1.2 1.3 1.9 3 1.9 4.8v5.2c0 1.3-1.1 2.3-2.4 2.3h-4.2c-1.3 0-2.4-1-2.4-2.3V13.5c0-1.8.7-3.5 1.9-4.8l.7-.8c.4-.4.6-.9.6-1.4z" />
          <path d="M9.4 12.4c1.6-1.1 3.6-1.1 5.2 0" />
        </svg>
      ),
    },
    {
      name: 'TRAVEL',
      icon: <Plane className="w-8 h-8 stroke-neutral-800 stroke-[1.2]" />,
    },
  ];

  return (
    <footer className="w-full bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Galleries Heading */}
        <div className="text-center mb-12">
          <h3 className="font-serif text-2xl sm:text-3xl uppercase tracking-[0.25em] text-neutral-900">
            Galleries
          </h3>
          <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 mt-2">
            Curated Archives & Disciplines
          </p>
        </div>

        {/* Minimalist 4 Line-Art Icons (No borders) */}
        <div className="grid grid-cols-4 gap-1 sm:gap-8 pb-12 sm:pb-16">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="flex flex-col items-center group p-1 sm:p-4 rounded-xl hover:bg-neutral-50 transition-all text-center"
            >
              <div className="h-8 sm:h-12 flex items-center justify-center transform group-hover:-translate-y-1 transition-transform text-neutral-800 group-hover:text-black [&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-8 sm:[&_svg]:h-8">
                {cat.icon}
              </div>
              <span className="font-sans text-[7px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.22em] text-neutral-900 font-semibold mt-1.5 sm:mt-3 leading-tight group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>

        <div className="pt-8 flex flex-col items-center gap-5 text-xs text-neutral-500">
          <button
            onClick={onOpenInquiry}
            className="text-neutral-900 hover:text-black font-semibold uppercase tracking-[0.16em] text-[11px] transition-colors text-center"
          >
            Book Your Shoot
          </button>

          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Sumanth Photography"
              className="h-10 w-auto object-contain"
            />
            <span className="text-neutral-300">|</span>
            <a
              href="https://www.instagram.com/sumanthtittu/"
              target="_blank"
              rel="noreferrer"
              aria-label="Sumanth Photography on Instagram"
              className="text-neutral-900 hover:text-black transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <span className="text-center">
            © {new Date().getFullYear()} Sumanth Photography. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
