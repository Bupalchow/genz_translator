
import { Toaster } from 'react-hot-toast';
import { ThemeToggle } from './components/ThemeToggle';
import { TranslationForm } from './components/TranslationForm';
import { useThemeStore } from './store/themeStore';

function App() {
  const { isDarkMode } = useThemeStore();

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Gen Z Translator
          </h1>
          <ThemeToggle />
        </header>

        <main className="flex flex-col items-center">
          <TranslationForm />
        </main>

        <Toaster position="bottom-center" />
      </div>
    </div>
  );
}

export default App;