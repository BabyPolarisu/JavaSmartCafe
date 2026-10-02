package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: เครื่องดื่มพร้อมรับ รอลูกค้ามารับสินค้า
 */
public class ReadyState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.println("  🎉 [ส่งมอบสำเร็จ]: ลูกค้ารับเครื่องดื่มเรียบร้อยแล้ว ขอบคุณที่ใช้บริการ!");
        context.setState(new CompletedState());
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ⚠️ [ไม่สามารถยกเลิกได้]: เครื่องดื่มทำเสร็จและรอรับอยู่ที่บาร์แล้ว");
    }

    @Override
    public String getStateName() {
        return "READY (พร้อมรับสินค้า - เรียกคิว)";
    }

    @Override
    public String getDescription() {
        return "เครื่องดื่มพร้อมเสิร์ฟที่เคาน์เตอร์ เรียกหมายเลขคิวเพื่อให้ลูกค้ารับสินค้า";
    }
}
