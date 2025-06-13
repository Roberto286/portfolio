import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { experienceData } from '../config/experience.config';

const Experience = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-primary-200 dark:bg-primary-700"></div>

          <div className="space-y-12">
            {experienceData.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-gray-800 z-10"></div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'} md:w-1/2`}
                >
                  <Card className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t(experience.position)}
                      </h3>
                    </div>

                    <div className="mb-4">
                      <p className="text-lg font-medium text-secondary-600 dark:text-secondary-400">
                        {experience.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t(experience.location)}
                      </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {t(experience.description)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-accent-100 dark:bg-accent-900 text-accent-800 dark:text-accent-200 text-sm font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
