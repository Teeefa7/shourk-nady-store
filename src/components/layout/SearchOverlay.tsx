'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { INITIAL_PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import styles from './SearchOverlay.module.css';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { locale } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? INITIAL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.nameAr.includes(query) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.descriptionAr.includes(query)
      )
    : [];

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.topBar}>
        <span className={styles.brand}>
          {locale === 'ar' ? 'بحث عن عباية أو قفطان' : 'Search Atelier'}
        </span>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close search">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className={styles.inputContainer}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          autoFocus
          placeholder={
            locale === 'ar'
              ? 'ابحثي عن "عباية نيدا"، "قفطان حرير"، "رمضان"...'
              : 'Search for "Japanese Nida", "Silk Kaftan", "Ramadan"...'
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {!query ? (
        <div className={styles.suggestions}>
          <h4 className={styles.suggTitle}>
            {locale === 'ar' ? 'عمليات البحث الشائعة' : 'Popular Atelier Searches'}
          </h4>
          <div className={styles.tagList}>
            <button className={styles.tagBtn} onClick={() => handleSelectTag(locale === 'ar' ? 'رمضان' : 'Ramadan')}>
              {locale === 'ar' ? 'تشكيلة رمضان ٢٠٢٦' : 'Ramadan 2026'}
            </button>
            <button className={styles.tagBtn} onClick={() => handleSelectTag(locale === 'ar' ? 'نيدا' : 'Nida')}>
              {locale === 'ar' ? 'عبايات النيدا السوداء' : 'Black Nida Abayas'}
            </button>
            <button className={styles.tagBtn} onClick={() => handleSelectTag(locale === 'ar' ? 'قفطان' : 'Kaftan')}>
              {locale === 'ar' ? 'قفاطين حريرية' : 'Silk Kaftans'}
            </button>
            <button className={styles.tagBtn} onClick={() => handleSelectTag(locale === 'ar' ? 'كتان' : 'Linen')}>
              {locale === 'ar' ? 'عبايات الكتان للسفر' : 'Linen Abayas'}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.resultsGrid}>
          {filteredProducts.length === 0 ? (
            <div style={{ gridColumn: 'span 3', textAlign: 'center', color: 'var(--color-taupe)', padding: '40px' }}>
              {locale === 'ar' ? `لم نجد نتائج تطابق "${query}"` : `No abayas found matching "${query}"`}
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div key={p.id} onClick={onClose}>
                <ProductCard product={p} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
