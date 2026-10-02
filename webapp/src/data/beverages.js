/**
 * Data Model & Catalog for Smart Cafe System
 * Mirrored directly from Java classes:
 * BeverageCategory, BeverageSize, Temperature, SweetnessLevel, SournessLevel, ToppingType
 */

export const CATEGORIES = {
  COFFEE: {
    id: 'COFFEE',
    name: 'กาแฟสด Specialty',
    enName: 'Specialty Coffee',
    icon: '☕',
    description: 'กลิ่นหอมอโรม่า สกัดสดใหม่จากเมล็ด Arabica พรีเมียม 9 บาร์ 93°C',
    color: '#8b5a2b',
    liquidGradient: 'linear-gradient(180deg, #3d2314 0%, #2b170c 100%)',
    creamColor: '#d4b28c'
  },
  MILK_TEA: {
    id: 'MILK_TEA',
    name: 'ชาและชานมแท้',
    enName: 'Tea & Milk Tea',
    icon: '🧋',
    description: 'ใบชาคัดเกรด ต้มสด 95°C สัมผัสนุ่มละมุนลิ้น ผสมนมสดแท้ 100%',
    color: '#d97706',
    liquidGradient: 'linear-gradient(180deg, #e3a857 0%, #c47f2c 100%)',
    creamColor: '#fff5e6'
  },
  FRUIT_TEA: {
    id: 'FRUIT_TEA',
    name: 'ชาผลไม้ & โซดา',
    enName: 'Fruit Tea & Sparkling',
    icon: '🍋',
    description: 'ผลไม้แท้สกัดเย็น ผสมชาเขียวมะลิและสปาร์คลิ่งโซดา ซาบซ่าดับกระหาย',
    color: '#10b981',
    liquidGradient: 'linear-gradient(180deg, #f59e0b 0%, #ef4444 100%)',
    creamColor: 'rgba(255,255,255,0.4)'
  },
  SMOOTHIE: {
    id: 'SMOOTHIE',
    name: 'สมูทตี้ & ปั่น',
    enName: 'Smoothie & Frappe',
    icon: '🥤',
    description: 'ผลไม้แท้แช่แข็ง -18°C ปั่นเนื้อเนียนนุ่มดุจหิมะ เข้มข้นกลมกล่อม',
    color: '#ec4899',
    liquidGradient: 'linear-gradient(180deg, #fbbf24 0%, #f97316 100%)',
    creamColor: '#ffffff'
  }
};

export const MENU_ITEMS = [
  // COFFEE
  {
    id: 'c1',
    categoryId: 'COFFEE',
    name: 'คาราเมล มัคคิอาโต้ (Caramel Macchiato)',
    basePrice: 65,
    defaultTemp: 'HOT',
    description: 'เอสเพรสโซ่ 2 ช็อต ผสานนมสดนุ่มและวานิลลาไซรัป ราดคาราเมลซอสลายตาราง',
    tags: ['Best Seller', 'Specialty'],
    calories: 190,
    brewTimeMinutes: 3,
    brewTimeText: '3 นาที'
  },
  {
    id: 'c2',
    categoryId: 'COFFEE',
    name: 'เอสเพรสโซ่ ดับเบิ้ลช็อต (Doppio Espresso)',
    basePrice: 55,
    defaultTemp: 'HOT',
    description: 'สกัดเข้มข้น 9 บาร์ พร้อมชั้นครีม่าสีทองธรรมชาติ เข้มลึกเต็มรสสัมผัส',
    tags: ['Strong', 'Zero Sugar'],
    calories: 10,
    brewTimeMinutes: 2,
    brewTimeText: '2 นาที'
  },
  {
    id: 'c3',
    categoryId: 'COFFEE',
    name: 'เดอร์ตี้ คอฟฟี่ (Dirty Specialty Coffee)',
    basePrice: 75,
    defaultTemp: 'ICED',
    description: 'เอสเพรสโซ่ช็อตร้อน รินทับนมเย็นจัดสูตรเข้มข้น แยกชั้นเลเยอร์ชัดเจน',
    tags: ['Signature'],
    calories: 210,
    brewTimeMinutes: 4,
    brewTimeText: '4 นาที'
  },

  // MILK TEA
  {
    id: 'm1',
    categoryId: 'MILK_TEA',
    name: 'ชานมไต้หวันบราวน์ชูการ์พ่นไฟ (Brown Sugar Boba Milk Tea)',
    basePrice: 50,
    defaultTemp: 'ICED',
    description: 'ชาดำอัสสัมต้มสด ผสมนมสดแท้ ราดไซรัปน้ำตาลทรายแดงเคี่ยวลายเสือ',
    tags: ['Must Try', 'Boba'],
    calories: 280,
    brewTimeMinutes: 3,
    brewTimeText: '3 นาที'
  },
  {
    id: 'm2',
    categoryId: 'MILK_TEA',
    name: 'อุจิมัทฉะลาเต้พรีเมียม (Uji Matcha Latte)',
    basePrice: 70,
    defaultTemp: 'ICED',
    description: 'ผงมัทฉะแท้เมืองอุจิ เกียวโต ตีสดด้วยแปรงไม้ไผ่ หอมเข้มกลมกล่อม',
    tags: ['Premium Green Tea'],
    calories: 160,
    brewTimeMinutes: 4,
    brewTimeText: '4 นาที'
  },
  {
    id: 'm3',
    categoryId: 'MILK_TEA',
    name: 'ชาไทยต้นตำรับการันต์ (Signature Thai Milk Tea)',
    basePrice: 45,
    defaultTemp: 'ICED',
    description: 'ใบชาไทยคั่วหอมกรุ่น สีส้มทอง รสชาติเข้มข้น หอมมันตามแบบฉบับดั้งเดิม',
    tags: ['Traditional'],
    calories: 220,
    brewTimeMinutes: 3,
    brewTimeText: '3 นาที'
  },

  // FRUIT TEA & SPARKLING
  {
    id: 'f1',
    categoryId: 'FRUIT_TEA',
    name: 'ชาผลไม้รวมเสาวรสพีชโซดา (Passion Fruit & Peach Sparkling)',
    basePrice: 60,
    defaultTemp: 'ICED',
    description: 'เนื้อเสาวรสสดและพีชขาวญี่ปุ่น ผสานชาเขียวมะลิและสปาร์คลิ่งโซดาเย็นจัด',
    tags: ['Super Refreshing', 'High Sourness'],
    calories: 110,
    brewTimeMinutes: 3,
    brewTimeText: '3 นาที'
  },
  {
    id: 'f2',
    categoryId: 'FRUIT_TEA',
    name: 'เลมอนฮันนี่กรีนที (Honey Lemon Jasmine Green Tea)',
    basePrice: 55,
    defaultTemp: 'ICED',
    description: 'น้ำผึ้งดอกลำไยแท้ 100% ผสมน้ำเลมอนคั้นสด เปรี้ยวหวานลงตัวชุ่มคอ',
    tags: ['Healthy', 'Natural Honey'],
    calories: 120,
    brewTimeMinutes: 2,
    brewTimeText: '2 นาที'
  },
  {
    id: 'f3',
    categoryId: 'FRUIT_TEA',
    name: 'สตรอว์เบอร์รี ยูซุ สปาร์คลิ่ง (Strawberry Yuzu Fizz)',
    basePrice: 65,
    defaultTemp: 'ICED',
    description: 'ซอสสตรอว์เบอร์รีสดเคี่ยวผสมส้มยูซุแท้จากญี่ปุ่น ซ่าสดชื่น ดับร้อน',
    tags: ['Exotic Citrus'],
    calories: 130,
    brewTimeMinutes: 3,
    brewTimeText: '3 นาที'
  },

  // SMOOTHIE
  {
    id: 's1',
    categoryId: 'SMOOTHIE',
    name: 'แมงโก้แพชชั่นฟรุตสมูทตี้ (Mango Passion Fruit Frappe)',
    basePrice: 70,
    defaultTemp: 'FRAPPE',
    description: 'มะม่วงน้ำดอกไม้สุกคัดพิเศษ ปั่นร่วมกับเสาวรสสด เปรี้ยวหวานเนื้อเนียนละมุน',
    tags: ['Real Fruit', 'Smooth Texture'],
    calories: 230,
    brewTimeMinutes: 5,
    brewTimeText: '5 นาที'
  },
  {
    id: 's2',
    categoryId: 'SMOOTHIE',
    name: 'ดาร์กโกโก้ช็อกโกแลตปั่น (Double Dark Cocoa Frappe)',
    basePrice: 65,
    defaultTemp: 'FRAPPE',
    description: 'ผงโกโก้พรีเมียมเข้มข้น 100% ปั่นเนื้อละเอียด ราดซอสช็อกโกแลตฟัดจ์',
    tags: ['Rich Dark Chocolate'],
    calories: 310,
    brewTimeMinutes: 4,
    brewTimeText: '4 นาที'
  }
];

export const SIZES = [
  { code: 'S', label: 'เล็ก (Small)', oz: 8, ml: 240, priceOffset: 0 },
  { code: 'M', label: 'กลาง (Medium)', oz: 16, ml: 480, priceOffset: 15 },
  { code: 'L', label: 'ใหญ่ (Large)', oz: 22, ml: 650, priceOffset: 25 },
  { code: 'XL', label: 'ใหญ่พิเศษ (Extra Large)', oz: 26, ml: 750, priceOffset: 35 }
];

export const TEMPERATURES = [
  { id: 'HOT', label: 'ร้อน (Hot)', icon: '♨️', tempDesc: '75°C - 85°C' },
  { id: 'ICED', label: 'เย็น (Iced)', icon: '🧊', tempDesc: 'เย็นชื่นใจ ผสมน้ำแข็งอนามัย' },
  { id: 'FRAPPE', label: 'ปั่น (Frappe)', icon: '🥤', tempDesc: 'ปั่นเนื้อเนียนนุ่มดุจหิมะ' }
];

export const SWEETNESS_LEVELS = [
  { percent: 0, code: '0%', label: 'ไม่หวานเลย (0% Unsweetened)' },
  { percent: 25, code: '25%', label: 'หวานน้อยมาก (25% Light)' },
  { percent: 50, code: '50%', label: 'หวานน้อยกำลังดี (50% Half Sweet)' },
  { percent: 100, code: '100%', label: 'หวานปกติ (100% Standard)' },
  { percent: 120, code: '120%', label: 'หวานมากเป็นพิเศษ (120% Extra)' }
];

export const SOURNESS_LEVELS = [
  { percent: 0, code: '0%', label: 'ไม่เปรี้ยว (0% No Sourness)' },
  { percent: 25, code: '25%', label: 'เปรี้ยวนิดๆ ละมุน (25% Mild)' },
  { percent: 50, code: '50%', label: 'เปรี้ยวสดชื่นสมดุล (50% Tangy)' },
  { percent: 100, code: '100%', label: 'เปรี้ยวจี๊ดสะใจ (100% Extra Sour Zing)' }
];

export const DINING_OPTIONS = [
  { id: 'DINE_IN', label: 'ทานที่ร้าน (Dine-in)', icon: '🍽️', note: 'เสิร์ฟแก้วเซรามิก / แก้วใสทรงสูง' },
  { id: 'TAKEAWAY', label: 'สั่งกลับบ้าน (Takeaway)', icon: '🛍️', note: 'เสิร์ฟแก้วกระดาษฉนวน 2 ชั้น / แก้วชีวภาพ PLA' },
  { id: 'BRING_OWN_CUP', label: 'นำแก้วมาเอง (Eco Cup)', icon: '♻️', note: 'ลดขยะ พร้อมรับส่วนลด Eco ทันที 5 บาท' }
];

export const TOPPINGS = [
  { id: 'BROWN_SUGAR_BOBA', name: 'ไข่มุกบราวน์ชูการ์ทองคำ', price: 10, icon: '🧋' },
  { id: 'ALOE_VERA_JELLY', name: 'วุ้นว่านหางจระเข้แท้', price: 15, icon: '🧊' },
  { id: 'HONEY_LEMON_JELLY', name: 'เจลลี่น้ำผึ้งมะนาว', price: 15, icon: '🍯' },
  { id: 'WHIPPED_CREAM', name: 'วิปครีมสดพรีเมียม', price: 15, icon: '🍦' },
  { id: 'EXTRA_ESPRESSO_SHOT', name: 'เพิ่มเอสเพรสโซ่ 1 ช็อต', price: 20, icon: '☕' }
];

export const PRICING_STRATEGIES = [
  { id: 'REGULAR', name: 'ลูกค้าทั่วไป (Regular)', discountPercent: 0, fixedDiscount: 0, desc: 'ราคาปกติ' },
  { id: 'MEMBER', name: 'สมาชิกคาเฟ่ (VIP Member)', discountPercent: 10, fixedDiscount: 0, desc: 'ลดทันที 10%' },
  { id: 'STUDENT', name: 'นักเรียน/นักศึกษา (Student)', discountPercent: 15, fixedDiscount: 0, desc: 'ลดทันที 15%' },
  { id: 'ECO_CUP', name: 'ลูกค้านำแก้วมาเอง (Eco Cup)', discountPercent: 0, fixedDiscount: 5, desc: 'ลดรักษ์โลก 5 บาท' }
];
