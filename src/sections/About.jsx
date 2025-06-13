import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-primary-600 dark:text-primary-400 font-medium">
            {t('about.intro')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square bg-gradient-to-br from-primary-400 to-secondary-500 rounded-2xl shadow-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Roberto Saliola"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-400 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary-300 rounded-full opacity-30"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Main Description */}
            <Card className="text-left">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.description')}
              </p>
            </Card>

            {/* Journey Section */}
            <Card className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
                  🚀
                </span>
                {t('about.journey.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.journey.content')}
              </p>
            </Card>

            {/* Passion Section */}
            <Card className="text-left">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center mr-3">
                  💡
                </span>
                {t('about.passion.title')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.passion.content')}
              </p>
            </Card>

            {/* Languages */}
            <Card className="text-left">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🌍</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {t('about.languages')}
                </span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;