/**
 * [Builder Pattern - Director Presets Modal]
 * Allows user to trigger BeverageDirector predefined construction recipes
 */

export function showDirectorModal(onSelectRecipe) {
  const existing = document.getElementById('director-modal');
  if (existing) existing.remove();

  const presets = [
    {
      id: 'caramel_macchiato',
      name: 'คาราเมล มัคคิอาโต้ร้อน (Hot Caramel Macchiato)',
      category: 'Specialty Coffee',
      desc: 'เอสเพรสโซ่เข้มข้น นมสดนุ่ม และคาราเมลซอส ในแก้วเซรามิกหนาเก็บความร้อน',
      icon: '☕',
      badge: 'Hot • Ceramic Mug • Sweet 25%'
    },
    {
      id: 'sparkling_fruit_tea',
      name: 'ชาผลไม้รวมเสาวรสพีชสปาร์คลิ่ง (Passion Fruit Sparkling)',
      category: 'Fruit Tea & Sparkling',
      desc: 'เสาวรสแท้และพีชขาว ชาเขียวมะลิและโซดา เปรี้ยวจี๊ด 100% ในแก้วชีวภาพ PLA ขนาด XL (750 ml)',
      icon: '🍋',
      badge: 'Iced • 100% Sour • Eco PLA XL'
    },
    {
      id: 'boba_milk_tea',
      name: 'ชานมไต้หวันบราวน์ชูการ์พ่นไฟ (Taiwan Boba Milk Tea)',
      category: 'Tea & Milk Tea',
      desc: 'ชานมเข้มข้น ไข่มุกทองคำเคี่ยวหนึบ ในกระบอกน้ำส่วนตัวของลูกค้า (รับส่วนลด Eco 5 บ.)',
      icon: '🧋',
      badge: 'Iced • Personal Tumbler • Boba'
    },
    {
      id: 'mango_smoothie',
      name: 'แมงโก้แพชชั่นฟรุตสมูทตี้ (Mango Passion Frappe)',
      category: 'Smoothie & Frappe',
      desc: 'มะม่วงและเสาวรสปั่นเนียนนุ่ม ท็อปด้วยวิปครีมสดพรีเมียม ในแก้ว PET ฝาโดมทรงสูง',
      icon: '🥭',
      badge: 'Frappe • Dome Lid • Whipped Cream'
    }
  ];

  const modalHtml = `
    <div id="director-modal" class="modal-overlay">
      <div class="modal-card">
        <div class="modal-header">
          <div class="modal-title-group">
            <span class="pattern-header-icon">📋</span>
            <div>
              <h3>สูตรสำเร็จจากบาริสต้า (BeverageDirector Presets)</h3>
              <p class="subtitle">เลือกสูตรมาตรฐานที่ BeverageDirector กำกับขั้นตอนการสร้างผ่าน BeverageBuilder</p>
            </div>
          </div>
          <button id="close-director-x" class="modal-close-btn">&times;</button>
        </div>

        <div class="director-presets-list" style="padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto;">
          ${presets.map(p => `
            <div class="preset-card" data-preset="${p.id}" style="background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; align-items: flex-start; gap: 1rem;">
                <span style="font-size: 2rem;">${p.icon}</span>
                <div style="flex: 1;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <h4 style="font-size: 1rem; color: #fff; font-weight: 600;">${p.name}</h4>
                    <span style="font-size: 0.72rem; color: var(--accent-gold); background: rgba(245, 158, 11, 0.15); padding: 2px 8px; border-radius: 4px;">${p.category}</span>
                  </div>
                  <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px;">${p.desc}</p>
                  <span style="font-size: 0.72rem; color: #93c5fd; background: rgba(59, 130, 246, 0.12); padding: 2px 7px; border-radius: 4px;">✨ ${p.badge}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="modal-footer">
          <button id="close-director-btn" class="btn btn-secondary">ปิดหน้าต่าง</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('director-modal');
  const close = () => {
    modal.classList.add('fade-out');
    setTimeout(() => modal.remove(), 250);
  };

  document.getElementById('close-director-x').onclick = close;
  document.getElementById('close-director-btn').onclick = close;

  modal.querySelectorAll('.preset-card').forEach(card => {
    card.onclick = () => {
      const presetId = card.dataset.preset;
      close();
      if (onSelectRecipe) onSelectRecipe(presetId);
    };
  });
}
