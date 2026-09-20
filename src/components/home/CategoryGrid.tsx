'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CategoryGrid.module.css';

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  const { locale } = useLanguage();

  return (
    <section className={`section container`}>
      <div className={styles.header}>
        <span className={styles.subtitle}>
          {locale === 'ar' ? 'عالم الشروق والنادي' : 'DISCOVER OUR ATELIER'}
        </span>
        <h2 className={styles.title}>
          {locale === 'ar' ? 'التصنيفات والتشكيلات الفاخرة' : 'Bespoke Categories'}
        </h2>
      </div>

      <div className={styles.grid}>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className={styles.categoryCard}
          >
            <Image
              src={cat.image || ''}
              alt={locale === 'ar' ? cat.nameAr : cat.name}
              fill
              className={styles.cardImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h3 className={styles.catName}>
                {locale === 'ar' ? cat.nameAr : cat.name}
              </h3>
              <p className={styles.catDesc}>
                {locale === 'ar' ? cat.descriptionAr : cat.description}
              </p>
              <span className={styles.exploreBtn}>
                {locale === 'ar' ? 'تصفحي التشكيلة' : 'Explore Category'}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
