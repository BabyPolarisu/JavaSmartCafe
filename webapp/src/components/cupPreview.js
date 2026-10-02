/**
 * [Live Virtual Cup Preview]
 * Dynamically visualizes the Beverage Product constructed by BeverageBuilder
 */

export function renderCupPreview(beverage) {
  const isHot = beverage.temperature?.id === 'HOT';
  const isFrappe = beverage.temperature?.id === 'FRAPPE';
  const isIced = beverage.temperature?.id === 'ICED';
  const categoryId = beverage.category?.id || 'COFFEE';
  const toppings = beverage.toppings || [];
  const hasWhippedCream = toppings.some(t => t.id === 'WHIPPED_CREAM');
  const hasBoba = toppings.some(t => t.id === 'BROWN_SUGAR_BOBA');
  const hasJelly = toppings.some(t => t.id === 'ALOE_VERA_JELLY' || t.id === 'HONEY_LEMON_JELLY');
  const hasExtraShot = toppings.some(t => t.id === 'EXTRA_ESPRESSO_SHOT');

  // Determine liquid colors based on category
  let liquidColor1 = '#3d2314';
  let liquidColor2 = '#231209';
  let foamColor = '#f5efe6';

  if (categoryId === 'COFFEE') {
    liquidColor1 = hasExtraShot ? '#200f07' : '#452715';
    liquidColor2 = '#1f1007';
    foamColor = '#d2b48c';
  } else if (categoryId === 'MILK_TEA') {
    liquidColor1 = '#e09f53';
    liquidColor2 = '#ba7224';
    foamColor = '#fff6ea';
  } else if (categoryId === 'FRUIT_TEA') {
    liquidColor1 = '#f59e0b';
    liquidColor2 = '#dc2626';
    foamColor = 'rgba(255, 255, 255, 0.3)';
  } else if (categoryId === 'SMOOTHIE') {
    liquidColor1 = '#fbbf24';
    liquidColor2 = '#ea580c';
    foamColor = '#ffffff';
  }

  const container = beverage.cup;
  const containerId = container?.id || 'CERAMIC_MUG';

  let cupSvg = '';

  if (containerId === 'CERAMIC_MUG') {
    // Ceramic Mug
    cupSvg = `
      <svg viewBox="0 0 240 280" class="cup-svg">
        <defs>
          <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2a2e3f" />
            <stop offset="30%" stop-color="#3b4259" />
            <stop offset="70%" stop-color="#49526e" />
            <stop offset="100%" stop-color="#1e2230" />
          </linearGradient>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${liquidColor1}" />
            <stop offset="100%" stop-color="${liquidColor2}" />
          </linearGradient>
        </defs>

        ${isHot ? `
          <g class="steam-group">
            <path class="steam-line steam-1" d="M85 70 Q95 40 85 15" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path class="steam-line steam-2" d="M115 65 Q125 35 115 10" stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path class="steam-line steam-3" d="M145 70 Q135 40 145 15" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
          </g>
        ` : ''}

        <ellipse cx="115" cy="250" rx="95" ry="16" fill="#1b1e2a" stroke="#4b5563" stroke-width="2"/>
        <ellipse cx="115" cy="248" rx="80" ry="12" fill="#2d3345"/>

        <path d="M175 110 C215 110, 215 190, 170 195" fill="none" stroke="url(#ceramicGrad)" stroke-width="18" stroke-linecap="round"/>
        <path d="M175 115 C205 115, 205 185, 172 190" fill="none" stroke="#121520" stroke-width="6" stroke-linecap="round"/>

        <path d="M55 90 L68 230 C70 240, 160 240, 162 230 L175 90 Z" fill="url(#ceramicGrad)" stroke="#4b5563" stroke-width="1.5"/>
        <path d="M62 105 L70 225 C72 233, 158 233, 160 225 L168 105 Z" fill="url(#liquidGrad)"/>

        <ellipse cx="115" cy="105" rx="53" ry="12" fill="${foamColor}" opacity="0.9"/>
        <ellipse cx="115" cy="107" rx="42" ry="7" fill="${liquidColor1}" opacity="0.3"/>

        <ellipse cx="115" cy="90" rx="60" ry="14" fill="#3b4259" stroke="#606b85" stroke-width="2"/>
        <ellipse cx="115" cy="92" rx="54" ry="10" fill="#202534"/>

        <circle cx="115" cy="165" r="18" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" stroke-width="1.5"/>
        <text x="115" y="170" font-family="'Outfit', sans-serif" font-size="12" fill="#f59e0b" text-anchor="middle" font-weight="bold">☕</text>
      </svg>
    `;
  } else if (containerId === 'DOUBLE_WALL_PAPER') {
    // Kraft Double-Wall Paper Cup
    cupSvg = `
      <svg viewBox="0 0 240 280" class="cup-svg">
        <defs>
          <linearGradient id="kraftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#b48455" />
            <stop offset="35%" stop-color="#c99b6d" />
            <stop offset="70%" stop-color="#d6ab7f" />
            <stop offset="100%" stop-color="#9a6e43" />
          </linearGradient>
          <linearGradient id="sleeveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3d2716" />
            <stop offset="50%" stop-color="#5a3b22" />
            <stop offset="100%" stop-color="#332011" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1f2430" />
            <stop offset="50%" stop-color="#374151" />
            <stop offset="100%" stop-color="#111827" />
          </linearGradient>
        </defs>

        ${isHot ? `
          <g class="steam-group">
            <path class="steam-line steam-1" d="M100 45 Q90 20 100 5" stroke="rgba(255,255,255,0.4)" stroke-width="3" fill="none" stroke-linecap="round"/>
            <path class="steam-line steam-2" d="M120 40 Q130 15 120 2" stroke="rgba(255,255,255,0.5)" stroke-width="4" fill="none" stroke-linecap="round"/>
          </g>
        ` : ''}

        <path d="M60 75 L76 245 C77 252, 163 252, 164 245 L180 75 Z" fill="url(#kraftGrad)" stroke="#8c6139" stroke-width="1.5"/>

        <path d="M66 125 L73 195 C74 200, 166 200, 167 195 L174 125 Z" fill="url(#sleeveGrad)"/>
        <line x1="72" y1="135" x2="168" y2="135" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
        <line x1="74" y1="150" x2="166" y2="150" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
        <line x1="75" y1="165" x2="165" y2="165" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>
        <line x1="76" y1="180" x2="164" y2="180" stroke="rgba(0,0,0,0.2)" stroke-width="1.5"/>

        <rect x="95" y="145" width="50" height="24" rx="4" fill="#f59e0b" opacity="0.95"/>
        <text x="120" y="161" font-family="'Outfit', sans-serif" font-size="10" fill="#1e1b18" font-weight="bold" text-anchor="middle">SMART CAFE</text>

        <ellipse cx="120" cy="75" rx="60" ry="12" fill="url(#lidGrad)" stroke="#4b5563" stroke-width="1.5"/>
        <rect x="105" y="55" width="30" height="15" rx="4" fill="#374151" stroke="#1f2430" stroke-width="1"/>
        <ellipse cx="120" cy="55" rx="10" ry="3" fill="#111827"/>
      </svg>
    `;
  } else if (containerId === 'DOME_LID_PET') {
    // Dome Lid Cup
    cupSvg = `
      <svg viewBox="0 0 240 280" class="cup-svg">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${liquidColor1}" />
            <stop offset="100%" stop-color="${liquidColor2}" />
          </linearGradient>
        </defs>

        <line x1="120" y1="15" x2="135" y2="230" stroke="#f59e0b" stroke-width="9" stroke-linecap="round"/>
        <line x1="123" y1="15" x2="133" y2="230" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>

        <path d="M58 100 L76 250 C77 256, 163 256, 164 250 L182 100 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>
        <path d="M62 120 L77 246 C78 251, 162 251, 163 246 L178 120 Z" fill="url(#liquidGrad)"/>

        ${hasBoba ? `
          <g class="boba-layer">
            <circle cx="85" cy="242" r="7" fill="#1a110a" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="102" cy="244" r="8" fill="#150d08" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="120" cy="243" r="7.5" fill="#20130b" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="138" cy="244" r="8" fill="#150d08" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="155" cy="241" r="7" fill="#1c1109" stroke="#3b2314" stroke-width="1.5"/>
          </g>
        ` : ''}

        ${hasJelly ? `
          <g class="jelly-layer" opacity="0.85">
            <rect x="85" y="215" width="12" height="12" rx="2" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" stroke-width="1"/>
            <rect x="110" y="218" width="13" height="13" rx="2" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" stroke-width="1"/>
            <rect x="135" y="214" width="11" height="11" rx="2" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" stroke-width="1"/>
          </g>
        ` : ''}

        ${isIced ? `
          <g class="ice-cubes" opacity="0.6">
            <rect x="80" y="135" width="22" height="22" rx="4" fill="rgba(255,255,255,0.7)" transform="rotate(15 90 145)"/>
            <rect x="125" y="140" width="24" height="24" rx="4" fill="rgba(255,255,255,0.8)" transform="rotate(-12 135 150)"/>
          </g>
        ` : ''}

        ${(hasWhippedCream || isFrappe) ? `
          <g class="whipped-cream-group">
            <path d="M70 105 C70 80, 95 85, 105 80 C115 70, 125 70, 135 80 C145 85, 170 80, 170 105 Z" fill="#ffffff" stroke="#f1f5f9" stroke-width="1.5"/>
            <path d="M85 85 C95 60, 120 50, 125 50 C130 50, 150 60, 155 85 Z" fill="#ffffff"/>
            <circle cx="125" cy="35" r="4" fill="#ef4444"/>
          </g>
        ` : ''}

        <path d="M56 100 C56 40, 184 40, 184 100" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.65)" stroke-width="2.5"/>
        <ellipse cx="120" cy="100" rx="64" ry="10" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>
      </svg>
    `;
  } else if (containerId === 'PERSONAL_TUMBLER') {
    // Personal Tumbler
    cupSvg = `
      <svg viewBox="0 0 240 280" class="cup-svg">
        <defs>
          <linearGradient id="tumblerSteel" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#0f766e" />
            <stop offset="30%" stop-color="#14b8a6" />
            <stop offset="70%" stop-color="#2dd4bf" />
            <stop offset="100%" stop-color="#042f2e" />
          </linearGradient>
        </defs>

        <path d="M68 65 L76 250 C77 255, 163 255, 164 250 L172 65 Z" fill="url(#tumblerSteel)" stroke="#2dd4bf" stroke-width="2"/>
        <line x1="70" y1="90" x2="170" y2="90" stroke="#042f2e" stroke-width="3"/>
        <line x1="72" y1="210" x2="168" y2="210" stroke="#042f2e" stroke-width="3"/>

        <rect x="90" y="130" width="60" height="40" rx="6" fill="rgba(255,255,255,0.15)" stroke="#5eead4" stroke-width="1.5"/>
        <text x="120" y="148" font-family="'Outfit', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">🌱</text>
        <text x="120" y="162" font-family="'Prompt', sans-serif" font-size="9" fill="#ccfbf1" font-weight="bold" text-anchor="middle">ECO TUMBLER</text>

        <rect x="66" y="45" width="108" height="20" rx="6" fill="#134e4a" stroke="#2dd4bf" stroke-width="1.5"/>
        <rect x="100" y="36" width="40" height="12" rx="4" fill="#042f2e" stroke="#5eead4" stroke-width="1"/>
      </svg>
    `;
  } else {
    // Tall Glass / Eco PLA
    const isEco = containerId === 'ECO_PLA_COLD';
    cupSvg = `
      <svg viewBox="0 0 240 280" class="cup-svg">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${liquidColor1}" />
            <stop offset="100%" stop-color="${liquidColor2}" />
          </linearGradient>
        </defs>

        <line x1="120" y1="20" x2="140" y2="235" stroke="${isEco ? '#10b981' : '#3b82f6'}" stroke-width="8" stroke-linecap="round"/>
        <line x1="123" y1="20" x2="137" y2="235" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>

        <path d="M60 85 L76 248 C77 254, 163 254, 164 248 L180 85 Z" fill="rgba(255,255,255,0.06)" stroke="${isEco ? '#10b981' : 'rgba(255,255,255,0.6)'}" stroke-width="2"/>
        <path d="M64 105 L78 244 C79 249, 161 249, 162 244 L176 105 Z" fill="url(#liquidGrad)"/>

        ${hasBoba ? `
          <g class="boba-layer">
            <circle cx="88" cy="240" r="7" fill="#150d08" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="106" cy="242" r="8" fill="#1a110a" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="124" cy="241" r="7.5" fill="#150d08" stroke="#3b2314" stroke-width="1.5"/>
            <circle cx="142" cy="242" r="8" fill="#20130b" stroke="#3b2314" stroke-width="1.5"/>
          </g>
        ` : ''}

        ${isIced ? `
          <g class="ice-cubes" opacity="0.65">
            <rect x="85" y="125" width="22" height="22" rx="4" fill="rgba(255,255,255,0.75)" transform="rotate(18 95 135)"/>
            <rect x="125" y="130" width="24" height="24" rx="4" fill="rgba(255,255,255,0.85)" transform="rotate(-15 135 140)"/>
          </g>
        ` : ''}

        <ellipse cx="120" cy="85" rx="60" ry="12" fill="${isEco ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.2)'}" stroke="${isEco ? '#10b981' : 'rgba(255,255,255,0.7)'}" stroke-width="2"/>
      </svg>
    `;
  }

  return `
    <div class="virtual-cup-card">
      <div class="cup-graphic-wrapper">
        ${cupSvg}
      </div>

      <div class="cup-meta-tags">
        <span class="meta-pill temp-pill ${beverage.temperature?.id.toLowerCase()}">
          ${beverage.temperature?.icon || '☕'} ${beverage.temperature?.label || 'ร้อน'}
        </span>
        <span class="meta-pill size-pill">
          ${beverage.size?.code || 'M'} (${beverage.size?.oz || 16} oz / ${beverage.size?.ml || 480} ml)
        </span>
        <span class="meta-pill sweet-pill">
          🍬 หวาน ${beverage.sweetness?.code || '100%'}
        </span>
        ${(beverage.sourness && beverage.sourness.percent > 0) ? `
          <span class="meta-pill sour-pill">
            🍋 เปรี้ยว ${beverage.sourness.code}
          </span>
        ` : ''}
      </div>

      <div class="container-insight-box">
        <div class="insight-header">
          <div class="insight-title-group">
            <span class="insight-badge">${container?.badge || 'แก้วที่เหมาะสม'}</span>
            <h4>${container?.name || 'แก้วบรรจุ'}</h4>
          </div>
          <span class="eco-score-badge">
            🌱 Eco ${container?.ecoScore || 90}/100
          </span>
        </div>
        <p class="insight-reason">${container?.suitabilityReason || ''}</p>
        <div class="insight-details">
          <span><strong>วัสดุ:</strong> ${container?.material || ''}</span>
          <span><strong>ฝาปิด:</strong> ${container?.lidType || ''}</span>
        </div>
      </div>
    </div>
  `;
}
