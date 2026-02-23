import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Building2, Star } from 'lucide-react';

const highlights = [
    { icon: GraduationCap, label: 'B.Tech CSE', sub: 'Cyber Security Specialization' },
    { icon: Star, label: 'CGPA 8.54', sub: 'St. Ann\'s College of Engg. & Tech.' },
    { icon: Building2, label: 'Govt. Internship', sub: 'INCOIS — Ocean Data Management' },
    { icon: MapPin, label: 'Bapatla, AP', sub: 'India' },
];

const About: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Intersection observer for fade-in animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting)),
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="py-24 px-4 sm:px-6 bg-white dark:bg-dark-900">
            <div className="max-w-6xl mx-auto">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2 block">Who I Am</span>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left – avatar + decorative */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/30 to-accent-400/30 blur-2xl scale-110" />
                            {/* Avatar card */}
                            <div className="relative w-72 h-72 rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                                <div className="text-center">
                                    <img
                                        src="/favicon.png"
                                        alt="Sali Siemen"
                                        className="w-56 h-56 object-contain drop-shadow-2xl mx-auto"
                                    />
                                    <div className="text-white/70 text-sm mt-3 font-medium tracking-wide">Sali Siemen</div>
                                </div>
                            </div>
                            {/* Floating badges */}
                            <motion.div
                                animate={{ y: [-5, 5, -5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-white dark:bg-dark-700 rounded-2xl px-3 py-2 shadow-xl border border-gray-100 dark:border-dark-600"
                            >
                                <span className="text-xs font-bold text-primary-500">🎓 2026 Graduate</span>
                            </motion.div>
                            <motion.div
                                animate={{ y: [5, -5, 5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-700 rounded-2xl px-3 py-2 shadow-xl border border-gray-100 dark:border-dark-600"
                            >
                                <span className="text-xs font-bold text-accent-500">🛡️ Cyber Security</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right – bio text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Final-Year Engineer Passionate About Cloud & Security
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            I'm <strong className="text-primary-500">Sali Siemen</strong>, a final-year B.Tech CSE (Cyber Security)
                            student at St. Ann's College of Engineering & Technology. I have hands-on experience in
                            cloud-like infrastructure setup, server deployment, and full-stack development.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                            I transformed a personal computer into a <strong className="text-gray-800 dark:text-gray-200">production-level self-hosted server</strong> —
                            complete with public IP exposure, DNS mapping, port forwarding, Docker containers, and Nginx.
                            I've built and deployed full-scale products like <strong className="text-gray-800 dark:text-gray-200">DCode Systems (LMS)</strong> and a
                            Hotel Management System with real payment integrations.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                            My internship at <strong className="text-gray-800 dark:text-gray-200">INCOIS (Government of India)</strong> gave me exposure to
                            real-time data processing for ocean information systems. I'm actively seeking roles in
                            <strong className="text-primary-500"> Cloud Engineering, DevOps, and Infrastructure Management</strong>.
                        </p>

                        {/* Highlights grid */}
                        <div className="grid grid-cols-2 gap-3">
                            {highlights.map(({ icon: Icon, label, sub }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-dark-700/60 border border-gray-100 dark:border-dark-600 hover:border-primary-400/50 transition-colors"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-primary-500/15 flex items-center justify-center flex-shrink-0">
                                        <Icon size={16} className="text-primary-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
