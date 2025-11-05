/**
 * Destination data for the Study Abroad Destinations component
 * This can be fetched from an API or kept as static data
 */

export const studyAbroadDestinations = [
  {
    id: 'georgia',
    name: 'Georgia',
    optionsAvailable: 31,
  },
  {
    id: 'tajikistan',
    name: 'Tajikistan',
    optionsAvailable: 6,
  },
  {
    id: 'russia',
    name: 'Russia',
    optionsAvailable: 58,
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    optionsAvailable: 6,
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    optionsAvailable: 5,
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
    optionsAvailable: 13,
  },
];

/**
 * Example with custom icons (if you want to add country flags or custom icons)
 * Uncomment and modify as needed
 */

// import { Globe } from 'lucide-react';
//
// export const studyAbroadDestinationsWithIcons = studyAbroadDestinations.map(dest => ({
//   ...dest,
//   icon: <Globe className="w-16 h-16 text-gray-300" strokeWidth={1} />
// }));
