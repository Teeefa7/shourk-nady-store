import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Shourk Nady database...');

  // -- Clear existing data --
  await prisma.orderStatusEntry.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.guestCustomer.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.productCollection.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.productSize.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.color.deleteMany();
  await prisma.size.deleteMany();
  await prisma.heroBanner.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.shippingMethod.deleteMany();

  // -- Categories --
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'cat-1',
        slug: 'classic-abayas',
        name: 'Classic Abayas',
        nameAr: 'عبايات كلاسيكية',
        description: 'Timeless black abayas crafted from premium Japanese Nida silk with refined minimal tailoring.',
        descriptionAr: 'عبايات سوداء فاخرة مصممة من حرير النيدا الياباني الراقي بلمسات عصرية أنيقة.',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop',
        position: 1,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-2',
        slug: 'embroidered-abayas',
        name: 'Embroidered & Beaded',
        nameAr: 'عبايات مطرزة ومطرزة بالخرز',
        description: 'Intricate hand-embroidery, zardosi work, and Swarovski crystal accents for special occasions.',
        descriptionAr: 'تطريز يدوي متقن مع لمسات الكريستال والخرز الفاخر للمناسبات والأعياد.',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop',
        position: 2,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-3',
        slug: 'silk-kaftans',
        name: 'Silk Kaftans',
        nameAr: 'قفاطين حريرية',
        description: 'Flowing pure silk and chiffon kaftans designed with opulent drapes and gold metallic threads.',
        descriptionAr: 'قفاطين انسيابية من الحرير الطبيعي والشيفون المطرز بخيوط ذهبية راقية.',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
        position: 3,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-4',
        slug: 'linen-casual',
        name: 'Linen & Travel Wear',
        nameAr: 'عبايات الكتان والسفر',
        description: 'Breathable organic linen and lightweight cotton abayas perfect for summer heat and luxury travel.',
        descriptionAr: 'عبايات من الكتان الطبيعي الخفيف والأقمشة المريحة المثالية للسفر والأجواء الصيفية.',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
        position: 4,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-5',
        slug: 'evening-abayas',
        name: 'Evening & Couture',
        nameAr: 'عبايات السهرة والسهرات',
        description: 'Dramatic velvet accents, organza layers, and couture silhouettes for galas and weddings.',
        descriptionAr: 'تصاميم كوتور فاخرة من المخمل والأورجانزا لمناسبات الأعراس والسهرات الملكية.',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop',
        position: 5,
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat-6',
        slug: 'hijabs-accessories',
        name: 'Luxury Hijabs & Accessories',
        nameAr: 'طرح وإكسسوارات فاخرة',
        description: 'Matching Japanese crepe hijabs, silk sheilas, magnetic brooches, and velvet abaya bags.',
        descriptionAr: 'طرح وشيلات من الكريب الياباني والحرير بالإضافة إلى مشابك مغناطيسية وحقائب عباية.',
        image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop',
        position: 6,
      },
    }),
  ]);

  // -- Collections --
  const collections = await Promise.all([
    prisma.collection.create({
      data: {
        id: 'col-ramadan-2026',
        slug: 'ramadan-2026',
        name: 'Ramadan Royal Edition 2026',
        nameAr: 'تشكيلة رمضان الملكية ٢٠٢٦',
        description: 'A regal collection inspired by Arabian heritage, featuring gold thread accents and majestic drapes.',
        descriptionAr: 'مجموعة مستوحاة من التراث العربي الفاخر مع لمسات الخيوط الذهبية والقصات الملكية.',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
        isActive: true,
        position: 1,
      },
    }),
    prisma.collection.create({
      data: {
        id: 'col-dubai-nights',
        slug: 'dubai-nights',
        name: 'Dubai Velvet & Couture',
        nameAr: 'مجموعة ليالي دبي المخملية',
        description: 'Modern sophisticated couture designed for high fashion galas in Dubai and Abu Dhabi.',
        descriptionAr: 'تصاميم كوتور راقية تنبض بالأناقة لإطلالات السهرات والأمسيات الراعية.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
        isActive: true,
        position: 2,
      },
    }),
    prisma.collection.create({
      data: {
        id: 'col-desert-breeze',
        slug: 'desert-breeze',
        name: 'Desert Silk & Linen Collection',
        nameAr: 'مجموعة نسيم الصحراء الحريرة',
        description: 'Lightweight linen, beige tones, and ivory drapes engineered for ultimate elegance and comfort.',
        descriptionAr: 'حرير وكتان بألوان البيج والعاجي مريحة ومصممة للأجواء الدفيئة وأوقات السفر.',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop',
        isActive: true,
        position: 3,
      },
    }),
  ]);

  // -- Colors --
  const colors = await Promise.all([
    prisma.color.create({ data: { id: 'color-black', name: 'Royal Midnight Black', nameAr: 'أسود ملكي فاخر', hexCode: '#0A0A0A' } }),
    prisma.color.create({ data: { id: 'color-champagne', name: 'Desert Gold & Champagne', nameAr: 'ذهبي شامبين', hexCode: '#D4AF37' } }),
    prisma.color.create({ data: { id: 'color-olive', name: 'Oasis Olive Green', nameAr: 'أخضر زيتي واحة', hexCode: '#3B4D3C' } }),
    prisma.color.create({ data: { id: 'color-navy', name: 'Arabian Night Navy', nameAr: 'كحلي ليلي', hexCode: '#1B263B' } }),
    prisma.color.create({ data: { id: 'color-ivory', name: 'Pearl Ivory', nameAr: 'عاجي لؤلؤي', hexCode: '#FDFBF7' } }),
    prisma.color.create({ data: { id: 'color-taupe', name: 'Dune Taupe', nameAr: 'توب رمادي دافئ', hexCode: '#8C7A6B' } }),
  ]);

  // -- Sizes --
  const sizes = await Promise.all([
    prisma.size.create({ data: { id: 'size-52', name: '52 (XS - 150-155 cm)', position: 1 } }),
    prisma.size.create({ data: { id: 'size-54', name: '54 (S - 156-160 cm)', position: 2 } }),
    prisma.size.create({ data: { id: 'size-56', name: '56 (M - 161-165 cm)', position: 3 } }),
    prisma.size.create({ data: { id: 'size-58', name: '58 (L - 166-170 cm)', position: 4 } }),
    prisma.size.create({ data: { id: 'size-60', name: '60 (XL - 171-175 cm)', position: 5 } }),
    prisma.size.create({ data: { id: 'size-onesize', name: 'One Size (200 x 75 cm)', position: 6 } }),
  ]);

  // -- Products --

  // Product 1: Al-Noor Royal Japanese Nida Abaya
  const prod1 = await prisma.product.create({
    data: {
      slug: 'royal-nida-crystal-abaya',
      name: 'Al-Noor Royal Japanese Nida Abaya',
      nameAr: 'عباية النور الملكية من النيدا الياباني',
      description: 'Crafted from original high-density Japanese Silk Nida fabric, this flagship abaya features hand-sewn Swarovski crystal embellishments along the sleeves and collar line. Includes a matching chiffon sheila with beaded edges.',
      descriptionAr: 'مصنوعة من قماش النيدا الياباني الأصلي الفاخر، تتميز هذه العباية بتطريز يدوي دقيق بكريستال سواروفسكي على الأكمام وياقة العباية. تأتي مع شيلة شيفون مطابقة.',
      shortDescription: 'Flagship Japanese Nida black abaya with Swarovski sleeve crystals.',
      shortDescriptionAr: 'عباية سوداء ملكية من النيدا الياباني مع تطريز سواروفسكي على الأكمام.',
      price: 1850,
      compareAtPrice: 2200,
      material: '100% Premium Japanese Silk Nida',
      materialAr: '١٠٠٪ حرير نيدا ياباني فاخر',
      careInstructions: 'Dry clean only. Store in garment cover bag.',
      careInstructionsAr: 'تنظيف جاف فقط. يحفظ في حقيبة حماية الملابس.',
      averageRating: 4.9,
      reviewCount: 38,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: true,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop', alt: 'Al-Noor Royal Abaya Front View', position: 1 },
          { url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1200&auto=format&fit=crop', alt: 'Al-Noor Royal Abaya Sleeve Detail', position: 2 },
          { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop', alt: 'Al-Noor Royal Abaya Back Silhouette', position: 3 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-RNA-52', price: 1850, compareAtPrice: 2200, stock: 12, reservedStock: 0, sizeId: 'size-52' },
          { sku: 'SN-RNA-54', price: 1850, compareAtPrice: 2200, stock: 8, reservedStock: 1, sizeId: 'size-54' },
          { sku: 'SN-RNA-56', price: 1850, compareAtPrice: 2200, stock: 15, reservedStock: 0, sizeId: 'size-56' },
          { sku: 'SN-RNA-58', price: 1850, compareAtPrice: 2200, stock: 5, reservedStock: 0, sizeId: 'size-58' },
        ],
      },
      categories: {
        create: [
          { categoryId: 'cat-1' },
          { categoryId: 'cat-2' },
        ],
      },
      collections: {
        create: [
          { collectionId: 'col-ramadan-2026' },
        ],
      },
      colors: {
        create: [
          { colorId: 'color-black' },
          { colorId: 'color-champagne' },
        ],
      },
      sizes: {
        create: [
          { sizeId: 'size-52' },
          { sizeId: 'size-54' },
          { sizeId: 'size-56' },
          { sizeId: 'size-58' },
        ],
      },
    },
  });

  // Product 2: Sheikha Gold Thread Chiffon Kaftan
  const prod2 = await prisma.product.create({
    data: {
      slug: 'sheikha-gold-thread-kaftan',
      name: 'Sheikha Gold Thread Chiffon Kaftan',
      nameAr: 'قفطان الشيخة المطرز بالخيوط الذهبية',
      description: 'An ethereal evening kaftan featuring pure silk chiffon over an opaque inner slip. Embroidered with intricate French metallic gold threads along the open front and dramatic winged sleeves.',
      descriptionAr: 'قفطان سهرة ساحر مصمم من الشيفون الحريري الخالص مع فستان داخلي ناعم. مطرز بخيوط ذهبية فرنسية براقة على كامل الطول والأكمام المفتوحة.',
      shortDescription: 'Pure silk chiffon kaftan with French metallic gold hand-embroidery.',
      shortDescriptionAr: 'قفطان حرير شيفون خفيف مع تطريز ذهبي فرنسي فاخر.',
      price: 2450,
      compareAtPrice: 2900,
      material: 'Pure Chiffon Silk with Gold Thread',
      materialAr: 'شيفون حرير طبيعي بخيوط القصب الذهبية',
      careInstructions: 'Specialist dry clean only.',
      careInstructionsAr: 'تنظيف جاف متخصص فقط.',
      averageRating: 5.0,
      reviewCount: 24,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: true,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', alt: 'Sheikha Kaftan Front View', position: 1 },
          { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop', alt: 'Sheikha Kaftan Gold Detail', position: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-SGK-54', price: 2450, compareAtPrice: 2900, stock: 4, reservedStock: 0, sizeId: 'size-54' },
          { sku: 'SN-SGK-56', price: 2450, compareAtPrice: 2900, stock: 7, reservedStock: 0, sizeId: 'size-56' },
          { sku: 'SN-SGK-58', price: 2450, compareAtPrice: 2900, stock: 3, reservedStock: 0, sizeId: 'size-58' },
        ],
      },
      categories: {
        create: [
          { categoryId: 'cat-3' },
          { categoryId: 'cat-5' },
        ],
      },
      collections: {
        create: [
          { collectionId: 'col-ramadan-2026' },
          { collectionId: 'col-dubai-nights' },
        ],
      },
      colors: {
        create: [
          { colorId: 'color-champagne' },
          { colorId: 'color-ivory' },
        ],
      },
      sizes: {
        create: [
          { sizeId: 'size-54' },
          { sizeId: 'size-56' },
          { sizeId: 'size-58' },
        ],
      },
    },
  });

  // Product 3: Dune Organic Beige Linen Abaya
  const prod3 = await prisma.product.create({
    data: {
      slug: 'dune-organic-linen-abaya',
      name: 'Dune Organic Beige Linen Abaya',
      nameAr: 'عباية الكتان الصحراوي العضوي باللون البيج',
      description: 'Designed for the modern Emirates traveler, crafted from 100% natural organic French flax linen. Cool, breathable, featuring concealed side pockets and lapel detailing.',
      descriptionAr: 'مصممة خصيصاً للمرأة العصرية في أوقات السفر والأجواء الدافئة من الكتان الفرنسي العضوي الطبيعي. خفيفة مع جيوب جانبية مخفية وقصة ياقة أنيقة.',
      shortDescription: '100% organic French flax linen open front casual abaya.',
      shortDescriptionAr: 'عباية كتان فرنسي عضوي بيج مريحة وأنيقة للسفر.',
      price: 1350,
      compareAtPrice: 1550,
      material: '100% Pure Organic Linen',
      materialAr: '١٠٠٪ كتان فرنسي عضوي خفيف',
      careInstructions: 'Gentle hand wash cold or delicate dry clean.',
      careInstructionsAr: 'غسيل يدوي بارد لطيف أو تنظيف جاف دقيق.',
      averageRating: 4.8,
      reviewCount: 19,
      isFeatured: true,
      isNewArrival: false,
      isBestSeller: true,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop', alt: 'Dune Linen Abaya', position: 1 },
          { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200&auto=format&fit=crop', alt: 'Dune Linen Detail', position: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-DLA-52', price: 1350, stock: 10, reservedStock: 0, sizeId: 'size-52' },
          { sku: 'SN-DLA-54', price: 1350, stock: 14, reservedStock: 0, sizeId: 'size-54' },
          { sku: 'SN-DLA-56', price: 1350, stock: 9, reservedStock: 0, sizeId: 'size-56' },
          { sku: 'SN-DLA-58', price: 1350, stock: 6, reservedStock: 0, sizeId: 'size-58' },
        ],
      },
      categories: { create: [{ categoryId: 'cat-4' }] },
      collections: { create: [{ collectionId: 'col-desert-breeze' }] },
      colors: { create: [{ colorId: 'color-taupe' }, { colorId: 'color-ivory' }] },
      sizes: { create: [{ sizeId: 'size-52' }, { sizeId: 'size-54' }, { sizeId: 'size-56' }, { sizeId: 'size-58' }] },
    },
  });

  // Product 4: Emerald Oasis Royal Velvet Couture Abaya
  const prod4 = await prisma.product.create({
    data: {
      slug: 'emerald-velvet-couture-abaya',
      name: 'Emerald Oasis Royal Velvet Couture Abaya',
      nameAr: 'عباية واحة الزمرد من المخمل الملكي',
      description: 'Deep olive green velvet cut with precision structured shoulders and silk satin lapels. Accentuated with micro hand-beading along the cuffs.',
      descriptionAr: 'مخمل ملكي ناعم باللون الأخضر الزيتي مع أكتاف محددة وياقة من الستن الحريري. مزينة بتطريز يدوي دقيق على أطراف الأكمام.',
      shortDescription: 'Couture deep olive velvet abaya with satin lapels and micro-beading.',
      shortDescriptionAr: 'عباية كوتور مخمل أخضر زيتي غامق لمناسبات الشتاء والسهرات.',
      price: 2950,
      compareAtPrice: 3400,
      material: 'Silk Micro-Velvet & Heavy Duchesse Satin',
      materialAr: 'مخمل حريري ميكرو مع ساتان دوشيس ثقيل',
      careInstructions: 'Specialist dry clean only.',
      careInstructionsAr: 'تنظيف جاف متخصص.',
      averageRating: 5.0,
      reviewCount: 14,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop', alt: 'Emerald Velvet Couture Front', position: 1 },
          { url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1200&auto=format&fit=crop', alt: 'Emerald Velvet Cuff Detail', position: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-EVC-54', price: 2950, stock: 3, reservedStock: 0, sizeId: 'size-54' },
          { sku: 'SN-EVC-56', price: 2950, stock: 5, reservedStock: 0, sizeId: 'size-56' },
          { sku: 'SN-EVC-58', price: 2950, stock: 2, reservedStock: 0, sizeId: 'size-58' },
        ],
      },
      categories: { create: [{ categoryId: 'cat-5' }, { categoryId: 'cat-2' }] },
      collections: { create: [{ collectionId: 'col-dubai-nights' }] },
      colors: { create: [{ colorId: 'color-olive' }, { colorId: 'color-black' }] },
      sizes: { create: [{ sizeId: 'size-54' }, { sizeId: 'size-56' }, { sizeId: 'size-58' }] },
    },
  });

  // Product 5: Maha Pearl Organza Layered Abaya
  const prod5 = await prisma.product.create({
    data: {
      slug: 'pearl-embellished-organza-layered-abaya',
      name: 'Maha Pearl Organza Layered Abaya',
      nameAr: 'عباية مها الطبقات من الأورجانزا واللؤلؤ',
      description: 'Double-layered silhouette blending translucent silk organza with a inner matte crepe sheath. Sprinkled with hand-studded natural freshwater pearls.',
      descriptionAr: 'عباية ذات طبقتين تجمع بين الأورجانزا الحريرية الشفافة والكريب المطفأ الداخلي. مرصعة بحبات اللؤلؤ الطبيعي على كامل التصميم.',
      shortDescription: 'Layered silk organza abaya with studded natural freshwater pearls.',
      shortDescriptionAr: 'عباية طبقات أورجانزا حريرية مرصعة باللؤلؤ الطبيعي.',
      price: 2100,
      compareAtPrice: 2500,
      material: '100% Silk Organza & Japanese Crepe',
      materialAr: 'أورجانزا حرير 100% مع كريب ياباني',
      careInstructions: 'Dry clean only.',
      careInstructionsAr: 'تنظيف جاف فقط.',
      averageRating: 4.9,
      reviewCount: 29,
      isFeatured: false,
      isNewArrival: true,
      isBestSeller: true,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop', alt: 'Maha Pearl Organza Abaya', position: 1 },
          { url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop', alt: 'Pearl Organza Layer Detail', position: 2 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-MPO-52', price: 2100, stock: 5, reservedStock: 0, sizeId: 'size-52' },
          { sku: 'SN-MPO-54', price: 2100, stock: 8, reservedStock: 0, sizeId: 'size-54' },
          { sku: 'SN-MPO-56', price: 2100, stock: 6, reservedStock: 0, sizeId: 'size-56' },
          { sku: 'SN-MPO-58', price: 2100, stock: 4, reservedStock: 0, sizeId: 'size-58' },
        ],
      },
      categories: { create: [{ categoryId: 'cat-2' }, { categoryId: 'cat-5' }] },
      collections: { create: [{ collectionId: 'col-ramadan-2026' }] },
      colors: { create: [{ colorId: 'color-ivory' }, { colorId: 'color-champagne' }] },
      sizes: { create: [{ sizeId: 'size-52' }, { sizeId: 'size-54' }, { sizeId: 'size-56' }, { sizeId: 'size-58' }] },
    },
  });

  // Product 6: Luxury Japanese Crepe Sheila & Brooch Set
  const prod6 = await prisma.product.create({
    data: {
      slug: 'japanese-crepe-matching-sheila-set',
      name: 'Luxury Japanese Crepe Sheila & Brooch Set',
      nameAr: 'طقم شيلة كريب ياباني مع دبوس مغناطيسي مطلٍ بالذهب',
      description: 'Ultra-light breathable Japanese crepe sheila measuring 200cm x 75cm. Includes an 18K gold-plated magnetic logo brooch for non-damaging hijab styling.',
      descriptionAr: 'طرحة من الكريب الياباني ناعمة ومريحة بحجم ٢٠٠ سم × ٧٥ سم. تأتي مع بروش مغناطيسي بتصميم الشعار ومطلي بالذهب عيار ١٨.',
      shortDescription: 'Japanese crepe long sheila with 18K gold-plated magnetic brooch.',
      shortDescriptionAr: 'طرحة كريب ياباني فاخرة مع بروش مغناطيسي ذهبي.',
      price: 320,
      compareAtPrice: 400,
      material: 'Japanese Stretch Crepe & 18K Gold Plated Brass Magnet',
      materialAr: 'كريب ستريتش ياباني ونحاس مغناطيسي مطلي بالذهب',
      careInstructions: 'Hand wash cold with mild detergent.',
      careInstructionsAr: 'غسيل يدوي بارد مع منظف لطيف.',
      averageRating: 4.9,
      reviewCount: 45,
      isFeatured: false,
      isNewArrival: false,
      isBestSeller: true,
      status: 'active',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?q=80&w=1200&auto=format&fit=crop', alt: 'Japanese Crepe Sheila Set', position: 1 },
        ],
      },
      variants: {
        create: [
          { sku: 'SN-JCS-BLK', price: 320, stock: 35, reservedStock: 0, sizeId: 'size-onesize' },
        ],
      },
      categories: { create: [{ categoryId: 'cat-6' }] },
      colors: { create: [{ colorId: 'color-black' }, { colorId: 'color-champagne' }, { colorId: 'color-ivory' }] },
      sizes: { create: [{ sizeId: 'size-onesize' }] },
    },
  });

  // -- Hero Banners --
  await prisma.heroBanner.createMany({
    data: [
      {
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop',
        title: 'Ramadan Royal Edition 2026',
        titleAr: 'مجموعة رمضان الملكية ٢٠٢٦',
        subtitle: 'High Couture Luxury Abayas & Silk Kaftans for the Emirati Woman.',
        subtitleAr: 'أرقى تصاميم العبايات والقفاطين الحريرية للمرأة الإماراتية العصرية.',
        ctaText: 'Explore Collection',
        ctaTextAr: 'اكتشفي التشكيلة',
        ctaLink: '/collection/ramadan-2026',
        secondaryCtaText: 'Shop New Arrivals',
        secondaryCtaTextAr: 'تسوقي الجديد',
        secondaryCtaLink: '/products?sort=newest',
        position: 1,
        isActive: true,
      },
      {
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000&auto=format&fit=crop',
        title: 'Shourk Nady Signature',
        titleAr: 'مجموعة شروق نادي المميزة',
        subtitle: 'Discover the ultimate elegance and refinement of our exclusive classic collections.',
        subtitleAr: 'اكتشفي الأناقة المطلقة والرقي في مجموعاتنا الكلاسيكية الحصرية.',
        ctaText: 'Shop Classic Abayas',
        ctaTextAr: 'تسوقي الكلاسيكي',
        ctaLink: '/category/classic-abayas',
        position: 2,
        isActive: true,
      },
    ],
  });

  // -- Coupons --
  await prisma.coupon.createMany({
    data: [
      { code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 500, usedCount: 14, isActive: true },
      { code: 'EID2026', type: 'fixed', value: 200, minOrder: 1500, usedCount: 42, isActive: true },
    ],
  });

  // -- Shipping Methods --
  await prisma.shippingMethod.createMany({
    data: [
      { name: 'Standard UAE Delivery (2-3 Business Days)', nameAr: 'توصيل عادي داخل الإمارات (٢-٣ أيام عمل)', price: 25, estimatedDays: 3, isActive: true },
      { name: 'Dubai & Abu Dhabi Express Delivery (Same Day / Next Day)', nameAr: 'توصيل سريع - دبي وأبوظبي (نفس اليوم / اليوم التالي)', price: 45, estimatedDays: 1, isActive: true },
    ],
  });

  // -- Reviews --
  await prisma.review.createMany({
    data: [
      {
        productId: prod1.id,
        customerName: 'Sheikha M. Al Qassimi',
        customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        rating: 5,
        title: 'Sublime fabric and flawless tailoring',
        body: 'The Japanese Nida is so light yet rich and jet black. The crystal work on the sleeves was subtle yet very glamorous. Delivery in Dubai took less than 24 hours!',
        isVerifiedPurchase: true,
        status: 'approved',
      },
      {
        productId: prod1.id,
        customerName: 'Fatima Al Mansoori',
        rating: 5,
        title: 'عباية في غاية الأناقة والفخامة',
        body: 'التطريز جداً ناعم والقماش ياباني أصلي ثقيل وبارد بنفس الوقت. التغليف يبيض الوجه كأنه هدية ملكية.',
        isVerifiedPurchase: true,
        status: 'approved',
      },
    ],
  });

  console.log('✅ Seeding complete!');
  console.log(`  📦 ${6} products created`);
  console.log(`  🏷️  ${6} categories created`);
  console.log(`  🎨 ${6} colors created`);
  console.log(`  📐 ${6} sizes created`);
  console.log(`  📸 ${3} collections created`);
  console.log(`  🎯 ${2} hero banners created`);
  console.log(`  💳 ${2} coupons created`);
  console.log(`  🚚 ${2} shipping methods created`);
  console.log(`  ⭐ ${2} reviews created`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
