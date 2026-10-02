package smartcafe.model;

/**
 * ระดับความเปรี้ยวของเครื่องดื่ม (Sourness Level)
 * นิยมใช้สำหรับชาผลไม้ เลมอนเนด และอิตาเลียนโซดา
 */
public enum SournessLevel {
    NONE_0("0%", "ไม่เปรี้ยว (0% No Sourness)", 0),
    MILD_25("25%", "เปรี้ยวนิดๆ ละมุน (25% Mild Tartness)", 25),
    BALANCED_50("50%", "เปรี้ยวสดชื่นสมดุล (50% Balanced Tangy)", 50),
    EXTRA_100("100%", "เปรี้ยวจี๊ดสะใจ (100% Extra Sour Zing)", 100);

    private final String code;
    private final String description;
    private final int percentage;

    SournessLevel(String code, String description, int percentage) {
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
