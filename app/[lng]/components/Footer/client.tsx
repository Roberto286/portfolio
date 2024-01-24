'use client';

import { FooterBase } from './FooterBase';
import { useTranslation } from '../../../i18n/client';

export type FooterProps = {
  lng: string;
};

export const Footer: React.FC<FooterProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer');
  return (
    <FooterBase
      t={t}
      lng={lng}
    />
  );
};
