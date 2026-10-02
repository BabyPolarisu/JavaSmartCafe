package smartcafe.model;

/**
 * รูปแบบการรับประทาน (Dining Option)
 * เพื่อใช้ในการตัดสินใจเลือกแก้วและภาชนะที่เหมาะสมที่สุด
 */
public enum DiningOption {
    DINE_IN("ทานที่ร้าน (Dine-in)", "เน้นประสบการณ์แก้วกระจก/เซรามิก สวยงาม รักษ์โลก"),
    TAKEAWAY("สั่งกลับบ้าน (Takeaway)", "เน้นความสะดวก ฉนวนเก็บอุณหภูมิ และความปลอดภัยในการเดินทาง"),
    BRING_OWN_CUP("ลูกค้านำแก้วมาเอง (Bring Own Cup)", "ลดขยะ พร้อมรับส่วนลด Eco-Discount ทันที");

    private final String label;
    private final String description;

    DiningOption(String label, String description) {
        this.label = label;
        this.description = description;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }
}
