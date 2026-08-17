import Greentea from "@/assets/greenjantatea.avif";
import Purpletea from "@/assets/purplejantatea.jpg";
import Redtea from "@/assets/redjanta1.png";

import catTeaLeaf from "@/assets/greenjantatea.avif";
import catCardamom from "@/assets/aromaticcardamonjantatea.avif";
import catCoffee from "@/assets/purplejantatea.jpg";
import catTeaPowder from "@/assets/teapowderjanta.avif";
import catGreenTea from "@/assets/freshjantagreen.avif";
import catCardamomTea from "@/assets/jantaCardamonFlavor.jpeg";

import AssamTea from "@/assets/tea-assam.jpg";
import MasalaTea from "@/assets/tea-masala.jpg";
import TripleMixTea from "@/assets/janta-tripple-mix-strong-tea-2166297677-4g5cqr1i.jpg";

/* =========================================================
   CATEGORIES
========================================================= */

export const categories = [
  "Tea Leaf",
  "Tea Powder",
  "Green Tea",
  "Cardamom Tea",
  "Cardamom Flavour",
  "Coffee",
] as const;

export type Category = (typeof categories)[number];

/* =========================================================
   PRODUCT TYPE
========================================================= */

export type Product = {
  name: string;
  slug?: string;
  category: Category;
  notes: string;
  price: string;
  priceValue: number;
  mrp?: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
  featured?: boolean;
};

/* =========================================================
   ALL PRODUCTS
   Single source of truth for the entire website
========================================================= */

export const products: Product[] = [
  /* -------------------------------------------------------
     TEA LEAF
  ------------------------------------------------------- */

  {
    name: "Janta Delicious Paan Tea",
    slug: "janta-delicious-paan-tea",
    category: "Tea Leaf",
    notes:
      "Aromatic flavoured tea with a distinctive taste and refreshing character.",
    price: "₹550 / kg",
    priceValue: 550,
    image: catTeaLeaf,
    badge: "Special",
    rating: 5,
    reviews: 128,
    featured: true,
  },

  {
    name: "Darjeeling First Flush",
    slug: "darjeeling-first-flush",
    category: "Tea Leaf",
    notes:
      "Light and aromatic tea with a delicate floral character and smooth finish.",
    price: "₹850 / kg",
    priceValue: 850,
    image: catTeaLeaf,
    badge: "Premium",
    rating: 5,
    reviews: 54,
    featured: true,
  },

  {
    name: "Nilgiri Leaf Everyday",
    slug: "nilgiri-leaf-everyday",
    category: "Tea Leaf",
    notes:
      "Balanced daily leaf tea with good colour, aroma and a pleasant strong taste.",
    price: "₹420 / kg",
    priceValue: 420,
    image: catTeaLeaf,
    rating: 4,
    reviews: 61,
  },

  {
    name: "Janta Triple Mix Strong Tea",
    slug: "janta-triple-mix-strong-tea",
    category: "Tea Leaf",
    notes:
      "A strong tea blend designed for a rich colour and bold everyday cup.",
    price: "₹650 / kg",
    priceValue: 650,
    image: TripleMixTea,
    badge: "Strong",
    rating: 5,
    reviews: 72,
    featured: true,
  },

  /* -------------------------------------------------------
     TEA POWDER
  ------------------------------------------------------- */

  {
    name: "Assam CTC Gold",
    slug: "assam-ctc-gold",
    category: "Tea Powder",
    notes:
      "Strong Assam CTC tea with rich colour and bold flavour. Perfect for milk tea.",
    price: "₹350 / kg",
    priceValue: 350,
    mrp: "₹420",
    image: AssamTea,
    badge: "Best Seller",
    rating: 4,
    reviews: 96,
    featured: true,
  },

  {
    name: "Kadak Dust Tea",
    slug: "kadak-dust-tea",
    category: "Tea Powder",
    notes:
      "Fine dust tea for chai stalls and hotels with deep colour and strong taste.",
    price: "₹280 / kg",
    priceValue: 280,
    mrp: "₹320",
    image: catTeaPowder,
    badge: "Wholesale",
    rating: 4,
    reviews: 143,
  },

  {
    name: "Hotel Special CTC",
    slug: "hotel-special-ctc",
    category: "Tea Powder",
    notes:
      "Economical CTC tea suitable for hotels, restaurants and bulk buyers.",
    price: "₹310 / kg",
    priceValue: 310,
    image: Purpletea,
    badge: "Bulk Rate",
    rating: 4,
    reviews: 88,
  },

  {
    name: "Janta Tea Powder",
    slug: "janta-tea-powder",
    category: "Tea Powder",
    notes:
      "Everyday tea powder delivering rich colour and a satisfying cup of chai.",
    price: "₹320 / kg",
    priceValue: 320,
    image: catTeaPowder,
    rating: 4,
    reviews: 67,
  },

  /* -------------------------------------------------------
     GREEN TEA
  ------------------------------------------------------- */

  {
    name: "Janta Green Tea",
    slug: "janta-green-tea",
    category: "Green Tea",
    notes:
      "Light and refreshing green tea made for a clean and enjoyable cup.",
    price: "₹650 / kg",
    priceValue: 650,
    image: Greentea,
    badge: "Popular",
    rating: 5,
    reviews: 128,
    featured: true,
  },

  {
    name: "Green Tea Whole Leaf",
    slug: "green-tea-whole-leaf",
    category: "Green Tea",
    notes:
      "Whole leaf green tea with a fresh aroma and light refreshing taste.",
    price: "₹650 / kg",
    priceValue: 650,
    image: catGreenTea,
    rating: 4,
    reviews: 38,
  },

  {
    name: "Lemon Green Tea",
    slug: "lemon-green-tea",
    category: "Green Tea",
    notes:
      "Fresh green tea with a light lemon character for a refreshing cup.",
    price: "₹720 / kg",
    priceValue: 720,
    image: catGreenTea,
    rating: 4,
    reviews: 22,
  },

  /* -------------------------------------------------------
     MASALA TEA
  ------------------------------------------------------- */

  {
    name: "Janta Masala Tea",
    slug: "janta-masala-tea",
    category: "Tea Leaf",
    notes:
      "Aromatic tea blend inspired by the comforting flavour of masala chai.",
    price: "₹499 / kg",
    priceValue: 499,
    mrp: "₹580",
    image: MasalaTea,
    badge: "Popular",
    rating: 5,
    reviews: 77,
  },

  /* -------------------------------------------------------
     CARDAMOM TEA
  ------------------------------------------------------- */

  {
    name: "Janta Aromatic Cardamom Tea",
    slug: "janta-aromatic-cardamom-tea",
    category: "Cardamom Tea",
    notes:
      "Premium tea blended with aromatic cardamom for a rich and fragrant cup.",
    price: "₹850 / kg",
    priceValue: 850,
    image: catCardamomTea,
    badge: "Premium",
    rating: 5,
    reviews: 96,
    featured: true,
  },

  {
    name: "Elaichi Chai Blend",
    slug: "elaichi-chai-blend",
    category: "Cardamom Tea",
    notes:
      "Tea blend with cardamom aroma that makes every cup rich and fragrant.",
    price: "₹560 / kg",
    priceValue: 560,
    image: catCardamomTea,
    badge: "Popular",
    rating: 5,
    reviews: 77,
  },

  /* -------------------------------------------------------
     CARDAMOM FLAVOUR
  ------------------------------------------------------- */

  {
    name: "Pure Cardamom Flavour",
    slug: "pure-cardamom-flavour",
    category: "Cardamom Flavour",
    notes:
      "Aromatic cardamom flavour suitable for tea and other food applications.",
    price: "₹180 / 100g",
    priceValue: 180,
    image: catCardamom,
    rating: 4,
    reviews: 31,
  },

  /* -------------------------------------------------------
     COFFEE
  ------------------------------------------------------- */

  {
    name: "Filter Coffee Powder",
    slug: "filter-coffee-powder",
    category: "Coffee",
    notes:
      "Fresh roasted coffee powder with a rich aroma and smooth character.",
    price: "₹620 / kg",
    priceValue: 620,
    image: catCoffee,
    rating: 4,
    reviews: 45,
  },

  {
    name: "Instant Coffee Blend",
    slug: "instant-coffee-blend",
    category: "Coffee",
    notes:
      "Smooth coffee blend for a quick and convenient cup at home or office.",
    price: "₹740 / kg",
    priceValue: 740,
    image: catCoffee,
    rating: 4,
    reviews: 19,
  },
];

/* =========================================================
   CATEGORY DETAILS
========================================================= */

export type CategoryInfo = {
  name: Category;
  slug: string;
  image: string;
  tagline: string;
  description: string;
  highlights: string[];
  brewing: string;
};

export const categoryDetails: CategoryInfo[] = [
  {
    name: "Tea Leaf",
    slug: "tea-leaf",
    image: catTeaLeaf,
    tagline: "Khuli patti chai",
    description:
      "Selected tea leaves for a balanced cup with pleasant aroma and character.",
    highlights: [
      "Selected tea leaves",
      "Rich aroma",
      "Suitable for everyday tea",
    ],
    brewing:
      "1 chammach patti, 1 cup paani, 3 minute ubaal — phir doodh aur cheeni.",
  },

  {
    name: "Tea Powder",
    slug: "tea-powder",
    image: catTeaPowder,
    tagline: "Kadak CTC chai",
    description:
      "Strong CTC and dust tea for rich colour, bold taste and everyday milk tea.",
    highlights: [
      "Rich colour",
      "Strong taste",
      "Bulk options available",
    ],
    brewing:
      "Aadha se ek chammach tea powder per cup — doodh aur paani ke saath ubaalein.",
  },

  {
    name: "Green Tea",
    slug: "green-tea",
    image: catGreenTea,
    tagline: "Light & refreshing",
    description:
      "Fresh green tea options with a light and refreshing character.",
    highlights: [
      "Light & refreshing",
      "Whole leaf options",
      "Lemon option available",
    ],
    brewing:
      "Paani ubaal kar thoda thanda karein aur tea ko 2–3 minute steep karein.",
  },

  {
    name: "Cardamom Tea",
    slug: "cardamom-tea",
    image: catCardamomTea,
    tagline: "Elaichi wali chai",
    description:
      "Aromatic tea blends with cardamom character for a rich and fragrant cup.",
    highlights: [
      "Aromatic flavour",
      "Rich fragrance",
      "Perfect for special occasions",
    ],
    brewing:
      "1 chammach blend ko doodh aur paani ke saath 3–4 minute dheemi aanch par ubaalein.",
  },

  {
    name: "Cardamom Flavour",
    slug: "cardamom-flavour",
    image: catCardamom,
    tagline: "Cardamom aroma",
    description:
      "Aromatic cardamom flavour for tea and food applications.",
    highlights: [
      "Aromatic character",
      "Tea applications",
      "Food applications",
    ],
    brewing:
      "Product instructions ke according required quantity use karein.",
  },

  {
    name: "Coffee",
    slug: "coffee",
    image: catCoffee,
    tagline: "Rich coffee",
    description:
      "Coffee options for a rich and satisfying cup at home or office.",
    highlights: [
      "Rich aroma",
      "Filter coffee option",
      "Instant blend available",
    ],
    brewing:
      "Apne preferred brewing method aur product instructions ke according prepare karein.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

export function getCategoryBySlug(slug: string) {
  return categoryDetails.find((category) => category.slug === slug);
}

export function productsByCategory(category: Category) {
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured);
}