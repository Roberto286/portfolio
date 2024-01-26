// import { useTranslation } from '../i18n';
import { Footer } from './components/Footer/client';
import Header from './components/Header/Header';

type PageProps = {
  params: {
    lng: string;
  };
};

export default async function Page({ params: { lng } }: PageProps) {
  // const { t } = await useTranslation(lng);
  return (
    <>
      {/*//TODO Header -> personalizzare logo dark/light e dato che lo spazio c'è fare un logo con il nome completo*/}
      <Header lng={lng} />
      <main className="flex-grow"></main>
      <Footer lng={lng} />
    </>
  );
}
