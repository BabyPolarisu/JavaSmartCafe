package smartcafe;

import smartcafe.builder.Beverage;
import smartcafe.builder.BeverageBuilder;
import smartcafe.builder.BeverageDirector;
import smartcafe.decorator.BaseBeverage;
import smartcafe.decorator.ToppingDecorator;
import smartcafe.facade.Order;
import smartcafe.facade.SmartCafeFacade;
import smartcafe.model.*;
import smartcafe.pricing.*;

/**
 * ============================================================================
 * ☕ SMART CAFE SYSTEM (ระบบร้านขายเครื่องดื่มอัจฉริยะ)
 * การออกแบบสถาปัตยกรรมด้วย GoF Design Patterns ที่เหมาะสมที่สุดกับแต่ละระบบในร้าน
 * ============================================================================
 * 
 * การจัดสรร Design Pattern ตามความเหมาะสมของแต่ละระบบย่อย (Subsystem Mapping):
 * ----------------------------------------------------------------------------
 * 1. 🎨 [Decorator Pattern]      : ระบบเครื่องดื่ม & ส่วนผสมเสริม (BaseBeverage + ToppingDecorators)
 * 2. 🔨 [Builder Pattern]        : ระบบการประกอบสเปกออเดอร์ & คัดเลือกแก้วที่เหมาะสมอัตโนมัติ
 * 3. 💡 [Strategy Pattern]       : ระบบคิดราคา โปรโมชัน และส่วนลด (Regular, Member, EcoCup, Student)
 * 4. 🔄 [State Pattern]          : ระบบวงจรชีวิตออเดอร์ (Created -> Paid -> Brewing -> Ready -> Completed)
 * 5. 📢 [Observer Pattern]       : ระบบแจ้งเตือนคิวหน้าร้าน & จอในครัว (Queue Display & Kitchen KDS)
 * 6. ☕ [Template Method Pattern]: ระบบขั้นตอนการชงตามสูตรมาตรฐาน SOP (Coffee, Tea, Smoothie SOP)
 * 7. 🏛️ [Facade Pattern]         : ระบบเคาน์เตอร์แคชเชียร์และรวมศูนย์การทำงาน (SmartCafeFacade)
 * ============================================================================
 */
public class Main {

    public static void main(String[] args) {
        ensureUtf8();

        printHeader();

        SmartCafeFacade cafeFacade = new SmartCafeFacade();
        BeverageDirector director = new BeverageDirector();

        // --------------------------------------------------------------------
        // แก้วที่ 1: กาแฟร้อนพรีเมียม (สมาชิก VIP ลด 10%)
        // แสดงการทำงานร่วมกัน: Builder + Strategy + State + Observer + Template Method
        // --------------------------------------------------------------------
        System.out.println(">>>>>>>>>> [รายการที่ 1: กาแฟร้อนพรีเมียม (สมาชิกร้าน VIP)] <<<<<<<<<<");
        BeverageBuilder builder1 = new BeverageBuilder();
        director.constructHotCaramelMacchiato(builder1);
        Beverage drink1 = builder1.build();

        drink1.displayBeverageCard();
        cafeFacade.processFullOrderFlow(drink1, new MemberPricing());

        // --------------------------------------------------------------------
        // แก้วที่ 2: ชาผลไม้รวมสปาร์คลิ่ง ไซส์ XL (ลูกค้านำแก้วมาเอง Eco Hero -10฿)
        // แสดงการคัดเลือกแก้วชีวภาพ/กระบอกน้ำ และการใช้ TeaBrewingSOP
        // --------------------------------------------------------------------
        System.out.println(">>>>>>>>>> [รายการที่ 2: ชาผลไม้รวมเสาวรสพีชโซดา (ลูกค้ารักษ์โลก นำแก้วมาเอง)] <<<<<<<<<<");
        BeverageBuilder builder2 = new BeverageBuilder();
        director.constructSparklingFruitTea(builder2);
        builder2.setDiningOption(DiningOption.BRING_OWN_CUP); // เปลี่ยนเป็นลูกค้านำแก้วมาเอง
        Beverage drink2 = builder2.build();

        drink2.displayBeverageCard();
        cafeFacade.processFullOrderFlow(drink2, new EcoCupPricing());

        // --------------------------------------------------------------------
        // แก้วที่ 3: สมูทตี้มะม่วงเสาวรสปั่น ราดวิปครีม (ส่วนลดนักเรียน/นักศึกษา 15%)
        // แสดงการเลือกแก้วฝาโดมทรงสูง และการปั่นด้วย SmoothieBrewingSOP
        // --------------------------------------------------------------------
        System.out.println(">>>>>>>>>> [รายการที่ 3: สมูทตี้มะม่วงปั่นราดวิปครีม (ส่วนลดนักศึกษา 15%)] <<<<<<<<<<");
        BeverageBuilder builder3 = new BeverageBuilder();
        director.constructMangoPassionSmoothie(builder3);
        Beverage drink3 = builder3.build();

        drink3.displayBeverageCard();
        cafeFacade.processFullOrderFlow(drink3, new StudentPricing());

        // --------------------------------------------------------------------
        // แก้วที่ 4: สาธิต Decorator Pattern แบบเพียว (Pure Decorator Demonstration)
        // ฐานเครื่องดื่มห่อหุ้มด้วย ToppingDecorator ซ้อนกัน 3 ชั้น
        // --------------------------------------------------------------------
        System.out.println(">>>>>>>>>> [รายการที่ 4: สาธิต Decorator Pattern แบบเพียว (Pure Decorator)] <<<<<<<<<<");
        smartcafe.decorator.Beverage pureDrink = new BaseBeverage(
                "มัทฉะลาเต้เกียวโตแท้",
                BeverageCategory.MILK_TEA,
                65.0,
                BeverageSize.LARGE,
                Temperature.ICED,
                DiningOption.DINE_IN,
                CupType.TALL_GLASS_TUMBLER,
                SweetnessLevel.HALF_50,
                SournessLevel.NONE_0,
                "น้ำแข็งปกติ",
                "ชาเขียวมัทฉะแท้จากญี่ปุ่น ชงสดแก้วต่อแก้ว"
        );

        // ทำการ Decorate เพิ่ม Toppings ทีละชั้น
        pureDrink = new ToppingDecorator(pureDrink, ToppingType.BROWN_SUGAR_BOBA); // +10
        pureDrink = new ToppingDecorator(pureDrink, ToppingType.ALOE_VERA_JELLY);  // +15
        pureDrink = new ToppingDecorator(pureDrink, ToppingType.WHIPPED_CREAM);    // +15

        System.out.println("  🍹 [เครื่องดื่มหลัง Decorate]: " + pureDrink.getDescription());
        System.out.printf("  💰 [ราคารวมสะสมผ่าน Decorator]: %.2f บาท%n", pureDrink.getCost());
        System.out.println("  📝 [รายการส่วนผสมที่ผสานเข้ามา]:");
        for (String ingredient : pureDrink.getIngredients()) {
            System.out.println("     - " + ingredient);
        }
        System.out.println();

        // --------------------------------------------------------------------
        // สรุปคุณค่าของสถาปัตยกรรม Multi-Pattern ที่เหมาะสมที่สุดกับร้าน
        // --------------------------------------------------------------------
        printArchitectureSummary();
    }

    private static void printHeader() {
        System.out.println("=======================================================================");
        System.out.println("        ☕ SMART CAFE SYSTEM : ระบบร้านขายเครื่องดื่มอัจฉริยะ             ");
        System.out.println("    [การจัดสรร Design Patterns ที่เหมาะสมที่สุดกับแต่ละระบบในร้าน]        ");
        System.out.println("=======================================================================");
        System.out.println("  1. Decorator Pattern       -> ออกแบบและห่อหุ้มท็อปปิ้งเครื่องดื่ม คำนวณราคาสะสม");
        System.out.println("  2. Builder Pattern         -> ประกอบสเปกเครื่องดื่มซับซ้อน + เลือกแก้วที่เหมาะสม");
        System.out.println("  3. Strategy Pattern        -> จัดการนโยบายราคาและส่วนลด (Regular, VIP, Eco, Student)");
        System.out.println("  4. State Pattern           -> ควบคุมวงจรสถานะออเดอร์ (Created->Paid->Brewing->Ready->Done)");
        System.out.println("  5. Observer Pattern        -> แจ้งเตือนจอคิวหน้าร้าน จอบาริสต้า และระบบ Audit Log");
        System.out.println("  6. Template Method Pattern -> กำหนดขั้นตอนการชงมาตรฐาน SOP ในครัว");
        System.out.println("  7. Facade Pattern          -> จุดบริการเคาน์เตอร์แคชเชียร์แบบเบ็ดเสร็จ");
        System.out.println("=======================================================================\n");
    }

    private static void printArchitectureSummary() {
        System.out.println("=======================================================================");
        System.out.println("🏆 สรุปผลลัพธ์เชิงสถาปัตยกรรม: 'ระบบไหนเหมาะกับ Pattern ไหน'");
        System.out.println("=======================================================================");
        System.out.println(" • ระบบเครื่องดื่ม & ท็อปปิ้ง  : DECORATOR PATTERN (ขยายท็อปปิ้งอิสระตาม OCP)");
        System.out.println(" • ระบบรับสเปก & เลือกภาชนะแก้ว: BUILDER PATTERN (ประกอบหลายมิติ + เลือกแก้วอัตโนมัติ)");
        System.out.println(" • ระบบส่วนลด & โปรโมชัน      : STRATEGY PATTERN (สลับนโยบายราคาได้แบบ Runtime)");
        System.out.println(" • ระบบติดตามวงจรชีวิตออเดอร์ : STATE PATTERN (ป้องกันข้อผิดพลาดในการเปลี่ยนสถานะ)");
        System.out.println(" • ระบบจอแสดงผลคิว & ครัว     : OBSERVER PATTERN (กระจายข้อมูลแบบ Loose Coupling)");
        System.out.println(" • ระบบมาตรฐานการชงบาริสต้า   : TEMPLATE METHOD (โครงสร้าง SOP คงที่ ปรับย่อยตามหมวด)");
        System.out.println(" • ระบบรวมศูนย์หน้าร้าน POS    : FACADE PATTERN (เรียกใช้งานง่ายผ่านจุดเดียว)");
        System.out.println("=======================================================================");
    }

    private static void ensureUtf8() {
        try {
            System.setOut(new java.io.PrintStream(System.out, true, java.nio.charset.StandardCharsets.UTF_8.name()));
        } catch (Exception ignored) {
        }
    }
}
