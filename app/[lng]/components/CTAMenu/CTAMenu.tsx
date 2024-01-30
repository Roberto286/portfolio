import React from 'react';
import Button from '../Button/Button';
import { TwitterLogo, GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

const socials = [
  {
    name: 'GitHub',
    link: 'https://github.com/Roberto286',
    icon: (
      <GithubLogo
        size="100%"
        weight="fill"
        className=" text-bg-light dark:text-bg-dark"
      />
    ),
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/roberto-saliola-340077224/',
    icon: (
      <LinkedinLogo
        size="100%"
        weight="fill"
        className=" text-bg-light dark:text-bg-dark"
      />
    ),
  },
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
    id={`${name}_button`}
    rounded
    key={name}
    className="w-[30px] h-[30px] bg-text-light-header dark:bg-text-dark-header p-1"
    onClick={() => window.open(link, '_blank')}
  >
    {icon}
  </Button>
));

const SocialsGroup = () => {
  return <div className="flex gap-x-5 ml-10">{socials}</div>;
};

export default SocialsGroup;
