import { WeddingSlide, CuratedStory, VideoChapter } from '../types/wedding';
import { videoChaptersFromFiles } from './gallery';

export const HERO_SLIDES: WeddingSlide[] = [
  {
    id: 1,
    title: "Grand Falaknuma Staircase Royale",
    subtitle: "Rhea & Siddharth",
    location: "Taj Falaknuma Palace, Hyderabad",
    imageUrl: "/Images/Weddings/Master/1.jpg",
    description: "A breathtaking royal union framed by vintage crystal chandeliers, cascading marigold garlands, and heirloom crimson zardozi silk.",
    exif: {
      camera: "Sony A1",
      lens: "35mm f/1.4 GM",
      filmLook: "Warm Gold CineColor"
    }
  },
  {
    id: 2,
    title: "Sacred Jeelakarra Bellam & Garlands",
    subtitle: "Kavya & Akhil",
    location: "Ramoji Heritage Mandap, Hyderabad",
    imageUrl: "/Images/Weddings/Master/2.jpg",
    description: "The auspicious sacred hour: tender smiles, pure Kanjeevaram silk, brass oil lamps, and joyous blessings from family.",
    exif: {
      camera: "Sony A7R V",
      lens: "50mm f/1.2 GM",
      filmLook: "Kodak Portra 400"
    }
  },
  {
    id: 3,
    title: "The Royal Temple Vows",
    subtitle: "Surya & Jyothika",
    location: "Mahabalipuram Mandapam, Chennai",
    imageUrl: "/Images/Weddings/Master/3.jpg",
    description: "Timeless traditional heritage under stone pillars, fragrant jasmine garlands, and radiant cinematic warmth captured by Sumanth Photography.",
    exif: {
      camera: "Sony A1",
      lens: "85mm f/1.4 GM",
      filmLook: "Classic Documentary"
    }
  },
  {
    id: 4,
    title: "The Golden Marigold Haldi Revelry",
    subtitle: "Ananya & Rohan",
    location: "Golconda Fort Courtyard, Hyderabad",
    imageUrl: "/Images/Weddings/Master/4.jpg",
    description: "An ecstatic shower of yellow turmeric and fragrant marigold petals filled with unrestrained candid laughter and infectious dance.",
    exif: {
      camera: "Sony A7R V",
      lens: "35mm f/1.4 GM",
      filmLook: "Vibrant Haldi Amber"
    }
  },
  {
    id: 5,
    title: "Cascading Jasmine Mandap",
    subtitle: "Pooja & Dev",
    location: "The Leela Palace, Udaipur",
    imageUrl: "/Images/Weddings/Master/5.jpg",
    description: "Tens of thousands of fresh white tuberoses and hanging jasmine strands creating a floral haven around the sacred wedding fire.",
    exif: {
      camera: "Sony A1",
      lens: "50mm f/1.2 GM",
      filmLook: "Royal Velvia"
    }
  },
  {
    id: 6,
    title: "Twilight Gala & Starlight Banquets",
    subtitle: "Sanjana & Vikram",
    location: "Château de Tourreau, Provence",
    imageUrl: "/Images/Weddings/Master/6.jpg",
    description: "An open-air evening reception under thousands of twinkling fairy lights as loved ones raise vintage champagne coupes.",
    exif: {
      camera: "Arri Alexa Mini LF",
      lens: "Cooke S4/i Prime",
      filmLook: "Kodak Vision3 500T"
    }
  },
  {
    id: 7,
    title: "Villa Balbianello Drift",
    subtitle: "Elena & Matteo",
    location: "Lake Como, Northern Italy",
    imageUrl: "/Images/Weddings/Master/7.jpg",
    description: "Gliding across sparkling alpine waters aboard a vintage mahogany Riva boat beneath cypress-covered hills.",
    exif: {
      camera: "Leica M11",
      lens: "50mm Noctilux",
      filmLook: "Italian Summer 200"
    }
  },
  {
    id: 8,
    title: "Cliffside Sunset Vows",
    subtitle: "Sophie & Liam",
    location: "Amalfi Coast, Italy",
    imageUrl: "/Images/Weddings/Master/8.jpg",
    description: "Laughter, heirloom wine, and olive groves overlooking the sapphire Mediterranean at golden hour.",
    exif: {
      camera: "Sony A1",
      lens: "35mm f/1.4 GM",
      filmLook: "Mediterranean Honey"
    }
  },
  {
    id: 9,
    title: "Candelabra Waltz & First Dance",
    subtitle: "Genevieve & Edward",
    location: "Cotswolds Manor, United Kingdom",
    imageUrl: "/Images/Weddings/Master/9.jpg",
    description: "A breathless waltz amidst stone archways, tumbling ivy, and hundreds of hand-poured beeswax tapers.",
    exif: {
      camera: "Canon R5",
      lens: "28-70mm f/2.0 L",
      filmLook: "Candlelight 800"
    }
  },
  {
    id: 10,
    title: "Nordic Highland Elopement",
    subtitle: "Astrid & Henrik",
    location: "Reykjanes Peninsula, Iceland",
    imageUrl: "/Images/Weddings/Master/10.jpg",
    description: "An intimate cliffside union where windswept silk veils met volcanic ocean horizons under ethereal daylight.",
    exif: {
      camera: "Leica SL2",
      lens: "35mm Summilux",
      filmLook: "Kodak Portra 400 Soft"
    }
  }
];

const weddingStoryAsset = (folder: string, file: string) =>
  encodeURI(`/Images/Weddings/${folder}/${file}`);

const WEDDING_STORY_FOLDERS: { folder: string; files: string[] }[] = [
  {
    folder: 'Story 1, Wedding',
    files: [
      'IMG_8859.jpg',
      'IMG_8873.jpg',
      'IMG_8907.jpg',
      'IMG_8913.jpg',
      'IMG_8915.jpg',
      'IMG_8921.jpg',
      'IMG_9004.jpg',
      'IMG_9030.jpg',
      'IMG_9067.jpg',
    ],
  },
  {
    folder: 'Story 2, Wedding 2',
    files: [
      'IMG_0770.jpg',
      'IMG_0781.jpg',
      'IMG_0788.jpg',
      'IMG_0792.jpg',
      'IMG_0793.jpg',
      'IMG_0794.jpg',
      'IMG_0799.jpg',
      'IMG_0804.jpg',
      'IMG_0830.jpg',
    ],
  },
  {
    folder: 'Story 3, Wedding 3',
    files: [
      'IMG_1383.jpg',
      'IMG_1386.jpg',
      'IMG_1390.jpg',
      'IMG_1391.jpg',
      'IMG_1393.jpg',
      'IMG_1398.jpg',
      'IMG_1405.jpg',
      'IMG_1407.jpg',
      'IMG_1408.jpg',
    ],
  },
  {
    folder: 'Story 4, Engagement 1',
    files: [
      'IMG_1120.jpg',
      'IMG_1125.jpg',
      'IMG_1128.jpg',
      'IMG_1135.jpg',
      'IMG_1146.jpg',
      'IMG_1148.jpg',
      'IMG_1152.jpg',
      'IMG_1159.jpg',
      'IMG_1163.jpg',
    ],
  },
  {
    folder: 'Story 5, Reception 1',
    files: [
      'IMG_0769.jpg',
      'IMG_0896.jpg',
      'IMG_0918.jpg',
      'IMG_0928.jpg',
      'IMG_0955.jpg',
      'IMG_0986.jpg',
      'IMG_1013.jpg',
      'IMG_1139.jpg',
      'IMG_1155.jpg',
    ],
  },
  {
    folder: 'Story 6, Sangeet 1',
    files: [
      'IMG_0964.jpg',
      'IMG_0966.jpg',
      'IMG_0973.jpg',
      'IMG_0976.jpg',
      'IMG_0990.jpg',
      'IMG_0999.jpg',
      'IMG_1001.jpg',
      'IMG_1002.jpg',
      'IMG_1010.jpg',
    ],
  },
];

export const CURATED_STORIES: CuratedStory[] = WEDDING_STORY_FOLDERS.map((source, index) => {
  const separator = source.folder.indexOf(',');
  const coupleName =
    separator === -1 ? source.folder.trim() : source.folder.slice(0, separator).trim();
  const season =
    separator === -1 ? '' : source.folder.slice(separator + 1).trim();
  const galleryImages = source.files.map((file) => weddingStoryAsset(source.folder, file));

  return {
    id: `story-${index + 1}`,
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

const CINEMA_FILES = [
  'Wedding1, Sky full of love 🩵.mp4',
  'Wedding 2, Where love leads we follow ❤️.mp4',
  'Wedding 3, Blah Blah Blah.mp4',
  'Wedding 4, Beach.mp4',
];

export const VIDEO_CHAPTERS: VideoChapter[] = videoChaptersFromFiles('Weddings', CINEMA_FILES);
