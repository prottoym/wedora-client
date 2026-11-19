export type Category = {
  name: string; // server er CATEGORIES er sathe exact mile thakte hobe
  icon: "camera" | "venue" | "flower" | "food" | "makeup" | "fashion";
  tagline: string;
};

export const CATEGORIES: Category[] = [
  {
    name: "Photography & Videography",
    icon: "camera",
    tagline: "Capture every moment with cinematic stories and timeless portraits.",
  },
  {
    name: "Wedding Venues",
    icon: "venue",
    tagline: "Beautiful halls, gardens and resorts for your big day.",
  },
  {
    name: "Decoration & Florist",
    icon: "flower",
    tagline: "Stage design, floral arrangements and dreamy decor.",
  },
  {
    name: "Catering Services",
    icon: "food",
    tagline: "Delicious menus crafted for every guest and every taste.",
  },
  {
    name: "Makeup & Styling",
    icon: "makeup",
    tagline: "Bridal makeup, hair and styling by trusted artists.",
  },
  {
    name: "Wedding Fashion",
    icon: "fashion",
    tagline: "Bridal wear, sherwanis, jewellery and accessories.",
  },
];