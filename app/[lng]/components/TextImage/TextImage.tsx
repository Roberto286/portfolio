'use client';
import { useTranslation } from '@/app/i18n/client';
import React from 'react';
import { Trans } from 'react-i18next';
import Image from 'next/image';

export type TextImageProps = {
  text: string;
  imagePath: string;
  className?: string;
  reversed?: boolean;
  lng: string;
  hardcoded?: boolean;
  roundedImage?: boolean;
  imageAlt: string;
  imageGradient?: boolean;
};

const TextImage: React.FC<TextImageProps> = ({
  text,
  imagePath,
  className = '',
  reversed = false,
  lng,
  hardcoded,
  roundedImage,
  imageAlt,
  imageGradient,
}) => {
  const { t } = useTranslation(lng, 'main');
  return (
    <div className={`text-image flex mt-60 ${className} ${reversed ? 'flex-row-reverse' : ''}`}>
      <div className="text-container w-3/5 flex justify-start items-center text-6xl">
        <Trans t={t}>{text}</Trans>
        {hardcoded && (
          <p className="dark:text-text-dark text-text-light	">
            Ciao 👋,
            <br />
            Mi chiamo <br />
            <span className="fashion-text">Roberto Saliola</span>
            <br />E sono un web developer
          </p>
        )}
      </div>
      <div className={`image-container flex justify-end flex-1`}>
        <div
          className={`relative w-96 h-96 mx-auto ${roundedImage ? 'rounded-full' : ''} ${imageGradient && roundedImage ? 'border-gradient' : ''} `}
        >
          <Image
            fill
            sizes="100%"
            src={imagePath}
            alt={imageAlt}
            className={`object-cover block ${roundedImage ? 'rounded-full' : ''}`}
          />
        </div>
      </div>
    </div>
  );
};

export default TextImage;
