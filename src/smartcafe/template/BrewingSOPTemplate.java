package smartcafe.template;

import smartcafe.builder.Beverage;
import smartcafe.model.Temperature;
import smartcafe.model.ToppingType;

/**
 * ============================================================================
 * [TEMPLATE METHOD PATTERN] - Abstract Class
 * ระบบขั้นตอนและสูตรมาตรฐานการชง (Standard Operating Procedure - SOP Workflow)
 * ----------------------------------------------------------------------------
 * ความเหมาะสมกับร้าน: เหมาะสมที่สุดในการกำหนดโครงร่างขั้นตอนการชงเครื่องดื่ม (SOP)
 * ของบาริสต้าที่มีลำดับขั้นตอนตายตัว แต่เปิดให้เครื่องดื่มแต่ละหมวดหมู่นำไป override
 * เฉพาะขั้นตอนการสกัดเบส (Base Extraction) และการจัดการอุณหภูมิ (Temperature Handling)
 * ============================================================================
 */
public abstract class BrewingSOPTemplate {

    /**
     * Template Method: ควบคุมขั้นตอนการชงตั้งแต่ต้นจนจบ (ห้าม override)
     */
    public final void prepareBeverage(Beverage beverage) {
        System.out.println("  -------------------------------------------------------------");
        System.out.printf("  👨‍🍳 [เริ่มกระบวนการชง SOP]: %s%n", beverage.getName());
        selectAndSanitizeCup(beverage);
        extractBase(beverage);
        tuneSweetnessAndSourness(beverage);
        handleTemperature(beverage);
        addToppingsAndGarnish(beverage);
        sealAndAttachOrderLabel(beverage);
        System.out.println("  ✨ [ชงเสร็จสมบูรณ์ พร้อมเสิร์ฟ!]");
        System.out.println("  -------------------------------------------------------------");
    }

    // Step 1: สุขอนามัยและเตรียมภาชนะ
    protected void selectAndSanitizeCup(Beverage beverage) {
        System.out.printf("   [ขั้นตอนที่ 1] หยิบและเตรียมภาชนะ: %s (วัสดุ: %s)%n",
                beverage.getCupType().getDisplayName(), beverage.getCupType().getMaterial());
    }

    // Step 2: ขั้นตอนสกัดเครื่องดื่มหลัก (บังคับให้แต่ละประเภทรองรับเอง)
    protected abstract void extractBase(Beverage beverage);

    // Step 3: ปรับความหวานและความเปรี้ยว
    protected void tuneSweetnessAndSourness(Beverage beverage) {
        System.out.printf("   [ขั้นตอนที่ 3] ปรุงความหวาน: %d%% (%s) | ปรุงความเปรี้ยว: %d%% (%s)%n",
                beverage.getSweetness().getPercentage(), beverage.getSweetness().getDescription(),
                beverage.getSourness().getPercentage(), beverage.getSourness().getDescription());
    }

    // Step 4: จัดการอุณหภูมิ (ใส่น้ำแข็ง หรือ สตรีมนมร้อน)
    protected abstract void handleTemperature(Beverage beverage);

    // Step 5: ใส่ท็อปปิ้ง
    protected void addToppingsAndGarnish(Beverage beverage) {
        if (beverage.getToppings().isEmpty()) {
            System.out.println("   [ขั้นตอนที่ 5] ไม่ใส่ท็อปปิ้งเพิ่มเติม");
        } else {
            System.out.print("   [ขั้นตอนที่ 5] ใส่ท็อปปิ้งตามลำดับความหนาแน่น: ");
            for (ToppingType t : beverage.getToppings()) {
                System.out.print("[" + t.getName() + "] ");
            }
            System.out.println();
        }
    }

    // Step 6: บรรจุภัณฑ์และติดฉลาก
    protected void sealAndAttachOrderLabel(Beverage beverage) {
        System.out.printf("   [ขั้นตอนที่ 6] ปิดฝา: %s และพิมพ์สติ๊กเกอร์บาร์โค้ดติดข้างแก้ว%n",
                beverage.getCupType().getLidType());
    }
}
