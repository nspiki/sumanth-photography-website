import { WeddingSlide, CuratedStory, VideoChapter } from '../types/wedding';
import { masterSlides, curatedStoriesFromFolders, videoChaptersFromFiles } from './gallery';

export const TRAVEL_HERO_SLIDES: WeddingSlide[] = masterSlides('Travel');

const TRAVEL_STORY_FOLDERS: { folder: string; files: string[] }[] = [
  {
    folder: "Amboseli",
    files: [
      "ShineIts your golden hourYou slow down timeIn your golden hour 🌞sunrise sunset kenya afric (1).jpg",
      "ShineIts your golden hourYou slow down timeIn your golden hour 🌞sunrise sunset kenya afric (2).jpg",
      "ShineIts your golden hourYou slow down timeIn your golden hour 🌞sunrise sunset kenya afric.jpg",
    ],
  },
  {
    folder: "Kanha",
    files: [
      "Sharmilee, the shy one. She is surely among the most difficult to track tigers in Kanha tiger re (1).jpg",
      "Sharmilee, the shy one. She is surely among the most difficult to track tigers in Kanha tiger re.jpg",
    ],
  },
  {
    folder: "Mara",
    files: [
      "772020723_18614324317020712_376891051463914192_n..jpg",
      "772327414_18613608238020712_8121948326746123509_n..jpg",
      "772869228_18613950847020712_4147169193886280536_n..jpg",
      "773099005_18613610809020712_749291387496938608_n..jpg",
      "774197446_18615828664020712_8413039473694343409_n..jpg",
      "775336032_18615828565020712_6515799911670778871_n..jpg",
      "779017589_18615828574020712_8541549331323899829_n..jpg",
      "779728709_18616325776020712_9052919411487624260_n..jpg",
    ],
  },
  {
    folder: "Masai",
    files: [
      "As majestic as it could get 🦁 masaimara capturedoncanon kenya wildlife wildlifephotography.jpg",
      "I’m just getting started 🐾 masaimara capturedoncanon kenya wildlife travel photography a.jpg",
      "Mama’s boy 🦁 kenya africa capturedoncanon projectcat discoverearth discoveryadventures l.jpg",
      "Swipe left for some drama 🦓masaimara capturedoncanon kenya zebra wildlife wildlifephotogr.jpg",
      "THE LEAPSpending hours gazing at these mighty creatures is so charming to observe their behavior.jpg",
      "U k i y o ☘️wildlifephotography wildlifeplanet wildlifephotographer earthcapture bbcearth .jpg",
    ],
  },
  {
    folder: "Tadoba",
    files: [
      "753225120_18607932886020712_4746795028195877158_n..jpg",
      "753733301_18607932856020712_6576592317180459368_n..jpg",
      "756612616_18608546641020712_3521083842744853623_n..jpg",
      "758328481_18608546698020712_8156595607379188066_n..jpg",
      "758395692_18608838790020712_7444557960358604231_n..jpg",
      "758469267_18608839369020712_8843299793795904448_n..jpg",
      "759521799_18608838799020712_2650284899337656441_n..jpg",
    ],
  },
];

export const TRAVEL_STORIES: CuratedStory[] = curatedStoriesFromFolders('Travel', TRAVEL_STORY_FOLDERS);

const TRAVEL_CINEMA_FILES = [
  "ATR.mp4",
  "Kanha.mp4",
  "Tadoba.mp4",
];

export const TRAVEL_VIDEO_CHAPTERS: VideoChapter[] = videoChaptersFromFiles('Travel', TRAVEL_CINEMA_FILES);
