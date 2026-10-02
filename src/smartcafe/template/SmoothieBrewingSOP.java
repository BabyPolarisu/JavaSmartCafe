package smartcafe.template;

import smartcafe.builder.Beverage;

/**
 * [TEMPLATE METHOD PATTERN] - Concrete Class: สูตรการปั่นเครื่องดื่มสมูทตี้
 */
public class SmoothieBrewingSOP extends BrewingSOPTemplate {

    @Override
    protected void extractBase(Beverage beverage) {
        System.out.println("   [ขั้นตอนที่ 2] เตรียมเนื้อผลไม้แท้แช่แข็งและโยเกิร์ต/นมสด ใส่ลงในโถปั่นเกรดพาณิชย์");
    }

    @Override
    protected void handleTemperature(Beverage beverage) {
        System.out.println("   [ขั้นตอนที่ 4] เดินเครื่องปั่นความเร็วสูง 25,000 RPM เป็นเวลา 30 วินาที จนเนื้อเนียนละเอียดเป็นเกล็ดหิมะ");
    }
}
