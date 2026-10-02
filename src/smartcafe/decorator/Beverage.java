package smartcafe.decorator;

import smartcafe.model.*;
import java.util.List;

/**
 * ============================================================================
 * [DECORATOR PATTERN] - Component Interface
 * ระบบเครื่องดื่มและการคำนวณราคาสะสม (Beverage & Customization Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสมกับร้าน: เหมาะสมที่สุดในการสร้างเครื่องดื่มพื้นฐานและห่อหุ้ม (Decorate)
 * ด้วย Topping หรือส่วนผสมเสริมทีละชั้น คำนวณราคาและคุณสมบัติสะสมได้ไม่รู้จบตาม OCP
 * ============================================================================
 */
public interface Beverage {
    String getName();
    String getDescription();
    double getCost();
    BeverageCategory getCategory();
    BeverageSize getSize();
    Temperature getTemperature();
    CupType getCupType();
    SweetnessLevel getSweetness();
    SournessLevel getSourness();
    DiningOption getDiningOption();
    String getIceLevel();
    String getSpecialNote();
    List<String> getIngredients();
    List<ToppingType> getToppings();
    int getEstimatedBrewTimeMinutes();
}
