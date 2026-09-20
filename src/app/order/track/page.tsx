'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

function OrderTrackContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || 'SN-849201';
  const { locale } = useLanguage();

  const [orderId, setOrderId] = useState(initialId);
  const [tracked, setTracked] = useState(true);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setTracked(true);
    }
  };

  return (
    <>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
          {locale === 'ar' ? 'تتبع طلب شروق نادي' : 'Track Your Order Status'}
        </h1>
        <p style={{ color: 'var(--color-taupe)', fontSize: 'var(--text-sm)' }}>
          {locale === 'ar' ? 'أدخلي رقم الطلب الخاص بك لمتابعة خط التوصيل في الإمارات.' : 'Enter your order reference number to view live UAE delivery timeline.'}
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleTrack} style={{ maxWidth: '480px', margin: '0 auto var(--space-12) auto', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. SN-849201"
          style={{ flex: 1, padding: '12px', border: '1px solid var(--color-sand)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-sm)' }}
        />
        <button
          type="submit"
          style={{ padding: '12px 24px', backgroundColor: 'var(--color-black)', color: 'var(--color-ivory)', borderRadius: 'var(--radius-xs)', fontSize: 'var(--text-xs)', letterSpacing: '0.1em' }}
        >
          {locale === 'ar' ? 'تتبع' : 'Track'}
        </button>
      </form>

      {/* Status Timeline */}
      {tracked && (
        <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: 'var(--color-cream)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xs)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--color-sand)', paddingBottom: '12px' }}>
            <div>
              <strong>{locale === 'ar' ? `طلب رقم: #${orderId}` : `Order ID: #${orderId}`}</strong>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Dubai Express Courier</div>
            </div>
            <div style={{ textAlign: 'end' }}>
              <span style={{ color: 'var(--color-champagne-dark)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                {locale === 'ar' ? 'مع المندوب للتوصيل' : 'Out for Delivery'}
              </span>
            </div>
          </div>

          {/* Timeline steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-champagne)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
              <div>
                <strong>{locale === 'ar' ? 'تم استلام وتأكيد الطلب' : 'Order Placed & Confirmed'}</strong>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Yesterday, 10:30 AM</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-champagne)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>✓</span>
              <div>
                <strong>{locale === 'ar' ? 'تم التجهيز والتغليف في اتيليه دبي' : 'Packed at Dubai Atelier'}</strong>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Yesterday, 4:15 PM</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--color-black)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>●</span>
              <div>
                <strong>{locale === 'ar' ? 'جاري التوصيل مع مندوب الشحن (أرامكس)' : 'Out for Delivery with Aramex Express'}</strong>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Today, 8:45 AM</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', opacity: 0.5 }}>
              <span style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--color-sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}></span>
              <div>
                <strong>{locale === 'ar' ? 'تم التوصيل بنجاح' : 'Delivered'}</strong>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Expected Today by 5:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function OrderTrackPage() {
  return (
    <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
      <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading tracking...</div>}>
        <OrderTrackContent />
      </Suspense>
    </div>
  );
}
