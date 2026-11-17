import { WeddingSlide, CuratedStory, VideoChapter } from '../types/wedding';

export const publicAsset = (...segments: string[]) =>
  encodeURI(`/${segments.join('/')}`);

export const masterSlides = (category: string): WeddingSlide[] =>
  Array.from({ length: 10 }, (_, index) => {
    const id = index + 1;
    return {
      id,
      title: `${category} ${id}`,
      subtitle: '',
      location: '',
      imageUrl: publicAsset('Images', category, 'Master', `${id}.jpg`),
      description: '',
    };
  });

export const curatedStoriesFromFolders = (
  category: string,
  folders: { folder: string; files: string[] }[],
): CuratedStory[] =>
  folders.map((source, index) => {
    const separator = source.folder.indexOf(',');
    const coupleName =
      separator === -1 ? source.folder.trim() : source.folder.slice(0, separator).trim();
    const season =
      separator === -1 ? '' : source.folder.slice(separator + 1).trim();
    const galleryImages = source.files.map((file) =>
      publicAsset('Images', category, source.folder, file),
    );

    return {
      id: `${category.toLowerCase()}-story-${index + 1}`,
      coupleName,
      subtitle: season,
      location: season,
      season,
      coverImage: galleryImages[0],
      teaser: '',
      fullStory: '',
      quote: '',
      galleryImages,
      tags: season ? [season] : [],
    };
  });

export const videoChaptersFromFiles = (subdir: string, files: string[]): VideoChapter[] =>
  files.map((file, index) => {
    const name = file.replace(/\.mp4$/i, '');
    const separator = name.indexOf(',');
    const title = separator === -1 ? name.trim() : name.slice(0, separator).trim();
    const subtitle = separator === -1 ? '' : name.slice(separator + 1).trim();

    return {
      id: `${subdir.toLowerCase()}-film-${index + 1}`,
      title,
      subtitle,
      videoUrl: publicAsset('Video', subdir, file),
    };
  });
