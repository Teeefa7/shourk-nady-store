'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, SIZES, COLORS } from '@/data/products';
import { Product, ProductSort } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import styles from './products.module.css';

export default function ProductsPage() {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortOption, setSortOption] = useState<ProductSort>('newest');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Filtering
  let products = INITIAL_PRODUCTS.filter((p) => {
    if (selectedCategory !== 'all') {
      const matchCat = p.categories.some((c) => c.slug === selectedCategory);
      if (!matchCat) return false;
    }
    if (selectedSize !== 'all') {
      const matchSz = p.sizes.some((s) => s.id === selectedSize);
      if (!matchSz) return false;
    }
    return true;
  });

  // Sorting
  products = [...products].sort((a, b) => {
    if (sortOption === 'price_asc') return a.price - b.price;
    if (sortOption === 'price_desc') return b.price - a.price;
    if (sortOption === 'rating') return b.averageRating - a.averageRating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ar' ? 'تشكيلة العبايات والقفاطين الفاخرة' : 'Atelier Abayas & Kaftans'}
        </h1>
        <p className={styles.subtitle}>
          {locale === 'ar'
            ? 'تصاميم كوتور حصرية من حكايات الشرق مطرزة باليد ومصنوعة من حرير النيدا الياباني الأصلي.'
            : 'Bespoke couture pieces tailored with original high-density Japanese Silk Nida and hand-embroidery.'}
        </p>
      </div>

      <div className="container" style={{ marginBottom: 'var(--space-20)' }}>
        <div className={styles.contentGrid}>
          {/* Filter Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.filterGroup}>
              <h4 className={styles.filterTitle}>
                {locale === 'ar' ? 'التصنيف' : 'Category'}
              </h4>
              <div className={styles.filterList}>
                <label className={styles.filterItem}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                  />
                  <span>{locale === 'ar' ? 'جميع التصنيفات' : 'All Categories'}</span>
                </label>
                {INITIAL_CATEGORIES.map((cat) => (
                  <label key={cat.id} className={styles.filterItem}>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                    />
                    <span>{locale === 'ar' ? cat.nameAr : cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 className={styles.filterTitle}>
                  {locale === 'ar' ? 'مقاس العباية (الطول)' : 'Abaya Size (Length)'}
                </h4>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{ fontSize: '0.7rem', textDecoration: 'underline', color: 'var(--color-champagne-dark)' }}
                >
                  {locale === 'ar' ? 'الدليل' : 'Guide'}
                </button>
              </div>
              <div className={styles.filterList}>
                <label className={styles.filterItem}>
                  <input
                    type="radio"
                    name="size"
                    checked={selectedSize === 'all'}
                    onChange={() => setSelectedSize('all')}
                  />
                  <span>{locale === 'ar' ? 'جميع المقاسات' : 'All Sizes'}</span>
                </label>
                {SIZES.map((sz) => (
                  <label key={sz.id} className={styles.filterItem}>
                    <input
                      type="radio"
                      name="size"
                      checked={selectedSize === sz.id}
                      onChange={() => setSelectedSize(sz.id)}
                    />
                    <span>{sz.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Listing Main Grid */}
          <main>
            <div className={styles.topControlBar}>
              <span className={styles.itemCount}>
                {locale === 'ar'
                  ? `عرض ${products.length} من أصل ${INITIAL_PRODUCTS.length} تصميم`
                  : `Showing ${products.length} of ${INITIAL_PRODUCTS.length} luxury abayas`}
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>
                  {locale === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
                </label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as ProductSort)}
                  className={styles.sortSelect}
                >
                  <option value="newest">{locale === 'ar' ? 'الأحدث أولاً' : 'Newest Arrivals'}</option>
                  <option value="price_asc">{locale === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                  <option value="price_desc">{locale === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                  <option value="rating">{locale === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-taupe)' }}>
                {locale === 'ar' ? 'لا توجد عبايات تطابق التصفية المختارة' : 'No abayas match your selected filter criteria'}
              </div>
            ) : (
              <div className={styles.productsGrid}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>
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
