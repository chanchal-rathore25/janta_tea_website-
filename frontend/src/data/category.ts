import catTeaLeaf from "@/assets/cat-tea-leaf.jpg";
import catTeaPowder from "@/assets/cat-tea-powder.jpg";
import catGreenTea from "@/assets/cat-green-tea.jpg";
import catCardamomTea from "@/assets/cat-cardamom-tea.jpg";
import catCardamom from "@/assets/cat-cardamom.jpg";
import catCoffee from "@/assets/cat-coffee.jpg";

export type CategoryProduct = {
  name: string;
  notes: string;
  price: string;
  mrp?: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
};

export type CategoryData = {
  name: string;
  tag: string;
  image: string;
  description: string;
  products: CategoryProduct[];
};

export const categories = [
  {
    name: "Tea Leaf",
    slug: "tea-leaf",
    image: catTeaLeaf,
    tag: "12 blends",
  },
  {
    name: "Tea Powder",
    slug: "tea-powder",
    image: catTeaPowder,
    tag: "CTC dust",
  },
  {
    name: "Green Tea",
    slug: "green-tea",
    image: catGreenTea,
    tag: "Light brew",
  },
  {
    name: "Cardamom Tea",
    slug: "cardamom-tea",
    image: catCardamomTea,
    tag: "Elaichi",
  },
  {
    name: "Cardamom Flavour",
    slug: "cardamom-flavour",
    image: catCardamom,
    tag: "Pure spice",
  },
  {
    name: "Coffee",
    slug: "coffee",
    image: catCoffee,
    tag: "Fresh roast",
  },
];

export const CATEGORY_DATA: Record<string, CategoryData> = {
  "tea-leaf": {
    name: "Tea Leaf",
    tag: "12 blends",
    image: catTeaLeaf,
    description:
      "Premium tea leaves carefully selected for a rich aroma, smooth taste and refreshing everyday cup.",
    products: [],
  },

  "tea-powder": {
    name: "Tea Powder",
    tag: "CTC dust",
    image: catTeaPowder,
    description:
      "Strong and refreshing tea powder crafted for bold colour, rich taste and the perfect everyday chai.",
    products: [],
  },

  "green-tea": {
    name: "Green Tea",
    tag: "Light brew",
    image: catGreenTea,
    description:
      "Light and refreshing green tea with a clean taste for those who enjoy a naturally soothing cup.",
    products: [],
  },

  "cardamom-tea": {
    name: "Cardamom Tea",
    tag: "Elaichi",
    image: catCardamomTea,
    description:
      "Aromatic tea blended with the warm fragrance of cardamom for a delightful and flavorful chai experience.",
    products: [],
  },

  "cardamom-flavour": {
    name: "Cardamom Flavour",
    tag: "Pure spice",
    image: catCardamom,
    description:
      "Fragrant cardamom flavour selected to bring an authentic aroma and rich character to your tea.",
    products: [],
  },

  coffee: {
    name: "Coffee",
    tag: "Fresh roast",
    image: catCoffee,
    description:
      "Freshly roasted coffee with a rich aroma and satisfying taste for your perfect coffee break.",
    products: [],
  },
};