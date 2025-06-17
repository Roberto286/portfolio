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
      skills: skillsData.frontend
    },
    { 
      key: 'backend', 
      skills: skillsData.backend
    },
    { 
      key: 'database', 
      skills: skillsData.database
    },
    { 
      key: 'other', 
      skills: skillsData.other
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
                <div className="mb-6">
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
      </div>
    </section>
  );
};

export default Skills;