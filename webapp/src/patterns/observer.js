/**
 * ============================================================================
 * [OBSERVER PATTERN]
 * ระบบแจ้งเตือนและคิวหน้าร้าน / ครัวบาริสต้า (Queue & Notification Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสม: กระจายข่าวสารเมื่อสถานะออเดอร์เปลี่ยนไปยังจอคิวลูกค้า จอบาริสต้า
 * และระบบเสียงเรียกคิวแบบ Loose Coupling
 * ============================================================================
 */

export class OrderSubject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify(event, orderData) {
    this.observers.forEach(obs => {
      try {
        obs.update(event, orderData);
      } catch (e) {
        console.error('Observer error:', e);
      }
    });
  }
}

// Global Order Event Bus
export const orderEventBus = new OrderSubject();

// Sound synthesizer for queue calling
export function playChimeSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    // High note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    // Low note (ding-dong chime)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(523.25, now + 0.3); // C5
    gain2.gain.setValueAtTime(0.3, now + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.3);
    osc2.stop(now + 1.2);
  } catch (e) {
    console.warn('Audio not allowed or supported:', e);
  }
}
