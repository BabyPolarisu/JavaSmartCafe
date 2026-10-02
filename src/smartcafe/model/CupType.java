package smartcafe.model;

/**
 * ชนิดของแก้วและภาชนะที่เหมาะสมสำหรับเครื่องดื่ม (Appropriate Cup Types)
 * ออกแบบเพื่อความปลอดภัย การรักษาอุณหภูมิ และความเป็นมิตรต่อสิ่งแวดล้อม
 */
public enum CupType {
    CERAMIC_MUG(
            "แก้วเซรามิกหนาเก็บความร้อน (Specialty Ceramic Mug)",
            "เซรามิกเนื้อหนา เคลือบเงากันคราบ",
            "เปิดโล่ง (Open-Top) พร้อมจานรอง",
            "เหมาะสมที่สุดสำหรับเครื่องดื่มร้อนทานในร้าน ช่วยรักษาอุณหภูมิ 75-85°C และคงกลิ่นหอมกรุ่น"
    ),
    DOUBLE_WALL_PAPER_CUP(
            "แก้วกระดาษคราฟต์ฉนวน 2 ชั้น (Double-Wall Insulated Kraft Cup)",
            "กระดาษคราฟต์ฟู้ดเกรด 2 ชั้น พร้อมช่องแอร์ล็อค",
            "ฝาจิบกันหกแบบปลอดภัย (Ergonomic Sip Lid)",
            "เหมาะสมที่สุดสำหรับเครื่องดื่มร้อนสั่งกลับบ้าน จับถือได้สบายมือไม่ร้อนลวกโดยไม่ต้องใส่ปลอกกระดาษเพิ่ม"
    ),
    TALL_GLASS_TUMBLER(
            "แก้วคริสตัลใสทรงสูง (Tall Glass Tumbler)",
            "แก้วบอโรซิลิเกตใส ไร้สารตะกั่ว หนาทนความเย็น",
            "เปิดโล่ง พร้อมหลอดแก้วรียูส",
            "เหมาะสมที่สุดสำหรับเครื่องดื่มเย็นทานในร้าน โชว์เลเยอร์สีสันอันสวยงามของชา นม และผลไม้ได้อย่างชัดเจน"
    ),
    ECO_PLA_COLD_CUP(
            "แก้วชีวภาพ PLA ย่อยสลายได้ 100% (Eco Bioplastic Cup)",
            "พลาสติกชีวภาพจากข้าวโพด (Polylactic Acid - PLA)",
            "ฝาเรียบเจาะรูหลอด / ฟิล์มซีลสุญญากาศ",
            "เหมาะสมที่สุดสำหรับเครื่องดื่มเย็นสั่งกลับบ้าน ย่อยสลายได้ตามธรรมชาติ 100% ภายใน 180 วัน ไม่ก่อขยะไมโครพลาสติก"
    ),
    DOME_LID_PET_CUP(
            "แก้ว PET ใส ฝาโดมทรงสูง (High-Dome Lid Tumbler)",
            "พลาสติก PET เกรดบริสุทธิ์ ใสพิเศษ เหนียวทนแรงดัน",
            "ฝาโดมโค้งสูง (Dome Lid) ป้องกันวิปครีมหรือฟองโซดาล้น",
            "เหมาะสมที่สุดสำหรับเมนูปั่น (Frappe/Smoothie) หรือเมนูที่มีวิปครีมและโซดาซ่า ฝาโดมให้พื้นที่รองรับท็อปปิ้งพูนแก้วโดยไม่เลอะเทอะ"
    ),
    PERSONAL_TUMBLER(
            "กระบอกน้ำส่วนตัวลูกค้านำมาเอง (Personal Tumbler)",
            "สแตนเลสสตีล / แก้วส่วนตัวของลูกค้า",
            "ฝาปิดส่วนตัว (ผ่านการล้างอบฆ่าเชื้อก่อนชง)",
            "เหมาะสมที่สุดสำหรับลูกค้ารักษ์โลก ช่วยลดขยะ Single-use เป็นศูนย์ และได้รับส่วนลด Eco-Friendly ทันที 5 บาท"
    );

    private final String displayName;
    private final String material;
    private final String lidType;
    private final String suitabilityReason;

    CupType(String displayName, String material, String lidType, String suitabilityReason) {
        this.displayName = displayName;
        this.material = material;
        this.lidType = lidType;
        this.suitabilityReason = suitabilityReason;
    }

    public String getDisplayName() {
        return displayName;
    }

    public String getMaterial() {
        return material;
    }

    public String getLidType() {
        return lidType;
    }

    public String getSuitabilityReason() {
        return suitabilityReason;
    }
}
