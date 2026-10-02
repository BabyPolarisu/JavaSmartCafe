package smartcafe.builder;

import smartcafe.model.*;

/**
 * [Builder Pattern - Director]
 * คลาสผู้ควบคุมลำดับขั้นตอนการสร้างเครื่องดื่มตามสูตรมาตรฐาน (Standard Recipe Director)
 * ใช้ BeverageBuilder ในการประกอบเครื่องดื่มเมนูยอดนิยมอย่างมีแบบแผน
 */
public class BeverageDirector {

    /**
     * สูตรสร้างกาแฟร้อนพรีเมียม ทานในร้าน (Dine-in Hot Coffee)
     */
    public void constructHotCaramelMacchiato(BeverageBuilder builder) {
        builder.setName("คาราเมล มัคคิอาโต้ร้อน (Hot Caramel Macchiato)")
                .setCategory(BeverageCategory.COFFEE)
                .setBasePrice(65.0)
                .setSize(BeverageSize.MEDIUM) // 16 oz / 480 ml (+15 บ.)
                .setTemperature(Temperature.HOT)
                .setDiningOption(DiningOption.DINE_IN)
                .setSweetness(SweetnessLevel.LOW_25) // หวาน 25%
                .setSourness(SournessLevel.NONE_0)  // ไม่เปรี้ยว
                .addTopping(ToppingType.EXTRA_ESPRESSO_SHOT)
                .setSpecialNote("เน้นฟองนมนุ่ม ราดคาราเมลซอสลายตาราง");
    }

    /**
     * สูตรสร้างชาผลไม้สปาร์คลิ่งโซดา สั่งกลับบ้าน (Takeaway High-Sourness Sparkling Fruit Tea)
     */
    public void constructSparklingFruitTea(BeverageBuilder builder) {
        builder.setName("ชาผลไม้รวมเสาวรสพีชสปาร์คลิ่ง (Passion Fruit & Peach Sparkling)")
                .setCategory(BeverageCategory.FRUIT_TEA)
                .setBasePrice(60.0)
                .setSize(BeverageSize.EXTRA_LARGE) // 26 oz / 750 ml (+35 บ.)
                .setTemperature(Temperature.ICED)
                .setDiningOption(DiningOption.TAKEAWAY)
                .setSweetness(SweetnessLevel.HALF_50)      // หวาน 50%
                .setSourness(SournessLevel.EXTRA_100)     // เปรี้ยวจี๊ด 100%
                .setIceLevel("น้ำแข็งปานกลาง 70%")
                .addTopping(ToppingType.ALOE_VERA_JELLY)
                .addTopping(ToppingType.HONEY_LEMON_JELLY)
                .setSpecialNote("ขอเลมอนหั่นแว่นประดับแก้ว 2 ชิ้น");
    }

    /**
     * สูตรสร้างชานมไข่มุกไต้หวันพ่นไฟ นำแก้วมาเอง (Eco Bring-Your-Own-Cup Boba Milk Tea)
     */
    public void constructBubbleMilkTea(BeverageBuilder builder) {
        builder.setName("ชานมไต้หวันบราวน์ชูการ์พ่นไฟ (Taiwan Brown Sugar Boba)")
                .setCategory(BeverageCategory.MILK_TEA)
                .setBasePrice(50.0)
                .setSize(BeverageSize.LARGE) // 22 oz / 650 ml (+25 บ.)
                .setTemperature(Temperature.ICED)
                .setDiningOption(DiningOption.BRING_OWN_CUP) // นำแก้วมาเอง
                .setSweetness(SweetnessLevel.NORMAL_100)     // หวาน 100%
                .setSourness(SournessLevel.NONE_0)
                .setIceLevel("น้ำแข็งปกติ (100%)")
                .addTopping(ToppingType.BROWN_SUGAR_BOBA);
    }

    /**
     * สูตรสร้างสมูทตี้มะม่วงเสาวรสปั่น พร้อมวิปครีม (Mango Passion Smoothie Frappe)
     */
    public void constructMangoPassionSmoothie(BeverageBuilder builder) {
        builder.setName("แมงโก้แพชชั่นฟรุตสมูทตี้ (Mango Passion Fruit Frappe)")
                .setCategory(BeverageCategory.SMOOTHIE)
                .setBasePrice(70.0)
                .setSize(BeverageSize.LARGE) // 22 oz / 650 ml (+25 บ.)
                .setTemperature(Temperature.FRAPPE) // ปั่น
                .setDiningOption(DiningOption.TAKEAWAY)
                .setSweetness(SweetnessLevel.HALF_50)     // หวาน 50%
                .setSourness(SournessLevel.BALANCED_50)  // เปรี้ยว 50%
                .addTopping(ToppingType.WHIPPED_CREAM)
                .setSpecialNote("ปั่นเนื้อเนียนพิเศษ โรยผงเสาวรสกรุบกรอบด้านบน");
    }
}
