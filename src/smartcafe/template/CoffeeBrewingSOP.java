package smartcafe.template;

import smartcafe.builder.Beverage;
import smartcafe.model.Temperature;

/**
 * [TEMPLATE METHOD PATTERN] - Concrete Class: สูตรการสกัดกาแฟสด Specialty Coffee
 */
public class CoffeeBrewingSOP extends BrewingSOPTemplate {

    @Override
    protected void extractBase(Beverage beverage) {
        System.out.println("   [ขั้นตอนที่ 2] บดเมล็ดกาแฟ Specialty Arabica 18g และสกัดช็อตเอสเพรสโซ่ด้วยแรงดัน 9 บาร์ (28 วินาที)");
    }

    @Override
    protected void handleTemperature(Beverage beverage) {
        if (beverage.getTemperature() == Temperature.HOT) {
            System.out.println("   [ขั้นตอนที่ 4] สตรีมนมสดแท้ที่อุณหภูมิ 65°C ให้เกิดไมโครโฟมนุ่มละมุน และเทผสมเอสเพรสโซ่");
        } else {
            System.out.printf("   [ขั้นตอนที่ 4] ตักน้ำแข็งก้อนบริสุทธิ์: %s และเทนมสด/น้ำเย็นผสม%n", beverage.getIceLevel());
        }
    }
}
