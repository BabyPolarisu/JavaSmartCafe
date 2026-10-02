package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: ยกเลิกออเดอร์
 */
public class CancelledState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.println("  ❌ [ออเดอร์ถูกยกเลิกไปแล้ว]: ไม่สามารถดำเนินการต่อได้");
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ℹ️ [ออเดอร์อยู่ในสถานะยกเลิกอยู่แล้ว]");
    }

    @Override
    public String getStateName() {
        return "CANCELLED (ยกเลิกแล้ว)";
    }

    @Override
    public String getDescription() {
        return "ออเดอร์ถูกยกเลิกและยุติการดำเนินการ";
    }
}
