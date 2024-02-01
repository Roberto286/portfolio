import React from 'react';
import { AboutProps } from './About.props';
import { useTranslation } from '@/app/i18n/client';

const About: React.FC<AboutProps> = ({ lng }) => {
  const { t } = useTranslation(lng);
  return (
    <div id="about">
      <h2>{t('Chi sono')}</h2>
      <p></p>
    </div>
  );
};

export default About;
