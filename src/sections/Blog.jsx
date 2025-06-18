import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import { blogData } from '../config/blog.config';

const isBlogVisible = import.meta.env.VITE_BLOG_VISIBLE === 'true';
console.log(isBlogVisible);
const Blog = () => {
  const { t, i18n } = useTranslation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('blog.title')}
          </h2>
        </motion.div>
        {!isBlogVisible && (
          <h3 className=" text-center text-4xl font-bold text-gray-900 dark:text-white mb-4">
            COMING SOON
          </h3>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isBlogVisible &&
            blogData.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative mb-6 rounded-lg overflow-hidden">
                    <img
                      src={article.image}
                      alt={t(article.title)}
                      className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                      {article.readTime} {t('blog.readTime')}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs font-medium rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {t(article.title)}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 leading-relaxed">
                      {t(article.description)}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(article.publishedAt)}
                      </span>
                      <Button variant="ghost" size="sm">
                        {t('blog.readMore')} →
                      </Button>
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

export default Blog;
