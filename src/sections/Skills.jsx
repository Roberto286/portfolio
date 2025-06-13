import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import { skillsData } from '../config/skills.config';

const SkillLevel = ({ level }) => {
  const getStars = (level) => {
    if (level >= 90) return { filled: 5, label: 'Expert' };
    if (level >= 80) return { filled: 4, label: 'Advanced' };
    if (level >= 70) return { filled: 3, label: 'Intermediate' };
    if (level >= 60) return { filled: 2, label: 'Basic' };
    return { filled: 1, label: 'Beginner' };
  };

  const { filled, label } = getStars(level);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className={`w-3 h-3 rounded-full ${
              i < filled
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                : 'bg-gray-200 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        {label}
      </span>
    </div>
  );
};

const SkillItem = ({ skill, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 group"
    >
      <div className="flex items-center space-x-3">
        <div className="w-2 h-2 bg-primary-500 rounded-full group-hover:scale-125 transition-transform" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {skill.name}
        </span>
      </div>
      <SkillLevel level={skill.level} />
    </motion.div>
  );
};

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    { 
      key: 'frontend', 
      skills: skillsData.frontend, 
      icon: '⚛️',
      gradient: 'from-blue-500 to-purple-500'
    },
    { 
      key: 'backend', 
      skills: skillsData.backend, 
      icon: '🔧',
      gradient: 'from-green-500 to-teal-500'
    },
    { 
      key: 'database', 
      skills: skillsData.database, 
      icon: '🗄️',
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      key: 'other', 
      skills: skillsData.other, 
      icon: '🛠️',
      gradient: 'from-purple-500 to-pink-500'
    },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            >
              <Card className="h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t(`skills.${category.key}`)}
                  </h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillItem
                      key={skill.name}
                      skill={skill}
                      index={skillIndex}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Skills Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="inline-block">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('skills.legend.title')}
            </h4>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {[
                { stars: 5, label: t('skills.legend.expert'), level: '90-100%' },
                { stars: 4, label: t('skills.legend.advanced'), level: '80-89%' },
                { stars: 3, label: t('skills.legend.intermediate'), level: '70-79%' },
                { stars: 2, label: t('skills.legend.basic'), level: '60-69%' },
                { stars: 1, label: t('skills.legend.beginner'), level: '< 60%' },
              ].map((item) => (
                <div key={item.stars} className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < item.stars
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;