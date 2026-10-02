package smartcafe.builder;

import smartcafe.model.*;

import java.util.ArrayList;
import java.util.List;

/**
 * [The Single Best-fit Pattern: Builder Pattern]
 * คลาสผู้สร้างเครื่องดื่มแบบกำหนดเองทีละขั้นตอน (Fluent Beverage Builder)
 * แก้ปัญหา Telescoping Constructor Anti-Pattern โดยอนุญาตให้ผู้ใช้กำหนด:
 * 1. ประเภทเครื่องดื่ม (Category & Name)
 * 2. ขนาดและปริมาตร (Size & Volume)
 * 3. อุณหภูมิ (Temperature)
 * 4. รูปแบบการทาน (DiningOption)
 * 5. แก้วที่ใช้ที่เหมาะสม (Appropriate Cup Type)
 * 6. ระดับความหวาน (SweetnessLevel)
 * 7. ระดับความเปรี้ยว (SournessLevel)
 * 8. ท็อปปิ้งเสริม (Toppings)
 */
public class BeverageBuilder {
    private String name = "เครื่องดื่มซิกเนเจอร์";
    private BeverageCategory category = BeverageCategory.COFFEE;
    private double basePrice = 50.0;
    private BeverageSize size = BeverageSize.MEDIUM; // 16 oz / 480 ml
    private Temperature temperature = Temperature.ICED;
    private DiningOption diningOption = DiningOption.TAKEAWAY;
    private CupType customCup = null; // หากไม่ระบุ ระบบจะเลือกแก้วที่เหมาะสมให้อัตโนมัติ
    private SweetnessLevel sweetness = SweetnessLevel.NORMAL_100;
    private SournessLevel sourness = SournessLevel.NONE_0;
    private String iceLevel = "น้ำแข็งปกติ (100%)";
    private final List<ToppingType> toppings = new ArrayList<>();
    private String specialNote = "";

    public BeverageBuilder() {
    }

    public BeverageBuilder setName(String name) {
        this.name = name;
        return this;
    }

    public BeverageBuilder setCategory(BeverageCategory category) {
        this.category = category;
        return this;
    }

    public BeverageBuilder setBasePrice(double basePrice) {
        this.basePrice = basePrice;
        return this;
    }

    /**
     * กำหนดขนาดและปริมาตร (เช่น S: 240ml, M: 480ml, L: 650ml, XL: 750ml)
     */
    public BeverageBuilder setSize(BeverageSize size) {
        this.size = size;
        return this;
    }

    /**
     * กำหนดอุณหภูมิการเสิร์ฟ (ร้อน, เย็น, ปั่น)
     */
    public BeverageBuilder setTemperature(Temperature temperature) {
        this.temperature = temperature;
        return this;
    }

    /**
     * กำหนดรูปแบบการทาน (ทานในร้าน, กลับบ้าน, นำแก้วมาเอง)
     */
    public BeverageBuilder setDiningOption(DiningOption diningOption) {
        this.diningOption = diningOption;
        return this;
    }

    /**
     * กำหนดแก้วโดยตรง (หรือปล่อยว่างไว้เพื่อให้ Builder เลือกแก้วที่เหมาะสมให้อัตโนมัติ)
     */
    public BeverageBuilder setCupType(CupType cupType) {
        this.customCup = cupType;
        return this;
    }

    /**
     * กำหนดระดับความหวาน (0%, 25%, 50%, 100%, 120%)
     */
    public BeverageBuilder setSweetness(SweetnessLevel sweetness) {
        this.sweetness = sweetness;
        return this;
    }

    /**
     * กำหนดระดับความเปรี้ยว (0%, 25%, 50%, 100%)
     */
    public BeverageBuilder setSourness(SournessLevel sourness) {
        this.sourness = sourness;
        return this;
    }

    /**
     * กำหนดระดับน้ำแข็ง
     */
    public BeverageBuilder setIceLevel(String iceLevel) {
        this.iceLevel = iceLevel;
        return this;
    }

    /**
     * เพิ่มท็อปปิ้งเสริม
     */
    public BeverageBuilder addTopping(ToppingType topping) {
        if (topping != null && !this.toppings.contains(topping)) {
            this.toppings.add(topping);
        }
        return this;
    }

    /**
     * ระบุหมายเหตุพิเศษ
     */
    public BeverageBuilder setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
        return this;
    }

    /**
     * อัลกอริทึมเลือกแก้วที่เหมาะสมที่สุดโดยอัตโนมัติ (Appropriate Cup Selection)
     * วิเคราะห์จากอุณหภูมิ รูปแบบการทาน หมวดหมู่ ท็อปปิ้ง และขนาด
     */
    private CupType determineOptimalCup() {
        if (customCup != null) {
            return customCup;
        }

        // กรณีที่ 1: ลูกค้านำแก้วมาเอง
        if (diningOption == DiningOption.BRING_OWN_CUP) {
            return CupType.PERSONAL_TUMBLER;
        }

        // กรณีที่ 2: เครื่องดื่มร้อน
        if (temperature == Temperature.HOT) {
            return diningOption == DiningOption.DINE_IN 
                    ? CupType.CERAMIC_MUG 
                    : CupType.DOUBLE_WALL_PAPER_CUP;
        }

        // กรณีที่ 3: เมนูปั่น (Frappe/Smoothie) หรือมีวิปครีม
        boolean hasWhippedCream = toppings.contains(ToppingType.WHIPPED_CREAM);
        if (temperature == Temperature.FRAPPE || hasWhippedCream || category == BeverageCategory.SMOOTHIE) {
            return CupType.DOME_LID_PET_CUP;
        }

        // กรณีที่ 4: เครื่องดื่มเย็นทั่วไป
        return diningOption == DiningOption.DINE_IN 
                ? CupType.TALL_GLASS_TUMBLER 
                : CupType.ECO_PLA_COLD_CUP;
    }

    /**
     * ประกอบและสร้างอ็อบเจกต์ Beverage ที่สมบูรณ์
     */
    public Beverage build() {
        CupType resolvedCup = determineOptimalCup();
        return new Beverage(
                name,
                category,
                basePrice,
                size,
                temperature,
                diningOption,
                resolvedCup,
                sweetness,
                sourness,
                iceLevel,
                toppings,
                specialNote
        );
    }
}
