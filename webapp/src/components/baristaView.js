import { showBrewingModal } from './brewingModal.js';
import { playChimeSound } from '../patterns/observer.js';
import { ORDER_STATES } from '../patterns/state.js';
import { showToast } from '../utils/toast.js';

export function renderBaristaView(orders, onOrderStateChange) {
  const activeOrders = orders.filter(o => o.state.id !== 'COMPLETED' && o.state.id !== 'CANCELLED');
  const completedOrders = orders.filter(o => o.state.id === 'COMPLETED').slice(-6).reverse();

  return `
    <div class="kds-container" style="display:flex; flex-direction:column; gap:1.4rem;">
      <!-- Header -->
      <div class="kds-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.8rem; flex-wrap:wrap; gap:0.5rem;">
        <div>
          <h3 style="margin:0; display:flex; align-items:center; gap:0.5rem; font-size:1.25rem;">
            👨‍🍳 Kitchen Display System (KDS)
          </h3>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">
            [OBSERVER + STATE + TEMPLATE METHOD PATTERN] หน้าจอควบคุมการชงของบาริสต้า
          </p>
        </div>
        <div style="display:flex; gap:0.6rem; align-items:center;">
          <div style="font-size:0.85rem; background:rgba(234, 179, 8, 0.15); color:#facc15; padding:0.35rem 0.85rem; border-radius:20px; font-weight:600;">
            ⏳ ออเดอร์ค้างในครัว: <strong>${activeOrders.length}</strong> แก้ว
          </div>
          <div style="font-size:0.85rem; background:rgba(16, 185, 129, 0.15); color:#34d399; padding:0.35rem 0.85rem; border-radius:20px; font-weight:600;">
            ✅ เสร็จแล้ววันนี้: <strong>${orders.filter(o => o.state.id === 'COMPLETED').length}</strong> แก้ว
          </div>
        </div>
      </div>

      <!-- Active Orders Grid -->
      <div class="kds-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap:1.2rem;">
        ${activeOrders.length === 0 ? `
          <div style="grid-column: 1 / -1; text-align:center; padding:3.5rem 1rem; color:var(--text-muted); background:rgba(255,255,255,0.02); border-radius:14px; border:1px dashed rgba(255,255,255,0.12);">
            <div style="font-size:3rem; margin-bottom:0.6rem;">☕✨</div>
            <div style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">ไม่มีออเดอร์ค้างในครัวบาริสต้า</div>
            <div style="font-size:0.9rem; margin-top:0.35rem; color:var(--text-muted);">
              กดสั่งเครื่องดื่มจากแท็บ <strong>Kiosk Order</strong> ด้านบน หรือเลือกสูตรจาก <strong>Director</strong> เพื่อสร้างออเดอร์ใหม่เข้าครัว
            </div>
          </div>
        ` : activeOrders.map(order => `
          <div class="kds-ticket" style="background:rgba(255,255,255,0.04); border:1px solid ${order.state.id === 'READY' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(255,255,255,0.08)'}; border-radius:14px; padding:1.2rem; display:flex; flex-direction:column; justify-content:space-between; position:relative; overflow:hidden; box-shadow:${order.state.id === 'READY' ? '0 0 15px rgba(16, 185, 129, 0.15)' : 'none'};">
            <div style="position:absolute; top:0; left:0; right:0; height:5px; background:${order.state.color};"></div>
            
            <div>
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
                <div>
                  <span style="font-size:1.35rem; font-weight:800; color:var(--text-primary);">#${order.orderId}</span>
                  <span style="font-size:0.75rem; color:var(--text-muted); margin-left:0.4rem;">${order.timestamp}</span>
                </div>
                <span class="badge" style="background:${order.state.color}25; color:${order.state.color}; font-size:0.8rem; font-weight:700; padding:0.25rem 0.65rem; border-radius:12px; border:1px solid ${order.state.color}40;">
                  ${order.state.badge}
                </span>
              </div>

              <div style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem; color:var(--accent-glow);">
                ${order.beverage.name}
              </div>

              <div style="font-size:0.85rem; color:var(--text-muted); display:flex; flex-direction:column; gap:0.3rem; margin-bottom:0.85rem; background:rgba(0,0,0,0.25); padding:0.75rem; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">
                <div><strong>ขนาด:</strong> ${order.beverage.size?.label || 'M'} (${order.beverage.size?.oz || 16} oz / ${order.beverage.size?.ml || 480} ml)</div>
                <div><strong>อุณหภูมิ:</strong> ${order.beverage.temperature?.label || 'เย็น'}</div>
                <div><strong>ภาชนะ:</strong> ${(order.beverage.cupType || order.beverage.cup)?.badge || '🥤'} - ${(order.beverage.cupType || order.beverage.cup)?.name || 'แก้วมาตรฐาน'}</div>
                <div><strong>สูตร:</strong> หวาน ${order.beverage.sweetness?.description || '100%'} | เปรี้ยว ${order.beverage.sourness?.description || '0%'}</div>
                ${order.beverage.temperature?.id !== 'HOT' ? `<div><strong>น้ำแข็ง:</strong> ${order.beverage.iceLevel || 'ปกติ'}</div>` : ''}
                ${(order.beverage.toppings || []).length > 0 ? `
                  <div style="color:#fbbf24;"><strong>ท็อปปิ้ง:</strong> ${order.beverage.toppings.map(t => t.name).join(', ')}</div>
                ` : ''}
                ${order.beverage.specialNote ? `
                  <div style="font-style:italic; color:#93c5fd; background:rgba(147, 197, 253, 0.08); padding:0.3rem 0.5rem; border-radius:6px; margin-top:0.2rem;">
                    <strong>โน้ต:</strong> "${order.beverage.specialNote}"
                  </div>
                ` : ''}
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(245, 158, 11, 0.1); padding:0.35rem 0.6rem; border-radius:6px; margin-top:0.35rem; border:1px solid rgba(245, 158, 11, 0.25);">
                  <span style="color:#fde68a; font-size:0.8rem; display:flex; align-items:center; gap:0.3rem;">⏱️ เวลาประมาณการชง:</span>
                  <strong style="color:#fbbf24; font-size:0.85rem; font-weight:700;">~${order.beverage.getEstimatedBrewTime ? order.beverage.getEstimatedBrewTime() : 3} นาที</strong>
                </div>
              </div>
            </div>

            <!-- Actions Based on Order State -->
            <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:0.5rem;">
              ${order.state.id === 'CREATED' ? `
                <button class="btn btn-primary btn-kds-action" data-order-id="${order.orderId}" style="width:100%; font-size:0.9rem; padding:0.6rem;">
                  💳 รับชำระเงิน (${order.finalPrice.toFixed(2)} บ.)
                </button>
              ` : order.state.id === 'PAID' ? `
                <div style="display:flex; gap:0.5rem;">
                  <button class="btn btn-accent btn-kds-brew" data-order-id="${order.orderId}" style="flex:2; font-size:0.85rem; padding:0.6rem 0.5rem; background:linear-gradient(135deg, #f59e0b, #d97706); color:#fff; font-weight:700; border:none; border-radius:8px; cursor:pointer;">
                    👨‍🍳 ชงตามสูตร SOP ⏩
                  </button>
                  <button class="btn btn-secondary btn-kds-fast-ready" data-order-id="${order.orderId}" title="ข้ามการชงไปสถานะพร้อมเสิร์ฟทันที" style="flex:1; font-size:0.8rem; padding:0.6rem 0.4rem; background:rgba(255,255,255,0.08); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.3); border-radius:8px; cursor:pointer; font-weight:600;">
                    ⚡ ข้ามทันที
                  </button>
                </div>
              ` : order.state.id === 'BREWING' ? `
                <div style="display:flex; gap:0.5rem;">
                  <button class="btn btn-primary btn-kds-action" data-order-id="${order.orderId}" style="flex:2; font-size:0.85rem; padding:0.6rem 0.5rem; background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-weight:700; border:none; border-radius:8px; cursor:pointer;">
                    🔔 ชงเสร็จแล้ว (เรียกคิว)
                  </button>
                  <button class="btn btn-secondary btn-kds-direct-complete" data-order-id="${order.orderId}" title="ข้ามและจบงานทันที" style="flex:1; font-size:0.8rem; padding:0.6rem 0.4rem; background:rgba(255,255,255,0.08); color:#a78bfa; border:1px solid rgba(167, 139, 250, 0.3); border-radius:8px; cursor:pointer; font-weight:600;">
                    ✅ จบงานทันที
                  </button>
                </div>
              ` : order.state.id === 'READY' ? `
                <button class="btn btn-kds-direct-complete" data-order-id="${order.orderId}" style="width:100%; font-size:0.95rem; font-weight:700; padding:0.65rem; background:linear-gradient(135deg, #10b981, #059669); color:#ffffff; border:none; border-radius:8px; cursor:pointer; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);">
                  ✅ ส่งมอบให้ลูกค้า (เสร็จสิ้นสมบูรณ์) 🎉
                </button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Completed Orders History -->
      ${completedOrders.length > 0 ? `
        <div class="kds-completed-section" style="margin-top:1.5rem; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
            <div style="font-weight:700; font-size:0.95rem; display:flex; align-items:center; gap:0.4rem; color:var(--text-muted);">
              <span>✅ รายการที่ส่งมอบเสร็จสมบูรณ์แล้วล่าสุด (${completedOrders.length} รายการ)</span>
            </div>
            <span style="font-size:0.75rem; color:var(--text-muted);">State Pattern: COMPLETED</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:0.75rem;">
            ${completedOrders.map(order => `
              <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(16, 185, 129, 0.2); border-radius:8px; padding:0.6rem 0.8rem; display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <div style="font-weight:700; font-size:0.9rem; color:#34d399;">#${order.orderId}</div>
                  <div style="font-size:0.8rem; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:140px;">
                    ${order.beverage.name}
                  </div>
                  <div style="font-size:0.7rem; color:var(--text-muted);">
                    เวลาเสร็จ: ${order.completedTime || order.timestamp}
                  </div>
                </div>
                <span class="badge" style="background:rgba(16, 185, 129, 0.15); color:#34d399; font-size:0.75rem; font-weight:700; padding:0.2rem 0.5rem; border-radius:8px;">
                  สำเร็จ ✅
                </span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function setupBaristaEvents(orders, onOrderUpdate) {
  // 1. Standard Next Action (Created -> Paid -> Brewing -> Ready -> Completed)
  document.querySelectorAll('.btn-kds-action').forEach(btn => {
    btn.onclick = (e) => {
      const btnEl = e.currentTarget || e.target.closest('button');
      const orderId = btnEl ? btnEl.getAttribute('data-order-id') : null;
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.next();
        if (order.state.id === 'READY') {
          playChimeSound();
          showToast(`🔔 ออเดอร์ #${order.orderId} ชงเสร็จแล้ว! กำลังเรียกคิวหน้าร้าน`);
        } else if (order.state.id === 'COMPLETED') {
          order.completedTime = new Date().toLocaleTimeString('th-TH');
          showToast(`🎉 ออเดอร์ #${order.orderId} ส่งมอบให้ลูกค้าเรียบร้อยแล้ว!`);
        }
        if (onOrderUpdate) onOrderUpdate();
      }
    };
  });

  // 2. Fast Track Skip directly to READY (พร้อมรับสินค้า)
  document.querySelectorAll('.btn-kds-fast-ready').forEach(btn => {
    btn.onclick = (e) => {
      const btnEl = e.currentTarget || e.target.closest('button');
      const orderId = btnEl ? btnEl.getAttribute('data-order-id') : null;
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.setState(ORDER_STATES.READY);
        playChimeSound();
        showToast(`⚡ ข้ามขั้นตอนการชง #${order.orderId} ไปยังสถานะพร้อมรับสินค้าแล้ว!`);
        if (onOrderUpdate) onOrderUpdate();
      }
    };
  });

  // 3. Direct Complete (ส่งมอบสำเร็จทันที)
  document.querySelectorAll('.btn-kds-direct-complete').forEach(btn => {
    btn.onclick = (e) => {
      const btnEl = e.currentTarget || e.target.closest('button');
      const orderId = btnEl ? btnEl.getAttribute('data-order-id') : null;
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.setState(ORDER_STATES.COMPLETED);
        order.completedTime = new Date().toLocaleTimeString('th-TH');
        showToast(`🎉 ออเดอร์ #${order.orderId} ดำเนินการเสร็จสมบูรณ์ ส่งมอบเรียบร้อย!`);
        if (onOrderUpdate) onOrderUpdate();
      }
    };
  });

  // 4. Brew with Template Method Modal
  document.querySelectorAll('.btn-kds-brew').forEach(btn => {
    btn.onclick = (e) => {
      const btnEl = e.currentTarget || e.target.closest('button');
      const orderId = btnEl ? btnEl.getAttribute('data-order-id') : null;
      const order = orders.find(o => o.orderId === orderId);
      if (order) {
        order.setState(ORDER_STATES.BREWING);
        if (onOrderUpdate) onOrderUpdate();

        showBrewingModal(order, (finalState) => {
          if (finalState === 'COMPLETED') {
            order.setState(ORDER_STATES.COMPLETED);
            order.completedTime = new Date().toLocaleTimeString('th-TH');
            showToast(`🎉 ออเดอร์ #${order.orderId} ชงเสร็จและส่งมอบเรียบร้อย!`);
          } else {
            order.setState(ORDER_STATES.READY);
            playChimeSound();
            showToast(`🔔 ออเดอร์ #${order.orderId} ชงเสร็จแล้ว พร้อมเรียกคิวหน้าร้าน!`);
          }
          if (onOrderUpdate) onOrderUpdate();
        });
      }
    };
  });
}
