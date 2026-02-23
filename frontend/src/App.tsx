import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ChatWidget from './components/ChatWidget';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300">
        {/* Sticky navigation */}
        <Navbar />

        {/* Main content */}
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Floating AI chat widget */}
        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}

export default App;
