'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const { locale, toggleLocale, t } = useLanguage();
  const { toggleCart, itemCount } = useCart();

  const isAr = locale === 'ar';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>

        {/* LEFT: Hamburger (mobile) + Search (mobile) + Nav (desktop) */}
        <div className={styles.leftNav}>
          {/* Hamburger — mobile only */}
          <button
            className={`${styles.iconButton} hide-desktop`}
            onClick={onOpenMobileMenu}
            aria-label="Open menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Search — mobile only (next to hamburger) */}
          <button
            className={`${styles.iconButton} hide-desktop`}
            onClick={onOpenSearch}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Desktop nav links */}
          <nav className={`${styles.navLinks} hide-mobile hide-tablet`}>
            <Link href="/products" className={styles.navLink}>
              {t('nav.collections', 'Collections')}
            </Link>
            <Link href="/category/classic-abayas" className={styles.navLink}>
              {t('nav.abayas', 'Abayas')}
            </Link>
            <Link href="/category/silk-kaftans" className={styles.navLink}>
              {t('nav.kaftans', 'Kaftans')}
            </Link>
            <Link href="/category/evening-abayas" className={styles.navLink}>
              {t('nav.eveningWear', 'Evening Wear')}
            </Link>
            <Link href="/collection/ramadan-2026" className={styles.navLinkSale}>
              {isAr ? 'تشكيلة رمضان' : 'Ramadan 2026'}
            </Link>
          </nav>
        </div>

        {/* CENTER: Stacked Logo (Big Logo + Small Title) */}
        <Link href="/" className={styles.brandLogo}>
          <div className={styles.emblemWrapper}>
            <Image
              src="/images/shrouke-logo.jpg"
              alt="SHROUKÉ Calligraphy Emblem"
              width={90}
              height={115}
              className={styles.logoEmblem}
              priority
            />
          </div>
          <span className={styles.logoTitle}>SHROUKÉ</span>
        </Link>

        {/* RIGHT: Search (desktop) + Lang + Account + Cart */}
        <div className={styles.rightNav}>
          {/* Search — desktop only */}
          <button
            className={`${styles.iconButton} hide-mobile hide-tablet`}
            onClick={onOpenSearch}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Language toggle — desktop only */}
          <button
            className={`${styles.langBtn} hide-mobile hide-tablet`}
            onClick={toggleLocale}
            aria-label="Switch language"
          >
            {isAr ? 'EN' : 'عربي'}
          </button>

          {/* Account */}
          <Link href="/account" className={styles.iconButton} aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>

          {/* Cart */}
          <button className={styles.iconButton} onClick={toggleCart} aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
          </button>
        </div>

      </div>
    </header>
  );
};

