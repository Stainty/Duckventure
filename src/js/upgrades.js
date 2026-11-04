/* ---------- Логика апгрейдов и автокрякалки ---------- */
  const SPEED_INTERVALS = [2000, 1500, 1100, 800, 550, 350];

  function getAutoQuackInterval() {
    const spdLvl = Math.min(5, Math.max(0, upgradeLevels.speed || 0));
    return SPEED_INTERVALS[spdLvl];
  }

  function spawnAutoQuack(x, y) {
    if (!isWindowFocused()) return;
    const scale = Math.max(0.65, Math.min(1.0, window.innerWidth / 768));
    const n = 3 + (Math.random() * 3 | 0); // 3..5 частиц
    for (let i = 0; i < n; i++) {
      const ang = Math.random() * Math.PI;
      const speed = (70 + Math.random() * 200) * scale;
      particles.push({
        x: x + (Math.random() - .5) * (18 * scale),
        y: y + (Math.random() - .5) * (12 * scale),
        vx: Math.cos(ang) * speed,
        vy: -Math.sin(ang) * speed,
        size: Math.round((10 + Math.random() * 14) * scale),
        alpha: 0.10 + Math.random() * 0.20,
        hue: Math.random() * 360 | 0,
        sat: 40 + Math.random() * 25 | 0,
        light: 60 + Math.random() * 15 | 0
      });
    }
  }

  function updateAutoQuackTimer() {
    if (autoQuackTimer) clearInterval(autoQuackTimer);
    // Прокачка Автокрякалка не доступна пока не прокачен 1 LVL Возможности
    if (upgradeLevels.features < 1) return;
    const lvl = upgradeLevels.autoquack;
    const isAlphaActive = (typeof duckFeedAlphaRemaining === 'number' && duckFeedAlphaRemaining > 0);
    const isBetaActive = (typeof duckFeedBetaRemaining === 'number' && duckFeedBetaRemaining > 0);
    if (lvl <= 0 && !isAlphaActive) return; // По умолчанию без дохода

    const autoUpg = UPGRADES_DATA.find(u => u.id === 'autoquack');
    let rate = (autoUpg && lvl > 0) ? autoUpg.levels[lvl - 1].rate : 0;

    // Корм Альфа: увеличиваем доходность автокрякалки до уровня силы обычного клика на 30 сек
    if (isAlphaActive) {
      const clickPower = typeof getClickPower === 'function' ? getClickPower() : 1;
      rate = Math.max(rate, clickPower);
    }

    // Возможности ур 5: Золотая утка (x2 ко всему доходу)
    if (upgradeLevels.features >= 5) {
      rate *= 2;
    }

    // Дебафф от протухших яиц: -50% ко всем характеристикам
    if (typeof isStinkDebuffActive === 'function' && isStinkDebuffActive()) {
      rate = Math.max(1, Math.floor(rate * 0.5));
    }

    let intervalMs = getAutoQuackInterval();

    // Корм Бета: увеличиваем скорость автокрякалки в 2 раза на 30 сек
    if (isBetaActive) {
      intervalMs = Math.max(100, Math.round(intervalMs / 2));
    }

    if (typeof isStinkDebuffActive === 'function' && isStinkDebuffActive()) {
      intervalMs = Math.round(intervalMs * 1.5);
    }

    autoQuackTimer = setInterval(() => {
      // Игра на паузе пока открыты любые модальные окна или когда утка зажарена / сдулась
      if (isAnyModalOpen() || isCookedDuckActive || isDeflatedDuckActive) return;

      addDuckles(rate);

      // 3-5 более прозрачных частиц только если окно активно и в фокусе (не спавнить в фоне)
      if (isWindowFocused()) {
        const r = duck.getBoundingClientRect();
        spawnAutoQuack(r.left + r.width * 0.48, r.top + r.height * 0.36);
      }

      // Выпадение яиц при автокряканье
      checkEggRoll(false);
    }, intervalMs);
  }
