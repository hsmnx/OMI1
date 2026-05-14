export const products = [
  {
    id: "laundry-powder",
    category: "Laundry",
    categoryId: "laundry",
    name: "Powder Detergent",
    tagline: "power clean for stubborn stains",
    description: "Our signature powder detergent is formulated to lift stubborn stains while being gentle on fabrics. Perfect for high-efficiency machines and traditional washing.",
    image: "https://images.unsplash.com/photo-1649005011845-ef225c89da86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#EBF4FF",
    price: "1,200 MRU",
    ingredients: ["Sodium Carbonate", "Plant-based surfactants", "Enzymes", "Natural Fragrance"]
  },
  {
    id: "disinfectant-bleach",
    category: "Disinfect",
    categoryId: "disinfect",
    name: "Multi-Surface Bleach",
    tagline: "99.9% germ elimination",
    description: "Hospital-grade disinfecting power formulated for daily home use. Kills 99.9% of germs while leaving a fresh, clean scent.",
    image: "https://images.unsplash.com/photo-1550963295-019d8a8a61c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#F3E8FF",
    price: "850 MRU",
    ingredients: ["Sodium Hypochlorite", "Water", "Sodium Hydroxide"]
  },
  {
    id: "surface-cleaner",
    category: "Home",
    categoryId: "home",
    name: "All-Purpose Cleaner",
    tagline: "where clean meets shine",
    description: "Versatile, non-toxic cleaner for countertops, floors, and general household surfaces. Leaves no sticky residue behind.",
    image: "https://images.unsplash.com/photo-1701992678972-d5a053ad0fb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#ECFDF5",
    price: "600 MRU",
    ingredients: ["Water", "Decyl Glucoside", "Citric Acid", "Essential Oils"]
  },
  {
    id: "liquid-soap",
    category: "Hand Care",
    categoryId: "hand-care",
    name: "Moisturizing Hand Soap",
    tagline: "gentle on hands, tough on germs",
    description: "Rich lathering liquid soap that effectively washes away bacteria without stripping your hands of natural oils.",
    image: "https://images.unsplash.com/photo-1645567455251-334ed4702f9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#FFF1F2",
    price: "450 MRU",
    ingredients: ["Water", "Glycerin", "Aloe Vera", "Vitamin E"]
  },
  {
    id: "dish-soap",
    category: "Kitchen",
    categoryId: "kitchen",
    name: "Heavy Duty Dish Soap",
    tagline: "cuts grease like nobody's business",
    description: "Concentrated formula that easily cuts through baked-on grease. A little goes a long way.",
    image: "https://images.unsplash.com/photo-1725940889761-35d90aead72d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#FFFBEB",
    price: "350 MRU",
    ingredients: ["Plant-derived cleaners", "Water", "Citrus Extract"]
  },
  {
    id: "window-cleaner",
    category: "Glass",
    categoryId: "glass",
    name: "Streak-Free Window Spray",
    tagline: "invisible glass, zero streaks",
    description: "Ammonia-free glass cleaner that delivers a perfect, streak-free shine on windows, mirrors, and glass tables.",
    image: "https://images.unsplash.com/photo-1705899853374-d91c048b81d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    bg: "#ECFEFF",
    price: "500 MRU",
    ingredients: ["Water", "Plant-based alcohol", "Acetic acid (vinegar)"]
  }
];

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(p => p.categoryId === categoryId);
}
