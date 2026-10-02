/**
 * ============================================================================
 * [THE SINGLE BEST-FIT DESIGN PATTERN: BUILDER PATTERN]
 * Smart Cafe Beverage Builder Architecture
 * Directly mirrors smartcafe.builder.Beverage, BeverageBuilder, and BeverageDirector
 * ============================================================================
 */

export const CUP_TYPES = {
  CERAMIC_MUG: {
    id: 'CERAMIC_MUG',
    name: 'แก้วเซรามิกหนาเก็บความร้อน (Specialty Ceramic Mug)',
    material: 'เซรามิกเนื้อหนา เคลือบเงากันคราบ',
    lidType: 'เปิดโล่ง (Open-Top) พร้อมจานรอง',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับเครื่องดื่มร้อนทานในร้าน ช่วยรักษาอุณหภูมิ 75-85°C และคงกลิ่นหอมกรุ่น',
    badge: '🔥 ร้อนทานในร้าน',
    ecoScore: 95
  },
  DOUBLE_WALL_PAPER: {
    id: 'DOUBLE_WALL_PAPER',
    name: 'แก้วกระดาษคราฟต์ฉนวน 2 ชั้น (Double-Wall Insulated Kraft Cup)',
    material: 'กระดาษคราฟต์ฟู้ดเกรด 2 ชั้น พร้อมช่องแอร์ล็อค',
    lidType: 'ฝาจิบกันหกแบบปลอดภัย (Ergonomic Sip Lid)',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับเครื่องดื่มร้อนสั่งกลับบ้าน จับถือได้สบายมือไม่ร้อนลวกโดยไม่ต้องใส่ปลอกกระดาษเพิ่ม',
    badge: '♨️ ร้อนสั่งกลับบ้าน',
    ecoScore: 85
  },
  TALL_GLASS: {
    id: 'TALL_GLASS',
    name: 'แก้วคริสตัลใสทรงสูง (Tall Glass Tumbler)',
    material: 'แก้วบอโรซิลิเกตใส ไร้สารตะกั่ว หนาทนความเย็น',
    lidType: 'เปิดโล่ง พร้อมหลอดแก้วรียูส',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับเครื่องดื่มเย็นทานในร้าน โชว์เลเยอร์สีสันอันสวยงามของชา นม และผลไม้ได้อย่างชัดเจน',
    badge: '❄️ เย็นทานในร้าน',
    ecoScore: 98
  },
  ECO_PLA_COLD: {
    id: 'ECO_PLA_COLD',
    name: 'แก้วชีวภาพ PLA ย่อยสลายได้ 100% (Eco Bioplastic Cup)',
    material: 'พลาสติกชีวภาพจากข้าวโพด (Polylactic Acid - PLA)',
    lidType: 'ฝาเรียบเจาะรูหลอด / ฟิล์มซีลสุญญากาศ',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับเครื่องดื่มเย็นสั่งกลับบ้าน ย่อยสลายได้ตามธรรมชาติ 100% ภายใน 180 วัน ไม่ก่อขยะไมโครพลาสติก',
    badge: '🌱 เย็นสั่งกลับบ้าน',
    ecoScore: 100
  },
  DOME_LID_PET: {
    id: 'DOME_LID_PET',
    name: 'แก้ว PET ใส ฝาโดมทรงสูง (High-Dome Lid Tumbler)',
    material: 'พลาสติก PET เกรดบริสุทธิ์ ใสพิเศษ เหนียวทนแรงดัน',
    lidType: 'ฝาโดมโค้งสูง (Dome Lid) ป้องกันวิปครีมหรือฟองโซดาล้น',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับเมนูปั่น (Frappe/Smoothie) หรือเมนูที่มีวิปครีมและโซดาซ่า ฝาโดมให้พื้นที่รองรับท็อปปิ้งพูนแก้วโดยไม่เลอะเทอะ',
    badge: '🥤 ปั่น / มีวิปครีม',
    ecoScore: 80
  },
  PERSONAL_TUMBLER: {
    id: 'PERSONAL_TUMBLER',
    name: 'กระบอกน้ำส่วนตัวลูกค้านำมาเอง (Personal Tumbler)',
    material: 'สแตนเลสสตีล / แก้วส่วนตัวของลูกค้า',
    lidType: 'ฝาส่วนตัว (ผ่านการล้างอบฆ่าเชื้อก่อนชง)',
    suitabilityReason: 'เหมาะสมที่สุดสำหรับลูกค้ารักษ์โลก ช่วยลดขยะ Single-use เป็นศูนย์ และได้รับส่วนลด Eco-Friendly ทันที 5 บาท',
    badge: '♻️ รักษ์โลก 100%',
    ecoScore: 100
  }
};

/**
 * [Builder Pattern - Complex Product]
 * วัตถุสินค้าเครื่องดื่มสมบูรณ์ที่ผ่านการสร้างจาก Builder
 */
export class Beverage {
  constructor(config) {
    this.name = config.name;
    this.category = config.category;
    this.basePrice = config.basePrice;
    this.size = config.size;
    this.temperature = config.temperature;
    this.diningOption = config.diningOption;
    this.cup = config.cup || CUP_TYPES.ECO_PLA_COLD;
    this.cupType = this.cup;
    this.sweetness = config.sweetness;
    this.sourness = config.sourness;
    this.iceLevel = config.iceLevel;
    this.toppings = config.toppings || [];
    this.specialNote = config.specialNote || '';
  }

  calculateTotalPrice() {
    let total = this.basePrice + (this.size?.priceOffset || 0);
    for (const topping of this.toppings) {
      total += topping.price;
    }
    if (this.diningOption?.id === 'BRING_OWN_CUP') {
      total = Math.max(0, total - 5); // ส่วนลดแก้วนำมาเอง 5 บาท
    }
    return total;
  }

  getDescription() {
    let desc = `${this.name} [${this.temperature.label}], หวาน ${this.sweetness.code}`;
    if (this.sourness && this.sourness.percent > 0) {
      desc += `, เปรี้ยว ${this.sourness.code}`;
    }
    if (this.temperature.id !== 'HOT' && this.iceLevel) {
      desc += `, น้ำแข็ง: ${this.iceLevel}`;
    }
    if (this.specialNote) {
      desc += ` (*หมายเหตุ: ${this.specialNote}*)`;
    }
    return desc;
  }

  getEstimatedBrewTime() {
    let baseMinutes = 3;
    const cat = this.category?.id || this.category;
    if (cat === 'SMOOTHIE') {
      baseMinutes = 5;
    } else if (cat === 'COFFEE') {
      baseMinutes = (this.temperature?.id === 'HOT' && this.name?.includes('เอสเพรสโซ่')) ? 2 : (this.name?.includes('เดอร์ตี้') ? 4 : 3);
    } else if (cat === 'FRUIT_TEA') {
      baseMinutes = this.name?.includes('เลมอน') ? 2 : 3;
    } else if (cat === 'MILK_TEA') {
      baseMinutes = this.name?.includes('มัทฉะ') ? 4 : 3;
    }

    if (this.toppings && this.toppings.length >= 2) {
      baseMinutes += 1;
    }
    return baseMinutes;
  }
}

/**
 * [Builder Pattern - Concrete Builder]
 * คลาสผู้สร้างที่เปิด Fluent Methods ในการปรับแต่งเครื่องดื่มทีละขั้นตอน
 */
export class BeverageBuilder {
  constructor() {
    this.reset();
  }

  reset() {
    this.name = 'เครื่องดื่มซิกเนเจอร์';
    this.category = null;
    this.basePrice = 50;
    this.size = null;
    this.temperature = null;
    this.diningOption = null;
    this.customCup = null;
    this.sweetness = null;
    this.sourness = null;
    this.iceLevel = 'น้ำแข็งปกติ (100%)';
    this.toppings = [];
    this.specialNote = '';
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setCategory(category) {
    this.category = category;
    return this;
  }

  setBasePrice(price) {
    this.basePrice = price;
    return this;
  }

  setSize(size) {
    this.size = size;
    return this;
  }

  setTemperature(temp) {
    this.temperature = temp;
    return this;
  }

  setDiningOption(dining) {
    this.diningOption = dining;
    return this;
  }

  setCup(cup) {
    this.customCup = cup;
    return this;
  }

  setSweetness(sweetness) {
    this.sweetness = sweetness;
    return this;
  }

  setSourness(sourness) {
    this.sourness = sourness;
    return this;
  }

  setIceLevel(iceLevel) {
    this.iceLevel = iceLevel;
    return this;
  }

  addTopping(topping) {
    if (topping && !this.toppings.some(t => t.id === topping.id)) {
      this.toppings.push(topping);
    }
    return this;
  }

  removeTopping(toppingId) {
    this.toppings = this.toppings.filter(t => t.id !== toppingId);
    return this;
  }

  setSpecialNote(note) {
    this.specialNote = note;
    return this;
  }

  /**
   * ระบบเลือกแก้วที่เหมาะสมที่สุดโดยอัตโนมัติภายในขั้นตอน Build
   */
  determineOptimalCup() {
    if (this.customCup) return this.customCup;

    // 1. นำแก้วมาเอง
    if (this.diningOption?.id === 'BRING_OWN_CUP') {
      return CUP_TYPES.PERSONAL_TUMBLER;
    }

    // 2. เครื่องดื่มร้อน
    if (this.temperature?.id === 'HOT') {
      return this.diningOption?.id === 'DINE_IN' 
        ? CUP_TYPES.CERAMIC_MUG 
        : CUP_TYPES.DOUBLE_WALL_PAPER;
    }

    // 3. เมนูปั่น / มีวิปครีม / สมูทตี้
    const hasWhippedCream = this.toppings.some(t => t.id === 'WHIPPED_CREAM');
    if (this.temperature?.id === 'FRAPPE' || hasWhippedCream || this.category?.id === 'SMOOTHIE') {
      return CUP_TYPES.DOME_LID_PET;
    }

    // 4. เครื่องดื่มเย็นทั่วไป
    return this.diningOption?.id === 'DINE_IN' 
      ? CUP_TYPES.TALL_GLASS 
      : CUP_TYPES.ECO_PLA_COLD;
  }

  build() {
    const cup = this.determineOptimalCup();
    return new Beverage({
      name: this.name,
      category: this.category,
      basePrice: this.basePrice,
      size: this.size,
      temperature: this.temperature,
      diningOption: this.diningOption,
      cup: cup,
      sweetness: this.sweetness,
      sourness: this.sourness,
      iceLevel: this.iceLevel,
      toppings: [...this.toppings],
      specialNote: this.specialNote
    });
  }
}

/**
 * [Builder Pattern - Director]
 * คลาสผู้ควบคุมสูตรมาตรฐาน คอยเรียกใช้งาน Builder ตามลำดับที่กำหนดไว้ล่วงหน้า
 */
export class BeverageDirector {
  constructHotCaramelMacchiato(builder, catalog) {
    builder.reset()
      .setName('คาราเมล มัคคิอาโต้ร้อน (Hot Caramel Macchiato)')
      .setCategory(catalog.categories.COFFEE)
      .setBasePrice(65)
      .setSize(catalog.sizes[1]) // M (16 oz / 480 ml)
      .setTemperature(catalog.temperatures[0]) // HOT
      .setDiningOption(catalog.diningOptions[0]) // DINE_IN
      .setSweetness(catalog.sweetness[1]) // 25%
      .setSourness(catalog.sourness[0])  // 0%
      .addTopping(catalog.toppings[4])   // Extra espresso shot
      .setSpecialNote('เน้นฟองนมนุ่ม ราดคาราเมลซอสลายตาราง');
  }

  constructSparklingFruitTea(builder, catalog) {
    builder.reset()
      .setName('ชาผลไม้รวมเสาวรสพีชสปาร์คลิ่ง (Passion Fruit & Peach Sparkling)')
      .setCategory(catalog.categories.FRUIT_TEA)
      .setBasePrice(60)
      .setSize(catalog.sizes[3]) // XL (26 oz / 750 ml)
      .setTemperature(catalog.temperatures[1]) // ICED
      .setDiningOption(catalog.diningOptions[1]) // TAKEAWAY
      .setSweetness(catalog.sweetness[2]) // 50%
      .setSourness(catalog.sourness[3])  // 100% เปรี้ยวจี๊ด!
      .setIceLevel('น้ำแข็งปานกลาง 70%')
      .addTopping(catalog.toppings[1])   // Aloe vera
      .addTopping(catalog.toppings[2])   // Honey lemon jelly
      .setSpecialNote('ขอเลมอนหั่นแว่นประดับแก้ว 2 ชิ้น');
  }

  constructBubbleMilkTea(builder, catalog) {
    builder.reset()
      .setName('ชานมไต้หวันบราวน์ชูการ์พ่นไฟ (Taiwan Brown Sugar Boba)')
      .setCategory(catalog.categories.MILK_TEA)
      .setBasePrice(50)
      .setSize(catalog.sizes[2]) // L (22 oz / 650 ml)
      .setTemperature(catalog.temperatures[1]) // ICED
      .setDiningOption(catalog.diningOptions[2]) // BRING_OWN_CUP (Eco!)
      .setSweetness(catalog.sweetness[3]) // 100%
      .setSourness(catalog.sourness[0])
      .addTopping(catalog.toppings[0]);   // Brown sugar boba
  }

  constructMangoPassionSmoothie(builder, catalog) {
    builder.reset()
      .setName('แมงโก้แพชชั่นฟรุตสมูทตี้ (Mango Passion Fruit Frappe)')
      .setCategory(catalog.categories.SMOOTHIE)
      .setBasePrice(70)
      .setSize(catalog.sizes[2]) // L (22 oz / 650 ml)
      .setTemperature(catalog.temperatures[2]) // FRAPPE
      .setDiningOption(catalog.diningOptions[1]) // TAKEAWAY
      .setSweetness(catalog.sweetness[2]) // 50%
      .setSourness(catalog.sourness[2])  // 50% เปรี้ยวสดชื่น
      .addTopping(catalog.toppings[3])   // Whipped cream
      .setSpecialNote('ปั่นเนื้อเนียนพิเศษ โรยผงเสาวรสกรุบกรอบด้านบน');
  }
}
