import React from 'react';
import { GalleryTab } from './Header';

const MAIN_BODY = [
  'We tell stories through the lens. From editorial fine-art weddings and royal celebrations to every other story we’re trusted with, every frame is composed to feel cinematic, timeless and true to the people in it.',
  'We don’t just document the moment. We capture the emotion, the details and the quiet moments in between, so you can relive them for years to come.',
  'Whether it’s a grand celebration or an intimate shoot, we bring an artistic eye and a calm, collaborative approach to every project.',
];

const WHAT_WE_DO: Record<GalleryTab, string> = {
  weddings:
    'Editorial fine-art weddings and the celebrations that come with them, from engagements and haldi to sangeet and receptions. We capture the big moments and the small ones, from the rituals and grand entrances to the stolen glances, and deliver a story that feels as cinematic as the day itself.',
  candid:
    'Real moments, beautifully told. From personal shoots to product and interior photography, we keep things natural and relaxed so the result feels true to you, your brand or your space.',
  travel:
    'Wildlife journeys planned and organised by us, open to everyone. You don’t need to be a photographer, just curious about the wild. Prefer to travel your own way? We’ll document your personal trip and turn it into a visual story you’ll want to revisit.',
};

interface AboutUsProps {
  category: GalleryTab;
}

export const AboutUs: React.FC<AboutUsProps> = ({ category }) => {
  return (
    <section
      id="about-us"
      className="w-[92%] sm:w-[70%] md:w-[55%] mx-auto pt-6 pb-4 bg-white text-center"
    >
      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-neutral-900 tracking-tight">
        About Us
      </h2>

      <div className="mt-6 space-y-4">
        {MAIN_BODY.map((paragraph) => (
          <p
            key={paragraph.slice(0, 24)}
            className="text-sm sm:text-[15px] leading-relaxed text-neutral-700 font-light"
          >
            {paragraph}
          </p>
        ))}
        <p className="text-sm sm:text-[15px] leading-relaxed text-neutral-700 font-light">
          {WHAT_WE_DO[category]}
        </p>
      </div>
    </section>
  );
};
