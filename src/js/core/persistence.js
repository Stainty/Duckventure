const GRAVITY = 1000;      // px/s²
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  const duck = document.getElementById('duck');
  const particles = [];
  window.particlesList = particles;
  let audioCtx = null;

  const STORAGE_PREFIX = 'duck-achv-';
  const QUACK_KEY = 'duck-quack-count';
  const DUCKLES_KEY = 'duck-duckles';
  const HINT_KEY = 'duck-hint-count';
  const KEY_PRESSED_KEY = 'duck-key-pressed';
  const SEQ_DONE_KEY = 'duck-seq-done';
  const LOCKED_CLICKED_KEY = 'duck-locked-clicked';
  const DEVTOOLS_KEY = 'duck-devtools';
  const BAD_WORDS_KEY = 'duck-bad-words';
  const GTA_CHEAT_KEY = 'duck-gta-cheat';
  const BEAST_NUMBER_KEY = 'duck-beast-number';
  const HOVER_WAIT_KEY = 'duck-hover-wait';
  const LEVEL_KEY = 'duck-level';
  const EXP_KEY = 'duck-level-exp';
  const EGGS_NORMAL_KEY = 'duck-eggs-normal';
  const EGGS_GOLDEN_KEY = 'duck-eggs-golden';
  const FRIED_EGGS_KEY = 'duck-fried-eggs';
  const GOLDEN_FRIED_EGGS_KEY = 'duck-golden-fried-eggs';
  const HAS_FRIED_KEY = 'duck-has-fried-eggs';
  const COOKED_EGG_KEY = 'duck-cooked-egg';
  const STOVE_COMBINED_KEY = 'duck-stove-combined';
  const PLACED_FRIDGE_KEY = 'duck-placed-fridge';
  const ROACHES_ACTIVE_KEY = 'duck-roaches-active';
  const USED_DICHLOFOS_KEY = 'duck-used-dichlofos';
  const CLEARED_ROACHES_KEY = 'duck-cleared-roaches';
  const MOVED_DUCK_KEY = 'duck-moved-duck';
  const SPAWNED_KEY_KEY = 'duck-spawned-key';
  const DUCK_POS_KEY = 'duck-pos';
  const OWNED_SKINS_KEY = 'duck-owned-skins';
  const CURRENT_SKIN_KEY = 'duck-current-skin';
  const OWNED_PROPS_KEY = 'duck-owned-props';
  const PLACED_PROPS_KEY = 'duck-placed-props';
  const SHOP_CLOTHING_COLLAPSED_KEY = 'duck-shop-clothing-collapsed';
  const SHOP_HOUSEHOLD_COLLAPSED_KEY = 'duck-shop-household-collapsed';
  const SHOP_FOOD_BUY_COLLAPSED_KEY = 'duck-shop-food-buy-collapsed';
  const SHOP_GARDENING_COLLAPSED_KEY = 'duck-shop-gardening-collapsed';
  const SHOP_FOOD_COLLAPSED_KEY = 'duck-shop-food-collapsed';
  const SHOP_ANIMALS_COLLAPSED_KEY = 'duck-shop-animals-collapsed';
  const HAS_SMASHED_EGGS_KEY = 'duck-has-smashed-eggs';
  const TRANSFERRED_PROPS_KEY = 'duck-transferred-props';
  const HAS_FRIED_DUCK_KEY = 'duck-has-fried-duck';
  const HAS_STABBED_DUCK_KEY = 'duck-has-stabbed-duck';
  const DUCK_IS_DEFLATING_KEY = 'duck-is-deflating';
  const DUCK_DEFLATING_REMAINING_KEY = 'duck-deflating-remaining';
  const HAS_PATCHED_DUCK_KEY = 'duck-has-patched-duck';
  const LAMP_ON_KEY = 'duck-lamp-on';
  const FRIDGE_ON_KEY = 'duck-fridge-on';
  const EGG_SPOIL_TIMER_KEY = 'duck-egg-spoil-sec';
  const EGG_BATCHES_KEY = 'duck-egg-batches';
  const CHEAT_PANEL_KEY = 'duck-cheat-panel-visible';
  const DUCK_FEED_ALPHA_REMAINING_KEY = 'duck-feed-alpha-remaining';
  const DUCK_FEED_BETA_REMAINING_KEY = 'duck-feed-beta-remaining';
  const DUCK_DIARRHEA_REMAINING_KEY = 'duck-diarrhea-remaining';
  const SALAD_BUFF_REMAINING_KEY = 'duck-salad-buff-remaining';
  const CUTTING_BOARD_INGREDIENTS_KEY = 'duck-cutting-board-ingredients';

  /* ==========================================================================
     Устойчивое хранилище (Safe LocalStorage Layer)
     ========================================================================== */
  const Storage = {
    get(key, defaultValue = null) {
      try {
        const val = localStorage.getItem(key);
        return val !== null ? val : defaultValue;
      } catch (err) {
        console.warn(`[Duckventure Storage] Failed to read key "${key}":`, err);
        return defaultValue;
      }
    },
    getNumber(key, defaultValue = 0, min = 0, max = Infinity) {
      try {
        const val = localStorage.getItem(key);
        if (val === null || val === undefined || val === '') return defaultValue;
        const num = parseInt(val, 10);
        if (Number.isNaN(num) || !Number.isFinite(num)) return defaultValue;
        return Math.min(max, Math.max(min, num));
      } catch (err) {
        console.warn(`[Duckventure Storage] Failed to read number key "${key}":`, err);
        return defaultValue;
      }
    },
    getBoolean(key, defaultValue = false) {
      try {
        const val = localStorage.getItem(key);
        if (val === null) return defaultValue;
        return val === '1' || val === 'true';
      } catch (err) {
        console.warn(`[Duckventure Storage] Failed to read boolean key "${key}":`, err);
        return defaultValue;
      }
    },
    getJSON(key, defaultValue = null, validator = null) {
      try {
        const val = localStorage.getItem(key);
        if (val === null || val === undefined || val === '') return defaultValue;
        const parsed = JSON.parse(val);
        if (validator && typeof validator === 'function') {
          return validator(parsed) ? parsed : defaultValue;
        }
        return (parsed !== null && parsed !== undefined) ? parsed : defaultValue;
      } catch (err) {
        console.warn(`[Duckventure Storage] Failed to parse JSON key "${key}":`, err);
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, String(value));
        return true;
      } catch (err) {
        console.error(`[Duckventure Storage] Failed to write key "${key}":`, err);
        return false;
      }
    },
    setJSON(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        console.error(`[Duckventure Storage] Failed to write JSON key "${key}":`, err);
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (err) {
        console.warn(`[Duckventure Storage] Failed to remove key "${key}":`, err);
        return false;
      }
    }
  };
  window.DuckStorage = Storage;
