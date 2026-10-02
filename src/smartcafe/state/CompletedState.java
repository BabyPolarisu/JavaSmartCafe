package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: ส่งมอบเสร็จสิ้น จบกระบวนการ
 */
public class CompletedState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.println("  ℹ️ [ออเดอร์เสร็จสิ้นสมบูรณ์แล้ว]: ปิดรอบออเดอร์");
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ⚠️ [ไม่สามารถยกเลิกได้]: ออเดอร์ถูกส่งมอบและปิดรอบไปแล้ว");
    }

    @Override
    public String getStateName() {
        return "COMPLETED (เสร็จสมบูรณ์)";
    }

    @Override
    public String getDescription() {
        return "ออเดอร์ถูกส่งมอบเรียบร้อย สิ้นสุดวงจรชีวิตของรายการนี้";
    }
}
