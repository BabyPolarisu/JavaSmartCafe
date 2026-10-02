package smartcafe.decorator;

import smartcafe.model.*;
import java.util.List;

/**
 * ============================================================================
 * [DECORATOR PATTERN] - Abstract Decorator
 * ทำหน้าที่เป็นคลาสแม่ของส่วนตกแต่งเครื่องดื่มทั้งหมด ห่อหุ้มอ็อบเจกต์ Beverage
 * ============================================================================
 */
public abstract class BeverageDecorator implements Beverage {

    protected final Beverage wrappedBeverage;

    public BeverageDecorator(Beverage wrappedBeverage) {
        if (wrappedBeverage == null) {
            throw new IllegalArgumentException("Wrapped beverage cannot be null");
        }
        this.wrappedBeverage = wrappedBeverage;
    }

    @Override
    public String getName() {
        return wrappedBeverage.getName();
    }

    @Override
    public String getDescription() {
        return wrappedBeverage.getDescription();
    }

    @Override
    public double getCost() {
        return wrappedBeverage.getCost();
    }

    @Override
    public BeverageCategory getCategory() {
        return wrappedBeverage.getCategory();
    }

    @Override
    public BeverageSize getSize() {
        return wrappedBeverage.getSize();
    }

    @Override
    public Temperature getTemperature() {
        return wrappedBeverage.getTemperature();
    }

    @Override
    public CupType getCupType() {
        return wrappedBeverage.getCupType();
    }

    @Override
    public SweetnessLevel getSweetness() {
        return wrappedBeverage.getSweetness();
    }

    @Override
    public SournessLevel getSourness() {
        return wrappedBeverage.getSourness();
    }

    @Override
    public DiningOption getDiningOption() {
        return wrappedBeverage.getDiningOption();
    }

    @Override
    public String getIceLevel() {
        return wrappedBeverage.getIceLevel();
    }

    @Override
    public String getSpecialNote() {
        return wrappedBeverage.getSpecialNote();
    }

    @Override
    public List<String> getIngredients() {
        return wrappedBeverage.getIngredients();
    }

    @Override
    public List<ToppingType> getToppings() {
        return wrappedBeverage.getToppings();
    }

    @Override
    public int getEstimatedBrewTimeMinutes() {
        return wrappedBeverage.getEstimatedBrewTimeMinutes();
    }
}
