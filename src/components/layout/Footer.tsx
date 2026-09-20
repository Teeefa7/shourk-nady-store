'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { locale } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Info Column */}
          <div className={styles.brandCol}>
            <span className={styles.brandName}>
              {locale === 'ar' ? 'شروق نادي' : 'SHOURK NADY'}
            </span>
            <p className={styles.brandBio}>
              {locale === 'ar'
                ? 'دار أزياء إماراتية فاخرة متخصصة في العبايات الكلاسيكية والقفاطين الحريرية المصممة من أجود أقمشة النيدا اليابانية والكريب الفرنسي.'
                : 'Emirati luxury atelier crafting bespoke Japanese Silk Nida abayas and silk kaftans for the modern woman of the Gulf.'}
            </p>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="WhatsApp Atelier">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>
              {locale === 'ar' ? 'التشكيلا ت' : 'Collections'}
            </h4>
            <ul className={styles.linkList}>
              <li><Link href="/category/classic-abayas" className={styles.footerLink}>{locale === 'ar' ? 'عبايات النيدا الكلاسيكية' : 'Classic Nida Abayas'}</Link></li>
              <li><Link href="/category/embroidered-abayas" className={styles.footerLink}>{locale === 'ar' ? 'عبايات مطرزة بالسواروفسكي' : 'Embroidered & Beaded'}</Link></li>
              <li><Link href="/category/silk-kaftans" className={styles.footerLink}>{locale === 'ar' ? 'قفاطين حريرية' : 'Silk Kaftans'}</Link></li>
              <li><Link href="/category/linen-casual" className={styles.footerLink}>{locale === 'ar' ? 'عبايات الكتان والسفر' : 'Linen & Travel Wear'}</Link></li>
              <li><Link href="/collection/ramadan-2026" className={styles.footerLink}>{locale === 'ar' ? 'مجموعة رمضان الملكية' : 'Ramadan 2026'}</Link></li>
            </ul>
          </div>

          {/* Client Service */}
          <div>
            <h4 className={styles.colTitle}>
              {locale === 'ar' ? 'خدمة العملاء' : 'Client Service'}
            </h4>
            <ul className={styles.linkList}>
              <li><Link href="/order/track" className={styles.footerLink}>{locale === 'ar' ? 'تتبع طلبك' : 'Track Your Order'}</Link></li>
              <li><Link href="/account" className={styles.footerLink}>{locale === 'ar' ? 'حسابي' : 'My Account'}</Link></li>
              <li><Link href="/account/addresses" className={styles.footerLink}>{locale === 'ar' ? 'الشحن داخل الإمارات' : 'UAE Delivery Policy'}</Link></li>
              <li><Link href="/account/wishlist" className={styles.footerLink}>{locale === 'ar' ? 'قائمة الأمنيات' : 'Wishlist'}</Link></li>
              <li><a href="mailto:concierge@shourknady.ae" className={styles.footerLink}>concierge@shourknady.ae</a></li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div>
            <h4 className={styles.colTitle}>
              {locale === 'ar' ? 'النشرة البريدية الفاخرة' : 'Atelier Privilege'}
            </h4>
            <p className={styles.newsletterDesc}>
              {locale === 'ar'
                ? 'اشتركي للحصول على خصم ١٠٪ على طلبك الأول ومعاينة التشكيلات الجديدة قبل الجميع.'
                : 'Subscribe to receive 10% off your first order and exclusive private previews.'}
            </p>
            {subscribed ? (
              <p style={{ color: 'var(--color-champagne)', fontSize: 'var(--text-sm)' }}>
                {locale === 'ar' ? '✓ تم اشتراكك بنجاح في النشرة الفاخرة.' : '✓ Thank you for subscribing to Shourk Nady.'}
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    required
                    placeholder={locale === 'ar' ? 'أدخلي بريدك الإلكتروني' : 'Enter your email address'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.emailInput}
                  />
                  <button type="submit" className={styles.submitBtn}>
                    {locale === 'ar' ? 'اشتراك' : 'Join'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div>
            © {new Date().getFullYear()} {locale === 'ar' ? 'شروق نادي. جميع الحقوق محفوظة.' : 'Shourk Nady Luxury Fashion LLC. All rights reserved.'}
          </div>
          <div className={styles.paymentMethods}>
            <span className={styles.paymentBadge}>VISA</span>
            <span className={styles.paymentBadge}>MASTERCARD</span>
            <span className={styles.paymentBadge}>APPLE PAY</span>
            <span className={styles.paymentBadge}>TABBY</span>
            <span className={styles.paymentBadge}>COD (الدفع عند الاستلام)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
