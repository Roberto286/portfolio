import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Icon from './Icon';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Roberto286', icon: 'github' },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/roberto-saliola-340077224/',
      icon: 'linkedin',
    },
    { name: 'Email', url: 'mailto:roberto.saliola96@gmail.com', icon: 'mail' },
  ];

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-12 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-4"
            >
              Roberto.dev
            </motion.h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Full Stack Web Developer specializzato in soluzioni innovative e
              scalabili.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg font-semibold mb-4"
            >
              Link Rapidi
            </motion.h4>
            <ul className="space-y-2">
              {['about', 'experience', 'projects', 'skills', 'contact'].map(
                (section, index) => (
                  <motion.li
                    key={section}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() =>
                        document
                          .querySelector(`#${section}`)
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors capitalize"
                    >
                      {t(`nav.${section}`)}
                    </button>
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg font-semibold mb-4"
            >
              Seguimi
            </motion.h4>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
                  aria-label={link.name}
                >
                  <Icon name={link.icon} size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            © {currentYear} Roberto Saliola. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;