'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { INITIAL_COLLECTIONS, INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/app/products/products.module.css';

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useLanguage();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const collection = INITIAL_COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) {
    notFound();
  }

  const collectionProducts = INITIAL_PRODUCTS.filter((p) =>
    p.collections.some((c) => c.slug === slug)
  );

  return (
    <>
      <div className={styles.header} style={{ backgroundColor: 'var(--color-black)', color: 'var(--color-ivory)' }}>
        <h1 className={styles.title} style={{ color: 'var(--color-white)' }}>
          {locale === 'ar' ? collection.nameAr : collection.name}
        </h1>
        <p className={styles.subtitle} style={{ color: 'var(--color-sand)' }}>
          {locale === 'ar' ? collection.descriptionAr : collection.description}
        </p>
      </div>

      <div className="container" style={{ marginBottom: 'var(--space-20)' }}>
        <div className={styles.topControlBar}>
          <span className={styles.itemCount}>
            {locale === 'ar'
              ? `عرض ${collectionProducts.length} تصميم في التشكيلة الملكية`
              : `Showing ${collectionProducts.length} editorial couture pieces`}
          </span>
        </div>

        <div className={styles.productsGrid}>
          {collectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

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
