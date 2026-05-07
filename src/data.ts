export type MenuItem = {
  id: number;
  category: 'makanan' | 'minuman' | 'cemilan';
  subcategory?: string;
  name: string;
  price: number;
  emoji: string;
  image?: string;
};

export const MENU_DATA: MenuItem[] = [
  { id: 0, category: 'makanan', name: 'Nasi Goreng Special', price: 25000, emoji: '🍳', image: '/nasigoreng.png' },
  { id: 1, category: 'makanan', name: 'Nasi Ayam Teriyaki', price: 30000, emoji: '🍱', image: '/nasiayamteriyaki.png' },
  { id: 2, category: 'makanan', name: 'Chicken Katsu Rice Bowl', price: 32000, emoji: '🥩', image: '/chikenkatsu.png' },
  { id: 3, category: 'makanan', name: 'Spaghetti Bolognese', price: 28000, emoji: '🍝', image: '/spagetibolognese.png' },
  { id: 4, category: 'makanan', name: 'Spaghetti Carbonara', price: 30000, emoji: '🍝', image: '/spageticarbonara.png' },
  { id: 5, category: 'makanan', name: 'Beef Burger + French Fries', price: 35000, emoji: '🍔', image: '/coffe.png' },
  { id: 6, category: 'makanan', name: 'Chicken Sandwich', price: 27000, emoji: '🥪', image: '/Chicken Sandwich.png' },
  { id: 7, category: 'makanan', name: 'Rice Bowl Sambal Matah', price: 29000, emoji: '🌶️', image: '/Rice Bowl Sambal Matah.png' },
  { id: 8, category: 'makanan', name: 'Seblak', price: 15000, emoji: '🍲', image: '/seblak.png' },
  // Minuman -> Signature
  { id: 9, category: 'minuman', subcategory: 'Kopi Signature', name: 'Espresso', price: 15000, emoji: '☕', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80' },
  { id: 10, category: 'minuman', subcategory: 'Kopi Signature', name: 'Americano', price: 18000, emoji: '🖤', image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80' },
  { id: 11, category: 'minuman', subcategory: 'Kopi Signature', name: 'Cappuccino', price: 22000, emoji: '🍵', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80' },
  { id: 12, category: 'minuman', subcategory: 'Kopi Signature', name: 'Café Latte', price: 23000, emoji: '🥛', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=600&q=80' },
  { id: 13, category: 'minuman', subcategory: 'Kopi Signature', name: 'Vanilla Latte', price: 25000, emoji: '🌸', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80' },
  { id: 14, category: 'minuman', subcategory: 'Kopi Signature', name: 'Caramel Macchiato', price: 27000, emoji: '🍮', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80' },
  { id: 15, category: 'minuman', subcategory: 'Kopi Signature', name: 'Mochaccino', price: 26000, emoji: '🍫', image: 'https://images.unsplash.com/photo-1572442388796-11668aa44f76?auto=format&fit=crop&w=600&q=80' },
  { id: 16, category: 'minuman', subcategory: 'Kopi Signature', name: 'Kopi Susu Gula Aren', price: 20000, emoji: '🤎', image: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=600&q=80' },
  // Minuman -> Latte
  { id: 17, category: 'minuman', subcategory: 'Non-Coffee & Latte', name: 'Matcha Latte', price: 25000, emoji: '🍵', image: 'https://images.unsplash.com/photo-1515823064-240ce4b7593c?auto=format&fit=crop&w=600&q=80' },
  { id: 18, category: 'minuman', subcategory: 'Non-Coffee & Latte', name: 'Chocolate Drink (Hot/Ice)', price: 23000, emoji: '🍫', image: 'https://images.unsplash.com/photo-1542990253-a781e04c0082?auto=format&fit=crop&w=600&q=80' },
  { id: 19, category: 'minuman', subcategory: 'Non-Coffee & Latte', name: 'Taro Latte', price: 24000, emoji: '💜', image: 'https://images.unsplash.com/photo-1579888944510-9114f0eefe3e?auto=format&fit=crop&w=600&q=80' },
  { id: 20, category: 'minuman', subcategory: 'Non-Coffee & Latte', name: 'Red Velvet Latte', price: 25000, emoji: '❤️', image: 'https://images.unsplash.com/photo-1620012253295-c15ce331c944?auto=format&fit=crop&w=600&q=80' },
  // Minuman -> Segar
  { id: 21, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Thai Tea', price: 20000, emoji: '🍊', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { id: 22, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Green Tea', price: 18000, emoji: '🍃', image: 'https://images.unsplash.com/photo-1627490212002-decd0f6bd391?auto=format&fit=crop&w=600&q=80' },
  { id: 23, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Lemon Tea (Hot/Ice)', price: 18000, emoji: '🍋', image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&w=600&q=80' },
  { id: 24, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Lychee Tea', price: 20000, emoji: '🫐', image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80' },
  { id: 25, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Peach Tea', price: 20000, emoji: '🍑', image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=600&q=80' },
  { id: 26, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Mineral Water', price: 10000, emoji: '💧', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80' },
  { id: 27, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Fresh Orange Juice', price: 22000, emoji: '🍊', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80' },
  { id: 28, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Strawberry Juice', price: 23000, emoji: '🍓', image: 'https://images.unsplash.com/photo-1622597467836-f38240662f92?auto=format&fit=crop&w=600&q=80' },
  { id: 29, category: 'minuman', subcategory: 'Teh & Minuman Segar', name: 'Mango Juice', price: 23000, emoji: '🥭', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80' },
  // Cemilan
  { id: 30, category: 'cemilan', name: 'French Fries', price: 18000, emoji: '🍟', image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80' },
  { id: 31, category: 'cemilan', name: 'Onion Rings', price: 20000, emoji: '🧅', image: 'https://images.unsplash.com/photo-1639024470487-734ed99951b1?auto=format&fit=crop&w=600&q=80' },
  { id: 32, category: 'cemilan', name: 'Chicken Wings (BBQ / Spicy)', price: 28000, emoji: '🍗', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80' },
  { id: 33, category: 'cemilan', name: 'Nugget + Fries', price: 25000, emoji: '🍟', image: 'https://images.unsplash.com/photo-1562967914-01efa7e87832?auto=format&fit=crop&w=600&q=80' },
  { id: 34, category: 'cemilan', name: 'Toast (Chocolate / Cheese)', price: 20000, emoji: '🍞', image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
  { id: 35, category: 'cemilan', name: 'Cireng', price: 15000, emoji: '🫔', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80' },
  { id: 36, category: 'cemilan', name: 'Pisang Goreng', price: 17000, emoji: '🍌', image: 'https://images.unsplash.com/photo-1601000938259-9e92002320b2?auto=format&fit=crop&w=600&q=80' },
  { id: 37, category: 'cemilan', name: 'Singkong Goreng', price: 16000, emoji: '🥔', image: 'https://images.unsplash.com/photo-1625937712144-0c6d746d8cb4?auto=format&fit=crop&w=600&q=80' }
];

export const formatRupiah = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('Rp', 'Rp ');
};
