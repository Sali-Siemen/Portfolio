import { motion } from 'framer-motion';
import { ExternalLink, Github, Server, CreditCard, Shield } from 'lucide-react';

type Project = {
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    tech: string[];
    icon: React.ReactNode;
    gradient: string;
    accent: string;
    link: string;
};

const projects: Project[] = [
    {
        title: 'DCode Systems',
        subtitle: 'Self-Hosted Cloud-Based LMS',
        description:
            "A production-grade Learning Management System deployed on a self-hosted server. Transformed a personal PC into a cloud-like environment with Docker, Kubernetes, public static IP, DNS mapping, and port forwarding. Features a built-in code editor and video streaming.",
        features: [
            'Video streaming with HLS.js',
            'Monaco code editor + Judge0 API execution',
            'Docker + Kubernetes deployment',
            'Port forwarding & DNS mapping',
        ],
        tech: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Docker', 'Kubernetes', 'Node.js'],
        icon: <Server size={28} />,
        gradient: 'from-primary-600 to-primary-400',
        accent: 'primary',
        link: '#',
    },
    {
        title: 'Hotel Management System',
        subtitle: 'Full-Stack Hotel Automation',
        description:
            'End-to-end hotel automation platform with complete booking workflows, real-time updates via WebSockets, and integrated Razorpay payment gateway. Includes an admin dashboard with analytics powered by Chart.js and Tally accounting integration.',
        features: [
            'Room booking with Razorpay payments',
            'Admin dashboard + Chart.js analytics',
            'JWT authentication & WebSockets',
            'Tally accounting integration',
        ],
        tech: ['React', 'PHP', 'MySQL', 'Razorpay', 'Chart.js', 'JWT', 'WebSockets'],
        icon: <CreditCard size={28} />,
        gradient: 'from-emerald-600 to-teal-400',
        accent: 'emerald',
        link: '#',
    },
    {
        title: 'Cyber-Physical Security',
        subtitle: 'Industry 4.0 IDS — Final Year Project',
        description:
            'A CNN-LSTM hybrid deep learning model for intrusion detection in cyber-physical systems (CPS), targeting Industry 4.0 environments. Detects anomalies and classifies network intrusions in real-time using Python Flask as the API layer.',
        features: [
            'CNN-LSTM hybrid intrusion detection',
            'Real-time anomaly detection',
            'Industry 4.0 CPS security',
            'Python Flask API layer',
        ],
        tech: ['Python', 'Flask', 'CNN', 'LSTM', 'Deep Learning', 'TensorFlow'],
        icon: <Shield size={28} />,
        gradient: 'from-rose-600 to-pink-400',
        accent: 'rose',
        link: '#',
    },
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-md hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-400 overflow-hidden"
    >
        {/* Top gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

        <div className="p-7">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg`}>
                        {project.icon}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{project.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{project.subtitle}</p>
                    </div>
                </div>
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-dark-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                    aria-label={`Visit ${project.title}`}
                >
                    <ExternalLink size={15} />
                </a>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">{project.description}</p>

            {/* Features */}
            <ul className="mb-5 space-y-1.5">
                {project.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                    <span
                        key={t}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-dark-600"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Projects: React.FC = () => (
    <section id="projects" className="py-24 px-4 sm:px-6 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2 block">What I've Built</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-6" />
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    Real-world systems built from scratch — from self-hosted cloud to payment-integrated apps.
                </p>
            </motion.div>

            {/* Project cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </div>

            {/* GitHub CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex justify-center mt-12"
            >
                <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-gray-200 dark:border-dark-700 hover:border-primary-400 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium transition-all text-sm"
                >
                    <Github size={18} />
                    View All on GitHub
                </a>
            </motion.div>
        </div>
    </section>
);

export default Projects;
