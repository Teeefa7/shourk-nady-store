'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroBanner } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './HeroSlider.module.css';

interface HeroSliderProps {
  banners: HeroBanner[];
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ banners }) => {
  const { locale } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <section className={styles.hero}>
      {banners.map((banner, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={banner.id}
            className={`${styles.slide} ${isActive ? styles.slideActive : ''}`}
          >
            <Image
              src={banner.image}
              alt={locale === 'ar' ? banner.titleAr : banner.title}
              fill
              priority={index === 0}
              className={styles.bgImage}
            />

            <div className={styles.overlayContent}>
              <span className={styles.badge}>
                {locale === 'ar' ? 'تشكيلة أزياء فاخرة حصرية' : 'BESPOKE EMIRATI HIGH COUTURE'}
              </span>
              <h1 className={styles.title}>
                {locale === 'ar' ? banner.titleAr : banner.title}
              </h1>
              <p className={styles.subtitle}>
                {locale === 'ar' ? banner.subtitleAr : banner.subtitle}
              </p>
              <div className={styles.ctaGroup}>
                <Link href={banner.ctaLink} className={styles.primaryCta}>
                  {locale === 'ar' ? banner.ctaTextAr : banner.ctaText}
                </Link>
                {banner.secondaryCtaLink && (
                  <Link href={banner.secondaryCtaLink} className={styles.secondaryCta}>
                    {locale === 'ar' ? banner.secondaryCtaTextAr : banner.secondaryCtaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {banners.length > 1 && (
        <div className={styles.dots}>
          {banners.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};
