/* ---------- Механика филиалов бизнеса ---------- */
  function saveBusinessesState() {
    try { Storage.setJSON(BUSINESSES_STATE_KEY, businessesState); } catch (e) {}
  }
  window.saveBusinessesState = saveBusinessesState;

  function updateBranchesButtonUI() {
    const btn = document.getElementById('branchesBtn');
    const badge = document.getElementById('branchesAlertBadge');
    if (!btn) return;
    const canBusiness = upgradeLevels.features >= 5;
    btn.style.display = canBusiness ? 'inline-flex' : 'none';
    let hasAttention = false;
    Object.keys(businessesState).forEach(id => {
      if (businessesState[id]?.status === 'attention') hasAttention = true;
    });
    btn.classList.toggle('has-attention', hasAttention);
    if (badge) badge.style.display = hasAttention ? 'inline-block' : 'none';
  }
  window.updateBranchesButtonUI = updateBranchesButtonUI;

  function renderBranchesModal() {
    const list = document.getElementById('branchesList');
    const bBal = document.getElementById('branchesDucklesVal');
    if (bBal) bBal.textContent = duckles.toLocaleString('ru-RU');
    if (!list) return;

    const clockOn = isClockOnTable();
    let html = '';
    Object.values(BUSINESSES_DATA).forEach(b => {
      const state = businessesState[b.id];
      const isOwned = Boolean(state);
      const status = state ? state.status : 'not_owned';

      let actionHtml = '';
      if (!isOwned) {
        actionHtml = `<button class="business-btn business-buy-btn" onclick="buyBusiness('${b.id}')" ${duckles < b.cost ? 'disabled' : ''}>🏢 Купить бизнес (${b.cost.toLocaleString('ru-RU')} 🦆)</button>`;
      } else if (status === 'working') {
        const rem = state.remaining ?? b.workDuration;
        const mins = Math.floor(rem / 60);
        const secs = rem % 60;
        const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        const timeDisplay = clockOn ? timeFormatted : '⏳ (нужны часы)';
        const pct = Math.min(100, Math.max(0, Math.round((1 - rem / b.workDuration) * 100)));
        actionHtml = `
          <div class="business-status-box">
            <div class="business-status-text">⚙️ В работе: <b style="color: #67e8f9;">${timeDisplay}</b></div>
            <div class="business-progress-bg"><div class="business-progress-fill" style="width: ${pct}%;"></div></div>
          </div>
          <button class="business-btn business-work-btn" disabled>⚙️ В процессе</button>
        `;
      } else if (status === 'attention') {
        const rem = state.attentionRemaining ?? b.attentionDuration;
        const timeDisplay = clockOn ? `⏱️ ${rem} сек.` : '⚠️ Срочно! (< 1 мин)';
        const pct = Math.min(100, Math.max(0, Math.round((rem / b.attentionDuration) * 100)));
        actionHtml = `
          <div class="business-status-box">
            <div class="business-status-text attention">🚨 ТРЕБУЕТ ВНИМАНИЯ! <b style="color: #facc15;">${timeDisplay}</b></div>
            <div class="business-progress-bg"><div class="business-progress-fill attention" style="width: ${pct}%;"></div></div>
          </div>
          <button class="business-btn business-attention-btn" onclick="payBusinessAttention('${b.id}')">🎯 Уделить внимание (+${b.income.toLocaleString('ru-RU')} 🦆)</button>
        `;
      }

      html += `
        <div class="business-card ${isOwned ? 'owned' : ''} ${status === 'attention' ? 'requires-attention' : ''}" id="businessCard-${b.id}">
          <div class="business-card-header">
            <div class="business-card-icon">${b.icon}</div>
            <div class="business-card-info">
              <div class="business-card-title">${b.name}</div>
              <div class="business-card-desc">${b.desc}</div>
            </div>
          </div>
          <div class="business-card-stats">
            <div class="business-stat">
              <span class="business-stat-lbl">Стоимость:</span>
              <span class="business-stat-val cost">${b.cost.toLocaleString('ru-RU')} 🦆</span>
            </div>
            <div class="business-stat">
              <span class="business-stat-lbl">Доход:</span>
              <span class="business-stat-val income">+${b.income.toLocaleString('ru-RU')} 🦆</span>
            </div>
            <div class="business-stat">
              <span class="business-stat-lbl">Штраф:</span>
              <span class="business-stat-val penalty">-${b.penalty.toLocaleString('ru-RU')} 🦆</span>
            </div>
          </div>
          <div class="business-card-action-row">
            ${actionHtml}
          </div>
        </div>
      `;
    });
    list.innerHTML = html;
  }
  window.renderBranchesModal = renderBranchesModal;

  function buyBusiness(id) {
    const b = BUSINESSES_DATA[id];
    if (!b || businessesState[id]) return;
    if (!spendDuckles(b.cost)) return;
    corkPopSound();
    businessesState[id] = {
      status: 'working',
      remaining: b.workDuration,
      attentionRemaining: b.attentionDuration
    };
    saveBusinessesState();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 40,
      vx: 0,
      vy: -140,
      size: 22,
      alpha: 1.4,
      text: `🏢 Бизнес куплен: ${b.name}!`,
      color: '#38bdf8'
    });
    renderBranchesModal();
    updateBranchesButtonUI();
  }
  window.buyBusiness = buyBusiness;

  function completeBusinessAttention(id) {
    const b = BUSINESSES_DATA[id];
    const state = businessesState[id];
    if (!b || !state || state.status !== 'attention') return;
    earnDuckles(b.income, true, true);
    xpSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 40,
      vx: 0,
      vy: -140,
      size: 24,
      alpha: 1.5,
      text: `💰 Доход от бизнеса (${b.name}): +${b.income.toLocaleString('ru-RU')} 🦆!`,
      color: '#4ade80'
    });
    state.status = 'working';
    state.remaining = b.workDuration;
    state.attentionRemaining = b.attentionDuration;
    saveBusinessesState();
    closeBusinessMinigame();
    renderBranchesModal();
    updateBranchesButtonUI();
  }
  window.completeBusinessAttention = completeBusinessAttention;

  function payBusinessAttention(id, bypassMinigame = false) {
    const b = BUSINESSES_DATA[id];
    const state = businessesState[id];
    if (!b || !state || state.status !== 'attention') return;
    if (bypassMinigame) {
      completeBusinessAttention(id);
    } else {
      openBusinessMinigame(id);
    }
  }
  window.payBusinessAttention = payBusinessAttention;

  /* ---------- Мини-игры для филиалов ---------- */
  let currentMinigameBusinessId = null;

  function closeBusinessMinigame() {
    const modal = document.getElementById('businessMinigameModal');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }
    const container = document.getElementById('businessMinigameContainer');
    if (container) container.innerHTML = '';
    currentMinigameBusinessId = null;
  }
  window.closeBusinessMinigame = closeBusinessMinigame;

  function openBusinessMinigame(id) {
    const b = BUSINESSES_DATA[id];
    const state = businessesState[id];
    if (!b || !state || state.status !== 'attention') return;

    currentMinigameBusinessId = id;
    const modal = document.getElementById('businessMinigameModal');
    const iconEl = document.getElementById('businessMinigameIcon');
    const titleEl = document.getElementById('businessMinigameTitleText');
    const container = document.getElementById('businessMinigameContainer');

    if (!modal || !container) return;

    if (iconEl) iconEl.textContent = b.icon || '🎮';
    if (titleEl) titleEl.textContent = `${b.name}: Уделить внимание`;

    container.innerHTML = '';

    if (id === 'carwash') {
      initCarwashMinigame(container, b);
    } else if (id === 'utilnya') {
      initUtilnyaMinigame(container, b);
    } else if (id === 'factory') {
      initFactoryMinigame(container, b);
    }

    modal.style.display = 'flex';
    modal.classList.add('open');
  }
  window.openBusinessMinigame = openBusinessMinigame;

  /* 1. Автомойка: водить губкой по машине */
  function initCarwashMinigame(container, b) {
    let washProgress = 0;
    let isWiping = false;
    let lastX = 0, lastY = 0;
    let isWon = false;

    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.innerHTML = `
      <div class="minigame-instruction">
        🧽 Зажмите губку и <b>водите по машине</b>, чтобы отмыть грязь!
      </div>
      <div class="minigame-progress-wrap" style="margin: 12px 0 8px 0;">
        <div class="minigame-progress-header">
          <span>Промыто:</span>
          <span id="carwashProgressText">0%</span>
        </div>
        <div class="minigame-progress-bar">
          <div class="minigame-progress-fill" id="carwashProgressBar" style="width: 0%;"></div>
        </div>
      </div>
      <div class="carwash-arena" id="carwashArena">
        <div class="carwash-car-wrap">
          <div class="carwash-car-icon" id="carwashCarIcon">🚗</div>
          <div class="carwash-dirt-overlay" id="carwashDirtOverlay">
            <span class="carwash-dirt-spot" style="top: 20%; left: 30%;">💩</span>
            <span class="carwash-dirt-spot" style="top: 45%; left: 55%;">🟫</span>
            <span class="carwash-dirt-spot" style="top: 60%; left: 35%;">💩</span>
            <span class="carwash-dirt-spot" style="top: 30%; left: 65%;">🟫</span>
            <span class="carwash-dirt-spot" style="top: 50%; left: 20%;">💩</span>
          </div>
        </div>
        <div class="carwash-sponge" id="carwashSponge" style="left: 50%; top: 50%;">🧽</div>
      </div>
    `;
    container.appendChild(wrap);

    const arena = document.getElementById('carwashArena');
    const sponge = document.getElementById('carwashSponge');
    const dirtOverlay = document.getElementById('carwashDirtOverlay');
    const carIcon = document.getElementById('carwashCarIcon');
    const pText = document.getElementById('carwashProgressText');
    const pBar = document.getElementById('carwashProgressBar');

    function updatePos(clientX, clientY) {
      if (!arena || !sponge) return;
      const rect = arena.getBoundingClientRect();
      const x = Math.max(20, Math.min(rect.width - 20, clientX - rect.left));
      const y = Math.max(20, Math.min(rect.height - 20, clientY - rect.top));
      sponge.style.left = `${x}px`;
      sponge.style.top = `${y}px`;
    }

    function onPointerMove(e) {
      if (isWon) return;
      updatePos(e.clientX, e.clientY);
      if (!isWiping) return;

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 10) {
        lastX = e.clientX;
        lastY = e.clientY;
        washProgress = Math.min(100, washProgress + 3.4);
        if (pBar) pBar.style.width = `${washProgress}%`;
        if (pText) pText.textContent = `${Math.round(washProgress)}%`;
        if (dirtOverlay) dirtOverlay.style.opacity = String(Math.max(0, 1 - washProgress / 90));

        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 60,
          vy: -60 - Math.random() * 50,
          size: 14 + Math.random() * 8,
          alpha: 1.2,
          text: Math.random() > 0.4 ? '🫧' : '💦'
        });

        if (washProgress >= 100) {
          isWon = true;
          isWiping = false;
          if (sponge) sponge.classList.remove('wiping');
          if (carIcon) {
            carIcon.textContent = '✨🚗✨';
            carIcon.style.transform = 'scale(1.15)';
          }
          if (dirtOverlay) dirtOverlay.style.display = 'none';
          if (pText) pText.textContent = '100% (Отмыто!)';
          corkPopSound();
          setTimeout(() => {
            completeBusinessAttention('carwash');
          }, 650);
        }
      }
    }

    if (arena) {
      arena.addEventListener('pointerdown', (e) => {
        if (isWon) return;
        isWiping = true;
        lastX = e.clientX;
        lastY = e.clientY;
        updatePos(e.clientX, e.clientY);
        if (sponge) sponge.classList.add('wiping');
      });
      arena.addEventListener('pointermove', onPointerMove);
      arena.addEventListener('pointerup', () => {
        isWiping = false;
        if (sponge) sponge.classList.remove('wiping');
      });
      arena.addEventListener('pointerleave', () => {
        isWiping = false;
        if (sponge) sponge.classList.remove('wiping');
      });
    }
  }

  /* 2. Утильня: поле 3x3 с сердцами */
  function initUtilnyaMinigame(container, b) {
    let isWon = false;

    let orangeCount = 0;
    let blackCount = 0;
    let gridData = [];
    while (orangeCount < 2 || blackCount < 2) {
      gridData = [];
      orangeCount = 0;
      blackCount = 0;
      for (let i = 0; i < 9; i++) {
        const isOrange = Math.random() > 0.5;
        if (isOrange) {
          gridData.push('orange');
          orangeCount++;
        } else {
          gridData.push('black');
          blackCount++;
        }
      }
    }

    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.innerHTML = `
      <div class="minigame-instruction">
        Утилизируйте сердца (нажимайте на них), чтобы на поле 3×3 остались <b>только 🧡 оранжевые</b> или <b>только 🖤 чёрные</b>!
      </div>
      <div style="display: flex; justify-content: space-around; font: 700 13px system-ui, sans-serif; color: #cbd5e1; margin: 10px 0 6px 0;">
        <span>🧡 Осталось: <b id="utilnyaOrangeCount" style="color: #fb923c;">${orangeCount}</b></span>
        <span>🖤 Осталось: <b id="utilnyaBlackCount" style="color: #94a3b8;">${blackCount}</b></span>
      </div>
      <div class="salvage-grid" id="salvageGrid"></div>
      <div id="utilnyaStatusMsg" style="text-align: center; font: 700 13px system-ui, sans-serif; color: #38bdf8; min-height: 20px;"></div>
    `;
    container.appendChild(wrap);

    const gridEl = document.getElementById('salvageGrid');
    const oCountEl = document.getElementById('utilnyaOrangeCount');
    const bCountEl = document.getElementById('utilnyaBlackCount');
    const statusMsg = document.getElementById('utilnyaStatusMsg');

    gridData.forEach((type, idx) => {
      const tile = document.createElement('button');
      tile.className = 'salvage-tile';
      tile.dataset.index = String(idx);
      tile.dataset.type = type;
      tile.textContent = type === 'orange' ? '🧡' : '🖤';

      tile.addEventListener('click', () => {
        if (isWon || tile.classList.contains('removed')) return;

        tile.classList.add('removed');
        tile.textContent = '💨';
        corkPopSound();

        const rect = tile.getBoundingClientRect();
        particles.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          vx: (Math.random() - 0.5) * 60,
          vy: -80,
          size: 18,
          alpha: 1.3,
          text: '💨'
        });

        const activeTiles = Array.from(gridEl.querySelectorAll('.salvage-tile:not(.removed)'));
        const curOrange = activeTiles.filter(t => t.dataset.type === 'orange').length;
        const curBlack = activeTiles.filter(t => t.dataset.type === 'black').length;

        if (oCountEl) oCountEl.textContent = String(curOrange);
        if (bCountEl) bCountEl.textContent = String(curBlack);

        if ((curOrange === 0 && curBlack > 0) || (curBlack === 0 && curOrange > 0)) {
          isWon = true;
          activeTiles.forEach(t => t.classList.add('won'));
          const wonType = curOrange > 0 ? '🧡 оранжевые' : '🖤 чёрные';
          if (statusMsg) statusMsg.textContent = `🎉 Отлично! На поле остались только ${wonType} сердца!`;
          xpSound();
          setTimeout(() => {
            completeBusinessAttention('utilnya');
          }, 700);
        } else if (curOrange === 0 && curBlack === 0) {
          if (statusMsg) statusMsg.textContent = 'Поле опустело! Заполняем заново...';
          setTimeout(() => initUtilnyaMinigame(container, b), 500);
        }
      });

      gridEl.appendChild(tile);
    });
  }

  /* 3. Завод уточек: 10 раз поймать утку */
  function initFactoryMinigame(container, b) {
    let catches = 0;
    const maxCatches = 10;
    let isWon = false;

    const wrap = document.createElement('div');
    wrap.style.width = '100%';
    wrap.innerHTML = `
      <div class="minigame-instruction">
        Утка сбежала с конвейера! Нажмите на неё <b>10 раз</b>, чтобы откалибровать завод!
      </div>
      <div class="minigame-progress-wrap" style="margin: 12px 0 8px 0;">
        <div class="minigame-progress-header">
          <span>Поймано уточек:</span>
          <span id="factoryProgressText">0 / 10</span>
        </div>
        <div class="minigame-progress-bar">
          <div class="minigame-progress-fill" id="factoryProgressBar" style="width: 0%;"></div>
        </div>
      </div>
      <div class="factory-arena" id="factoryArena">
        <button class="factory-duck-target" id="factoryDuckTarget" aria-label="Утка" style="left: 50%; top: 50%;">🦆</button>
      </div>
    `;
    container.appendChild(wrap);

    const duck = document.getElementById('factoryDuckTarget');
    const pText = document.getElementById('factoryProgressText');
    const pBar = document.getElementById('factoryProgressBar');

    function jumpDuck() {
      if (!duck) return;
      const nextLeft = 15 + Math.random() * 70;
      const nextTop = 20 + Math.random() * 60;
      duck.style.left = `${nextLeft}%`;
      duck.style.top = `${nextTop}%`;
    }

    if (duck) {
      duck.addEventListener('click', () => {
        if (isWon) return;
        catches++;
        quack();

        duck.classList.remove('hit');
        void duck.offsetWidth;
        duck.classList.add('hit');

        const rect = duck.getBoundingClientRect();
        particles.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          vx: (Math.random() - 0.5) * 50,
          vy: -100,
          size: 16,
          alpha: 1.3,
          text: Math.random() > 0.5 ? 'Кря!' : '🪶'
        });

        if (pBar) pBar.style.width = `${(catches / maxCatches) * 100}%`;
        if (pText) pText.textContent = `${catches} / ${maxCatches}`;

        if (catches < maxCatches) {
          jumpDuck();
        } else {
          isWon = true;
          duck.style.transform = 'translate(-50%, -50%) scale(1.3) rotate(360deg)';
          if (pText) pText.textContent = '10 / 10 (Все пойманы!)';
          xpSound();
          setTimeout(() => {
            completeBusinessAttention('factory');
          }, 700);
        }
      });
    }
  }

  function tickBusinesses(deltaSec = 1) {
    if (deltaSec <= 0) return;
    let changed = false;
    let totalPenalties = 0;
    let anyAttentionTriggered = false;

    Object.keys(businessesState).forEach(id => {
      const b = BUSINESSES_DATA[id];
      const state = businessesState[id];
      if (!b || !state) return;

      let remSec = deltaSec;
      let branchPenalties = 0;

      while (remSec > 0) {
        if (state.status === 'working') {
          const needed = (state.remaining !== undefined && state.remaining !== null) ? state.remaining : b.workDuration;
          if (remSec < needed) {
            state.remaining = needed - remSec;
            remSec = 0;
            changed = true;
          } else {
            remSec -= needed;
            state.status = 'attention';
            state.attentionRemaining = b.attentionDuration;
            state.remaining = 0;
            changed = true;
            anyAttentionTriggered = true;
          }
        } else if (state.status === 'attention') {
          const needed = (state.attentionRemaining !== undefined && state.attentionRemaining !== null) ? state.attentionRemaining : b.attentionDuration;
          if (remSec < needed) {
            state.attentionRemaining = needed - remSec;
            remSec = 0;
            changed = true;
          } else {
            remSec -= needed;
            branchPenalties++;
            // Пропуск внимания в течение 1 минуты -> штраф и перезапуск рабочего цикла
            state.status = 'working';
            state.remaining = b.workDuration;
            state.attentionRemaining = b.attentionDuration;
            changed = true;
          }
        } else {
          break;
        }
      }

      if (branchPenalties > 0) {
        const totalBranchPenalty = b.penalty * branchPenalties;
        penalizeDuckles(totalBranchPenalty);
        totalPenalties += totalBranchPenalty;

        particles.push({
          x: window.innerWidth / 2,
          y: 90,
          vx: 0,
          vy: -80,
          size: 20,
          alpha: 1.6,
          text: (branchPenalties === 1)
            ? `⚠️ Штраф за простой (${b.name}): -${b.penalty.toLocaleString('ru-RU')} 🦆! Доход упущен.`
            : `⚠️ Штраф за простой x${branchPenalties} (${b.name}): -${totalBranchPenalty.toLocaleString('ru-RU')} 🦆!`,
          color: '#ef4444'
        });
      }
    });

    if (totalPenalties > 0) {
      rottenEggSound();
    }

    if (anyAttentionTriggered) {
      corkPopSound();
      particles.push({
        x: window.innerWidth / 2,
        y: 80,
        vx: 0,
        vy: -80,
        size: 20,
        alpha: 1.6,
        text: `🚨 Филиал требует внимания в Филиалах!`,
        color: '#facc15'
      });
    }

    if (changed) {
      saveBusinessesState();
      const modal = document.getElementById('branchesModal');
      if (modal && modal.classList.contains('open')) {
        renderBranchesModal();
      }
      updateBranchesButtonUI();
    }
  }
  window.tickBusinesses = tickBusinesses;

  function showEggContextMenu(eggType, x, y) {
    if (!propContextMenu) return;
    if (eggType === 'rotten') return; // Тухлое яйцо выбрасывается перетаскиванием в мусорку
    activeContextEggType = eggType;
    activeContextPropId = null;
    resetAllContextMenuButtons();

    const propCtxSell1Btn = document.getElementById('propCtxSell1Btn');
    const propCtxSellAllBtn = document.getElementById('propCtxSellAllBtn');

    let count = 0;
    let price = 0;
    if (eggType === 'normal') { count = normalEggs; price = 200; }
    else if (eggType === 'golden') { count = goldenEggs; price = 5000; }
    else if (eggType === 'fried') { count = friedEggs; price = 1600; }
    else if (eggType === 'goldenFried') { count = goldenFriedEggs; price = 15000; }
    else if (eggType === 'duckling') { count = (typeof normalDucklings !== 'undefined' ? normalDucklings : 0); price = 10000; }
    else if (eggType === 'goldenDuckling') { count = (typeof goldenDucklings !== 'undefined' ? goldenDucklings : 0); price = 50000; }
    else if (eggType === 'goose') { count = (typeof normalGeese !== 'undefined' ? normalGeese : 0); price = 75000; }
    else if (eggType === 'goldenGoose') { count = (typeof goldenGeese !== 'undefined' ? goldenGeese : 0); price = 250000; }
    else if (eggType === 'roastedGoose') { count = (typeof normalRoastedGeese !== 'undefined' ? normalRoastedGeese : 0); price = 90000; }
    else if (eggType === 'goldenRoastedGoose') { count = (typeof goldenRoastedGeese !== 'undefined' ? goldenRoastedGeese : 0); price = 325000; }

    if (count <= 0) return;

    if (propCtxSell1Btn) {
      propCtxSell1Btn.style.display = 'flex';
      propCtxSell1Btn.innerHTML = `<span class="prop-ctx-icon">💰</span> Продать 1 (+${price.toLocaleString('ru-RU')} 🦆)`;
    }
    if (propCtxSellAllBtn) {
      if (count > 1) {
        propCtxSellAllBtn.style.display = 'flex';
        propCtxSellAllBtn.innerHTML = `<span class="prop-ctx-icon">✨</span> Продать всё (+${(count * price).toLocaleString('ru-RU')} 🦆)`;
      } else {
        propCtxSellAllBtn.style.display = 'none';
      }
    }

    propContextMenu.style.display = 'block';

    let btnCount = 1; // Sell1
    if (count > 1) btnCount++;
    const menuW = 210;
    const menuH = btnCount * 38 + 12;
    const posX = Math.max(10, Math.min(window.innerWidth - menuW - 10, x));
    const posY = Math.max(10, Math.min(window.innerHeight - menuH - 10, y));

    propContextMenu.style.left = `${posX}px`;
    propContextMenu.style.top = `${posY}px`;
  }
  window.showEggContextMenu = showEggContextMenu;

  const minigameModal = document.getElementById('businessMinigameModal');
  const closeMinigameBtn = document.getElementById('closeBusinessMinigameBtn');
  if (minigameModal && closeMinigameBtn) {
    closeMinigameBtn.addEventListener('click', () => closeBusinessMinigame());
    minigameModal.addEventListener('click', (e) => {
      if (e.target === minigameModal) closeBusinessMinigame();
    });
  }
