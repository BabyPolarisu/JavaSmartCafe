package smartcafe.pricing;

import smartcafe.builder.Beverage;

/**
 * [STRATEGY PATTERN] - Concrete Strategy: ราคาปกติสำหรับลูกค้าทั่วไป
 */
public class RegularPricing implements PricingStrategy {
    @Override
    public double calculateFinalPrice(Beverage beverage) {
        return beverage.calculateTotalPrice();
    }

    @Override
    public String getStrategyName() {
        return "ราคามาตรฐาน (Regular Pricing)";
    }

    @Override
    public String getDiscountDescription() {
        return "ไม่มีส่วนลดเพิ่มเติม";
    }
}
