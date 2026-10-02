import { getSOPForCategory } from '../patterns/templateMethod.js';

export function showBrewingModal(order, onComplete) {
  const existing = document.getElementById('brewing-modal-overlay');
  if (existing) existing.remove();

  const categoryId = typeof order.beverage?.category === 'object'
    ? order.beverage.category.id
    : (order.beverage?.category || 'COFFEE');

  const sop = getSOPForCategory(categoryId);
  const steps = sop.getSteps(order.beverage);

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.id = 'brewing-modal-overlay';

  modalOverlay.innerHTML = `
    <div class="modal-card" style="max-width: 650px; position:relative;">
      <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <span style="font-size:1.5rem;">👨‍🍳</span>
          <div>
            <h3 style="margin:0; font-size:1.2rem;">บาริสต้ากำลังชงตามสูตร [Template Method SOP]</h3>
            <p style="margin:0; font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap; margin-top:0.15rem;">
              <span>ออเดอร์ #${order.orderId} : ${order.beverage.name} (${order.beverage.temperature?.label || 'เย็น'})</span>
              <span style="background:rgba(245, 158, 11, 0.2); color:#fbbf24; font-size:0.75rem; padding:0.15rem 0.55rem; border-radius:12px; font-weight:600; border:1px solid rgba(245, 158, 11, 0.35);">
                ⏱️ เวลามาตรฐาน: ~${order.beverage.getEstimatedBrewTime ? order.beverage.getEstimatedBrewTime() : 3} นาที
              </span>
            </p>
          </div>
        </div>
        <button id="close-brewing-x-btn" style="background:transparent; border:none; color:var(--text-muted); font-size:1.4rem; cursor:pointer; padding:0.2rem 0.5rem;">&times;</button>
      </div>

      <div class="modal-body" style="padding: 1.5rem;">
        <div class="sop-progress-container" style="margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem; font-size:0.85rem;">
            <span id="sop-step-counter">ขั้นตอนที่ 1 จาก 6</span>
            <span id="sop-percent-text" style="font-weight:600; color:var(--accent);">16%</span>
          </div>
          <div style="height:8px; background:rgba(255,255,255,0.08); border-radius:4px; overflow:hidden;">
            <div id="sop-progress-fill" style="width:16%; height:100%; background:linear-gradient(90deg, #f59e0b, #10b981); transition: width 0.4s ease;"></div>
          </div>
        </div>

        <div id="sop-steps-list" style="display:flex; flex-direction:column; gap:0.8rem; max-height:360px; overflow-y:auto;">
          ${steps.map((s, idx) => `
            <div class="sop-step-item ${idx === 0 ? 'active' : 'pending'}" id="sop-step-${s.step}" style="display:flex; gap:1rem; align-items:flex-start; padding:0.85rem; border-radius:10px; background:${idx === 0 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255,255,255,0.03)'}; border:1px solid ${idx === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(255,255,255,0.05)'}; transition: all 0.3s ease;">
              <div style="font-size:1.4rem; width:36px; height:36px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.06); border-radius:50%; flex-shrink:0;">
                ${s.icon}
              </div>
              <div style="flex:1;">
                <div style="font-weight:600; font-size:0.95rem; margin-bottom:0.2rem;">
                  ขั้นที่ ${s.step}: ${s.title}
                </div>
                <div style="font-size:0.85rem; color:var(--text-muted); line-height:1.4;">
                  ${s.detail}
                </div>
              </div>
              <div class="sop-step-status" style="font-size:0.8rem; padding:0.2rem 0.6rem; border-radius:12px; font-weight:600; background:${idx === 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.05)'}; color:${idx === 0 ? '#fbbf24' : 'var(--text-muted)'};">
                ${idx === 0 ? '⏳ กำลังชง...' : '⚪ รอคิว'}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="modal-footer" style="padding:1rem 1.5rem; display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.08); gap:0.5rem; flex-wrap:wrap;">
        <span style="font-size:0.85rem; color:var(--text-muted);">
          ⚡ ระบบ SOP อัตโนมัติ...
        </span>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
          <button id="btn-skip-brewing" class="btn btn-secondary" style="padding:0.55rem 1rem; font-size:0.85rem; font-weight:600; cursor:pointer;">
            ⚡ ข้ามไปพร้อมเสิร์ฟ (เรียกคิวหน้าร้าน) ⏩
          </button>
          <button id="btn-complete-direct" class="btn btn-primary" style="padding:0.55rem 1rem; font-size:0.85rem; background:linear-gradient(135deg, #10b981, #059669); font-weight:700; color:#fff; border:none; border-radius:8px; cursor:pointer;">
            ✅ ข้ามและจบงานทันที (ส่งมอบสำเร็จ)
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modalOverlay);

  let currentStepIdx = 0;
  let timer = null;

  function finish(finalState = 'READY') {
    if (timer) clearInterval(timer);
    modalOverlay.remove();
    if (onComplete) onComplete(finalState);
  }

  function updateStep(idx) {
    if (idx >= steps.length) {
      if (timer) clearInterval(timer);
      setTimeout(() => {
        finish('READY');
      }, 600);
      return;
    }

    const progressFill = document.getElementById('sop-progress-fill');
    const percentText = document.getElementById('sop-percent-text');
    const stepCounter = document.getElementById('sop-step-counter');

    const pct = Math.round(((idx + 1) / steps.length) * 100);
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (percentText) percentText.textContent = `${pct}%`;
    if (stepCounter) stepCounter.textContent = `ขั้นตอนที่ ${idx + 1} จาก ${steps.length}`;

    steps.forEach((s, i) => {
      const el = document.getElementById(`sop-step-${s.step}`);
      if (!el) return;
      const statusBadge = el.querySelector('.sop-step-status');
      if (i < idx) {
        el.className = 'sop-step-item done';
        el.style.background = 'rgba(16, 185, 129, 0.08)';
        el.style.borderColor = 'rgba(16, 185, 129, 0.3)';
        if (statusBadge) {
          statusBadge.textContent = '✅ เสร็จแล้ว';
          statusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
          statusBadge.style.color = '#34d399';
        }
      } else if (i === idx) {
        el.className = 'sop-step-item active';
        el.style.background = 'rgba(245, 158, 11, 0.12)';
        el.style.borderColor = 'rgba(245, 158, 11, 0.4)';
        if (statusBadge) {
          statusBadge.textContent = '⏳ กำลังชง...';
          statusBadge.style.background = 'rgba(245, 158, 11, 0.2)';
          statusBadge.style.color = '#fbbf24';
        }
      } else {
        el.className = 'sop-step-item pending';
        el.style.background = 'rgba(255, 255, 255, 0.02)';
        el.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        if (statusBadge) {
          statusBadge.textContent = '⚪ รอคิว';
          statusBadge.style.background = 'rgba(255, 255, 255, 0.05)';
          statusBadge.style.color = 'var(--text-muted)';
        }
      }
    });
  }

  timer = setInterval(() => {
    currentStepIdx++;
    updateStep(currentStepIdx);
  }, 1000);

  // Close X
  const btnClose = modalOverlay.querySelector('#close-brewing-x-btn');
  if (btnClose) {
    btnClose.onclick = () => finish('READY');
  }

  // Skip Button
  const btnSkip = modalOverlay.querySelector('#btn-skip-brewing');
  if (btnSkip) {
    btnSkip.onclick = () => finish('READY');
  }

  // Complete Immediately Button
  const btnComplete = modalOverlay.querySelector('#btn-complete-direct');
  if (btnComplete) {
    btnComplete.onclick = () => finish('COMPLETED');
  }
}
