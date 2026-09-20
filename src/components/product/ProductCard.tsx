'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { locale } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);
  const discount = calculateDiscountPercentage(product.price, product.compareAtPrice);

  const primaryImage = product.images[0]?.url || '';
  const secondaryImage = product.images[1]?.url || primaryImage;

  return (
    <div className={styles.card}>
      {/* Image & Badges Container */}
      <div className={styles.imageWrapper}>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={primaryImage}
            alt={locale === 'ar' ? product.nameAr : product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={styles.primaryImg}
          />
          {secondaryImage !== primaryImage && (
            <Image
              src={secondaryImage}
              alt={locale === 'ar' ? product.nameAr : product.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={styles.secondaryImg}
            />
          )}
        </Link>

        {/* Badges */}
        <div className={styles.badgeStack}>
          {product.isNewArrival && (
            <span className={`${styles.badge} ${styles.badgeNew}`}>
              {locale === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
          {product.isBestSeller && (
            <span className={`${styles.badge} ${styles.badgeBest}`}>
              {locale === 'ar' ? 'الأكثر مبيعاً' : 'BESTSELLER'}
            </span>
          )}
          {discount > 0 && (
            <span className={`${styles.badge} ${styles.badgeSale}`}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlistActive : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          aria-label="Add to Wishlist"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            className={styles.quickViewBtn}
            onClick={() => onQuickView(product)}
          >
            {locale === 'ar' ? 'نظرة سريعة' : 'Quick View'}
          </button>
        )}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {product.categories[0] && (
          <span className={styles.categoryTitle}>
            {locale === 'ar' ? product.categories[0].nameAr : product.categories[0].name}
          </span>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className={styles.title}>
            {locale === 'ar' ? product.nameAr : product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className={styles.ratingRow}>
          <span>★</span>
          <span>{product.averageRating}</span>
          <span style={{ color: 'var(--color-taupe)' }}>({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatCurrency(product.price, locale)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className={styles.comparePrice}>
              {formatCurrency(product.compareAtPrice, locale)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className={styles.swatchRow}>
            {product.colors.map((color) => (
              <span
                key={color.id}
                className={styles.swatchDot}
                style={{ backgroundColor: color.hexCode }}
                title={locale === 'ar' ? color.nameAr : color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
