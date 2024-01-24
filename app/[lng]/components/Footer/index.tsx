import { useTranslation } from '../../../i18n';
import { FooterBase } from './FooterBase';

export type FooterProps = {
  lng: string;
};

export const Footer: React.FC<FooterProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng, 'footer');
  return (
    <FooterBase
      t={t}
      lng={lng}
    />
  );
};
