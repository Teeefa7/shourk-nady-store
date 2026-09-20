'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { locale } = useLanguage();

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-16)', textAlign: 'center' }}>
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-cream)',
          border: '2px solid var(--color-champagne)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto var(--space-6) auto',
          color: 'var(--color-champagne-dark)',
          fontSize: '2rem',
        }}
      >
        ✓
      </div>

      <span style={{ fontSize: 'var(--text-xs)', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-champagne-dark)' }}>
        {locale === 'ar' ? 'تم استلام طلبكِ بنجاح' : 'ORDER CONFIRMED & RECEIVED'}
      </span>

      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBlock: 'var(--space-3)' }}>
        {locale === 'ar' ? `شكراً لكِ، رقم الطلب #${id}` : `Thank You, Order #${id}`}
      </h1>

      <p style={{ maxWidth: '560px', margin: '0 auto var(--space-8) auto', color: 'var(--color-charcoal)', lineHeight: 1.6 }}>
        {locale === 'ar'
          ? 'تم تأكيد طلبكِ بنجاح من اتيليه "شروق نادي". أرسلنا تفاصيل الفاتورة الإلكترونية برمز التتبع إلى بريدك الإلكتروني.'
          : 'Your bespoke order has been confirmed at Shourk Nady Atelier. A confirmation receipt and tracking reference have been sent to your email.'}
      </p>

      {/* Details Box */}
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto var(--space-10) auto',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-cream)',
          borderRadius: 'var(--radius-xs)',
          textAlign: 'start',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-sand)', paddingBottom: '12px', marginBottom: '12px' }}>
          <span><strong>{locale === 'ar' ? 'التوصيل المتوقع:' : 'Estimated UAE Delivery:'}</strong></span>
          <span style={{ color: 'var(--color-champagne-dark)', fontWeight: 600 }}>
            {locale === 'ar' ? 'خلال ٢٤ - ٤٨ ساعة (توصيل سريع)' : 'Within 24 - 48 Hours'}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--text-xs)' }}>
          <span>{locale === 'ar' ? 'حالة الطلب:' : 'Order Status:'}</span>
          <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{locale === 'ar' ? 'تم التجهيز في الاتيليه' : 'Preparing at Atelier'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
          <span>{locale === 'ar' ? 'الناقل في الإمارات:' : 'UAE Logistics Partner:'}</span>
          <span>Aramex Express / SMSA Courier</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link
          href={`/order/track?id=${id}`}
          style={{
            padding: '14px 28px',
            backgroundColor: 'var(--color-black)',
            color: 'var(--color-ivory)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {locale === 'ar' ? 'تتبع شحنة الطلب' : 'Track Order Status'}
        </Link>
        <Link
          href="/products"
          style={{
            padding: '14px 28px',
            border: '1px solid var(--color-black)',
            borderRadius: 'var(--radius-xs)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {locale === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
        </Link>
      </div>
    </div>
  );
}
