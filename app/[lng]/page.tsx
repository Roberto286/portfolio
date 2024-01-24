// import { useTranslation } from '../i18n';
import { Footer } from './components/Footer/client';

type PageProps = {
  params: {
    lng: string;
  };
};

export default async function Page({ params: { lng } }: PageProps) {
  // const { t } = await useTranslation(lng);
  return (
    <>
      <Footer lng={lng} />
    </>
  );
}
