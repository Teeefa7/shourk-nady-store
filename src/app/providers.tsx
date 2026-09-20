'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <LanguageProvider>
      <CartProvider>
        <WishlistProvider>
          {!isAdminRoute && (
            <Header
              onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
          )}

          <main style={{ minHeight: isAdminRoute ? '100vh' : '80vh' }}>{children}</main>

          {!isAdminRoute && <Footer />}
          {!isAdminRoute && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            />
          )}
          {!isAdminRoute && <CartDrawer />}
          {!isAdminRoute && (
            <SearchOverlay
              isOpen={isSearchOpen}
              onClose={() => setIsSearchOpen(false)}
            />
          )}
        </WishlistProvider>
      </CartProvider>
    </LanguageProvider>
  );
}
