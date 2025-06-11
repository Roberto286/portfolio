import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import Icon from '../components/Icon';

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

  const skills = [
    { key: 'frontend', icon: '⚛️' },
    { key: 'backend', icon: '🔧' },
    { key: 'fullstack', icon: '🚀' },
    { key: 'modern', icon: '💡' },
  ];

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 dark:bg-secondary-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4"
          >
            {t('hero.greeting')}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent mb-6 leading-tight"
          >
            {t('hero.name')}
          </motion.h1>

          {/* Role */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-6"
          >
            {t('hero.role')}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* Skills Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-2xl mx-auto"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.key}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t(`hero.skills.${skill.key}`)}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA and Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="group shadow-lg"
            >
              {t('hero.cta')}
              <Icon
                name="arrow"
                size={20}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>

            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border border-gray-200 dark:border-gray-700"
                  aria-label={link.name}
                >
                  <Icon name={link.icon} size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="animate-bounce-subtle"
          >
            <div className="w-6 h-10 border-2 border-primary-600 dark:border-primary-400 rounded-full mx-auto relative">
              <div className="w-1 h-3 bg-primary-600 dark:bg-primary-400 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Scroll to explore
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
