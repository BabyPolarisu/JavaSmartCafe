package smartcafe.observer;

import smartcafe.state.OrderContext;

/**
 * ============================================================================
 * [OBSERVER PATTERN] - Observer Interface
 * ระบบแจ้งเตือนและคิวหน้าร้าน / ครัว (Queue & Display Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสมกับร้าน: เหมาะสมที่สุดเมื่อสถานะออเดอร์เปลี่ยนไป
 * จะต้องบรอดแคสต์แจ้งเตือนหลายอุปกรณ์พร้อมกันแบบ Loose Coupling:
 * 1. จอเรียกคิวลูกค้าหน้าร้าน (Customer Queue Display)
 * 2. จอแสดงรายการชงของบาริสต้า (Barista Kitchen Display)
 * 3. ระบบบันทึกยอดขายและตรวจสอบของผู้จัดการ (Manager Audit Notifier)
 * ============================================================================
 */
public interface OrderObserver {
    void onOrderStatusChanged(OrderContext order, String message);
}
