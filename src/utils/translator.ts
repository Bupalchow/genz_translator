import { genZToEnglish, englishToGenZ } from './dictionary';
import { genZExamples, englishExamples } from './examples';

const processText = (text: string, dictionary: Record<string, string>): string => {
  let translatedText = text.toLowerCase();
  
  // Sort keys by length (longest first) to handle multi-word phrases properly
  const sortedKeys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  
  for (const key of sortedKeys) {
    const regex = new RegExp(`\\b${key}\\b`, 'gi');
    translatedText = translatedText.replace(regex, dictionary[key]);
  }
  
  return translatedText;
};

export const translateText = (text: string, isGenZToEnglish: boolean): string => {
  const dictionary = isGenZToEnglish ? genZToEnglish : englishToGenZ;
  return processText(text, dictionary);
};

export const getRandomExample = (isGenZToEnglish: boolean): string => {
  const examples = isGenZToEnglish ? genZExamples : englishExamples;
  return examples[Math.floor(Math.random() * examples.length)];
};