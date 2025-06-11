import { useEffect } from 'react';
import './i18n';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Initialize theme on app start
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? JSON.parse(savedTheme) : systemPrefersDark;

    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
