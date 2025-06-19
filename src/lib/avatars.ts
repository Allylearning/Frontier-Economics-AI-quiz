import type { AvatarOption } from '@/types';

// selectedBorderColor is for the StartScreen selection ring.
// accentColor and accentForegroundColor are for theming the app.
export const avatarOptions: AvatarOption[] = [
  { 
    id: 'avatar1', 
    url: '/images/Avatar 1.svg', 
    alt: 'Avatar 1', 
    selectedBorderColor: '#fd663b', // Orange
    accentColor: '16 98% 61%', // HSL for #fd663b
    accentForegroundColor: '0 0% 98%'  // White-ish
  },
  { 
    id: 'avatar2', 
    url: '/images/Avatar 2.svg', 
    alt: 'Avatar 2', 
    selectedBorderColor: '#2ac369', // Green
    accentColor: '145 63% 49%', // HSL for #2ac369
    accentForegroundColor: '0 0% 98%' // White-ish
  },
  { 
    id: 'avatar3', 
    url: '/images/Avatar 3.svg', 
    alt: 'Avatar 3', 
    selectedBorderColor: '#7ac3ff', // Blue
    accentColor: '207 100% 74%', // HSL for #7ac3ff
    accentForegroundColor: '0 0% 4%'   // Black-ish
  },
  { 
    id: 'avatar4', 
    url: '/images/Avatar 4.svg', 
    alt: 'Avatar 4', 
    selectedBorderColor: '#faa4dd', // Pink
    accentColor: '321 89% 82%', // HSL for #faa4dd
    accentForegroundColor: '0 0% 4%'   // Black-ish
  },
  { 
    id: 'avatar5', 
    url: '/images/Avatar 5.svg', 
    alt: 'Avatar 5', 
    selectedBorderColor: '#f0ad05', // Yellow
    accentColor: '42 96% 48%', // HSL for #f0ad05
    accentForegroundColor: '0 0% 4%'   // Black-ish
  },
];
