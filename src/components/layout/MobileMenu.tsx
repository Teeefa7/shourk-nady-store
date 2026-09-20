'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './MobileMenu.module.css';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { locale, toggleLocale } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.drawer}>
        <div className={styles.header}>
          <span className={styles.brand}>
            {locale === 'ar' ? 'شروق نادي' : 'SHOURK NADY'}
          </span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.nav}>
          <Link href="/products" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'جميع التشكيلا ت' : 'All Collections'}
          </Link>
          <Link href="/category/classic-abayas" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'عبايات النيدا الكلاسيكية' : 'Classic Black Abayas'}
          </Link>
          <Link href="/category/embroidered-abayas" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'عبايات مطرزة بالسواروفسكي' : 'Embroidered & Beaded'}
          </Link>
          <Link href="/category/silk-kaftans" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'قفاطين حريرية' : 'Silk Kaftans'}
          </Link>
          <Link href="/category/linen-casual" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'عبايات الكتان والسفر' : 'Linen & Travel Wear'}
          </Link>
          <Link href="/category/evening-abayas" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'عبايات السهرة والسهرات' : 'Evening & Couture'}
          </Link>
          <Link href="/category/hijabs-accessories" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'طرح وإكسسوارات' : 'Hijabs & Accessories'}
          </Link>
          <Link href="/collection/ramadan-2026" className={styles.navItem} onClick={onClose} style={{ color: 'var(--color-champagne-dark)' }}>
            {locale === 'ar' ? 'تشكيلة رمضان ٢٠٢٦' : 'Ramadan 2026 Edition'}
          </Link>
          <Link href="/account" className={styles.navItem} onClick={onClose}>
            {locale === 'ar' ? 'حسابي والطلبات' : 'My Account & Orders'}
          </Link>
        </nav>

        <div className={styles.footer}>
          <button
            onClick={toggleLocale}
            style={{
              padding: '10px',
              border: '1px solid var(--color-beige)',
              borderRadius: 'var(--radius-sm)',
              width: '100%',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            {locale === 'ar' ? 'English (USD/AED)' : 'العربية (الإمارات)'}
          </button>
          <div className={styles.contactLink}>
            📍 Dubai, United Arab Emirates • Concierge: +971 4 800 SANA
          </div>
        </div>
      </div>
    </>
  );
};
