/**
 * ============================================================================
 * [STRATEGY PATTERN]
 * ระบบการคิดราคาและส่วนลด (Pricing & Promotion Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสม: สลับสับเปลี่ยนกลยุทธ์ส่วนลดได้แบบ Runtime ตามกลุ่มลูกค้าหรือสิทธิพิเศษ
 * ============================================================================
 */

export class PricingStrategy {
  calculate(basePrice) {
    return basePrice;
  }
  getName() {
    return 'Default';
  }
  getDescription() {
    return '';
  }
}

export class RegularPricing extends PricingStrategy {
  calculate(basePrice) {
    return basePrice;
  }
  getName() {
    return 'ราคามาตรฐาน (Regular)';
  }
  getDescription() {
    return 'ราคาปกติ ไม่มีส่วนลดเพิ่มเติม';
  }
}

export class MemberPricing extends PricingStrategy {
  calculate(basePrice) {
    return Math.max(0, basePrice * 0.90);
  }
  getName() {
    return 'สมาชิก VIP (Member 10% OFF)';
  }
  getDescription() {
    return 'รับส่วนลดพิเศษ 10% ทุกเมนู';
  }
}

export class EcoCupPricing extends PricingStrategy {
  calculate(basePrice) {
    return Math.max(0, basePrice - 10);
  }
  getName() {
    return 'ลูกค้ารักษ์โลก (Eco Hero -10฿)';
  }
  getDescription() {
    return 'ลดทันที 10 บาทเมื่อนำแก้วมาเอง';
  }
}

export class StudentPricing extends PricingStrategy {
  calculate(basePrice) {
    return Math.max(0, basePrice * 0.85);
  }
  getName() {
    return 'นักเรียน/นักศึกษา (Student 15% OFF)';
  }
  getDescription() {
    return 'แสดงบัตรนักศึกษา รับส่วนลด 15%';
  }
}

export const PRICING_STRATEGIES = [
  { id: 'REGULAR', name: 'ราคาปกติ (Regular)', discountRate: 0, instance: new RegularPricing(), icon: '🏷️' },
  { id: 'MEMBER', name: 'สมาชิก VIP (10% OFF)', discountRate: 0.10, instance: new MemberPricing(), icon: '👑' },
  { id: 'ECO_CUP', name: 'ลูกค้านำแก้วมาเอง (-10฿)', discountRate: 0, instance: new EcoCupPricing(), icon: '🌱' },
  { id: 'STUDENT', name: 'บัตรนักศึกษา (15% OFF)', discountRate: 0.15, instance: new StudentPricing(), icon: '🎓' }
];
