'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { INITIAL_COUPONS } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { getProducts, createProductAction } from '@/actions/products';
import { getOrdersAction } from '@/actions/orders';
import { Product } from '@/types';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  const { locale } = useLanguage();
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const prods = await getProducts();
      setProductsList(prods);

      const ordRes = await getOrdersAction();
      if (ordRes.success && ordRes.orders.length > 0) {
        setOrders(ordRes.orders);
      } else {
        // Fallback mock orders
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
    } catch (e) {
      console.error('Error loading admin data:', e);
    } finally {
      setIsLoading(false);
    }
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
        // Edit in memory / state
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
                  images: [{ id: 'img-new', url: imageUrl, alt: name, position: 1 }],
                  isFeatured,
                  isNewArrival,
                }
              : p
          )
        );
      } else {
        // Create product via Server Action
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
    if (confirm('Are you sure you want to delete this product?')) {
      setProductsList((prev) => prev.filter((p) => p.id !== productId));
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <div className="container" style={{ paddingBlock: 'var(--space-12)' }}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {locale === 'ar' ? 'لوحة تحكم الاتيليه والإدارة' : 'Atelier Admin & Operations Portal'}
          </h1>
          <p style={{ color: 'var(--color-taupe)', fontSize: 'var(--text-xs)' }}>
            Shourk Nady Luxury Atelier • Database Management & Live Inventory
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleOpenAddModal}
            style={{
              padding: '10px 20px',
              backgroundColor: 'var(--color-champagne-dark)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-xs)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + {locale === 'ar' ? 'إضافة عباية جديدة' : 'Add New Abaya'}
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{locale === 'ar' ? 'إجمالي المبيعات' : 'Total Revenue'}</span>
          <span className={styles.metricValue}>248,500 AED</span>
          <span className={styles.metricChange}>↑ +18.4% this month</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{locale === 'ar' ? 'إجمالي المنتجات' : 'Total Abayas'}</span>
          <span className={styles.metricValue}>{productsList.length}</span>
          <span className={styles.metricChange}>Active in Atelier</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{locale === 'ar' ? 'عدد الطلبات' : 'Total Orders'}</span>
          <span className={styles.metricValue}>{orders.length}</span>
          <span className={styles.metricChange}>Confirmed Orders</span>
        </div>

        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>{locale === 'ar' ? 'أعلى إمارة طلباً' : 'Top UAE Region'}</span>
          <span className={styles.metricValue}>Dubai (55%)</span>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>Abu Dhabi: 30%</span>
        </div>
      </div>

      {/* Inventory & Product Management Table */}
      <div className={styles.sectionBlock}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 className={styles.blockHeader} style={{ marginBottom: 0 }}>
            {locale === 'ar' ? 'إدارة مخزون العبايات والمنتجات' : 'Abaya Stock & Inventory Management'}
          </h3>
          <button
            onClick={handleOpenAddModal}
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-black)',
              color: 'var(--color-ivory)',
              borderRadius: 'var(--radius-xs)',
              cursor: 'pointer',
            }}
          >
            + {locale === 'ar' ? 'إضافة عباية' : 'Add Product'}
          </button>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>{locale === 'ar' ? 'الصورة' : 'Image'}</th>
              <th>SKU</th>
              <th>{locale === 'ar' ? 'اسم العباية' : 'Abaya Title'}</th>
              <th>{locale === 'ar' ? 'السعر' : 'Price'}</th>
              <th>{locale === 'ar' ? 'المخزون' : 'Stock'}</th>
              <th>{locale === 'ar' ? 'الإجراءات' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map((prod) => (
              <tr key={prod.id}>
                <td>
                  <Image
                    src={prod.images[0]?.url || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200'}
                    alt={prod.name}
                    width={40}
                    height={50}
                    style={{ objectFit: 'cover', borderRadius: '4px' }}
                  />
                </td>
                <td><code>{prod.variants[0]?.sku || 'SN-ABY'}</code></td>
                <td>
                  <div style={{ fontWeight: 600 }}>{locale === 'ar' ? prod.nameAr : prod.name}</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-taupe)' }}>
                    {prod.categories[0]?.name}
                  </div>
                </td>
                <td>{formatCurrency(prod.price, locale)}</td>
                <td>{prod.variants.reduce((acc, v) => acc + v.stock, 0)} units</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditModal(prod)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: 'var(--color-cream)',
                        border: '1px solid var(--color-sand)',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(prod.id)}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        border: 'none',
                        borderRadius: 'var(--radius-xs)',
                        cursor: 'pointer',
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Orders Management */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.blockHeader}>
          {locale === 'ar' ? 'إدارة الطلبات الفاخرة' : 'Recent UAE Customer Orders'}
        </h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{locale === 'ar' ? 'رقم الطلب' : 'Order ID'}</th>
              <th>{locale === 'ar' ? 'اسم العميلة' : 'Customer'}</th>
              <th>{locale === 'ar' ? 'الإمارة' : 'Emirate'}</th>
              <th>{locale === 'ar' ? 'الإجمالي' : 'Total'}</th>
              <th>{locale === 'ar' ? 'طريقة الدفع' : 'Payment'}</th>
              <th>{locale === 'ar' ? 'حالة التوصيل' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord, idx) => (
              <tr key={ord.id || ord.orderNumber || idx}>
                <td><strong>#{ord.orderNumber || ord.id || 'SN-100'}</strong></td>
                <td>{ord.guestCustomer?.fullName || ord.customer || 'Guest Customer'}</td>
                <td>{ord.emirate || 'Dubai'}</td>
                <td>{formatCurrency(ord.total, locale)}</td>
                <td>{ord.paymentMethod === 'card' ? 'Credit Card (Paid)' : ord.payment || 'COD'}</td>
                <td>
                  <select
                    value={ord.status || 'confirmed'}
                    onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: 'var(--text-xs)',
                      backgroundColor: 'var(--color-cream)',
                    }}
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

      {/* Product Add / Edit Modal */}
      {showProductModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '24px',
            }}
          >
            <h2 style={{ marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
              {editingProduct ? 'Edit Abaya Product' : 'Add New Abaya Product'}
            </h2>

            <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Product Name (English)*
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Al-Nour Japanese Nida Silk Abaya"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Product Name (Arabic)*
                  </label>
                  <input
                    type="text"
                    required
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="عباية النور الملكية من حرير النيدا"
                    dir="rtl"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Price (AED)*
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    placeholder="1850"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                    Compare At Price (AED)
                  </label>
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(Number(e.target.value))}
                    placeholder="2200"
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  Image URL (Unsplash or hosted image link)*
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  Description (English)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Crafted from premium Japanese Nida silk with hand embroidery..."
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>
                  Description (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder="عباية سوداء ملكية مطرزة يدوياً بكريستال سواروفسكي..."
                  dir="rtl"
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                  />
                  <span>Featured Product</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                  />
                  <span>New Arrival</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#e0e0e0',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-black)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {isSaving ? 'Saving...' : editingProduct ? 'Update Product' : 'Save New Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
