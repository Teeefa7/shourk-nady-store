'use client';

import React, { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from '@/app/products/products.module.css';

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useLanguage();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const category = INITIAL_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    notFound();
  }

  const categoryProducts = INITIAL_PRODUCTS.filter((p) =>
    p.categories.some((c) => c.slug === slug)
  );

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ar' ? category.nameAr : category.name}
        </h1>
        <p className={styles.subtitle}>
          {locale === 'ar' ? category.descriptionAr : category.description}
        </p>
      </div>

      <div className="container" style={{ marginBottom: 'var(--space-20)' }}>
        <div className={styles.topControlBar}>
          <span className={styles.itemCount}>
            {locale === 'ar'
              ? `عرض ${categoryProducts.length} تصميم من الفئة`
              : `Showing ${categoryProducts.length} pieces in this collection`}
          </span>
        </div>

        <div className={styles.productsGrid}>
          {categoryProducts.map((product) => (
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
