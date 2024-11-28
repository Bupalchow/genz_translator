import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiRefreshCw, FiRepeat, FiBook } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { translateText, getRandomExample } from '../utils/translator';
import { DictionaryModal } from './DictionaryModal';

export const TranslationForm: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenZToEnglish, setIsGenZToEnglish] = useState(true);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  const handleTranslate = () => {
    if (!input.trim()) {
      toast.error('Please enter some text to translate!');
      return;
    }
    const translated = translateText(input, isGenZToEnglish);
    setOutput(translated);
    toast.success('Translation complete!');
  };

  const handleCopy = async () => {
    if (!output) {
      toast.error('Nothing to copy!');
      return;
    }
    await navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard!');
  };

  const handleRandomExample = () => {
    const example = getRandomExample(isGenZToEnglish);
    setInput(example);
  };

  const toggleDirection = () => {
    setIsGenZToEnglish(!isGenZToEnglish);
    setInput(output);
    setOutput('');
  };

  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-medium">
          {isGenZToEnglish ? 'Gen Z → English' : 'English → Gen Z'}
        </span>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDictionaryOpen(true)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Open dictionary"
          >
            <FiBook className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDirection}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Switch translation direction"
          >
            <FiRepeat className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isGenZToEnglish ? "Enter Gen Z text..." : "Enter standard English text..."}
          className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRandomExample}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          <FiRefreshCw /> Random Example
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTranslate}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600"
        >
          Translate
        </motion.button>
      </div>

      {output && (
        <div className="relative">
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Copy to clipboard"
          >
            <FiCopy className="w-5 h-5" />
          </motion.button>
        </div>
      )}

      <DictionaryModal isOpen={isDictionaryOpen} onClose={() => setIsDictionaryOpen(false)} />
    </div>
  );
};