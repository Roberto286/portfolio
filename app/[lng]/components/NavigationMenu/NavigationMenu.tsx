import { useTranslation } from '@/app/i18n/client';
import NavLink from '../NavLink/NavLink';

export type NavigationMenuProps = {
  lng: string;
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'header');
  const navLinks = [
    { id: '#about', label: 'Chi sono' },
    { id: '#techStack', label: 'Tecnologie' },
    { id: '#projects', label: 'Progetti' },
    { id: '#contact', label: 'Contatti' },
  ].map(({ id, label }) => (
    <NavLink
      href={id}
      key={label}
    >
      {t(label)}
    </NavLink>
  ));
  return (
    <div
      className="menu hidden md:block md:w-auto flex-1"
      id="navbar"
    >
      <ul className="flex md:flex-row justify-end gap-x-10">{navLinks}</ul>
    </div>
  );
};

export default NavigationMenu;