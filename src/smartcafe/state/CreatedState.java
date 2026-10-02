package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: สร้างออเดอร์แล้ว รอลูกค้าชำระเงิน
 */
public class CreatedState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.println("  💳 [ชำระเงินสำเร็จ]: กำลังส่งออเดอร์เข้าคิวบาริสต้า...");
        context.setState(new PaidState());
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ❌ [ยกเลิกออเดอร์]: ลูกค้ายกเลิกรายการก่อนชำระเงิน");
        context.setState(new CancelledState());
    }

    @Override
    public String getStateName() {
        return "CREATED (รอชำระเงิน)";
    }

    @Override
    public String getDescription() {
        return "ออเดอร์ถูกสร้างแล้ว อยู่ระหว่างรอลูกค้าชำระเงินที่เคาน์เตอร์หรือแอป";
    }
}
