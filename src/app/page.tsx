'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import {
  INITIAL_HERO_BANNERS,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
} from '@/data/products';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function Home() {
  const { locale } = useLanguage();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const newArrivals = INITIAL_PRODUCTS.filter((p) => p.isNewArrival);
  const bestSellers = INITIAL_PRODUCTS.filter((p) => p.isBestSeller);

  return (
    <>
      {/* Editorial Parallax Hero */}
      <HeroSlider banners={INITIAL_HERO_BANNERS} />

      {/* Featured Categories Grid */}
      <CategoryGrid categories={INITIAL_CATEGORIES} />

      {/* New Arrivals Section */}
      <section className="section container">
        <span className={styles.sectionSubtitle}>
          {locale === 'ar' ? 'تشكيلة الموسم الجديدة' : 'NEW SEASON ARRIVALS'}
        </span>
        <h2 className={styles.sectionTitle}>
          {locale === 'ar' ? 'أحدث العبايات والقفاطين' : 'Curated New Arrivals'}
        </h2>

        <div className={styles.productGrid}>
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <Link
            href="/products"
            style={{
              display: 'inline-block',
              padding: '14px 32px',
              border: '1px solid var(--color-black)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 600,
            }}
          >
            {locale === 'ar' ? 'مشاهدة كل التشكيلة' : 'View All Collections'}
          </Link>
        </div>
      </section>

      {/* Emirati Atelier Craftsmanship */}
      <CraftsmanshipSection />

      {/* Best Sellers Section */}
      <section className="section container">
        <span className={styles.sectionSubtitle}>
          {locale === 'ar' ? 'الأعلى طلباً في الإمارات' : 'EMIRATI FAVORITES'}
        </span>
        <h2 className={styles.sectionTitle}>
          {locale === 'ar' ? 'العبايات الأكثر مبيعاً' : 'Best Selling Abayas'}
        </h2>

        <div className={styles.productGrid}>
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Ramadan Royal Promo Banner */}
      <section className={styles.bannerSection}>
        <div className={`container ${styles.bannerContent}`}>
          <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-champagne-dark)' }}>
            {locale === 'ar' ? 'مجموعة رمضان ٢٠٢٦' : 'RAMADAN ROYAL COLLECTION 2026'}
          </span>
          <h2 className={styles.bannerHeading}>
            {locale === 'ar'
              ? 'تأنقي في رمضان بأحدث قفاطين الحرير وعبايات السهرة'
              : 'Elegance for Holy Month Galas & Family Gatherings'}
          </h2>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', maxWidth: '560px' }}>
            {locale === 'ar'
              ? 'استمتعي بشحن مجاني وتوصيل سريع في نفس اليوم لجميع إمارات الدولة.'
              : 'Enjoy complimentary express shipping across Abu Dhabi, Dubai, Sharjah, and all UAE emirates.'}
          </p>
          <Link
            href="/collection/ramadan-2026"
            style={{
              padding: '14px 36px',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-ivory)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              borderRadius: 'var(--radius-xs)',
              marginTop: '12px',
            }}
          >
            {locale === 'ar' ? 'استكشفي مجموعة رمضان' : 'Shop Ramadan Edition'}
          </Link>
        </div>
      </section>

      {/* Modals */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
}
