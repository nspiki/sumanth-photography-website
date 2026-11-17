export interface WeddingSlide {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  imageUrl: string;
  description: string;
  exif?: {
    camera: string;
    lens: string;
    filmLook: string;
  };
}

export interface CuratedStory {
  id: string;
  coupleName: string;
  subtitle: string;
  location: string;
  season: string;
  coverImage: string;
  teaser: string;
  fullStory: string;
  quote: string;
  galleryImages: string[];
  tags: string[];
}

export interface VideoChapter {
  id: string;
  title: string;
  subtitle: string;
  videoUrl: string;
}

export type InquiryCategory = 'weddings' | 'candid' | 'travel';

export interface InquiryFormData {
  names: string;
  email: string;
  phone: string;
  weddingDate: string;
  venueCity: string;
  guestCount: string;
  coverageType: string;
  budgetRange: string;
  notes: string;
}
