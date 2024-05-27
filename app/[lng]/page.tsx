import Hero from './components/Hero/Hero';

type PageProps = {
  params: {
    lng: string;
  };
};

export default async function Page({ params: { lng } }: PageProps) {
  return (
    <>
      {/*//TODO Header -> personalizzare logo dark/light e dato che lo spazio c'è fare un logo con il nome completo*/}
      <Hero
        imagePath={'/assets/images/foto1.jpeg'}
        className="mt-20 lg:mt-60"
        lng={lng}
        text={''}
        hardcoded
        imageAlt={''}
        roundedImage
        imageGradient
      ></Hero>
    </>
  );
}
