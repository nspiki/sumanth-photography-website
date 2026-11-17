import { WeddingSlide, CuratedStory } from '../types/wedding';
import { masterSlides, curatedStoriesFromFolders } from './gallery';

export const CANDID_HERO_SLIDES: WeddingSlide[] = masterSlides('Candid');

const CANDID_STORY_FOLDERS: { folder: string; files: string[] }[] = [
  {
    folder: "Hansika Motwani",
    files: [
      "@ihansika via @apple FACETIME facetimephotoshoot lockdown vsco apple facetime photoshoot  (1).jpg",
      "@ihansika via @apple FACETIME facetimephotoshoot lockdown vsco apple facetime photoshoot .jpg",
      "⚠️⚠️⚠️ (1).jpg",
      "⚠️⚠️⚠️ (2).jpg",
      "👸🏻 (1).jpg",
      "👸🏻.jpg",
      "💚 (1).jpg",
      "💚.jpg",
    ],
  },
  {
    folder: "Kajal Agarwal",
    files: [
      "@kajalaggarwalofficial 💕 (2).jpg",
      "@kajalaggarwalofficial 💕 (4).jpg",
      "Happy birthday @kajalaggarwalofficial ❤️ (1).jpg",
      "Happy birthday @kajalaggarwalofficial ❤️ (2).jpg",
      "Happy birthday @kajalaggarwalofficial ❤️.jpg",
      "Hey! Sinamika 💫 (1).jpg",
      "Hey! Sinamika 💫 (2).jpg",
      "Hey! Sinamika 💫.jpg",
      "Look who’s on the feed 😍 Got to shoot this stunning lady @kajalaggarwalofficial Hair - @divya.n (1).jpg",
      "Look who’s on the feed 😍 Got to shoot this stunning lady @kajalaggarwalofficial Hair - @divya.n (2).jpg",
      "Look who’s on the feed 😍 Got to shoot this stunning lady @kajalaggarwalofficial Hair - @divya.n.jpg",
      "Shot this gorgeous and my camera couldn’t get more happier! @kajalaggarwalofficial you can make  (1).jpg",
      "Shot this gorgeous and my camera couldn’t get more happier! @kajalaggarwalofficial you can make  (2).jpg",
      "Shot this gorgeous and my camera couldn’t get more happier! @kajalaggarwalofficial you can make .jpg",
      "☀️ (1).jpg",
      "☀️.jpg",
      "♣️♣️♣️ (1).jpg",
      "♣️♣️♣️ (2).jpg",
      "♣️♣️♣️.jpg",
      "🤍 (1).jpg",
      "🤍.jpg",
    ],
  },
  {
    folder: "Lavanya Tripati",
    files: [
      "arjunsuravaram Shooting unusual ❤️ stunning @itsmelavanyaOUTFIT- @notchabovecreations STYLING - (1).jpg",
      "arjunsuravaram Shooting unusual ❤️ stunning @itsmelavanyaOUTFIT- @notchabovecreations STYLING - (2).jpg",
      "arjunsuravaram Shooting unusual ❤️ stunning @itsmelavanyaOUTFIT- @notchabovecreations STYLING - (3).jpg",
      "arjunsuravaram Shooting unusual ❤️ stunning @itsmelavanyaOUTFIT- @notchabovecreations STYLING -.jpg",
      "🌻 (4).jpg",
      "🌻 (5).jpg",
      "🦋 (1).jpg",
      "🦋.jpg",
    ],
  },
  {
    folder: "Raashi Kanna",
    files: [
      "🌻 (1).jpg",
      "🌻 (2).jpg",
      "🌻 (3).jpg",
      "🌻.jpg",
    ],
  },
];

export const CANDID_STORIES: CuratedStory[] = curatedStoriesFromFolders('Candid', CANDID_STORY_FOLDERS);
