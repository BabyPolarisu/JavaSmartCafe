package smartcafe.pricing;

import smartcafe.builder.Beverage;

/**
 * [STRATEGY PATTERN] - Concrete Strategy: ส่วนลดนักเรียน/นักศึกษา (ลด 15%)
 */
public class StudentPricing implements PricingStrategy {
    private static final double STUDENT_DISCOUNT = 0.15;

    @Override
    public double calculateFinalPrice(Beverage beverage) {
        double subtotal = beverage.calculateTotalPrice();
        return Math.max(0.0, subtotal * (1.0 - STUDENT_DISCOUNT));
    }

    @Override
    public String getStrategyName() {
        return "ส่วนลดนักศึกษา (Student Privilege 15% OFF)";
    }

    @Override
    public String getDiscountDescription() {
        return "แสดงบัตรนักเรียน/นักศึกษา รับส่วนลด 15% ทันที";
    }
}
