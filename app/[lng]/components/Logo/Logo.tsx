import Image from 'next/image';
import logoPath from '../../../../public/images/logo.svg';

const Logo = () => (
  <div className="logo-container relative w-24 h-14">
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
