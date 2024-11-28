export type TranslationIntensity = 'mild' | 'moderate' | 'extreme';

export interface Translation {
  input: string;
  output: string;
  intensity: TranslationIntensity;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface Dictionary {
  [key: string]: string;
}