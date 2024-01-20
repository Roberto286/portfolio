import { useTranslation } from '../../i18n';

export type selectProps = {
  lng: string;
  name: string;
  children: React.ReactNode;
  id: string;
};

export const Select = async ({ lng, name, children, id }: selectProps) => {
  const { t } = await useTranslation(lng, 'select');
  return (
    <select
      name={t(name)}
      id={id}
    >
      {children}
    </select>
  );
};
