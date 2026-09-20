'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function AccountPage() {
  const { locale } = useLanguage();

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-16)' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: '4px' }}>
          {locale === 'ar' ? 'حسابي الملكي - الشيخة القاسمي' : 'My Account - Sheikha M. Al Qassimi'}
        </h1>
        <p style={{ color: 'var(--color-taupe)', fontSize: 'var(--text-xs)' }}>
          {locale === 'ar' ? 'عضوية الاتيليه الفاخرة • دبي، الإمارات العربية المتحدة' : 'VIP Atelier Member • Dubai, United Arab Emirates'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)' }}>
        {/* Navigation Sidebar */}
        <div style={{ backgroundColor: 'var(--color-cream)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xs)', height: 'fit-content' }}>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: 'var(--text-sm)' }}>
            <li><strong style={{ color: 'var(--color-champagne-dark)' }}>{locale === 'ar' ? '● الطلبات السابقة' : '● Order History'}</strong></li>
            <li><Link href="/account/wishlist">{locale === 'ar' ? 'قائمة الأمنيات' : 'My Wishlist'}</Link></li>
            <li><span>{locale === 'ar' ? 'العناوين المسجلة (الإمارات)' : 'Saved UAE Addresses'}</span></li>
            <li><span>{locale === 'ar' ? 'إعدادات الحساب' : 'Account Settings'}</span></li>
          </ul>
        </div>

        {/* Orders list */}
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
            {locale === 'ar' ? 'الطلبات الأخيرة' : 'Recent Atelier Orders'}
          </h3>

          <div style={{ backgroundColor: 'var(--brand-surface)', border: '1px solid var(--color-sand)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xs)', marginBottom: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--text-xs)' }}>
              <strong>#SN-849201</strong>
              <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{locale === 'ar' ? 'مع المندوب للتوصيل' : 'Out for Delivery'}</span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)', marginBottom: '12px' }}>
              {locale === 'ar' ? 'عباية النور الملكية من النيدا الياباني • مقاس 54' : 'Al-Noor Royal Japanese Nida Abaya • Size 54'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>1,850 AED</span>
              <Link
                href="/order/track?id=SN-849201"
                style={{ fontSize: 'var(--text-xs)', textDecoration: 'underline', color: 'var(--color-champagne-dark)' }}
              >
                {locale === 'ar' ? 'تتبع الشحنة' : 'Track Package'}
              </Link>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--brand-surface)', border: '1px solid var(--color-sand)', padding: 'var(--space-6)', borderRadius: 'var(--radius-xs)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: 'var(--text-xs)' }}>
              <strong>#SN-710294</strong>
              <span style={{ color: 'var(--color-taupe)', fontWeight: 600 }}>{locale === 'ar' ? 'تم التسليم في دبي' : 'Delivered (Dubai)'}</span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)', marginBottom: '12px' }}>
              {locale === 'ar' ? 'قفطان الشيخة المطرز بالخيوط الذهبية • مقاس 56' : 'Sheikha Gold Thread Chiffon Kaftan • Size 56'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>2,450 AED</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-stone)' }}>12 Feb 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
