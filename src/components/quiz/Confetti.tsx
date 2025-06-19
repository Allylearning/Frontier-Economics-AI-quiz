
'use client';

import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';

interface ConfettiProps {
  active: boolean;
  isSuccess: boolean;
  dynamicThemeColorHslString?: string; // HSL string like "16 98% 61%"
}

const Confetti: React.FC<ConfettiProps> = ({ active, isSuccess, dynamicThemeColorHslString }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    if (typeof window !== 'undefined') {
      updateDimensions(); 
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  if (!active) {
    return null;
  }

  // Default colors (fallbacks if dynamic theme is not set)
  const defaultPrimaryColor = 'hsl(195, 39%, 37%)'; // Initial --primary (blue)
  const defaultSecondaryColorForConfetti = 'hsl(0, 0%, 98%)'; // A light contrasting color like white/light gray
  const destructiveColor = 'hsl(0, 72%, 51%)'; // --destructive (red)
  const darkGrayColorForFailure = 'hsl(0, 0%, 40%)'; // A medium-dark gray

  let themeConfettiColor = defaultPrimaryColor;
  let secondaryConfettiColor = defaultSecondaryColorForConfetti;

  if (dynamicThemeColorHslString) {
    themeConfettiColor = `hsl(${dynamicThemeColorHslString})`;
    // Secondary color remains light for contrast with the dynamic theme color
  }
  
  const successColors = [themeConfettiColor, secondaryConfettiColor];
  const failureColors = [destructiveColor, darkGrayColorForFailure]; // Red and Dark Gray for failure

  const colorsToUse = isSuccess ? successColors : failureColors;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={active ? 200 : 0} 
      recycle={false} 
      colors={colorsToUse}
      gravity={0.1} 
      initialVelocityY={{min: 10, max: 25}} 
      tweenDuration={4000} 
    />
  );
};

export default Confetti;
