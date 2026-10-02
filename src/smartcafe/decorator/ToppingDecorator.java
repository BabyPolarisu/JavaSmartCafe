package smartcafe.decorator;

import smartcafe.model.ToppingType;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * ============================================================================
 * [DECORATOR PATTERN] - Concrete Decorator
 * เพิ่ม Topping และคำนวณราคาบวกเพิ่มสะสม (Extra Shot, Boba, Jelly, Whip Cream ฯลฯ)
 * ============================================================================
 */
public class ToppingDecorator extends BeverageDecorator {

    private final ToppingType topping;

    public ToppingDecorator(Beverage wrappedBeverage, ToppingType topping) {
        super(wrappedBeverage);
        if (topping == null) {
            throw new IllegalArgumentException("Topping cannot be null");
        }
        this.topping = topping;
    }

    @Override
    public String getDescription() {
        return super.getDescription() + " + " + topping.getDisplayName() + " (+" + (int) topping.getPrice() + "บ.)";
    }

    @Override
    public double getCost() {
        return super.getCost() + topping.getPrice();
    }

    @Override
    public List<String> getIngredients() {
        List<String> ingredients = new ArrayList<>(super.getIngredients());
        ingredients.add("ท็อปปิ้ง: " + topping.getDisplayName() + " (+" + (int) topping.getPrice() + " บาท)");
        return Collections.unmodifiableList(ingredients);
    }

    @Override
    public List<ToppingType> getToppings() {
        List<ToppingType> list = new ArrayList<>(super.getToppings());
        list.add(topping);
        return Collections.unmodifiableList(list);
    }

    public ToppingType getTopping() {
        return topping;
    }
}
