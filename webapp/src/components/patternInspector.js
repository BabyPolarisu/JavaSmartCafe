export function showPatternInspector() {
  const existing = document.getElementById('pattern-inspector-modal');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'pattern-inspector-modal';

  modal.innerHTML = `
    <div class="modal-card" style="max-width: 900px; max-height: 90vh; display: flex; flex-direction: column;">
      <div class="modal-header" style="border-bottom: 1px solid rgba(255,255,255,0.08); padding: 1.2rem 1.5rem;">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:1.6rem;">🏛️</span>
          <div>
            <h3 style="margin:0; font-size:1.3rem;">การจัดสรร Design Patterns ที่เหมาะสมที่สุดกับแต่ละระบบในร้าน</h3>
            <p style="margin:0; font-size:0.85rem; color:var(--accent);">
              "ในระบบร้านขายเครื่องดื่ม ระบบไหนเหมาะกับ Pattern ไหนมากที่สุด?"
            </p>
          </div>
        </div>
        <button id="close-inspector-btn" style="background:transparent; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer;">✕</button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; overflow-y:auto; display:flex; flex-direction:column; gap:1.2rem;">
        
        <div class="pattern-map-grid" style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
          
          <!-- 1. DECORATOR PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#38bdf8;">1. Decorator Pattern</div>
              <span style="font-size:0.75rem; background:rgba(56, 189, 248, 0.15); color:#38bdf8; padding:0.2rem 0.6rem; border-radius:10px;">Structural</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              🍵 ระบบเครื่องดื่มและส่วนผสมเสริม (Beverage & Toppings)
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> ห่อหุ้มเครื่องดื่มพื้นฐาน (Base Beverage) ด้วย Topping ทีละชั้น เช่น ไข่มุก, ว่านหางจระเข้, วิปครีม คำนวณราคาสะสมแบบ Dynamic และเปิดกว้างให้เพิ่มท็อปปิ้งใหม่ได้ไม่รู้จบตามหลัก Open-Closed Principle (OCP)
            </div>
          </div>

          <!-- 2. BUILDER PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#fbbf24;">2. Builder Pattern</div>
              <span style="font-size:0.75rem; background:rgba(251, 191, 36, 0.15); color:#fbbf24; padding:0.2rem 0.6rem; border-radius:10px;">Creational</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              🔨 ระบบประกอบสเปก & เลือกภาชนะแก้วอัตโนมัติ
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> เครื่องดื่ม 1 แก้วมีพารามิเตอร์ 10+ ตัว (หมวด, ขนาด, ความหวาน, ความเปรี้ยว, น้ำแข็ง, ทานที่ร้าน/กลับบ้าน) Builder ช่วยประกอบเป็นสเต็ป และฝังอัลกอริทึมเลือกแก้วที่เหมาะสมที่สุดให้อัตโนมัติ ป้องกัน Telescoping Constructor
            </div>
          </div>

          <!-- 3. STRATEGY PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#a78bfa;">3. Strategy Pattern</div>
              <span style="font-size:0.75rem; background:rgba(167, 139, 250, 0.15); color:#a78bfa; padding:0.2rem 0.6rem; border-radius:10px;">Behavioral</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              💡 ระบบคิดราคา ส่วนลด และโปรโมชัน (Pricing Strategies)
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> ร้านมีนโยบายราคาที่เปลี่ยนตามกลุ่มลูกค้า เช่น ราคาปกติ, สมาชิก VIP (ลด 10%), ลูกค้านำแก้วมาเอง (ลด 10฿), บัตรนักศึกษา (ลด 15%) สามารถสลับกลยุทธ์คิดราคาได้ทันทีแบบ Runtime
            </div>
          </div>

          <!-- 4. STATE PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#f43f5e;">4. State Pattern</div>
              <span style="font-size:0.75rem; background:rgba(244, 63, 94, 0.15); color:#f43f5e; padding:0.2rem 0.6rem; border-radius:10px;">Behavioral</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              🔄 ระบบจัดการวงจรชีวิตออเดอร์ (Order Lifecycle)
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> ควบคุมสถานะ Created -> Paid -> Brewing -> Ready -> Completed ป้องกันการทำงานข้ามขั้นตอน (เช่น ยังไม่จ่ายแต่ไปชง หรือ ชงเสร็จแล้วแต่กดยกเลิก) โดยขจัด if-else จำนวนมาก
            </div>
          </div>

          <!-- 5. OBSERVER PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#34d399;">5. Observer Pattern</div>
              <span style="font-size:0.75rem; background:rgba(52, 211, 153, 0.15); color:#34d399; padding:0.2rem 0.6rem; border-radius:10px;">Behavioral</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              📢 ระบบแจ้งเตือนคิวหน้าร้าน & จอในครัว KDS
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> เมื่อสถานะออเดอร์เปลี่ยน จะกระจายข่าวสาร (Broadcast) ไปยังจอคิวลูกค้า จอบาริสต้า และระบบเสียงเรียกคิว (Ding-dong chime) แบบ Loose Coupling
            </div>
          </div>

          <!-- 6. TEMPLATE METHOD PATTERN -->
          <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#f97316;">6. Template Method Pattern</div>
              <span style="font-size:0.75rem; background:rgba(249, 115, 22, 0.15); color:#f97316; padding:0.2rem 0.6rem; border-radius:10px;">Behavioral</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              ☕ ระบบขั้นตอนและสูตรมาตรฐานการชง (Brewing SOP)
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> กำหนดโครงสร้าง SOP 6 ขั้นตอนที่เหมือนกันทุกแก้วในร้าน แต่เปิดให้กาแฟ ชา หรือสมูทตี้ override เฉพาะขั้นตอนสกัดเบสและการควบคุมอุณหภูมิตามเทคนิคเฉพาะ
            </div>
          </div>

          <!-- 7. FACADE PATTERN -->
          <div style="grid-column: 1 / -1; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:1.2rem;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
              <div style="font-size:1.1rem; font-weight:700; color:#e2e8f0;">7. Facade Pattern</div>
              <span style="font-size:0.75rem; background:rgba(226, 232, 240, 0.15); color:#e2e8f0; padding:0.2rem 0.6rem; border-radius:10px;">Structural</span>
            </div>
            <div style="font-size:0.9rem; font-weight:600; color:#f1f5f9; margin-bottom:0.4rem;">
              🏛️ ระบบเคาน์เตอร์แคชเชียร์ & รวมศูนย์การทำงาน (Smart Cafe Facade)
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">
              <strong>ทำไมถึงเหมาะที่สุด:</strong> รวบรวมความซับซ้อนของทั้ง 6 ระบบข้างต้นไว้เบื้องหลัง Facade เพียงตัวเดียว เพื่อให้แคชเชียร์หรือแอปหน้าร้านสามารถเรียกใช้ออเดอร์ ชำระเงิน ชง และส่งมอบผ่าน API จุดเดียวได้อย่างง่ายดาย
            </div>
          </div>

        </div>

      </div>

      <div class="modal-footer" style="padding:1rem 1.5rem; border-top:1px solid rgba(255,255,255,0.08); text-align:right;">
        <button id="close-inspector-footer-btn" class="btn btn-primary" style="padding:0.5rem 1.5rem;">
          เข้าใจและปิดหน้าต่าง
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => modal.remove();
  document.getElementById('close-inspector-btn').addEventListener('click', close);
  document.getElementById('close-inspector-footer-btn').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
