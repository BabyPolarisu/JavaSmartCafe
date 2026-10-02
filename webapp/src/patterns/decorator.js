/**
 * ============================================================================
 * [DECORATOR PATTERN]
 * ระบบเครื่องดื่มและส่วนผสมปรับแต่ง (Beverage & Customization Subsystem)
 * ----------------------------------------------------------------------------
 * ความเหมาะสม: ห่อหุ้มเครื่องดื่มพื้นฐานด้วย Toppings และคิดราคา/คำบรรยายสะสมแบบ OCP
 * ============================================================================
 */

export class BeverageComponent {
  getName() { throw new Error('Abstract method'); }
  getDescription() { throw new Error('Abstract method'); }
  getCost() { throw new Error('Abstract method'); }
  getIngredients() { throw new Error('Abstract method'); }
}

export class BaseBeverageComponent extends BeverageComponent {
  constructor(name, basePrice, size, temperature) {
    super();
    this.name = name;
    this.basePrice = basePrice;
    this.size = size;
    this.temperature = temperature;
  }

  getName() {
    return this.name;
  }

  getDescription() {
    return `${this.name} (${this.size.label}, ${this.temperature.label})`;
  }

  getCost() {
    return this.basePrice + (this.size.priceOffset || 0);
  }

  getIngredients() {
    return [`ฐาน: ${this.name}`];
  }
}

export class BeverageDecorator extends BeverageComponent {
  constructor(wrappedBeverage) {
    super();
    this.wrapped = wrappedBeverage;
  }

  getName() {
    return this.wrapped.getName();
  }

  getDescription() {
    return this.wrapped.getDescription();
  }

  getCost() {
    return this.wrapped.getCost();
  }

  getIngredients() {
    return this.wrapped.getIngredients();
  }
}

export class ToppingDecorator extends BeverageDecorator {
  constructor(wrappedBeverage, topping) {
    super(wrappedBeverage);
    this.topping = topping;
  }

  getDescription() {
    return `${this.wrapped.getDescription()} + ${this.topping.name} (+${this.topping.price}บ.)`;
  }

  getCost() {
    return this.wrapped.getCost() + this.topping.price;
  }

  getIngredients() {
    return [...this.wrapped.getIngredients(), `ท็อปปิ้ง: ${this.topping.name} (+${this.topping.price} บาท)`];
  }
}

export function buildDecoratedDrink(baseDrink, toppings = []) {
  let drink = new BaseBeverageComponent(baseDrink.name, baseDrink.basePrice, baseDrink.size, baseDrink.temperature);
  for (const topping of toppings) {
    drink = new ToppingDecorator(drink, topping);
  }
  return drink;
}
