'use server';

import { prisma } from '@/lib/prisma';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COLLECTIONS } from '@/data/products';
import { Product, Category, Collection } from '@/types';

/**
 * Get all active products from DB or fallback
 */
export async function getProducts(options?: {
  categorySlug?: string;
  collectionSlug?: string;
  featuredOnly?: boolean;
  newArrivalsOnly?: boolean;
  bestSellersOnly?: boolean;
  searchQuery?: string;
}): Promise<Product[]> {
  try {
    const where: any = { status: 'active' };

    if (options?.featuredOnly) where.isFeatured = true;
    if (options?.newArrivalsOnly) where.isNewArrival = true;
    if (options?.bestSellersOnly) where.isBestSeller = true;

    if (options?.categorySlug) {
      where.categories = {
        some: {
          category: {
            slug: options.categorySlug,
          },
        },
      };
    }

    if (options?.collectionSlug) {
      where.collections = {
        some: {
          collection: {
            slug: options.collectionSlug,
          },
        },
      };
    }

    if (options?.searchQuery) {
      const q = options.searchQuery.toLowerCase();
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { nameAr: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { descriptionAr: { contains: q, mode: 'insensitive' } },
      ];
    }

    const dbProducts = await prisma.product.findMany({
      where,
      include: {
        images: { orderBy: { position: 'asc' } },
        variants: { include: { size: true } },
        categories: { include: { category: true } },
        collections: { include: { collection: true } },
        colors: { include: { color: true } },
        sizes: { include: { size: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        nameAr: p.nameAr,
        description: p.description,
        descriptionAr: p.descriptionAr,
        shortDescription: p.shortDescription,
        shortDescriptionAr: p.shortDescriptionAr,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? undefined,
        images: p.images.map((img) => ({
          id: img.id,
          url: img.url,
          alt: img.alt,
          position: img.position,
          isVideo: img.isVideo,
        })),
        variants: p.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          price: v.price,
          compareAtPrice: v.compareAtPrice ?? undefined,
          size: v.size ? { id: v.size.id, name: v.size.name, position: v.size.position } : undefined,
          stock: v.stock,
          reservedStock: v.reservedStock,
        })),
        categories: p.categories.map((c) => ({
          id: c.category.id,
          slug: c.category.slug,
          name: c.category.name,
          nameAr: c.category.nameAr,
          description: c.category.description ?? undefined,
          descriptionAr: c.category.descriptionAr ?? undefined,
          image: c.category.image ?? undefined,
          position: c.category.position,
        })),
        collections: p.collections.map((col) => ({
          id: col.collection.id,
          slug: col.collection.slug,
          name: col.collection.name,
          nameAr: col.collection.nameAr,
          description: col.collection.description ?? undefined,
          descriptionAr: col.collection.descriptionAr ?? undefined,
          image: col.collection.image ?? undefined,
          isActive: col.collection.isActive,
          position: col.collection.position,
        })),
        colors: p.colors.map((clr) => ({
          id: clr.color.id,
          name: clr.color.name,
          nameAr: clr.color.nameAr,
          hexCode: clr.color.hexCode,
        })),
        sizes: p.sizes.map((s) => ({
          id: s.size.id,
          name: s.size.name,
          position: s.size.position,
        })),
        material: p.material ?? undefined,
        materialAr: p.materialAr ?? undefined,
        careInstructions: p.careInstructions ?? undefined,
        careInstructionsAr: p.careInstructionsAr ?? undefined,
        averageRating: p.averageRating,
        reviewCount: p.reviewCount,
        isFeatured: p.isFeatured,
        isNewArrival: p.isNewArrival,
        isBestSeller: p.isBestSeller,
        status: (p.status as 'active' | 'draft' | 'archived') || 'active',
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      }));
    }
  } catch (error) {
    console.warn('Database query failed or not connected, serving local data:', error);
  }

  // Fallback to in-memory INITIAL_PRODUCTS with filters
  let filtered = [...INITIAL_PRODUCTS];
  if (options?.featuredOnly) filtered = filtered.filter((p) => p.isFeatured);
  if (options?.newArrivalsOnly) filtered = filtered.filter((p) => p.isNewArrival);
  if (options?.bestSellersOnly) filtered = filtered.filter((p) => p.isBestSeller);
  if (options?.categorySlug) {
    filtered = filtered.filter((p) => p.categories.some((c) => c.slug === options.categorySlug));
  }
  if (options?.collectionSlug) {
    filtered = filtered.filter((p) => p.collections?.some((col) => col.slug === options.collectionSlug));
  }
  if (options?.searchQuery) {
    const q = options.searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.descriptionAr.includes(q)
    );
  }
  return filtered;
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const prod = products.find((p) => p.slug === slug);
  return prod || null;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { position: 'asc' },
    });
    if (dbCategories && dbCategories.length > 0) {
      return dbCategories.map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        nameAr: c.nameAr,
        description: c.description ?? undefined,
        descriptionAr: c.descriptionAr ?? undefined,
        image: c.image ?? undefined,
        position: c.position,
      }));
    }
  } catch (error) {
    console.warn('Database query failed, returning fallback categories:', error);
  }
  return INITIAL_CATEGORIES;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

/**
 * Get all collections
 */
export async function getCollections(): Promise<Collection[]> {
  try {
    const dbCollections = await prisma.collection.findMany({
      where: { isActive: true },
      orderBy: { position: 'asc' },
    });
    if (dbCollections && dbCollections.length > 0) {
      return dbCollections.map((col) => ({
        id: col.id,
        slug: col.slug,
        name: col.name,
        nameAr: col.nameAr,
        description: col.description ?? undefined,
        descriptionAr: col.descriptionAr ?? undefined,
        image: col.image ?? undefined,
        isActive: col.isActive,
        position: col.position,
      }));
    }
  } catch (error) {
    console.warn('Database query failed, returning fallback collections:', error);
  }
  return INITIAL_COLLECTIONS;
}

/**
 * Get collection by slug
 */
export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const collections = await getCollections();
  return collections.find((col) => col.slug === slug) || null;
}

/**
 * Admin Action: Create Product
 */
export async function createProductAction(data: {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  compareAtPrice?: number;
  images: { url: string; alt?: string; position?: number }[];
  categoryIds?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const product = await prisma.product.create({
      data: {
        slug,
        name: data.name,
        nameAr: data.nameAr,
        description: data.description,
        descriptionAr: data.descriptionAr,
        shortDescription: data.description.substring(0, 100),
        shortDescriptionAr: data.descriptionAr.substring(0, 100),
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        isFeatured: data.isFeatured ?? false,
        isNewArrival: data.isNewArrival ?? true,
        isBestSeller: data.isBestSeller ?? false,
        images: {
          create: data.images.map((img, i) => ({
            url: img.url,
            alt: img.alt || data.name,
            position: img.position ?? i + 1,
          })),
        },
        categories: data.categoryIds
          ? {
              create: data.categoryIds.map((catId) => ({ categoryId: catId })),
            }
          : undefined,
      },
    });

    return { success: true, product };
  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message || 'Failed to create product' };
  }
}
