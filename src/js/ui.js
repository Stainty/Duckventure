/* ---------- Перемещение утки (Возможности LVL 4) ---------- */
  let isDuckDragging = false;
  let duckDragStartX = 0;
  let duckDragStartY = 0;
  let duckStartLeft = 0;
  let duckStartTop = 0;
  let duckHasMoved = false;
  let suppressNextDuckClick = false;
  let lastDuckClientX = 0;
  let duckTilt = 0;

  function updateDuckDragCursor() {
    if (upgradeLevels.features >= 4) {
      duck.classList.add('can-drag');
    } else {
      duck.classList.remove('can-drag');
    }
  }

  function triggerDuckMoveSecret(origLeft, origTop) {
    // 1. Ачивка "Переезд"
    if (!hasMovedDuck) {
      hasMovedDuck = true;
      try { Storage.set(MOVED_DUCK_KEY, '1'); } catch (err) {}
      tryUnlock();
    }

    // 2. Спавн предмета "Ключ" под уткой (на месте, где стояла утка)
    if (!hasSpawnedKey) {
      hasSpawnedKey = true;
      try { Storage.set(SPAWNED_KEY_KEY, '1'); } catch (err) {}

      if (!ownedProps.includes('key')) {
        ownedProps.push('key');
        try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (err) {}
      }

      const keyEl = document.getElementById('prop-key');
      if (keyEl) {
        const duckW = duck.offsetWidth || 200;
        const duckH = duck.offsetHeight || 200;
        const kLeft = Math.max(10, Math.min(window.innerWidth - 85, Math.round(origLeft + (duckW - 72) / 2))) + 'px';
        const kTop = Math.max(70, Math.min(window.innerHeight - 85, Math.round(origTop + (duckH - 72) / 2))) + 'px';
        keyEl.style.left = kLeft;
        keyEl.style.top = kTop;
        keyEl.style.display = 'block';
        placedProps.key = { placed: true, left: kLeft, top: kTop };
        try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (err) {}
      }

      xpSound();
      particles.push({
        x: origLeft + (duck.offsetWidth || 200) / 2,
        y: origTop + (duck.offsetHeight || 200) / 2,
        vx: 0,
        vy: -100,
        size: 22,
        alpha: 1.2,
        text: '🔑 Ключ!',
        color: '#ffd700'
      });

      updateShopButtonVisibility();
      renderStorage();
    }
  }

  duck.addEventListener('pointerdown', (e) => {
    if (isCookedDuckActive || isDeflatedDuckActive) return;
    if (isAnyModalOpen()) return;
    if (upgradeLevels.features < 4) return;
    if (e.button !== 0) return;

    isDuckDragging = true;
    duckHasMoved = false;
    duck.classList.remove('is-wobbling');
    try { duck.setPointerCapture(e.pointerId); } catch (err) {}

    const rect = duck.getBoundingClientRect();
    duckDragStartX = e.clientX;
    duckDragStartY = e.clientY;
    duckStartLeft = rect.left;
    duckStartTop = rect.top;
    lastDuckClientX = e.clientX;
    duckTilt = 0;
  });

  duck.addEventListener('pointermove', (e) => {
    if (!isDuckDragging) return;
    const dx = e.clientX - duckDragStartX;
    const dy = e.clientY - duckDragStartY;
    const dist = Math.hypot(dx, dy);

    if (dist > 6) {
      if (!duckHasMoved) {
        duckHasMoved = true;
        duck.classList.add('is-dragging');
        duck.style.position = 'fixed';
        duck.style.margin = '0';
        duck.style.zIndex = '50';
      }

      const newLeft = Math.max(0, Math.min(window.innerWidth - duck.offsetWidth, duckStartLeft + dx));
      const newTop = Math.max(0, Math.min(window.innerHeight - duck.offsetHeight, duckStartTop + dy));
      duck.style.left = `${newLeft}px`;
      duck.style.top = `${newTop}px`;

      // Физичное качание при перемещении (tilt) — наклон увеличен на 10 градусов
      const stepDx = e.clientX - lastDuckClientX;
      lastDuckClientX = e.clientX;
      duckTilt = Math.max(-24, Math.min(24, stepDx * 2.0));
      duck.style.setProperty('--sway-tilt', `${duckTilt || 12}deg`);
      duck.style.transform = `scale(1.04) rotate(${duckTilt}deg)`;
      if (typeof updateBadgesPosition === 'function') updateBadgesPosition();

      if (dist > 15) {
        triggerDuckMoveSecret(duckStartLeft, duckStartTop);
      }
    }
  });

  const endDuckDrag = (e) => {
    if (!isDuckDragging) return;
    isDuckDragging = false;
    duck.classList.remove('is-dragging');
    duck.style.transform = '';
    try { duck.releasePointerCapture(e.pointerId); } catch (err) {}

    if (duckHasMoved) {
      duck.classList.add('is-wobbling');
      setTimeout(() => duck.classList.remove('is-wobbling'), 650);

      suppressNextDuckClick = true;
      setTimeout(() => { suppressNextDuckClick = false; }, 120);

      try {
        Storage.setJSON(DUCK_POS_KEY, {
          left: duck.style.left,
          top: duck.style.top
        });
      } catch (err) {}

      checkDuckStoveCombine();
    }
  };
  duck.addEventListener('pointerup', endDuckDrag);
  duck.addEventListener('pointercancel', endDuckDrag);

  duck.addEventListener('click', () => {
    if (isCookedDuckActive) {
      const modal = document.getElementById('cookedDuckModal');
      if (modal) modal.classList.add('open');
      return;
    }
    if (isDeflatedDuckActive) {
      const modal = document.getElementById('deflatedDuckModal');
      if (modal) modal.classList.add('open');
      return;
    }
    if (isAnyModalOpen()) return;
    if (suppressNextDuckClick) {
      suppressNextDuckClick = false;
      return;
    }
    const r = duck.getBoundingClientRect();
    // анимация "подпрыгивания" — перезапуск
    duck.classList.remove('pop');
    void duck.offsetWidth;
    duck.classList.add('pop');
    quack();
    quackCount++;

    // Расчет силы клика и возможностей
    let gain = 1;
    const strUpg = UPGRADES_DATA.find(u => u.id === 'strength');
    const strLvl = upgradeLevels.strength;
    if (strUpg && strLvl > 0) {
      gain = strUpg.levels[strLvl - 1].power;
    }

    // Проверка крит шанса
    let isCrit = false;
    const critUpg = UPGRADES_DATA.find(u => u.id === 'crit');
    const critLvl = upgradeLevels.crit || 0;
    if (critUpg && critLvl > 0) {
      const critData = critUpg.levels[critLvl - 1];
      const effChance = (typeof isStinkDebuffActive === 'function' && isStinkDebuffActive()) ? (critData.chance * 0.5) : critData.chance;
      const effMult = (typeof isStinkDebuffActive === 'function' && isStinkDebuffActive()) ? Math.max(1.5, critData.mult * 0.5) : critData.mult;
      if (Math.random() * 100 < effChance) {
        isCrit = true;
        gain *= effMult;
      }
    }

    // Возможности ур 5: Золотая утка (x2 ко всему)
    if (upgradeLevels.features >= 5) {
      gain *= 2;
    }

    // Дебафф от протухших яиц: -50% ко всем характеристикам
    if (typeof isStinkDebuffActive === 'function' && isStinkDebuffActive()) {
      gain = Math.max(1, Math.floor(gain * 0.5));
    }

    if (isCrit) {
      critSound();
      const isMob = window.innerWidth <= 600;
      particles.push({
        x: r.left + r.width / 2,
        y: r.top - (isMob ? 8 : 14),
        vx: (Math.random() - 0.5) * 50,
        vy: isMob ? -170 : -230,
        size: isMob ? 17 : 25,
        alpha: 1.25,
        text: `💥 КРИТ! +${gain.toLocaleString('ru-RU')} 🦆`,
        color: '#ff3366'
      });
    }

    addDuckles(gain);
    try {
      Storage.set(QUACK_KEY, String(quackCount));
    } catch (e) {}

    // Нажатие сбрасывает таймер ожидания (нужно навестись и не нажимать 10 сек)
    clearHoverTimer();
    startHoverTimer();

    // старт точно из клюва/головы утки (верхняя треть спрайта)
    spawn(r.left + r.width * 0.48, r.top + r.height * 0.36);
    // проверка выпадения яиц
    checkEggRoll(true);
    // проверка ачивок
    tryUnlock();
  });

  // клик по нижней надписи — «не туда»: текст не меняется, просто считаем и проверяем ачивку
  const hint = document.querySelector('.hint');
  hint.addEventListener('click', () => {
    hintCount++;
    try { Storage.set(HINT_KEY, String(hintCount)); } catch (e) {}
    tryUnlock();
  });

  // клик по заблокированной ачивке — ачивка "Взлом жопы!"
  document.getElementById('achvList').addEventListener('click', (e) => {
    const card = e.target.closest('.achv-card');
    if (card && !card.classList.contains('unlocked')) {
      lockedCardClicked = true;
      try { Storage.set(LOCKED_CLICKED_KEY, '1'); } catch (err) {}
      tryUnlock();
    }
  });

  // ачивка "Томное ожидание": навестись на утку и не нажимать 10 секунд
  function startHoverTimer() {
    clearHoverTimer();
    if (hoverWaitDone || isAnyModalOpen()) return;
    hoverTimer = setTimeout(() => {
      if (isAnyModalOpen()) return;
      hoverWaitDone = true;
      try { Storage.set(HOVER_WAIT_KEY, '1'); } catch (e) {}
      tryUnlock();
    }, 10000);
  }
  function clearHoverTimer() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
  }
  duck.addEventListener('pointerenter', startHoverTimer);
  duck.addEventListener('pointerleave', clearHoverTimer);

  // Запрет контекстного меню (ПКМ -> Посмотреть код)
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Анти-отладчик: если DevTools открыт, выполнение замирает на точке останова
  setInterval(() => {
    const t0 = performance.now();
    debugger;
    if (performance.now() - t0 > 80) {
      triggerDevTools();
    }
  }, 100);

  // ачивка "Хакер": открытие DevTools
  function triggerDevTools() {
    if (!devToolsOpened) {
      devToolsOpened = true;
      try { Storage.set(DEVTOOLS_KEY, '1'); } catch (e) {}
      tryUnlock();
    }
  }

  // Отслеживание открытия DevTools по событию resize:
  // При открытии встроенной панели DevTools размер окна браузера (outer) не меняется,
  // а внутренняя область страницы (inner) резко уменьшается (> 140px).
  let prevOuterW = window.outerWidth;
  let prevOuterH = window.outerHeight;
  let prevInnerW = window.innerWidth;
  let prevInnerH = window.innerHeight;

  window.addEventListener('resize', () => {
    const deltaOuterW = Math.abs(window.outerWidth - prevOuterW);
    const deltaOuterH = Math.abs(window.outerHeight - prevOuterH);
    const deltaInnerW = Math.abs(window.innerWidth - prevInnerW);
    const deltaInnerH = Math.abs(window.innerHeight - prevInnerH);

    prevOuterW = window.outerWidth;
    prevOuterH = window.outerHeight;
    prevInnerW = window.innerWidth;
    prevInnerH = window.innerHeight;

    if ((deltaInnerW > 140 && deltaOuterW < 25) || (deltaInnerH > 140 && deltaOuterH < 25)) {
      triggerDevTools();
    }
  });

  // клавиатурные ачивки: "Печатать не нужно!", "Я и есть утка", "Поганец!", "Хакер"
  const DUCK_SEQUENCE = [
    { code: 'KeyR', keys: ['r', 'к'] },
    { code: 'KeyH', keys: ['h', 'р'] },
    { code: 'KeyZ', keys: ['z', 'я'] },
  ];
  let duckSeqIndex = 0;

  function isFunctionalKey(e) {
    if (/^F\d+$/.test(e.key)) return true;
    const functional = [
      'Shift', 'Control', 'Alt', 'Meta', 'AltGraph',
      'CapsLock', 'Tab', 'Escape', 'NumLock', 'ScrollLock',
      'Pause', 'PrintScreen', 'ContextMenu'
    ];
    return functional.includes(e.key);
  }

  window.addEventListener('keydown', (e) => {
    // Закрытие активного окна по клавише Escape
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.upgrades-modal.open');
      if (openModal) {
        openModal.classList.remove('open');
        updateUpgradesButtonHighlight();
        return;
      }
    }

    if (isAnyModalOpen()) return;

    // 0. "Хакер" — блокировка вызова DevTools и просмотра исходного кода
    if (e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.code === 'KeyI' || e.code === 'KeyJ' || e.code === 'KeyC')) ||
        ((e.ctrlKey || e.metaKey) && (e.code === 'KeyU' || e.key.toLowerCase() === 'u' || e.key.toLowerCase() === 'г'))) {
      e.preventDefault();
      e.stopPropagation();
      triggerDevTools();
      return false;
    }

    if (e.repeat) return;

    // 1. "Печатать не нужно!" — любая нефункциональная клавиша
    if (!isFunctionalKey(e)) {
      if (!keyPressed) {
        keyPressed = true;
        try { Storage.set(KEY_PRESSED_KEY, '1'); } catch (err) {}
        tryUnlock();
      }
    }

    // 2. "Я и есть утка" — последовательность R H Z (К Р Я)
    const pressedKey = e.key.toLowerCase();
    const step = DUCK_SEQUENCE[duckSeqIndex];
    if (e.code === step.code || step.keys.includes(pressedKey)) {
      duckSeqIndex++;
      if (duckSeqIndex === DUCK_SEQUENCE.length) {
        duckSeqDone = true;
        duckSeqIndex = 0;
        try { Storage.set(SEQ_DONE_KEY, '1'); } catch (err) {}
        tryUnlock();
      }
    } else {
      if (e.code === DUCK_SEQUENCE[0].code || DUCK_SEQUENCE[0].keys.includes(pressedKey)) {
        duckSeqIndex = 1;
      } else {
        duckSeqIndex = 0;
      }
    }

    // 3. "Поганец!" — слова {EQ, GBPLF, PFKEGF, <KZ и русский эквивалент
    if (e.key.length === 1) {
      charBuffer = (charBuffer + e.key.toLowerCase()).slice(-40);
      codeBuffer = (codeBuffer + e.code).slice(-80);

      const badPatterns = [
        '{eq', '[eq', 'хуй',
        'gbplf', 'пизда',
        'pfkegf', 'залупа',
        '<kz', ',kz', 'бля'
      ];
      const codePatterns = [
        'BracketLeftKeyEKeyQ',
        'KeyGKeyBKeyPKeyLKeyF',
        'KeyPKeyFKeyKKeyEKeyGKeyF',
        'CommaKeyKKeyZ'
      ];

      if (!badWordsTyped && (badPatterns.some(p => charBuffer.includes(p)) ||
                             codePatterns.some(p => codeBuffer.includes(p)))) {
        badWordsTyped = true;
        try { Storage.set(BAD_WORDS_KEY, '1'); } catch (err) {}
        tryUnlock();
      }

      // 4. "Руки помнят!" — читы GTA: AEZAKMI или HESOYAM
      const gtaPatterns = [
        'aezakmi', 'фуяфльш',
        'hesoyam', 'руыщнфь'
      ];
      const gtaCodePatterns = [
        'KeyAKeyEKeyZKeyAKeyKKeyMKeyI',
        'KeyHKeyEKeySKeyOKeyYKeyAKeyM'
      ];

      if (!gtaCheatTyped && (gtaPatterns.some(p => charBuffer.includes(p)) ||
                             gtaCodePatterns.some(p => codeBuffer.includes(p)))) {
        gtaCheatTyped = true;
        try { Storage.set(GTA_CHEAT_KEY, '1'); } catch (err) {}
        tryUnlock();
      }

      // 5. "Почти число зверя!" — набрать 665
      const beastCodePatterns = [
        'Digit6Digit6Digit5',
        'Numpad6Numpad6Numpad5'
      ];

      if (!beastNumberTyped && (charBuffer.includes('665') ||
                                beastCodePatterns.some(p => codeBuffer.includes(p)))) {
        beastNumberTyped = true;
        try { Storage.set(BEAST_NUMBER_KEY, '1'); } catch (err) {}
        tryUnlock();
      }

      // 6. Секретный код "mousecrown" — показать/скрыть чит-панель
      const mousecrownPatterns = ['mousecrown', 'ьщгыускщцт'];
      const mousecrownCodePattern = 'KeyMKeyOKeyUKeySKeyEKeyCKeyRKeyOKeyWKeyN';
      if (mousecrownPatterns.some(p => charBuffer.includes(p)) || codeBuffer.includes(mousecrownCodePattern)) {
        charBuffer = '';
        codeBuffer = '';
        toggleCheatPanel();
      }
    }
  });

  // сброс всех ачивок
  document.getElementById('resetBtn').addEventListener('click', () => resetAchievements(false));

  const cookedDuckModal = document.getElementById('cookedDuckModal');
  const cookedDuckRestartBtn = document.getElementById('cookedDuckRestartBtn');
  if (cookedDuckRestartBtn) {
    cookedDuckRestartBtn.addEventListener('click', restartFromCookedDuck);
  }
  if (cookedDuckModal) {
    cookedDuckModal.addEventListener('click', (e) => {
      if (e.target === cookedDuckModal) {
        cookedDuckModal.classList.remove('open');
      }
    });
  }

  const knifeAccidentModal = document.getElementById('knifeAccidentModal');
  const knifeAccidentCloseBtn = document.getElementById('knifeAccidentCloseBtn');
  if (knifeAccidentCloseBtn) {
    knifeAccidentCloseBtn.addEventListener('click', () => {
      if (knifeAccidentModal) knifeAccidentModal.classList.remove('open');
    });
  }
  if (knifeAccidentModal) {
    knifeAccidentModal.addEventListener('click', (e) => {
      if (e.target === knifeAccidentModal) {
        knifeAccidentModal.classList.remove('open');
      }
    });
  }

  const deflatedDuckModal = document.getElementById('deflatedDuckModal');
  const deflatedDuckRestartBtn = document.getElementById('deflatedDuckRestartBtn');
  if (deflatedDuckRestartBtn) {
    deflatedDuckRestartBtn.addEventListener('click', restartFromDeflatedDuck);
  }
  if (deflatedDuckModal) {
    deflatedDuckModal.addEventListener('click', (e) => {
      if (e.target === deflatedDuckModal) {
        deflatedDuckModal.classList.remove('open');
      }
    });
  }

/* ---------- Механика ножа, изоленты и сдувания утки ---------- */
  function updateDeflationUI() {
    const badge = document.getElementById('duckDeflateBadge');
    const timerSpan = document.getElementById('duckDeflateTimer');
    const duckEl = document.getElementById('duck');

    if (isDuckDeflating && !isCookedDuckActive && !isDeflatedDuckActive) {
      if (duckEl) duckEl.classList.add('has-deflate');
      if (badge) {
        badge.style.display = 'flex';
        if (timerSpan) {
          if (isClockOnTable()) {
            const m = Math.floor(deflationRemaining / 60);
            const s = deflationRemaining % 60;
            timerSpan.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            timerSpan.style.display = 'inline-block';
          } else {
            timerSpan.style.display = 'none';
          }
        }
      }
    } else {
      if (duckEl) duckEl.classList.remove('has-deflate');
      if (badge) badge.style.display = 'none';
    }
    updateBadgesPosition();
  }
  window.updateDeflationUI = updateDeflationUI;

  function updateBadgesPosition() {
    const rDuck = duck.getBoundingClientRect();
    const cx = rDuck.left + rDuck.width / 2;
    const badgeStink = document.getElementById('duckDebuffBadge');
    const badgeDeflate = document.getElementById('duckDeflateBadge');
    let topOffset = 36;

    if (badgeDeflate && badgeDeflate.style.display !== 'none') {
      badgeDeflate.style.top = `${Math.max(10, rDuck.top - topOffset)}px`;
      badgeDeflate.style.left = `${cx}px`;
      topOffset += 38;
    }
    if (badgeStink && badgeStink.style.display !== 'none') {
      badgeStink.style.top = `${Math.max(10, rDuck.top - topOffset)}px`;
      badgeStink.style.left = `${cx}px`;
    }
  }
  window.updateBadgesPosition = updateBadgesPosition;

  function stabDuckWithKnife(showModal = true) {
    knifeStabSound();
    const rD = duck.getBoundingClientRect();
    const cx = rD.left + rD.width / 2;
    const cy = rD.top + rD.height / 2;

    particles.push({
      x: cx,
      y: cy - 30,
      vx: 0,
      vy: -130,
      size: 22,
      alpha: 2.0,
      text: '😱 ОЙ! СЛУЧАЙНО!',
      color: '#ef4444'
    });

    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 50 + Math.random() * 100;
      particles.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        size: 14 + Math.random() * 8,
        alpha: 1.0,
        text: '💨',
        color: '#93c5fd'
      });
    }

    if (!isDuckDeflating) {
      isDuckDeflating = true;
      deflationRemaining = 300; // 5 минут
      try {
        Storage.set(DUCK_IS_DEFLATING_KEY, '1');
        Storage.set(DUCK_DEFLATING_REMAINING_KEY, '300');
      } catch (e) {}
    }

    updateDeflationUI();

    if (showModal) {
      const modal = document.getElementById('knifeAccidentModal');
      if (modal) modal.classList.add('open');
    }
  }
  window.stabDuckWithKnife = stabDuckWithKnife;

  function applyTapeToDuck() {
    if (isDuckDeflating) {
      isDuckDeflating = false;
      deflationRemaining = 0;
      try {
        Storage.remove(DUCK_IS_DEFLATING_KEY);
        Storage.remove(DUCK_DEFLATING_REMAINING_KEY);
      } catch (e) {}
      updateDeflationUI();

      tapePatchSound();

      const rD = duck.getBoundingClientRect();
      const cx = rD.left + rD.width / 2;
      const cy = rD.top + rD.height / 2;

      particles.push({
        x: cx,
        y: cy - 35,
        vx: 0,
        vy: -140,
        size: 22,
        alpha: 2.2,
        text: '🩹 Утка починена и спасена!',
        color: '#38bdf8'
      });

      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 60 + Math.random() * 120;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 50,
          size: 16 + Math.random() * 8,
          alpha: 1.2,
          text: (i % 2 === 0) ? '✨' : '🩹',
          color: '#38bdf8'
        });
      }

      // Открываем и применяем скин с изолентой
      if (!ownedSkins.includes('patched')) {
        ownedSkins.push('patched');
        try { Storage.setJSON(OWNED_SKINS_KEY, ownedSkins); } catch (e) {}
      }
      applySkin('patched');

      hasPatchedDuck = true;
      try {
        Storage.set(HAS_PATCHED_DUCK_KEY, '1');
        Storage.set(STORAGE_PREFIX + 'emergency-surgery', '1');
      } catch (e) {}

      // Изолента после починки пропадает со стола и из инвентаря
      const tapeEl = document.getElementById('prop-tape');
      if (tapeEl) {
        tapeEl.style.display = 'none';
        delete tapeEl.dataset.placed;
      }
      if (placedProps && placedProps.tape) {
        delete placedProps.tape;
        try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
      }
      const tIdx = ownedProps.indexOf('tape');
      if (tIdx !== -1) {
        ownedProps.splice(tIdx, 1);
        window.ownedProps = ownedProps;
        try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
      }
      if (typeof renderShopBuyTab === 'function') renderShopBuyTab();
      if (typeof renderStorage === 'function') renderStorage();
      if (typeof updateShopButtonVisibility === 'function') updateShopButtonVisibility();

      tryUnlock();
    } else {
      if (ownedSkins.includes('patched')) {
        applySkin('patched');
        tapePatchSound();
        const rD = duck.getBoundingClientRect();
        particles.push({
          x: rD.left + rD.width / 2,
          y: rD.top - 20,
          vx: 0,
          vy: -100,
          size: 16,
          alpha: 1.2,
          text: '🩹 Синяя изолента на месте!',
          color: '#38bdf8'
        });
      } else {
        corkPopSound();
        const rD = duck.getBoundingClientRect();
        particles.push({
          x: rD.left + rD.width / 2,
          y: rD.top - 20,
          vx: 0,
          vy: -90,
          size: 15,
          alpha: 1.2,
          text: '💡 Утка целая, чинить не требуется!',
          color: '#bae6fd'
        });
      }
    }
  }
  window.applyTapeToDuck = applyTapeToDuck;

  function triggerDeflatedDuckGameOver() {
    isDuckDeflating = false;
    deflationRemaining = 0;
    isDeflatedDuckActive = true;
    try {
      Storage.remove(DUCK_IS_DEFLATING_KEY);
      Storage.remove(DUCK_DEFLATING_REMAINING_KEY);
    } catch (e) {}

    updateDeflationUI();

    const duckImg = document.getElementById('duckImg');
    const deflatedDuckView = document.getElementById('deflatedDuckView');
    if (duckImg) duckImg.style.display = 'none';
    if (deflatedDuckView) deflatedDuckView.style.display = 'flex';

    closeAllModals();
    const modal = document.getElementById('deflatedDuckModal');
    if (modal) modal.classList.add('open');
  }
  window.triggerDeflatedDuckGameOver = triggerDeflatedDuckGameOver;

  function restartFromDeflatedDuck() {
    hasStabbedDuck = true;
    try {
      Storage.set(HAS_STABBED_DUCK_KEY, '1');
      Storage.set(STORAGE_PREFIX + 'accident', '1');
    } catch (e) {}

    // Сброс игры с сохранением уже открытых ачивок
    resetAchievements(true);

    const modal = document.getElementById('deflatedDuckModal');
    if (modal) modal.classList.remove('open');

    isDeflatedDuckActive = false;
    isDuckDeflating = false;
    deflationRemaining = 0;
    try {
      Storage.remove(DUCK_IS_DEFLATING_KEY);
      Storage.remove(DUCK_DEFLATING_REMAINING_KEY);
    } catch (e) {}

    const duckImg = document.getElementById('duckImg');
    const deflatedDuckView = document.getElementById('deflatedDuckView');
    if (deflatedDuckView) deflatedDuckView.style.display = 'none';
    if (duckImg) duckImg.style.display = 'block';

    updateDeflationUI();

    // Разблокируем ачивку "Несчастный случай!"
    const accIdx = ACHIEVEMENTS.findIndex(a => a.id === 'accident');
    if (accIdx !== -1) {
      if (!ACHIEVEMENTS[accIdx].done) {
        ACHIEVEMENTS[accIdx].done = true;
        try { Storage.set(STORAGE_PREFIX + 'accident', '1'); } catch (e) {}
        showAchvToast(ACHIEVEMENTS[accIdx]);
        updateAchvCounter();
      } else {
        updateAchvCounter();
      }
    }
  }
  window.restartFromDeflatedDuck = restartFromDeflatedDuck;

  function cheatFastDeflate() {
    if (!isDuckDeflating) {
      stabDuckWithKnife(false);
    }
    deflationRemaining = 2;
    updateDeflationUI();
  }
  window.cheatFastDeflate = cheatFastDeflate;

  function cheatFastSpoil() {
    eggSpoilRemaining = 2;
    try { Storage.set(EGG_SPOIL_TIMER_KEY, '2'); } catch (e) {}
    updateEggSpoilTimerDisplay();
  }
  window.cheatFastSpoil = cheatFastSpoil;

  function cheatFastDebuff() {
    if (!isRottenEggActive) {
      spoilEggs();
    }
    rottenEggRotRemaining = 2;
  }
  window.cheatFastDebuff = cheatFastDebuff;

  function discardRottenEgg(explicitX, explicitY) {
    const rottenEggEl = document.getElementById('rottenEgg');
    if (!rottenEggEl || rottenEggEl.style.display === 'none') return;

    // Сначала измеряем координаты, пока элемент ещё отображается на странице (display: none сбрасывает getBoundingClientRect в 0, 0!)
    const rect = rottenEggEl.getBoundingClientRect();
    const trashEl = document.getElementById('prop-trashcan');
    const tRect = (trashEl && trashEl.style.display !== 'none') ? trashEl.getBoundingClientRect() : null;

    let spawnX = (typeof explicitX === 'number' && explicitX > 0) ? explicitX : (rect.left + rect.width / 2);
    let spawnY = (typeof explicitY === 'number' && explicitY > 0) ? explicitY : rect.top;

    // Резервная защита на случай нулевых координат (например если вызвано программно)
    if ((!spawnX || spawnX <= 0) && tRect) {
      spawnX = tRect.left + tRect.width / 2;
      spawnY = tRect.top + 25;
    } else if (!spawnX || spawnX <= 0) {
      spawnX = window.innerWidth / 2;
      spawnY = window.innerHeight / 2;
    }

    if (!isTrashcanOnTable()) {
      corkPopSound();
      particles.push({
        x: spawnX,
        y: spawnY - 10,
        vx: 0,
        vy: -100,
        size: 16,
        alpha: 1.6,
        text: '⚠️ Нужно мусорное ведро на столе, чтобы выбросить!',
        color: '#f87171'
      });
      return;
    }

    rottenEggEl.style.display = 'none';
    isRottenEggActive = false;
    rottenEggRotRemaining = 0;
    try {
      Storage.remove('duck-rotten-egg-active');
      Storage.remove('duck-rotten-rot-remaining');
    } catch (e) {}

    splatSound();

    // Текстовая частица подтверждения выброса
    particles.push({
      x: spawnX,
      y: spawnY - 15,
      vx: 0,
      vy: -95,
      size: 20,
      alpha: 1.4,
      text: '🗑️ Выброшено в мусорку!',
      color: '#a3e635'
    });

    // Эффектные частицы очистки
    const cleanItems = ['🗑️', '✨', '💨', '🟢', '✨'];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 110;
      particles.push({
        x: spawnX + (Math.random() - 0.5) * 20,
        y: spawnY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 50,
        size: 14 + Math.random() * 8,
        alpha: 1.1,
        text: cleanItems[Math.floor(Math.random() * cleanItems.length)],
        color: '#86efac'
      });
    }
  }
  window.discardRottenEgg = discardRottenEgg;

  const rottenEggEl = document.getElementById('rottenEgg');
  if (rottenEggEl) {
    let rDragging = false;
    let rStartX = 0, rStartY = 0;
    let rHasMoved = false;

    rottenEggEl.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      hidePropContextMenu();
      rDragging = true;
      rHasMoved = false;
      rottenEggEl.classList.add('is-dragging');
      rottenEggEl.classList.remove('is-wobbling');
      try { rottenEggEl.setPointerCapture(e.pointerId); } catch (err) {}
      const rect = rottenEggEl.getBoundingClientRect();
      rStartX = e.clientX - rect.left;
      rStartY = e.clientY - rect.top;
      e.stopPropagation();
    });

    rottenEggEl.addEventListener('pointermove', (e) => {
      if (!rDragging) return;
      rHasMoved = true;
      const x = e.clientX - rStartX;
      const y = e.clientY - rStartY;
      rottenEggEl.style.left = `${Math.max(0, Math.min(window.innerWidth - rottenEggEl.offsetWidth, x))}px`;
      rottenEggEl.style.top = `${Math.max(0, Math.min(window.innerHeight - rottenEggEl.offsetHeight, y))}px`;

      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) {
        const isHover = (typeof isCursorNearTrashcan === 'function')
          ? isCursorNearTrashcan(e.clientX, e.clientY, rottenEggEl)
          : (trashEl.style.display !== 'none' && e.clientX >= trashEl.getBoundingClientRect().left - 10 && e.clientX <= trashEl.getBoundingClientRect().right + 10 && e.clientY >= trashEl.getBoundingClientRect().top - 10 && e.clientY <= trashEl.getBoundingClientRect().bottom + 10);
        trashEl.classList.toggle('drag-target-hover', isHover);
      }
    });

    const endEggDrag = (e) => {
      if (!rDragging) return;
      rDragging = false;
      try { rottenEggEl.releasePointerCapture(e.pointerId); } catch (err) {}
      rottenEggEl.classList.remove('is-dragging');

      const cx = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : undefined;
      const cy = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : undefined;

      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) trashEl.classList.remove('drag-target-hover');
      let isOverTrash = false;
      if (typeof isCursorNearTrashcan === 'function') {
        isOverTrash = isCursorNearTrashcan(cx, cy, rottenEggEl);
      } else if (trashEl && trashEl.style.display !== 'none' && cx !== undefined && cy !== undefined) {
        const trRect = trashEl.getBoundingClientRect();
        isOverTrash = (cx >= trRect.left - 20 && cx <= trRect.right + 20 && cy >= trRect.top - 20 && cy <= trRect.bottom + 20);
      }

      if (isOverTrash && rHasMoved) {
        // Успешный сброс в мусорку перетаскиванием
        discardRottenEgg(cx, cy);
      } else {
        // Если отпущено не над мусоркой или если это был простой клик без перетаскивания — яйцо НЕ выбрасывается!
        if (rHasMoved) {
          rottenEggEl.classList.add('is-wobbling');
          setTimeout(() => rottenEggEl.classList.remove('is-wobbling'), 650);
        } else {
          // Обычный короткий клик без переноса: подсказка игроку
          corkPopSound();
          const rect = rottenEggEl.getBoundingClientRect();
          particles.push({
            x: rect.left + rect.width / 2,
            y: rect.top - 12,
            vx: 0,
            vy: -80,
            size: 15,
            alpha: 1.5,
            text: '💡 Перетащи в мусорку или нажми ПКМ!',
            color: '#a3e635'
          });
        }
      }
    };

    rottenEggEl.addEventListener('pointerup', endEggDrag);
    rottenEggEl.addEventListener('pointercancel', endEggDrag);
    rottenEggEl.addEventListener('click', (e) => {
      e.stopPropagation();
      // Обычный клик ЛКМ не выбрасывает яйцо
    });

    rottenEggEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const rect = rottenEggEl.getBoundingClientRect();
      const posX = e.clientX || (rect.left + rect.width / 2);
      const posY = e.clientY || (rect.top + rect.height / 2);
      showEggContextMenu('rotten', posX, posY);
    });
  }

  const spoilAlertCloseBtn = document.getElementById('eggSpoilAlertClose');
  if (spoilAlertCloseBtn) {
    spoilAlertCloseBtn.addEventListener('click', () => {
      const alertEl = document.getElementById('eggSpoilAlert');
      if (alertEl) alertEl.style.display = 'none';
    });
  }
