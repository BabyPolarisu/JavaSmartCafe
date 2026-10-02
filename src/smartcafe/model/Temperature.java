package smartcafe.model;

/**
 * อุณหภูมิการเสิร์ฟของเครื่องดื่ม (Serving Temperature)
 */
public enum Temperature {
    HOT("ร้อน (Hot)", "เสิร์ฟร้อนอุณหภูมิ 75°C - 85°C กลิ่นหอมกรุ่น"),
    ICED("เย็น (Iced)", "เสิร์ฟเย็นผสมน้ำแข็งอนามัย ชื่นใจดับกระหาย"),
    FRAPPE("ปั่น (Frappe / Blended)", "ปั่นเนื้อเนียนละเอียด ละมุนลิ้น");

    private final String label;
    private final String description;

    Temperature(String label, String description) {
        this.label = label;
        this.description = description;
    }

    public String getLabel() {
        return label;
    }

    public String getDisplayName() {
        return label;
    }

    public String getDescription() {
        return description;
    }
}
