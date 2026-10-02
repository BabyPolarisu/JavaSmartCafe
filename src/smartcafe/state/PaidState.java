package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: ชำระเงินแล้ว กำลังรอคิวบาริสต้า
 */
public class PaidState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.printf("  ☕ [เริ่มชงเครื่องดื่ม]: บาริสต้าเริ่มชงตามสูตร SOP (เวลาประมาณการชง: ~%d นาที)...%n",
                context.getEstimatedBrewTimeMinutes());
        context.setState(new BrewingState());
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ↩️ [คืนเงินและยกเลิก]: คืนเงินเต็มจำนวนเนื่องจากยังไม่ได้เริ่มชง");
        context.setState(new CancelledState());
    }

    @Override
    public String getStateName() {
        return "PAID (ชำระแล้ว - เข้าคิวชง)";
    }

    @Override
    public String getDescription() {
        return "ชำระเงินเรียบร้อยแล้ว รายการเข้าสู่ระบบคิวในครัวบาริสต้า";
    }
}
