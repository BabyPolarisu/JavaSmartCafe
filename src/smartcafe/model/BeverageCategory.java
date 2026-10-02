package smartcafe.model;

/**
 * หมวดหมู่ของเครื่องดื่มในร้าน (Beverage Category)
 */
public enum BeverageCategory {
    COFFEE("กาแฟสด (Specialty Coffee)", "กลิ่นหอมอโรม่า สกัดสดใหม่จากเมล็ดพรีเมียม"),
    MILK_TEA("ชาและชานม (Tea & Milk Tea)", "ใบชาคัดเกรด ต้มสด สัมผัสนุ่มละมุนลิ้น"),
    FRUIT_TEA("ชาผลไม้และโซดา (Fruit Tea & Sparkling)", "ผลไม้แท้ผสมความสดชื่น ซาบซ่าดับกระหาย"),
    SMOOTHIE("สมูทตี้และเครื่องดื่มปั่น (Smoothie & Frappe)", "เนื้อเนียนละเอียด เข้มข้น กลมกล่อม");

    private final String displayName;
    private final String description;

    BeverageCategory(String displayName, String description) {
        this.displayName = displayName;
        this.description = description;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getDescription() {
        return description;
    }
}
