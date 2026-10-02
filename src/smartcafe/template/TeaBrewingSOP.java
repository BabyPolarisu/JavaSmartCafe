package smartcafe.template;

import smartcafe.builder.Beverage;
import smartcafe.model.Temperature;

/**
 * [TEMPLATE METHOD PATTERN] - Concrete Class: สูตรการสกัดชาและชาผลไม้สด
 */
public class TeaBrewingSOP extends BrewingSOPTemplate {

    @Override
    protected void extractBase(Beverage beverage) {
        System.out.println("   [ขั้นตอนที่ 2] แช่ใบชาคัดเกรดในน้ำร้อน 85°C นาน 4 นาที เพื่อดึงสารแทนนินและกลิ่นหอมอโรม่าสูงสุด");
    }

    @Override
    protected void handleTemperature(Beverage beverage) {
        if (beverage.getTemperature() == Temperature.HOT) {
            System.out.println("   [ขั้นตอนที่ 4] อุ่นชาที่อุณหภูมิคงที่ 75°C เพื่อคงความหอม");
        } else {
            System.out.printf("   [ขั้นตอนที่ 4] เชคชาในแก้วเชคเกอร์พร้อมน้ำแข็ง: %s และเติมความซ่า/ความสดชื่น%n", beverage.getIceLevel());
        }
    }
}
