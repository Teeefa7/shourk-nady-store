'use client';

import React, { useState, use } from 'react';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { INITIAL_PRODUCTS, REVIEWS } from '@/data/products';
import { Size, Color } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatCurrency, calculateDiscountPercentage } from '@/lib/utils';
import { SizeGuideModal } from '@/components/product/SizeGuideModal';
import { ProductCard } from '@/components/product/ProductCard';
import styles from './productDetail.module.css';
import catalogStyles from '@/app/products/products.module.css';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useLanguage();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size>(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'fit' | 'fabric' | 'shipping'>('fit');

  const discount = calculateDiscountPercentage(product.price, product.compareAtPrice);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, undefined, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, undefined, selectedSize, selectedColor, quantity);
    router.push('/checkout');
  };

  const relatedProducts = INITIAL_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categories.some((c) => product.categories.some((pc) => pc.id === c.id))
  ).slice(0, 4);

  return (
    <>
      <div className="container">
        <div className={styles.layout}>
          {/* Gallery Column */}
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  className={`${styles.thumbBtn} ${i === activeImgIndex ? styles.thumbActive : ''}`}
                  onClick={() => setActiveImgIndex(i)}
                >
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    className={styles.thumbImg}
                  />
                </button>
              ))}
            </div>

            <div className={styles.mainView}>
              <Image
                src={product.images[activeImgIndex]?.url || product.images[0]?.url || ''}
                alt={locale === 'ar' ? product.nameAr : product.name}
                fill
                priority
                className={styles.mainImg}
              />
            </div>
          </div>

          {/* Details & Purchase Actions */}
          <div className={styles.details}>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-champagne-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {product.categories[0] && (locale === 'ar' ? product.categories[0].nameAr : product.categories[0].name)}
              </div>
              <h1 className={styles.title}>
                {locale === 'ar' ? product.nameAr : product.name}
              </h1>

              <div className={styles.ratingRow}>
                <span>★★★★★</span>
                <span>{product.averageRating}</span>
                <span style={{ color: 'var(--color-taupe)' }}>
                  ({product.reviewCount} {locale === 'ar' ? 'تقييم من العميلات' : 'verified client reviews'})
                </span>
              </div>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatCurrency(product.price, locale)}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className={styles.comparePrice}>{formatCurrency(product.compareAtPrice, locale)}</span>
              )}
              {discount > 0 && (
                <span style={{ color: 'var(--color-error)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                  -{discount}% OFF
                </span>
              )}
            </div>
            <div className={styles.vatNotice}>
              {locale === 'ar' ? 'السعر يشمل ضريبة القيمة المضافة (٥٪) داخل الإمارات' : 'Price inclusive of 5% UAE VAT'}
            </div>

            <p className={styles.description}>
              {locale === 'ar' ? product.descriptionAr : product.description}
            </p>

            {/* Size Selector */}
            <div>
              <div className={styles.sectionLabel}>
                <span>{locale === 'ar' ? 'مقاس العباية (الطول بالبوصة):' : 'Abaya Size (Length in inches):'}</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  style={{ textDecoration: 'underline', color: 'var(--color-champagne-dark)' }}
                >
                  {locale === 'ar' ? 'دليل الطول والمقاسات' : 'Size & Height Guide'}
                </button>
              </div>
              <div className={styles.sizeGrid}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz.id}
                    type="button"
                    className={`${styles.sizeBtn} ${selectedSize?.id === sz.id ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className={styles.sectionLabel}>
                  <span>{locale === 'ar' ? `اللون: ${selectedColor?.nameAr || ''}` : `Color: ${selectedColor?.name || ''}`}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: c.hexCode,
                        border: selectedColor?.id === c.id ? '2px solid var(--color-champagne)' : '1px solid var(--color-sand)',
                      }}
                      title={locale === 'ar' ? c.nameAr : c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className={styles.qtyRow}>
              <span className={styles.sectionLabel} style={{ marginBottom: 0 }}>
                {locale === 'ar' ? 'الكمية:' : 'Quantity:'}
              </span>
              <div className={styles.qtyBox}>
                <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </button>
                <span className={styles.qtyVal}>{quantity}</span>
                <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.btnGroup}>
              <button className={styles.addCartBtn} onClick={handleAddToCart}>
                {locale === 'ar' ? 'إضافة إلى حقيبة التسوق' : 'Add to Shopping Bag'}
              </button>
              <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                {locale === 'ar' ? 'شراء الآن (شحن سريع)' : 'Buy Now (Express Checkout)'}
              </button>
            </div>

            {/* Accordion Tabs */}
            <div className={styles.accordion}>
              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setActiveTab(activeTab === 'fit' ? '' as any : 'fit')}
                >
                  <span>{locale === 'ar' ? 'القصة والتفصيل' : 'Tailoring & Fit'}</span>
                  <span>{activeTab === 'fit' ? '-' : '+'}</span>
                </button>
                {activeTab === 'fit' && (
                  <div className={styles.accordionBody}>
                    {locale === 'ar'
                      ? 'تصميم قصة خليجية مفتوحة أو مغلقة حسب الرغبة. تأتي العباية مع شيلة مطابقة ومجموعة أزرار مخفية عالية الجودة.'
                      : 'Emirati couture open-front silhouette. Includes matching chiffon sheila and invisible snap buttons.'}
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setActiveTab(activeTab === 'fabric' ? '' as any : 'fabric')}
                >
                  <span>{locale === 'ar' ? 'القماش والعناية' : 'Fabric & Garment Care'}</span>
                  <span>{activeTab === 'fabric' ? '-' : '+'}</span>
                </button>
                {activeTab === 'fabric' && (
                  <div className={styles.accordionBody}>
                    <p>💎 <strong>{locale === 'ar' ? 'نوع القماش:' : 'Fabric:'}</strong> {locale === 'ar' ? product.materialAr : product.material}</p>
                    <p>🧺 <strong>{locale === 'ar' ? 'تعليمات التنظيف:' : 'Care:'}</strong> {locale === 'ar' ? product.careInstructionsAr : product.careInstructions}</p>
                  </div>
                )}
              </div>

              <div className={styles.accordionItem}>
                <button
                  className={styles.accordionHeader}
                  onClick={() => setActiveTab(activeTab === 'shipping' ? '' as any : 'shipping')}
                >
                  <span>{locale === 'ar' ? 'الشحن والتوصيل في الإمارات' : 'UAE Express Delivery & Returns'}</span>
                  <span>{activeTab === 'shipping' ? '-' : '+'}</span>
                </button>
                {activeTab === 'shipping' && (
                  <div className={styles.accordionBody}>
                    {locale === 'ar'
                      ? '• شحن مجاني لجميع طلبات الإمارات التي تتجاوز ٥٠٠ درهم.\n• توصيل في نفس اليوم لمدينة دبي للطلبات قبل الساعة ١٢ ظهراً.\n• توصيل خلال ٢-٣ أيام لأبوظبي والشارقة وباقي الإمارات.\n• خدمة الدفع عند الاستلام متاحة.'
                      : '• Free Shipping across UAE for orders over 500 AED.\n• Same-Day Express Delivery in Dubai for orders before 12 PM.\n• 2-3 Business Days for Abu Dhabi, Sharjah, Ajman, and Northern Emirates.\n• Cash on Delivery (COD) available.'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section style={{ marginBlock: 'var(--space-20)' }}>
          <h3 className={styles.title} style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-6)' }}>
            {locale === 'ar' ? 'آراء العميلات' : 'Client Testimonials'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-6)' }}>
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                style={{
                  padding: 'var(--space-6)',
                  backgroundColor: 'var(--color-cream)',
                  borderRadius: 'var(--radius-xs)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong style={{ fontSize: 'var(--text-sm)' }}>{rev.customer.name}</strong>
                  <span style={{ color: 'var(--color-champagne-dark)' }}>★★★★★</span>
                </div>
                <h4 style={{ fontSize: 'var(--text-sm)', marginBottom: '6px' }}>{rev.title}</h4>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
                  {rev.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginBlock: 'var(--space-20)' }}>
            <h3 className={styles.title} style={{ fontSize: 'var(--text-2xl)', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              {locale === 'ar' ? 'تصاميم قد تعجبكِ أيضاً' : 'You May Also Like'}
            </h3>
            <div className={catalogStyles.productsGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />
    </>
  );
}
