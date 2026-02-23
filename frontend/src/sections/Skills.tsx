import { motion } from 'framer-motion';

type SkillCategory = {
    title: string;
    emoji: string;
    color: string;
    skills: string[];
};

const skillCategories: SkillCategory[] = [
    {
        title: 'Cloud & DevOps',
        emoji: '☁️',
        color: 'from-blue-500 to-cyan-400',
        skills: ['Docker', 'Kubernetes', 'Azure', 'AWS', 'Nginx', 'CI/CD', 'Server Deployment', 'Public IP Setup'],
    },
    {
        title: 'Frontend',
        emoji: '🎨',
        color: 'from-pink-500 to-rose-400',
        skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML', 'CSS'],
    },
    {
        title: 'Backend',
        emoji: '⚙️',
        color: 'from-amber-500 to-orange-400',
        skills: ['PHP', 'Node.js', 'Python', 'FastAPI'],
    },
    {
        title: 'Databases',
        emoji: '🗄️',
        color: 'from-green-500 to-emerald-400',
        skills: ['MySQL', 'PostgreSQL', 'Supabase'],
    },
    {
        title: 'Networking',
        emoji: '🌐',
        color: 'from-violet-500 to-purple-400',
        skills: ['TCP/IP', 'DNS', 'Port Forwarding', 'Subnetting', 'OSI Model'],
    },
    {
        title: 'Security',
        emoji: '🛡️',
        color: 'from-red-500 to-rose-500',
        skills: ['Cybersecurity Fundamentals', 'Ethical Hacking', 'Firewall Concepts', 'IDS/IPS', 'Vulnerability Assessment'],
    },
    {
        title: 'Languages',
        emoji: '💻',
        color: 'from-indigo-500 to-primary-400',
        skills: ['Python', 'Java', 'JavaScript', 'TypeScript'],
    },
    {
        title: 'OS & Virtualization',
        emoji: '🖥️',
        color: 'from-slate-500 to-gray-400',
        skills: ['Linux (Ubuntu)', 'Windows', 'Docker (Container)', 'Kubernetes (VM)'],
    },
];

const SkillCard: React.FC<{ category: SkillCategory; index: number }> = ({ category, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="bg-white dark:bg-dark-800 rounded-2xl p-6 border border-gray-100 dark:border-dark-700 shadow-md hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
    >
        {/* Card header */}
        <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-lg shadow-lg`}>
                {category.emoji}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{category.title}</h3>
        </div>
        {/* Skills tags */}
        <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
                <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-primary-500/15 hover:text-primary-500 transition-colors cursor-default"
                >
                    {skill}
                </span>
            ))}
        </div>
    </motion.div>
);

const Skills: React.FC = () => (
    <section id="skills" className="py-24 px-4 sm:px-6 bg-gray-50/50 dark:bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest mb-2 block">What I Know</span>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4">
                    My <span className="gradient-text">Skills</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-400 rounded-full mx-auto mb-6" />
                <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                    From self-hosted cloud infrastructure to full-stack development — here's my technical toolbox.
                </p>
            </motion.div>

            {/* Skills grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {skillCategories.map((cat, i) => (
                    <SkillCard key={cat.title} category={cat} index={i} />
                ))}
            </div>
        </div>
    </section>
);

export default Skills;
