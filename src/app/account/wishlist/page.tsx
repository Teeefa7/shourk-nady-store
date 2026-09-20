'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useLanguage } from '@/context/LanguageContext';
import { ProductCard } from '@/components/product/ProductCard';
import styles from '@/app/products/products.module.css';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();
  const { locale } = useLanguage();

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Responsive Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
          borderBottom: '1px solid rgba(212, 197, 181, 0.25)',
          paddingBottom: 'var(--space-4)',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.25rem, 4vw, 2.25rem)',
              color: 'var(--color-black)',
              marginBottom: '4px',
              lineHeight: 1.2,
            }}
          >
            {locale === 'ar' ? 'قائمة الأمنيات الملكية' : 'Your Atelier Wishlist'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: 'var(--text-xs)' }}>
            {locale === 'ar'
              ? `تم حفظ ${wishlist.length} تصميم في قائمة الأمنيات الخاصة بكِ`
              : `You have ${wishlist.length} saved couture pieces in your wishlist`}
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-error)',
              textDecoration: 'underline',
              padding: '4px 0',
              cursor: 'pointer',
            }}
          >
            {locale === 'ar' ? 'مسح القائمة' : 'Clear All'}
          </button>
        )}
      </div>

      {/* Wishlist Items */}
      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--color-cream)', borderRadius: 'var(--radius-xs)' }}>
          <p style={{ color: 'var(--color-taupe)', marginBottom: '16px' }}>
            {locale === 'ar' ? 'لم تقومي بإضافة أي عباية إلى قائمة الأمنيات بعد' : 'You have not added any abayas to your wishlist yet.'}
          </p>
          <Link
            href="/products"
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-ivory)',
              borderRadius: 'var(--radius-xs)',
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {locale === 'ar' ? 'استكشفي المجموعات' : 'Explore Collections'}
          </Link>
        </div>
      ) : (
        <div className={styles.productsGrid}>
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
