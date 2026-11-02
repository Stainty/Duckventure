/* ==========================================================================
     Единая система управления валютой (Unified Currency Management)
     ========================================================================== */
  function setDuckles(amount, skipUI = false) {
    const safeAmount = Math.max(0, Math.floor(Number(amount) || 0));
    duckles = safeAmount;
    Storage.set(DUCKLES_KEY, String(duckles));
    if (!skipUI) updateDuckles(false);
    return duckles;
  }
  window.setDuckles = setDuckles;
  window.getDuckles = () => duckles;

  function earnDuckles(amount, givesExp = false, bump = true) {
    const safeAmount = Math.floor(Number(amount) || 0);
    if (safeAmount <= 0) return false;
    duckles += safeAmount;
    Storage.set(DUCKLES_KEY, String(duckles));
    updateDuckles(bump);

    if (givesExp && playerLevel < MAX_LEVEL && !isRoachesActive) {
      playerExp += safeAmount;
      let expForNext = getExpForLevel(playerLevel);
      let leveledUp = false;

      while (playerLevel < MAX_LEVEL && playerExp >= expForNext) {
        playerExp -= expForNext;
        playerLevel++;
        leveledUp = true;
        expForNext = getExpForLevel(playerLevel);
      }

      if (leveledUp) {
        const lvlBox = document.getElementById('lvlNum');
        if (lvlBox) {
          const r = lvlBox.getBoundingClientRect();
          spawnLvlUp(r.left + r.width / 2, r.top);
        }
        xpSound();
        Storage.set(LEVEL_KEY, String(playerLevel));
      }
      Storage.set(EXP_KEY, String(playerExp));
      updateLevelDisplay(leveledUp);
    }

    const upgModal = document.getElementById('upgradesModal');
    if (upgModal && upgModal.classList.contains('open')) {
      renderUpgrades(true);
    }
    const shopModal = document.getElementById('shopModal');
    if (shopModal && shopModal.classList.contains('open')) {
      renderShopBuyTab();
    }
    const branchesModal = document.getElementById('branchesModal');
    if (branchesModal && branchesModal.classList.contains('open')) {
      renderBranchesModal();
    }
    tryUnlock();
    return true;
  }
  window.earnDuckles = earnDuckles;

  function addDuckles(amount) {
    return earnDuckles(amount, true, true);
  }
  window.addDuckles = addDuckles;

  function spendDuckles(amount) {
    const safeAmount = Math.floor(Number(amount) || 0);
    if (safeAmount <= 0) return false;
    if (duckles < safeAmount) return false;

    duckles -= safeAmount;
    Storage.set(DUCKLES_KEY, String(duckles));
    updateDuckles(true);

    const upgModal = document.getElementById('upgradesModal');
    if (upgModal && upgModal.classList.contains('open')) {
      renderUpgrades(true);
    }
    const shopModal = document.getElementById('shopModal');
    if (shopModal && shopModal.classList.contains('open')) {
      renderShopBuyTab();
    }
    const branchesModal = document.getElementById('branchesModal');
    if (branchesModal && branchesModal.classList.contains('open')) {
      renderBranchesModal();
    }
    return true;
  }
  window.spendDuckles = spendDuckles;

  function penalizeDuckles(amount) {
    const safeAmount = Math.floor(Number(amount) || 0);
    if (safeAmount <= 0) return 0;
    const actualDeduction = Math.min(duckles, safeAmount);
    duckles -= actualDeduction;
    Storage.set(DUCKLES_KEY, String(duckles));
    updateDuckles(true);

    const branchesModal = document.getElementById('branchesModal');
    if (branchesModal && branchesModal.classList.contains('open')) {
      renderBranchesModal();
    }
    return actualDeduction;
  }
  window.penalizeDuckles = penalizeDuckles;

  function spawnLvlUp(x, y) {
    if (!isWindowFocused()) return;
    const count = 5 + (Math.random() * 4 | 0);
    for (let i = 0; i < count; i++) {
      const ang = 0.25 + Math.random() * Math.PI * 0.5;
      const speed = 190 + Math.random() * 260;
      particles.push({
        x: x + (Math.random() - .5) * 44,
        y: y + (Math.random() - .5) * 14,
        vx: Math.cos(ang) * speed,
        vy: -Math.sin(ang) * speed,
        size: 18 + Math.random() * 12,
        alpha: 1,
        text: 'LVL UP!',
        color: '#ffd24d'
      });
    }
  }
