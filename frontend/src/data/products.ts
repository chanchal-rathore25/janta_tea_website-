import Greentea from "@/assets/greenjantatea.avif";
import Purpletea from "@/assets/purplejantatea.jpg";
import Redtea from "@/assets/redjanta1.png";
import catTeaLeaf from "@/assets/greenjantatea.avif";
import catCardamom from "@/assets/aromaticcardamonjantatea.avif";
import catCoffee from "@/assets/purplejantatea.jpg";
import catTeaPowder from "@/assets/teapowderjanta.avif";
import catGreenTea from "@/assets/freshjantagreen.avif";
import catCardamomTea from "@/assets/jantaCardamonFlavor.jpeg";


export const categories = [
  "Tea Leaf",
  "Tea Powder",
  "Green Tea",
  "Cardamom Tea",
  "Cardamom Flavour",
  "Coffee",
] as const;

export type Category = (typeof categories)[number];

export type Product = {
  name: string;
  category: Category;
  notes: string;
  price: string;
  priceValue: number;
  mrp?: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    name: "Masala Chai Special",
    category: "Tea Leaf",
    notes: "Strong tea with ginger, cardamom and clove — Indore's favourite cup.",
    price: "₹499 / kg",
    priceValue: 499,
    mrp: "₹580",
    image: Greentea,
    badge: "Best seller",
    rating: 5,
    reviews: 128,
  },
  {
    name: "Assam CTC Gold",
    category: "Tea Powder",
    notes: "Dark, kadak chai with thick milk colour. Perfect for tapri-style tea.",
    price: "₹350 / kg",
    priceValue: 350,
    mrp: "₹420",
    image: Purpletea,
    badge: "Value pack",
    rating: 4,
    reviews: 96,
  },
  {
    name: "Darjeeling First Flush",
    category: "Tea Leaf",
    notes: "Light and mild, floral finish. Best without milk in the evening.",
    price: "₹850 / kg",
    priceValue: 850,
    image: Redtea,
    badge: "Premium",
    rating: 5,
    reviews: 54,
  },
  {
    name: "Nilgiri Leaf Everyday",
    category: "Tea Leaf",
    notes: "Balanced daily leaf tea. Achhi colour, halka strong taste.",
    price: "₹420 / kg",
    priceValue: 420,
    image: catTeaLeaf,
    rating: 4,
    reviews: 61,
  },
  {
    name: "Kadak Dust Tea",
    category: "Tea Powder",
    notes: "Fine dust for chai stalls — one spoon mein full colour.",
    price: "₹280 / kg",
    priceValue: 280,
    mrp: "₹320",
    image: catTeaPowder,
    badge: "Wholesale",
    rating: 4,
    reviews: 143,
  },
  {
    name: "Green Tea Whole Leaf",
    category: "Green Tea",
    notes: "Bina doodh ki halki chai. Subah ya khane ke baad achhi lagti hai.",
    price: "₹650 / kg",
    priceValue: 650,
    image: catGreenTea,
    rating: 4,
    reviews: 38,
  },
  {
    name: "Lemon Green Tea",
    category: "Green Tea",
    notes: "Green tea with natural lemon — fresh aur halka swaad.",
    price: "₹720 / kg",
    priceValue: 720,
    image: catGreenTea,
    rating: 4,
    reviews: 22,
  },
  {
    name: "Elaichi Chai Blend",
    category: "Cardamom Tea",
    notes: "Assam leaf mixed with green cardamom. Ghar bhar mein khushbu.",
    price: "₹560 / kg",
    priceValue: 560,
    image: catCardamomTea,
    badge: "Popular",
    rating: 5,
    reviews: 77,
  },
  {
    name: "Pure Cardamom Flavour",
    category: "Cardamom Flavour",
    notes: "Food-grade elaichi flavour — chai, kheer aur sweets ke liye.",
    price: "₹180 / 100g",
    priceValue: 180,
    image: catCardamom,
    rating: 4,
    reviews: 31,
  },
  {
    name: "Filter Coffee Powder",
    category: "Coffee",
    notes: "Fresh roasted and ground — South Indian filter style.",
    price: "₹620 / kg",
    priceValue: 620,
    image: catCoffee,
    rating: 4,
    reviews: 45,
  },
  {
    name: "Instant Coffee Blend",
    category: "Coffee",
    notes: "Quick cup ke liye smooth blend, ghar aur office dono ke liye.",
    price: "₹740 / kg",
    priceValue: 740,
    image: catCoffee,
    rating: 4,
    reviews: 19,
  },
  {
    name: "Hotel Special CTC",
    category: "Tea Powder",
    notes: "Bulk buyers ke liye economy CTC — 10 kg se 500 kg tak.",
    price: "₹310 / kg",
    priceValue: 310,
    image: Purpletea,
    badge: "Bulk rate",
    rating: 4,
    reviews: 88,
  },
];

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
      "Assam, Nilgiri aur Darjeeling ki chuni hui patti. Daane bade hote hain, isliye swaad saaf aur khushbu tez rehti hai. Ghar ki roz ki chai ke liye sabse achha option.",
    highlights: ["Direct garden se", "Har hafte fresh stock", "Aapke saamne tola jata hai"],
    brewing: "1 chammach patti, 1 cup paani, 3 minute ubaal — phir doodh aur cheeni.",
  },
  {
    name: "Tea Powder",
    slug: "tea-powder",
    image: catTeaPowder,
    tagline: "Kadak CTC dust",
    description:
      "Chai stall aur hotel style kadak chai ke liye barik dust. Ek chammach mein hi gehra rang aur strong taste aa jata hai — isliye chalta bhi kam hai.",
    highlights: ["Thick milk colour", "Economy bulk rate", "10 kg se 500 kg tak"],
    brewing: "Aadha chammach dust per cup — 2 minute ubaal, doodh ke saath.",
  },
  {
    name: "Green Tea",
    slug: "green-tea",
    image: catGreenTea,
    tagline: "Bina doodh ki halki chai",
    description:
      "Whole leaf green tea, halka aur fresh. Subah ya khane ke baad peene ke liye. Lemon aur tulsi flavour bhi milte hain.",
    highlights: ["No milk, no sugar needed", "Light aur refreshing", "Lemon flavour available"],
    brewing: "Paani ubaal ke 1 minute thanda karein, 2–3 minute steep karein.",
  },
  {
    name: "Cardamom Tea",
    slug: "cardamom-tea",
    image: catCardamomTea,
    tagline: "Elaichi wali chai",
    description:
      "Assam leaf ke saath asli hari elaichi mix ki hui. Chai banate hi pura ghar mehak jata hai — mehmaano ke liye best.",
    highlights: ["Asli hari elaichi", "Rich khushbu", "Mehmaan-special blend"],
    brewing: "1 chammach blend, doodh-paani barabar, 4 minute dheemi aanch.",
  },
  {
    name: "Cardamom Flavour",
    slug: "cardamom-flavour",
    image: catCardamom,
    tagline: "Pure elaichi flavour",
    description:
      "Food-grade cardamom flavour — chai, kheer, mithai aur bakery items ke liye. Do-teen boond mein hi pura swaad aa jata hai.",
    highlights: ["Food grade", "Thoda hi kaafi", "Sweets aur bakery ke liye"],
    brewing: "2–3 boond per litre — zyada mat daaliye.",
  },
  {
    name: "Coffee",
    slug: "coffee",
    image: catCoffee,
    tagline: "Fresh roast coffee",
    description:
      "South Indian filter coffee powder aur instant blend. Roast aur grind dukaan par hi hota hai, isliye khushbu bilkul fresh milti hai.",
    highlights: ["Fresh roasted & ground", "Filter aur instant dono", "Ghar aur office ke liye"],
    brewing: "2 chammach powder per cup filter mein, 10 minute decoction.",
  },
];

export function getCategoryBySlug(slug: string) {
  return categoryDetails.find((c) => c.slug === slug);
}

export function productsByCategory(name: Category) {
  return products.filter((p) => p.category === name);
}
