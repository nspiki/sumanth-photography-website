import React, { useEffect, useState } from 'react';
import { X, CheckCircle, Send } from 'lucide-react';
import { InquiryCategory, InquiryFormData } from '../types/wedding';
import { submitInquiryToGoogle } from '../lib/googleForms';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: InquiryCategory | null;
}

const EMPTY_FORM: InquiryFormData = {
  names: '',
  email: '',
  phone: '',
  weddingDate: '',
  venueCity: '',
  guestCount: '250 - 500+ guests',
  coverageType: '',
  budgetRange: '₹3,00,000 - ₹8,00,000',
  notes: '',
};

const CATEGORY_OPTIONS: { id: InquiryCategory; label: string; description: string }[] = [
  { id: 'weddings', label: 'Weddings', description: 'Celebrations, rituals, and wedding cinema' },
  { id: 'candid', label: 'Candid', description: 'Portraits, celebrity, and personal sessions' },
  { id: 'travel', label: 'Travel', description: 'Wildlife, destinations, and travel assignments' },
];

const defaultsForCategory = (category: InquiryCategory): InquiryFormData => ({
  ...EMPTY_FORM,
  coverageType:
    category === 'weddings' ? '1 Event' : category === 'candid' ? 'Portrait' : 'Wildlife',
  guestCount: category === 'weddings' ? '100 - 300 guests' : '',
});

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = null,
}) => {
  const [category, setCategory] = useState<InquiryCategory | null>(initialCategory);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<InquiryFormData>(EMPTY_FORM);

  useEffect(() => {
    if (!isOpen) return;
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
    setCategory(initialCategory ?? null);
    setFormData(initialCategory ? defaultsForCategory(initialCategory) : EMPTY_FORM);
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const fieldClass =
    'w-full px-4 py-2.5 bg-white border border-neutral-900 text-sm text-black focus:outline-none focus:ring-0';

  const handleSelectCategory = (next: InquiryCategory) => {
    setCategory(next);
    setFormData(defaultsForCategory(next));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitInquiryToGoogle(category, formData);
      setIsSubmitted(true);
    } catch {
      setSubmitError('We could not send your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCategory(null);
    onClose();
  };

  const thankYouName = formData.names || (category === 'weddings' ? 'Dear Couple' : 'there');
  const thankYouPlace = formData.venueCity || 'your chosen destination';
  const thankYouDate = formData.weddingDate || 'your upcoming dates';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="relative w-[85%] max-w-[35.7rem] bg-white shadow-2xl overflow-hidden my-8">
        <div className="bg-black text-white p-5 sm:p-7 flex items-start justify-between">
          <h3 className="font-serif text-xl sm:text-[1.6rem] text-white font-normal pr-8 leading-snug">
            {category
              ? 'Submit an inquiry and we will give you a call'
              : 'What would you like to book?'}
          </h3>

          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            aria-label="Close inquiry window"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-7 bg-white">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-black text-white mx-auto flex items-center justify-center mb-4">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-black">
                Thank you, {thankYouName}!
              </h4>
              <p className="text-sm text-neutral-800 mt-2 max-w-md mx-auto font-light leading-relaxed">
                Your {category} inquiry for <span className="font-medium text-black">{thankYouDate}</span> in{' '}
                <span className="font-medium text-black">{thankYouPlace}</span> has been received. Sumanth Tittu
                & team will review your dates and connect with you within 24–48 hours.
              </p>

              <div className="mt-8 pt-6 flex justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 bg-black text-white hover:bg-neutral-800 transition-colors text-xs uppercase tracking-[0.2em] font-medium"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : !category ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CATEGORY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectCategory(option.id)}
                  className="border border-neutral-900 px-4 py-8 text-center hover:bg-black hover:text-white transition-colors group"
                >
                  <span className="block text-xs uppercase tracking-[0.22em] font-semibold">
                    {option.label}
                  </span>
                  <span className="block mt-3 text-[11px] leading-relaxed text-neutral-600 group-hover:text-white/80 font-light">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {!initialCategory && (
                <button
                  type="button"
                  onClick={() => {
                    setCategory(null);
                    setFormData(EMPTY_FORM);
                  }}
                  className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 hover:text-black"
                >
                  ← Change {CATEGORY_OPTIONS.find((item) => item.id === category)?.label}
                </button>
              )}

              {category === 'weddings' && (
                <WeddingFields formData={formData} setFormData={setFormData} fieldClass={fieldClass} />
              )}
              {category === 'candid' && (
                <CandidFields formData={formData} setFormData={setFormData} fieldClass={fieldClass} />
              )}
              {category === 'travel' && (
                <TravelFields formData={formData} setFormData={setFormData} fieldClass={fieldClass} />
              )}

              {submitError ? (
                <p className="text-xs text-red-700">{submitError}</p>
              ) : null}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-black hover:bg-neutral-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-black hover:bg-neutral-800 disabled:opacity-60 text-white text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-2 group"
                >
                  <span>{isSubmitting ? 'Sending' : 'Submit Inquiry'}</span>
                  <Send className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface FieldProps {
  formData: InquiryFormData;
  setFormData: React.Dispatch<React.SetStateAction<InquiryFormData>>;
  fieldClass: string;
}

const WeddingFields: React.FC<FieldProps> = ({ formData, setFormData, fieldClass }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Both Your Names *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Priya & Rahul"
          value={formData.names}
          onChange={(e) => setFormData({ ...formData, names: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Celebration Day *
        </label>
        <input
          type="date"
          required
          value={formData.weddingDate}
          onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Location & Venue / City *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Hyderabad, Udaipur, Como"
          value={formData.venueCity}
          onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Number of Events
        </label>
        <select
          value={formData.coverageType}
          onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
          className={fieldClass}
        >
          <option value="1 Event">1 Event</option>
          <option value="2 Events">2 Events</option>
          <option value="3 Events">3 Events</option>
          <option value="4 Events">4 Events</option>
          <option value="5+ Events">5+ Events</option>
        </select>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Estimated Guest Count
        </label>
        <select
          value={formData.guestCount}
          onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
          className={fieldClass}
        >
          <option value="Intimate (< 100 guests)">Intimate (&lt; 100 guests)</option>
          <option value="100 - 300 guests">100 - 300 guests</option>
          <option value="300 - 600 guests">300 - 600 guests</option>
          <option value="600 - 1500+ guests">600 - 1500+ guests</option>
        </select>
      </div>
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
        Your Vision & Traditions
      </label>
      <textarea
        rows={3}
        placeholder="Share details about your celebration style, rituals (Nalangu, Pheras, Haldi, Sangeet), or personal requests..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className={`${fieldClass} resize-none`}
      />
    </div>
  </>
);

const CandidFields: React.FC<FieldProps> = ({ formData, setFormData, fieldClass }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Your Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Priya Sharma"
          value={formData.names}
          onChange={(e) => setFormData({ ...formData, names: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Preferred Shoot Date *
        </label>
        <input
          type="date"
          required
          value={formData.weddingDate}
          onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          City / Location *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Hyderabad, Mumbai"
          value={formData.venueCity}
          onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
        Session Type
      </label>
      <select
        value={formData.coverageType}
        onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
        className={fieldClass}
      >
        <option value="Portrait">Portrait</option>
        <option value="Celebrity">Celebrity</option>
        <option value="Editorial">Editorial</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
        About the Shoot
      </label>
      <textarea
        rows={3}
        placeholder="Tell us about the look, wardrobe, or the story you want captured..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className={`${fieldClass} resize-none`}
      />
    </div>
  </>
);

const TravelFields: React.FC<FieldProps> = ({ formData, setFormData, fieldClass }) => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Your Name *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Arjun Mehta"
          value={formData.names}
          onChange={(e) => setFormData({ ...formData, names: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          required
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Travel Dates *
        </label>
        <input
          type="date"
          required
          value={formData.weddingDate}
          onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
          Destination *
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Masai Mara, Tadoba, Kenya"
          value={formData.venueCity}
          onChange={(e) => setFormData({ ...formData, venueCity: e.target.value })}
          className={fieldClass}
        />
      </div>
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
        Trip Type
      </label>
      <select
        value={formData.coverageType}
        onChange={(e) => setFormData({ ...formData, coverageType: e.target.value })}
        className={fieldClass}
      >
        <option value="Wildlife">Wildlife</option>
        <option value="Destination">Destination</option>
        <option value="Assignment">Assignment</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
    <div>
      <label className="block text-xs uppercase tracking-[0.16em] text-black font-semibold mb-1.5">
        Travel Notes
      </label>
      <textarea
        rows={3}
        placeholder="Share the itinerary, wildlife focus, or the kind of frames you hope to bring home..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        className={`${fieldClass} resize-none`}
      />
    </div>
  </>
);
