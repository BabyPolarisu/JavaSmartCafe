/**
 * ============================================================================
 * [STATE PATTERN]
 * ระบบจัดการวงจรชีวิตออเดอร์ (Order Lifecycle Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสม: ควบคุมสถานะ Created -> Paid -> Brewing -> Ready -> Completed
 * ป้องกันการทำงานผิดขั้นตอน
 * ============================================================================
 */

export const ORDER_STATES = {
  CREATED: {
    id: 'CREATED',
    name: 'รอชำระเงิน',
    badge: '🕒 CREATED',
    color: '#eab308',
    nextText: '💳 ชำระเงิน'
  },
  PAID: {
    id: 'PAID',
    name: 'ชำระแล้ว (รอคิว)',
    badge: '💳 PAID',
    color: '#3b82f6',
    nextText: '☕ ส่งเข้าครัวชง'
  },
  BREWING: {
    id: 'BREWING',
    name: 'กำลังชงตาม SOP',
    badge: '👨‍🍳 BREWING',
    color: '#f97316',
    nextText: '✨ ชงเสร็จแล้ว'
  },
  READY: {
    id: 'READY',
    name: 'พร้อมรับสินค้า (เรียกคิว)',
    badge: '🔔 READY',
    color: '#10b981',
    nextText: '🎉 ส่งมอบลูกค้า'
  },
  COMPLETED: {
    id: 'COMPLETED',
    name: 'เสร็จสมบูรณ์',
    badge: '✅ COMPLETED',
    color: '#6b7280',
    nextText: null
  },
  CANCELLED: {
    id: 'CANCELLED',
    name: 'ยกเลิกแล้ว',
    badge: '❌ CANCELLED',
    color: '#ef4444',
    nextText: null
  }
};

export class OrderContext {
  constructor(orderId, beverage, finalPrice, strategy) {
    this.orderId = orderId;
    this.beverage = beverage;
    this.finalPrice = finalPrice;
    this.strategy = strategy;
    this.state = ORDER_STATES.CREATED;
    this.timestamp = new Date().toLocaleTimeString('th-TH');
  }

  next() {
    switch (this.state.id) {
      case 'CREATED':
        this.state = ORDER_STATES.PAID;
        break;
      case 'PAID':
        this.state = ORDER_STATES.BREWING;
        break;
      case 'BREWING':
        this.state = ORDER_STATES.READY;
        break;
      case 'READY':
        this.state = ORDER_STATES.COMPLETED;
        break;
      default:
        break;
    }
    return this.state;
  }

  setState(newState) {
    if (typeof newState === 'string') {
      this.state = ORDER_STATES[newState] || this.state;
    } else if (newState && newState.id) {
      this.state = newState;
    }
    return this.state;
  }

  cancel() {
    if (this.state.id === 'CREATED' || this.state.id === 'PAID') {
      this.state = ORDER_STATES.CANCELLED;
      return true;
    }
    return false;
  }
}
