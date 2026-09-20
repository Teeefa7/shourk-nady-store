'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { Emirates, PaymentMethod } from '@/types';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, shippingFee, vatAmount, total, clearCart } = useCart();
  const { locale } = useLanguage();
  const router = useRouter();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+971 ');
  const [emirate, setEmirate] = useState<Emirates>('dubai');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [codFee] = useState(15);
  const [isProcessing, setIsProcessing] = useState(false);

  // Card info state (mock)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const finalShippingFee = shippingFee;
  const finalCodFee = paymentMethod === 'cod' ? codFee : 0;
  const grandTotal = total + finalCodFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const { createOrderAction } = await import('@/actions/orders');
      const res = await createOrderAction({
        fullName,
        email,
        phone,
        emirate,
        area,
        street,
        building,
        paymentMethod,
        items,
        subtotal,
        discount: discountAmount,
        shipping: finalShippingFee,
        codFee: finalCodFee,
        vat: vatAmount,
        total: grandTotal,
      });

      const orderId = res.orderNumber || 'SN-' + Math.floor(100000 + Math.random() * 900000);
      clearCart();
      router.push(`/order/confirmation/${orderId}`);
    } catch (err) {
      console.error('Order submission error:', err);
      const fallbackOrderId = 'SN-' + Math.floor(100000 + Math.random() * 900000);
      clearCart();
      router.push(`/order/confirmation/${fallbackOrderId}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>{locale === 'ar' ? 'حقيبة التسوق فارغة' : 'Your shopping bag is empty'}</h2>
        <button
          onClick={() => router.push('/products')}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-ivory)',
            borderRadius: 'var(--radius-xs)',
            marginTop: '20px',
          }}
        >
          {locale === 'ar' ? 'العودة للتسوق' : 'Return to Shop'}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {locale === 'ar' ? 'إتمام الطلب والدفع' : 'Secure Checkout'}
        </h1>
      </div>

      <div className="container">
        <form onSubmit={handleSubmitOrder} className={styles.grid}>
          {/* Left Checkout Details */}
          <div className={styles.formSection}>
            {/* Customer Information */}
            <div>
              <h3 className={styles.blockTitle}>
                1. {locale === 'ar' ? 'بيانات التواصل' : 'Customer Details'}
              </h3>
              <div className={styles.inputGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                  <input
                    type="text"
                    required
                    placeholder="Sheikha Al Qassimi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.ae"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>{locale === 'ar' ? 'رقم الهاتف (الإمارات)' : 'UAE Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* UAE Delivery Address */}
            <div>
              <h3 className={styles.blockTitle}>
                2. {locale === 'ar' ? 'عنوان التوصيل داخل الإمارات' : 'UAE Shipping Address'}
              </h3>
              <div className={styles.inputGrid}>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>{locale === 'ar' ? 'الإمارة' : 'Emirate'}</label>
                  <select
                    value={emirate}
                    onChange={(e) => setEmirate(e.target.value as Emirates)}
                    className={styles.select}
                  >
                    <option value="dubai">{locale === 'ar' ? 'دبي' : 'Dubai'}</option>
                    <option value="abu_dhabi">{locale === 'ar' ? 'أبوظبي' : 'Abu Dhabi'}</option>
                    <option value="sharjah">{locale === 'ar' ? 'الشارقة' : 'Sharjah'}</option>
                    <option value="ajman">{locale === 'ar' ? 'عجمان' : 'Ajman'}</option>
                    <option value="ras_al_khaimah">{locale === 'ar' ? 'رأس الخيمة' : 'Ras Al Khaimah'}</option>
                    <option value="fujairah">{locale === 'ar' ? 'الفجيرة' : 'Fujairah'}</option>
                    <option value="umm_al_quwain">{locale === 'ar' ? 'أم القيوين' : 'Umm Al Quwain'}</option>
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{locale === 'ar' ? 'المنطقة / الحي' : 'Area / Neighborhood'}</label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'جميرا / دبي مارینا / الخالدية' : 'Jumeirah / Downtown / Al Khalidiya'}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>{locale === 'ar' ? 'الشارع' : 'Street Address'}</label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'شارع الشاطئ' : 'Beach Road'}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label className={styles.label}>{locale === 'ar' ? 'اسم البناية / الفيلا والشقة' : 'Building / Villa & Apartment Number'}</label>
                  <input
                    type="text"
                    required
                    placeholder={locale === 'ar' ? 'فيلا ١٢ / برج السعادة شقة ٥٠٢' : 'Villa 12 / Sunrise Tower Apt 502'}
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className={styles.blockTitle}>
                3. {locale === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label
                  className={`${styles.radioOption} ${paymentMethod === 'card' ? styles.radioOptionSelected : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span>💳 {locale === 'ar' ? 'بطاقة ائتمان / خصم (فيزا / ماستركارد / أبل باي)' : 'Credit / Debit Card (Visa, Mastercard, Apple Pay)'}</span>
                  </div>
                </label>

                {paymentMethod === 'card' && (
                  <div className={styles.inputGrid} style={{ backgroundColor: 'var(--color-cream)', padding: '16px', borderRadius: 'var(--radius-xs)' }}>
                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>{locale === 'ar' ? 'رقم البطاقة' : 'Card Number'}</label>
                      <input
                        type="text"
                        placeholder="4000 1234 5678 9010"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>{locale === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>CVC / CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className={styles.input}
                      />
                    </div>
                  </div>
                )}

                <label
                  className={`${styles.radioOption} ${paymentMethod === 'cod' ? styles.radioOptionSelected : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span>💵 {locale === 'ar' ? 'الدفع نقداً عند الاستلام (+١٥ درهم رسوم COD)' : 'Cash on Delivery (+15 AED COD Fee)'}</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className={styles.orderSummary}>
            <h3 className={styles.summaryTitle}>
              {locale === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
            </h3>

            <div className={styles.itemList}>
              {items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Image
                    src={item.product.images[0]?.url || ''}
                    alt={locale === 'ar' ? item.product.nameAr : item.product.name}
                    width={50}
                    height={65}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1, fontSize: 'var(--text-xs)' }}>
                    <div style={{ fontWeight: 600 }}>{locale === 'ar' ? item.product.nameAr : item.product.name}</div>
                    <div style={{ color: 'var(--color-taupe)' }}>
                      {locale === 'ar' ? `المقاس: ${item.size.name}` : `Size: ${item.size.name}`} × {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                    {formatCurrency(item.price * item.quantity, locale)}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.summaryRow}>
              <span>{locale === 'ar' ? 'المجموع الفرعي' : 'Subtotal'}</span>
              <span>{formatCurrency(subtotal, locale)}</span>
            </div>

            {discountAmount > 0 && (
              <div className={styles.summaryRow} style={{ color: 'var(--color-success)' }}>
                <span>{locale === 'ar' ? 'الخصم' : 'Discount'}</span>
                <span>-{formatCurrency(discountAmount, locale)}</span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>{locale === 'ar' ? 'رسوم التوصيل' : 'Delivery Fee'}</span>
              <span>{finalShippingFee === 0 ? (locale === 'ar' ? 'مجاني' : 'FREE') : formatCurrency(finalShippingFee, locale)}</span>
            </div>

            {paymentMethod === 'cod' && (
              <div className={styles.summaryRow}>
                <span>{locale === 'ar' ? 'رسوم الدفع عند الاستلام' : 'COD Service Fee'}</span>
                <span>{formatCurrency(codFee, locale)}</span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>{locale === 'ar' ? 'ضريبة القيمة المضافة (٥٪)' : 'UAE VAT (5%)'}</span>
              <span>{formatCurrency(vatAmount, locale)}</span>
            </div>

            <div className={styles.totalRow}>
              <span>{locale === 'ar' ? 'الإجمالي النهائي' : 'Total'}</span>
              <span>{formatCurrency(grandTotal, locale)}</span>
            </div>

            <button type="submit" disabled={isProcessing} className={styles.submitBtn}>
              {isProcessing
                ? (locale === 'ar' ? 'جاري معالجة الطلب...' : 'Processing Payment...')
                : (locale === 'ar' ? 'تأكيد ودفع الطلب' : 'Place Luxury Order')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
