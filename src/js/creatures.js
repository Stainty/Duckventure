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
      const eggName = incubatingType === 'golden' ? '✨ золотых яиц' : 'обычных яиц';
      const pct = Math.min(100, Math.max(0, Math.round((1 - incubatingRemaining / 120) * 100)));

      body.innerHTML = `
        <div class="incubator-active-view">
          <div class="incubator-active-icon">🥚✨</div>
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
          <span>✨🥚</span> Золотые (${availGolden})
        </button>
      </div>
      ${selectorHtml}
    `;
  }
  window.renderIncubatorModal = renderIncubatorModal;

  function startIncubation(type, count) {
    const avail = (type === 'golden') ? goldenEggs : normalEggs;
    if (count <= 0 || avail < count || isIncubating) return;

    if (type === 'golden') {
      goldenEggs -= count;
      try { Storage.set(EGGS_GOLDEN_KEY, String(goldenEggs)); } catch (e) {}
    } else {
      normalEggs -= count;
      try { Storage.set(EGGS_NORMAL_KEY, String(normalEggs)); } catch (e) {}
    }
    updateEggsDisplay();

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
        try { Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings)); } catch (e) {}
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

      // Если на столе нет питомца, спавним одного утёнка на стол
      if (!creatureOnDesk) {
        spawnCreatureOnDesk(isGold ? 'goldenDuckling' : 'duckling');
      }
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

  /* ---------- Питомец на столе (Утёнок / Гусь / Жареный гусь) ---------- */
  function spawnCreatureOnDesk(type) {
    if (type === 'duckling' && normalDucklings > 0) {
      normalDucklings--;
      try { Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings)); } catch (e) {}
    } else if (type === 'goldenDuckling' && goldenDucklings > 0) {
      goldenDucklings--;
      try { Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings)); } catch (e) {}
    } else if (type === 'goose' && normalGeese > 0) {
      normalGeese--;
      try { Storage.set(GEESE_NORMAL_KEY, String(normalGeese)); } catch (e) {}
    } else if (type === 'goldenGoose' && goldenGeese > 0) {
      goldenGeese--;
      try { Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese)); } catch (e) {}
    } else if (type === 'roastedGoose' && normalRoastedGeese > 0) {
      normalRoastedGeese--;
      try { Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese)); } catch (e) {}
    } else if (type === 'goldenRoastedGoose' && goldenRoastedGeese > 0) {
      goldenRoastedGeese--;
      try { Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese)); } catch (e) {}
    }

    creatureOnDesk = { type: type };
    if (type === 'duckling' || type === 'goldenDuckling') {
      ducklingGrowRemaining = 600; // 10 минут (600 сек)
    }
    try {
      Storage.setJSON(CREATURE_ON_DESK_KEY, creatureOnDesk);
      Storage.set(DUCKLING_GROW_REMAINING_KEY, String(ducklingGrowRemaining));
    } catch (e) {}

    const el = document.getElementById('deskCreature');
    if (el) {
      const incEl = document.getElementById('prop-incubator');
      if (incEl && incEl.style.display !== 'none') {
        const r = incEl.getBoundingClientRect();
        el.style.left = `${Math.min(window.innerWidth - 80, Math.max(20, r.right + 20))}px`;
        el.style.top = `${Math.min(window.innerHeight - 80, Math.max(70, r.top))}px`;
      } else {
        const rD = duck.getBoundingClientRect();
        el.style.left = `${Math.min(window.innerWidth - 80, Math.max(20, rD.right + 30))}px`;
        el.style.top = `${Math.min(window.innerHeight - 80, Math.max(70, rD.top + 50))}px`;
      }
      el.style.display = 'block';
      if (creatureOnDesk) {
        creatureOnDesk.left = el.style.left;
        creatureOnDesk.top = el.style.top;
        try { Storage.setJSON(CREATURE_ON_DESK_KEY, creatureOnDesk); } catch (e) {}
      }
    }

    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.spawnCreatureOnDesk = spawnCreatureOnDesk;

  function updateDeskCreatureUI() {
    const el = document.getElementById('deskCreature');
    const vis = document.getElementById('deskCreatureVisual');
    const badge = document.getElementById('deskCreatureAgeBadge');
    const ageText = document.getElementById('deskCreatureAgeText');

    if (!el || !vis) return;

    if (!creatureOnDesk) {
      el.style.display = 'none';
      if (badge) badge.style.display = 'none';
      return;
    }

    if (creatureOnDesk.left && creatureOnDesk.top && (!el.style.left || el.style.left === '')) {
      el.style.left = creatureOnDesk.left;
      el.style.top = creatureOnDesk.top;
    }

    el.style.display = 'block';
    const type = creatureOnDesk.type;

    vis.className = 'creature-visual';
    if (type === 'duckling') {
      vis.textContent = '🐥';
      el.title = 'Маленький утёнок (перетаскивай! Продай в магазине или подожди, пока вырастет)';
    } else if (type === 'goldenDuckling') {
      vis.textContent = '✨🐥';
      vis.classList.add('golden-creature');
      el.title = 'Золотой утёнок (перетаскивай! Дорогая птица)';
    } else if (type === 'goose') {
      vis.textContent = '🪿';
      vis.classList.add('goose-sprite');
      el.title = 'Большой гусь (перетаскивай! Продай в магазине или зажарь)';
    } else if (type === 'goldenGoose') {
      vis.textContent = '✨🪿';
      vis.classList.add('goose-sprite', 'golden-creature');
      el.title = 'Золотой большой гусь (перетаскивай! Легендарная птица)';
    } else if (type === 'roastedGoose') {
      vis.textContent = '🍗🪿';
      vis.classList.add('roasted-goose-sprite');
      el.title = 'Жареный гусь (перетаскивай! Продай в магазине)';
    } else if (type === 'goldenRoastedGoose') {
      vis.textContent = '✨🍗';
      vis.classList.add('roasted-goose-sprite', 'golden-creature');
      el.title = 'Золотой жареный гусь (перетаскивай! Царское блюдо)';
    }

    // Таймер роста отображается только для утят и только если на столе есть Часы
    if (badge && ageText) {
      if ((type === 'duckling' || type === 'goldenDuckling') && isClockOnTable()) {
        const mins = Math.floor(ducklingGrowRemaining / 60);
        const secs = ducklingGrowRemaining % 60;
        ageText.textContent = `🪿 ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    }
  }
  window.updateDeskCreatureUI = updateDeskCreatureUI;

  function growDucklingToGoose() {
    if (!creatureOnDesk) return;
    const isGold = (creatureOnDesk.type === 'goldenDuckling');
    creatureOnDesk.type = isGold ? 'goldenGoose' : 'goose';
    try { Storage.setJSON(CREATURE_ON_DESK_KEY, creatureOnDesk); } catch (e) {}

    gooseHonkSound();
    const el = document.getElementById('deskCreature');
    const r = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

    particles.push({
      x: r.left + 35,
      y: r.top - 20,
      vx: 0,
      vy: -110,
      size: 24,
      alpha: 1.5,
      text: isGold ? '✨🪿 Утёнок вырос в ЗОЛОТОГО гуся!' : '🪿 Утёнок вырос в большого гуся!',
      color: isGold ? '#facc15' : '#38bdf8'
    });

    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.growDucklingToGoose = growDucklingToGoose;

  function burnDeskCreature() {
    if (!creatureOnDesk) return;
    burnSound();

    const el = document.getElementById('deskCreature');
    const r = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

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

    creatureOnDesk = null;
    try { Storage.remove(CREATURE_ON_DESK_KEY); } catch (e) {}

    hasFriedDuckling = true;
    try {
      Storage.set(HAS_FRIED_DUCKLING_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'crispy-duckling', '1');
    } catch (e) {}
    tryUnlock();

    updateDeskCreatureUI();
    updateShopSellTab();
    checkAutoNextCreature();
  }
  window.burnDeskCreature = burnDeskCreature;

  function roastDeskCreature() {
    if (!creatureOnDesk) return;
    sizzleSound(true);

    const isGold = (creatureOnDesk.type === 'goldenGoose');
    creatureOnDesk.type = isGold ? 'goldenRoastedGoose' : 'roastedGoose';
    try { Storage.setJSON(CREATURE_ON_DESK_KEY, creatureOnDesk); } catch (e) {}

    hasCookedGoose = true;
    try {
      Storage.set(HAS_COOKED_GOOSE_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'roasted-goose', '1');
    } catch (e) {}
    tryUnlock();

    const el = document.getElementById('deskCreature');
    const r = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };

    particles.push({
      x: r.left + 35,
      y: r.top - 20,
      vx: 0,
      vy: -110,
      size: 22,
      alpha: 1.5,
      text: isGold ? '✨🍗 Золотой гусь аппетитно зажарен!' : '🍗🔥 Ароматный жареный гусь готов!',
      color: isGold ? '#facc15' : '#ea580c'
    });

    updateDeskCreatureUI();
    updateShopSellTab();
  }
  window.roastDeskCreature = roastDeskCreature;

  function getCreaturePrice(type) {
    if (type === 'duckling') return 10000;
    if (type === 'goldenDuckling') return 50000;
    if (type === 'goose') return 150000;
    if (type === 'goldenGoose') return 500000;
    if (type === 'roastedGoose') return 180000;
    if (type === 'goldenRoastedGoose') return 650000;
    return 0;
  }

  function getCreatureName(type) {
    if (type === 'duckling') return 'Утёнок';
    if (type === 'goldenDuckling') return 'Золотой утёнок';
    if (type === 'goose') return 'Большой гусь';
    if (type === 'goldenGoose') return 'Золотой большой гусь';
    if (type === 'roastedGoose') return 'Жареный гусь';
    if (type === 'goldenRoastedGoose') return 'Золотой жареный гусь';
    return 'Питомец';
  }

  function sellDeskCreature() {
    if (!creatureOnDesk) return;
    const type = creatureOnDesk.type;
    const price = getCreaturePrice(type);
    const name = getCreatureName(type);

    earnDuckles(price, false, true);
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
      text: `💰 Продано: ${name} (+${price.toLocaleString('ru-RU')} 🦆)`,
      color: '#4ade80'
    });

    creatureOnDesk = null;
    try { Storage.remove(CREATURE_ON_DESK_KEY); } catch (e) {}

    updateDeskCreatureUI();
    updateShopSellTab();
    checkAutoNextCreature();
  }
  window.sellDeskCreature = sellDeskCreature;

  function sellCreature(type, countOrAll) {
    let avail = 0;
    let onDesk = (creatureOnDesk && creatureOnDesk.type === type) ? 1 : 0;

    if (type === 'duckling') avail = normalDucklings;
    else if (type === 'goldenDuckling') avail = goldenDucklings;
    else if (type === 'goose') avail = normalGeese;
    else if (type === 'goldenGoose') avail = goldenGeese;
    else if (type === 'roastedGoose') avail = normalRoastedGeese;
    else if (type === 'goldenRoastedGoose') avail = goldenRoastedGeese;

    const totalAvail = avail + onDesk;
    if (totalAvail <= 0) return;

    let sellCount = (countOrAll === 'all') ? totalAvail : Math.min(totalAvail, 1);
    const price = getCreaturePrice(type);
    const totalEarned = sellCount * price;
    const name = getCreatureName(type);

    let remainingToSell = sellCount;
    // Сначала продаем из инвентаря
    if (remainingToSell > 0 && avail > 0) {
      const takeFromInv = Math.min(avail, remainingToSell);
      if (type === 'duckling') normalDucklings -= takeFromInv;
      else if (type === 'goldenDuckling') goldenDucklings -= takeFromInv;
      else if (type === 'goose') normalGeese -= takeFromInv;
      else if (type === 'goldenGoose') goldenGeese -= takeFromInv;
      else if (type === 'roastedGoose') normalRoastedGeese -= takeFromInv;
      else if (type === 'goldenRoastedGoose') goldenRoastedGeese -= takeFromInv;
      remainingToSell -= takeFromInv;
    }
    // Если нужно, продаем и питомца со стола
    if (remainingToSell > 0 && onDesk > 0) {
      creatureOnDesk = null;
      try { Storage.remove(CREATURE_ON_DESK_KEY); } catch (e) {}
    }

    try {
      Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings));
      Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings));
      Storage.set(GEESE_NORMAL_KEY, String(normalGeese));
      Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese));
      Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese));
      Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese));
    } catch (e) {}

    earnDuckles(totalEarned, false, true);
    xpSound();

    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 30,
      vx: 0,
      vy: -110,
      size: 20,
      alpha: 1.4,
      text: `💰 Продано: ${sellCount} шт. (${name}) +${totalEarned.toLocaleString('ru-RU')} 🦆`,
      color: '#4ade80'
    });

    updateDeskCreatureUI();
    updateShopSellTab();
    checkAutoNextCreature();
  }
  window.sellCreature = sellCreature;

  function checkAutoNextCreature() {
    if (creatureOnDesk) return;
    if (normalDucklings > 0) spawnCreatureOnDesk('duckling');
    else if (goldenDucklings > 0) spawnCreatureOnDesk('goldenDuckling');
    else if (normalGeese > 0) spawnCreatureOnDesk('goose');
    else if (goldenGeese > 0) spawnCreatureOnDesk('goldenGoose');
    else if (normalRoastedGeese > 0) spawnCreatureOnDesk('roastedGoose');
    else if (goldenRoastedGeese > 0) spawnCreatureOnDesk('goldenRoastedGoose');
  }

  function initDraggableCreature(el) {
    if (!el) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

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
      e.stopPropagation();
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const x = Math.max(10, Math.min(window.innerWidth - el.offsetWidth - 10, e.clientX - startX));
      const y = Math.max(60, Math.min(window.innerHeight - el.offsetHeight - 20, e.clientY - startY));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      // Проверка наведения на кнопку Магазин
      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) {
        const isNear = isCursorNearShop(e.clientX, e.clientY, el);
        shopBtn.classList.toggle('drag-target-hover', isNear);
      }
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}
      el.classList.remove('is-dragging');

      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) shopBtn.classList.remove('drag-target-hover');

      const cx = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : undefined;
      const cy = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : undefined;

      // 1. Проверка продажи на кнопку Магазин
      if (cx !== undefined && cy !== undefined && isCursorNearShop(cx, cy, el)) {
        sellDeskCreature();
        return;
      }

      // 2. Проверка зажаривания на плите со сковородой
      if (isStoveCombined && cx !== undefined && cy !== undefined && creatureOnDesk) {
        const plitaEl = document.getElementById('prop-plita');
        const skovEl = document.getElementById('prop-skovoroda');
        const stoveEl = (plitaEl && plitaEl.style.display !== 'none') ? plitaEl : skovEl;
        if (stoveEl && stoveEl.style.display !== 'none') {
          const stRect = stoveEl.getBoundingClientRect();
          const isOverStove = (cx >= stRect.left - 25 && cx <= stRect.right + 25 &&
                               cy >= stRect.top - 25 && cy <= stRect.bottom + 25);
          if (isOverStove) {
            const t = creatureOnDesk.type;
            if (t === 'duckling' || t === 'goldenDuckling') {
              burnDeskCreature();
              return;
            } else if (t === 'goose' || t === 'goldenGoose') {
              roastDeskCreature();
              return;
            }
          }
        }
      }

      if (creatureOnDesk) {
        creatureOnDesk.left = el.style.left;
        creatureOnDesk.top = el.style.top;
        try { Storage.setJSON(CREATURE_ON_DESK_KEY, creatureOnDesk); } catch (err) {}
      }
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    // ПКМ контекстное меню для питомца
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!creatureOnDesk) return;

      activeContextPropId = null;
      activeContextEggType = null;
      resetAllContextMenuButtons();

      const price = getCreaturePrice(creatureOnDesk.type);
      const name = getCreatureName(creatureOnDesk.type);
      const propCtxCreatureSellBtn = document.getElementById('propCtxCreatureSellBtn');

      if (propCtxCreatureSellBtn) {
        propCtxCreatureSellBtn.style.display = 'flex';
        propCtxCreatureSellBtn.innerHTML = `<span class="prop-ctx-icon">💰</span> Продать ${name} (+${price.toLocaleString('ru-RU')} 🦆)`;
        propCtxCreatureSellBtn.onclick = () => {
          sellDeskCreature();
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
      const el = document.getElementById('deskCreature');
      if (!el || el.style.display === 'none' || el.classList.contains('is-dragging')) return;
      if (!creatureOnDesk) return;
      if (creatureOnDesk.type === 'roastedGoose' || creatureOnDesk.type === 'goldenRoastedGoose') return;

      if (Math.random() < 0.45) {
        let curLeft = parseFloat(el.style.left) || (window.innerWidth / 2);
        let curTop = parseFloat(el.style.top) || (window.innerHeight - 120);

        const moveX = (Math.random() - 0.5) * 70;
        const moveY = (Math.random() - 0.5) * 40;

        const newLeft = Math.max(20, Math.min(window.innerWidth - 90, curLeft + moveX));
        const newTop = Math.max(window.innerHeight - 220, Math.min(window.innerHeight - 80, curTop + moveY));

        el.style.transition = 'left 0.8s ease-in-out, top 0.8s ease-in-out, transform 0.4s ease';
        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;

        const facing = moveX < 0 ? 'scaleX(-1)' : 'scaleX(1)';
        el.style.transform = `${facing} translateY(-8px)`;
        setTimeout(() => {
          if (!el.classList.contains('is-dragging')) {
            el.style.transform = facing;
          }
        }, 400);
      }
    }, 2400);
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
    if (creatureOnDesk && (creatureOnDesk.type === 'duckling' || creatureOnDesk.type === 'goldenDuckling')) {
      ducklingGrowRemaining = 1;
      updateDeskCreatureUI();
    }
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
      lastClientX = e.clientX;
      currentTilt = 0;

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

      const shopBtn = document.getElementById('shopBtn');
      if (shopBtn) shopBtn.classList.remove('drag-target-hover');

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
            particles.push({
              x: cursorX,
              y: cursorY - 15,
              vx: 0,
              vy: -90,
              size: 16,
              alpha: 1.2,
              text: '🐣 Инкубатор уже занят!',
              color: '#fbbf24'
            });
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
