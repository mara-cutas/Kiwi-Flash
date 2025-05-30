
import type { Flashcard } from '@/types';

const baseFlashcards: Flashcard[] = [
  {
    id: 'base-1',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Kiwi Bird',
    dataAiHint: 'kiwi bird',
    name: 'Kiwi',
    facts: [
      'A nocturnal and flightless bird, endemic to New Zealand.',
      'Lays the largest egg in relation to its body size of any bird in the world.',
      'Uses its long beak with nostrils at the tip to sniff out insects and worms in the soil.',
      'There are five recognized species of kiwi.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-2',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Silver Fern',
    dataAiHint: 'silver fern',
    name: 'Silver Fern (Ponga)',
    facts: [
      'A species of medium-sized tree fern, native to New Zealand.',
      'Its fronds have a distinctive silver-white underside, historically used to mark tracks for night-time navigation.',
      'A prominent national symbol of New Zealand, frequently used by sports teams and in official emblems.',
      'Can grow up to 10 meters (33 feet) high.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-3',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Tui Bird',
    dataAiHint: 'tui bird',
    name: 'Tūī',
    facts: [
      'An endemic passerine bird of New Zealand, known for its intelligence and complex vocalizations.',
      'Can mimic other bird calls and even human speech.',
      'Features a distinctive white tuft of feathers at its throat, called a "poi".',
      'Plays an important role in pollination by feeding on nectar.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-4',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Pohutukawa Tree',
    dataAiHint: 'pohutukawa tree',
    name: 'Pōhutukawa',
    facts: [
      'A coastal evergreen tree famous for its vibrant crimson flowers that bloom in early summer.',
      'Often called the "New Zealand Christmas tree" due to its flowering period.',
      'Highly resilient, capable of growing in rocky cliffs and tolerating salt spray.',
      'Holds cultural significance in Māori traditions and mythology.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-5',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Hectors Dolphin',
    dataAiHint: 'hectors dolphin',
    name: "Hector's Dolphin",
    facts: [
      "One of the world's rarest and smallest marine dolphins, endemic to New Zealand's coastal waters.",
      'Characterized by a rounded dorsal fin (unlike the typical pointed fin of other dolphins).',
      'The Māui dolphin, found off the west coast of the North Island, is a critically endangered subspecies.',
      'Typically found in shallow waters close to shore.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-6',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Kauri Tree',
    dataAiHint: 'kauri tree',
    name: 'Kauri Tree',
    facts: [
      "One of the world's mightiest trees, growing to over 50 meters tall with trunk girths up to 16 meters.",
      'Ancient conifers native to New Zealand, some living for over 2,000 years.',
      'Valued for its high-quality timber and kauri gum (a resin).',
      'Currently threatened by kauri dieback disease.',
    ],
    isFlagged: false,
  },
  {
    id: 'base-7',
    imageSrc: 'https://placehold.co/600x400.png',
    imageAlt: 'Kea Parrot',
    dataAiHint: 'kea parrot',
    name: 'Kea',
    facts: [
      "The world's only alpine parrot, found in the mountainous regions of the South Island.",
      'Known for its intelligence, curiosity, and playful (often destructive) behavior.',
      'Has olive-green plumage with brilliant orange underwings.',
      'An endangered species facing threats from predators and human conflict.',
    ],
    isFlagged: false,
  },
];

export const mockFlashcards: Flashcard[] = [];
const targetCardCount = 50;

for (let i = 0; i < targetCardCount; i++) {
  const baseCardIndex = i % baseFlashcards.length;
  const baseCard = baseFlashcards[baseCardIndex];
  const iteration = Math.floor(i / baseFlashcards.length) + 1;

  mockFlashcards.push({
    ...baseCard,
    id: `${baseCard.id}-${iteration}-${i}`, // Ensure unique ID
    name: iteration > 1 ? `${baseCard.name} #${iteration}` : baseCard.name, // Add a number if it's not the first cycle
    // Facts can remain the same or be slightly altered if needed, for now, keep them same
    facts: [...baseCard.facts], // Create a new array for facts
    isFlagged: false, // Default to not flagged
    // imageSrc and imageAlt can remain the same
  });
}
