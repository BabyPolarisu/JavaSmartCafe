package smartcafe.builder;

import smartcafe.model.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * [Builder & Decorator Pattern - Beverage Product]
 * อ็อบเจกต์เครื่องดื่มที่ผสานทั้งการประกอบด้วย Builder และการประดับตกแต่งด้วย Decorator
 */
public class Beverage implements smartcafe.decorator.Beverage {
    private final String name;
    private final BeverageCategory category;
    private final double basePrice;
    private final BeverageSize size;
    private final Temperature temperature;
    private final DiningOption diningOption;
    private final CupType cupType;
    private final SweetnessLevel sweetness;
    private final SournessLevel sourness;
    private final String iceLevel;
    private final List<ToppingType> toppings;
    private final String specialNote;

    // Package-private Constructor: บังคับให้สร้างผ่าน BeverageBuilder เท่านั้น
    Beverage(String name,
             BeverageCategory category,
             double basePrice,
             BeverageSize size,
             Temperature temperature,
             DiningOption diningOption,
             CupType cupType,
             SweetnessLevel sweetness,
             SournessLevel sourness,
             String iceLevel,
             List<ToppingType> toppings,
             String specialNote) {
        this.name = name;
        this.category = category;
        this.basePrice = basePrice;
        this.size = size;
        this.temperature = temperature;
        this.diningOption = diningOption;
        this.cupType = cupType;
        this.sweetness = sweetness;
        this.sourness = sourness;
        this.iceLevel = iceLevel;
        this.toppings = new ArrayList<>(toppings);
        this.specialNote = specialNote;
    }

    /**
     * คำนวณราคาสุทธิ: ราคาฐาน + ส่วนต่างขนาด + ท็อปปิ้งทั้งหมด (- ส่วนลดนำแก้วมาเอง)
     */
    public double calculateTotalPrice() {
        double total = basePrice + size.getPriceOffset();
        for (ToppingType topping : toppings) {
            total += topping.getPrice();
        }
        if (diningOption == DiningOption.BRING_OWN_CUP) {
            total = Math.max(0.0, total - 5.0); // ส่วนลด Eco 5 บาท
        }
        return total;
    }

    public String getName() {
        return name;
    }

    public BeverageCategory getCategory() {
        return category;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public BeverageSize getSize() {
        return size;
    }

    public Temperature getTemperature() {
        return temperature;
    }

    public DiningOption getDiningOption() {
        return diningOption;
    }

    public CupType getCupType() {
        return cupType;
    }

    public SweetnessLevel getSweetness() {
        return sweetness;
    }

    public SournessLevel getSourness() {
        return sourness;
    }

    public String getIceLevel() {
        return iceLevel;
    }

    public List<ToppingType> getToppings() {
        return Collections.unmodifiableList(toppings);
    }

    public String getSpecialNote() {
        return specialNote;
    }

    @Override
    public String getDescription() {
        return name + " (" + size.getDisplayName() + ", " + temperature.getDisplayName() + ")";
    }

    @Override
    public double getCost() {
        return calculateTotalPrice();
    }

    @Override
    public List<String> getIngredients() {
        List<String> list = new ArrayList<>();
        list.add(name);
        list.add("ขนาด: " + size.getDisplayName());
        list.add("หวาน: " + sweetness.getDisplayName());
        if (sourness != SournessLevel.NONE_0) {
            list.add("เปรี้ยว: " + sourness.getDisplayName());
        }
        for (ToppingType t : toppings) {
            list.add(t.getDisplayName());
        }
        return Collections.unmodifiableList(list);
    }

    /**
     * แสดงรายละเอียดของเครื่องดื่มที่สร้างขึ้น
     */
    public void displayBeverageCard() {
        System.out.println("=======================================================================");
        System.out.printf("  🍹 [เมนู]: %s [%s]%n", name, temperature.getLabel());
        System.out.println("-----------------------------------------------------------------------");
        System.out.printf("  • หมวดหมู่       : %s%n", category.getDisplayName());
        System.out.printf("  • ขนาด & ปริมาตร : %s (%d oz / %d ml)%n", size.getLabel(), size.getOz(), size.getMl());
        System.out.printf("  • การรับประทาน   : %s%n", diningOption.getLabel());
        System.out.printf("  • แก้วที่เหมาะสม : %s%n", cupType.getDisplayName());
        System.out.printf("    - วัสดุ        : %s%n", cupType.getMaterial());
        System.out.printf("    - ฝาปิด        : %s%n", cupType.getLidType());
        System.out.printf("    - เหตุผล       : %s%n", cupType.getSuitabilityReason());
        System.out.printf("  • ระดับความหวาน  : %s (%d%%)%n", sweetness.getDescription(), sweetness.getPercentage());
        if (sourness != SournessLevel.NONE_0) {
            System.out.printf("  • ระดับความเปรี้ยว: %s (%d%%)%n", sourness.getDescription(), sourness.getPercentage());
        }
        if (temperature != Temperature.HOT) {
            System.out.printf("  • ระดับน้ำแข็ง   : %s%n", iceLevel);
        }
        if (!toppings.isEmpty()) {
            System.out.print("  • ท็อปปิ้งเสริม  : ");
            for (int i = 0; i < toppings.size(); i++) {
                ToppingType t = toppings.get(i);
                System.out.printf("%s (+%.0fบ.)%s", t.getName(), t.getPrice(), (i < toppings.size() - 1 ? ", " : ""));
            }
            System.out.println();
        }
        if (specialNote != null && !specialNote.isBlank()) {
            System.out.printf("  • หมายเหตุพิเศษ  : %s%n", specialNote);
        }
        System.out.printf("  • เวลาประมาณการชง: ประมาณ %d นาที%n", getEstimatedBrewTimeMinutes());
        System.out.println("-----------------------------------------------------------------------");
        System.out.printf("  💰 ราคาสุทธิ     : %.2f บาท %s%n",
                calculateTotalPrice(),
                (diningOption == DiningOption.BRING_OWN_CUP ? "(หักส่วนลดนำแก้วมาเอง -5 บ.)" : ""));
        System.out.println("=======================================================================\n");
    }

    @Override
    public int getEstimatedBrewTimeMinutes() {
        int minutes = 3;
        if (category == BeverageCategory.SMOOTHIE) {
            minutes = 5;
        } else if (category == BeverageCategory.COFFEE) {
            minutes = (temperature == Temperature.HOT && name.contains("เอสเพรสโซ่")) ? 2 : (name.contains("เดอร์ตี้") ? 4 : 3);
        } else if (category == BeverageCategory.FRUIT_TEA) {
            minutes = name.contains("เลมอน") ? 2 : 3;
        } else if (category == BeverageCategory.MILK_TEA) {
            minutes = name.contains("มัทฉะ") ? 4 : 3;
        }
        if (toppings != null && toppings.size() >= 2) {
            minutes += 1;
        }
        return minutes;
    }
}
