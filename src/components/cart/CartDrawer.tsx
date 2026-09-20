'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import styles from './CartDrawer.module.css';

export const CartDrawer: React.FC = () => {
  const {
    isOpen,
    closeCart,
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    vatAmount,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    coupon,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { locale } = useLanguage();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; text: string } | null>(null);

  if (!isOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMsg({ success: res.success, text: res.message });
    if (res.success) setCouponCode('');
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <>
      <div className={styles.overlay} onClick={closeCart} />
      <div className={styles.drawer}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>
            {locale === 'ar' ? `حقيبة التسوق (${items.length})` : `Shopping Bag (${items.length})`}
          </h3>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className={styles.freeShippingMeter}>
          {freeShippingRemaining > 0 ? (
            <div>
              {locale === 'ar'
                ? `أضيفي ${formatCurrency(freeShippingRemaining, 'ar')} للحصول على شحن مجاني داخل الإمارات! 🚚`
                : `Add ${formatCurrency(freeShippingRemaining, 'en')} more for Free Express UAE Shipping! 🚚`}
            </div>
          ) : (
            <div style={{ color: 'var(--color-success)', fontWeight: 600 }}>
              {locale === 'ar' ? '🎉 مبروك! حصلت على شحن مجاني داخل الإمارات' : '🎉 You have unlocked Free UAE Express Shipping!'}
            </div>
          )}
          <div className={styles.progressBarTrack}>
            <div className={styles.progressBarFill} style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Items */}
        <div className={styles.itemsContainer}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p>{locale === 'ar' ? 'حقيبة التسوق فارغة حالياً' : 'Your shopping bag is currently empty'}</p>
              <button
                onClick={closeCart}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--color-black)',
                  color: 'var(--color-ivory)',
                  borderRadius: 'var(--radius-xs)',
                  marginTop: '12px',
                }}
              >
                {locale === 'ar' ? 'استكشفي المجموعات' : 'Explore Collections'}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <Image
                  src={item.product.images[0]?.url || ''}
                  alt={locale === 'ar' ? item.product.nameAr : item.product.name}
                  width={80}
                  height={105}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <div>
                    <h4 className={styles.itemName}>
                      {locale === 'ar' ? item.product.nameAr : item.product.name}
                    </h4>
                    <div className={styles.itemMeta}>
                      <span>{locale === 'ar' ? `المقاس: ${item.size.name}` : `Size: ${item.size.name}`}</span>
                      <span>•</span>
                      <span>{locale === 'ar' ? item.color.nameAr : item.color.name}</span>
                    </div>
                    <div className={styles.itemPrice}>
                      {formatCurrency(item.price * item.quantity, locale)}
                    </div>
                  </div>

                  <div className={styles.quantityControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyVal}>{item.quantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      {locale === 'ar' ? 'حذف' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && (
          <div className={styles.footer}>
            {/* Coupon Application */}
            <form onSubmit={handleApplyCoupon} className={styles.couponRow}>
              <input
                type="text"
                placeholder={locale === 'ar' ? 'رمز القسيمة (مثال: WELCOME10)' : 'Promo Code (e.g. WELCOME10)'}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className={styles.couponInput}
              />
              <button type="submit" className={styles.applyBtn}>
                {locale === 'ar' ? 'تطبيق' : 'Apply'}
              </button>
            </form>

            {couponMsg && (
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: couponMsg.success ? 'var(--color-success)' : 'var(--color-error)',
                }}
              >
                {couponMsg.text}
              </div>
            )}

            {coupon && (
              <div
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-champagne-dark)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>
                  {locale === 'ar' ? `قسيمة خصم مفعّلة (${coupon.code})` : `Active Coupon (${coupon.code})`}
                </span>
                <button
                  onClick={removeCoupon}
                  style={{ textDecoration: 'underline', color: 'var(--color-error)' }}
                >
                  {locale === 'ar' ? 'إلغاء' : 'Remove'}
                </button>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>{locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{formatCurrency(subtotal, locale)}</span>
            </div>

            {discountAmount > 0 && (
              <div className={styles.summaryRow} style={{ color: 'var(--color-success)' }}>
                <span>{locale === 'ar' ? 'خصم القسيمة' : 'Discount'}</span>
                <span>-{formatCurrency(discountAmount, locale)}</span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>{locale === 'ar' ? 'ضريبة القيمة المضافة (٥٪)' : 'UAE VAT (5%)'}</span>
              <span>{formatCurrency(vatAmount, locale)}</span>
            </div>

            <div className={styles.totalRow}>
              <span>{locale === 'ar' ? 'الإجمالي النهائي' : 'Total (Estimated)'}</span>
              <span>{formatCurrency(total, locale)}</span>
            </div>

            <Link href="/checkout" onClick={closeCart} className={styles.checkoutBtn}>
              {locale === 'ar' ? 'المتابعة للشحن والدفع' : 'Proceed to Checkout'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
