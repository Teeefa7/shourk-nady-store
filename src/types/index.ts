/* ============================================================
   SHOURK NADY -- TypeScript Types
   ============================================================ */

// -- Locale --------------------------------------------------

export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

// -- Product -------------------------------------------------

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  shortDescription: string;
  shortDescriptionAr: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  categories: Category[];
  collections: Collection[];
  colors: Color[];
  sizes: Size[];
  material?: string;
  materialAr?: string;
  careInstructions?: string;
  careInstructionsAr?: string;
  averageRating: number;
  reviewCount: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  position: number;
  isVideo?: boolean;
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  reservedStock: number;
  size?: Size;
  color?: Color;
  images?: ProductImage[];
}

export interface Size {
  id: string;
  name: string;
  position: number;
}

export interface Color {
  id: string;
  name: string;
  nameAr: string;
  hexCode: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  parentId?: string;
  position: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
  isActive: boolean;
  position: number;
}

// -- Cart ----------------------------------------------------

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  size: Size;
  color: Color;
  quantity: number;
  price: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  vat: number;
  total: number;
  coupon?: Coupon;
  itemCount: number;
}

// -- Wishlist ------------------------------------------------

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

// -- Order ---------------------------------------------------

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentMethod = 'card' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  codFee: number;
  vat: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  shippingAddress: Address;
  trackingNumber?: string;
  coupon?: Coupon;
  notes?: string;
  statusHistory: OrderStatusEntry[];
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  productNameAr: string;
  productImage: string;
  sku: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  colorHex: string;
}

export interface OrderStatusEntry {
  status: OrderStatus;
  note?: string;
  createdAt: string;
}

// -- Customer ------------------------------------------------

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  locale: Locale;
  addresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  emirate: Emirates;
  area: string;
  building: string;
  apartment: string;
  street: string;
  instructions?: string;
  isDefault: boolean;
}

export type Emirates =
  | 'abu_dhabi'
  | 'dubai'
  | 'sharjah'
  | 'ajman'
  | 'umm_al_quwain'
  | 'ras_al_khaimah'
  | 'fujairah';

// -- Coupon --------------------------------------------------

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrder?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startsAt?: string;
  expiresAt?: string;
  isActive: boolean;
}

// -- Shipping ------------------------------------------------

export interface ShippingZone {
  id: string;
  name: string;
  emirate: Emirates;
  methods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  estimatedDays: number;
  isActive: boolean;
}

// -- Review --------------------------------------------------

export interface Review {
  id: string;
  productId: string;
  customer: {
    name: string;
    avatar?: string;
  };
  rating: number;
  title: string;
  body: string;
  images: string[];
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// -- Payment -------------------------------------------------

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId: string;
  error?: string;
}

// -- Notification --------------------------------------------

export interface Notification {
  id: string;
  type: 'order' | 'payment' | 'shipping' | 'promo' | 'system';
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

// -- Site Settings -------------------------------------------

export interface SiteSettings {
  vatRate: number;          // e.g., 0.05 for 5%
  currency: string;         // AED
  freeShippingThreshold: number;
  codFee: number;
  defaultLocale: Locale;
}

// -- Hero Banner ---------------------------------------------

export interface HeroBanner {
  id: string;
  image: string;
  imageMobile?: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  ctaText: string;
  ctaTextAr: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaTextAr?: string;
  secondaryCtaLink?: string;
  position: number;
  isActive: boolean;
}

// -- Admin Analytics -----------------------------------------

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderValue: number;
  salesGrowth: number;
  ordersGrowth: number;
  revenueByDay: { date: string; revenue: number }[];
  bestSellingProducts: { product: Product; sold: number }[];
  lowStockProducts: { product: Product; stock: number }[];
  recentOrders: Order[];
  ordersByStatus: { status: OrderStatus; count: number }[];
}

// -- API Response --------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// -- Filter & Sort -------------------------------------------

export interface ProductFilters {
  category?: string;
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  sizes?: string[];
  colors?: string[];
  materials?: string[];
  inStock?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  hasDiscount?: boolean;
  search?: string;
}

export type ProductSort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'popular'
  | 'rating';

// -- Checkout ------------------------------------------------

export interface CheckoutData {
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  shippingAddress: Omit<Address, 'id' | 'isDefault'>;
  shippingMethodId: string;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  notes?: string;
}
