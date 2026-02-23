import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
    const roles = [
        'Cloud & DevOps Engineer',
        'Full-Stack Developer',
        'Cybersecurity Enthusiast',
        'Self-Hosted Infrastructure Pro',
    ];
    const roleRef = useRef<HTMLSpanElement>(null);
    const indexRef = useRef(0);
    const charRef = useRef(0);
    const deletingRef = useRef(false);

    // Typewriter effect
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        const tick = () => {
            const current = roles[indexRef.current];
            const el = roleRef.current;
            if (!el) return;

            if (!deletingRef.current) {
                el.textContent = current.slice(0, charRef.current + 1);
                charRef.current++;
                if (charRef.current === current.length) {
                    deletingRef.current = true;
                    timeout = setTimeout(tick, 1800);
                    return;
                }
                timeout = setTimeout(tick, 75);
            } else {
                el.textContent = current.slice(0, charRef.current - 1);
                charRef.current--;
                if (charRef.current === 0) {
                    deletingRef.current = false;
                    indexRef.current = (indexRef.current + 1) % roles.length;
                    timeout = setTimeout(tick, 400);
                    return;
                }
                timeout = setTimeout(tick, 40);
            }
        };
        timeout = setTimeout(tick, 600);
        return () => clearTimeout(timeout);
    }, []);

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-gray-50 via-white to-primary-50/30 dark:from-dark-900 dark:via-dark-800 dark:to-dark-700"
        >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ y: [-20, 20, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-400/10 rounded-full blur-2xl"
                />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(to right, #6366f1 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Main content */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
                >
                    <Sparkles size={14} className="text-primary-400" />
                    <span className="text-sm font-medium text-primary-400">Final Year B.Tech CSE • Cyber Security</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl sm:text-7xl font-black mb-6 leading-tight"
                >
                    <span className="text-gray-900 dark:text-white">Hi, I'm </span>
                    <span className="gradient-text">Sali Siemen</span>
                </motion.h1>

                {/* Animated role */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-2xl sm:text-3xl font-semibold text-gray-600 dark:text-gray-300 mb-6 h-10"
                >
                    <span ref={roleRef} className="text-primary-500 dark:text-primary-400"></span>
                    <span className="animate-pulse text-primary-500">|</span>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Building production-grade systems from scratch — self-hosted cloud infrastructure,
                    full-stack web apps, and securing critical systems.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                >
                    <button
                        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-accent-500 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        View My Projects
                    </button>
                    <button
                        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="px-8 py-4 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-200 font-semibold rounded-2xl border border-gray-200 dark:border-dark-600 hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                    >
                        Get In Touch
                    </button>
                </motion.div>

                {/* Social links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="flex justify-center gap-4 mb-16"
                >
                    {[
                        { Icon: Github, href: 'https://github.com/Chinnu891', label: 'GitHub' },
                        { Icon: Linkedin, href: 'https://www.linkedin.com/in/sali-siemen', label: 'LinkedIn' },
                        { Icon: Mail, href: 'mailto:salisiemen891@gmail.com', label: 'Email' },
                    ].map(({ Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-primary-500/30"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.button
                    onClick={scrollToAbout}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ opacity: { delay: 1.2 }, y: { duration: 2, repeat: Infinity } }}
                    className="text-gray-400 dark:text-gray-500 hover:text-primary-500 transition-colors"
                    aria-label="Scroll down"
                >
                    <ArrowDown size={28} />
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
