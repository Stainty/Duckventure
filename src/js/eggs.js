/* ---------- Система яиц (Мама Утка) ---------- */
  function checkEggRoll(fromClick = false) {
    // «Мама Утка» открывается на «Возможности» LVL 3
    if (upgradeLevels.features < 3) return;

    const hadNoEggs = !hasAnyEggsOnPlayer();
    const roll = Math.random();
    // С шансом 0.5% золотое яйцо
    if (roll < 0.005) {
      addEggBatch('golden', 1);
      xpSound();
      return;
    }
    // С шансом 10% обычное яйцо (0.005 + 0.10 = 0.105)
    if (roll < 0.105) {
      addEggBatch('normal', 1);
      corkPopSound();
    }
  }

  function updateEggsDisplay(bump = false, which = null) {
    const eggsBar = document.getElementById('eggsBar');
    const normalVal = document.getElementById('normalEggsVal');
    const goldenVal = document.getElementById('goldenEggsVal');
    const normalEggEl = document.getElementById('normalEgg');
    const goldenEggEl = document.getElementById('goldenEgg');

    // Бар яиц под даклями (скрыт до Возможности LVL 3, либо при наличии жареных уток/яиц)
    if (eggsBar) {
      const hasAnyRoast = (typeof hasCookedGoose !== 'undefined' && hasCookedGoose) ||
                          (typeof normalRoastedGeese !== 'undefined' && normalRoastedGeese > 0) ||
                          (typeof goldenRoastedGeese !== 'undefined' && goldenRoastedGeese > 0);
      if (upgradeLevels.features >= 3 || hasAnyRoast) {
        eggsBar.style.display = 'inline-flex';
      } else {
        eggsBar.style.display = 'none';
      }
    }

    if (normalVal) normalVal.textContent = normalEggs.toLocaleString('ru-RU');
    if (goldenVal) goldenVal.textContent = goldenEggs.toLocaleString('ru-RU');

    // На экране может быть только один эмодзи обычного яйца и один золотого яйца,
    // если яиц 0 они не отображаются
    if (normalEggEl) {
      if (normalEggs > 0) {
        normalEggEl.style.display = 'block';
        if (!normalEggEl.dataset.placed) {
          const r = duck.getBoundingClientRect();
          normalEggEl.style.left = `${Math.max(10, r.left - 45)}px`;
          normalEggEl.style.top = `${Math.min(window.innerHeight - 80, r.bottom - 40)}px`;
          normalEggEl.dataset.placed = '1';
        }
      } else {
        normalEggEl.style.display = 'none';
        delete normalEggEl.dataset.placed;
      }
    }

    if (goldenEggEl) {
      if (goldenEggs > 0) {
        goldenEggEl.style.display = 'block';
        if (!goldenEggEl.dataset.placed) {
          const r = duck.getBoundingClientRect();
          goldenEggEl.style.left = `${Math.max(10, r.left - 100)}px`;
          goldenEggEl.style.top = `${Math.min(window.innerHeight - 90, r.bottom - 30)}px`;
          goldenEggEl.dataset.placed = '1';
        }
      } else {
        goldenEggEl.style.display = 'none';
        delete goldenEggEl.dataset.placed;
      }
    }

    // Новая валюта: жареные яйца (до первой прожарки скрыты)
    const friedVal = document.getElementById('friedEggsVal');
    const goldenFriedVal = document.getElementById('goldenFriedEggsVal');
    const friedItem = document.getElementById('friedEggsBarItem');
    const goldenFriedItem = document.getElementById('goldenFriedEggsBarItem');
    const friedEggEl = document.getElementById('friedEgg');
    const goldenFriedEggEl = document.getElementById('goldenFriedEgg');

    if (hasUnlockedFriedEggs) {
      if (friedItem) friedItem.style.display = 'inline-flex';
      if (friedVal) friedVal.textContent = friedEggs.toLocaleString('ru-RU');
      if (goldenFriedItem) goldenFriedItem.style.display = 'inline-flex';
      if (goldenFriedVal) goldenFriedVal.textContent = goldenFriedEggs.toLocaleString('ru-RU');
    } else {
      if (friedItem) friedItem.style.display = 'none';
      if (goldenFriedItem) goldenFriedItem.style.display = 'none';
    }

    // Отображение жареной и золотой жареной утки в баре (механика идентична жареным яйцам)
    const roastedDucksVal = document.getElementById('roastedDucksVal');
    const goldenRoastedDucksVal = document.getElementById('goldenRoastedDucksVal');
    const roastedDucksItem = document.getElementById('roastedDucksBarItem');
    const goldenRoastedDucksItem = document.getElementById('goldenRoastedDucksBarItem');

    const showRoasted = (typeof hasCookedGoose !== 'undefined' && hasCookedGoose) ||
                        (typeof normalRoastedGeese !== 'undefined' && normalRoastedGeese > 0) ||
                        (typeof goldenRoastedGeese !== 'undefined' && goldenRoastedGeese > 0);

    if (showRoasted) {
      if (roastedDucksItem) {
        roastedDucksItem.style.display = 'inline-flex';
        if (roastedDucksVal) roastedDucksVal.textContent = (typeof normalRoastedGeese !== 'undefined' ? normalRoastedGeese : 0).toLocaleString('ru-RU');
      }
      if (goldenRoastedDucksItem) {
        goldenRoastedDucksItem.style.display = 'inline-flex';
        if (goldenRoastedDucksVal) goldenRoastedDucksVal.textContent = (typeof goldenRoastedGeese !== 'undefined' ? goldenRoastedGeese : 0).toLocaleString('ru-RU');
      }
    } else {
      if (roastedDucksItem) roastedDucksItem.style.display = 'none';
      if (goldenRoastedDucksItem) goldenRoastedDucksItem.style.display = 'none';
    }

    // Одно эмодзи жареного яйца на столе
    if (friedEggEl) {
      if (friedEggs > 0) {
        friedEggEl.style.display = 'block';
        if (!friedEggEl.dataset.placed) {
          const plitaEl = document.getElementById('prop-plita');
          if (plitaEl && plitaEl.style.display !== 'none') {
            const pRect = plitaEl.getBoundingClientRect();
            friedEggEl.style.left = `${Math.min(window.innerWidth - 65, Math.max(10, pRect.right + 12))}px`;
            friedEggEl.style.top = `${Math.min(window.innerHeight - 65, Math.max(10, pRect.top + 8))}px`;
          } else {
            const r = duck.getBoundingClientRect();
            friedEggEl.style.left = `${Math.min(window.innerWidth - 65, r.right + 20)}px`;
            friedEggEl.style.top = `${Math.min(window.innerHeight - 65, r.bottom - 40)}px`;
          }
          friedEggEl.dataset.placed = '1';
        }
      } else {
        friedEggEl.style.display = 'none';
        delete friedEggEl.dataset.placed;
      }
    }

    // Одно эмодзи золотого жареного яйца на столе
    if (goldenFriedEggEl) {
      if (goldenFriedEggs > 0) {
        goldenFriedEggEl.style.display = 'block';
        if (!goldenFriedEggEl.dataset.placed) {
          const plitaEl = document.getElementById('prop-plita');
          if (plitaEl && plitaEl.style.display !== 'none') {
            const pRect = plitaEl.getBoundingClientRect();
            goldenFriedEggEl.style.left = `${Math.min(window.innerWidth - 75, Math.max(10, pRect.right + 12))}px`;
            goldenFriedEggEl.style.top = `${Math.min(window.innerHeight - 75, Math.max(10, pRect.top + 55))}px`;
          } else {
            const r = duck.getBoundingClientRect();
            goldenFriedEggEl.style.left = `${Math.min(window.innerWidth - 75, r.right + 65)}px`;
            goldenFriedEggEl.style.top = `${Math.min(window.innerHeight - 75, r.bottom - 40)}px`;
          }
          goldenFriedEggEl.dataset.placed = '1';
        }
      } else {
        goldenFriedEggEl.style.display = 'none';
        delete goldenFriedEggEl.dataset.placed;
      }
    }

    if (bump && which) {
      let bEl = null;
      if (which === 'normal') bEl = document.getElementById('normalEggsBarItem');
      else if (which === 'golden') bEl = document.getElementById('goldenEggsBarItem');
      else if (which === 'fried') bEl = friedItem;
      else if (which === 'goldenFried') bEl = goldenFriedItem;
      else if (which === 'roastedDuck' || which === 'roastedGoose') bEl = roastedDucksItem;
      else if (which === 'goldenRoastedDuck' || which === 'goldenRoastedGoose') bEl = goldenRoastedDucksItem;

      if (bEl) {
        bEl.classList.remove('pop');
        void bEl.offsetWidth;
        bEl.classList.add('pop');
        setTimeout(() => bEl.classList.remove('pop'), 200);
      }
    }

    updateEggSpoilTimerDisplay();
    updateShopSellTab();
  }

  function isOverlapping(r1, r2) {
    return !(r2.left > r1.right ||
             r2.right < r1.left ||
             r2.top > r1.bottom ||
             r2.bottom < r1.top);
  }
  window.isOverlapping = isOverlapping;

  function cookEggsOnStove(type) {
    const plitaEl = document.getElementById('prop-plita');
    const rect = plitaEl ? plitaEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 80, height: 80 };
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 - 20;

    if (type === 'normal') {
      if (normalEggs <= 0) return;
      const count = cookEggBatches('normal', 'fried');
      hasUnlockedFriedEggs = true;
      hasCookedEgg = true;

      try {
        Storage.set(HAS_FRIED_KEY, '1');
        Storage.set(COOKED_EGG_KEY, '1');
      } catch (e) {}

      sizzleSound(false);

      // Спавним эмодзи жареного яйца возле плиты (если его еще нет на столе)
      const friedEggEl = document.getElementById('friedEgg');
      if (friedEggEl && plitaEl) {
        const isAlreadyOnDesk = friedEggEl.dataset.placed && friedEggEl.style.display !== 'none';
        if (!isAlreadyOnDesk) {
          const pRect = plitaEl.getBoundingClientRect();
          const posX = Math.min(window.innerWidth - 65, Math.max(10, pRect.right + 12));
          const posY = Math.min(window.innerHeight - 65, Math.max(10, pRect.top + 8));
          friedEggEl.style.left = `${posX}px`;
          friedEggEl.style.top = `${posY}px`;
          friedEggEl.dataset.placed = '1';
        }
        friedEggEl.style.display = 'block';
      }

      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 0.15) + Math.random() * (Math.PI * 0.7);
        const spd = 30 + Math.random() * 100;
        particles.push({
          x: centerX + (Math.random() * 40 - 20),
          y: centerY + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * spd * (Math.random() < 0.5 ? 1 : -1),
          vy: -Math.sin(angle) * spd,
          size: 14 + Math.random() * 10,
          alpha: 1.0,
          text: Math.random() < 0.4 ? '🔥' : (Math.random() < 0.7 ? '💨' : '🍳'),
          color: '#ff7700'
        });
      }

      particles.push({
        x: centerX,
        y: centerY - 45,
        vx: 0,
        vy: -80,
        size: 24,
        alpha: 1.3,
        text: `🍳 Пожарено: +${count} шт.!`,
        color: '#facc15'
      });

      updateEggsDisplay(true, 'normal');
      updateShopSellTab();
      tryUnlock();
    } else if (type === 'golden') {
      if (goldenEggs <= 0) return;
      const count = cookEggBatches('golden', 'goldenFried');
      hasUnlockedFriedEggs = true;
      hasCookedEgg = true;

      try {
        Storage.set(HAS_FRIED_KEY, '1');
        Storage.set(COOKED_EGG_KEY, '1');
      } catch (e) {}

      sizzleSound(true);

      // Спавним эмодзи золотого жареного яйца возле плиты (если его еще нет на столе)
      const goldenFriedEggEl = document.getElementById('goldenFriedEgg');
      if (goldenFriedEggEl && plitaEl) {
        const isAlreadyOnDesk = goldenFriedEggEl.dataset.placed && goldenFriedEggEl.style.display !== 'none';
        if (!isAlreadyOnDesk) {
          const pRect = plitaEl.getBoundingClientRect();
          const posX = Math.min(window.innerWidth - 75, Math.max(10, pRect.right + 12));
          const posY = Math.min(window.innerHeight - 75, Math.max(10, pRect.top + 55));
          goldenFriedEggEl.style.left = `${posX}px`;
          goldenFriedEggEl.style.top = `${posY}px`;
          goldenFriedEggEl.dataset.placed = '1';
        }
        goldenFriedEggEl.style.display = 'block';
      }

      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 0.15) + Math.random() * (Math.PI * 0.7);
        const spd = 40 + Math.random() * 120;
        particles.push({
          x: centerX + (Math.random() * 40 - 20),
          y: centerY + (Math.random() * 20 - 10),
          vx: Math.cos(angle) * spd * (Math.random() < 0.5 ? 1 : -1),
          vy: -Math.sin(angle) * spd,
          size: 16 + Math.random() * 12,
          alpha: 1.1,
          text: Math.random() < 0.4 ? '🔥' : '🍳',
          color: '#fde047'
        });
      }

      particles.push({
        x: centerX,
        y: centerY - 45,
        vx: 0,
        vy: -80,
        size: 26,
        alpha: 1.4,
        text: `🍳 ЗОЛОТАЯ ПРОЖАРКА: +${count} шт.!`,
        color: '#ffd700'
      });

      updateEggsDisplay(true, 'golden');
      updateShopSellTab();
      tryUnlock();
    }
  }
  window.cookEggsOnStove = cookEggsOnStove;

  function smashEgg(el, typeOrIsGolden, cursorX, cursorY) {
    let eggType = 'normal';
    if (typeOrIsGolden === true || typeOrIsGolden === 'golden') eggType = 'golden';
    // Жареные яйца не могут быть разбиты
    if (eggType !== 'normal' && eggType !== 'golden') return;

    let count = (eggType === 'golden') ? goldenEggs : normalEggs;
    if (count <= 0) return;

    let cx = cursorX;
    let cy = cursorY;
    if (typeof cx !== 'number' || isNaN(cx) || typeof cy !== 'number' || isNaN(cy)) {
      const rect = el.getBoundingClientRect();
      cx = (rect.left || (window.innerWidth / 2)) + (rect.width ? rect.width / 2 : 0);
      cy = (rect.top || (window.innerHeight / 2)) + (rect.height ? rect.height / 2 : 0);
    }

    if (eggType === 'golden') {
      removeEggsFromBatches('golden', goldenEggs);
    } else {
      removeEggsFromBatches('normal', normalEggs);
    }

    hasSmashedEggs = true;
    try { Storage.set(HAS_SMASHED_EGGS_KEY, '1'); } catch (e) {}

    if (!hasAnyEggsOnPlayer()) {
      resetEggSpoilTimer();
    }
    splatSound();
    updateEggsDisplay();
    updateShopSellTab();
    tryUnlock();

    let noticeText = `💥 Обычные яйца разбились вдребезги! (${count.toLocaleString('ru-RU')} шт.)`;
    let color = '#ff4d4d';
    if (eggType === 'golden') {
      noticeText = `💥 Золотые яйца разбились вдребезги! (${count.toLocaleString('ru-RU')} шт.)`;
      color = '#ffd700';
    }

    particles.push({
      x: cx,
      y: cy - 25,
      vx: 0,
      vy: -130,
      size: 22,
      alpha: 2.2,
      text: noticeText,
      color: color
    });

    const isGold = (eggType === 'golden' || eggType === 'goldenFried');
    const splashItems = isGold
      ? ['✨', '🍳', '🟡', '🥚', '💥', '⭐', '✨']
      : ['🍳', '🟡', '🥚', '💥', '💧', '🥚', '🟡'];

    for (let i = 0; i < splashItems.length * 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 100 + Math.random() * 320;
      particles.push({
        x: cx + (Math.random() - 0.5) * 20,
        y: cy + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 80,
        size: 16 + Math.random() * 14,
        alpha: 1.2 + Math.random() * 0.6,
        text: splashItems[Math.floor(Math.random() * splashItems.length)],
        color: isGold ? '#ffd700' : '#ffffff'
      });
    }
  }
  window.smashEgg = smashEgg;

/* ---------- Механика свежести и порчи яиц (30 сек база, 60 сек с холодильником) ---------- */
  function isClockOnTable() {
    return ownedProps.includes('clock') && !!placedProps['clock'] && document.getElementById('prop-clock')?.style.display !== 'none';
  }
  window.isClockOnTable = isClockOnTable;

  function isTrashcanOnTable() {
    return ownedProps.includes('trashcan') && !!placedProps['trashcan'] && document.getElementById('prop-trashcan')?.style.display !== 'none';
  }
  window.isTrashcanOnTable = isTrashcanOnTable;

  let isRottenEggActive = false;
  let rottenEggRotRemaining = 120; // 2 мин (120 сек) до дебаффа
  let stinkDebuffRemaining = 0; // 2 минуты (120 сек) дебаффа

  function isStinkDebuffActive() {
    return stinkDebuffRemaining > 0;
  }
  window.isStinkDebuffActive = isStinkDebuffActive;

  function applyStinkDebuff(durationSec = 120) {
    stinkDebuffRemaining = durationSec;
    try { Storage.set('duck-stink-debuff-remaining', String(stinkDebuffRemaining)); } catch (e) {}
    rottenEggSound();
    updateStinkDebuffUI();
    updateAutoQuackTimer();

    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 30,
      vx: 0,
      vy: -120,
      size: 22,
      alpha: 2.2,
      text: '🤢 Вонь от протухших яиц! Дебафф -50% на 2 мин!',
      color: '#84cc16'
    });
  }
  window.applyStinkDebuff = applyStinkDebuff;

  function clearStinkDebuff() {
    if (stinkDebuffRemaining > 0) {
      stinkDebuffRemaining = 0;
      try { Storage.remove('duck-stink-debuff-remaining'); } catch (e) {}
      updateStinkDebuffUI();
      updateAutoQuackTimer();
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -110,
        size: 20,
        alpha: 1.5,
        text: '✨ Запах выветрился! Все характеристики восстановлены!',
        color: '#4ade80'
      });
    }
  }
  window.clearStinkDebuff = clearStinkDebuff;

  function updateStinkDebuffUI() {
    const badge = document.getElementById('duckDebuffBadge');
    const timerSpan = document.getElementById('duckDebuffTimer');
    const duckEl = document.getElementById('duck');

    if (stinkDebuffRemaining > 0) {
      if (duckEl) duckEl.classList.add('has-stink-debuff');
      if (badge) {
        badge.style.display = 'flex';
        if (timerSpan) {
          const m = Math.floor(stinkDebuffRemaining / 60);
          const s = Math.ceil(stinkDebuffRemaining % 60);
          timerSpan.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          timerSpan.style.display = 'inline-block';
        }
      }
    } else {
      if (duckEl) duckEl.classList.remove('has-stink-debuff');
      if (badge) badge.style.display = 'none';
    }
  }
  window.updateStinkDebuffUI = updateStinkDebuffUI;

  function hasAnyEggsOnPlayer() {
    return (normalEggs > 0 || goldenEggs > 0 || friedEggs > 0 || goldenFriedEggs > 0);
  }

  function updateEggSpoilTimerDisplay() {
    const timerItem = document.getElementById('eggSpoilTimerItem');
    const timerIcon = document.getElementById('eggSpoilTimerIcon');
    const timerText = document.getElementById('eggSpoilTimerText');
    if (!timerItem || !timerIcon || !timerText) return;

    const hasEggs = hasAnyEggsOnPlayer();
    if (upgradeLevels.features < 3 || !hasEggs || !isClockOnTable()) {
      timerItem.style.display = 'none';
      return;
    }

    timerItem.style.display = 'inline-flex';

    const mins = Math.floor(eggSpoilRemaining / 60);
    const secs = eggSpoilRemaining % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerText.textContent = formatted;

    const isPaused = typeof isAnyModalOpen === 'function' && isAnyModalOpen();
    if (isPaused) {
      timerItem.classList.add('paused');
      timerItem.title = '⏸️ Таймер свежести яиц на паузе (открыто меню)';
    } else {
      timerItem.classList.remove('paused');
    }

    if (isFridgeOn) {
      timerItem.classList.add('fridge');
      timerItem.classList.remove('warning');
      timerIcon.textContent = '❄️';
      if (!isPaused) timerItem.title = 'Холодильник включён (+30 сек свежести, до 60 сек)';
    } else {
      timerItem.classList.remove('fridge');
      timerIcon.textContent = '⏱️';
      if (!isPaused) timerItem.title = 'Время до порчи яиц на столе (30 сек)';
      if (eggSpoilRemaining <= 10 && !isPaused) {
        timerItem.classList.add('warning');
      } else {
        timerItem.classList.remove('warning');
      }
    }
  }
  window.updateEggSpoilTimerDisplay = updateEggSpoilTimerDisplay;

  function resetEggSpoilTimer() {
    eggSpoilRemaining = isFridgeOn ? 60 : 30;
    try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
    updateEggSpoilTimerDisplay();
  }
  window.resetEggSpoilTimer = resetEggSpoilTimer;

  function spoilEggs() {
    if (eggBatches && eggBatches.length > 0) {
      spoilEggBatches(eggBatches.slice());
      return;
    }
    const spoiledCount = normalEggs + goldenEggs + friedEggs + goldenFriedEggs;
    if (spoiledCount <= 0) return;

    normalEggs = 0;
    goldenEggs = 0;
    friedEggs = 0;
    goldenFriedEggs = 0;
    eggSpoilRemaining = isFridgeOn ? 60 : 30;
    try {
      Storage.set(EGGS_NORMAL_KEY, '0');
      Storage.set(EGGS_GOLDEN_KEY, '0');
      Storage.set(FRIED_EGGS_KEY, '0');
      Storage.set(GOLDEN_FRIED_EGGS_KEY, '0');
      Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining));
    } catch (e) {}

    updateEggsDisplay();
    updateShopSellTab();
    rottenEggSound();

    isRottenEggActive = true;
    rottenEggRotRemaining = 120;
    try {
      Storage.set('duck-rotten-egg-active', '1');
      Storage.set('duck-rotten-rot-remaining', '120');
    } catch (e) {}

    const rottenEggEl = document.getElementById('rottenEgg');
    if (rottenEggEl) {
      const r = duck.getBoundingClientRect();
      rottenEggEl.style.left = `${Math.max(10, r.left - 50)}px`;
      rottenEggEl.style.top = `${Math.min(window.innerHeight - 80, r.bottom - 40)}px`;
      rottenEggEl.style.display = 'block';
    }

    showEggSpoilAlert();

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    particles.push({
      x: cx,
      y: cy - 30,
      vx: 0,
      vy: -110,
      size: 22,
      alpha: 2.0,
      text: `🤢 Яйца протухли! (-${spoiledCount.toLocaleString('ru-RU')} шт.)`,
      color: '#84cc16'
    });

    const stinkItems = ['🤢', '💨', '🟢', '🪰', '💀', '💩', '💨'];
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 60 + Math.random() * 180;
      particles.push({
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 60,
        size: 16 + Math.random() * 14,
        alpha: 1.3,
        text: stinkItems[Math.floor(Math.random() * stinkItems.length)],
        color: '#84cc16'
      });
    }
  }
  window.spoilEggs = spoilEggs;

  const EGG_SPOIL_ALERT_COOLDOWN_MS = 30000; // Кулдаун 30 секунд между показами подсказки

  function showEggSpoilAlert() {
    const now = Date.now();
    if (now - lastEggSpoilAlertTime < EGG_SPOIL_ALERT_COOLDOWN_MS) return;
    lastEggSpoilAlertTime = now;
    window.lastEggSpoilAlertTime = lastEggSpoilAlertTime;

    const alertEl = document.getElementById('eggSpoilAlert');
    if (!alertEl) return;
    const hintEl = document.getElementById('gameHintAlert');
    if (hintEl) hintEl.style.display = 'none';
    alertEl.style.display = 'flex';
    if (eggSpoilAlertTimeout) clearTimeout(eggSpoilAlertTimeout);
    eggSpoilAlertTimeout = setTimeout(() => {
      alertEl.style.display = 'none';
    }, 12000);
  }
  window.showEggSpoilAlert = showEggSpoilAlert;
