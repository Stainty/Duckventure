/* ---------- ачивки ---------- */
  const ACHIEVEMENTS = [
    {
      id: 'first-quack',
      name: 'Первый кря!',
      desc: 'Нажмите один раз на утку',
      done: false,
      check: () => quackCount >= 1,
    },
    {
      id: 'thousand-quacks',
      name: 'Тебе делать нечего?',
      desc: 'Нажмите 1000! раз на утку',
      done: false,
      check: () => quackCount >= 1000,
    },
    {
      id: 'mimambo',
      name: 'Мимамбо!',
      desc: 'Нажать, но не туда...',
      done: false,
      check: () => hintCount >= 1,
    },
    {
      id: 'type-key',
      name: 'Печатать не нужно!',
      desc: 'Или нужно?',
      done: false,
      check: () => keyPressed,
    },
    {
      id: 'i-am-duck',
      name: 'Я и есть утка',
      desc: 'КРЯ!',
      done: false,
      check: () => duckSeqDone,
    },
    {
      id: 'hack-locked',
      name: 'Взлом жопы!',
      desc: 'Так просто?',
      done: false,
      check: () => lockedCardClicked,
    },
    {
      id: 'hacker',
      name: 'Хакер',
      desc: 'Самый умный?',
      done: false,
      check: () => devToolsOpened,
    },
    {
      id: 'bad-boy',
      name: 'Поганец!',
      desc: 'Тебя что мама не воспитывала?',
      done: false,
      check: () => badWordsTyped,
    },
    {
      id: 'long-wait',
      name: 'Томное ожидание',
      desc: 'А жмать то будешь?',
      done: false,
      check: () => hoverWaitDone,
    },
    {
      id: 'automation',
      name: 'Автоматизация!',
      desc: 'Купите автокрякалку',
      done: false,
      check: () => upgradeLevels.features >= 1,
    },
    {
      id: 'shopping',
      name: 'Шоппинг',
      desc: 'Открыть магазин',
      done: false,
      check: () => upgradeLevels.features >= 2,
    },
    {
      id: 'mama',
      name: 'Мама!?',
      desc: 'Научите утку нести яйца',
      done: false,
      check: () => upgradeLevels.features >= 3,
    },
    {
      id: 'fry-egg',
      name: 'Прожарка',
      desc: 'Пожарьте яйцо',
      done: false,
      check: () => hasCookedEgg,
    },
    {
      id: 'bad-idea',
      name: 'Это было зря!',
      desc: 'Завести новых друзей',
      done: false,
      check: () => hasPlacedFridge,
    },
    {
      id: 'freedom-smell',
      name: 'Запах свободы',
      desc: 'Избавьтесь от тараканов',
      done: false,
      check: () => hasUsedDichlofos,
    },
    {
      id: 'max-power',
      name: 'MAX POWER!!!',
      desc: 'Достигните 20 уровня',
      done: false,
      check: () => playerLevel >= 20,
    },
    {
      id: 'hands-remember',
      name: 'Руки помнят!',
      desc: 'О щит хир ви гоу эгейн',
      done: false,
      check: () => gtaCheatTyped,
    },
    {
      id: 'almost-beast',
      name: 'Почти число зверя!',
      desc: 'Drochila Remedy Detected',
      done: false,
      check: () => beastNumberTyped,
    },
    {
      id: 'move-duck',
      name: 'Переезд',
      desc: 'Переместите утку',
      done: false,
      check: () => hasMovedDuck,
    },
    {
      id: 'egg-smash',
      name: 'Всмятку!',
      desc: 'Разбить яйца неосторожным броском',
      done: false,
      check: () => hasSmashedEggs,
    },
    {
      id: 'monster',
      name: 'Ты монстр!',
      desc: 'Зажарить маму утку',
      done: false,
      check: () => hasFriedDuck,
    },
    {
      id: 'accident',
      name: 'Несчастный случай!',
      desc: 'Зарежьте утку',
      done: false,
      check: () => hasStabbedDuck,
    },
    {
      id: 'new-generation',
      name: 'Новое поколение',
      desc: 'Вырастите утенка',
      done: false,
      check: () => hasHatchedDuckling,
    },
    {
      id: 'crispy-duckling',
      name: 'Хрустящий утенок',
      desc: 'Зажарьте маленького утенка',
      done: false,
      check: () => hasFriedDuckling,
    },
    {
      id: 'roasted-goose',
      name: 'Рождественская утка',
      desc: 'Зажарьте большую утку',
      done: false,
      check: () => hasCookedGoose,
    },
    {
      id: 'emergency-surgery',
      name: 'Неотложная операция!',
      desc: 'Почините утку',
      done: false,
      check: () => hasPatchedDuck,
    },
      {
      id: 'universal-key',
      name: 'Универсальный ключ',
      desc: 'Откройте ачивку с помощью ключа',
      done: false,
      check: () => hasUnlockedWithKey,
    },
  ];
  window.ACHIEVEMENTS = ACHIEVEMENTS;

  function updateAchvCounter() {
    const counter = document.getElementById('achvModalCounter');
    if (counter) {
      const unlockedCount = ACHIEVEMENTS.filter(a => a.done).length;
      counter.textContent = `(${unlockedCount}/${ACHIEVEMENTS.length})`;
    }
  }

  function buildAchievementCards() {
    const list = document.getElementById('achvList');
    if (!list) return;
    list.innerHTML = '';
    ACHIEVEMENTS.forEach((a) => {
      try {
        if (a.id === 'monster' && hasFriedDuck) {
          a.done = true;
        } else if (a.id === 'accident' && hasStabbedDuck) {
          a.done = true;
        } else {
          a.done = Storage.getBoolean(STORAGE_PREFIX + a.id, false);
        }
      } catch (e) {
        a.done = (a.id === 'monster' && hasFriedDuck) || (a.id === 'accident' && hasStabbedDuck);
      }
      const card = document.createElement('div');
      card.id = 'achv-card-' + a.id;
      card.className = 'achv-card' + (a.done ? ' unlocked' : '');
      card.innerHTML =
        '<span class="achv-padlock" id="achv-padlock-' + a.id + '" aria-hidden="true">🔒</span>' +
        '<div class="achv-info' + (a.done ? ' shown' : '') + '" id="achv-info-' + a.id + '" aria-live="polite">' +
          '<div class="achv-name">' + a.name + '</div>' +
          '<div class="achv-desc">' + a.desc + '</div>' +
        '</div>';
      list.appendChild(card);
      if (a.done) {
        const padlock = document.getElementById('achv-padlock-' + a.id);
        if (padlock) padlock.style.display = 'none';
      }
    });
    updateAchvCounter();
  }

  function resetAchievements(preserveAchievements = false) {
    closeAllModals();
    const list = document.getElementById('achvList');
    if (list) list.innerHTML = '';
    const toastContainer = document.getElementById('achvToastContainer');
    if (toastContainer) {
      toastContainer.innerHTML = '';
      toastContainer.classList.remove('over-modal');
    }
    const pCanvas = document.getElementById('particles');
    if (pCanvas) pCanvas.classList.remove('over-modal');
    quackCount = 0;
    setDuckles(0, true);
    hintCount = 0;
    playerLevel = 1;
    playerExp = 0;
    normalEggs = 0;
    goldenEggs = 0;
    friedEggs = 0;
    goldenFriedEggs = 0;
    eggBatches = [];
    try { Storage.remove('duck-egg-batches'); } catch (e) {}
    hasUnlockedFriedEggs = false;
    hasCookedEgg = false;
    isStoveCombined = false;
    hasPlacedFridge = false;
    isRoachesActive = false;
    hasUsedDichlofos = false;
    hasClearedRoaches = false;
    hasMovedDuck = false;
    hasSpawnedKey = false;
    hasSmashedEggs = false;
    hasPatchedDuck = false;
    isDuckDeflating = false;
    deflationRemaining = 0;
    isDeflatedDuckActive = false;
    hasHatchedDuckling = false;
    hasHatchedGoldenDuckling = false;
    Storage.remove(HAS_HATCHED_GOLDEN_DUCKLING_KEY);
    hasFriedDuckling = false;
    hasCookedGoose = false;
    isIncubating = false;
    incubatingRemaining = 120;
    incubatingCount = 1;
    creatureOnDesk = null;
    ducklingGrowRemaining = 600;
    const cheatPanelEl = document.getElementById('cheatPanel');
    if (cheatPanelEl) cheatPanelEl.classList.remove('visible');
    try { Storage.remove(CHEAT_PANEL_KEY); } catch (e) {}
    businessesState = {};
    window.businessesState = businessesState;
    try { Storage.remove(BUSINESSES_STATE_KEY); } catch (e) {}
    updateBranchesButtonUI();
    normalDucklings = 0;
    goldenDucklings = 0;
    normalGeese = 0;
    goldenGeese = 0;
    normalRoastedGeese = 0;
    goldenRoastedGeese = 0;
    stopRoaches();
    upgradeLevels = { autoquack: 0, speed: 0, crit: 0, strength: 0, features: 0 };
    ownedSkins = ['default'];
    currentSkin = 'default';
    ownedProps = [];
    placedProps = {};
    keyPressed = false;
    duckSeqDone = false;
    duckSeqIndex = 0;
    lockedCardClicked = false;
    devToolsOpened = false;
    badWordsTyped = false;
    gtaCheatTyped = false;
    beastNumberTyped = false;
    hoverWaitDone = false;
    clearHoverTimer();
    charBuffer = '';
    codeBuffer = '';
    try {
      Storage.remove(QUACK_KEY);
      Storage.remove(DUCKLES_KEY);
      Storage.remove(HINT_KEY);
      Storage.remove(KEY_PRESSED_KEY);
      Storage.remove(SEQ_DONE_KEY);
      Storage.remove(LOCKED_CLICKED_KEY);
      Storage.remove(DEVTOOLS_KEY);
      Storage.remove(BAD_WORDS_KEY);
      Storage.remove(GTA_CHEAT_KEY);
      Storage.remove(BEAST_NUMBER_KEY);
      Storage.remove(HOVER_WAIT_KEY);
      Storage.remove(LEVEL_KEY);
      Storage.remove(EXP_KEY);
      Storage.remove(EGGS_NORMAL_KEY);
      Storage.remove(EGGS_GOLDEN_KEY);
      Storage.remove(FRIED_EGGS_KEY);
      Storage.remove(GOLDEN_FRIED_EGGS_KEY);
      Storage.remove(HAS_FRIED_KEY);
      Storage.remove(COOKED_EGG_KEY);
      Storage.remove(STOVE_COMBINED_KEY);
      Storage.remove(PLACED_FRIDGE_KEY);
      Storage.remove(ROACHES_ACTIVE_KEY);
      Storage.remove(USED_DICHLOFOS_KEY);
      Storage.remove(CLEARED_ROACHES_KEY);
      Storage.remove(MOVED_DUCK_KEY);
      Storage.remove(SPAWNED_KEY_KEY);
      Storage.remove(DUCK_POS_KEY);
      Storage.remove(OWNED_SKINS_KEY);
      Storage.remove(CURRENT_SKIN_KEY);
      Storage.remove(HAS_PATCHED_DUCK_KEY);
      Storage.remove(DUCK_IS_DEFLATING_KEY);
      Storage.remove(DUCK_DEFLATING_REMAINING_KEY);
      Storage.remove(HAS_HATCHED_DUCKLING_KEY);
      Storage.remove(HAS_FRIED_DUCKLING_KEY);
      Storage.remove(HAS_COOKED_GOOSE_KEY);
      Storage.remove(IS_INCUBATING_KEY);
      Storage.remove(INCUBATING_REMAINING_KEY);
      Storage.remove(INCUBATING_COUNT_KEY);
      Storage.remove(INCUBATING_TYPE_KEY);
      Storage.remove(CREATURE_ON_DESK_KEY);
      Storage.remove(DUCKLING_GROW_REMAINING_KEY);
      Storage.remove(DUCKLINGS_NORMAL_KEY);
      Storage.remove(DUCKLINGS_GOLDEN_KEY);
      Storage.remove(GEESE_NORMAL_KEY);
      Storage.remove(GEESE_GOLDEN_KEY);
      Storage.remove(ROASTED_GEESE_NORMAL_KEY);
      Storage.remove(ROASTED_GEESE_GOLDEN_KEY);
      Storage.remove(OWNED_PROPS_KEY);
      Storage.remove(PLACED_PROPS_KEY);
      Storage.remove(SHOP_CLOTHING_COLLAPSED_KEY);
      Storage.remove(SHOP_HOUSEHOLD_COLLAPSED_KEY);
      Storage.remove(SHOP_FOOD_BUY_COLLAPSED_KEY);
      Storage.remove(DUCK_FEED_ALPHA_REMAINING_KEY);
      Storage.remove(DUCK_FEED_BETA_REMAINING_KEY);
      Storage.remove(DUCK_DIARRHEA_REMAINING_KEY);
      Storage.remove(SALAD_BUFF_REMAINING_KEY);
      Storage.remove(CUTTING_BOARD_INGREDIENTS_KEY);
      Storage.remove(HAS_SMASHED_EGGS_KEY);
      Storage.remove(LAMP_ON_KEY);
      Storage.remove(FRIDGE_ON_KEY);
      Storage.remove(EGG_SPOIL_TIMER_KEY);
      Storage.remove('duck-rotten-egg-active');
      Storage.remove('duck-rotten-rot-remaining');
      Storage.remove('duck-stink-debuff-remaining');
      Storage.remove('duck-upg-autoquack');
      Storage.remove('duck-upg-speed');
      Storage.remove('duck-upg-crit');
      Storage.remove('duck-upg-strength');
      Storage.remove('duck-upg-features');
    } catch (e) {}
    if (!preserveAchievements) {
      ACHIEVEMENTS.forEach((a) => {
        if (a.id === 'monster' && (hasFriedDuck || a.done)) {
          a.done = true;
          return;
        }
        if (a.id === 'accident' && (hasStabbedDuck || a.done)) {
          a.done = true;
          return;
        }
        a.done = false;
        try { Storage.remove(STORAGE_PREFIX + a.id); } catch (e) {}
      });
      try { Storage.remove(STORAGE_PREFIX + 'hundred-quacks'); } catch (e) {}
    }
    const normalEggEl = document.getElementById('normalEgg');
    const goldenEggEl = document.getElementById('goldenEgg');
    const friedEggEl = document.getElementById('friedEgg');
    const goldenFriedEggEl = document.getElementById('goldenFriedEgg');
    const rottenEggEl = document.getElementById('rottenEgg');
    const eggSpoilAlert = document.getElementById('eggSpoilAlert');
    eggSpoilRemaining = isFridgeOn ? 60 : 30;
    try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
    if (eggSpoilAlert) eggSpoilAlert.style.display = 'none';
    if (eggSpoilAlertTimeout) {
      clearTimeout(eggSpoilAlertTimeout);
      eggSpoilAlertTimeout = null;
    }
    lastEggSpoilAlertTime = 0;
    duckFeedAlphaRemaining = 0;
    duckFeedBetaRemaining = 0;
    duckDiarrheaRemaining = 0;
    saladBuffRemaining = 0;
    boardIngredients = { tomato: false, cucumber: false, lettuce: false };
    if (typeof renderCuttingBoardIngredients === 'function') renderCuttingBoardIngredients();
    poopSpawnAccumulator = 0;
    if (typeof activePoops !== 'undefined') {
      activePoops.forEach(p => { if (p.el && p.el.parentNode) p.el.parentNode.removeChild(p.el); });
      activePoops = [];
    }
    const dAlert = document.getElementById('diarrheaAlert');
    if (dAlert) dAlert.style.display = 'none';
    const hAlert = document.getElementById('gameHintAlert');
    if (hAlert) hAlert.style.display = 'none';
    if (typeof updateFeedBuffsUI === 'function') updateFeedBuffsUI();
    if (typeof window !== 'undefined') window.lastEggSpoilAlertTime = 0;
    if (normalEggEl) {
      normalEggEl.style.display = 'none';
      delete normalEggEl.dataset.placed;
    }
    if (goldenEggEl) {
      goldenEggEl.style.display = 'none';
      delete goldenEggEl.dataset.placed;
    }
    if (friedEggEl) {
      friedEggEl.style.display = 'none';
      delete friedEggEl.dataset.placed;
    }
    if (goldenFriedEggEl) {
      goldenFriedEggEl.style.display = 'none';
      delete goldenFriedEggEl.dataset.placed;
    }
    if (rottenEggEl) {
      rottenEggEl.style.display = 'none';
    }
    const propSkovoroda = document.getElementById('prop-skovoroda');
    if (propSkovoroda) {
      propSkovoroda.style.display = 'none';
      propSkovoroda.classList.remove('is-combined');
      delete propSkovoroda.dataset.placed;
    }
    const propPlita = document.getElementById('prop-plita');
    if (propPlita) {
      propPlita.style.display = 'none';
      propPlita.classList.remove('is-combined');
      delete propPlita.dataset.placed;
    }
    const propFridge = document.getElementById('prop-fridge');
    if (propFridge) {
      propFridge.style.display = 'none';
      delete propFridge.dataset.placed;
    }
    const propDichlofos = document.getElementById('prop-dichlofos');
    if (propDichlofos) {
      propDichlofos.style.display = 'none';
      delete propDichlofos.dataset.placed;
    }
    const propKey = document.getElementById('prop-key');
    if (propKey) {
      propKey.style.display = 'none';
      delete propKey.dataset.placed;
    }
    hasUnlockedWithKey = false;
    try { Storage.remove(STORAGE_PREFIX + 'universal-key'); } catch (e) {}
    transferredProps = { achievements: [] };
    window.transferredProps = transferredProps;
    try { Storage.setJSON(TRANSFERRED_PROPS_KEY, transferredProps); } catch (e) {}
    try { Storage.remove(TRANSFERRED_PROPS_KEY); } catch (e) {}

    const achvWindow = document.getElementById('achvTransferredWindow');
    if (achvWindow) achvWindow.style.display = 'none';
    const achvTray = document.getElementById('achvTransferredTray');
    if (achvTray) achvTray.innerHTML = '';
    const propLamp = document.getElementById('prop-lamp');
    if (propLamp) {
      propLamp.style.display = 'none';
      propLamp.classList.remove('is-on');
      delete propLamp.dataset.placed;
    }
    const propTrashcan = document.getElementById('prop-trashcan');
    if (propTrashcan) {
      propTrashcan.style.display = 'none';
      delete propTrashcan.dataset.placed;
    }
    const propClock = document.getElementById('prop-clock');
    if (propClock) {
      propClock.style.display = 'none';
      delete propClock.dataset.placed;
    }
    const propKnife = document.getElementById('prop-knife');
    if (propKnife) {
      propKnife.style.display = 'none';
      delete propKnife.dataset.placed;
    }
    ['birdFeed', 'duckFeedAlpha', 'duckFeedBeta', 'veggieSet', 'tomato', 'cucumber', 'lettuce', 'cuttingBoard', 'saladPlate'].forEach(id => {
      const el = document.getElementById('prop-' + id);
      if (el) {
        el.style.display = 'none';
        delete el.dataset.placed;
      }
    });
    const propTape = document.getElementById('prop-tape');
    if (propTape) {
      propTape.style.display = 'none';
      delete propTape.dataset.placed;
    }
    const propIncubator = document.getElementById('prop-incubator');
    if (propIncubator) {
      propIncubator.style.display = 'none';
      delete propIncubator.dataset.placed;
    }
    const deskCreatureEl = document.getElementById('deskCreature');
    if (deskCreatureEl) {
      deskCreatureEl.style.display = 'none';
      document.querySelectorAll('.desk-creature').forEach(el => el.style.display = 'none');
    }
    isLampOn = false;
    updateLampGlowUI();
    isFridgeOn = false;
    updateFridgeUI();
    isRottenEggActive = false;
    rottenEggRotRemaining = 0;
    stinkDebuffRemaining = 0;
    if (typeof updateStinkDebuffUI === 'function') updateStinkDebuffUI();
    hasPatchedDuck = false;
    isDuckDeflating = false;
    deflationRemaining = 0;
    isDeflatedDuckActive = false;
    try {
      Storage.remove(HAS_PATCHED_DUCK_KEY);
      Storage.remove(DUCK_IS_DEFLATING_KEY);
      Storage.remove(DUCK_DEFLATING_REMAINING_KEY);
    } catch (e) {}
    updateDeflationUI();
    if (typeof updateDeflationUI === 'function') updateDeflationUI();
    updateIncubatorUI();
    updateDeskCreatureUI();
    duck.style.position = '';
    duck.style.left = '';
    duck.style.top = '';
    duck.style.margin = '';
    duck.style.zIndex = '';
    duck.classList.remove('can-drag', 'is-dragging', 'has-deflate');
    isCookedDuckActive = false;
    const cookedDuckView = document.getElementById('cookedDuckView');
    if (cookedDuckView) cookedDuckView.style.display = 'none';
    const cookedDuckModal = document.getElementById('cookedDuckModal');
    if (cookedDuckModal) cookedDuckModal.classList.remove('open');
    const deflatedDuckView = document.getElementById('deflatedDuckView');
    if (deflatedDuckView) deflatedDuckView.style.display = 'none';
    const deflatedDuckModal = document.getElementById('deflatedDuckModal');
    if (deflatedDuckModal) deflatedDuckModal.classList.remove('open');
    const knifeAccidentModal = document.getElementById('knifeAccidentModal');
    if (knifeAccidentModal) knifeAccidentModal.classList.remove('open');
    const lvlRoachWarn = document.getElementById('lvlRoachWarning');
    if (lvlRoachWarn) lvlRoachWarn.style.display = 'none';
    isClothingCollapsed = false;
    isHouseholdCollapsed = false;
    isFoodBuyCollapsed = false;
    isFoodCollapsed = false;
    isAnimalsCollapsed = false;
    updateShopSectionCollapsedUI();
    applySkin('default');
    buildAchievementCards();
    updateDuckles();
    updateLevelDisplay();
    updateAutoQuackTimer();
    updateEggsDisplay();
    renderUpgrades(true);
    renderShopBuyTab();
    renderWardrobe();
    renderStorage();
    updateShopButtonVisibility();
    updateShopTabsVisibility();
  }

  function tryUnlock() {
    ACHIEVEMENTS.forEach((a, i) => {
      if (!a.done && a.check()) unlockAchievement(i);
    });
  }

  function unlockAchievementById(id) {
    const idx = ACHIEVEMENTS.findIndex(a => a.id === id);
    if (idx !== -1) {
      unlockAchievement(idx);
    }
  }
  window.unlockAchievementById = unlockAchievementById;

  function unlockAchievement(i) {
    const a = ACHIEVEMENTS[i];
    if (a.done) return;
    a.done = true;
    try {
      Storage.set(STORAGE_PREFIX + a.id, '1');
    } catch (e) { /* без сохранения тоже ок */ }

    // Обновляем карточку в модальном окне ачивок
    const card = document.getElementById('achv-card-' + a.id);
    const padlock = document.getElementById('achv-padlock-' + a.id);
    const info = document.getElementById('achv-info-' + a.id);
    if (card) card.classList.add('unlocked');
    if (padlock) padlock.style.display = 'none';
    if (info) info.classList.add('shown');
    updateAchvCounter();

    // Запускаем анимированную плашку над уткой
    showAchievementUnlockToast(a);
  }

  function showAchievementUnlockToast(a) {
    const container = document.getElementById('achvToastContainer');
    if (!container) return;

    const particlesCanvas = document.getElementById('particles');
    const isModalOpen = typeof isAnyModalOpen === 'function' && isAnyModalOpen();

    if (isModalOpen) {
      container.classList.add('over-modal');
      if (particlesCanvas) particlesCanvas.classList.add('over-modal');
    } else if (container.children.length === 0) {
      container.classList.remove('over-modal');
      if (particlesCanvas) particlesCanvas.classList.remove('over-modal');
    }

    const toast = document.createElement('div');
    toast.className = 'achv-toast-card fade-in';
    toast.innerHTML =
      '<span class="achv-padlock" aria-hidden="true">🔒</span>' +
      '<div class="achv-info" aria-live="polite">' +
        '<div class="achv-name">' + a.name + '</div>' +
        '<div class="achv-desc">' + a.desc + '</div>' +
      '</div>';
    container.appendChild(toast);

    const padlock = toast.querySelector('.achv-padlock');
    const info = toast.querySelector('.achv-info');

    // Шаг 2: Золотое свечение через 350мс
    setTimeout(() => {
      toast.classList.add('golden-glow');
    }, 350);

    // Шаг 3: Замочек со звуком отпадает через 520мс
    setTimeout(() => {
      xpSound();
      if (padlock) {
        const r = padlock.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        padlock.style.display = 'none';

        const ang = 0.2 + Math.random() * Math.PI * 0.6;
        const speed = 250 + Math.random() * 200;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * speed,
          vy: -Math.sin(ang) * speed,
          size: 44,
          alpha: 1,
          hue: 0,
          sat: 0,
          light: 50,
          fly: true,
          rot: 0,
          rotSpeed: (Math.random() - 0.5) * 14,
        });
      }
    }, 520);

    // Шаг 4: Показывает Имя и описание через 580мс
    setTimeout(() => {
      if (info) info.classList.add('shown');
    }, 580);

    // Шаг 5: fade-out через 3800мс (увеличено на 1 секунду для чтения)
    setTimeout(() => {
      toast.classList.add('fade-out');
    }, 3800);

    // Удаление из DOM через 4300мс
    setTimeout(() => {
      toast.remove();
      if (container.children.length === 0) {
        container.classList.remove('over-modal');
        if (particlesCanvas) particlesCanvas.classList.remove('over-modal');
      }
    }, 4300);
  }

  function xpSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t0 = audioCtx.currentTime + 0.02;
      // короткий восходящий арпеджио — «пинг-пинг-пинг», как при сборе опыта
      const notes = [523.25, 659.25, 783.99, 880.0, 1046.5];
      notes.forEach((f, n) => {
        const st = t0 + n * 0.068;
        const o = audioCtx.createOscillator();
        o.type = 'square';
        o.frequency.setValueAtTime(f, st);
        o.frequency.exponentialRampToValueAtTime(f * 0.9, st + 0.045);
        const g = audioCtx.createGain();
        g.gain.setValueAtTime(0.0001, st);
        g.gain.exponentialRampToValueAtTime(0.08, st + 0.008);
        g.gain.exponentialRampToValueAtTime(0.0001, st + 0.055);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(st);
        o.stop(st + 0.07);
      });
    } catch (e) { /* без звука тоже ок */ }
  }

  /* звук вылетающей пробки ("пук" / "чпок" при появлении обычного яйца) */
  function corkPopSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;

      // Быстрый падающий синусоидальный тон ("чпок" резонатора)
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(75, t + 0.05);

      oscGain.gain.setValueAtTime(0.4, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(oscGain);
      oscGain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.075);

      // Легкий шумовой хлопок воздуха/давления
      const nLen = Math.max(1, 0.02 * audioCtx.sampleRate | 0);
      const buf = audioCtx.createBuffer(1, nLen, audioCtx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < nLen; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / nLen);
      const noise = audioCtx.createBufferSource();
      noise.buffer = buf;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(900, t);
      filter.Q.setValueAtTime(3.0, t);

      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.22, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(t);
    } catch (e) {}
  }

  /* звук критического удара */
  function critSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(620, t);
      osc.frequency.exponentialRampToValueAtTime(1250, t + 0.08);
      g.gain.setValueAtTime(0.25, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.13);
    } catch (e) {}
  }

  /* звук соединения плиты и сковороды (металлический звон/клик) */
  function clinkSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.14);
      g.gain.setValueAtTime(0.24, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.connect(g);
      g.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.16);
    } catch (e) {}
  }

  /* звук шипения/жарки на сковороде */
  function sizzleSound(isGolden = false) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const dur = isGolden ? 0.9 : 0.65;
      const sampleRate = audioCtx.sampleRate;
      const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * dur), sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        const crackle = Math.random() < 0.05 ? (Math.random() * 2 - 1) * 2.2 : 1;
        data[i] = white * crackle;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isGolden ? 3800 : 2800, audioCtx.currentTime);
      filter.Q.setValueAtTime(2.8, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      const t = audioCtx.currentTime;
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.28, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(t);
      noise.stop(t + dur);

      if (isGolden) {
        setTimeout(() => xpSound(), 200);
      }
    } catch (e) {}
  }

  /* звук распыления дихлофоса (пшик спрея) */
  function spraySound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const dur = 1.6;
      const sampleRate = audioCtx.sampleRate;
      const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * dur), sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.7;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3200, audioCtx.currentTime);

      const gain = audioCtx.createGain();
      const t = audioCtx.currentTime;
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.24, t + 0.08);
      gain.gain.setValueAtTime(0.24, t + dur - 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(t);
      noise.stop(t + dur);
    } catch (e) {}
  }

  /* звук разбития яиц (хруст скорлупы + шмяк) */
  function splatSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const ctx = audioCtx;
      const t = ctx.currentTime;

      // 1. Хруст скорлупы (шумовой всплеск с полосовым фильтром)
      const bufSize = Math.floor(ctx.sampleRate * 0.12);
      const noiseBuf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const data = noiseBuf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.025));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuf;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(2, t);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.42, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t);

      // 2. Влажный шмяк (быстро падающий тон)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, t);
      osc.frequency.exponentialRampToValueAtTime(75, t + 0.18);
      oscGain.gain.setValueAtTime(0.35, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch (e) {}
  }

  /* звук протухших яиц */
  function rottenEggSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const ctx = audioCtx;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.42);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, t);
      filter.frequency.linearRampToValueAtTime(140, t + 0.42);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.42);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.42);
    } catch (e) {}
  }

  /* звук пореза ножом и выходящего воздуха */
  
  function eggHatchSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    [520, 650, 780, 980].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.25, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.2);
    });
  }

  function burnSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.35);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  function gooseHonkSound() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.1);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.32);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  function knifeStabSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.18);
      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.2);

      const bufferSize = Math.floor(audioCtx.sampleRate * 0.35);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 2200;
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.2, t + 0.08);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(t + 0.08);
    } catch (e) {}
  }

  /* звук заклеивания изолентой */
  function tapePatchSound() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;

      const bufferSize = Math.floor(audioCtx.sampleRate * 0.18);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, t);
      filter.frequency.exponentialRampToValueAtTime(3400, t + 0.16);
      const noiseGain = audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.24, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(audioCtx.destination);
      noise.start(t);

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + 0.1 + i * 0.06);
        g.gain.setValueAtTime(0.18, t + 0.1 + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.35 + i * 0.06);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(t + 0.1 + i * 0.06);
        osc.stop(t + 0.38 + i * 0.06);
      });
    } catch (e) {}
  }
