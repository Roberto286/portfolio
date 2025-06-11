import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Icon from '../components/Icon';

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: 'mail',
      label: t('contact.info.email'),
      value: 'roberto.saliola96@gmail.com',
      href: 'mailto:roberto.saliola96@gmail.com',
    },
    {
      icon: 'github',
      label: 'GitHub',
      value: 'Roberto286',
      href: 'https://github.com/Roberto286',
    },
    {
      icon: 'linkedin',
      label: 'LinkedIn',
      value: 'roberto-saliola',
      href: 'https://www.linkedin.com/in/roberto-saliola-340077224/',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {t('contact.description')}
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t('contact.info.title')}
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                  >
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg mr-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-800 transition-colors">
                      <Icon
                        name={info.icon}
                        size={24}
                        className="text-primary-600 dark:text-primary-400"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {info.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}

                {/* Additional Info */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center mb-4">
                    <Icon
                      name="external"
                      size={20}
                      className="text-primary-600 dark:text-primary-400 mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('contact.info.location')}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Milano, Italia
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Icon
                      name="check"
                      size={20}
                      className="text-green-600 dark:text-green-400 mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {t('contact.info.response')}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {t('contact.info.responseTime')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Nome è obbligatorio' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Il tuo nome"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Email è obbligatoria',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email non valida',
                      },
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="la-tua-email@esempio.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register('message', {
                      required: 'Messaggio è obbligatorio',
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none transition-colors"
                    placeholder="Il tuo messaggio..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('contact.sending')}
                    </div>
                  ) : (
                    t('contact.send')
                  )}
                </Button>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg flex items-center ${
                      submitStatus === 'success'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    <Icon
                      name={submitStatus === 'success' ? 'check' : 'close'}
                      size={20}
                      className="mr-2"
                    />
                    {submitStatus === 'success'
                      ? t('contact.success')
                      : t('contact.error')}
                  </motion.div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
