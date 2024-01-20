import Link from 'next/link';
import { useTranslation } from '../i18n';

type PageProps = {
  params: {
    lng: string;
  };
};

export default async function Page({ params: { lng } }: PageProps) {
  const { t } = await useTranslation(lng);
  return (
    <>
      <h1>{t('prova')}</h1>
      <Link href={`/${lng === 'en' ? 'it' : 'en'}`}>{t('Cambia lingua')}</Link>
    </>
  );
}
