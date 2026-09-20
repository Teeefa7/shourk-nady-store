'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CraftsmanshipSection.module.css';

export const CraftsmanshipSection: React.FC = () => {
  const { locale } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.imageBox}>
          <Image
            src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop"
            alt="Handcrafting luxury abayas in Dubai"
            fill
            className={styles.img}
          />
        </div>

        <div className={styles.textContent}>
          <span className={styles.subtitle}>
            {locale === 'ar' ? 'فخامة الصنعة والتصميم' : 'EMIRATI CRAFTSMANSHIP'}
          </span>
          <h2 className={styles.title}>
            {locale === 'ar'
              ? 'حياكة فاخرة تجسد الأناقة الخليجية المعاصرة'
              : 'Precision Tailoring & Timeless Gulf Elegance'}
          </h2>
          <p className={styles.body}>
            {locale === 'ar'
              ? 'تعتمد دار "شروق نادي" على استيراد أجود أنسجة النيدا والحرير والكريب من أفضل المصانع في اليابان وفرنسا. يتم إنجاز التطريز اليدوي وتثبيت كريستال سواروفسكي بيد أمهر حرفيي الخياطة الرفيعة في دبي.'
              : 'At Shourk Nady, we source raw high-density Silk Nida and French organza. Every single bead and gold thread accent is applied by hand in our Dubai atelier to ensure couture perfection.'}
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <h4 className={styles.featureTitle}>
                {locale === 'ar' ? 'حرير النيدا الياباني الأصلي' : 'Original Japanese Nida'}
              </h4>
              <p className={styles.featureDesc}>
                {locale === 'ar'
                  ? 'قماش أسود داكن غير شفاف، خفيف وبارد يناسب مناخ الخليج.'
                  : 'Ultra-deep black opacity with lightweight breathable cooling tech.'}
              </p>
            </div>

            <div className={styles.featureCard}>
              <h4 className={styles.featureTitle}>
                {locale === 'ar' ? 'تطريز سواروفسكي اليدوي' : 'Hand-sewn Swarovski'}
              </h4>
              <p className={styles.featureDesc}>
                {locale === 'ar'
                  ? 'لمسات بريق كريستالية متقنة تعكس الأناقة في الأعياد والمناسبات.'
                  : 'Hand-set crystals and gold metallic zardosi embroidery.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
