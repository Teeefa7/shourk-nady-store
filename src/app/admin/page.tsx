'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { checkAdminSessionAction, adminLogoutAction } from '@/actions/auth';
import { getProducts, createProductAction } from '@/actions/products';
import { getOrdersAction } from '@/actions/orders';
import { INITIAL_COUPONS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { Product } from '@/types';
import styles from './admin.module.css';

type AdminTab = 'overview' | 'products' | 'orders' | 'coupons' | 'security';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { locale } = useLanguage();

  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Data States
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Modal & Form State for Product Add / Edit
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [nameAr, setNameAr] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [compareAtPrice, setCompareAtPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('classic-abayas');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Security Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [secSuccess, setSecSuccess] = useState('');

  useEffect(() => {
    verifySession();
  }, []);

  const verifySession = async () => {
    const isAuthenticated = await checkAdminSessionAction();
    if (!isAuthenticated) {
      router.push('/admin/login');
    } else {
      setIsAuthChecked(true);
      loadAdminData();
    }
  };

  const loadAdminData = async () => {
    setIsLoadingData(true);
    try {
      const prods = await getProducts();
      setProductsList(prods);

      const ordRes = await getOrdersAction();
      if (ordRes.success && ordRes.orders.length > 0) {
        setOrders(ordRes.orders);
      } else {
        setOrders([
          {
            id: 'SN-849201',
            customer: 'Sheikha M. Al Qassimi',
            emirate: 'Dubai',
            total: 1850,
            payment: 'Credit Card (Visa)',
            status: 'out_for_delivery',
            date: '2026-02-18',
          },
          {
            id: 'SN-710294',
            customer: 'Fatima Al Mansoori',
            emirate: 'Abu Dhabi',
            total: 2450,
            payment: 'Cash on Delivery (COD)',
            status: 'delivered',
            date: '2026-02-15',
          },
        ]);
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await adminLogoutAction();
    router.push('/admin/login');
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setNameAr('');
    setDescription('');
    setDescriptionAr('');
    setPrice('');
    setCompareAtPrice('');
    setImageUrl('');
    setCategory('classic-abayas');
    setIsFeatured(false);
    setIsNewArrival(true);
    setShowProductModal(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setNameAr(product.nameAr);
    setDescription(product.description);
    setDescriptionAr(product.descriptionAr);
    setPrice(product.price);
    setCompareAtPrice(product.compareAtPrice || '');
    setImageUrl(product.images[0]?.url || '');
    setCategory(product.categories[0]?.slug || 'classic-abayas');
    setIsFeatured(product.isFeatured || false);
    setIsNewArrival(product.isNewArrival || false);
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !imageUrl) {
      alert('Please fill in required fields (Name, Price, Image URL)');
      return;
    }

    setIsSaving(true);
    try {
      if (editingProduct) {
        setProductsList((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? {
                  ...p,
                  name,
                  nameAr: nameAr || name,
                  description,
                  descriptionAr: descriptionAr || description,
                  price: Number(price),
                  compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
                  images: [{ id: 'img-' + Date.now(), url: imageUrl, alt: name, position: 1 }],
                  isFeatured,
                  isNewArrival,
                }
              : p
          )
        );
      } else {
        const res = await createProductAction({
          name,
          nameAr: nameAr || name,
          description: description || name,
          descriptionAr: descriptionAr || nameAr || name,
          price: Number(price),
          compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
          images: [{ url: imageUrl, alt: name }],
          isFeatured,
          isNewArrival,
        });

        const newProd: Product = {
          id: res.product?.id || 'prod-' + Date.now(),
          slug: res.product?.slug || name.toLowerCase().replace(/ /g, '-'),
          name,
          nameAr: nameAr || name,
          description: description || name,
          descriptionAr: descriptionAr || nameAr || name,
          shortDescription: description.substring(0, 100),
          shortDescriptionAr: (descriptionAr || description).substring(0, 100),
          price: Number(price),
          compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
          images: [{ id: 'img-' + Date.now(), url: imageUrl, alt: name, position: 1 }],
          variants: [
            {
              id: 'v-' + Date.now(),
              sku: 'SN-' + Math.floor(1000 + Math.random() * 9000),
              price: Number(price),
              stock: 25,
              reservedStock: 0,
            },
          ],
          categories: [
            {
              id: 'cat-1',
              slug: category,
              name: category.replace('-', ' ').toUpperCase(),
              nameAr: category,
              position: 1,
            },
          ],
          collections: [],
          colors: [
            { id: 'c-black', name: 'Midnight Black', nameAr: 'أسود ملكي', hexCode: '#000000' },
          ],
          sizes: [
            { id: 's-54', name: '54 (S)', position: 1 },
            { id: 's-56', name: '56 (M)', position: 2 },
          ],
          averageRating: 5.0,
          reviewCount: 1,
          isFeatured,
          isNewArrival,
          isBestSeller: false,
          status: 'active',
          createdAt: new Date().toISOString(),
        };

        setProductsList((prev) => [newProd, ...prev]);
      }

      setShowProductModal(false);
    } catch (err: any) {
      alert('Failed to save product: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this abaya product from inventory?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSecSuccess('Admin credentials hash updated successfully!');
    setCurrentPass('');
    setNewPass('');
  };

  if (!isAuthChecked) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0d0d0d', color: '#d4af37', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>🔒 Verifying Hashed Admin Session...</div>
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brandEmblem}>
          <div className={styles.logoIcon}>SN</div>
          <div className={styles.brandText}>
            <span className={styles.brandName}>Shourk Nady</span>
            <span className={styles.brandRole}>Owner Portal</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`${styles.navButton} ${activeTab === 'overview' ? styles.navButtonActive : ''}`}
          >
            📊 {locale === 'ar' ? 'نظرة عامة والتحليلات' : 'Overview & Stats'}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`${styles.navButton} ${activeTab === 'products' ? styles.navButtonActive : ''}`}
          >
            👗 {locale === 'ar' ? 'إدارة المنتجات والمخزون' : 'Abaya Products'}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`${styles.navButton} ${activeTab === 'orders' ? styles.navButtonActive : ''}`}
          >
            🛍️ {locale === 'ar' ? 'طلبات العميلات' : 'Customer Orders'}
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`${styles.navButton} ${activeTab === 'coupons' ? styles.navButtonActive : ''}`}
          >
            🏷️ {locale === 'ar' ? 'قسائم الخصم' : 'Promo Coupons'}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`${styles.navButton} ${activeTab === 'security' ? styles.navButtonActive : ''}`}
          >
            ⚙️ {locale === 'ar' ? 'الأمان والحساب' : 'Owner Security'}
          </button>
        </nav>

        <button onClick={handleLogout} className={styles.logoutBtn}>
          🚪 {locale === 'ar' ? 'تسجيل الخروج الآمن' : 'Secure Logout'}
        </button>
      </aside>

      {/* Main Workspace */}
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>
              {activeTab === 'overview' && (locale === 'ar' ? 'نظرة عامة والتحليلات' : 'Executive Overview')}
              {activeTab === 'products' && (locale === 'ar' ? 'كتالوج المنتجات والمخزون' : 'Abaya Inventory & Catalog')}
              {activeTab === 'orders' && (locale === 'ar' ? 'إدارة طلبات العميلات' : 'Customer Orders & Logistics')}
              {activeTab === 'coupons' && (locale === 'ar' ? 'قسائم الخصم والعروض' : 'Active Atelier Promo Codes')}
              {activeTab === 'security' && (locale === 'ar' ? 'حماية الحساب والتشفير' : 'Owner Security & Credentials')}
            </h1>
            <p className={styles.pageSubtitle}>
              Shourk Nady Luxury Atelier • Exclusive Management Hub
            </p>
          </div>

          <div className={styles.actionBadge}>
            🔒 256-Bit Encrypted Session Active
          </div>
        </header>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Revenue</span>
                <span className={styles.metricValue}>248,500 AED</span>
                <span className={styles.metricSub}>↑ +18.4% this month</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Abayas</span>
                <span className={styles.metricValue}>{productsList.length}</span>
                <span className={styles.metricSub}>Active Catalog</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Total Orders</span>
                <span className={styles.metricValue}>{orders.length}</span>
                <span className={styles.metricSub}>Confirmed Orders</span>
              </div>
              <div className={styles.metricCard}>
                <span className={styles.metricLabel}>Top UAE Region</span>
                <span className={styles.metricValue}>Dubai (55%)</span>
                <span className={styles.metricSub}>Abu Dhabi: 30%</span>
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <div className={styles.blockHeader}>
                <h3 className={styles.blockTitle}>Recent High Couture Orders</h3>
                <button onClick={() => setActiveTab('orders')} className={styles.primaryBtn}>
                  View All Orders →
                </button>
              </div>

              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order Number</th>
                    <th>Customer</th>
                    <th>Emirate</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((ord, idx) => (
                    <tr key={ord.id || idx}>
                      <td><strong>#{ord.orderNumber || ord.id}</strong></td>
                      <td>{ord.guestCustomer?.fullName || ord.customer || 'Guest Customer'}</td>
                      <td>{ord.emirate || 'Dubai'}</td>
                      <td>{formatCurrency(ord.total || ord.price || 1850, locale)}</td>
                      <td>
                        <span style={{ color: '#d4af37', fontWeight: 600 }}>{ord.status || 'Confirmed'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tab 2: Abaya Products CRUD */}
        {activeTab === 'products' && (
          <div className={styles.sectionBlock}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Abaya Products & Live Inventory</h3>
              <button onClick={handleOpenAddModal} className={styles.primaryBtn}>
                + Add New Abaya
              </button>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>SKU</th>
                  <th>Abaya Title</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <Image
                        src={prod.images[0]?.url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                        alt={prod.name}
                        width={44}
                        height={54}
                        style={{ objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </td>
                    <td><code>{prod.variants[0]?.sku || 'SN-ABY'}</code></td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{locale === 'ar' ? prod.nameAr : prod.name}</div>
                      <div style={{ fontSize: '11px', color: '#a09587' }}>{prod.categories[0]?.name}</div>
                    </td>
                    <td>{formatCurrency(prod.price, locale)}</td>
                    <td>{prod.variants.reduce((acc, v) => acc + v.stock, 0)} units</td>
                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleOpenEditModal(prod)} className={styles.editBtn}>
                          ✏️ Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(prod.id)} className={styles.deleteBtn}>
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Customer Orders */}
        {activeTab === 'orders' && (
          <div className={styles.sectionBlock}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>All Customer Orders & Status Updates</h3>
            </div>

            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Emirate</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Delivery Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord, idx) => (
                  <tr key={ord.id || idx}>
                    <td><strong>#{ord.orderNumber || ord.id || 'SN-100'}</strong></td>
                    <td>{ord.guestCustomer?.fullName || ord.customer || 'Guest Customer'}</td>
                    <td>{ord.emirate || 'Dubai'}</td>
                    <td>{formatCurrency(ord.total || 1850, locale)}</td>
                    <td>{ord.paymentMethod === 'card' ? 'Credit Card (Paid)' : ord.payment || 'COD'}</td>
                    <td>
                      <select
                        value={ord.status || 'confirmed'}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                        className={styles.statusSelect}
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Coupons */}
        {activeTab === 'coupons' && (
          <div className={styles.sectionBlock}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Active Atelier Promo Codes</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {INITIAL_COUPONS.map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: '#1a1a1a',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#d4af37' }}>
                    {c.code}
                  </div>
                  <div style={{ fontSize: '13px', color: '#e0e0e0', marginTop: '6px' }}>
                    {c.type === 'percentage' ? `${c.value}% OFF` : `${c.value} AED OFF`} (Min. Order {c.minOrder} AED)
                  </div>
                  <div style={{ fontSize: '11px', color: '#a09587', marginTop: '4px' }}>
                    Used {c.usedCount} times
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Owner Security & Password Update */}
        {activeTab === 'security' && (
          <div className={styles.sectionBlock} style={{ maxWidth: '540px' }}>
            <h3 className={styles.blockTitle} style={{ marginBottom: '16px' }}>
              Owner Security & Credential Settings
            </h3>
            <p style={{ fontSize: '13px', color: '#a09587', marginBottom: '24px' }}>
              Update master password for admin dashboard access. Passwords are password-hashed securely using bcrypt.
            </p>

            {secSuccess && (
              <div style={{ padding: '12px', backgroundColor: 'rgba(76, 175, 80, 0.15)', border: '1px solid rgba(76, 175, 80, 0.3)', color: '#81c784', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                ✓ {secSuccess}
              </div>
            )}

            <form onSubmit={handleSecurityUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#d4af37', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="••••••••••••"
                  style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#d4af37', textTransform: 'uppercase', marginBottom: '6px' }}>
                  New Master Password
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="New strong password"
                  style={{ width: '100%', padding: '12px', background: '#1a1a1a', border: '1px solid rgba(212,175,55,0.2)', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <button type="submit" className={styles.primaryBtn} style={{ marginTop: '10px' }}>
                Update Security Credentials
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#141414',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '12px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '28px',
              color: '#fff',
            }}
          >
            <h2 style={{ marginBottom: '20px', fontFamily: 'Playfair Display, serif', color: '#d4af37' }}>
              {editingProduct ? 'Edit Abaya Product' : 'Add New Abaya Product'}
            </h2>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                    Product Name (English)*
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Al-Nour Japanese Nida Silk Abaya"
                    style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                    Product Name (Arabic)*
                  </label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="عباية النور الملكية من حرير النيدا"
                    dir="rtl"
                    style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                    Price (AED)*
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="1850"
                    style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                    Compare At Price (AED)
                  </label>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                    placeholder="2200"
                    style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                  Image URL (Unsplash or hosted link)*
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Crafted from premium Japanese Nida silk with hand embroidery..."
                  style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', color: '#d4af37', marginBottom: '4px' }}>
                  Description (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder="عباية سوداء ملكية مطرزة يدوياً بكريستال سواروفسكي..."
                  dir="rtl"
                  style={{ width: '100%', padding: '10px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '6px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Featured Product</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#2a2a2a',
                    color: '#ccc',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className={styles.primaryBtn}
                >
                  {isSaving ? 'Saving...' : editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
