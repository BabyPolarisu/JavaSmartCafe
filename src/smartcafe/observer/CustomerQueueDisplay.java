package smartcafe.observer;

import smartcafe.state.OrderContext;

/**
 * [OBSERVER PATTERN] - Concrete Observer: จอแสดงคิวเรียกรับเครื่องดื่มหน้าร้าน
 */
public class CustomerQueueDisplay implements OrderObserver {

    @Override
    public void onOrderStatusChanged(OrderContext order, String message) {
        String stateName = order.getCurrentState().getStateName();
        System.out.printf("  📢 [จอเรียกคิวหน้าร้าน]: ออเดอร์ #%s (%s)%n",
                order.getOrderId(), order.getBeverage().getName());

        if (stateName.startsWith("BREWING")) {
            System.out.printf("     -> 🟡 กำลังจัดเตรียมเครื่องดื่ม... อดใจรอสักครู่!%n");
        } else if (stateName.startsWith("READY")) {
            System.out.printf("     -> 🟢 [🔔 ติ๊งต่อง! หมายเลข %s เชิญรับสินค้าที่จุดรับเครื่องดื่ม]%n", order.getOrderId());
        } else if (stateName.startsWith("COMPLETED")) {
            System.out.printf("     -> ⚪ ออเดอร์ #%s ส่งมอบเสร็จสิ้นแล้ว%n", order.getOrderId());
        }
    }
}
