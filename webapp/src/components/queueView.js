export function renderQueueView(orders) {
  const brewingOrders = orders.filter(o => o.state.id === 'BREWING' || o.state.id === 'PAID');
  const readyOrders = orders.filter(o => o.state.id === 'READY');
  const recentCompleted = orders.filter(o => o.state.id === 'COMPLETED').slice(-5).reverse();

  return `
    <div class="queue-board-container" style="display:flex; flex-direction:column; gap:1.5rem;">
      <div class="queue-header" style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:0.8rem;">
        <div>
          <h3 style="margin:0; font-size:1.3rem; display:flex; align-items:center; gap:0.5rem;">
            📢 Customer Queue Calling Board
          </h3>
          <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">
            [OBSERVER PATTERN] จอแสดงผลคิวสำหรับลูกค้าหน้าร้าน รับการแจ้งเตือนแบบเรียลไทม์
          </p>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <span style="font-size:0.85rem; background:rgba(234, 179, 8, 0.15); color:#facc15; padding:0.3rem 0.8rem; border-radius:20px; font-weight:600;">
            🟡 กำลังเตรียม: ${brewingOrders.length}
          </span>
          <span style="font-size:0.85rem; background:rgba(16, 185, 129, 0.15); color:#34d399; padding:0.3rem 0.8rem; border-radius:20px; font-weight:600;">
            🟢 พร้อมรับ: ${readyOrders.length}
          </span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.5rem;">
        <!-- กำลังจัดเตรียม -->
        <div style="background:rgba(245, 158, 11, 0.05); border:1px solid rgba(245, 158, 11, 0.2); border-radius:14px; padding:1.2rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid rgba(245, 158, 11, 0.2); padding-bottom:0.6rem;">
            <span style="font-size:1.2rem;">⏳</span>
            <h4 style="margin:0; font-size:1.05rem; color:#fbbf24;">กำลังจัดเตรียม (PREPARING)</h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.6rem; min-height:200px;">
            ${brewingOrders.length === 0 ? `
              <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted); font-size:0.9rem;">
                ไม่มีคิวที่กำลังจัดเตรียม
              </div>
            ` : brewingOrders.map(o => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:0.75rem 1rem; border-radius:8px;">
                <div style="display:flex; align-items:center; gap:0.8rem;">
                  <span style="font-size:1.4rem; font-weight:800; color:#fbbf24;">#${o.orderId}</span>
                  <div>
                    <div style="font-size:0.9rem; font-weight:600;">${o.beverage.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${o.beverage.size?.label || 'M'} • ${o.beverage.temperature?.label || 'เย็น'}</div>
                  </div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.25rem;">
                  <span style="font-size:0.8rem; background:rgba(245, 158, 11, 0.15); color:#fbbf24; padding:0.2rem 0.6rem; border-radius:12px; font-weight:600;">
                    ${o.state.name}
                  </span>
                  <span style="font-size:0.72rem; color:#fde68a; background:rgba(0,0,0,0.3); padding:0.15rem 0.45rem; border-radius:6px;">
                    ⏱️ รอชง ~${o.beverage.getEstimatedBrewTime ? o.beverage.getEstimatedBrewTime() : 3} นาที
                  </span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- พร้อมรับสินค้า -->
        <div style="background:rgba(16, 185, 129, 0.05); border:1px solid rgba(16, 185, 129, 0.25); border-radius:14px; padding:1.2rem;">
          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:1rem; border-bottom:1px solid rgba(16, 185, 129, 0.25); padding-bottom:0.6rem;">
            <span style="font-size:1.2rem;">🔔</span>
            <h4 style="margin:0; font-size:1.05rem; color:#34d399;">พร้อมรับสินค้า (READY TO PICKUP)</h4>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.6rem; min-height:200px;">
            ${readyOrders.length === 0 ? `
              <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted); font-size:0.9rem;">
                ไม่มีคิวที่พร้อมรับในขณะนี้
              </div>
            ` : readyOrders.map(o => `
              <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(16, 185, 129, 0.12); border:1px solid rgba(16, 185, 129, 0.35); padding:0.85rem 1rem; border-radius:10px; animation: pulseReady 2s infinite;">
                <div style="display:flex; align-items:center; gap:0.8rem;">
                  <span style="font-size:1.6rem; font-weight:900; color:#34d399;">#${o.orderId}</span>
                  <div>
                    <div style="font-size:1rem; font-weight:700; color:#ecfdf5;">${o.beverage.name}</div>
                    <div style="font-size:0.8rem; color:#a7f3d0;">ภาชนะ: ${(o.beverage.cupType || o.beverage.cup)?.badge || '🥤 แก้วมาตรฐาน'}</div>
                  </div>
                </div>
                <div style="text-align:right;">
                  <div style="font-size:0.8rem; font-weight:700; color:#34d399; background:rgba(16,185,129,0.2); padding:0.25rem 0.6rem; border-radius:12px;">
                    เชิญที่เคาน์เตอร์ 🛎️
                  </div>
                  <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.2rem;">${o.timestamp}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- ประวัติส่งมอบล่าสุด -->
      ${recentCompleted.length > 0 ? `
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:10px; padding:0.8rem 1rem; display:flex; align-items:center; justify-content:space-between;">
          <span style="font-size:0.85rem; color:var(--text-muted);">
            ✅ รายการที่ส่งมอบสำเร็จแล้วล่าสุด:
          </span>
          <div style="display:flex; gap:0.5rem;">
            ${recentCompleted.map(o => `
              <span style="font-size:0.8rem; background:rgba(255,255,255,0.06); padding:0.2rem 0.5rem; border-radius:4px; color:var(--text-muted);">
                #${o.orderId} (${o.beverage.name})
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
