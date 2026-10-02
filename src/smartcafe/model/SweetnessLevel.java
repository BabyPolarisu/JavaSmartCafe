package smartcafe.model;

/**
 * ระดับความหวานของเครื่องดื่ม (Sweetness Level)
 */
public enum SweetnessLevel {
    ZERO("0%", "ไม่หวานเลย (0% Unsweetened)", 0),
    LOW_25("25%", "หวานน้อยมาก (25% Light Sweetness)", 25),
    HALF_50("50%", "หวานน้อยกำลังดี (50% Half Sweetness)", 50),
    NORMAL_100("100%", "หวานปกติ (100% Standard Sweetness)", 100),
    EXTRA_120("120%", "หวานมากเป็นพิเศษ (120% Extra Sweetness)", 120);

    private final String code;
    private final String description;
    private final int percentage;

    SweetnessLevel(String code, String description, int percentage) {
        this.code = code;
        this.description = description;
        this.percentage = percentage;
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    public String getDisplayName() {
        return description;
    }

    public int getPercentage() {
        return percentage;
    }
}
