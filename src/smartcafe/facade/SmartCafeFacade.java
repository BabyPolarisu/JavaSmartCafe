package smartcafe.facade;

import smartcafe.builder.Beverage;
import smartcafe.builder.BeverageBuilder;
import smartcafe.model.BeverageCategory;
import smartcafe.observer.BaristaKitchenDisplay;
import smartcafe.observer.CustomerQueueDisplay;
import smartcafe.observer.ManagerAuditNotifier;
import smartcafe.pricing.PricingStrategy;
import smartcafe.pricing.RegularPricing;
import smartcafe.template.BrewingSOPTemplate;
import smartcafe.template.CoffeeBrewingSOP;
import smartcafe.template.SmoothieBrewingSOP;
import smartcafe.template.TeaBrewingSOP;

import java.util.HashMap;
import java.util.Map;

/**
 * ============================================================================
 * [FACADE PATTERN] - Unified Subsystem Interface
 * ระบบเคาน์เตอร์แคชเชียร์และจุดบริการเบ็ดเสร็จ (Smart Cafe Facade)
 * ----------------------------------------------------------------------------
 * ความเหมาะสมกับร้าน: รวมความซับซ้อนของทั้ง 6 Subsystem ของร้านกาแฟ:
 * 1. Builder & Decorator (สร้างเครื่องดื่ม & คัดเลือกแก้ว)
 * 2. Strategy (คำนวณราคา & ส่วนลด)
 * 3. State (วงจรชีวิตออเดอร์)
 * 4. Observer (แจ้งเตือนจอคิว & ครัว)
 * 5. Template Method (ชงเครื่องดื่มตาม SOP)
 * ให้ Client หรือแคชเชียร์เรียกใช้งานผ่าน API เดียวได้อย่างราบรื่น
 * ============================================================================
 */
public class SmartCafeFacade {

    private int orderCounter = 101;
    private final CustomerQueueDisplay queueDisplay;
    private final BaristaKitchenDisplay baristaDisplay;
    private final ManagerAuditNotifier auditNotifier;

    private final CoffeeBrewingSOP coffeeSOP;
    private final TeaBrewingSOP teaSOP;
    private final SmoothieBrewingSOP smoothieSOP;

    private final Map<String, Order> activeOrders = new HashMap<>();

    public SmartCafeFacade() {
        this.queueDisplay = new CustomerQueueDisplay();
        this.baristaDisplay = new BaristaKitchenDisplay();
        this.auditNotifier = new ManagerAuditNotifier();

        this.coffeeSOP = new CoffeeBrewingSOP();
        this.teaSOP = new TeaBrewingSOP();
        this.smoothieSOP = new SmoothieBrewingSOP();
    }

    /**
     * รับออเดอร์ใหม่: สร้าง Beverage และผูก Observers
     */
    public Order placeOrder(Beverage beverage, PricingStrategy pricingStrategy) {
        String orderId = "A" + (orderCounter++);
        PricingStrategy strategy = pricingStrategy != null ? pricingStrategy : new RegularPricing();

        Order order = new Order(orderId, beverage, strategy);

        // เชื่อมโยง Observer เข้ากับออเดอร์
        order.getOrderContext().registerObserver(queueDisplay);
        order.getOrderContext().registerObserver(baristaDisplay);
        order.getOrderContext().registerObserver(auditNotifier);

        activeOrders.put(orderId, order);

        System.out.println("=======================================================================");
        System.out.printf("  🛒 [รับออเดอร์ใหม่]: หมายเลขออเดอร์ #%s (%s)%n", orderId, order.getOrderTime());
        System.out.printf("     - ลูกค้าเลือกเมนู: %s [%s]%n", beverage.getName(), beverage.getSize().getDisplayName());
        System.out.printf("     - นโยบายราคา: %s%n", strategy.getStrategyName());
        System.out.printf("     - ยอดสุทธิที่ต้องชำระ: %.2f บาท%n", order.getFinalPrice());
        System.out.println("=======================================================================");

        return order;
    }

    /**
     * ดำเนินการชำระเงิน (Transition จาก Created -> Paid)
     */
    public void processPayment(String orderId) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            System.out.println("❌ ไม่พบออเดอร์รหัส: " + orderId);
            return;
        }
        System.out.println("\n--- [ขั้นตอนการชำระเงิน] ---");
        order.getOrderContext().nextState();
    }

    /**
     * สั่งบาริสต้าเริ่มชงตามสูตร SOP (Transition จาก Paid -> Brewing -> รัน Template Method)
     */
    public void startBrewing(String orderId) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            System.out.println("❌ ไม่พบออเดอร์รหัส: " + orderId);
            return;
        }
        System.out.println("\n--- [ขั้นตอนการเข้าครัวและเริ่มชง] ---");
        order.getOrderContext().nextState();

        // เลือก Template Method ที่ตรงกับหมวดหมู่เครื่องดื่ม
        BeverageCategory cat = order.getBeverage().getCategory();
        BrewingSOPTemplate sop;
        if (cat == BeverageCategory.COFFEE) {
            sop = coffeeSOP;
        } else if (cat == BeverageCategory.SMOOTHIE) {
            sop = smoothieSOP;
        } else {
            sop = teaSOP;
        }

        // ดำเนินการชงตามขั้นตอน Template Method
        sop.prepareBeverage(order.getBeverage());
    }

    /**
     * บาริสต้าชงเสร็จแล้ว (Transition จาก Brewing -> Ready -> Observer ส่งเสียงเรียกคิว)
     */
    public void finishBrewing(String orderId) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            System.out.println("❌ ไม่พบออเดอร์รหัส: " + orderId);
            return;
        }
        System.out.println("\n--- [ขั้นตอนการส่งมอบไปที่จุดรับเครื่องดื่ม] ---");
        order.getOrderContext().nextState();
    }

    /**
     * ลูกค้ามารับสินค้า (Transition จาก Ready -> Completed)
     */
    public void serveCustomer(String orderId) {
        Order order = activeOrders.get(orderId);
        if (order == null) {
            System.out.println("❌ ไม่พบออเดอร์รหัส: " + orderId);
            return;
        }
        System.out.println("\n--- [ขั้นตอนลูกค้ามารับสินค้าที่เคาน์เตอร์] ---");
        order.getOrderContext().nextState();
        System.out.println("=======================================================================\n");
    }

    /**
     * ดำเนินการกระบวนการสั่งซื้อแบบครบวงจรตั้งแต่ต้นจนจบ (End-to-End Simulation)
     */
    public void processFullOrderFlow(Beverage beverage, PricingStrategy pricingStrategy) {
        Order order = placeOrder(beverage, pricingStrategy);
        processPayment(order.getOrderId());
        startBrewing(order.getOrderId());
        finishBrewing(order.getOrderId());
        serveCustomer(order.getOrderId());
    }
}
