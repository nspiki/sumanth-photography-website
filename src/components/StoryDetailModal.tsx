import React from 'react';
import { X, MapPin, Sparkles } from 'lucide-react';
import { CuratedStory } from '../types/wedding';

interface StoryDetailModalProps {
  story: CuratedStory | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({
  story,
  onClose,
  onOpenInquiry,
}) => {
  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Sticky Header with Title and Close */}
        <div className="bg-neutral-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-300 font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Sumanth Photography Story Archive</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              {story.coupleName}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close story"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Story Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 bg-white">
          {/* Main Hero Shot */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden bg-neutral-950 shadow-md">
            <img
              src={story.coverImage}
              alt={story.coupleName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
              {story.season && (
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-amber-300 font-medium">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{story.season}</span>
                </div>
              )}
              <p className="font-serif text-xl sm:text-2xl mt-1 text-white max-w-2xl">
                {story.coupleName}
              </p>
            </div>
          </div>

          {story.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {story.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs uppercase tracking-[0.16em] bg-neutral-100 text-neutral-800 px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(story.quote || story.fullStory) && (
            <div className="prose prose-stone max-w-none">
              {story.quote && (
                <p className="font-serif text-lg sm:text-xl text-neutral-900 leading-relaxed italic pl-4 my-4 border-l-2 border-neutral-900">
                  "{story.quote}"
                </p>
              )}
              {story.fullStory && (
                <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                  {story.fullStory}
                </p>
              )}
            </div>
          )}

          {/* Additional Gallery Frames */}
          <div className="pt-4">
            <h4 className="font-serif text-xl text-neutral-900 mb-3">
              Editorial Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {story.galleryImages.map((imgUrl, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden bg-neutral-950">
                  <img
                    src={imgUrl}
                    alt={`${story.coupleName} highlight ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 font-light">
              Planning a {story.season || 'celebration'}? Let Sumanth Photography craft your heirloom film.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors shrink-0 shadow-sm"
            >
              Inquire for This Destination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
