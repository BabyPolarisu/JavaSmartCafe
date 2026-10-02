package smartcafe.pricing;

import smartcafe.builder.Beverage;

/**
 * [STRATEGY PATTERN] - Concrete Strategy: ส่วนลดสมาชิก Smart Cafe VIP (ลด 10%)
 */
public class MemberPricing implements PricingStrategy {
    private static final double DISCOUNT_RATE = 0.10;

    @Override
    public double calculateFinalPrice(Beverage beverage) {
        double subtotal = beverage.calculateTotalPrice();
        return Math.max(0.0, subtotal * (1.0 - DISCOUNT_RATE));
    }

    @Override
    public String getStrategyName() {
        return "สมาชิก VIP (Smart Cafe Member 10% OFF)";
    }

    @Override
    public String getDiscountDescription() {
        return "ส่วนลดสมาชิก 10% จากยอดรวมทั้งแก้ว";
    }
}
