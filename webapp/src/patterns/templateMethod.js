/**
 * ============================================================================
 * [TEMPLATE METHOD PATTERN]
 * ระบบขั้นตอนและสูตรมาตรฐานการชง (Standard Operating Procedure - SOP Workflow)
 * ----------------------------------------------------------------------------
 * ความเหมาะสม: กำหนดขั้นตอนมาตรฐาน 6 ขั้นตอนที่เหมือนกันทุกเมนู แต่เปิดให้
 * แต่ละประเภทเครื่องดื่มนำไป override เฉพาะการสกัดเบสและการควบคุมอุณหภูมิ
 * ============================================================================
 */

export class BrewingSOPTemplate {
  getSteps(beverage) {
    const cup = beverage.cupType || beverage.cup || {};
    const cupName = cup.name || 'แก้วมาตรฐาน';
    const cupMaterial = cup.material || 'ฟู้ดเกรดคุณภาพสูง';
    const cupLidType = cup.lidType || 'ฝาปิดมาตรฐาน';
    const sweetnessDesc = beverage.sweetness?.description || 'หวาน 100%';
    const sournessDesc = beverage.sourness?.description || 'ไม่เปรี้ยว 0%';

    return [
      {
        step: 1,
        title: 'หยิบและเตรียมภาชนะแก้ว',
        detail: `ใช้ ${cupName} (วัสดุ: ${cupMaterial})`,
        icon: '🧋'
      },
      this.extractBase(beverage),
      {
        step: 3,
        title: 'ปรุงระดับความหวานและความเปรี้ยว',
        detail: `หวาน: ${sweetnessDesc} | เปรี้ยว: ${sournessDesc}`,
        icon: '🍯'
      },
      this.handleTemperature(beverage),
      {
        step: 5,
        title: 'ใส่ท็อปปิ้งและส่วนผสมตกแต่ง',
        detail: (beverage.toppings || []).length > 0 
          ? `ใส่ท็อปปิ้ง: ${beverage.toppings.map(t => t.name).join(', ')}`
          : 'ไม่ใส่ท็อปปิ้งเสริม',
        icon: '🧋'
      },
      {
        step: 6,
        title: 'ปิดฝาและติดฉลากออเดอร์',
        detail: `ปิดฝาแบบ: ${cupLidType} พร้อมติดฉลากระบุรายละเอียด`,
        icon: '🏷️'
      }
    ];
  }

  extractBase(beverage) {
    throw new Error('Abstract method: extractBase');
  }

  handleTemperature(beverage) {
    throw new Error('Abstract method: handleTemperature');
  }
}

export class CoffeeBrewingSOP extends BrewingSOPTemplate {
  extractBase(beverage) {
    return {
      step: 2,
      title: 'สกัดช็อตเอสเพรสโซ่สด 9 บาร์',
      detail: 'บดเมล็ดกาแฟ Specialty Arabica 18g และสกัดช็อต 28 วินาทีด้วยแรงดัน 9 บาร์',
      icon: '☕'
    };
  }

  handleTemperature(beverage) {
    return {
      step: 4,
      title: beverage.temperature.id === 'HOT' ? 'สตรีมนมร้อนไมโครโฟม' : 'เติมน้ำแข็งบริสุทธิ์และนมเย็น',
      detail: beverage.temperature.id === 'HOT'
        ? 'สตรีมนมสดแท้ที่ 65°C ให้เกิดฟองนมนุ่มละเอียด'
        : `ตักน้ำแข็ง: ${beverage.iceLevel} และผสมนมเย็นจัด`,
      icon: beverage.temperature.id === 'HOT' ? '♨️' : '❄️'
    };
  }
}

export class TeaBrewingSOP extends BrewingSOPTemplate {
  extractBase(beverage) {
    return {
      step: 2,
      title: 'แช่สกัดใบชาพรีเมียม 85°C',
      detail: 'แช่ใบชาคัดเกรดในน้ำร้อน 85°C นาน 4 นาที เพื่อดึงความหอมและบอดี้ของชาอย่างสมบูรณ์',
      icon: '🫖'
    };
  }

  handleTemperature(beverage) {
    return {
      step: 4,
      title: beverage.temperature.id === 'HOT' ? 'รักษาอุณหภูมิชาอุ่น' : 'เชคชากับน้ำแข็งในแก้วเชคเกอร์',
      detail: beverage.temperature.id === 'HOT'
        ? 'อุ่นชาที่อุณหภูมิคงที่ 75°C'
        : `เชคชาผสมน้ำผลไม้/โซดาพร้อมน้ำแข็ง: ${beverage.iceLevel}`,
      icon: beverage.temperature.id === 'HOT' ? '♨️' : '🧊'
    };
  }
}

export class SmoothieBrewingSOP extends BrewingSOPTemplate {
  extractBase(beverage) {
    return {
      step: 2,
      title: 'เตรียมเนื้อผลไม้สดและส่วนผสมปั่น',
      detail: 'ชั่งน้ำหนักเนื้อผลไม้แท้แช่แข็ง โยเกิร์ตสด และน้ำผลไม้สูตรเข้มข้น',
      icon: '🥭'
    };
  }

  handleTemperature(beverage) {
    return {
      step: 4,
      title: 'ปั่นด้วยความเร็วสูง 25,000 RPM',
      detail: 'ปั่นด้วยเครื่องปั่นอุตสาหกรรม 30 วินาทีจนเนื้อเนียนละเอียดเป็นเกล็ดหิมะนุ่มฟู',
      icon: '🌪️'
    };
  }
}

export function getSOPForCategory(categoryId) {
  if (categoryId === 'COFFEE') return new CoffeeBrewingSOP();
  if (categoryId === 'SMOOTHIE') return new SmoothieBrewingSOP();
  return new TeaBrewingSOP();
}
