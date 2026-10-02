import './style.css';
import {
  CATEGORIES,
  MENU_ITEMS,
  SIZES,
  TEMPERATURES,
  SWEETNESS_LEVELS,
  SOURNESS_LEVELS,
  DINING_OPTIONS,
  TOPPINGS
} from './data/beverages.js';
import { BeverageBuilder, BeverageDirector } from './patterns/builder.js';
import { PRICING_STRATEGIES } from './patterns/strategy.js';
import { OrderContext } from './patterns/state.js';
import { orderEventBus, playChimeSound } from './patterns/observer.js';
import { renderCupPreview } from './components/cupPreview.js';
import { showDirectorModal } from './components/directorModal.js';
import { renderBaristaView, setupBaristaEvents } from './components/baristaView.js';
import { renderQueueView } from './components/queueView.js';
import { showPatternInspector } from './components/patternInspector.js';
import { showToast } from './utils/toast.js';

// Application State
const builder = new BeverageBuilder();
const director = new BeverageDirector();

const catalog = {
  categories: CATEGORIES,
  menuItems: MENU_ITEMS,
  sizes: SIZES,
  temperatures: TEMPERATURES,
  sweetness: SWEETNESS_LEVELS,
  sourness: SOURNESS_LEVELS,
  diningOptions: DINING_OPTIONS,
  toppings: TOPPINGS
};

let currentTab = 'kiosk'; // 'kiosk', 'barista', 'queue'
let orderCounter = 103;
const ordersList = [];

const appState = {
  selectedCategory: CATEGORIES.COFFEE,
  selectedMenu: MENU_ITEMS[0],
  selectedTemperature: TEMPERATURES[0], // HOT
  selectedDining: DINING_OPTIONS[0],    // DINE_IN
  selectedSize: SIZES[1],               // M (16 oz / 480 ml)
  selectedSweetness: SWEETNESS_LEVELS[1], // 25%
  selectedSourness: SOURNESS_LEVELS[0],  // 0%
  iceLevel: 'น้ำแข็งปกติ (100%)',
  selectedToppings: [TOPPINGS[4]],      // Extra espresso shot
  specialNote: 'เน้นฟองนมนุ่ม ราดคาราเมลซอสลายตาราง',
  selectedStrategy: PRICING_STRATEGIES[0] // Regular
};

// Build current Beverage Product
function buildCurrentBeverage() {
  builder.reset()
    .setName(appState.selectedMenu.name)
    .setCategory(appState.selectedCategory)
    .setBasePrice(appState.selectedMenu.basePrice)
    .setSize(appState.selectedSize)
    .setTemperature(appState.selectedTemperature)
    .setDiningOption(appState.selectedDining)
    .setSweetness(appState.selectedSweetness)
    .setSourness(appState.selectedSourness)
    .setIceLevel(appState.iceLevel)
    .setSpecialNote(appState.specialNote);

  appState.selectedToppings.forEach(t => builder.addTopping(t));

  return builder.build();
}

function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <!-- Centered Brand Header -->
    <header class="app-header-centered">
      <!-- Main Row: Left Status, Center Logo & Brand, Right Action Buttons -->
      <div class="header-main-row">
        <!-- Left: Live Cafe Status -->
        <div class="header-side-left">
          <div class="cafe-status-chip">
            <span class="status-pulse-dot"></span>
            <div class="status-text-group">
              <span class="status-label">OPEN • บริการสดใหม่</span>
              <span class="status-detail">Specialty Coffee & Craft Beverage</span>
            </div>
          </div>
        </div>

        <!-- CENTER: Grand Logo Badge & Typography -->
        <div class="header-center-brand" id="brand-home-btn" title="Smart Cafe Home">
          <div class="brand-logo-badge">
            <img src="/smart-cafe-logo.png" alt="Smart Cafe Logo" />
          </div>
          <div class="brand-title-group">
            <h1 class="brand-title">SMART CAFE</h1>
            <div class="brand-tagline">
              <span>เครื่องดื่มร้อนและเย็น</span>
              <span class="dot-sep">•</span>
              <span class="gold-text">ความสุขทุกแก้ว</span>
              <span class="dot-sep">•</span>
              <span>EST. 2024</span>
            </div>
            <div class="architecture-subtag">
              [ 🏛️ 7 GoF Design Patterns Architecture ]
            </div>
          </div>
        </div>

        <!-- Right: Pattern Tools & Presets -->
        <div class="header-side-right">
          <button id="open-director-btn" class="header-action-btn director">
            <span class="btn-icon">📋</span>
            <div class="btn-text-col">
              <strong>สูตรสำเร็จ</strong>
              <small>Director Presets</small>
            </div>
          </button>
          <button id="open-inspector-btn" class="header-action-btn inspector">
            <span class="btn-icon">🏛️</span>
            <div class="btn-text-col">
              <strong>ตรวจสถาปัตยกรรม</strong>
              <small>7 GoF Patterns</small>
            </div>
          </button>
        </div>
      </div>

      <!-- Symmetrical Centered Navigation Row -->
      <div class="header-nav-row">
        <nav class="centered-nav-tabs">
          <button class="nav-tab-btn ${currentTab === 'kiosk' ? 'active' : ''}" data-tab="kiosk">
            <span class="tab-icon">🛒</span>
            <div class="tab-text-col">
              <span class="tab-title">Kiosk Order</span>
              <span class="tab-sub">Builder + Decorator</span>
            </div>
          </button>

          <button class="nav-tab-btn ${currentTab === 'barista' ? 'active' : ''}" data-tab="barista">
            <span class="tab-icon">👨‍🍳</span>
            <div class="tab-text-col">
              <span class="tab-title">Barista KDS</span>
              <span class="tab-sub">State + Template SOP</span>
            </div>
            ${ordersList.filter(o => o.state.id !== 'COMPLETED' && o.state.id !== 'CANCELLED').length > 0 ? `
              <span class="tab-badge red">${ordersList.filter(o => o.state.id !== 'COMPLETED' && o.state.id !== 'CANCELLED').length}</span>
            ` : ''}
          </button>

          <button class="nav-tab-btn ${currentTab === 'queue' ? 'active' : ''}" data-tab="queue">
            <span class="tab-icon">📢</span>
            <div class="tab-text-col">
              <span class="tab-title">Queue Board</span>
              <span class="tab-sub">Observer Pattern</span>
            </div>
            ${ordersList.filter(o => o.state.id === 'READY').length > 0 ? `
              <span class="tab-badge green">${ordersList.filter(o => o.state.id === 'READY').length}</span>
            ` : ''}
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Container -->
    <main class="app-container" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem;">
      <div id="tab-content">
        ${renderCurrentTabContent()}
      </div>
    </main>
  `;

  attachGlobalEvents();
}

function renderCurrentTabContent() {
  if (currentTab === 'barista') {
    return renderBaristaView(ordersList, () => renderApp());
  }
  if (currentTab === 'queue') {
    return renderQueueView(ordersList);
  }
  return renderKioskStudio();
}

function renderKioskStudio() {
  return `
    <div class="studio-grid">
      <!-- Left: Fluent Builder Steps -->
      <div class="studio-form-col">
        <!-- Step 1: Category & Menu Selection -->
        <div class="section-box">
          <div class="section-box-header">
            <div class="section-title">
              <span class="step-indicator">1</span>
              <span>เลือกประเภทเครื่องดื่ม & เมนู (.setCategory, .setName)</span>
            </div>
            <span class="pattern-tag-label builder">Builder Pattern</span>
          </div>

          <!-- Categories -->
          <div class="category-tabs-row" id="cat-tabs-row">
            ${Object.values(CATEGORIES).map(cat => `
              <div class="category-tab-card ${cat.id === appState.selectedCategory.id ? 'active' : ''}" data-cat="${cat.id}">
                <span class="cat-icon">${cat.icon}</span>
                <div class="cat-info">
                  <h4>${cat.name}</h4>
                  <span>${cat.enName}</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Menu Grid -->
          <div class="menu-items-grid" id="menu-items-grid"></div>
        </div>

        <!-- Step 2: Serving, Dining & Size -->
        <div class="section-box">
          <div class="section-box-header">
            <div class="section-title">
              <span class="step-indicator">2</span>
              <span>อุณหภูมิ, การรับประทาน & ขนาด/ปริมาตร (.setSize, .setTemperature)</span>
            </div>
            <span class="pattern-tag-label builder">Appropriate Cup Selection</span>
          </div>

          <div class="options-subgrid">
            <!-- Temperature -->
            <div>
              <div class="subgroup-title">🌡️ อุณหภูมิการเสิร์ฟ</div>
              <div class="choice-group" id="temp-group">
                ${TEMPERATURES.map(t => `
                  <button class="choice-btn ${t.id === appState.selectedTemperature.id ? 'active' : ''}" data-temp="${t.id}">
                    <span>${t.icon} ${t.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Dining Option -->
            <div>
              <div class="subgroup-title">🍽️ รูปแบบการทาน</div>
              <div class="choice-group" id="dining-group">
                ${DINING_OPTIONS.map(d => `
                  <button class="choice-btn ${d.id === appState.selectedDining.id ? 'active' : ''}" data-dining="${d.id}">
                    <span>${d.icon} ${d.label}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Ice Level -->
            <div>
              <div class="subgroup-title">🧊 ระดับน้ำแข็ง</div>
              <div class="choice-group" id="ice-group">
                ${['ไม่ใส่น้ำแข็ง (0%)', 'น้ำแข็งน้อย (50%)', 'น้ำแข็งปกติ (100%)'].map(ice => `
                  <button class="choice-btn ${ice === appState.iceLevel ? 'active' : ''}" data-ice="${ice}">
                    <span>${ice}</span>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Size Selector Cards (S, M, L, XL) -->
          <div style="margin-top:1rem;">
            <div class="subgroup-title" style="margin-bottom:0.75rem">📏 ขนาดและปริมาตรมาตรฐาน (Size & Volume in oz and ml)</div>
            <div class="size-selector-row" id="size-group">
              ${SIZES.map(s => `
                <div class="size-card ${s.code === appState.selectedSize.code ? 'active' : ''}" data-size="${s.code}">
                  <div class="size-code">${s.code}</div>
                  <div class="size-label">${s.label}</div>
                  <div class="size-volume">${s.oz} oz / ${s.ml} ml</div>
                  <div class="size-offset">${s.priceOffset > 0 ? `+${s.priceOffset} บ.` : 'ราคาฐาน'}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Step 3: Sweetness & Sourness Flavor Tuning -->
        <div class="section-box">
          <div class="section-box-header">
            <div class="section-title">
              <span class="step-indicator">3</span>
              <span>ระดับความหวาน & ระดับความเปรี้ยว (.setSweetness, .setSourness)</span>
            </div>
          </div>

          <div class="flavor-tuning-grid">
            <!-- Sweetness -->
            <div class="flavor-box">
              <div class="flavor-header">
                <span class="flavor-title">🍬 ระดับความหวาน</span>
                <span class="flavor-value-badge sweet" id="sweet-badge">${appState.selectedSweetness.code}</span>
              </div>
              <div class="flavor-chips-row" id="sweet-chips-group">
                ${SWEETNESS_LEVELS.map(sw => `
                  <button class="chip-btn sweet ${sw.code === appState.selectedSweetness.code ? 'active' : ''}" data-sweet="${sw.code}">
                    ${sw.code}
                  </button>
                `).join('')}
              </div>
              <p style="font-size:0.75rem;color:var(--text-dim);margin-top:0.75rem" id="sweet-desc">
                ${appState.selectedSweetness.label}
              </p>
            </div>

            <!-- Sourness -->
            <div class="flavor-box">
              <div class="flavor-header">
                <span class="flavor-title">🍋 ระดับความเปรี้ยว</span>
                <span class="flavor-value-badge sour" id="sour-badge">${appState.selectedSourness.code}</span>
              </div>
              <div class="flavor-chips-row" id="sour-chips-group">
                ${SOURNESS_LEVELS.map(so => `
                  <button class="chip-btn sour ${so.code === appState.selectedSourness.code ? 'active' : ''}" data-sour="${so.code}">
                    ${so.code}
                  </button>
                `).join('')}
              </div>
              <p style="font-size:0.75rem;color:var(--text-dim);margin-top:0.75rem" id="sour-desc">
                ${appState.selectedSourness.label}
              </p>
            </div>
          </div>
        </div>

        <!-- Step 4: Toppings Decorator -->
        <div class="section-box">
          <div class="section-box-header">
            <div class="section-title">
              <span class="step-indicator">4</span>
              <span>ท็อปปิ้งและส่วนผสมตกแต่งเสริม [Decorator Pattern]</span>
            </div>
            <span class="pattern-tag-label" style="background:rgba(56, 189, 248, 0.2); color:#38bdf8;">Decorator Pattern</span>
          </div>

          <div class="toppings-selection-grid" id="toppings-group">
            ${TOPPINGS.map(top => {
              const isSelected = appState.selectedToppings.some(t => t.id === top.id);
              return `
                <div class="topping-checkbox-card ${isSelected ? 'selected' : ''}" data-topping="${top.id}">
                  <div class="topping-icon">${top.icon}</div>
                  <div class="topping-meta">
                    <span class="top-name">${top.name}</span>
                    <span class="top-price">+${top.price} บ.</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Special Note -->
          <div style="margin-top:1.25rem;">
            <label class="subgroup-title" style="display:block; margin-bottom:0.4rem;">
              ✍️ หมายเหตุพิเศษถึงบาริสต้า (.setSpecialNote)
            </label>
            <input type="text" id="special-note-input" class="text-input" 
                   value="${appState.specialNote}" 
                   placeholder="เช่น แยกชั้นกาแฟกับนม, ฟองนมนุ่มๆ, ขอเลมอนแว่น..." />
          </div>
        </div>

        <!-- Step 5: Pricing Strategy Selection -->
        <div class="section-box">
          <div class="section-box-header">
            <div class="section-title">
              <span class="step-indicator">5</span>
              <span>นโยบายราคาและส่วนลด [Strategy Pattern]</span>
            </div>
            <span class="pattern-tag-label" style="background:rgba(167, 139, 250, 0.2); color:#a78bfa;">Strategy Pattern</span>
          </div>

          <div class="pricing-strategy-grid" id="strategy-group" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:0.75rem;">
            ${PRICING_STRATEGIES.map(strat => `
              <div class="strategy-card ${strat.id === appState.selectedStrategy.id ? 'active' : ''}" data-strategy="${strat.id}" style="padding:0.75rem; border-radius:10px; background:rgba(255,255,255,0.03); border:1px solid ${strat.id === appState.selectedStrategy.id ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}; cursor:pointer;">
                <div style="font-weight:600; font-size:0.9rem; margin-bottom:0.2rem; display:flex; align-items:center; gap:0.3rem;">
                  <span>${strat.icon}</span> ${strat.name}
                </div>
                <div style="font-size:0.75rem; color:var(--text-muted);">${strat.instance.getDescription()}</div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>

      <!-- Right: Virtual Cup Preview & Order Summary -->
      <div class="studio-preview-col">
        <div class="sticky-preview-card">
          <!-- 3D-like Virtual Cup Container -->
          <div id="virtual-cup-mount"></div>

          <!-- Price & Spec Summary -->
          <div class="order-summary-panel">
            <h3 class="summary-heading">สรุปรายการคำสั่งซื้อ</h3>
            
            <div class="summary-line-items">
              <div class="summary-line-item">
                <span id="sum-menu-name">เมนู</span>
                <span id="sum-menu-price">0 บ.</span>
              </div>
              <div class="summary-line-item">
                <span>ส่วนต่างขนาด:</span>
                <span id="sum-size-offset">0 บ.</span>
              </div>
              <div class="summary-line-item">
                <span>ท็อปปิ้ง (Decorator):</span>
                <span id="sum-toppings-total">+0 บ.</span>
              </div>
              <div class="summary-line-item discount" id="sum-strategy-row" style="display:none; color:#34d399;">
                <span id="sum-strategy-name">ส่วนลด Strategy:</span>
                <span id="sum-strategy-amount">-0.00 บ.</span>
              </div>
            </div>

            <div class="summary-line-item time-row" style="background:rgba(245, 158, 11, 0.08); padding:0.45rem 0.75rem; border-radius:8px; border:1px solid rgba(245, 158, 11, 0.2); margin:0.5rem 0; display:flex; justify-content:space-between; align-items:center;">
              <span style="color:var(--text-muted); font-size:0.85rem; display:flex; align-items:center; gap:0.4rem;">
                ⏱️ เวลาประมาณการชงเสร็จ:
              </span>
              <strong id="sum-brew-time" style="color:#fbbf24; font-size:0.95rem; font-weight:700;">~3 นาที</strong>
            </div>

            <div class="summary-total-row">
              <span class="total-label">ราคาสุทธิ:</span>
              <span class="total-amount" id="sum-final-total">0.00 บาท</span>
            </div>

            <button id="place-order-btn" class="btn btn-primary btn-block btn-lg" style="background:linear-gradient(135deg, #10b981, #059669); font-weight:700;">
              <span>🛒 ชำระเงิน & ส่งออเดอร์เข้าครัว (Place Order) ⏩</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function updateUI() {
  const beverage = buildCurrentBeverage();

  // Render Virtual Cup
  const mount = document.getElementById('virtual-cup-mount');
  if (mount) {
    mount.innerHTML = renderCupPreview(beverage);
  }

  // Update Summary Card
  const subtotal = beverage.calculateTotalPrice();
  const finalTotal = appState.selectedStrategy.instance.calculate(subtotal);
  const discountAmount = Math.max(0, subtotal - finalTotal);
  const toppingsTotal = beverage.toppings.reduce((acc, t) => acc + t.price, 0);

  const menuNameEl = document.getElementById('sum-menu-name');
  if (menuNameEl) {
    menuNameEl.textContent = `${beverage.name} (${beverage.size.label})`;
    document.getElementById('sum-menu-price').textContent = `${beverage.basePrice} บ.`;
    document.getElementById('sum-size-offset').textContent = beverage.size.priceOffset > 0 ? `+${beverage.size.priceOffset} บ.` : 'ราคาฐาน';
    document.getElementById('sum-toppings-total').textContent = toppingsTotal > 0 ? `+${toppingsTotal} บ.` : '0 บ.';

    const stratRow = document.getElementById('sum-strategy-row');
    if (stratRow) {
      if (discountAmount > 0) {
        stratRow.style.display = 'flex';
        document.getElementById('sum-strategy-name').textContent = appState.selectedStrategy.name;
        document.getElementById('sum-strategy-amount').textContent = `-${discountAmount.toFixed(2)} บ.`;
      } else {
        stratRow.style.display = 'none';
      }
    }

    const brewTimeEl = document.getElementById('sum-brew-time');
    if (brewTimeEl) {
      brewTimeEl.textContent = `~${beverage.getEstimatedBrewTime()} นาที`;
    }

    document.getElementById('sum-final-total').textContent = `${finalTotal.toFixed(2)} บาท`;
  }
}

function attachGlobalEvents() {
  // Navigation tabs
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.onclick = () => {
      currentTab = btn.getAttribute('data-tab');
      renderApp();
    };
  });

  // Top header actions
  const directorBtn = document.getElementById('open-director-btn');
  if (directorBtn) {
    directorBtn.onclick = () => {
      showDirectorModal((presetId) => {
        if (presetId === 'caramel_macchiato') {
          director.constructHotCaramelMacchiato(builder, catalog);
        } else if (presetId === 'sparkling_fruit_tea') {
          director.constructSparklingFruitTea(builder, catalog);
        } else if (presetId === 'boba_milk_tea') {
          director.constructBubbleMilkTea(builder, catalog);
        } else if (presetId === 'mango_smoothie') {
          director.constructMangoPassionSmoothie(builder, catalog);
        }

        const bConfig = builder.config || builder;
        appState.selectedCategory = bConfig.category;
        appState.selectedMenu = MENU_ITEMS.find(m => m.name.includes(bConfig.name.split(' ')[0])) || MENU_ITEMS[0];
        appState.selectedSize = bConfig.size;
        appState.selectedTemperature = bConfig.temperature;
        appState.selectedDining = bConfig.diningOption;
        appState.selectedSweetness = bConfig.sweetness;
        appState.selectedSourness = bConfig.sourness;
        appState.selectedToppings = [...bConfig.toppings];
        appState.specialNote = bConfig.specialNote || '';
        if (bConfig.iceLevel) appState.iceLevel = bConfig.iceLevel;

        currentTab = 'kiosk';
        renderApp();
      });
    };
  }

  const inspectorBtn = document.getElementById('open-inspector-btn');
  if (inspectorBtn) {
    inspectorBtn.onclick = () => {
      showPatternInspector();
    };
  }

  if (currentTab === 'barista') {
    setupBaristaEvents(ordersList, () => renderApp());
    return;
  }

  if (currentTab === 'queue') {
    return;
  }

  // Kiosk Studio Events
  renderMenuItems();
  attachKioskEvents();
  updateUI();
}

function renderMenuItems() {
  const container = document.getElementById('menu-items-grid');
  if (!container) return;

  const items = MENU_ITEMS.filter(m => m.categoryId === appState.selectedCategory.id);
  container.innerHTML = items.map(item => `
    <div class="menu-card ${item.id === appState.selectedMenu.id ? 'active' : ''}" data-menuid="${item.id}">
      <div class="menu-card-top">
        <h4>${item.name}</h4>
        <span class="menu-card-price">${item.basePrice}฿</span>
      </div>
      <p>${item.description}</p>
      <div class="menu-card-tags">
        ${item.tags.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        <span class="tag-pill">🔥 ${item.calories} kcal</span>
        <span class="tag-pill" style="background:rgba(245, 158, 11, 0.15); color:#fbbf24; font-weight:600;">⏱️ ชง ~${item.brewTimeMinutes || 3} นาที</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.menu-card').forEach(card => {
    card.onclick = () => {
      const menuId = card.dataset.menuid;
      const found = MENU_ITEMS.find(m => m.id === menuId);
      if (found) {
        appState.selectedMenu = found;
        const defaultTemp = TEMPERATURES.find(t => t.id === found.defaultTemp) || TEMPERATURES[0];
        appState.selectedTemperature = defaultTemp;
        renderMenuItems();
        document.querySelectorAll('#temp-group .choice-btn').forEach(btn => {
          btn.classList.toggle('active', btn.dataset.temp === defaultTemp.id);
        });
        updateUI();
      }
    };
  });
}

function attachKioskEvents() {
  // Category tabs
  document.querySelectorAll('#cat-tabs-row .category-tab-card').forEach(tab => {
    tab.onclick = () => {
      const catId = tab.dataset.cat;
      appState.selectedCategory = CATEGORIES[catId];
      document.querySelectorAll('#cat-tabs-row .category-tab-card').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const firstItem = MENU_ITEMS.find(m => m.categoryId === catId);
      if (firstItem) {
        appState.selectedMenu = firstItem;
        const defaultTemp = TEMPERATURES.find(t => t.id === firstItem.defaultTemp) || TEMPERATURES[0];
        appState.selectedTemperature = defaultTemp;
      }
      renderMenuItems();
      updateUI();
    };
  });

  // Temperatures
  document.querySelectorAll('#temp-group .choice-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#temp-group .choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedTemperature = TEMPERATURES.find(t => t.id === btn.dataset.temp);
      updateUI();
    };
  });

  // Dining
  document.querySelectorAll('#dining-group .choice-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#dining-group .choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedDining = DINING_OPTIONS.find(d => d.id === btn.dataset.dining);
      updateUI();
    };
  });

  // Ice level
  document.querySelectorAll('#ice-group .choice-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#ice-group .choice-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.iceLevel = btn.dataset.ice;
      updateUI();
    };
  });

  // Size cards
  document.querySelectorAll('#size-group .size-card').forEach(card => {
    card.onclick = () => {
      document.querySelectorAll('#size-group .size-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      appState.selectedSize = SIZES.find(s => s.code === card.dataset.size);
      updateUI();
    };
  });

  // Sweetness chips
  document.querySelectorAll('#sweet-chips-group .chip-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sweet-chips-group .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedSweetness = SWEETNESS_LEVELS.find(s => s.code === btn.dataset.sweet);
      document.getElementById('sweet-badge').textContent = appState.selectedSweetness.code;
      document.getElementById('sweet-desc').textContent = appState.selectedSweetness.label;
      updateUI();
    };
  });

  // Sourness chips
  document.querySelectorAll('#sour-chips-group .chip-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('#sour-chips-group .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.selectedSourness = SOURNESS_LEVELS.find(s => s.code === btn.dataset.sour);
      document.getElementById('sour-badge').textContent = appState.selectedSourness.code;
      document.getElementById('sour-desc').textContent = appState.selectedSourness.label;
      updateUI();
    };
  });

  // Toppings
  document.querySelectorAll('#toppings-group .topping-checkbox-card').forEach(card => {
    card.onclick = () => {
      const topId = card.dataset.topping;
      const top = TOPPINGS.find(t => t.id === topId);
      const existsIndex = appState.selectedToppings.findIndex(t => t.id === topId);
      if (existsIndex >= 0) {
        appState.selectedToppings.splice(existsIndex, 1);
        card.classList.remove('selected');
      } else {
        appState.selectedToppings.push(top);
        card.classList.add('selected');
      }
      updateUI();
    };
  });

  // Pricing Strategy Selection
  document.querySelectorAll('#strategy-group .strategy-card').forEach(card => {
    card.onclick = () => {
      const stratId = card.dataset.strategy;
      const found = PRICING_STRATEGIES.find(s => s.id === stratId);
      if (found) {
        appState.selectedStrategy = found;
        document.querySelectorAll('#strategy-group .strategy-card').forEach(c => {
          c.classList.toggle('active', c.dataset.strategy === stratId);
          c.style.borderColor = c.dataset.strategy === stratId ? 'var(--accent)' : 'rgba(255,255,255,0.08)';
        });
        updateUI();
      }
    };
  });

  // Special Note input
  const noteInput = document.getElementById('special-note-input');
  if (noteInput) {
    noteInput.oninput = (e) => {
      appState.specialNote = e.target.value;
      updateUI();
    };
  }

  // Place Order Button (Facade + State + Observer)
  const placeOrderBtn = document.getElementById('place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.onclick = () => {
      const beverage = buildCurrentBeverage();
      const subtotal = beverage.calculateTotalPrice();
      const finalPrice = appState.selectedStrategy.instance.calculate(subtotal);

      const orderId = `A${orderCounter++}`;
      const newOrder = new OrderContext(orderId, beverage, finalPrice, appState.selectedStrategy);

      // Auto pay and transition to PAID so it enters kitchen queue
      newOrder.next(); // Created -> Paid

      ordersList.push(newOrder);
      orderEventBus.notify('NEW_ORDER', newOrder);

      // Show toast notification
      showToast(`🎉 ออเดอร์ #${orderId} เข้าสู่ระบบแล้ว! ส่งไปยังครัวบาริสต้าเรียบร้อย`);

      // Switch to Barista tab to view the incoming order
      currentTab = 'barista';
      renderApp();
    };
  }
}



document.addEventListener('DOMContentLoaded', () => {
  // Pre-populate with sample orders for rich showcase
  const sample1 = builder.reset()
    .setName('คาราเมล มัคคิอาโต้ร้อน')
    .setCategory(CATEGORIES.COFFEE)
    .setBasePrice(65)
    .setSize(SIZES[1])
    .setTemperature(TEMPERATURES[0])
    .setDiningOption(DINING_OPTIONS[0])
    .setSweetness(SWEETNESS_LEVELS[1])
    .setSourness(SOURNESS_LEVELS[0])
    .addTopping(TOPPINGS[4])
    .build();
  
  const o1 = new OrderContext('A101', sample1, 90.0, PRICING_STRATEGIES[1]);
  o1.next(); // PAID
  ordersList.push(o1);

  const sample2 = builder.reset()
    .setName('ชาผลไม้รวมเสาวรสพีชสปาร์คลิ่ง')
    .setCategory(CATEGORIES.FRUIT_TEA)
    .setBasePrice(60)
    .setSize(SIZES[3]) // XL
    .setTemperature(TEMPERATURES[1])
    .setDiningOption(DINING_OPTIONS[1])
    .setSweetness(SWEETNESS_LEVELS[2])
    .setSourness(SOURNESS_LEVELS[3])
    .addTopping(TOPPINGS[1])
    .addTopping(TOPPINGS[2])
    .build();

  const o2 = new OrderContext('A102', sample2, 115.0, PRICING_STRATEGIES[2]);
  o2.next(); // PAID
  o2.next(); // BREWING
  o2.next(); // READY
  ordersList.push(o2);

  renderApp();
});
