import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { projectsData } from '../config/projects.config';

const Projects = () => {
  const { t, i18n } = useTranslation();

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('projects.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <div className="relative mb-6 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 leading-relaxed">
                    {project.description[i18n.language] ||
                      project.description.en}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className="flex-1"
                      >
                        <Icon name="github" size={16} className="mr-2" />
                        {t('projects.viewGithub')}
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                        className="flex-1"
                      >
                        <Icon name="external" size={16} className="mr-2" />
                        {t('projects.viewLive')}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
