import { Dictionary } from '../../types';
import { commonPhrases } from './common';
import { extendedPhrases } from './extended';
import { englishOverrides } from './overrides';

// Dictionary for the modal view (common phrases only)
export const genZDictionary: Dictionary = commonPhrases;

// Complete Gen Z to English dictionary
export const genZToEnglish: Dictionary = {
  ...commonPhrases,
  ...extendedPhrases,
};

// Create reverse dictionary for English to Gen Z
export const englishToGenZ: Dictionary = {
  ...Object.entries(genZToEnglish).reduce((acc, [genZ, english]) => {
    acc[english] = genZ;
    return acc;
  }, {} as Dictionary),
  ...englishOverrides,
};