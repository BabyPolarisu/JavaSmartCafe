package smartcafe.pricing;

import smartcafe.builder.Beverage;

/**
 * [STRATEGY PATTERN] - Concrete Strategy: นโยบายลดขยะลูกค้านำแก้วมาเอง (ลด 10 บาทพิเศษ)
 */
public class EcoCupPricing implements PricingStrategy {
    private static final double EXTRA_ECO_DISCOUNT = 10.0;

    @Override
    public double calculateFinalPrice(Beverage beverage) {
        double subtotal = beverage.calculateTotalPrice();
        return Math.max(0.0, subtotal - EXTRA_ECO_DISCOUNT);
    }

    @Override
    public String getStrategyName() {
        return "ลูกค้ารักษ์โลกนำแก้วมาเอง (Eco Green Hero -10฿)";
    }

    @Override
    public String getDiscountDescription() {
        return "ลดหย่อนพิเศษ 10 บาท เพื่อส่งเสริมการลดขยะ Single-use Plastic";
    }
}
