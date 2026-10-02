/**
 * [Builder Pattern Inspector Modal]
 * Explains and visualizes the single best-fit pattern: Builder Pattern
 */

export function showBuilderInspector(beverage) {
  const existing = document.getElementById('builder-inspector-modal');
  if (existing) existing.remove();

  const toppingsCode = beverage.toppings.length > 0 
    ? beverage.toppings.map(t => `\n    .addTopping("${t.name}")`).join('') 
    : '';

  const dynamicCodeSnippet = `Beverage myDrink = new BeverageBuilder()
    .setCategory(BeverageCategory.${beverage.category?.id || 'COFFEE'})
    .setName("${beverage.name}")
    .setSize(BeverageSize.${beverage.size?.code || 'M'}) // ${beverage.size?.oz || 16} oz / ${beverage.size?.ml || 480} ml
    .setTemperature(Temperature.${beverage.temperature?.id || 'HOT'})
    .setDiningOption(DiningOption.${beverage.diningOption?.id || 'TAKEAWAY'})
    .setSweetness(SweetnessLevel.${beverage.sweetness?.code || '50%'})
    .setSourness(SournessLevel.${beverage.sourness?.code || '0%'})${toppingsCode}
    .build(); // อัลกอริทึมเลือกแก้ว: ${beverage.cup?.name || 'Ceramic Mug'}`;

  const modalHtml = `
    <div id="builder-inspector-modal" class="modal-overlay">
      <div class="modal-card pattern-modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="pattern-header-icon">🏆</span>
            <div>
              <h3>แบบแผนการสร้างเพียงหนึ่งเดียว: BUILDER PATTERN</h3>
              <p class="subtitle">ทำไม Builder Pattern จึงเป็นแบบแผนที่ดีและเหมาะสมที่สุดสำหรับระบบร้านเครื่องดื่ม</p>
            </div>
          </div>
          <button id="close-inspector-x" class="modal-close-btn">&times;</button>
        </div>

        <div class="builder-explain-content">
          <!-- Live Code Generation Block -->
          <div class="code-preview-box">
            <div class="code-preview-header">
              <span>☕ โค้ด Java ที่กำลังสร้างอ็อบเจกต์แก้วนี้แบบเรียลไทม์ (Live Builder Chaining):</span>
            </div>
            <pre class="code-snippet"><code>${dynamicCodeSnippet}</code></pre>
          </div>

          <div class="builder-roles-grid">
            <div class="role-card">
              <div class="role-badge">1. The Product</div>
              <h4>Beverage.java</h4>
              <p>วัตถุที่ซับซ้อน มีแอตทริบิวต์มากถึง 12 รายการ บังคับไม่ให้สร้างตรงๆ ผ่าน Constructor ธรรมดา แต่ต้องถูกสร้างผ่าน Builder เพื่อความถูกต้อง</p>
            </div>

            <div class="role-card">
              <div class="role-badge">2. The Builder</div>
              <h4>BeverageBuilder.java</h4>
              <p>ผู้ประกอบชิ้นส่วนทีละขั้นตอนด้วย Fluent API (Method Chaining) และมีระบบ <strong>Appropriate Cup Selection</strong> เลือกแก้วที่เหมาะสมให้อัตโนมัติในเมธอด <code>build()</code></p>
            </div>

            <div class="role-card">
              <div class="role-badge">3. The Director</div>
              <h4>BeverageDirector.java</h4>
              <p>ผู้ควบคุมสูตรมาตรฐานของร้าน คอยเรียกสเต็ปของ Builder ตามลำดับที่วางไว้ เพื่อนำสูตรสำเร็จกลับมาใช้ซ้ำได้อย่างรวดเร็ว</p>
            </div>

            <div class="role-card">
              <div class="role-badge">4. The Client</div>
              <h4>หน้า Kiosk / Main.java</h4>
              <p>ผู้ใช้งานสามารถเลือกสั่งตามสูตรที่ Director จัดให้ หรือจะเลือกประกอบสเปก Custom เองได้ตามใจชอบ โดยโค้ดยังคงสะอาดและอ่านง่าย</p>
            </div>
          </div>

          <div class="anti-pattern-comparison">
            <div class="comparison-col bad">
              <h5>❌ หากไม่ใช้ Builder (Telescoping Anti-Pattern)</h5>
              <div class="code-sample-bad">
                new Beverage("ชาผลไม้", "FRUIT", 60, "XL", 750, "ICED", "PLA", "50%", "100%", "น้ำแข็งปกติ", toppings, notes);
              </div>
              <p>เสี่ยงใส่ค่าสลับกัน (เช่น สลับความหวานกับความเปรี้ยว หรือสลับขนาดกับปริมาณ), มี parameter ล้นเกิน และอ่านยากมาก</p>
            </div>

            <div class="comparison-col good">
              <h5>✅ เมื่อใช้ Builder Pattern เพียงหนึ่งเดียว</h5>
              <div class="code-sample-good">
                builder.setSize(XL).setSweetness(50%).setSourness(100%).build();
              </div>
              <p>อ่านเข้าใจทันทีเหมือนภาษาพูด, ปลอดภัย (Type-Safe), จัดการตัวเลือกปรับแต่งได้อิสระ และคำนวณแก้วที่เหมาะสมให้อัตโนมัติ</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button id="close-inspector-btn" class="btn btn-primary">เข้าใจแล้ว ปิดหน้าต่าง</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('builder-inspector-modal');
  const close = () => {
    modal.classList.add('fade-out');
    setTimeout(() => modal.remove(), 250);
  };

  document.getElementById('close-inspector-x').onclick = close;
  document.getElementById('close-inspector-btn').onclick = close;
}
