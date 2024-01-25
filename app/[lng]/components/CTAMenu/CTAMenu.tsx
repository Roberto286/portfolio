import React from 'react';
import Button from '../Button/Button';
import { TwitterLogo } from '@phosphor-icons/react';

const socials = [
  //   {
  //     name: 'GitHub',
  //     link: 'https://github.com',
  //     icon: <GithubFilled className="w-full h-full text-text-light dark:text-text-dark text-3xl/[0px] social-icon" />,
  //   },
  //   {
  //     name: 'LinkedIn',
  //     link: 'https://linkedin.com',
  //     icon: <LinkedinFilled className="w-full h-full text-text-light dark:text-text-dark text-3xl/[0px] social-icon" />,
  //   },
  {
    name: 'X',
    link: 'https://x.com',
    icon: (
      <TwitterLogo
        size="100%"
        weight="fill"
        className=" text-bg-light dark:text-bg-dark"
      />
    ),
  },
].map(({ name, link, icon }) => (
  <Button
    rounded
    key={name}
    className="w-[30px] h-[30px] bg-text-light dark:bg-text-dark p-1"
  >
    <a href={link}>{icon}</a>
  </Button>
));

const SocialsGroup = () => {
  return <div>{socials}</div>;
};

export default SocialsGroup;
