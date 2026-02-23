import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('#hero');

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMenuOpen(false);
        setActiveLink(href);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* ── Glass bar ──────────────────────────────────────────── */}
            <div
                style={{
                    /* Glassmorphism — works on all modern browsers */
                    background: theme === 'dark'
                        ? 'rgba(10, 10, 20, 0.55)'
                        : 'rgba(255, 255, 255, 0.60)',
                    backdropFilter: 'blur(18px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(18px) saturate(180%)',
                    /* Fallback for browsers without backdrop-filter */
                    backgroundColor: theme === 'dark'
                        ? 'rgba(10, 10, 20, 0.90)'
                        : 'rgba(255, 255, 255, 0.92)',
                    borderBottom: theme === 'dark'
                        ? '1px solid rgba(255,255,255,0.07)'
                        : '1px solid rgba(0,0,0,0.07)',
                    boxShadow: scrolled
                        ? theme === 'dark'
                            ? '0 8px 32px rgba(0,0,0,0.45)'
                            : '0 8px 32px rgba(0,0,0,0.10)'
                        : 'none',
                    transition: 'box-shadow 0.3s ease, background 0.3s ease',
                }}
            >
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* ── Logo ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2.5 cursor-pointer select-none"
                            onClick={() => handleNavClick('#hero')}
                        >
                            <div className="relative">
                                <img
                                    src="/favicon.png"
                                    alt="Logo"
                                    className="w-9 h-9 rounded-xl object-contain shadow-md"
                                />
                                {/* glow ring */}
                                <div className="absolute inset-0 rounded-xl ring-2 ring-primary-500/30" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-bold text-base gradient-text tracking-tight">
                                    Sali Siemen
                                </span>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide hidden sm:block">
                                    Cloud · DevOps · AI
                                </span>
                            </div>
                        </motion.div>

                        {/* ── Desktop links ── */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.07 }}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${activeLink === link.href
                                            ? 'text-primary-500 dark:text-primary-400'
                                            : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                                        }`}
                                >
                                    {/* Active pill */}
                                    {activeLink === link.href && (
                                        <motion.span
                                            layoutId="active-pill"
                                            className="absolute inset-0 rounded-xl bg-primary-500/10 dark:bg-primary-400/10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* ── Right icons ── */}
                        <div className="flex items-center gap-2">
                            {/* Theme toggle */}
                            <motion.button
                                whileTap={{ scale: 0.88 }}
                                onClick={toggleTheme}
                                id="theme-toggle"
                                aria-label="Toggle dark mode"
                                style={{
                                    background: theme === 'dark'
                                        ? 'rgba(255,255,255,0.08)'
                                        : 'rgba(0,0,0,0.05)',
                                    border: theme === 'dark'
                                        ? '1px solid rgba(255,255,255,0.12)'
                                        : '1px solid rgba(0,0,0,0.08)',
                                }}
                                className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-all"
                            >
                                <motion.div
                                    key={theme}
                                    initial={{ rotate: -30, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                                </motion.div>
                            </motion.button>

                            {/* Mobile hamburger */}
                            <motion.button
                                whileTap={{ scale: 0.88 }}
                                className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 transition-all"
                                style={{
                                    background: menuOpen
                                        ? 'rgba(99,102,241,0.15)'
                                        : theme === 'dark'
                                            ? 'rgba(255,255,255,0.08)'
                                            : 'rgba(0,0,0,0.05)',
                                    border: theme === 'dark'
                                        ? '1px solid rgba(255,255,255,0.12)'
                                        : '1px solid rgba(0,0,0,0.08)',
                                }}
                                onClick={() => setMenuOpen(o => !o)}
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={menuOpen ? 'x' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {menuOpen ? <X size={18} /> : <Menu size={18} />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* ── Mobile menu (glass) ── */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -12, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -12, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="md:hidden mx-3 mt-1 rounded-2xl overflow-hidden"
                        style={{
                            background: theme === 'dark'
                                ? 'rgba(10, 10, 20, 0.75)'
                                : 'rgba(255, 255, 255, 0.80)',
                            backdropFilter: 'blur(20px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                            border: theme === 'dark'
                                ? '1px solid rgba(255,255,255,0.10)'
                                : '1px solid rgba(0,0,0,0.08)',
                            boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
                        }}
                    >
                        <div className="p-2">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`w-full text-left px-4 py-3.5 text-sm font-medium rounded-xl transition-all flex items-center gap-3 ${activeLink === link.href
                                            ? 'text-primary-500 dark:text-primary-400 bg-primary-500/10'
                                            : 'text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:bg-primary-500/8 dark:hover:bg-primary-500/10'
                                        }`}
                                >
                                    {/* Active dot indicator */}
                                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${activeLink === link.href
                                            ? 'bg-primary-500'
                                            : 'bg-gray-300 dark:bg-gray-600'
                                        }`} />
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
