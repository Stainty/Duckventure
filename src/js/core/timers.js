/* ==========================================================================
     Единый игровой мастер-таймер реального времени (Date.now + Фоновая вкладка)
     ========================================================================== */
  let lastGameTickTime = Date.now();

  function advanceGameTime(deltaSec) {
    if (deltaSec <= 0) return;

    // Проверяем, открыто ли любое модальное окно (магазин, склад, апгрейды, филиалы и т.д.)
    const isModalOpen = typeof isAnyModalOpen === 'function' && isAnyModalOpen();

    // 1. Свежесть и порча партий яиц (30 сек без холодильника, 60 сек с холодильником)
    // Останавливаем таймер порчи яиц, пока игрок находится в модальных окнах
    if (!isModalOpen && eggBatches && eggBatches.length > 0) {
      let spoiled = [];
      for (const b of eggBatches) {
        b.remaining = Math.max(0, b.remaining - deltaSec);
        if (b.remaining <= 0) {
          spoiled.push(b);
        }
      }
      if (spoiled.length > 0) {
        spoilEggBatches(spoiled);
      } else {
        saveEggBatches();
      }
    }

    const oldest = getOldestEggBatchRemaining();
    if (oldest !== null) {
      eggSpoilRemaining = Math.ceil(oldest);
    } else {
      eggSpoilRemaining = (typeof isFridgeOn !== 'undefined' && isFridgeOn) ? 60 : 30;
    }
    try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
    updateEggSpoilTimerDisplay();

    // 2. Протухшие яйца на столе: если не убирать в течение 2 минут (120 сек) -> дебафф -50% на 2 минуты
    // Также останавливаем отсчет времени до дебаффа, пока открыто меню
    const rottenEggEl = document.getElementById('rottenEgg');
    if (isRottenEggActive && rottenEggEl && rottenEggEl.style.display !== 'none' && !isModalOpen) {
      let rDelta = deltaSec;
      while (rDelta > 0 && isRottenEggActive && rottenEggEl && rottenEggEl.style.display !== 'none') {
        if (rDelta < rottenEggRotRemaining) {
          rottenEggRotRemaining -= rDelta;
          rDelta = 0;
        } else {
          rDelta -= rottenEggRotRemaining;
          rottenEggRotRemaining = 120;
          applyStinkDebuff(120);
        }
      }
      try { Storage.set('duck-rotten-rot-remaining', String(rottenEggRotRemaining)); } catch (e) {}
    }

    // 3. Отсчет времени дебаффа (-50% на 2 минуты = 120 сек)
    if (stinkDebuffRemaining > 0) {
      stinkDebuffRemaining = Math.max(0, stinkDebuffRemaining - deltaSec);
      try { Storage.set('duck-stink-debuff-remaining', String(stinkDebuffRemaining)); } catch (e) {}
      updateStinkDebuffUI();
      if (stinkDebuffRemaining <= 0) {
        clearStinkDebuff();
      }
    }

    // 4. Инкубация яиц: 2 минуты (120 сек)
    if (isIncubating) {
      incubatingRemaining = Math.max(0, incubatingRemaining - deltaSec);
      try { Storage.set(INCUBATING_REMAINING_KEY, String(incubatingRemaining)); } catch (e) {}
      updateIncubatorUI();
      if (incubatingRemaining <= 0) {
        finishIncubation();
      }
    }

    // 5. Филиалы бизнеса (продвижение циклов и штрафов)
    tickBusinesses(deltaSec);

    // 6. Рост утят на столе: 10 минут (600 сек) -> вырастают в Большую Утку
    if (typeof tickDucklingsGrowth === 'function') {
      tickDucklingsGrowth(deltaSec);
    }

    // 7. Сдувание утки от ножа: 5 минут (300 сек) -> Game Over
    if (isDuckDeflating) {
      deflationRemaining = Math.max(0, deflationRemaining - deltaSec);
      try { Storage.set(DUCK_DEFLATING_REMAINING_KEY, String(deflationRemaining)); } catch (e) {}
      updateDeflationUI();

      // Периодические частицы выходящего воздуха (только при активном показе)
      if (deflationRemaining > 0 && Math.random() < 0.28 && deltaSec <= 3) {
        const rD = duck.getBoundingClientRect();
        particles.push({
          x: rD.left + rD.width / 2 + (Math.random() - 0.5) * 40,
          y: rD.top + rD.height / 2,
          vx: (Math.random() - 0.5) * 40,
          vy: -50 - Math.random() * 40,
          size: 14 + Math.random() * 8,
          alpha: 0.9,
          text: '💨',
          color: '#93c5fd'
        });
      }

      if (deflationRemaining <= 0) {
        triggerDeflatedDuckGameOver();
      }
    }
  }

  function processGameTick() {
    const now = Date.now();
    const elapsedSec = Math.floor((now - lastGameTickTime) / 1000);
    if (elapsedSec >= 1) {
      lastGameTickTime += elapsedSec * 1000;
      advanceGameTime(elapsedSec);
    }
  }

  function handleTabResume() {
    processGameTick();
    updateEggSpoilTimerDisplay();
    updateStinkDebuffUI();
    updateIncubatorUI();
    updateDeskCreatureUI();
    updateDeflationUI();
    updateBadgesPosition();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      handleTabResume();
    }
  });
  window.addEventListener('focus', handleTabResume);
  window.addEventListener('pageshow', handleTabResume);

  function startEggSpoilTicker() {
    if (eggSpoilInterval) clearInterval(eggSpoilInterval);
    lastGameTickTime = Date.now();
    eggSpoilInterval = setInterval(processGameTick, 500);
  }
  window.advanceGameTime = advanceGameTime;
