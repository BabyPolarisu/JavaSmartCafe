package smartcafe.decorator;

import smartcafe.model.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * ============================================================================
 * [DECORATOR PATTERN] - Concrete Component
 * ฐานเครื่องดื่มมาตรฐานของร้าน (เช่น กาแฟ, ชานม, ชาผลไม้, สมูทตี้)
 * ============================================================================
 */
public class BaseBeverage implements Beverage {

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
    private final String specialNote;
    private final List<String> baseIngredients;

    public BaseBeverage(String name, BeverageCategory category, double basePrice,
                        BeverageSize size, Temperature temperature, DiningOption diningOption,
                        CupType cupType, SweetnessLevel sweetness, SournessLevel sourness,
                        String iceLevel, String specialNote) {
        this.name = name;
        this.category = category;
        this.basePrice = basePrice;
        this.size = size;
        this.temperature = temperature;
        this.diningOption = diningOption;
        this.cupType = cupType;
        this.sweetness = sweetness;
        this.sourness = sourness;
        this.iceLevel = iceLevel != null ? iceLevel : "ปกติ (100%)";
        this.specialNote = specialNote != null ? specialNote : "-";
        
        this.baseIngredients = new ArrayList<>();
        this.baseIngredients.add(name + " [ฐานเครื่องดื่ม]");
        this.baseIngredients.add("ระดับหวาน: " + sweetness.getDisplayName());
        if (sourness != SournessLevel.NONE_0) {
            this.baseIngredients.add("ระดับเปรี้ยว: " + sourness.getDisplayName());
        }
        if (temperature == Temperature.ICED) {
            this.baseIngredients.add("น้ำแข็ง: " + this.iceLevel);
        }
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getDescription() {
        return name + " (" + size.getDisplayName() + ", " + temperature.getDisplayName() + ")";
    }

    @Override
    public double getCost() {
        return basePrice + size.getPriceOffset();
    }

    @Override
    public BeverageCategory getCategory() {
        return category;
    }

    @Override
    public BeverageSize getSize() {
        return size;
    }

    @Override
    public Temperature getTemperature() {
        return temperature;
    }

    @Override
    public CupType getCupType() {
        return cupType;
    }

    @Override
    public SweetnessLevel getSweetness() {
        return sweetness;
    }

    @Override
    public SournessLevel getSourness() {
        return sourness;
    }

    @Override
    public DiningOption getDiningOption() {
        return diningOption;
    }

    @Override
    public String getIceLevel() {
        return iceLevel;
    }

    @Override
    public String getSpecialNote() {
        return specialNote;
    }

    @Override
    public List<String> getIngredients() {
        return Collections.unmodifiableList(baseIngredients);
    }

    @Override
    public List<ToppingType> getToppings() {
        return Collections.emptyList();
    }

    @Override
    public int getEstimatedBrewTimeMinutes() {
        int minutes = 3;
        if (category == BeverageCategory.SMOOTHIE) {
            minutes = 5;
        } else if (category == BeverageCategory.COFFEE) {
            minutes = (temperature == Temperature.HOT && name.contains("เอสเพรสโซ่")) ? 2 : 3;
        } else if (category == BeverageCategory.FRUIT_TEA) {
            minutes = 3;
        } else if (category == BeverageCategory.MILK_TEA) {
            minutes = 3;
        }
        return minutes;
    }
}
