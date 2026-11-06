let quackCount = Storage.getNumber(QUACK_KEY, 0, 0);
  let duckles = Storage.getNumber(DUCKLES_KEY, quackCount, 0);
  window.getDuckles = () => duckles;
  let hintCount = Storage.getNumber(HINT_KEY, 0, 0);
  let keyPressed = Storage.getBoolean(KEY_PRESSED_KEY, false);
  let duckSeqDone = Storage.getBoolean(SEQ_DONE_KEY, false);
  let lockedCardClicked = Storage.getBoolean(LOCKED_CLICKED_KEY, false);
  let devToolsOpened = Storage.getBoolean(DEVTOOLS_KEY, false);
  let badWordsTyped = Storage.getBoolean(BAD_WORDS_KEY, false);
  let gtaCheatTyped = Storage.getBoolean(GTA_CHEAT_KEY, false);
  let beastNumberTyped = Storage.getBoolean(BEAST_NUMBER_KEY, false);
  let hoverWaitDone = Storage.getBoolean(HOVER_WAIT_KEY, false);

  let playerLevel = Storage.getNumber(LEVEL_KEY, 1, 1, 20);
  let playerExp = Storage.getNumber(EXP_KEY, 0, 0);

  let normalEggs = Storage.getNumber(EGGS_NORMAL_KEY, 0, 0);
  let goldenEggs = Storage.getNumber(EGGS_GOLDEN_KEY, 0, 0);
  let friedEggs = Storage.getNumber(FRIED_EGGS_KEY, 0, 0);
  let goldenFriedEggs = Storage.getNumber(GOLDEN_FRIED_EGGS_KEY, 0, 0);

  let eggBatches = Storage.getJSON(EGG_BATCHES_KEY, [], (data) => Array.isArray(data));
  if (!Array.isArray(eggBatches)) eggBatches = [];
  window.eggBatches = eggBatches;

  function syncEggCountsFromBatches() {
    let n = 0, g = 0, f = 0, gf = 0;
    for (const b of eggBatches) {
      if (b.type === 'normal') n += b.count;
      else if (b.type === 'golden') g += b.count;
      else if (b.type === 'fried') f += b.count;
      else if (b.type === 'goldenFried') gf += b.count;
    }
    normalEggs = n;
    goldenEggs = g;
    friedEggs = f;
    goldenFriedEggs = gf;
    try {
      Storage.set(EGGS_NORMAL_KEY, String(normalEggs));
      Storage.set(EGGS_GOLDEN_KEY, String(goldenEggs));
      Storage.set(FRIED_EGGS_KEY, String(friedEggs));
      Storage.set(GOLDEN_FRIED_EGGS_KEY, String(goldenFriedEggs));
    } catch (e) {}
  }
  window.syncEggCountsFromBatches = syncEggCountsFromBatches;

  function saveEggBatches() {
    try { Storage.setJSON(EGG_BATCHES_KEY, eggBatches); } catch (e) {}
  }
  window.saveEggBatches = saveEggBatches;

  function getOldestEggBatchRemaining() {
    if (!eggBatches || eggBatches.length === 0) return null;
    let minRemaining = Infinity;
    for (const b of eggBatches) {
      if (b.count > 0 && b.remaining < minRemaining) {
        minRemaining = b.remaining;
      }
    }
    return minRemaining === Infinity ? null : minRemaining;
  }
  window.getOldestEggBatchRemaining = getOldestEggBatchRemaining;

  function addEggBatch(type, count = 1, remaining = null) {
    if (count <= 0) return;
    if (remaining === null) {
      remaining = (typeof isFridgeOn !== 'undefined' && isFridgeOn) ? 60 : 30;
    }
    eggBatches.push({
      id: 'batch_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      type: type,
      count: count,
      remaining: remaining
    });
    syncEggCountsFromBatches();
    saveEggBatches();
    if (typeof updateEggsDisplay === 'function') updateEggsDisplay(true, type);
  }
  window.addEggBatch = addEggBatch;

  function removeEggsFromBatches(type, countToRemove) {
    if (countToRemove <= 0) return 0;
    let needed = countToRemove;
    eggBatches.sort((a, b) => a.remaining - b.remaining);
    for (let i = 0; i < eggBatches.length && needed > 0; i++) {
      const b = eggBatches[i];
      if (b.type === type && b.count > 0) {
        if (b.count <= needed) {
          needed -= b.count;
          b.count = 0;
        } else {
          b.count -= needed;
          needed = 0;
        }
      }
    }
    eggBatches = eggBatches.filter(b => b.count > 0);
    syncEggCountsFromBatches();
    saveEggBatches();
    if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
    return countToRemove - needed;
  }
  window.removeEggsFromBatches = removeEggsFromBatches;

  function cookEggBatches(sourceType, targetType) {
    let cookedCount = 0;
    for (const b of eggBatches) {
      if (b.type === sourceType && b.count > 0) {
        b.type = targetType;
        cookedCount += b.count;
      }
    }
    syncEggCountsFromBatches();
    saveEggBatches();
    if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
    return cookedCount;
  }
  window.cookEggBatches = cookEggBatches;

  function spoilEggBatches(spoiledBatches) {
    if (!spoiledBatches || spoiledBatches.length === 0) return;
    let totalSpoiled = 0;
    const spoiledIds = new Set(spoiledBatches.map(b => b.id));
    for (const b of spoiledBatches) {
      totalSpoiled += b.count;
    }
    eggBatches = eggBatches.filter(b => !spoiledIds.has(b.id));
    syncEggCountsFromBatches();
    saveEggBatches();

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

    if (typeof rottenEggSound === 'function') rottenEggSound();
    if (typeof showEggSpoilAlert === 'function') showEggSpoilAlert();
    if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
    if (typeof updateShopSellTab === 'function') updateShopSellTab();

    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 30,
      vx: 0,
      vy: -110,
      size: 22,
      alpha: 2.0,
      text: `🤢 Испортилась партия яиц (-${totalSpoiled.toLocaleString('ru-RU')} шт.)!`,
      color: '#84cc16'
    });
  }
  window.spoilEggBatches = spoilEggBatches;
  let hasUnlockedFriedEggs = Storage.getBoolean(HAS_FRIED_KEY, false) || friedEggs > 0 || goldenFriedEggs > 0;
  let hasCookedEgg = Storage.getBoolean(COOKED_EGG_KEY, false) || hasUnlockedFriedEggs;
  let isStoveCombined = Storage.getBoolean(STOVE_COMBINED_KEY, false);
  let hasPlacedFridge = Storage.getBoolean(PLACED_FRIDGE_KEY, false);
  let isRoachesActive = Storage.getBoolean(ROACHES_ACTIVE_KEY, false);
  let hasUsedDichlofos = Storage.getBoolean(USED_DICHLOFOS_KEY, false);
  let hasClearedRoaches = Storage.getBoolean(CLEARED_ROACHES_KEY, false);
  let hasMovedDuck = Storage.getBoolean(MOVED_DUCK_KEY, false);
  let hasSpawnedKey = Storage.getBoolean(SPAWNED_KEY_KEY, false);
  let isClothingCollapsed = true;
  let isHouseholdCollapsed = true;
  let isFoodBuyCollapsed = true;
  let isGardeningCollapsed = true;
  let isCharacterDialogOpen = false;
  window.isCharacterDialogOpen = isCharacterDialogOpen;
  let isFoodCollapsed = true;
  let isAnimalsCollapsed = true;
  let hasSmashedEggs = Storage.getBoolean(HAS_SMASHED_EGGS_KEY, false);
  let hasFriedDuck = Storage.getBoolean(HAS_FRIED_DUCK_KEY, false) || Storage.getBoolean(STORAGE_PREFIX + 'monster', false);
  let hasStabbedDuck = Storage.getBoolean(HAS_STABBED_DUCK_KEY, false) || Storage.getBoolean(STORAGE_PREFIX + 'accident', false);
  let hasPatchedDuck = Storage.getBoolean(HAS_PATCHED_DUCK_KEY, false);
  let isCookedDuckActive = false;
  let isDuckDeflating = Storage.getBoolean(DUCK_IS_DEFLATING_KEY, false);
  let deflationRemaining = Storage.getNumber(DUCK_DEFLATING_REMAINING_KEY, 300, 0);
  let isDeflatedDuckActive = false;
  let duckFeedAlphaRemaining = Storage.getNumber(DUCK_FEED_ALPHA_REMAINING_KEY, 0, 0);
  let duckFeedBetaRemaining = Storage.getNumber(DUCK_FEED_BETA_REMAINING_KEY, 0, 0);
  let duckDiarrheaRemaining = Storage.getNumber(DUCK_DIARRHEA_REMAINING_KEY, 0, 0);
  let activePoops = [];
  let poopSpawnAccumulator = 0;
  let saladBuffRemaining = Storage.getNumber(SALAD_BUFF_REMAINING_KEY, 0, 0);
  let boardIngredients = Storage.getJSON(CUTTING_BOARD_INGREDIENTS_KEY, { tomato: false, cucumber: false, lettuce: false }, (data) => data && typeof data === 'object');
  if (!boardIngredients || typeof boardIngredients !== 'object') {
    boardIngredients = { tomato: false, cucumber: false, lettuce: false };
  }
  
  const HAS_HATCHED_DUCKLING_KEY = 'duck-has-hatched-duckling';
  const HAS_HATCHED_GOLDEN_DUCKLING_KEY = 'duck-has-hatched-golden-duckling';
  let hasHatchedGoldenDuckling = Storage.getBoolean(HAS_HATCHED_GOLDEN_DUCKLING_KEY, false);
  const HAS_FRIED_DUCKLING_KEY = 'duck-has-fried-duckling';
  const HAS_COOKED_GOOSE_KEY = 'duck-has-cooked-goose';
  const IS_INCUBATING_KEY = 'duck-is-incubating';
  const INCUBATING_TYPE_KEY = 'duck-incubating-type';
  const INCUBATING_COUNT_KEY = 'duck-incubating-count';
  const INCUBATING_REMAINING_KEY = 'duck-incubating-remaining';
  const CREATURE_ON_DESK_KEY = 'duck-creature-on-desk';
  const DUCKLING_GROW_REMAINING_KEY = 'duck-duckling-grow-remaining';
  const DUCKLINGS_NORMAL_KEY = 'duck-ducklings-normal';
  const DUCKLINGS_GOLDEN_KEY = 'duck-ducklings-golden';
  const GEESE_NORMAL_KEY = 'duck-geese-normal';
  const GEESE_GOLDEN_KEY = 'duck-geese-golden';
  const ROASTED_GEESE_NORMAL_KEY = 'duck-roasted-geese-normal';
  const ROASTED_GEESE_GOLDEN_KEY = 'duck-roasted-geese-golden';
  const DESK_CREATURES_POS_KEY = 'duck-desk-creatures-pos';
  const GOLDEN_DUCKLING_GROW_REMAINING_KEY = 'duck-golden-duckling-grow-remaining';

  let hasHatchedDuckling = Storage.getBoolean(HAS_HATCHED_DUCKLING_KEY, false);
  let hasFriedDuckling = Storage.getBoolean(HAS_FRIED_DUCKLING_KEY, false);
  let hasCookedGoose = Storage.getBoolean(HAS_COOKED_GOOSE_KEY, false);
  let hasUnlockedWithKey = Storage.getBoolean(STORAGE_PREFIX + 'universal-key', false);

  let isIncubating = Storage.getBoolean(IS_INCUBATING_KEY, false);
  let incubatingType = Storage.get(INCUBATING_TYPE_KEY, 'normal') === 'golden' ? 'golden' : 'normal';
  let incubatingCount = Storage.getNumber(INCUBATING_COUNT_KEY, 1, 1);
  let incubatingRemaining = Storage.getNumber(INCUBATING_REMAINING_KEY, 120, 0);

  let creatureOnDesk = Storage.getJSON(CREATURE_ON_DESK_KEY, null, (data) => {
    return data && typeof data === 'object' && typeof data.type === 'string' &&
      ['duckling', 'goldenDuckling', 'goose', 'goldenGoose', 'roastedGoose', 'goldenRoastedGoose'].includes(data.type);
  });
  let ducklingGrowRemaining = Storage.getNumber(DUCKLING_GROW_REMAINING_KEY, 600, 0);

  let normalDucklings = Storage.getNumber(DUCKLINGS_NORMAL_KEY, 0, 0);
  let goldenDucklings = Storage.getNumber(DUCKLINGS_GOLDEN_KEY, 0, 0);
  let normalGeese = Storage.getNumber(GEESE_NORMAL_KEY, 0, 0);
  let goldenGeese = Storage.getNumber(GEESE_GOLDEN_KEY, 0, 0);
  let normalRoastedGeese = Storage.getNumber(ROASTED_GEESE_NORMAL_KEY, 0, 0);
  let goldenRoastedGeese = Storage.getNumber(ROASTED_GEESE_GOLDEN_KEY, 0, 0);

  let deskCreaturesPos = Storage.getJSON(DESK_CREATURES_POS_KEY, {});
  let goldenDucklingGrowRemaining = Storage.getNumber(GOLDEN_DUCKLING_GROW_REMAINING_KEY, 600, 0);

  // Миграция из одиночного creatureOnDesk в общие счетчики
  if (creatureOnDesk && creatureOnDesk.type) {
    if (creatureOnDesk.type === 'duckling' && normalDucklings === 0) normalDucklings = 1;
    else if (creatureOnDesk.type === 'goldenDuckling' && goldenDucklings === 0) goldenDucklings = 1;
    else if (creatureOnDesk.type === 'goose' && normalGeese === 0) normalGeese = 1;
    else if (creatureOnDesk.type === 'goldenGoose' && goldenGeese === 0) goldenGeese = 1;
    else if (creatureOnDesk.type === 'roastedGoose' && normalRoastedGeese === 0) normalRoastedGeese = 1;
    else if (creatureOnDesk.type === 'goldenRoastedGoose' && goldenRoastedGeese === 0) goldenRoastedGeese = 1;
    if (creatureOnDesk.left && creatureOnDesk.top && !deskCreaturesPos[creatureOnDesk.type]) {
      deskCreaturesPos[creatureOnDesk.type] = { left: creatureOnDesk.left, top: creatureOnDesk.top };
      try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {}
    }
  }

  let isLampOn = Storage.getBoolean(LAMP_ON_KEY, false);
  let isFridgeOn = Storage.getBoolean(FRIDGE_ON_KEY, false);
  const maxInitialSpoil = isFridgeOn ? 60 : 30;
  let eggSpoilRemaining = Storage.getNumber(EGG_SPOIL_TIMER_KEY, maxInitialSpoil, 0, maxInitialSpoil);
  if (eggSpoilRemaining > maxInitialSpoil) {
    eggSpoilRemaining = maxInitialSpoil;
  }

  // Миграция старых сохранений на партии яиц
  if (eggBatches.length === 0 && (normalEggs > 0 || goldenEggs > 0 || friedEggs > 0 || goldenFriedEggs > 0)) {
    const initTime = Math.max(1, eggSpoilRemaining || (isFridgeOn ? 60 : 30));
    if (normalEggs > 0) eggBatches.push({ id: 'batch_migr_norm', type: 'normal', count: normalEggs, remaining: initTime });
    if (goldenEggs > 0) eggBatches.push({ id: 'batch_migr_gold', type: 'golden', count: goldenEggs, remaining: initTime });
    if (friedEggs > 0) eggBatches.push({ id: 'batch_migr_fried', type: 'fried', count: friedEggs, remaining: initTime });
    if (goldenFriedEggs > 0) eggBatches.push({ id: 'batch_migr_goldFried', type: 'goldenFried', count: goldenFriedEggs, remaining: initTime });
    saveEggBatches();
  } else if (eggBatches.length > 0) {
    syncEggCountsFromBatches();
  }
  let activeContextEggType = null;
  let eggSpoilInterval = null;
  let eggSpoilAlertTimeout = null;
  let lastEggSpoilAlertTime = 0;
  window.lastEggSpoilAlertTime = lastEggSpoilAlertTime;

  let ownedSkins = Storage.getJSON(OWNED_SKINS_KEY, ['default'], (data) => Array.isArray(data));
  if (!Array.isArray(ownedSkins) || !ownedSkins.includes('default')) {
    ownedSkins = ['default'];
  }
  ownedSkins = ownedSkins.filter(id => typeof id === 'string');
  if (!ownedSkins.includes('default')) ownedSkins.unshift('default');
  window.ownedSkins = ownedSkins;

  let currentSkin = Storage.get(CURRENT_SKIN_KEY, 'default');
  if (!ownedSkins.includes(currentSkin)) currentSkin = 'default';
  window.getCurrentSkin = () => currentSkin;
  window.getCreatureOnDesk = () => creatureOnDesk;
  window.setCreatureOnDesk = (v) => { creatureOnDesk = v; if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI(); };
  window.getIsIncubating = () => isIncubating;
  window.getIncubatingRemaining = () => incubatingRemaining;
  window.setIncubatingRemaining = (v) => { incubatingRemaining = v; if (typeof updateIncubatorUI === 'function') updateIncubatorUI(); };
  window.getDucklingGrowRemaining = () => ducklingGrowRemaining;
  window.setDucklingGrowRemaining = (v) => { ducklingGrowRemaining = v; if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI(); };
  window.getGoldenDucklingGrowRemaining = () => goldenDucklingGrowRemaining;
  window.setGoldenDucklingGrowRemaining = (v) => { goldenDucklingGrowRemaining = v; if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI(); };
  window.getDeskCreaturesPos = () => deskCreaturesPos;
  window.setDeskCreaturesPos = (v) => { deskCreaturesPos = v; try { Storage.setJSON(DESK_CREATURES_POS_KEY, deskCreaturesPos); } catch (e) {} };

  let ownedProps = Storage.getJSON(OWNED_PROPS_KEY, [], (data) => Array.isArray(data));
  if (!Array.isArray(ownedProps)) ownedProps = [];
  ownedProps = ownedProps.filter(id => typeof id === 'string');
  Object.defineProperty(window, 'ownedProps', { get: () => ownedProps, set: (v) => { ownedProps = v; }, configurable: true });

  let placedProps = Storage.getJSON(PLACED_PROPS_KEY, {}, (data) => data && typeof data === 'object' && !Array.isArray(data));
  if (!placedProps || typeof placedProps !== 'object' || Array.isArray(placedProps)) placedProps = {};
  Object.defineProperty(window, 'placedProps', { get: () => placedProps, set: (v) => { placedProps = v; }, configurable: true });

  let transferredProps = Storage.getJSON(TRANSFERRED_PROPS_KEY, { achievements: [] });
  if (!transferredProps || typeof transferredProps !== 'object' || !Array.isArray(transferredProps.achievements)) {
    transferredProps = { achievements: [] };
  }
  Object.defineProperty(window, 'transferredProps', { get: () => transferredProps, set: (v) => { transferredProps = v; }, configurable: true });

  const SKINS_DATA = {
    default: {
      id: 'default',
      name: 'Классическая утка',
      category: 'clothing',
      img: 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-duug-p-rezinovaya-utka-png-14.png',
      desc: 'Та самая жёлтая резиновая утка'
    },
    argo: {
      id: 'argo',
      name: 'Золотая цепь "Арго"',
      category: 'clothing',
      cost: 1000,
      icon: 'https://lh3.googleusercontent.com/d/1anG5FJxk7ArWDtVKW_Ee_PMQck9yBf7s',
      fallbackEmoji: '📿',
      img: 'https://lh3.googleusercontent.com/d/1f0ceNkLhUkpbBaMZEGuU7RWikG2Z82jy',
      desc: 'Элитное украшение. Меняет скин утки!'
    },
    mafioznik: {
      id: 'mafioznik',
      name: 'Набор мафиозник',
      category: 'clothing',
      cost: 5000,
      icon: 'https://lh3.googleusercontent.com/d/1bavKgXNsCFNkI4UHomJ4EJyTpffHdOWX',
      fallbackEmoji: '🎩',
      img: 'https://lh3.googleusercontent.com/d/1mTctZ5WDibI0wiPVihCY-IqGrUATPtFV',
      desc: 'Костюм дона утиной мафии'
    },
    rocker: {
      id: 'rocker',
      name: 'Рокерский жилет',
      category: 'clothing',
      cost: 2700,
      icon: 'https://lh3.googleusercontent.com/d/1arA2LGP4YMPHXEEPVuya4mB4_ilXOuNY',
      fallbackEmoji: '🎸',
      img: 'https://lh3.googleusercontent.com/d/12CsP9UQjOkYFZV0s-emw4q-ilQDsHiPo',
      desc: 'Кожаный жилет с шипами. Чистый рок!'
    },
    bikini: {
      id: 'bikini',
      name: 'Бикини',
      category: 'clothing',
      cost: 1600,
      icon: 'https://lh3.googleusercontent.com/d/1ajHxJx_TS3RmzoIy6rp_DIy0SLlb5ygI',
      fallbackEmoji: '👙',
      img: 'https://lh3.googleusercontent.com/d/18fUZXkqxi4YYIVu20FkbdDEQFN6SAHqy',
      desc: 'Пляжный купальник для отдыха у бассейна'
    },
    tie: {
      id: 'tie',
      name: 'Черный галстук',
      category: 'clothing',
      cost: 550,
      icon: 'https://lh3.googleusercontent.com/d/1GCMl-lpdrRZ8iKm69D2ljS1Fk_v5Ao0n',
      fallbackEmoji: '👔',
      img: 'https://lh3.googleusercontent.com/d/1talr1RhmPN4ajF-qfCXBYU62gB2iLATA',
      desc: 'Строгий деловой чёрный галстук'
    },
    agent47: {
      id: 'agent47',
      name: 'Набор 47',
      category: 'clothing',
      cost: 4747,
      icon: 'https://lh3.googleusercontent.com/d/12ZK7jYDLt4dSjWR9Nt42w6jBbDXIGApJ',
      fallbackEmoji: '💼',
      img: 'https://lh3.googleusercontent.com/d/17foa2yk6xQsEM8cOGD_1alivkDJZf7Bm',
      desc: 'Чёрный костюм и красный галстук агента'
    },
    jojo: {
      id: 'jojo',
      name: 'Набор JOJO',
      category: 'clothing',
      cost: 6060,
      icon: 'https://lh3.googleusercontent.com/d/1i6Ie_ToISZ11TSLgmg5K3ocvl2tVsXlL',
      fallbackEmoji: '⭐',
      img: 'https://lh3.googleusercontent.com/d/1Oy4rigXSOtZH3asCeZzcuIyc659Lz5lF',
      desc: 'Невероятный утиный стиль и поза'
    },
    glasses: {
      id: 'glasses',
      name: 'Очки',
      category: 'clothing',
      cost: 700,
      icon: 'https://lh3.googleusercontent.com/d/1bbY-Q_vZbVAbZLwmAkrdFTwrADK3CGm9',
      fallbackEmoji: '🕶️',
      img: 'https://lh3.googleusercontent.com/d/1_etMZ5-hCSI9Jbf_i28b4s2OBnhexM44',
      desc: 'Крутые тёмные очки'
    },
    wig_goose: {
      id: 'wig_goose',
      name: 'Парик женский "Гусыня"',
      category: 'clothing',
      cost: 1300,
      icon: 'https://lh3.googleusercontent.com/d/1xyXwQKt1ktywroUup0wz-ci0ql-OVlFA',
      fallbackEmoji: '💇',
      img: 'https://lh3.googleusercontent.com/d/1F4Q5laRiHIKqizpIETLaHIyfsjyN-cmW',
      desc: 'Пышный парик для светской птицы'
    },
    vape: {
      id: 'vape',
      name: 'VAPE "Париш"',
      category: 'clothing',
      cost: 4500,
      icon: 'https://lh3.googleusercontent.com/d/1l0Z-9Olz6hgyn56H9kmE4m3TkRXL6jIl',
      fallbackEmoji: '💨',
      img: 'https://lh3.googleusercontent.com/d/11j5Dt-9JCpNrcWFe-L3NhzUjC2YEg8e3',
      desc: 'Много пара, мало кряка'
    },
    doshirak: {
      id: 'doshirak',
      name: 'Доширак 1 уп.',
      category: 'clothing',
      cost: 150,
      icon: 'https://lh3.googleusercontent.com/d/1Tis4NehIiZ2qgRtLDwGLkorDhiNvGnwS',
      fallbackEmoji: '🍜',
      img: 'https://lh3.googleusercontent.com/d/1F6KDQar0Bb2Wfo3R-agsuqgX4Q-KcF9v',
      desc: 'Сытный обед за 5 минут'
    },
    patched: {
      id: 'patched',
      name: 'Утка с изолентой',
      category: 'clothing',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/1l6IN25t2HH-MLnKmvU0NWj9lVcmOLnYR',
      fallbackEmoji: '🩹',
      img: 'https://lh3.googleusercontent.com/d/1l6IN25t2HH-MLnKmvU0NWj9lVcmOLnYR',
      desc: 'Надежно перемотана синей изолентой. Больше воздух не спускает!'
    }
  };

  const BUSINESSES_DATA = {
    carwash: {
      id: 'carwash',
      name: 'Автомойка',
      desc: 'Бесконтактная мойка для водоплавающего транспорта. Перья блестят, дакли капают!',
      cost: 300000,
      income: 50000,
      penalty: 37500,
      icon: '🚗🧼',
      workDuration: 300,
      attentionDuration: 60
    },
    utilnya: {
      id: 'utilnya',
      name: 'Утильня',
      desc: 'Лучше вам не знать какие услуги они оказывают',
      cost: 1500000,
      income: 250000,
      penalty: 200000,
      icon: '🧡🖤',
      workDuration: 300,
      attentionDuration: 60
    },
    factory: {
      id: 'factory',
      name: 'Завод резиновых уточек',
      desc: 'Высокотехнологичный конвейер по производству лучших резиновых крякалок в мире!',
      cost: 3000000,
      income: 750000,
      penalty: 700000,
      icon: '🏭🦆',
      workDuration: 300,
      attentionDuration: 60
    }
  };
  window.BUSINESSES_DATA = BUSINESSES_DATA;
  const BUSINESSES_STATE_KEY = 'duck-businesses-state';
  let businessesState = Storage.getJSON(BUSINESSES_STATE_KEY, {}, (data) => data && typeof data === 'object' && !Array.isArray(data));
  if (!businessesState || typeof businessesState !== 'object' || Array.isArray(businessesState)) businessesState = {};
  Object.defineProperty(window, 'businessesState', { get: () => businessesState, set: (v) => { businessesState = v; }, configurable: true });

  const PROPS_DATA = {
        incubator: {
      id: 'incubator',
      name: 'Инкубатор',
      category: 'household',
      cost: 50000,
      icon: 'https://lh3.googleusercontent.com/d/1Xm8a4JT8JkmEChEUV50Csj_mF212gVu7',
      fallbackEmoji: '🐣',
      desc: 'Автоматический инкубатор для яиц. Почти всегда превращает яйца в живой желток'
    },
    skovoroda: {
      id: 'skovoroda',
      name: 'Сковорода',
      category: 'household',
      cost: 2500,
      icon: 'https://pngicon.net/file/uploads/skovoroda-243x256.png',
      fallbackEmoji: '🍳',
      desc: 'Добротная чугунная сковорода. Говорят, на ней можно приготовить что угодно!'
    },
    plita: {
      id: 'plita',
      name: 'Плита',
      category: 'household',
      cost: 10000,
      icon: 'https://lh3.googleusercontent.com/d/18-oUHRsc6tm3n5gBKVzDLjvq4Pw5kPLe',
      fallbackEmoji: '🎛️',
      desc: 'Плита с регулятором температуры. Отлично смотрится на кухне!'
    },
    fridge: {
      id: 'fridge',
      name: 'Вонючий старый холодильник',
      category: 'household',
      cost: 1000,
      icon: 'https://lh3.googleusercontent.com/d/1I6_RAc5PqBkofqiJ1vwhahBfTyUbw4AN',
      fallbackEmoji: '🧊',
      desc: 'Старый, подозрительно пахнущий агрегат. Что внутри — лучше не знать.'
    },
    dichlofos: {
      id: 'dichlofos',
      name: 'Дихлофос',
      category: 'household',
      cost: 5000,
      icon: 'https://lh3.googleusercontent.com/d/1rSQo8EJqTlQRFgQ8jqk_ITYwu5X7MH3B',
      fallbackEmoji: '🧴',
      desc: 'Редкая заморская штука, избавит от нежелательных друзей'
    },
    key: {
      id: 'key',
      name: 'Ключ',
      category: 'household',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/1qBoopIzwqfHjbCQfLJXVOkOY_llGkCkO',
      fallbackEmoji: '🔑',
      desc: 'Открывает что угодно'
    },
    lamp: {
      id: 'lamp',
      name: 'Напольная лампа',
      category: 'household',
      cost: 550,
      icon: 'https://lh3.googleusercontent.com/d/1RahYd6df62qcRlI1kXb20R2ZeVUmHZru',
      fallbackEmoji: '💡',
      desc: 'Создает ламповую атмосферу и теплое уютное свечение по краям экрана.'
    },
    trashcan: {
      id: 'trashcan',
      name: 'Мусорное ведро',
      category: 'household',
      cost: 1000,
      icon: 'https://lh3.googleusercontent.com/d/1bvMh_qnnNRDk5h9KOYMVp8g_oi1V01JI',
      fallbackEmoji: '🗑️',
      desc: 'Позволяет выбрасывать всякий мусор.'
    },
    clock: {
      id: 'clock',
      name: 'Напольные часы',
      category: 'household',
      cost: 800,
      icon: 'https://lh3.googleusercontent.com/d/1LBfmZcEwiCMYQRDy-GKlgAnQZBJYesag',
      fallbackEmoji: '🕰️',
      desc: 'Показывают точное время и отображают таймеры на экране.'
    },
    knife: {
      id: 'knife',
      name: 'Кухонный нож',
      category: 'household',
      cost: 1600,
      icon: 'https://lh3.googleusercontent.com/d/1V2Yi1ljXGKo-8FUbYne42jgeSJY2I8gY',
      fallbackEmoji: '🔪',
      desc: 'Подходит для нарезки овощей'
    },
    tape: {
      id: 'tape',
      name: 'Изолента',
      category: 'household',
      cost: 300,
      icon: 'https://lh3.googleusercontent.com/d/1RSsws49RUpnkJBhmdqgfVLj1o_FcIb7a',
      fallbackEmoji: '🩹',
      desc: 'Чинит все!'
    },
    cuttingBoard: {
      id: 'cuttingBoard',
      name: 'Разделочная доска',
      category: 'household',
      cost: 2000,
      icon: 'https://lh3.googleusercontent.com/d/1Srj88IN_02Ecsl5LqCfv_yBj1ZcTEoWx',
      fallbackEmoji: '🥗',
      desc: 'Подходит для нарезки овощей'
    },
    saladPlate: {
      id: 'saladPlate',
      name: 'Тарелка салата',
      category: 'food',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/12L-UiIq4d_pDvInnPD-euFrgYgUhtmLo',
      fallbackEmoji: '🥗',
      desc: 'Свежий витаминный салат. Даёт +20% к силе нажатий'
    },
    birdFeed: {
      id: 'birdFeed',
      name: 'Корм для птицы',
      category: 'food',
      cost: 9000,
      icon: 'https://lh3.googleusercontent.com/d/1eTMaSApvaSOB870JIHTSPucRsphiZF5v',
      fallbackEmoji: '🌾',
      desc: 'Корм. Обычно таким кормят куриц'
    },
    duckFeedAlpha: {
      id: 'duckFeedAlpha',
      name: 'Корм для утки "Альфа"',
      category: 'food',
      cost: 10000,
      icon: 'https://lh3.googleusercontent.com/d/1WEzE8R6NsZfBeXiz5qCzw4i84FxzWiEz',
      fallbackEmoji: '🥫',
      desc: 'Корм. Для здоровья вашей утки'
    },
    duckFeedBeta: {
      id: 'duckFeedBeta',
      name: 'Корм для утки "Бета"',
      category: 'food',
      cost: 10000,
      icon: 'https://lh3.googleusercontent.com/d/1xqAUp3tWrUnvN2uOMDXdlfBtrERRkswW',
      fallbackEmoji: '🥫',
      desc: 'Корм. Для активных уток'
    },
    veggieSet: {
      id: 'veggieSet',
      name: 'Овощной набор',
      category: 'food',
      cost: 2000,
      icon: 'https://lh3.googleusercontent.com/d/1f56ZpxliSUeMFMauDLLxas4qYL170qMA',
      fallbackEmoji: '🥗',
      desc: 'Помидор, огурец, листья салата - идеальный набор для лёгкой закуски'
    },
    tomato: {
      id: 'tomato',
      name: 'Помидор',
      category: 'food',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/1S00SwkmhFOC4QL-_LTpRbf5szE9IwjNp',
      fallbackEmoji: '🍅',
      desc: 'Спелый красный помидор'
    },
    cucumber: {
      id: 'cucumber',
      name: 'Огурец',
      category: 'food',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/1ol8bf9FOn25fPyPdslxoWTp7mbvW30vb',
      fallbackEmoji: '🥒',
      desc: 'Хрустящий свежий огурец'
    },
    lettuce: {
      id: 'lettuce',
      name: 'Лист салата',
      category: 'food',
      cost: 0,
      icon: 'https://lh3.googleusercontent.com/d/1C7LmH-BSHu6RY0AfTwqK6c8DJ8i5Gwmf',
      fallbackEmoji: '🥬',
      desc: 'Сочный зелёный лист салата'
    }
  };
  window.PROPS_DATA = PROPS_DATA;

  let upgradeLevels = {
    autoquack: Storage.getNumber('duck-upg-autoquack', 0, 0, 5),
    speed: Storage.getNumber('duck-upg-speed', 0, 0, 5),
    crit: Storage.getNumber('duck-upg-crit', 0, 0, 5),
    strength: Storage.getNumber('duck-upg-strength', 0, 0, 5),
    features: Storage.getNumber('duck-upg-features', 0, 0, 5),
  };
  window.upgradeLevels = upgradeLevels;

  const MAX_LEVEL = 20;
  const LEVEL_EXP_TABLE = [
    0,
    9,        // 1 -> 2
    30,       // 2 -> 3
    90,       // 3 -> 4
    255,      // 4 -> 5
    660,      // 5 -> 6
    1650,     // 6 -> 7
    3900,     // 7 -> 8
    9000,     // 8 -> 9
    19500,    // 9 -> 10
    42000,    // 10 -> 11
    84000,    // 11 -> 12
    165000,   // 12 -> 13
    300000,   // 13 -> 14
    540000,   // 14 -> 15
    960000,   // 15 -> 16
    1650000,  // 16 -> 17
    2700000,  // 17 -> 18
    4500000,  // 18 -> 19
    7500000   // 19 -> 20
  ];

  const LEVEL_UNLOCKS_INFO = {
    2: 'Автокрякалка / Скорость / Крит LVL 1',
    3: 'Сила LVL 2 (8 🦆/кл)',
    4: 'Возможности LVL 2 (Магазин)',
    5: 'Автокрякалка LVL 2 / Скорость LVL 2',
    6: 'Крит LVL 2 (10%, x4)',
    7: 'Сила LVL 3 (40 🦆/кл)',
    8: 'Возможности LVL 3 (Мама Утка — яйца)',
    9: 'Автокрякалка LVL 3 / Скорость LVL 3',
    10: 'Крит LVL 3 (18%, x5)',
    11: 'Новые рубежи опыта',
    12: 'Сила LVL 4 (200 🦆/кл)',
    13: 'Возможности LVL 4 (Переезд)',
    14: 'Автокрякалка LVL 4 / Скорость LVL 4',
    15: 'Крит LVL 4 (26%, x7)',
    16: 'Новые рубежи опыта',
    17: 'Сила LVL 5 (1000 🦆/кл)',
    18: 'Возможности LVL 5 (Бизнес)',
    19: 'Автокрякалка LVL 5 / Скорость LVL 5',
    20: 'МАКСИМАЛЬНЫЙ УРОВЕНЬ & Крит LVL 5'
  };

  const UPGRADES_DATA = [
    {
      id: 'features',
      name: 'Возможности',
      desc: 'Новые геймплейные элементы',
      levels: [
        { lvl: 1, text: 'Открывает автокрякалку и прокачку скорости', short: 'Автокряк', cost: 60, reqLvl: 1 },
        { lvl: 2, text: 'Открывает доступ к Магазину утки', short: 'Магазин', cost: 300, reqLvl: 4 },
        { lvl: 3, text: 'Мама Утка (теперь несет яйца: 10% обычное, 0.5% золотое)', short: 'Мама Утка', cost: 9000, reqLvl: 8 },
        { lvl: 4, text: 'Открывает возможность перемещать утку', short: 'Переезд', cost: 90000, reqLvl: 13 },
        { lvl: 5, text: 'Бизнес (открывает возможность вести бизнес)', short: 'Бизнес', cost: 1250000, reqLvl: 18 },
      ]
    },
    {
      id: 'autoquack',
      name: 'Автокрякалка',
      desc: 'Пассивный доход',
      requiresFeaturesLvl1: true,
      levels: [
        { lvl: 1, text: '+1 Дакль за тик', short: '+1 🦆/т', cost: 100, reqLvl: 2, rate: 1 },
        { lvl: 2, text: '+4 Дакля за тик', short: '+4 🦆/т', cost: 1250, reqLvl: 5, rate: 4 },
        { lvl: 3, text: '+18 Даклей за тик', short: '+18 🦆/т', cost: 17500, reqLvl: 9, rate: 18 },
        { lvl: 4, text: '+80 Даклей за тик', short: '+80 🦆/т', cost: 200000, reqLvl: 14, rate: 80 },
        { lvl: 5, text: '+350 Даклей за тик', short: '+350 🦆/т', cost: 2250000, reqLvl: 19, rate: 350 },
      ]
    },
    {
      id: 'speed',
      name: 'Скорость',
      desc: 'Быстрее!',
      requiresFeaturesLvl1: true,
      levels: [
        { lvl: 1, text: 'Частота автокрякалки: 1.5 сек (было 2.0с)', short: '1.5 сек', cost: 175, reqLvl: 2, interval: 1500 },
        { lvl: 2, text: 'Частота автокрякалки: 1.1 сек', short: '1.1 сек', cost: 1750, reqLvl: 5, interval: 1100 },
        { lvl: 3, text: 'Частота автокрякалки: 0.8 сек', short: '0.8 сек', cost: 22500, reqLvl: 9, interval: 800 },
        { lvl: 4, text: 'Частота автокрякалки: 0.55 сек', short: '0.55 сек', cost: 250000, reqLvl: 14, interval: 550 },
        { lvl: 5, text: 'Частота автокрякалки: 0.35 сек', short: '0.35 сек', cost: 2750000, reqLvl: 19, interval: 350 },
      ]
    },
    {
      id: 'crit',
      name: 'Крит шанс',
      desc: 'Увеличивает шанс крита и бонус',
      levels: [
        { lvl: 1, text: 'Шанс крита 5%, множитель x3 к клику', short: '5% (x3)', cost: 200, reqLvl: 2, chance: 5, mult: 3 },
        { lvl: 2, text: 'Шанс крита 10%, множитель x4 к клику', short: '10% (x4)', cost: 2250, reqLvl: 6, chance: 10, mult: 4 },
        { lvl: 3, text: 'Шанс крита 18%, множитель x5 к клику', short: '18% (x5)', cost: 27500, reqLvl: 10, chance: 18, mult: 5 },
        { lvl: 4, text: 'Шанс крита 26%, множитель x7 к клику', short: '26% (x7)', cost: 325000, reqLvl: 15, chance: 26, mult: 7 },
        { lvl: 5, text: 'Шанс крита 35%, множитель x10 к клику', short: '35% (x10)', cost: 3500000, reqLvl: 20, chance: 35, mult: 10 },
      ]
    },
    {
      id: 'strength',
      name: 'Сила',
      desc: 'Ай нид мор',
      levels: [
        { lvl: 1, text: '2 Дакли за нажатие', short: '2 🦆/кл', cost: 50, reqLvl: 1, power: 2 },
        { lvl: 2, text: '8 Даклей за нажатие', short: '8 🦆/кл', cost: 450, reqLvl: 3, power: 8 },
        { lvl: 3, text: '40 Даклей за нажатие', short: '40 🦆/кл', cost: 6000, reqLvl: 7, power: 40 },
        { lvl: 4, text: '200 Даклей за нажатие', short: '200 🦆/кл', cost: 75000, reqLvl: 12, power: 200 },
        { lvl: 5, text: '1000 Даклей за нажатие', short: '1000 🦆/кл', cost: 900000, reqLvl: 17, power: 1000 },
      ]
    }
  ];

  let charBuffer = '';
  let codeBuffer = '';
  let lastClickTime = 0;
  let comboMultiplier = 1;
  let autoQuackTimer = null;
  let hoverTimer = null;

  function getClickPower() {
    let p = 1;
    const strUpg = UPGRADES_DATA.find(u => u.id === 'strength');
    const strLvl = (typeof upgradeLevels !== 'undefined' && upgradeLevels.strength) ? upgradeLevels.strength : 0;
    if (strUpg && strLvl > 0) {
      p = strUpg.levels[strLvl - 1].power;
    }
    if (typeof saladBuffRemaining === 'number' && saladBuffRemaining > 0) {
      p = Math.round(p * 1.2);
    }
    return p;
  }
  window.getClickPower = getClickPower;

  function getExpForLevel(lvl) {
    if (lvl >= MAX_LEVEL) return Infinity;
    return LEVEL_EXP_TABLE[lvl] || 7500000;
  }

  function isAnyModalOpen() {
    return document.querySelector('.upgrades-modal.open') !== null || Boolean(window.isCharacterDialogOpen || isCharacterDialogOpen);
  }
  window.isAnyModalOpen = isAnyModalOpen;

  function closeAllModals() {
    if (typeof hidePropContextMenu === 'function') hidePropContextMenu();
    if (typeof closeCharacterDialog === 'function') closeCharacterDialog(true);
    if (typeof cancelDiscardConfirmation === 'function') cancelDiscardConfirmation();
    document.querySelectorAll('.upgrades-modal.open').forEach(modal => {
      modal.classList.remove('open');
    });
    const achvContainer = document.getElementById('achvToastContainer');
    if (achvContainer && achvContainer.children.length === 0) {
      achvContainer.classList.remove('over-modal');
    }
    const particlesCanvas = document.getElementById('particles');
    if (particlesCanvas && (!achvContainer || achvContainer.children.length === 0)) {
      particlesCanvas.classList.remove('over-modal');
    }
    updateUpgradesButtonHighlight();
  }
  window.closeAllModals = closeAllModals;

  function isWindowFocused() {
    return !document.hidden && (typeof document.hasFocus === 'function' ? document.hasFocus() : true);
  }
  window.isWindowFocused = isWindowFocused;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      particles.length = 0;
    }
  });
  window.addEventListener('blur', () => {
    if (document.hidden || (typeof document.hasFocus === 'function' && !document.hasFocus())) {
      particles.length = 0;
    }
  });

  function checkAvailableUpgrades() {
    for (let i = 0; i < UPGRADES_DATA.length; i++) {
      const upg = UPGRADES_DATA[i];
      if ((upg.id === 'autoquack' || upg.id === 'speed') && (upgradeLevels.features || 0) < 1) {
        continue;
      }
      const curLvl = upgradeLevels[upg.id] || 0;
      const nextLvl = curLvl + 1;
      if (nextLvl <= upg.levels.length) {
        const lvlData = upg.levels[nextLvl - 1];
        if (playerLevel >= lvlData.reqLvl && duckles >= lvlData.cost) {
          return true;
        }
      }
    }
    return false;
  }

  function updateUpgradesButtonHighlight() {
    const btn = document.getElementById('upgradesBtn');
    if (!btn) return;
    if (checkAvailableUpgrades()) {
      btn.classList.add('has-available');
    } else {
      btn.classList.remove('has-available');
    }
  }
  window.checkAvailableUpgrades = checkAvailableUpgrades;
  window.updateUpgradesButtonHighlight = updateUpgradesButtonHighlight;

  const ducklesVal = document.getElementById('ducklesVal');
  const modalDucklesVal = document.getElementById('modalDucklesVal');
  const shopDucklesVal = document.getElementById('shopDucklesVal');

  function updateDuckles(bump = false) {
    if (ducklesVal) {
      ducklesVal.textContent = duckles.toLocaleString('ru-RU');
      if (bump) {
        ducklesVal.classList.remove('bump');
        void ducklesVal.offsetWidth;
        ducklesVal.classList.add('bump');
      }
    }
    if (modalDucklesVal) {
      modalDucklesVal.textContent = duckles.toLocaleString('ru-RU');
    }
    if (shopDucklesVal) {
      shopDucklesVal.textContent = duckles.toLocaleString('ru-RU');
    }
    const branchesDucklesVal = document.getElementById('branchesDucklesVal');
    if (branchesDucklesVal) {
      branchesDucklesVal.textContent = duckles.toLocaleString('ru-RU');
    }
    updateUpgradesButtonHighlight();
  }

  function updateShopButtonVisibility() {
    const shopBtn = document.getElementById('shopBtn');
    if (shopBtn) {
      shopBtn.style.display = (upgradeLevels.features >= 2) ? 'inline-flex' : 'none';
    }
    const wardrobeBtn = document.getElementById('wardrobeBtn');
    if (wardrobeBtn) {
      wardrobeBtn.style.display = (ownedSkins.length > 1) ? 'inline-flex' : 'none';
    }
    const storageBtn = document.getElementById('storageBtn');
    if (storageBtn) {
      storageBtn.style.display = (ownedProps.length > 0) ? 'inline-flex' : 'none';
    }
    updateBranchesButtonUI();
    updateShopTabsVisibility();
  }

  function updateShopTabsVisibility() {
    const buyBtn = document.getElementById('shopTabBuyBtn');
    const sellBtn = document.getElementById('shopTabSellBtn');
    const buyBody = document.getElementById('shopBodyBuy');
    const sellBody = document.getElementById('shopBodySell');
    const foodSection = document.getElementById('foodShopSection');
    const animalsSection = document.getElementById('animalsShopSection');

    const hasFoodUnlocked = Boolean(
      (typeof upgradeLevels !== 'undefined' && upgradeLevels.features >= 3) ||
      (typeof normalEggs !== 'undefined' && normalEggs > 0) ||
      (typeof goldenEggs !== 'undefined' && goldenEggs > 0) ||
      (typeof friedEggs !== 'undefined' && friedEggs > 0) ||
      (typeof goldenFriedEggs !== 'undefined' && goldenFriedEggs > 0) ||
      (typeof normalRoastedGeese !== 'undefined' && normalRoastedGeese > 0) ||
      (typeof goldenRoastedGeese !== 'undefined' && goldenRoastedGeese > 0) ||
      (typeof hasUnlockedFriedEggs !== 'undefined' && hasUnlockedFriedEggs) ||
      (typeof hasCookedGoose !== 'undefined' && hasCookedGoose)
    );

    const hasAnimalsUnlocked = Boolean(
      (typeof hasHatchedDuckling !== 'undefined' && hasHatchedDuckling) ||
      (typeof hasHatchedGoldenDuckling !== 'undefined' && hasHatchedGoldenDuckling) ||
      (typeof ownedProps !== 'undefined' && Array.isArray(ownedProps) && ownedProps.includes('incubator')) ||
      (typeof placedProps !== 'undefined' && Array.isArray(placedProps) && placedProps.some(p => p && p.id === 'incubator')) ||
      (typeof normalDucklings !== 'undefined' && normalDucklings > 0) ||
      (typeof goldenDucklings !== 'undefined' && goldenDucklings > 0) ||
      (typeof normalGeese !== 'undefined' && normalGeese > 0) ||
      (typeof goldenGeese !== 'undefined' && goldenGeese > 0) ||
      (typeof deskCreatures !== 'undefined' && Array.isArray(deskCreatures) && deskCreatures.length > 0) ||
      (typeof incubatingEggs !== 'undefined' && Array.isArray(incubatingEggs) && incubatingEggs.length > 0)
    );

    if (foodSection) foodSection.style.display = hasFoodUnlocked ? 'block' : 'none';
    if (animalsSection) animalsSection.style.display = hasAnimalsUnlocked ? 'block' : 'none';

    const canSell = hasFoodUnlocked || hasAnimalsUnlocked;
    if (sellBtn) {
      if (!canSell) {
        sellBtn.disabled = true;
        sellBtn.classList.add('disabled');
        sellBtn.innerHTML = '🔒 Продажа';
        sellBtn.title = 'Требуется открыть еду или животных для продажи';
        if (sellBtn.classList.contains('active')) {
          if (typeof switchShopTab === 'function') {
            switchShopTab('buy');
          } else {
            if (buyBtn) buyBtn.classList.add('active');
            sellBtn.classList.remove('active');
            if (buyBody) buyBody.style.display = 'flex';
            if (sellBody) sellBody.style.display = 'none';
          }
        }
      } else {
        sellBtn.disabled = false;
        sellBtn.classList.remove('disabled');
        sellBtn.innerHTML = '💰 Продажа';
        sellBtn.title = '';
      }
    }
  }
  window.updateShopTabsVisibility = updateShopTabsVisibility;

  function updateLevelDisplay(bump = false) {
    const lvlNumEl = document.getElementById('lvlNum');
    const lvlBarFill = document.getElementById('lvlBarFill');
    const lvlExpText = document.getElementById('lvlExpText');
    const lvlNextUnlock = document.getElementById('lvlNextUnlock');

    if (lvlNumEl) {
      lvlNumEl.textContent = playerLevel >= MAX_LEVEL ? (MAX_LEVEL + ' (MAX)') : playerLevel;
      if (bump) {
        lvlNumEl.style.transform = 'scale(1.35)';
        setTimeout(() => lvlNumEl.style.transform = 'none', 180);
      }
    }
    if (playerLevel >= MAX_LEVEL) {
      if (lvlBarFill) lvlBarFill.style.width = '100%';
      if (lvlExpText) lvlExpText.textContent = 'МАКСИМУМ ДОСТИГНУТ';
      if (lvlNextUnlock) lvlNextUnlock.textContent = '🏆 Все улучшения открыты!';
    } else {
      const req = getExpForLevel(playerLevel);
      const pct = Math.min(100, Math.max(0, (playerExp / req) * 100));
      if (lvlBarFill) lvlBarFill.style.width = pct + '%';
      if (lvlExpText) {
        lvlExpText.textContent = `${Math.floor(playerExp).toLocaleString('ru-RU')} / ${req.toLocaleString('ru-RU')} 🦆`;
      }
      if (lvlNextUnlock) {
        const nextInfo = LEVEL_UNLOCKS_INFO[playerLevel + 1] || 'Новые рубежи';
        lvlNextUnlock.textContent = `На LVL ${playerLevel + 1}: ${nextInfo}`;
      }
    }

    const lvlRoachWarning = document.getElementById('lvlRoachWarning');
    if (lvlRoachWarning) {
      lvlRoachWarning.style.display = isRoachesActive ? 'block' : 'none';
    }

    updateUpgradesButtonHighlight();
  }
