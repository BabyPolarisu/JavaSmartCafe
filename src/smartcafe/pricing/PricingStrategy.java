package smartcafe.pricing;

import smartcafe.builder.Beverage;

/**
 * ============================================================================
 * [STRATEGY PATTERN] - Strategy Interface
 * ระบบการคำนวณราคาและโปรโมชัน (Pricing & Discount Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสมกับร้าน: เหมาะสมที่สุดสำหรับนโยบายราคาและส่วนลดของร้านที่หลากหลาย
 * และสามารถเปลี่ยนแปลงตามกลุ่มลูกค้าหรือช่วงเวลา (เช่น ราคาปกติ, สมาชิก, รักษ์โลก, นักศึกษา)
 * สามารถสลับกลยุทธ์คิดราคาได้แบบ Runtime โดยไม่ต้องแก้ไขโค้ด Beverage
 * ============================================================================
 */
public interface PricingStrategy {
    double calculateFinalPrice(Beverage beverage);
    String getStrategyName();
    String getDiscountDescription();
}
