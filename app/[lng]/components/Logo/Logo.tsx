import Image from 'next/image';

const Logo = () => (
  <div className="logo-container relative w-24 h-14">
    <a href="/">
      <Image
        src="/assets/images/logo.svg"
        alt="Company Logo"
        fill
      />
    </a>
  </div>
);

export default Logo;
