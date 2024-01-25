import Image from 'next/image';
import logoPath from '../../../../public/logo.svg';

const Logo = () => (
  <div className="logo-container relative w-28 h-16">
    <a href="/">
      <Image
        src={logoPath}
        alt="Company Logo"
        fill
      />
    </a>
  </div>
);

export default Logo;
