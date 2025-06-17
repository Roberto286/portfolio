import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Icon from '../components/Icon';
import ParticleBackground from '../components/ParticleBackground';

const Hero = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Roberto286', icon: 'github' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/roberto-saliola-340077224/',
      icon: 'linkedin',
    },
    { name: 'Email', url: 'mailto:roberto.saliola96@gmail.com', icon: 'mail' },
  ];

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-16 relative overflow-hidden"
    >
      {/* Particle Background */}
      <ParticleBackground />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 2 }}>
        {/* Slow moving green dot */}
        <motion.div
          animate={{
            x: ['-10%', '110%'],
            y: ['20%', '80%', '20%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute w-32 h-32 bg-primary-400 dark:bg-primary-600 rounded-full mix-blend-multiply filter blur-xl opacity-30"
        />
        
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200 dark:bg-accent-900 rounded-full mix-blend-multiply filter blur-2xl opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4"
          >
            {t('hero.greeting')}
          </motion.p>

          {/* Name with enhanced animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            {t('hero.name')}
          </motion.h1>

          {/* Role with typewriter effect */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
          >
            {t('hero.role')}
          </motion.h2>

          {/* Description with stagger animation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Expertise Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mb-8 max-w-2xl mx-auto"
          >
            {[
              { text: t('hero.skills.frontend'), icon: '⚛️' },
              { text: t('hero.skills.backend'), icon: '🔧' },
              { text: t('hero.skills.fullstack'), icon: '🚀' },
              { text: t('hero.skills.modern'), icon: '💡' },
            ].map((skill, index) => (
              <motion.div
                key={skill.text}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center space-x-2"
              >
                <span className="text-lg">{skill.icon}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {skill.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA and Social Links with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group shadow-lg relative overflow-hidden"
              >
                <motion.span
                  className="relative z-10 flex items-center"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {t('hero.cta')}
                  <Icon
                    name="arrow"
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </motion.span>
              </Button>
            </motion.div>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-gray-200 dark:border-gray-700 relative overflow-hidden group"
                  aria-label={link.name}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-10 transition-opacity"
                    layoutId={`social-bg-${link.name}`}
                  />
                  <Icon name={link.icon} size={24} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="relative mb-8"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-primary-600 dark:border-primary-400 rounded-full mx-auto relative"
            >
              <motion.div
                animate={{ y: [2, 12, 2], opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mx-auto mt-2"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-sm text-gray-500 dark:text-gray-400 mt-2"
            >
              {t('hero.scrollIndicator')}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;