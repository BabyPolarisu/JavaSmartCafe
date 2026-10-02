package smartcafe.observer;

import smartcafe.state.OrderContext;
import smartcafe.model.ToppingType;

/**
 * [OBSERVER PATTERN] - Concrete Observer: จอแสดงผลในครัวสำหรับบาริสต้า (KDS)
 */
public class BaristaKitchenDisplay implements OrderObserver {

    @Override
    public void onOrderStatusChanged(OrderContext order, String message) {
        String stateName = order.getCurrentState().getStateName();
        if (stateName.startsWith("PAID")) {
            System.out.printf("  👨‍🍳 [จอครัวบาริสต้า KDS]: มีออเดอร์ใหม่เข้า! #%s%n", order.getOrderId());
            System.out.printf("     - เมนู: %s (%s, %s)%n",
                    order.getBeverage().getName(),
                    order.getBeverage().getSize().getDisplayName(),
                    order.getBeverage().getTemperature().getDisplayName());
            System.out.printf("     - ภาชนะ: %s%n", order.getBeverage().getCupType().getDisplayName());
            System.out.printf("     - สูตรหวาน/เปรี้ยว: หวาน %d%% / เปรี้ยว %d%%%n",
                    order.getBeverage().getSweetness().getPercentage(),
                    order.getBeverage().getSourness().getPercentage());
            if (!order.getBeverage().getToppings().isEmpty()) {
                System.out.print("     - ท็อปปิ้ง: ");
                for (ToppingType t : order.getBeverage().getToppings()) {
                    System.out.print(t.getDisplayName() + " ");
                }
                System.out.println();
            }
        }
    }
}
