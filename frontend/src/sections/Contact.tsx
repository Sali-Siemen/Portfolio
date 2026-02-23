import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Phone } from 'lucide-react';

const contactLinks = [
    {
        Icon: Phone,
        label: 'Phone',
        value: '+91 9550797609',
        href: 'tel:+919550797609',
        gradient: 'from-emerald-500 to-teal-400',
    },
    {
        Icon: Mail,
        label: 'Email',
        value: 'salisiemen891@gmail.com',
        href: 'mailto:salisiemen891@gmail.com',
        gradient: 'from-rose-500 to-pink-400',
    },
    {
        Icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/sali-siemen',
        href: 'https://www.linkedin.com/in/sali-siemen',
        gradient: 'from-blue-600 to-blue-400',
    },
    {
        Icon: Github,
        label: 'GitHub',
        value: 'github.com/Chinnu891',
        href: 'https://github.com/Chinnu891',
        gradient: 'from-gray-700 to-gray-500',
    },
    {
        Icon: MapPin,
        label: 'Location',
        value: 'Bapatla, Andhra Pradesh',
        href: '#',
        gradient: 'from-green-500 to-emerald-400',
    },
];

const Contact: React.FC = () => (
    <section id="contact" className="py-24 px-4 sm:px-6 bg-gray-50/50 dark:bg-dark-800/50">
        <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2 block">Get In Touch</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                    Let's <span className="gradient-text">Connect</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-6" />
                <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
                    I'm actively looking for opportunities in Cloud Engineering, DevOps, and Infrastructure Management.
                    Let's build something great together!
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10">
                {/* Contact links */}
                <div className="space-y-4">
                    {contactLinks.map(({ Icon, label, value, href, gradient }, i) => (
                        <motion.a
                            key={label}
                            href={href}
                            target={href.startsWith('mailto') || href === '#' ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ x: 6 }}
                            className="flex items-center gap-4 p-4 bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-dark-700 hover:border-primary-400/50 dark:hover:border-primary-500/50 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400 dark:text-gray-500 font-medium">{label}</div>
                                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-500 transition-colors">{value}</div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Call to action card */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gradient-to-br from-primary-600 to-primary-500 rounded-3xl p-8 text-white shadow-2xl shadow-primary-500/30 flex flex-col justify-between"
                >
                    <div>
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                            <Send size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">Open to Opportunities</h3>
                        <p className="text-primary-100 leading-relaxed mb-6">
                            I'm looking for roles in <strong>Cloud Engineering</strong>, <strong>DevOps</strong>,
                            and <strong>Infrastructure Management</strong>. Also open to full-stack and backend positions.
                        </p>
                        <ul className="space-y-2 mb-8">
                            {['Cloud Engineering', 'DevOps & Infrastructure', 'Full-Stack Development', 'Cybersecurity Roles'].map((role) => (
                                <li key={role} className="flex items-center gap-2 text-sm text-primary-100">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    {role}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <a
                        href="mailto:salisiemen891@gmail.com"
                        className="w-full py-3.5 bg-white text-primary-600 font-bold rounded-2xl text-center hover:bg-primary-50 transition-colors shadow-lg text-sm"
                    >
                        Send Me an Email →
                    </a>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-16 text-sm text-gray-400 dark:text-gray-600"
            >
                © {new Date().getFullYear()} Sali Siemen — Built with React, Tailwind & ❤️
            </motion.div>
        </div>
    </section>
);

export default Contact;
