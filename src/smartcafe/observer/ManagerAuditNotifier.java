package smartcafe.observer;

import smartcafe.state.OrderContext;

/**
 * [OBSERVER PATTERN] - Concrete Observer: ระบบบันทึก Audit Log ของผู้จัดการร้าน
 */
public class ManagerAuditNotifier implements OrderObserver {

    @Override
    public void onOrderStatusChanged(OrderContext order, String message) {
        System.out.printf("  📋 [Audit Log]: ออเดอร์ #%s | ยอดเงิน: %.2f บาท | เหตุการณ์: %s%n",
                order.getOrderId(), order.getFinalPrice(), message);
    }
}
