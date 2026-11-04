/* ---------- Кулинарный финал: Зажарить маму утку ---------- */
  function checkDuckStoveCombine() {
    if (!isStoveCombined || isCookedDuckActive) return;
    const plitaEl = document.getElementById('prop-plita');
    const skovEl = document.getElementById('prop-skovoroda');
    if (!plitaEl || !skovEl) return;
    if (plitaEl.style.display === 'none' || skovEl.style.display === 'none') return;

    const rDuck = duck.getBoundingClientRect();
    const rPlita = plitaEl.getBoundingClientRect();
    const rSkov = skovEl.getBoundingClientRect();

    if (isOverlapping(rDuck, rSkov) || isOverlapping(rDuck, rPlita)) {
      cookMotherDuck();
    }
  }
  window.checkDuckStoveCombine = checkDuckStoveCombine;

  function cookMotherDuck() {
    if (isCookedDuckActive) return;
    isCookedDuckActive = true;

    // Звуки шипения и жарки
    sizzleSound(false);
    setTimeout(() => { try { corkPopSound(); } catch (e) {} }, 180);
    setTimeout(() => { try { critSound(); } catch (e) {} }, 380);

    // Подмена утки на эмодзи жареной курицы 🍗
    const duckImg = document.getElementById('duckImg');
    const duckFallback = document.querySelector('.duck-fallback');
    const cookedDuckView = document.getElementById('cookedDuckView');
    if (duckImg) duckImg.style.display = 'none';
    if (duckFallback) duckFallback.style.display = 'none';
    if (cookedDuckView) cookedDuckView.style.display = 'flex';

    // Эффектные частицы огня, дыма и курочки
    const rDuck = duck.getBoundingClientRect();
    const cx = rDuck.left + rDuck.width / 2;
    const cy = rDuck.top + rDuck.height / 2;
    spawnDuckCookParticles(cx, cy);

    // Открываем модальное окно завершения игры
    setTimeout(() => {
      closeAllModals();
      const modal = document.getElementById('cookedDuckModal');
      if (modal) modal.classList.add('open');
    }, 750);
  }
  window.cookMotherDuck = cookMotherDuck;

  function spawnDuckCookParticles(cx, cy) {
    if (!isWindowFocused()) return;
    const cookItems = ['🔥', '💨', '🍗', '✨', '🍳', '💥'];
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 100 + Math.random() * 240;
      particles.push({
        x: cx + (Math.random() - 0.5) * 50,
        y: cy + (Math.random() - 0.5) * 50,
        vx: Math.cos(angle) * speed,
        vy: -Math.abs(Math.sin(angle) * speed) - 40,
        size: 24 + Math.random() * 18,
        alpha: 1.1 + Math.random() * 0.4,
        text: cookItems[Math.floor(Math.random() * cookItems.length)],
        color: '#ff7700',
        rot: 0,
        rotSpeed: (Math.random() - 0.5) * 12
      });
    }
  }

  function restartFromCookedDuck() {
    const wasMonsterDone = hasFriedDuck;
    hasFriedDuck = true;
    try {
      Storage.set(HAS_FRIED_DUCK_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'monster', '1');
    } catch (e) {}

    // Сброс игрового процесса с сохранением всех открытых ачивок
    resetAchievements(true);

    const modal = document.getElementById('cookedDuckModal');
    if (modal) modal.classList.remove('open');

    // Восстанавливаем внешний вид утки
    isCookedDuckActive = false;
    const duckImg = document.getElementById('duckImg');
    const cookedDuckView = document.getElementById('cookedDuckView');
    if (cookedDuckView) cookedDuckView.style.display = 'none';
    if (duckImg) duckImg.style.display = 'block';

    // Выдаем ачивку "Ты монстр!" (не сбрасывается) со всеми анимациями тоста
    const monsterIdx = ACHIEVEMENTS.findIndex(a => a.id === 'monster');
    if (monsterIdx !== -1) {
      if (!wasMonsterDone) {
        ACHIEVEMENTS[monsterIdx].done = false;
        unlockAchievement(monsterIdx);
      } else {
        updateAchvCounter();
      }
    }
  }
  window.restartFromCookedDuck = restartFromCookedDuck;

  function isCursorNearShop(clientX, clientY, eggEl) {
    const shopBtn = document.getElementById('shopBtn');
    if (!shopBtn || shopBtn.offsetParent === null || window.getComputedStyle(shopBtn).display === 'none') return false;
    let px = clientX;
    let py = clientY;
    if (px === undefined || py === undefined) {
      if (!eggEl) return false;
      const er = eggEl.getBoundingClientRect();
      px = er.left + er.width / 2;
      py = er.top + er.height / 2;
    }
    const shr = shopBtn.getBoundingClientRect();
    const inBox = (px >= shr.left - 8 && px <= shr.right + 8 && py >= shr.top - 10 && py <= shr.bottom + 25);
    const cx = shr.left + shr.width / 2;
    const cy = shr.top + shr.height / 2;
    const dist = Math.hypot(px - cx, py - cy);
    return inBox || dist < 65;
  }
  window.isCursorNearShop = isCursorNearShop;

  
  /* ---------- Механика инкубатора и питомцев ---------- */
  let incubatorSelectedType = 'normal';
  let incubatorSelectedCount = 1;

  function handleIncubatorClick(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    openIncubatorModal();
  }
  window.handleIncubatorClick = handleIncubatorClick;

  function openIncubatorModal(preferredType) {
    if (preferredType) incubatorSelectedType = preferredType;
    else if (goldenEggs > 0 && normalEggs === 0) incubatorSelectedType = 'golden';
    else incubatorSelectedType = 'normal';

    const maxAvail = incubatorSelectedType === 'golden' ? goldenEggs : normalEggs;
    incubatorSelectedCount = Math.max(1, Math.min(maxAvail || 1, 1));

    renderIncubatorModal();
    const modal = document.getElementById('incubatorModal');
    if (modal) modal.classList.add('open');
  }
  window.openIncubatorModal = openIncubatorModal;

  function closeIncubatorModal() {
    const modal = document.getElementById('incubatorModal');
    if (modal) modal.classList.remove('open');
  }
  window.closeIncubatorModal = closeIncubatorModal;

  const closeIncubatorBtn = document.getElementById('closeIncubatorBtn');
  if (closeIncubatorBtn) {
    closeIncubatorBtn.addEventListener('click', closeIncubatorModal);
  }
  const incModalEl = document.getElementById('incubatorModal');
  if (incModalEl) {
    incModalEl.addEventListener('click', (e) => {
      if (e.target === incModalEl) closeIncubatorModal();
    });
  }

  function setIncubatorType(type) {
    incubatorSelectedType = type;
    const maxAvail = type === 'golden' ? goldenEggs : normalEggs;
    incubatorSelectedCount = Math.max(1, Math.min(maxAvail || 1, 1));
    renderIncubatorModal();
  }
  window.setIncubatorType = setIncubatorType;

  function adjustIncubatorQty(delta) {
    const maxAvail = incubatorSelectedType === 'golden' ? goldenEggs : normalEggs;
    incubatorSelectedCount = Math.max(1, Math.min(maxAvail, incubatorSelectedCount + delta));
    renderIncubatorModal();
  }
  window.adjustIncubatorQty = adjustIncubatorQty;

  function setIncubatorMaxQty() {
    const maxAvail = incubatorSelectedType === 'golden' ? goldenEggs : normalEggs;
    incubatorSelectedCount = Math.max(1, maxAvail);
    renderIncubatorModal();
  }
  window.setIncubatorMaxQty = setIncubatorMaxQty;

  function renderIncubatorModal() {
    const body = document.getElementById('incubatorModalBody');
    if (!body) return;

    if (isIncubating) {
      const mins = Math.floor(incubatingRemaining / 60);
      const secs = incubatingRemaining % 60;
      const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      const eggName = incubatingType === 'golden' ? 'золотых яиц' : 'обычных яиц';
      const pct = Math.min(100, Math.max(0, Math.round((1 - incubatingRemaining / 120) * 100)));

      body.innerHTML = `
        <div class="incubator-active-view">
          <div class="incubator-active-icon">🥚</div>
          <div style="font: 800 18px system-ui, sans-serif; color: #fbbf24; margin-bottom: 6px;">Идёт инкубация...</div>
          <div style="font: 600 13.5px system-ui, sans-serif; color: #cbd5e1; margin-bottom: 14px;">
            В инкубаторе: <span style="color: #ffd24d;">${incubatingCount} шт. ${eggName}</span>
          </div>
          <div style="background: rgba(0,0,0,0.4); border-radius: 999px; height: 10px; width: 100%; overflow: hidden; margin-bottom: 12px; border: 1px solid #334155;">
            <div style="background: linear-gradient(90deg, #f59e0b, #fbbf24); height: 100%; width: ${pct}%; transition: width 0.5s ease;"></div>
          </div>
          <div style="font: 700 20px monospace; color: #67e8f9; margin-bottom: 18px;">${isClockOnTable() ? '⏳ ' + timeStr : '⏳ --:-- (нужны часы на столе)'}</div>
          <div style="font: 500 12.5px system-ui, sans-serif; color: #94a3b8;">
            Шанс вылупления каждого яйца: <b>90%</b>.<br>По завершении появится маленький утёнок!
          </div>
        </div>
      `;
      return;
    }

    const availNormal = normalEggs;
    const availGolden = goldenEggs;
    const currentAvail = incubatorSelectedType === 'golden' ? availGolden : availNormal;

    let selectorHtml = '';
    if (currentAvail <= 0) {
      selectorHtml = `
        <div style="text-align: center; padding: 20px 0; color: #94a3b8; font: 600 14px system-ui, sans-serif;">
          У вас нет яиц этого типа.<br>Подождите, пока утка снесёт яйца, или выберите другой тип!
        </div>
      `;
    } else {
      selectorHtml = `
        <div style="text-align: center; font: 600 13px system-ui, sans-serif; color: #94a3b8; margin-top: 8px;">
          Доступно: <b style="color: #ffd24d;">${currentAvail} шт.</b>
        </div>
        <div class="incubator-qty-row">
          <button class="incubator-qty-btn" onclick="adjustIncubatorQty(-1)">−</button>
          <div class="incubator-qty-val">${incubatorSelectedCount}</div>
          <button class="incubator-qty-btn" onclick="adjustIncubatorQty(1)">+</button>
          <button class="sell-btn" style="padding: 6px 12px; font-size: 12px;" onclick="setIncubatorMaxQty()">Всё (${currentAvail})</button>
        </div>
        <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid #f59e0b; padding: 8px 12px; border-radius: 6px; font: 600 12.5px/1.4 system-ui, sans-serif; color: #fde68a; margin-bottom: 18px;">
          ⏱️ Время инкубации: <b>2 минуты</b><br>
          🐣 Шанс успешного вылупления: <b>90%</b> для каждого яйца
        </div>
        <button class="incubator-start-btn" onclick="startIncubation('${incubatorSelectedType}', ${incubatorSelectedCount})">
          🚀 Запустить инкубацию (${incubatorSelectedCount} шт.)
        </button>
      `;
    }

    body.innerHTML = `
      <div style="font: 700 14px system-ui, sans-serif; color: #cbd5e1; margin-bottom: 12px;">Выберите яйца для инкубации:</div>
      <div class="incubator-tabs">
        <button class="incubator-tab-btn ${incubatorSelectedType === 'normal' ? 'active' : ''}" onclick="setIncubatorType('normal')">
          <span>🥚</span> Обычные (${availNormal})
        </button>
        <button class="incubator-tab-btn ${incubatorSelectedType === 'golden' ? 'active' : ''}" onclick="setIncubatorType('golden')">
          <span>🥚</span> Золотые (${availGolden})
        </button>
      </div>
      ${selectorHtml}
    `;
  }
  window.renderIncubatorModal = renderIncubatorModal;

  function startIncubation(type, count) {
    const avail = (type === 'golden') ? goldenEggs : normalEggs;
    if (count <= 0 || avail < count || isIncubating) return;

    removeEggsFromBatches(type, count);

    isIncubating = true;
    incubatingType = type;
    incubatingCount = count;
    incubatingRemaining = 120; // 2 минуты (120 сек)
    try {
      Storage.set(IS_INCUBATING_KEY, '1');
      Storage.set(INCUBATING_TYPE_KEY, type);
      Storage.set(INCUBATING_COUNT_KEY, String(count));
      Storage.set(INCUBATING_REMAINING_KEY, String(incubatingRemaining));
    } catch (e) {}

    corkPopSound();
    closeIncubatorModal();
    updateIncubatorUI();

    const incEl = document.getElementById('prop-incubator');
    if (incEl) {
      const r = incEl.getBoundingClientRect();
      particles.push({
        x: r.left + r.width / 2,
        y: r.top - 15,
        vx: 0,
        vy: -90,
        size: 18,
        alpha: 1.3,
        text: `🥚 Инкубация запущена (${count} шт.)!`,
        color: '#fbbf24'
      });
    }
  }
  window.startIncubation = startIncubation;

  function updateIncubatorUI() {
    const incEl = document.getElementById('prop-incubator');
    const badge = document.getElementById('incubatorProgressBadge');
    const badgeTime = document.getElementById('incubatorBadgeTime');

    if (incEl) {
      incEl.classList.toggle('is-incubating', isIncubating);
    }
    if (badge && badgeTime) {
      if (isIncubating && incEl && incEl.style.display !== 'none' && isClockOnTable()) {
        const mins = Math.floor(incubatingRemaining / 60);
        const secs = incubatingRemaining % 60;
        badgeTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
  }
  window.updateIncubatorUI = updateIncubatorUI;

  function finishIncubation() {
    isIncubating = false;
    try {
      Storage.remove(IS_INCUBATING_KEY);
      Storage.remove(INCUBATING_REMAINING_KEY);
      Storage.remove(INCUBATING_COUNT_KEY);
      Storage.remove(INCUBATING_TYPE_KEY);
    } catch (e) {}

    let hatched = 0;
    for (let i = 0; i < incubatingCount; i++) {
      if (Math.random() < 0.90) hatched++;
    }

    const incEl = document.getElementById('prop-incubator');
    const posX = incEl ? incEl.getBoundingClientRect().left + 46 : (window.innerWidth / 2);
    const posY = incEl ? incEl.getBoundingClientRect().top : (window.innerHeight / 2);

    if (hatched > 0) {
      eggHatchSound();
      hasHatchedDuckling = true;
      try {
        Storage.set(HAS_HATCHED_DUCKLING_KEY, '1');
        Storage.set(STORAGE_PREFIX + 'new-generation', '1');
      } catch (e) {}
      tryUnlock();

      const isGold = (incubatingType === 'golden');
      if (isGold) {
        goldenDucklings += hatched;
        hasHatchedGoldenDuckling = true;
        try {
          Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
          Storage.set(HAS_HATCHED_GOLDEN_DUCKLING_KEY, '1');
        } catch (e) {}
      } else {
        normalDucklings += hatched;
        try { Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings)); } catch (e) {}
      }

      particles.push({
        x: posX,
        y: posY - 20,
        vx: 0,
        vy: -110,
        size: 22,
        alpha: 1.5,
        text: isGold ? `✨🐣 Вылупилось золотых утят: ${hatched}!` : `🐣 Вылупилось утят: ${hatched}!`,
        color: isGold ? '#facc15' : '#4ade80'
      });

      // Запуск таймера роста если утёнок впервые появился
      if (isGold) {
        if (!goldenDucklingGrowRemaining || goldenDucklingGrowRemaining <= 0) goldenDucklingGrowRemaining = 600;
        try { Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, String(goldenDucklingGrowRemaining)); } catch (e) {}
      } else {
        if (!ducklingGrowRemaining || ducklingGrowRemaining <= 0) ducklingGrowRemaining = 600;
        try { Storage.set(DUCKLING_GROW_REMAINING_KEY, String(ducklingGrowRemaining)); } catch (e) {}
      }
      updateDeskCreatureUI();
    } else {
      corkPopSound();
      particles.push({
        x: posX,
        y: posY - 15,
        vx: 0,
        vy: -80,
        size: 16,
        alpha: 1.3,
        text: '💨 Яйца не вылупились...',
        color: '#94a3b8'
      });
    }

    updateIncubatorUI();
    updateShopSellTab();
  }
  window.finishIncubation = finishIncubation;

  function swapCreatureToDesk(type) {
    if (creatureOnDesk) {
      const cur = creatureOnDesk.type;
      if (cur === 'duckling') normalDucklings++;
      else if (cur === 'goldenDuckling') goldenDucklings++;
      else if (cur === 'goose') normalGeese++;
      else if (cur === 'goldenGoose') goldenGeese++;
      else if (cur === 'roastedGoose') normalRoastedGeese++;
      else if (cur === 'goldenRoastedGoose') goldenRoastedGeese++;
      try {
        Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
        Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
        Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
        Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
        Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
        Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
      } catch (e) {}
      creatureOnDesk = null;
    }
    spawnCreatureOnDesk(type);
    corkPopSound();
    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.swapCreatureToDesk = swapCreatureToDesk;

  function returnDeskCreatureToInventory() {
    if (!creatureOnDesk) return;
    const cur = creatureOnDesk.type;
    if (cur === 'duckling') normalDucklings++;
    else if (cur === 'goldenDuckling') goldenDucklings++;
    else if (cur === 'goose') normalGeese++;
    else if (cur === 'goldenGoose') goldenGeese++;
    else if (cur === 'roastedGoose') normalRoastedGeese++;
    else if (cur === 'goldenRoastedGoose') goldenRoastedGeese++;
    try {
      Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
      Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
      Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
      Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
      Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
      Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
      Storage.remove(CREATURE_ON_DESK_KEY);
    } catch (e) {}
    creatureOnDesk = null;
    updateDeskCreatureUI();
    updateShopSellTab();
    hidePropContextMenu();
  }
  window.returnDeskCreatureToInventory = returnDeskCreatureToInventory;

  /* ---------- Питомцы на столе (по одному каждого типа: Утёнок, Золотой Утёнок, Большая Утка, Золотая Большая Утка) ---------- */
  function spawnCreatureOnDesk(type) {
    if (type === 'duckling' && normalDucklings <= 0) normalDucklings = 1;
    else if (type === 'goldenDuckling' && goldenDucklings <= 0) goldenDucklings = 1;
    else if (type === 'goose' && normalGeese <= 0) normalGeese = 1;
    else if (type === 'goldenGoose' && goldenGeese <= 0) goldenGeese = 1;
    else if (type === 'roastedGoose' && normalRoastedGeese <= 0) normalRoastedGeese = 1;
    else if (type === 'goldenRoastedGoose' && goldenRoastedGeese <= 0) goldenRoastedGeese = 1;

    try {
      Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
      Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
      Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
      Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
      Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
      Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
    } catch (e) {}

    if (type === 'duckling' && (!ducklingGrowRemaining || ducklingGrowRemaining <= 0)) {
      ducklingGrowRemaining = 600;
      try { Storage.set(DUCKLING_GROW_REMAINING_KEY, String(ducklingGrowRemaining)); } catch (e) {}
    } else if (type === 'goldenDuckling' && (!goldenDucklingGrowRemaining || goldenDucklingGrowRemaining <= 0)) {
      goldenDucklingGrowRemaining = 600;
      try { Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, String(goldenDucklingGrowRemaining)); } catch (e) {}
    }

    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.spawnCreatureOnDesk = spawnCreatureOnDesk;

  function swapCreatureToDesk(type) {
    spawnCreatureOnDesk(type);
    corkPopSound();
    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.swapCreatureToDesk = swapCreatureToDesk;

  function returnDeskCreatureToInventory() {
    // В новой системе все питомцы принадлежат инвентарю и представлены по 1 на столе
    updateDeskCreatureUI();
    updateShopSellTab();
    hidePropContextMenu();
  }
  window.returnDeskCreatureToInventory = returnDeskCreatureToInventory;

  const DESK_PET_CONFIGS = [
    { type: 'duckling', getCount: () => normalDucklings, hasTimer: true },
    { type: 'goldenDuckling', getCount: () => goldenDucklings, hasTimer: true },
    { type: 'goose', getCount: () => normalGeese, hasTimer: false },
    { type: 'goldenGoose', getCount: () => goldenGeese, hasTimer: false },
    { type: 'roastedGoose', getCount: () => normalRoastedGeese, hasTimer: false },
    { type: 'goldenRoastedGoose', getCount: () => goldenRoastedGeese, hasTimer: false }
  ];

  function updateDeskCreatureUI() {
    const hasClock = (typeof isClockOnTable === 'function') ? isClockOnTable() : false;
    let anyActive = null;

    DESK_PET_CONFIGS.forEach((cfg, idx) => {
      const el = document.getElementById(`deskCreature-${cfg.type}`);
      if (!el) return;
      const count = cfg.getCount();
      if (count <= 0) {
        el.style.display = 'none';
        el.style.left = '';
        el.style.top = '';
        delete el.dataset.placed;
        if (deskCreaturesPos && deskCreaturesPos[cfg.type]) {
          delete deskCreaturesPos[cfg.type];
          try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
        }
        return;
      }

      if (!anyActive) anyActive = { type: cfg.type };

      // Расстановка позиций на столе
      if (!el.style.left || el.style.left === '') {
        if (deskCreaturesPos && deskCreaturesPos[cfg.type] && deskCreaturesPos[cfg.type].left) {
          el.style.left = deskCreaturesPos[cfg.type].left;
          el.style.top = deskCreaturesPos[cfg.type].top;
        } else {
          const isRoasted = (cfg.type === 'roastedGoose' || cfg.type === 'goldenRoastedGoose');
          const plitaEl = document.getElementById('prop-plita');
          if (isRoasted && plitaEl && plitaEl.style.display !== 'none') {
            const pRect = plitaEl.getBoundingClientRect();
            el.style.left = `${Math.min(window.innerWidth - 75, Math.max(10, pRect.right + 12))}px`;
            el.style.top = `${Math.min(window.innerHeight - 75, Math.max(10, cfg.type === 'goldenRoastedGoose' ? pRect.top + 55 : pRect.top + 8))}px`;
          } else {
            const incEl = document.getElementById('prop-incubator');
            const baseR = (incEl && incEl.style.display !== 'none') ? incEl.getBoundingClientRect() : duck.getBoundingClientRect();
            const offsetX = (idx % 2) * 65 + 25;
            const offsetY = Math.floor(idx / 2) * 65 + 10;
            el.style.left = `${Math.min(window.innerWidth - 80, Math.max(20, (baseR.right || 300) + offsetX))}px`;
            el.style.top = `${Math.min(window.innerHeight - 80, Math.max(70, (baseR.top || 150) + offsetY))}px`;
          }
          if (!deskCreaturesPos) deskCreaturesPos = {};
          deskCreaturesPos[cfg.type] = { left: el.style.left, top: el.style.top };
          try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
        }
      }

      el.style.display = 'block';

      // Таймер роста для утят
      if (cfg.hasTimer) {
        const badge = el.querySelector('.creature-age-badge');
        const textEl = el.querySelector('.creature-age-text');
        if (badge && textEl) {
          if (hasClock) {
            const rem = (cfg.type === 'goldenDuckling') ? goldenDucklingGrowRemaining : ducklingGrowRemaining;
            const mins = Math.floor(rem / 60);
            const secs = Math.floor(rem % 60);
            textEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
            badge.style.display = 'inline-block';
          } else {
            badge.style.display = 'none';
          }
        }
      }
    });

    creatureOnDesk = anyActive;
  }
  window.updateDeskCreatureUI = updateDeskCreatureUI;

  function tickDucklingsGrowth(deltaSec) {
    let changed = false;

    // 1. Обычный утёнок
    if (normalDucklings > 0) {
      ducklingGrowRemaining = Math.max(0, ducklingGrowRemaining - deltaSec);
      try { Storage.set(DUCKLING_GROW_REMAINING_KEY, String(ducklingGrowRemaining)); } catch (e) {}
      if (ducklingGrowRemaining <= 0) {
        const ducklingEl = document.getElementById('deskCreature-duckling');
        const gooseEl = document.getElementById('deskCreature-goose');
        const ducklingLeft = (ducklingEl && ducklingEl.style.left) ? ducklingEl.style.left : (deskCreaturesPos && deskCreaturesPos['duckling'] ? deskCreaturesPos['duckling'].left : null);
        const ducklingTop = (ducklingEl && ducklingEl.style.top) ? ducklingEl.style.top : (deskCreaturesPos && deskCreaturesPos['duckling'] ? deskCreaturesPos['duckling'].top : null);
        const hadNoGoose = (normalGeese <= 0);

        normalDucklings--;
        normalGeese++;
        ducklingGrowRemaining = (normalDucklings > 0) ? 600 : 0;
        try {
          Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
          Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
          Storage.set(DUCKLING_GROW_REMAINING_KEY, String(ducklingGrowRemaining));
        } catch (e) {}

        // Если на столе не было Большой Утки, спавним её на месте выросшего утёнка
        if (hadNoGoose && ducklingLeft) {
          if (gooseEl) {
            gooseEl.style.left = ducklingLeft;
            gooseEl.style.top = ducklingTop;
            gooseEl.dataset.placed = '1';
          }
          if (!deskCreaturesPos) deskCreaturesPos = {};
          deskCreaturesPos['goose'] = { left: ducklingLeft, top: ducklingTop };
          if (normalDucklings > 0 && ducklingEl) {
            ducklingEl.style.left = `${Math.max(20, parseFloat(ducklingLeft) - 50)}px`;
            deskCreaturesPos['duckling'] = { left: ducklingEl.style.left, top: ducklingEl.style.top };
          }
          try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
        }

        gooseHonkSound();
        const el = (gooseEl && gooseEl.style.display !== 'none') ? gooseEl : (ducklingEl || duck);
        const r = el.getBoundingClientRect();
        particles.push({
          x: r.left + 35,
          y: r.top - 20,
          vx: 0,
          vy: -110,
          size: 24,
          alpha: 1.5,
          text: 'Утёнок вырос в Большую Утку! 🦆',
          color: '#38bdf8'
        });
        changed = true;
      }
    }

    // 2. Золотой утёнок
    if (goldenDucklings > 0) {
      goldenDucklingGrowRemaining = Math.max(0, goldenDucklingGrowRemaining - deltaSec);
      try { Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, String(goldenDucklingGrowRemaining)); } catch (e) {}
      if (goldenDucklingGrowRemaining <= 0) {
        const gDucklingEl = document.getElementById('deskCreature-goldenDuckling');
        const gGooseEl = document.getElementById('deskCreature-goldenGoose');
        const gDucklingLeft = (gDucklingEl && gDucklingEl.style.left) ? gDucklingEl.style.left : (deskCreaturesPos && deskCreaturesPos['goldenDuckling'] ? deskCreaturesPos['goldenDuckling'].left : null);
        const gDucklingTop = (gDucklingEl && gDucklingEl.style.top) ? gDucklingEl.style.top : (deskCreaturesPos && deskCreaturesPos['goldenDuckling'] ? deskCreaturesPos['goldenDuckling'].top : null);
        const hadNoGoldenGoose = (goldenGeese <= 0);

        goldenDucklings--;
        goldenGeese++;
        goldenDucklingGrowRemaining = (goldenDucklings > 0) ? 600 : 0;
        try {
          Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
          Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
          Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, String(goldenDucklingGrowRemaining));
        } catch (e) {}

        // Если на столе не было Золотой Большой Утки, спавним её на месте выросшего золотого утёнка
        if (hadNoGoldenGoose && gDucklingLeft) {
          if (gGooseEl) {
            gGooseEl.style.left = gDucklingLeft;
            gGooseEl.style.top = gDucklingTop;
            gGooseEl.dataset.placed = '1';
          }
          if (!deskCreaturesPos) deskCreaturesPos = {};
          deskCreaturesPos['goldenGoose'] = { left: gDucklingLeft, top: gDucklingTop };
          if (goldenDucklings > 0 && gDucklingEl) {
            gDucklingEl.style.left = `${Math.max(20, parseFloat(gDucklingLeft) - 50)}px`;
            deskCreaturesPos['goldenDuckling'] = { left: gDucklingEl.style.left, top: gDucklingEl.style.top };
          }
          try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
        }

        gooseHonkSound();
        const el = (gGooseEl && gGooseEl.style.display !== 'none') ? gGooseEl : (gDucklingEl || duck);
        const r = el.getBoundingClientRect();
        particles.push({
          x: r.left + 35,
          y: r.top - 20,
          vx: 0,
          vy: -110,
          size: 24,
          alpha: 1.5,
          text: 'Золотой утёнок вырос в Золотую Большую Утку! 🦆',
          color: '#facc15'
        });
        changed = true;
      }
    }

    updateDeskCreatureUI();
    if (changed) {
      updateShopSellTab();
      tryUnlock();
    }
  }
  window.tickDucklingsGrowth = tickDucklingsGrowth;

  function growDucklingToGoose() {
    tickDucklingsGrowth(600);
  }
  window.growDucklingToGoose = growDucklingToGoose;

  function burnDeskCreature(type = 'duckling') {
    burnSound();
    const isGold = (type === 'goldenDuckling');
    if (isGold) {
      goldenDucklings = Math.max(0, goldenDucklings - 1);
      try { Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings)); } catch (e) {}
    } else {
      normalDucklings = Math.max(0, normalDucklings - 1);
      try { Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings)); } catch (e) {}
    }

    hasFriedDuckling = true;
    try {
      Storage.set(HAS_FRIED_DUCKLING_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'crispy-duckling', '1');
    } catch (e) {}
    tryUnlock();

    const plitaEl = document.getElementById('prop-plita') || duck;
    const r = plitaEl.getBoundingClientRect();
    particles.push({
      x: r.left + 25,
      y: r.top - 20,
      vx: 0,
      vy: -90,
      size: 20,
      alpha: 1.5,
      text: '🔥💨 Утёнок сгорел дотла...',
      color: '#ef4444'
    });

    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.burnDeskCreature = burnDeskCreature;

  function roastDeskCreature(type = 'goose') {
    sizzleSound(true);
    const isGold = (type === 'goldenGoose');
    if (isGold) {
      goldenGeese = Math.max(0, goldenGeese - 1);
      goldenRoastedGeese++;
      try {
        Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
        Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
      } catch (e) {}
    } else {
      normalGeese = Math.max(0, normalGeese - 1);
      normalRoastedGeese++;
      try {
        Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
        Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
      } catch (e) {}
    }

    hasCookedGoose = true;
    try {
      Storage.set(HAS_COOKED_GOOSE_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'roasted-goose', '1');
    } catch (e) {}
    tryUnlock();

    const plitaEl = document.getElementById('prop-plita') || duck;
    const r = plitaEl.getBoundingClientRect();
    const centerX = r.left + r.width / 2;
    const centerY = r.top + r.height / 2 - 20;

    // Спавним эмодзи жареной утки возле плиты со сковородой (как и при жарке яиц)
    const targetType = isGold ? 'goldenRoastedGoose' : 'roastedGoose';
    const targetEl = document.getElementById(`deskCreature-${targetType}`);
    if (targetEl && plitaEl) {
      const isAlreadyOnDesk = targetEl.dataset.placed && targetEl.style.display !== 'none';
      if (!isAlreadyOnDesk) {
        const pRect = plitaEl.getBoundingClientRect();
        const posX = Math.min(window.innerWidth - 75, Math.max(10, pRect.right + 12));
        const posY = Math.min(window.innerHeight - 75, Math.max(10, isGold ? pRect.top + 55 : pRect.top + 8));
        targetEl.style.left = `${posX}px`;
        targetEl.style.top = `${posY}px`;
        targetEl.dataset.placed = '1';
        if (!deskCreaturesPos) deskCreaturesPos = {};
        deskCreaturesPos[targetType] = { left: targetEl.style.left, top: targetEl.style.top };
        try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
      }
      targetEl.style.display = 'block';
    }

    // Частицы шипения и жарки возле сковороды
    for (let i = 0; i < 14; i++) {
      const angle = (Math.PI * 0.15) + Math.random() * (Math.PI * 0.7);
      const spd = 30 + Math.random() * 110;
      particles.push({
        x: centerX + (Math.random() * 40 - 20),
        y: centerY + (Math.random() * 20 - 10),
        vx: Math.cos(angle) * spd * (Math.random() < 0.5 ? 1 : -1),
        vy: -Math.sin(angle) * spd,
        size: 16 + Math.random() * 10,
        alpha: 1.0,
        text: (Math.random() < 0.6) ? '🔥' : '💨',
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 4
      });
    }

    particles.push({
      x: r.left + 35,
      y: r.top - 20,
      vx: 0,
      vy: -110,
      size: 22,
      alpha: 1.5,
      text: isGold ? 'Золотая Утка аппетитно зажарена! 🍗' : '🍗🔥 Ароматная жареная утка готова!',
      color: isGold ? '#facc15' : '#ea580c'
    });

    updateDeskCreatureUI();
    if (typeof updateEggsDisplay === 'function') {
      updateEggsDisplay(true, isGold ? 'goldenRoastedDuck' : 'roastedDuck');
    }
    updateShopSellTab();
  }
  window.roastDeskCreature = roastDeskCreature;

  function getCreaturePrice(type) {
    if (type === 'duckling') return 10000;
    if (type === 'goldenDuckling') return 50000;
    if (type === 'goose') return 75000;
    if (type === 'goldenGoose') return 250000;
    if (type === 'roastedGoose') return 90000;
    if (type === 'goldenRoastedGoose') return 325000;
    return 0;
  }

  function getCreatureName(type) {
    if (type === 'duckling') return 'Утёнок';
    if (type === 'goldenDuckling') return 'Золотой утёнок';
    if (type === 'goose') return 'Большая Утка';
    if (type === 'goldenGoose') return 'Золотая Большая Утка';
    if (type === 'roastedGoose') return 'Жареная утка';
    if (type === 'goldenRoastedGoose') return 'Золотая жареная утка';
    return 'Питомец';
  }

  function sellDeskCreature(type = 'duckling') {
    sellCreature(type, 1);
  }
  window.sellDeskCreature = sellDeskCreature;

  function sellCreature(type, countOrAll) {
    let avail = 0;
    if (type === 'duckling') avail = normalDucklings;
    else if (type === 'goldenDuckling') avail = goldenDucklings;
    else if (type === 'goose') avail = normalGeese;
    else if (type === 'goldenGoose') avail = goldenGeese;
    else if (type === 'roastedGoose') avail = normalRoastedGeese;
    else if (type === 'goldenRoastedGoose') avail = goldenRoastedGeese;

    if (avail <= 0) return;

    let sellCount = (countOrAll === 'all') ? avail : Math.min(avail, 1);
    const price = getCreaturePrice(type);
    const totalEarned = sellCount * price;
    const name = getCreatureName(type);

    if (type === 'duckling') normalDucklings -= sellCount;
    else if (type === 'goldenDuckling') goldenDucklings -= sellCount;
    else if (type === 'goose') normalGeese -= sellCount;
    else if (type === 'goldenGoose') goldenGeese -= sellCount;
    else if (type === 'roastedGoose') normalRoastedGeese -= sellCount;
    else if (type === 'goldenRoastedGoose') goldenRoastedGeese -= sellCount;

    if (type === 'duckling' && normalDucklings <= 0) {
      ducklingGrowRemaining = 0;
      try { Storage.set(DUCKLING_GROW_REMAINING_KEY, '0'); } catch (e) {}
    }
    if (type === 'goldenDuckling' && goldenDucklings <= 0) {
      goldenDucklingGrowRemaining = 0;
      try { Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, '0'); } catch (e) {}
    }

    try {
      Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
      Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
      Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
      Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
      Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
      Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
    } catch (e) {}

    earnDuckles(totalEarned, true, true);
    xpSound();

    const shopBtn = document.getElementById('shopBtn');
    const shr = shopBtn ? shopBtn.getBoundingClientRect() : { left: window.innerWidth / 2, top: 40, width: 0 };
    particles.push({
      x: shr.left + shr.width / 2,
      y: shr.top - 15,
      vx: 0,
      vy: -110,
      size: 20,
      alpha: 1.4,
      text: `💰 Продано: ${sellCount} шт. (${name}) +${totalEarned.toLocaleString('ru-RU')} 🦆`,
      color: '#4ade80'
    });

    updateDeskCreatureUI();
    if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
    updateShopSellTab();
  }
  window.sellCreature = sellCreature;

  function initDraggableCreature(el) {
    if (!el) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastClientX = 0;
    let currentTilt = 0;

    const getCreatureType = () => el.getAttribute('data-creature-type') || 'duckling';

    let startLeft = '';
    let startTop = '';

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      hidePropContextMenu();
      isDragging = true;
      el.classList.add('is-dragging');
      el.classList.remove('is-walking');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      const rect = el.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      startLeft = el.style.left || `${rect.left}px`;
      startTop = el.style.top || `${rect.top}px`;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      currentTilt = 0;
      el.classList.remove('is-wobbling');
      e.stopPropagation();
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const x = Math.max(10, Math.min(window.innerWidth - el.offsetWidth - 10, e.clientX - startX));
      const y = Math.max(60, Math.min(window.innerHeight - el.offsetHeight - 20, e.clientY - startY));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      const dx = e.clientX - lastClientX;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      currentTilt = Math.max(-26, Math.min(26, dx * 2.4));
      el.style.transform = `scale(1.12) rotate(${currentTilt}deg)`;

      // Проверка наведения на кнопку Магазин
      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) {
        const isNear = isCursorNearShop(e.clientX, e.clientY, el);
        shopBtn.classList.toggle('drag-target-hover', isNear);
      }

      // Проверка наведения на мусорное ведро
      if (typeof isCursorNearTrashcan === 'function') {
        const isNearTrash = isCursorNearTrashcan(e.clientX, e.clientY, el);
        const trashEl = document.getElementById('prop-trashcan');
        if (trashEl) trashEl.classList.toggle('drag-target-hover', isNearTrash);
      }
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}
      el.classList.remove('is-dragging');
      el.style.transform = '';
      el.classList.add('is-wobbling');
      setTimeout(() => el.classList.remove('is-wobbling'), 650);

      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) shopBtn.classList.remove('drag-target-hover');
      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) trashEl.classList.remove('drag-target-hover');

      const cx = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : lastClientX;
      const cy = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : lastClientY;
      const t = getCreatureType();

      // 0. Проверка сброса питомца в мусорное ведро
      if (typeof isCursorNearTrashcan === 'function' && isCursorNearTrashcan(cx, cy, el)) {
        if (typeof getItemDiscardInfo === 'function' && typeof requestDiscardConfirmation === 'function') {
          const info = getItemDiscardInfo('creature', t);
          requestDiscardConfirmation(
            info.name,
            info.emoji,
            () => {
              if (typeof performItemDiscard === 'function') performItemDiscard('creature', t, cx, cy);
            },
            () => {
              if (typeof returnItemToOrigin === 'function') returnItemToOrigin(el, startLeft, startTop);
            }
          );
        }
        return;
      }

      // 0.5. Проверка переноса питомца на утку (питомец на утке не исчезает — возвращается на место)
      if (typeof isItemOverDuck === 'function' && isItemOverDuck(cx, cy, el)) {
        corkPopSound();
        if (typeof returnItemToOrigin === 'function') returnItemToOrigin(el, startLeft, startTop);
        return;
      }

      // 1. Проверка продажи на кнопку Магазин (всегда продаются ВСЕ питомцы этого типа партиями)
      if (cx !== undefined && cy !== undefined && isCursorNearShop(cx, cy, el)) {
        sellCreature(t, 'all');
        return;
      }

      // 2. Проверка зажаривания на плите со сковородой
      if (isStoveCombined && cx !== undefined && cy !== undefined) {
        const plitaEl = document.getElementById('prop-plita');
        const skovEl = document.getElementById('prop-skovoroda');
        const stoveEl = (plitaEl && plitaEl.style.display !== 'none') ? plitaEl : skovEl;
        if (stoveEl && stoveEl.style.display !== 'none') {
          const stRect = stoveEl.getBoundingClientRect();
          const isOverStove = (cx >= stRect.left - 25 && cx <= stRect.right + 25 &&
                               cy >= stRect.top - 25 && cy <= stRect.bottom + 25);
          if (isOverStove) {
            if (t === 'duckling' || t === 'goldenDuckling') {
              burnDeskCreature(t);
              return;
            } else if (t === 'goose' || t === 'goldenGoose') {
              roastDeskCreature(t);
              return;
            }
          }
        }
      }

      if (!deskCreaturesPos) deskCreaturesPos = {};
      deskCreaturesPos[t] = { left: el.style.left, top: el.style.top };
      try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (err) {}
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    // ПКМ контекстное меню для питомца (Продать 1 / Продать всё партиями)
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const t = getCreatureType();

      if (typeof showEggContextMenu === 'function') {
        showEggContextMenu(t, e.clientX, e.clientY);
        return;
      }

      activeContextPropId = null;
      activeContextEggType = null;
      resetAllContextMenuButtons();

      const price = getCreaturePrice(t);
      const name = getCreatureName(t);
      const propCtxCreatureSellBtn = document.getElementById('propCtxCreatureSellBtn');

      if (propCtxCreatureSellBtn) {
        propCtxCreatureSellBtn.style.display = 'flex';
        propCtxCreatureSellBtn.innerHTML = `<span class="prop-ctx-icon">💰</span> Продать ${name} (+${price.toLocaleString('ru-RU')} 🦆)`;
        propCtxCreatureSellBtn.onclick = () => {
          sellCreature(t, 1);
          hidePropContextMenu();
        };
      }

      const propContextMenu = document.getElementById('propContextMenu');
      if (propContextMenu) {
        propContextMenu.style.display = 'block';
        propContextMenu.style.left = `${Math.min(window.innerWidth - 220, e.clientX)}px`;
        propContextMenu.style.top = `${Math.min(window.innerHeight - 80, e.clientY)}px`;
      }
    });
  }
  window.initDraggableCreature = initDraggableCreature;

  let deskCreatureWanderInterval = null;
  function startDeskCreatureWander() {
    if (deskCreatureWanderInterval) clearInterval(deskCreatureWanderInterval);
    deskCreatureWanderInterval = setInterval(() => {
      const visibleCreatures = Array.from(document.querySelectorAll('.desk-creature')).filter(el => {
        return el.style.display !== 'none' && !el.classList.contains('is-dragging');
      });
      if (visibleCreatures.length === 0) return;

      const el = visibleCreatures[Math.floor(Math.random() * visibleCreatures.length)];
      const type = el.getAttribute('data-creature-type');
      if (type === 'roastedGoose' || type === 'goldenRoastedGoose') return;

      if (Math.random() < 0.6) {
        const curX = parseFloat(el.style.left) || (window.innerWidth / 2);
        const curY = parseFloat(el.style.top) || (window.innerHeight / 2);
        const stepX = (Math.random() - 0.5) * 44;
        const stepY = (Math.random() - 0.5) * 30;

        const newX = Math.max(20, Math.min(window.innerWidth - 80, curX + stepX));
        const newY = Math.max(70, Math.min(window.innerHeight - 80, curY + stepY));

        el.classList.add('is-walking');
        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;

        if (deskCreaturesPos && type) {
          deskCreaturesPos[type] = { left: el.style.left, top: el.style.top };
          try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
        }

        setTimeout(() => {
          el.classList.remove('is-walking');
        }, 600);
      }
    }, 3200);
  }
  window.startDeskCreatureWander = startDeskCreatureWander;


  function toggleCheatPanel(force) {
    const panel = document.getElementById('cheatPanel');
    if (!panel) return;
    const isVis = (typeof force === 'boolean') ? force : !panel.classList.contains('visible');
    panel.classList.toggle('visible', isVis);
    try {
      if (isVis) Storage.set(CHEAT_PANEL_KEY, '1');
      else Storage.remove(CHEAT_PANEL_KEY);
    } catch (e) {}
    if (isVis) {
      corkPopSound();
      particles.push({
        x: 140,
        y: window.innerHeight - 80,
        vx: 0,
        vy: -90,
        size: 19,
        alpha: 1.5,
        text: '👑 Чит-панель открыта!',
        color: '#38bdf8'
      });
    }
  }
  window.toggleCheatPanel = toggleCheatPanel;

  function cheatFastIncubate() {
    if (isIncubating) {
      incubatingRemaining = 1;
      updateIncubatorUI();
    }
    if (normalDucklings > 0) {
      ducklingGrowRemaining = 1;
      try { Storage.set(DUCKLING_GROW_REMAINING_KEY, '1'); } catch (e) {}
    }
    if (goldenDucklings > 0) {
      goldenDucklingGrowRemaining = 1;
      try { Storage.set(GOLDEN_DUCKLING_GROW_REMAINING_KEY, '1'); } catch (e) {}
    }
    if (creatureOnDesk && (creatureOnDesk.type === 'duckling' || creatureOnDesk.type === 'goldenDuckling')) {
      ducklingGrowRemaining = 1;
      goldenDucklingGrowRemaining = 1;
    }
    updateDeskCreatureUI();
  }
  window.cheatFastIncubate = cheatFastIncubate;

  function initDraggableEgg(el, explicitType) {
    if (!el) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastClientX = 0;
    let currentTilt = 0;

    let lastMoveTime = 0;
    let lastMoveX = 0;
    let lastMoveY = 0;
    let releaseVelocity = 0;

    const getEggType = () => {
      if (explicitType) return explicitType;
      if (el.id === 'goldenEgg') return 'golden';
      if (el.id === 'friedEgg') return 'fried';
      if (el.id === 'goldenFriedEgg') return 'goldenFried';
      return 'normal';
    };

    const getEggCount = () => {
      const t = getEggType();
      if (t === 'golden') return goldenEggs;
      if (t === 'fried') return friedEggs;
      if (t === 'goldenFried') return goldenFriedEggs;
      return normalEggs;
    };

    const getEggPrice = () => {
      const t = getEggType();
      if (t === 'golden') return 5000;
      if (t === 'fried') return 1600;
      if (t === 'goldenFried') return 15000;
      return 200;
    };

    let startLeft = '';
    let startTop = '';

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      hidePropContextMenu();
      isDragging = true;
      el.classList.add('is-dragging');
      el.classList.remove('is-wobbling');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      const rect = el.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      startLeft = el.style.left || `${rect.left}px`;
      startTop = el.style.top || `${rect.top}px`;
      lastClientX = e.clientX;
      currentTilt = 0;
      el.classList.remove('is-wobbling');

      lastMoveTime = performance.now();
      lastMoveX = e.clientX;
      lastMoveY = e.clientY;
      releaseVelocity = 0;
      e.stopPropagation();
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const x = e.clientX - startX;
      const y = e.clientY - startY;
      el.style.left = `${Math.max(0, Math.min(window.innerWidth - el.offsetWidth, x))}px`;
      el.style.top = `${Math.max(0, Math.min(window.innerHeight - el.offsetHeight, y))}px`;

      // Физичное качание при перемещении (tilt) — наклон увеличен на 10 градусов
      const dx = e.clientX - lastClientX;
      lastClientX = e.clientX;
      currentTilt = Math.max(-28, Math.min(28, dx * 2.8));
      el.style.setProperty('--sway-tilt', `${currentTilt || 15}deg`);
      el.style.transform = `scale(1.14) rotate(${currentTilt}deg)`;

            // Подсветка инкубатора при наведении яйца
      const incubatorEl = document.getElementById('prop-incubator');
      if (incubatorEl && incubatorEl.style.display !== 'none') {
        const rInc = incubatorEl.getBoundingClientRect();
        const isNear = (e.clientX >= rInc.left - 15 && e.clientX <= rInc.right + 15 &&
                        e.clientY >= rInc.top - 15 && e.clientY <= rInc.bottom + 15);
        incubatorEl.classList.toggle('drag-target-hover', isNear);
      }

      // Подсветка кнопки «Магазин» при наведении яйца для быстрой продажи
      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) {
        const isNear = isCursorNearShop(e.clientX, e.clientY, el);
        shopBtn.classList.toggle('drag-target-hover', isNear);
      }

      // Подсветка мусорного ведра при наведении яйца
      if (typeof isCursorNearTrashcan === 'function') {
        const isNearTrash = isCursorNearTrashcan(e.clientX, e.clientY, el);
        const trashEl = document.getElementById('prop-trashcan');
        if (trashEl) trashEl.classList.toggle('drag-target-hover', isNearTrash);
      }

      // Расчет скорости перемещения для определения резкого броска
      const now = performance.now();
      const dt = (now - lastMoveTime) / 1000;
      if (dt > 0.012) {
        const dist = Math.hypot(e.clientX - lastMoveX, e.clientY - lastMoveY);
        releaseVelocity = dist / dt;
        lastMoveX = e.clientX;
        lastMoveY = e.clientY;
        lastMoveTime = now;
      }
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}
      el.classList.remove('is-dragging');
      el.style.transform = '';
      el.classList.add('is-wobbling');
      setTimeout(() => el.classList.remove('is-wobbling'), 650);

      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) shopBtn.classList.remove('drag-target-hover');
      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) trashEl.classList.remove('drag-target-hover');

      const now = performance.now();
      // Если перед отпусканием движение прекратилось, сбрасываем скорость броска
      if (now - lastMoveTime > 110) {
        releaseVelocity = 0;
      }

      const eggType = getEggType();
      const count = getEggCount();
      const price = getEggPrice();

      const cursorX = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : lastMoveX;
      const cursorY = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : lastMoveY;

      // Проверка сброса яйца в мусорку
      if (count > 0 && typeof isCursorNearTrashcan === 'function' && isCursorNearTrashcan(cursorX, cursorY, el)) {
        if (typeof getItemDiscardInfo === 'function' && typeof requestDiscardConfirmation === 'function') {
          const info = getItemDiscardInfo('egg', eggType);
          requestDiscardConfirmation(
            info.name,
            info.emoji,
            () => {
              if (typeof performItemDiscard === 'function') performItemDiscard('egg', eggType, cursorX, cursorY);
            },
            () => {
              if (typeof returnItemToOrigin === 'function') returnItemToOrigin(el, startLeft, startTop);
            }
          );
        }
        return;
      }

      // Проверка переноса яйца на утку (яйцо на утке не исчезает — возвращается на место)
      if (typeof isItemOverDuck === 'function' && isItemOverDuck(cursorX, cursorY, el)) {
        corkPopSound();
        if (typeof returnItemToOrigin === 'function') returnItemToOrigin(el, startLeft, startTop);
        return;
      }

      // Продажа перетаскиванием на кнопку «Магазин» (всегда продаются ВСЕ яйца перетаскиваемого типа)
      const isOverShop = isCursorNearShop(cursorX, cursorY, el);
      if (isOverShop && count > 0) {
        const totalEarned = count * price;
        sellEgg(eggType, 'all');
        if (shopBtn) {
          const shr = shopBtn.getBoundingClientRect();
          particles.push({
            x: shr.left + shr.width / 2,
            y: shr.top - 12,
            vx: 0,
            vy: -110,
            size: 20,
            alpha: 1.4,
            text: `💰 Продано всё: +${totalEarned.toLocaleString('ru-RU')} 🦆 (${count.toLocaleString('ru-RU')} шт.)`,
            color: '#4ade80'
          });
        }
        return;
      }

      // Если яйцо отпущено с большой скоростью (бросок) — разбиваем только сырые яйца вдребезги!
      if (releaseVelocity >= 750 && count > 0 && (eggType === 'normal' || eggType === 'golden')) {
        smashEgg(el, eggType, cursorX, cursorY);
        return;
      }

      el.classList.add('is-wobbling');
      setTimeout(() => el.classList.remove('is-wobbling'), 650);

            // Проверка переноса яйца на Инкубатор
      const incubatorEl = document.getElementById('prop-incubator');
      if (incubatorEl && incubatorEl.style.display !== 'none' && (eggType === 'normal' || eggType === 'golden')) {
        const rInc = incubatorEl.getBoundingClientRect();
        const isOverIncubator = (cursorX >= rInc.left - 20 && cursorX <= rInc.right + 20 &&
                                 cursorY >= rInc.top - 20 && cursorY <= rInc.bottom + 20);
        incubatorEl.classList.remove('drag-target-hover');
        if (isOverIncubator) {
          if (isIncubating) {
            corkPopSound();
            if (typeof showGameHintAlert === 'function') {
              showGameHintAlert('Инкубатор занят', 'В инкубаторе уже высиживаются яйца! Дождитесь окончания процесса.', '🐣');
            }
          } else {
            openIncubatorModal(eggType);
          }
          return;
        }
      }

      // Проверка переноса яйца на объединённую плиту со сковородой (только сырые яйца!)
      if ((eggType === 'normal' || eggType === 'golden') && isStoveCombined) {
        const plitaEl = document.getElementById('prop-plita');
        const skovEl = document.getElementById('prop-skovoroda');
        if (plitaEl && skovEl && plitaEl.style.display !== 'none' && skovEl.style.display !== 'none') {
          const rEgg = el.getBoundingClientRect();
          const rSkov = skovEl.getBoundingClientRect();
          const rPlita = plitaEl.getBoundingClientRect();

          if (isOverlapping(rEgg, rSkov) || isOverlapping(rEgg, rPlita)) {
            cookEggsOnStove(eggType);
            return;
          }
        }
      }
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    // Контекстное меню ПКМ для яиц (Продать 1 / Продать всё)
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      const posX = e.clientX || (rect.left + rect.width / 2);
      const posY = e.clientY || (rect.top + rect.height / 2);
      showEggContextMenu(getEggType(), posX, posY);
    });
  }
  window.initDraggableEgg = initDraggableEgg;

  function resetAllContextMenuButtons() {
    const returnBtn = document.getElementById('propCtxReturnBtn');
    const refundBtn = document.getElementById('propCtxRefundBtn');
    const creatureBtn = document.getElementById('propCtxCreatureSellBtn');
    const sell1Btn = document.getElementById('propCtxSell1Btn');
    const sellAllBtn = document.getElementById('propCtxSellAllBtn');
    const discardBtn = document.getElementById('propCtxDiscardBtn');
    if (returnBtn) returnBtn.style.display = 'none';
    if (refundBtn) refundBtn.style.display = 'none';
    if (creatureBtn) creatureBtn.style.display = 'none';
    if (sell1Btn) sell1Btn.style.display = 'none';
    if (sellAllBtn) sellAllBtn.style.display = 'none';
    if (discardBtn) discardBtn.style.display = 'none';
  }
  window.resetAllContextMenuButtons = resetAllContextMenuButtons;
