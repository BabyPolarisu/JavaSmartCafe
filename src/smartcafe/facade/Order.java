package smartcafe.facade;

import smartcafe.builder.Beverage;
import smartcafe.pricing.PricingStrategy;
import smartcafe.state.OrderContext;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * เก็บรายละเอียดของคำสั่งซื้อในระบบร้านค้า
 */
public class Order {
    private final String orderId;
    private final Beverage beverage;
    private final PricingStrategy pricingStrategy;
    private final double finalPrice;
    private final OrderContext orderContext;
    private final String orderTime;

    public Order(String orderId, Beverage beverage, PricingStrategy pricingStrategy) {
        this.orderId = orderId;
        this.beverage = beverage;
        this.pricingStrategy = pricingStrategy;
        this.finalPrice = pricingStrategy.calculateFinalPrice(beverage);
        this.orderContext = new OrderContext(orderId, beverage, this.finalPrice);
        this.orderTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }

    public String getOrderId() {
        return orderId;
    }

    public Beverage getBeverage() {
        return beverage;
    }

    public PricingStrategy getPricingStrategy() {
        return pricingStrategy;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public OrderContext getOrderContext() {
        return orderContext;
    }

    public String getOrderTime() {
        return orderTime;
    }
}
