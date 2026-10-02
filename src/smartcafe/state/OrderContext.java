package smartcafe.state;

import smartcafe.builder.Beverage;
import smartcafe.observer.OrderObserver;

import java.util.ArrayList;
import java.util.List;

/**
 * [STATE PATTERN] - Context
 * เก็บสถานะปัจจุบันของออเดอร์ และทำหน้าที่เป็นตัวเชื่อมโยง State Transitions
 */
public class OrderContext {
    private final String orderId;
    private final Beverage beverage;
    private final double finalPrice;
    private OrderState currentState;
    private final List<OrderObserver> observers = new ArrayList<>();

    public OrderContext(String orderId, Beverage beverage, double finalPrice) {
        this.orderId = orderId;
        this.beverage = beverage;
        this.finalPrice = finalPrice;
        this.currentState = new CreatedState();
    }

    public void setState(OrderState state) {
        this.currentState = state;
        notifyObservers("ออเดอร์ " + orderId + " เปลี่ยนสถานะเป็น: [" + state.getStateName() + "]");
    }

    public void nextState() {
        currentState.next(this);
    }

    public void cancelOrder() {
        currentState.cancel(this);
    }

    public OrderState getCurrentState() {
        return currentState;
    }

    public String getOrderId() {
        return orderId;
    }

    public Beverage getBeverage() {
        return beverage;
    }

    public double getFinalPrice() {
        return finalPrice;
    }

    public int getEstimatedBrewTimeMinutes() {
        return beverage != null ? beverage.getEstimatedBrewTimeMinutes() : 3;
    }

    // Observer integration
    public void registerObserver(OrderObserver observer) {
        if (observer != null && !observers.contains(observer)) {
            observers.add(observer);
        }
    }

    public void removeObserver(OrderObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers(String message) {
        for (OrderObserver observer : observers) {
            observer.onOrderStatusChanged(this, message);
        }
    }
}
