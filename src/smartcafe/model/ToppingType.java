package smartcafe.model;

/**
 * ท็อปปิ้งและส่วนผสมเสริม (Topping Type)
 */
public enum ToppingType {
    BROWN_SUGAR_BOBA("ไข่มุกบราวน์ชูการ์ทองคำ", 10.0, "ไข่มุกเคี่ยวน้ำตาลทรายแดงเหนียวนุ่ม"),
    ALOE_VERA_JELLY("วุ้นว่านหางจระเข้แท้", 15.0, "เนื้อว่านหางจระเข้กรุบกรอบ เคี้ยวเพลิน"),
    HONEY_LEMON_JELLY("เจลลี่น้ำผึ้งมะนาว", 15.0, "เจลลี่เปรี้ยวอมหวาน หอมกลิ่นน้ำผึ้งแท้"),
    WHIPPED_CREAM("วิปครีมสดพรีเมียม", 15.0, "วิปครีมนมแท้นิวซีแลนด์ ตีฟูเนื้อเนียนนุ่ม"),
    EXTRA_ESPRESSO_SHOT("เพิ่มเอสเพรสโซ่ 1 ช็อต", 20.0, "ช็อตกาแฟคั่วเข้ม อโรม่าแน่น");

    private final String name;
    private final double price;
    private final String description;

    ToppingType(String name, double price, String description) {
        this.name = name;
        this.price = price;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public String getDisplayName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }
}
