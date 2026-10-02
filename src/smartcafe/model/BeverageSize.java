package smartcafe.model;

/**
 * ขนาดและปริมาตรของเครื่องดื่ม (Size & Volume)
 */
public enum BeverageSize {
    SMALL("S", "เล็ก (Small)", 8, 240, 0.0),
    MEDIUM("M", "กลาง (Medium)", 16, 480, 15.0),
    LARGE("L", "ใหญ่ (Large)", 22, 650, 25.0),
    EXTRA_LARGE("XL", "ใหญ่พิเศษ (Extra Large)", 26, 750, 35.0);

    private final String code;
    private final String label;
    private final int oz;
    private final int ml;
    private final double priceOffset; // ส่วนต่างราคาตามขนาด

    BeverageSize(String code, String label, int oz, int ml, double priceOffset) {
        this.code = code;
        this.label = label;
        this.oz = oz;
        this.ml = ml;
        this.priceOffset = priceOffset;
    }

    public String getCode() {
        return code;
    }

    public String getLabel() {
        return label;
    }

    public String getDisplayName() {
        return label;
    }

    public int getOz() {
        return oz;
    }

    public int getMl() {
        return ml;
    }

    public double getPriceOffset() {
        return priceOffset;
    }

    public String getFormattedVolume() {
        return String.format("%s (%d oz / %d ml)", label, oz, ml);
    }
}
