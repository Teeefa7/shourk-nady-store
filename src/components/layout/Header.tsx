'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu, onOpenSearch }) => {
  const { locale, toggleLocale, t } = useLanguage();
  const { toggleCart, itemCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <>
      {/* Announcement Bar */}
      <div className={styles.announcementBar}>
        <div className={styles.announcementContent}>
          <span>
            {locale === 'ar'
              ? '✨ شحن مجاني سريع داخل الإمارات للطلبات أكثر من ٥٠٠ درهم • توصيل في نفس اليوم لمدينة دبي'
              : '✨ Free Express UAE Shipping on orders over 500 AED • Same-Day Delivery in Dubai'}
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Left Navigation / Menu Toggle */}
          <div className={styles.leftNav}>
            <button
              className={`${styles.menuButton} hide-desktop`}
              onClick={onOpenMobileMenu}
              aria-label="Open Navigation Menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

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
              <Link href="/collection/ramadan-2026" className={styles.navLink} style={{ color: 'var(--color-champagne-dark)' }}>
                {locale === 'ar' ? 'تشكيلة رمضان' : 'Ramadan 2026'}
              </Link>
            </nav>
          </div>

          {/* Brand Logo */}
          <Link href="/" className={styles.brandLogo}>
            <span className={styles.logoTitle}>
              {locale === 'ar' ? 'شروق نادي' : 'SHOURK NADY'}
            </span>
            <span className={styles.logoSubtitle}>
              {locale === 'ar' ? 'عبايات وكوتور فاخر - الإمارات' : 'LUXURY ABAYAS - UAE'}
            </span>
          </Link>

          {/* Right Navigation Icons */}
          <div className={styles.rightNav}>
            {/* Search Button */}
            <button className={styles.iconButton} onClick={onOpenSearch} aria-label="Search Products">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Language Switcher */}
            <button className={styles.langBtn} onClick={toggleLocale} aria-label="Switch Language">
              {locale === 'ar' ? 'EN' : 'العربية'}
            </button>

            {/* Account Link */}
            <Link href="/account" className={`${styles.iconButton} hide-mobile`} aria-label="Customer Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Wishlist Link */}
            <Link href="/account/wishlist" className={styles.iconButton} aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>

            {/* Cart Button */}
            <button className={styles.iconButton} onClick={toggleCart} aria-label="Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
