'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, Size } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/lib/utils';
import styles from './QuickViewModal.module.css';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide,
}) => {
  const { locale } = useLanguage();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<Size | undefined>(
    product?.sizes[0]
  );

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, undefined, selectedSize);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Gallery */}
        <div className={styles.imageGallery}>
          <Image
            src={product.images[0]?.url || ''}
            alt={locale === 'ar' ? product.nameAr : product.name}
            fill
            className={styles.mainImg}
          />
        </div>

        {/* Details */}
        <div className={styles.details}>
          <div>
            <h2 className={styles.title}>
              {locale === 'ar' ? product.nameAr : product.name}
            </h2>
            <div className={styles.price}>{formatCurrency(product.price, locale)}</div>
            <p className={styles.description}>
              {locale === 'ar' ? product.shortDescriptionAr : product.shortDescription}
            </p>

            {/* Size Selector */}
            <div className={styles.optionSection}>
              <div className={styles.optionLabel}>
                <span>{locale === 'ar' ? 'اختر المقاس (طول العباية)' : 'Select Size (Abaya Length)'}</span>
                {onOpenSizeGuide && (
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    style={{ textDecoration: 'underline', color: 'var(--color-champagne-dark)' }}
                  >
                    {locale === 'ar' ? 'دليل المقاسات' : 'Size Guide'}
                  </button>
                )}
              </div>
              <div className={styles.sizeGrid}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    className={`${styles.sizeBtn} ${
                      selectedSize?.id === sz.id ? styles.sizeBtnSelected : ''
                    }`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Material */}
            {product.material && (
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)', marginBottom: '16px' }}>
                💎 {locale === 'ar' ? `القماش: ${product.materialAr}` : `Fabric: ${product.material}`}
              </div>
            )}
          </div>

          <div>
            <button className={styles.addBtn} onClick={handleAddToCart}>
              {locale === 'ar' ? 'إضافة إلى الحقيبة' : 'Add to Shopping Bag'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '12px' }}>
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                style={{ fontSize: 'var(--text-xs)', textDecoration: 'underline' }}
              >
                {locale === 'ar' ? 'عرض تفاصيل العباية الكاملة' : 'View Full Abaya Details'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
