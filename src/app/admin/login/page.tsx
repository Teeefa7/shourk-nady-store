'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLoginAction } from '@/actions/auth';
import { useLanguage } from '@/context/LanguageContext';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const { locale } = useLanguage();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await adminLoginAction({ identifier, password });

      if (res.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMessage(res.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err: any) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <div className={styles.logoSection}>
          <div className={styles.emblem}>SN</div>
          <h1 className={styles.title}>
            {locale === 'ar' ? 'بوابة إدارة أتيليه شروق نادي' : 'Shourk Nady Atelier'}
          </h1>
          <p className={styles.subtitle}>
            {locale === 'ar' ? 'تسجيل الدخول الآمن للإدارة المالكة' : 'Owner & Master Admin Portal'}
          </p>
        </div>

        {errorMessage && (
          <div className={styles.errorAlert}>
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {locale === 'ar' ? 'اسم المستخدم / البريد الإلكتروني' : 'Username or Email'}
            </label>
            <input
              type="text"
              required
              placeholder="admin or owner@shourknady.ae"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className={styles.input}
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              {locale === 'ar' ? 'كلمة المرور المشفرة' : 'Secure Master Password'}
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.togglePasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (locale === 'ar' ? 'إخفاء' : 'Hide') : (locale === 'ar' ? 'إظهار' : 'Show')}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className={styles.submitBtn}>
            {isLoading
              ? (locale === 'ar' ? 'جاري التحقق والتشفير...' : 'Authenticating...')
              : (locale === 'ar' ? 'الدخول للوحة التحكم' : 'Enter Admin Atelier')}
          </button>
        </form>

        <div className={styles.footerHint}>
          🔒 256-Bit Encrypted Atelier Access Control • Shourk Nady Regional HQ
        </div>
      </div>
    </div>
  );
}
