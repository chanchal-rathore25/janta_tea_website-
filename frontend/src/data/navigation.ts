
export interface NavItem {
  label: string;
  href: string;
}

export interface CategoryItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: "Quality",
    href: "/quality",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const teaCategories: CategoryItem[] = [
  {
    label: "Black Tea",
    href: "/products?category=black-tea",
  },
  {
    label: "Green Tea",
    href: "/products?category=green-tea",
  },
  {
    label: "Masala Tea",
    href: "/products?category=masala-tea",
  },
  {
    label: "Cardamom Tea",
    href: "/products?category=cardamom-tea",
  },
  {
    label: "Organic Tea",
    href: "/products?category=organic-tea",
  },
];

