export type MenuItem = {
  name: string;
  description: string;
  price: number;
  category: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  description: string;
  items: MenuItem[];
};

/** Formats a KES price for display, e.g. 1200 -> "KSh 1,200" */
export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString('en-KE')}`;
}

export const menuCategories: MenuCategory[] = [
  {
    id: "Burgers",
    title: "Signature Burgers",
    description: "Served on our signature wooden boards with flame-kissed patties.",
    items: [
      { name: "Sains Classic", price: 850, category: "Burgers", description: "Beef patty, crisp lettuce, tomato, caramelized onions, cheddar cheese." },
      { name: "Rustic BBQ Bacon", price: 950, category: "Burgers", description: "Beef patty, smoked bacon, onion rings, BBQ sauce, american cheese." },
      { name: "Spicy Chicken Burger", price: 800, category: "Burgers", description: "Grilled chicken breast, spicy mayo, jalapeños, lettuce, pickles." },
      { name: "The Wooden Board Combo", price: 1200, category: "Burgers", description: "Classic burger paired with sticky BBQ short ribs and crispy fries." },
    ]
  },
  {
    id: "Grilled",
    title: "Flame-Grilled & Mains",
    description: "Aromatic charcoal grilled cuts, ribs, and farm-fresh hearty meals.",
    items: [
      { name: "BBQ Short Ribs", price: 1800, category: "Grilled", description: "Slow-cooked ribs glazed in farm BBQ sauce. Served with fries." },
      { name: "Flame-Grilled Ribeye", price: 2500, category: "Grilled", description: "Prime steak cooked over open fire with garlic herb butter and side." },
      { name: "Sains Chicken & Rice", price: 1200, category: "Grilled", description: "Flavorful grilled chicken served over fragrant rice with a fresh side salad." },
    ]
  },
  {
    id: "Sides",
    title: "Sides & Extras",
    description: "The perfect golden companions for your meal.",
    items: [
      { name: "Farmhouse Fries", price: 250, category: "Sides", description: "Crispy golden french fries served in our signature metal cups." },
      { name: "Loaded Cheese Fries", price: 450, category: "Sides", description: "Fries smothered in melted cheese, bacon bits, and spring onions." },
      { name: "Fresh Garden Salad", price: 350, category: "Sides", description: "Mixed greens, cherry tomatoes, cucumbers, house vinaigrette." },
    ]
  },
  {
    id: "Drinks",
    title: "Drinks & Beverages",
    description: "Refreshing cold beverages, juices, milkshakes, and tap beers.",
    items: [
      { name: "Freshly Squeezed Juices", price: 300, category: "Drinks", description: "Orange, passion, or mango made to order." },
      { name: "Craft Milkshakes", price: 450, category: "Drinks", description: "Vanilla bean, double chocolate, or strawberry." },
      { name: "Local Sodas", price: 150, category: "Drinks", description: "Assorted carbonated soft drinks." },
      { name: "Cold Draft Beer", price: 350, category: "Drinks", description: "Crisp and cold, poured fresh from the tap." },
    ]
  }
];
