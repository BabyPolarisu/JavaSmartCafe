package smartcafe.state;

/**
 * [STATE PATTERN] - Concrete State: กำลังชงในครัวตาม SOP
 */
public class BrewingState implements OrderState {

    @Override
    public void next(OrderContext context) {
        System.out.println("  ✨ [ชงเสร็จสมบูรณ์]: บาริสต้าปิดฝา ติดสติ๊กเกอร์ พร้อมส่งมอบ!");
        context.setState(new ReadyState());
    }

    @Override
    public void cancel(OrderContext context) {
        System.out.println("  ⚠️ [ไม่สามารถยกเลิกได้]: เครื่องดื่มกำลังอยู่ในกระบวนการชงแล้ว!");
    }

    @Override
    public String getStateName() {
        return "BREWING (กำลังชงตามสูตร SOP)";
    }

    @Override
    public String getDescription() {
        return "บาริสต้ากำลังดำเนินการชงตามมาตรฐาน SOP ไม่สามารถยกเลิกรายการได้";
    }
}
