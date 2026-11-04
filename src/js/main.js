/* ---------- инициализация ---------- */
  initDraggableEgg(document.getElementById('normalEgg'), 'normal');
  initDraggableEgg(document.getElementById('goldenEgg'), 'golden');
  initDraggableEgg(document.getElementById('friedEgg'), 'fried');
  initDraggableEgg(document.getElementById('goldenFriedEgg'), 'goldenFried');
  initDraggableProp(document.getElementById('prop-skovoroda'), 'skovoroda');
  initDraggableProp(document.getElementById('prop-plita'), 'plita');
  initDraggableProp(document.getElementById('prop-fridge'), 'fridge');
  initDraggableProp(document.getElementById('prop-dichlofos'), 'dichlofos');
  initDraggableProp(document.getElementById('prop-key'), 'key');
  initDraggableProp(document.getElementById('prop-lamp'), 'lamp');
  initDraggableProp(document.getElementById('prop-trashcan'), 'trashcan');
  initDraggableProp(document.getElementById('prop-clock'), 'clock');
  initDraggableProp(document.getElementById('prop-knife'), 'knife');
  initDraggableProp(document.getElementById('prop-tape'), 'tape');
  initDraggableProp(document.getElementById('prop-incubator'), 'incubator');
  initDraggableProp(document.getElementById('prop-birdFeed'), 'birdFeed');
  initDraggableProp(document.getElementById('prop-duckFeedAlpha'), 'duckFeedAlpha');
  initDraggableProp(document.getElementById('prop-duckFeedBeta'), 'duckFeedBeta');
  initDraggableProp(document.getElementById('prop-veggieSet'), 'veggieSet');
  document.querySelectorAll('.desk-creature').forEach(el => initDraggableCreature(el));
  applySkin(currentSkin);
  restorePropsOnScreen();
  clampAllPlacedPropsToScreen();
  updateLampGlowUI();
  updateFridgeUI();
  updateDeflationUI();
  updateIncubatorUI();
  updateDeskCreatureUI();
  startDeskCreatureWander();
  updateBadgesPosition();
  function clampDeskCreatureToScreen() {
    document.querySelectorAll('.desk-creature').forEach(el => {
      if (!el || el.style.display === 'none') return;
      const curLeft = parseFloat(el.style.left);
      const curTop = parseFloat(el.style.top);
      if (!isNaN(curLeft)) {
        const maxL = Math.max(10, window.innerWidth - (el.offsetWidth || 60) - 10);
        el.style.left = Math.max(10, Math.min(maxL, curLeft)) + 'px';
      }
      if (!isNaN(curTop)) {
        const maxT = Math.max(60, window.innerHeight - (el.offsetHeight || 60) - 20);
        el.style.top = Math.max(60, Math.min(maxT, curTop)) + 'px';
      }
    });
  }

    function clampDuckToScreen() {
    if (duck && duck.style.position === 'fixed' && duck.style.left) {
      const curL = parseFloat(duck.style.left);
      const curT = parseFloat(duck.style.top);
      if (!isNaN(curL) && !isNaN(curT)) {
        const maxL = Math.max(0, window.innerWidth - (duck.offsetWidth || 180));
        const maxT = Math.max(0, window.innerHeight - (duck.offsetHeight || 180));
        duck.style.left = `${Math.max(0, Math.min(maxL, curL))}px`;
        duck.style.top = `${Math.max(0, Math.min(maxT, curT))}px`;
      }
    }
  }
  window.clampDuckToScreen = clampDuckToScreen;
  window.addEventListener('resize', () => { updateBadgesPosition(); clampAllPlacedPropsToScreen(); clampDeskCreatureToScreen(); clampDuckToScreen(); });
  updateBranchesButtonUI();
  if (Storage.getBoolean(CHEAT_PANEL_KEY, false)) {
    const cp = document.getElementById('cheatPanel');
    if (cp) cp.classList.add('visible');
  }
  startEggSpoilTicker();

  if (Storage.getBoolean('duck-rotten-egg-active', false)) {
    isRottenEggActive = true;
    rottenEggRotRemaining = Storage.getNumber('duck-rotten-rot-remaining', 120, 0);
    const rEgg = document.getElementById('rottenEgg');
    if (rEgg) rEgg.style.display = 'block';
  }
  const savedDebuff = Storage.getNumber('duck-stink-debuff-remaining', 0, 0);
  if (savedDebuff > 0) {
    stinkDebuffRemaining = savedDebuff;
    updateStinkDebuffUI();
  }

  if (upgradeLevels.features >= 4) {
    const savedDuckPos = Storage.getJSON(DUCK_POS_KEY, null, (data) => data && typeof data === 'object' && typeof data.left === 'string' && typeof data.top === 'string');
    if (savedDuckPos && savedDuckPos.left && savedDuckPos.top) {
      duck.style.position = 'fixed';
      duck.style.left = savedDuckPos.left;
      duck.style.top = savedDuckPos.top;
      duck.style.margin = '0';
      duck.style.zIndex = '50';
    }
  }
  updateDuckDragCursor();

  if (isRoachesActive) startRoaches();
  buildAchievementCards();
  updateDuckles();
  updateLevelDisplay();
  updateAutoQuackTimer();
  updateEggsDisplay();
  renderUpgrades(true);
  renderShopBuyTab();
  updateShopButtonVisibility();
  updateShopTabsVisibility();
  tryUnlock();

  /* ---------- цикл ---------- */
  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    if (particles.length > 200) {
      particles.splice(0, particles.length - 200);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vy += GRAVITY * dt;          // тяжение
      p.x  += p.vx * dt;
      p.y  += p.vy * dt;
      if (p.fly) p.rot += p.rotSpeed * dt;

      // улетели за экран — убираем
      if (p.x < -60 || p.x > innerWidth + 60 || p.y > innerHeight + 80 || p.y < -200) {
        particles.splice(i, 1);
        continue;
      }

      if (p.fly) {
        // замок летит по той же траектории, что и «Кря»
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = p.size + 'px "Segoe UI Emoji", "Segoe UI Symbol", system-ui';
        ctx.fillText('🔒', 0, 0);
        ctx.restore();
      } else if (p.text) {
        p.alpha -= 0.65 * dt;
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.font = '800 ' + p.size + 'px system-ui, "Segoe UI", sans-serif';
        ctx.fillStyle = p.color || '#ffd24d';
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.shadowColor = 'rgba(255, 210, 77, 0.7)';
        ctx.shadowBlur = 12;
        ctx.textAlign = 'center';
        ctx.fillText(p.text, p.x, p.y);
        ctx.restore();
      } else {
        ctx.font = 'bold ' + p.size + 'px "Segoe UI", system-ui, sans-serif';
        ctx.fillStyle = 'hsla(' + p.hue + ', ' + p.sat + '%, ' + p.light + '%, ' + p.alpha + ')';
        ctx.fillText('Кря', p.x, p.y);
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
