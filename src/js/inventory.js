/* ---------- Вкладка продажи в магазине ---------- */
  function updateShopSellTab() {
    const shopNormalCount = document.getElementById('shopNormalEggsCount');
    const shopGoldenCount = document.getElementById('shopGoldenEggsCount');
    const sellNormal1Btn = document.getElementById('sellNormal1Btn');
    const sellNormalAllBtn = document.getElementById('sellNormalAllBtn');
    const sellGolden1Btn = document.getElementById('sellGolden1Btn');
    const sellGoldenAllBtn = document.getElementById('sellGoldenAllBtn');

    if (shopNormalCount) shopNormalCount.textContent = normalEggs.toLocaleString('ru-RU');
    if (shopGoldenCount) shopGoldenCount.textContent = goldenEggs.toLocaleString('ru-RU');

    if (sellNormal1Btn) sellNormal1Btn.disabled = normalEggs < 1;
    if (sellNormalAllBtn) {
      sellNormalAllBtn.disabled = normalEggs < 1;
      sellNormalAllBtn.textContent = `Продать всё (+${(normalEggs * 200).toLocaleString('ru-RU')} 🦆)`;
    }

    if (sellGolden1Btn) sellGolden1Btn.disabled = goldenEggs < 1;
    if (sellGoldenAllBtn) {
      sellGoldenAllBtn.disabled = goldenEggs < 1;
      sellGoldenAllBtn.textContent = `Продать всё (+${(goldenEggs * 5000).toLocaleString('ru-RU')} 🦆)`;
    }

    const sellFriedCard = document.getElementById('sellFriedCard');
    const sellGoldenFriedCard = document.getElementById('sellGoldenFriedCard');
    const shopFriedCount = document.getElementById('shopFriedEggsCount');
    const shopGoldenFriedCount = document.getElementById('shopGoldenFriedEggsCount');
    const sellFried1Btn = document.getElementById('sellFried1Btn');
    const sellFriedAllBtn = document.getElementById('sellFriedAllBtn');
    const sellGoldenFried1Btn = document.getElementById('sellGoldenFried1Btn');
    const sellGoldenFriedAllBtn = document.getElementById('sellGoldenFriedAllBtn');

    if (hasUnlockedFriedEggs) {
      if (sellFriedCard) sellFriedCard.style.display = 'flex';
      if (sellGoldenFriedCard) sellGoldenFriedCard.style.display = 'flex';

      if (shopFriedCount) shopFriedCount.textContent = friedEggs.toLocaleString('ru-RU');
      if (shopGoldenFriedCount) shopGoldenFriedCount.textContent = goldenFriedEggs.toLocaleString('ru-RU');

      if (sellFried1Btn) sellFried1Btn.disabled = friedEggs < 1;
      if (sellFriedAllBtn) {
        sellFriedAllBtn.disabled = friedEggs < 1;
        sellFriedAllBtn.textContent = `Продать всё (+${(friedEggs * 1600).toLocaleString('ru-RU')} 🦆)`;
      }

      if (sellGoldenFried1Btn) sellGoldenFried1Btn.disabled = goldenFriedEggs < 1;
      if (sellGoldenFriedAllBtn) {
        sellGoldenFriedAllBtn.disabled = goldenFriedEggs < 1;
        sellGoldenFriedAllBtn.textContent = `Продать всё (+${(goldenFriedEggs * 15000).toLocaleString('ru-RU')} 🦆)`;
      }
    } else {
      if (sellFriedCard) sellFriedCard.style.display = 'none';
      if (sellGoldenFriedCard) sellGoldenFriedCard.style.display = 'none';
    }

    // Обновление карточек продажи питомцев (по одному эмодзи каждого типа на столе)
    const dCount = normalDucklings;
    const gdCount = goldenDucklings;
    const gCount = normalGeese;
    const ggCount = goldenGeese;
    const rgCount = normalRoastedGeese;
    const grgCount = goldenRoastedGeese;

    const sDCard = document.getElementById('sellDucklingCard');
    const sGDCard = document.getElementById('sellGoldenDucklingCard');
    const sGCard = document.getElementById('sellGooseCard');
    const sGGCard = document.getElementById('sellGoldenGooseCard');
    const sRGCard = document.getElementById('sellRoastedGooseCard');
    const sGRGCard = document.getElementById('sellGoldenRoastedGooseCard');

    if (sDCard) {
      sDCard.style.display = (dCount > 0 || hasHatchedDuckling) ? 'flex' : 'none';
      const cEl = document.getElementById('shopDucklingsCount');
      if (cEl) cEl.textContent = dCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellDuckling1Btn');
      const bAll = document.getElementById('sellDucklingAllBtn');
      if (b1) b1.disabled = dCount < 1;
      if (bAll) {
        bAll.disabled = dCount < 1;
        bAll.textContent = `Продать всё (+${(dCount * 10000).toLocaleString('ru-RU')} 🦆)`;
      }
      const deskBtn = document.getElementById('spawnDucklingDeskBtn');
      if (deskBtn) {
        deskBtn.style.display = 'none';
      }
    }

    if (sGDCard) {
      sGDCard.style.display = (gdCount > 0 || hasHatchedGoldenDuckling || upgradeLevels.features >= 3) ? 'flex' : 'none';
      const cEl = document.getElementById('shopGoldenDucklingsCount');
      if (cEl) cEl.textContent = gdCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellGoldenDuckling1Btn');
      const bAll = document.getElementById('sellGoldenDucklingAllBtn');
      if (b1) b1.disabled = gdCount < 1;
      if (bAll) {
        bAll.disabled = gdCount < 1;
        bAll.textContent = `Продать всё (+${(gdCount * 50000).toLocaleString('ru-RU')} 🦆)`;
      }
      const deskBtn = document.getElementById('spawnGoldenDucklingDeskBtn');
      if (deskBtn) {
        deskBtn.style.display = 'none';
      }
    }

    if (sGCard) {
      sGCard.style.display = (gCount > 0 || hasHatchedDuckling || upgradeLevels.features >= 3) ? 'flex' : 'none';
      const cEl = document.getElementById('shopGeeseCount');
      if (cEl) cEl.textContent = gCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellGoose1Btn');
      const bAll = document.getElementById('sellGooseAllBtn');
      if (b1) b1.disabled = gCount < 1;
      if (bAll) {
        bAll.disabled = gCount < 1;
        bAll.textContent = `Продать всё (+${(gCount * 75000).toLocaleString('ru-RU')} 🦆)`;
      }
      const deskBtn = document.getElementById('spawnGooseDeskBtn');
      if (deskBtn) {
        deskBtn.style.display = 'none';
      }
    }

    if (sGGCard) {
      sGGCard.style.display = (ggCount > 0 || hasHatchedGoldenDuckling || upgradeLevels.features >= 3) ? 'flex' : 'none';
      const cEl = document.getElementById('shopGoldenGeeseCount');
      if (cEl) cEl.textContent = ggCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellGoldenGoose1Btn');
      const bAll = document.getElementById('sellGoldenGooseAllBtn');
      if (b1) b1.disabled = ggCount < 1;
      if (bAll) {
        bAll.disabled = ggCount < 1;
        bAll.textContent = `Продать всё (+${(ggCount * 250000).toLocaleString('ru-RU')} 🦆)`;
      }
      const deskBtn = document.getElementById('spawnGoldenGooseDeskBtn');
      if (deskBtn) {
        deskBtn.style.display = 'none';
      }
    }

    if (sRGCard) {
      sRGCard.style.display = (rgCount > 0 || hasCookedGoose) ? 'flex' : 'none';
      const cEl = document.getElementById('shopRoastedGeeseCount');
      if (cEl) cEl.textContent = rgCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellRoastedGoose1Btn');
      const bAll = document.getElementById('sellRoastedGooseAllBtn');
      if (b1) b1.disabled = rgCount < 1;
      if (bAll) {
        bAll.disabled = rgCount < 1;
        bAll.textContent = `Продать всё (+${(rgCount * 90000).toLocaleString('ru-RU')} 🦆)`;
      }
    }

    if (sGRGCard) {
      sGRGCard.style.display = (grgCount > 0 || hasCookedGoose) ? 'flex' : 'none';
      const cEl = document.getElementById('shopGoldenRoastedGeeseCount');
      if (cEl) cEl.textContent = grgCount.toLocaleString('ru-RU');
      const b1 = document.getElementById('sellGoldenRoastedGoose1Btn');
      const bAll = document.getElementById('sellGoldenRoastedGooseAllBtn');
      if (b1) b1.disabled = grgCount < 1;
      if (bAll) {
        bAll.disabled = grgCount < 1;
        bAll.textContent = `Продать всё (+${(grgCount * 325000).toLocaleString('ru-RU')} 🦆)`;
      }
    }

    if (typeof updateShopTabsVisibility === 'function') {
      updateShopTabsVisibility();
    }
  }

  function sellEgg(type, amount) {
    let earned = 0;
    if (type === 'normal') {
      const qty = (amount === 'all') ? normalEggs : Math.min(amount, normalEggs);
      if (qty <= 0) return;
      normalEggs -= qty;
      earned = qty * 200;
      try { Storage.set(EGGS_NORMAL_KEY, String(normalEggs)); } catch (e) {}
    } else if (type === 'golden') {
      const qty = (amount === 'all') ? goldenEggs : Math.min(amount, goldenEggs);
      if (qty <= 0) return;
      goldenEggs -= qty;
      earned = qty * 5000;
      try { Storage.set(EGGS_GOLDEN_KEY, String(goldenEggs)); } catch (e) {}
    } else if (type === 'fried') {
      const qty = (amount === 'all') ? friedEggs : Math.min(amount, friedEggs);
      if (qty <= 0) return;
      friedEggs -= qty;
      earned = qty * 1600;
      try { Storage.set(FRIED_EGGS_KEY, String(friedEggs)); } catch (e) {}
    } else if (type === 'goldenFried') {
      const qty = (amount === 'all') ? goldenFriedEggs : Math.min(amount, goldenFriedEggs);
      if (qty <= 0) return;
      goldenFriedEggs -= qty;
      earned = qty * 15000;
      try { Storage.set(GOLDEN_FRIED_EGGS_KEY, String(goldenFriedEggs)); } catch (e) {}
    }

    if (earned > 0) {
      if (!hasAnyEggsOnPlayer()) {
        resetEggSpoilTimer();
      }
      xpSound();
      addDuckles(earned);
      updateEggsDisplay();
      updateShopSellTab();
    }
  }
  window.sellEgg = sellEgg;

  function cheatAddEggs() {
    const hadNoEggs = !hasAnyEggsOnPlayer();
    normalEggs += 10;
    goldenEggs += 2;
    try {
      Storage.set(EGGS_NORMAL_KEY, String(normalEggs));
      Storage.set(EGGS_GOLDEN_KEY, String(goldenEggs));
    } catch (e) {}
    if (hadNoEggs) resetEggSpoilTimer();
    corkPopSound();
    updateEggsDisplay();
  }
  window.cheatAddEggs = cheatAddEggs;

  function buyUpgrade(upgradeId, targetLvl) {
    // Прокачка Автокрякалка и Скорость не доступны пока не прокачен 1 LVL Возможности
    if ((upgradeId === 'autoquack' || upgradeId === 'speed') && upgradeLevels.features < 1) return;

    const upg = UPGRADES_DATA.find(u => u.id === upgradeId);
    if (!upg) return;
    const currentLvl = upgradeLevels[upgradeId] || 0;
    if (targetLvl !== currentLvl + 1) return;
    const lvlData = upg.levels[targetLvl - 1];
    if (!lvlData) return;

    if (playerLevel < lvlData.reqLvl) return;
    if (!spendDuckles(lvlData.cost)) return;

    upgradeLevels[upgradeId] = targetLvl;
    Storage.set('duck-upg-' + upgradeId, String(targetLvl));

    xpSound();
    updateDuckles(true);
    updateAutoQuackTimer();
    renderUpgrades(true);
    updateLevelDisplay();
    updateShopButtonVisibility();
    updateEggsDisplay();
    tryUnlock();
  }
  window.buyUpgrade = buyUpgrade;

  function renderUpgrades(force = false) {
    updateDuckDragCursor();
    updateUpgradesButtonHighlight();
    const modal = document.getElementById('upgradesModal');
    if (!force && modal && !modal.classList.contains('open')) return;
    const container = document.getElementById('upgradesList');
    if (!container) return;
    container.innerHTML = '';

    UPGRADES_DATA.forEach(upg => {
      const curLvl = upgradeLevels[upg.id] || 0;
      const card = document.createElement('div');
      card.className = 'upgrade-card';

      const isBranchLocked = (upg.id === 'autoquack' || upg.id === 'speed') && upgradeLevels.features < 1;

      // Текущий эффект
      let currText = 'Не приобретено (нет бонуса)';
      if (curLvl > 0) {
        currText = upg.levels[curLvl - 1].text;
      }

      // Блок предупреждения блокировки ветки
      let warningHtml = '';
      if (isBranchLocked) {
        warningHtml = `
          <div class="upgrade-locked-warning">
            🔒 Заблокировано: сначала прокачайте «Возможности» LVL 1 (Открывает автокрякалку и скорость)
          </div>
        `;
      }

      // Что даст следующий уровень
      let nextBonusHtml = '';
      let reqHtml = '';
      if (curLvl < 5) {
        const nextLvlData = upg.levels[curLvl];
        nextBonusHtml = `
          <div class="upgrade-next-preview">
            ⚡ Следующий LVL ${curLvl + 1}: <strong>${nextLvlData.text}</strong>
          </div>
        `;
        let condText = `Требуется: ${nextLvlData.cost.toLocaleString('ru-RU')} 🦆 • LVL ${nextLvlData.reqLvl} игрока`;
        if (isBranchLocked) {
          condText = `Требуется: «Возможности» LVL 1 • ${nextLvlData.cost.toLocaleString('ru-RU')} 🦆 • LVL ${nextLvlData.reqLvl} игрока`;
        }
        reqHtml = `<div class="upgrade-req-text">${condText}</div>`;
      } else {
        nextBonusHtml = `<div class="upgrade-max-tag">⭐ Прокачано на максимум (5/5)</div>`;
      }

      const infoHtml = `
        <div class="upgrade-info">
          <div class="upgrade-header-line">
            <span class="upgrade-name">${upg.name}</span>
            <span class="upgrade-subtitle">• ${upg.desc}</span>
          </div>
          ${warningHtml}
          <div class="upgrade-curr-effect">
            <span class="effect-label">Текущий бонус:</span> ${currText}
          </div>
          ${nextBonusHtml}
          ${reqHtml}
        </div>
      `;

      let btnsHtml = '<div class="upgrade-levels-row">';
      for (let l = 1; l <= 5; l++) {
        const lvlData = upg.levels[l - 1];
        if (l <= curLvl) {
          btnsHtml += `
            <button class="upgrade-lvl-btn bought" disabled title="LVL ${l}: ${lvlData.text} (Приобретено)">
              <span class="lvl-tag">LVL ${l}</span>
              <span class="reward-tag">${lvlData.short}</span>
              <span class="price-tag">✓ Куплено</span>
            </button>
          `;
        } else if (l === curLvl + 1) {
          if (isBranchLocked) {
            btnsHtml += `
              <button class="upgrade-lvl-btn locked" disabled title="Требуется открыть «Возможности» LVL 1">
                <span class="lvl-tag">LVL ${l}</span>
                <span class="reward-tag">${lvlData.short}</span>
                <span class="price-tag">🔒 Блок</span>
              </button>
            `;
          } else {
            const hasLevel = playerLevel >= lvlData.reqLvl;
            const canAfford = duckles >= lvlData.cost;
            if (!hasLevel) {
              btnsHtml += `
                <button class="upgrade-lvl-btn locked" disabled title="${lvlData.text} — требуется уровень игрока ${lvlData.reqLvl}">
                  <span class="lvl-tag">LVL ${l}</span>
                  <span class="reward-tag">${lvlData.short}</span>
                  <span class="price-tag">🔒 ур.${lvlData.reqLvl}</span>
                </button>
              `;
            } else {
              const btnClass = canAfford ? 'upgrade-lvl-btn can-buy' : 'upgrade-lvl-btn cannot-afford';
              btnsHtml += `
                <button class="${btnClass}" onclick="buyUpgrade('${upg.id}', ${l})" title="Купить: ${lvlData.text} за ${lvlData.cost} Даклей">
                  <span class="lvl-tag">LVL ${l}</span>
                  <span class="reward-tag">${lvlData.short}</span>
                  <span class="price-tag">${lvlData.cost.toLocaleString('ru-RU')} 🦆</span>
                </button>
              `;
            }
          }
        } else {
          btnsHtml += `
            <button class="upgrade-lvl-btn locked" disabled title="LVL ${l}: ${lvlData.text} — сначала купите LVL ${l - 1}">
              <span class="lvl-tag">LVL ${l}</span>
              <span class="reward-tag">${lvlData.short}</span>
              <span class="price-tag">🔒</span>
            </button>
          `;
        }
      }
      btnsHtml += '</div>';

      card.innerHTML = infoHtml + btnsHtml;
      container.appendChild(card);
    });
  }

  // Открытие/закрытие окна апгрейдов
  const upgradesBtn = document.getElementById('upgradesBtn');
  const upgradesModal = document.getElementById('upgradesModal');
  const closeUpgradesBtn = document.getElementById('closeUpgradesBtn');

  if (upgradesBtn && upgradesModal && closeUpgradesBtn) {
    upgradesBtn.addEventListener('click', () => {
      renderUpgrades(true);
      upgradesModal.classList.add('open');
    });
    closeUpgradesBtn.addEventListener('click', () => {
      upgradesModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    upgradesModal.addEventListener('click', (e) => {
      if (e.target === upgradesModal) {
        upgradesModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }

  // Открытие/закрытие окна магазина и переключение вкладок
  const shopBtn = document.getElementById('shopBtn');
  const shopModal = document.getElementById('shopModal');
  const closeShopBtn = document.getElementById('closeShopBtn');
  const shopTabBuyBtn = document.getElementById('shopTabBuyBtn');
  const shopTabSellBtn = document.getElementById('shopTabSellBtn');
  const shopBodyBuy = document.getElementById('shopBodyBuy');
  const shopBodySell = document.getElementById('shopBodySell');

  const duckberriesHdr = document.getElementById('duckberriesHeader');

  function switchShopTab(tab) {
    const buyBtn = document.getElementById('shopTabBuyBtn');
    const sellBtn = document.getElementById('shopTabSellBtn');
    const buyBody = document.getElementById('shopBodyBuy');
    const sellBody = document.getElementById('shopBodySell');
    const duckHdr = document.getElementById('duckberriesHeader');

    if (tab === 'sell') {
      if (sellBtn && (sellBtn.disabled || sellBtn.classList.contains('disabled'))) return;
      if (buyBtn) buyBtn.classList.remove('active');
      if (sellBtn) sellBtn.classList.add('active');
      if (buyBody) buyBody.style.display = 'none';
      if (sellBody) sellBody.style.display = 'flex';
      if (duckHdr) duckHdr.style.display = 'none';
      updateShopSellTab();
      if (sellBody) sellBody.scrollTop = 0;
    } else {
      if (sellBtn) sellBtn.classList.remove('active');
      if (buyBtn) buyBtn.classList.add('active');
      if (sellBody) sellBody.style.display = 'none';
      if (buyBody) buyBody.style.display = 'flex';
      if (duckHdr) duckHdr.style.display = 'block';
      if (buyBody) buyBody.scrollTop = 0;
    }
  }
  window.switchShopTab = switchShopTab;

  if (shopTabBuyBtn) shopTabBuyBtn.addEventListener('click', () => switchShopTab('buy'));
  if (shopTabSellBtn) shopTabSellBtn.addEventListener('click', () => switchShopTab('sell'));

  if (shopBtn && shopModal && closeShopBtn) {
    shopBtn.addEventListener('click', () => {
      isClothingCollapsed = true;
      isHouseholdCollapsed = true;
      isFoodCollapsed = true;
      isAnimalsCollapsed = true;
      updateShopSectionCollapsedUI();
      updateDuckles();
      updateShopTabsVisibility();
      renderShopBuyTab();
      updateShopSellTab();
      if (duckberriesHdr) duckberriesHdr.style.display = (shopTabBuyBtn && shopTabBuyBtn.classList.contains('active')) ? 'block' : 'none';
      if (shopBodyBuy) shopBodyBuy.scrollTop = 0;
      if (shopBodySell) shopBodySell.scrollTop = 0;
      shopModal.classList.add('open');
    });
    closeShopBtn.addEventListener('click', () => {
      shopModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    shopModal.addEventListener('click', (e) => {
      if (e.target === shopModal) {
        shopModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }

  /* ---------- Duckberries: Магазин (вкладка Покупка) ---------- */
  function buyShopItem(category, itemId) {
    if (category === 'clothing') {
      const skin = SKINS_DATA[itemId];
      if (!skin || ownedSkins.includes(itemId)) return;
      if (!spendDuckles(skin.cost)) return;

      ownedSkins.push(itemId);
      Storage.setJSON(OWNED_SKINS_KEY, ownedSkins);

      // Автоматически надеваем скин при покупке
      applySkin(itemId);

      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 40,
        vx: 0,
        vy: -180,
        size: 24,
        alpha: 1.2,
        text: '👔 Новый скин надет!',
        color: '#f0abfc'
      });
    } else if (category === 'household') {
      const prop = PROPS_DATA[itemId];
      if (!prop || ownedProps.includes(itemId)) return;
      if (!spendDuckles(prop.cost)) return;

      ownedProps.push(itemId);
      Storage.setJSON(OWNED_PROPS_KEY, ownedProps);

      // Купленные вещи в магазине сразу выкладывать на стол
      placePropOnScreen(itemId);

      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 40,
        vx: 0,
        vy: -180,
        size: 24,
        alpha: 1.2,
        text: '🍳 Предмет на столе!',
        color: '#fdba74'
      });
    }

    xpSound();
    updateDuckles(true);
    updateShopButtonVisibility();
    renderShopBuyTab();
    renderWardrobe();
    renderStorage();
  }
  window.buyShopItem = buyShopItem;

  function refundShopItem(category, itemId) {
    if (category === 'clothing') {
      const item = SKINS_DATA[itemId];
      if (!item || !ownedSkins.includes(itemId) || itemId === 'default' || itemId === 'patched') return;
      const refundAmount = Math.floor(item.cost / 2);

      // Если скин сейчас надет, возвращаем стандартный классический скин
      if (currentSkin === itemId) {
        applySkin('default');
      }

      const sIdx = ownedSkins.indexOf(itemId);
      if (sIdx !== -1) ownedSkins.splice(sIdx, 1);
      window.ownedSkins = ownedSkins;
      Storage.setJSON(OWNED_SKINS_KEY, ownedSkins);

      earnDuckles(refundAmount, false, true);

      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 40,
        vx: 0,
        vy: -180,
        size: 22,
        alpha: 1.2,
        text: `💰 Возврат в магазин: +${refundAmount.toLocaleString('ru-RU')} 🦆`,
        color: '#ffd24d'
      });
    } else if (category === 'household') {
      const prop = PROPS_DATA[itemId];
      if (!prop || !ownedProps.includes(itemId) || !prop.cost) return;
      const refundAmount = Math.floor(prop.cost / 2);

      // Если предмет сейчас на столе, возвращаем его со стола
      if (placedProps[itemId]) {
        returnPropToStorage(itemId);
      }

      if (itemId === 'incubator' && isIncubating) {
        if (incubatingType === 'golden') goldenEggs += incubatingCount;
        else normalEggs += incubatingCount;
        updateEggsDisplay();
        isIncubating = false;
        try {
          Storage.remove(IS_INCUBATING_KEY);
          Storage.remove(INCUBATING_REMAINING_KEY);
          Storage.remove(INCUBATING_COUNT_KEY);
          Storage.remove(INCUBATING_TYPE_KEY);
        } catch (e) {}
        updateIncubatorUI();
      }

      const pIdx = ownedProps.indexOf(itemId);
      if (pIdx !== -1) ownedProps.splice(pIdx, 1);
      window.ownedProps = ownedProps;
      Storage.setJSON(OWNED_PROPS_KEY, ownedProps);

      earnDuckles(refundAmount, false, true);

      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 40,
        vx: 0,
        vy: -180,
        size: 22,
        alpha: 1.2,
        text: `💰 Возврат в магазин: +${refundAmount.toLocaleString('ru-RU')} 🦆`,
        color: '#ffd24d'
      });
    }

    xpSound();
    updateDuckles(true);
    updateShopButtonVisibility();
    renderShopBuyTab();
    renderWardrobe();
    renderStorage();
  }
  window.refundShopItem = refundShopItem;

  function renderShopBuyTab() {
    const clothingContainer = document.getElementById('clothingBuyList');
    const householdContainer = document.getElementById('householdBuyList');

    if (clothingContainer) {
      clothingContainer.innerHTML = '';
      const sortedClothingKeys = Object.keys(SKINS_DATA).sort((a, b) => {
        const aOwned = ownedSkins.includes(a) ? 1 : 0;
        const bOwned = ownedSkins.includes(b) ? 1 : 0;
        return aOwned - bOwned;
      });
      sortedClothingKeys.forEach(id => {
        if (id === 'default' || id === 'patched') return;
        const item = SKINS_DATA[id];
        if (item.category !== 'clothing') return;

        const isOwned = ownedSkins.includes(id);
        const canAfford = duckles >= item.cost;

        let actionHtml = '';
        if (isOwned) {
          const refundPrice = Math.floor(item.cost / 2);
          actionHtml = `
            <div class="buy-owned-wrap">
              <div class="buy-owned-badge">✓ В гардеробе</div>
              <button class="buy-refund-btn" title="Вернуть предмет в магазин за 50% стоимости" onclick="refundShopItem('clothing', '${id}')">
                Вернуть (+${refundPrice.toLocaleString('ru-RU')} 🦆)
              </button>
            </div>
          `;
        } else {
          const btnClass = canAfford ? 'buy-action-btn' : 'buy-action-btn disabled';
          actionHtml = `<button class="${btnClass}" onclick="buyShopItem('clothing', '${id}')">Купить (${item.cost.toLocaleString('ru-RU')} 🦆)</button>`;
        }

        const card = document.createElement('div');
        card.className = 'buy-card' + (isOwned ? ' owned' : '');
        card.innerHTML = `
          <div class="buy-item-left">
            <div class="buy-item-img-box">
              <img class="buy-item-img" src="${item.icon}" alt="${item.name}" referrerpolicy="no-referrer"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
              <span style="display: none;">${item.fallbackEmoji || '👚'}</span>
            </div>
            <div class="buy-item-info">
              <div class="buy-item-name">${item.name}</div>
              <div class="buy-item-desc">${item.desc}</div>
              <div class="buy-item-price">${item.cost.toLocaleString('ru-RU')} 🦆</div>
            </div>
          </div>
          ${actionHtml}
        `;
        clothingContainer.appendChild(card);
      });
    }

    if (householdContainer) {
      householdContainer.innerHTML = '';
      const sortedHouseholdKeys = Object.keys(PROPS_DATA).sort((a, b) => {
        const aOwned = ownedProps.includes(a) ? 1 : 0;
        const bOwned = ownedProps.includes(b) ? 1 : 0;
        return aOwned - bOwned;
      });
      sortedHouseholdKeys.forEach(id => {
        // Ключ не продаётся в магазине — это секрет при перемещении утки
        if (id === 'key') return;
        // Дихлофос не отображается в магазине до "Выложить Вонючий старый холодильник на стол"
        if (id === 'dichlofos' && !hasPlacedFridge) return;
        // Если тараканы уже выведены дихлофосом, дихлофос больше не продаётся в магазине
        if (id === 'dichlofos' && hasClearedRoaches) return;

        const prop = PROPS_DATA[id];
        const isOwned = ownedProps.includes(id);
        const canAfford = duckles >= prop.cost;

        let actionHtml = '';
        if (isOwned) {
          const refundPrice = Math.floor(prop.cost / 2);
          actionHtml = `
            <div class="buy-owned-wrap">
              <div class="buy-owned-badge">✓ На складе</div>
              <button class="buy-refund-btn" title="Вернуть предмет в магазин за 50% стоимости" onclick="refundShopItem('household', '${id}')">
                Вернуть (+${refundPrice.toLocaleString('ru-RU')} 🦆)
              </button>
            </div>
          `;
        } else {
          const btnClass = canAfford ? 'buy-action-btn' : 'buy-action-btn disabled';
          actionHtml = `<button class="${btnClass}" onclick="buyShopItem('household', '${id}')">Купить (${prop.cost.toLocaleString('ru-RU')} 🦆)</button>`;
        }

        const card = document.createElement('div');
        card.className = 'buy-card' + (isOwned ? ' owned' : '');
        card.innerHTML = `
          <div class="buy-item-left">
            <div class="buy-item-img-box">
              <img class="buy-item-img" src="${prop.icon}" alt="${prop.name}" referrerpolicy="no-referrer"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
              <span style="display: none;">${prop.fallbackEmoji || '📦'}</span>
            </div>
            <div class="buy-item-info">
              <div class="buy-item-name">${prop.name}</div>
              <div class="buy-item-desc">${prop.desc}</div>
              <div class="buy-item-price">${prop.cost.toLocaleString('ru-RU')} 🦆</div>
            </div>
          </div>
          ${actionHtml}
        `;
        householdContainer.appendChild(card);
      });
    }
    updateShopSectionCollapsedUI();
  }

  function updateShopSectionCollapsedUI() {
    const clothingSection = document.getElementById('clothingShopSection');
    const householdSection = document.getElementById('householdShopSection');
    const foodSection = document.getElementById('foodShopSection');
    const animalsSection = document.getElementById('animalsShopSection');
    if (clothingSection) {
      clothingSection.classList.toggle('collapsed', isClothingCollapsed);
    }
    if (householdSection) {
      householdSection.classList.toggle('collapsed', isHouseholdCollapsed);
    }
    if (foodSection) {
      foodSection.classList.toggle('collapsed', isFoodCollapsed);
    }
    if (animalsSection) {
      animalsSection.classList.toggle('collapsed', isAnimalsCollapsed);
    }
  }

  function toggleShopSection(sectionKey) {
    if (sectionKey === 'clothing') {
      isClothingCollapsed = !isClothingCollapsed;
      try {
        Storage.set(SHOP_CLOTHING_COLLAPSED_KEY, isClothingCollapsed ? '1' : '0');
      } catch (e) {}
    } else if (sectionKey === 'household') {
      isHouseholdCollapsed = !isHouseholdCollapsed;
      try {
        Storage.set(SHOP_HOUSEHOLD_COLLAPSED_KEY, isHouseholdCollapsed ? '1' : '0');
      } catch (e) {}
    } else if (sectionKey === 'food') {
      isFoodCollapsed = !isFoodCollapsed;
      try {
        Storage.set(SHOP_FOOD_COLLAPSED_KEY, isFoodCollapsed ? '1' : '0');
      } catch (e) {}
    } else if (sectionKey === 'animals') {
      isAnimalsCollapsed = !isAnimalsCollapsed;
      try {
        Storage.set(SHOP_ANIMALS_COLLAPSED_KEY, isAnimalsCollapsed ? '1' : '0');
      } catch (e) {}
    }
    updateShopSectionCollapsedUI();
  }
  window.toggleShopSection = toggleShopSection;
  window.updateShopSectionCollapsedUI = updateShopSectionCollapsedUI;

  /* ---------- Гардероб ---------- */
  function applySkin(skinId) {
    if (!SKINS_DATA[skinId]) return;
    currentSkin = skinId;
    try { Storage.set(CURRENT_SKIN_KEY, skinId); } catch (e) {}

    const duckImg = document.getElementById('duckImg');
    if (duckImg) {
      duckImg.src = SKINS_DATA[skinId].img;
      duckImg.style.display = 'block';
      const fallback = document.querySelector('.duck-fallback');
      if (fallback) fallback.style.display = 'none';
    }
    renderWardrobe();
  }
  window.applySkin = applySkin;

  function renderWardrobe() {
    const list = document.getElementById('wardrobeList');
    if (!list) return;
    list.innerHTML = '';

    Object.keys(SKINS_DATA).forEach(id => {
      // Показываем стандартный скин и купленные скины
      if (id !== 'default' && !ownedSkins.includes(id)) return;

      const skin = SKINS_DATA[id];
      const isEquipped = currentSkin === id;

      const card = document.createElement('div');
      card.className = 'wardrobe-card' + (isEquipped ? ' active' : '');

      let btnHtml = isEquipped
        ? '<button class="wardrobe-equip-btn equipped" disabled>✓ Надето</button>'
        : `<button class="wardrobe-equip-btn" onclick="applySkin('${id}')">Надеть</button>`;

      card.innerHTML = `
        <div class="buy-item-left">
          <div class="buy-item-img-box">
            <img class="buy-item-img" src="${skin.img}" alt="${skin.name}" referrerpolicy="no-referrer"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
            <span style="display: none;">${skin.fallbackEmoji || '🦆'}</span>
          </div>
          <div class="buy-item-info">
            <div class="buy-item-name">${skin.name}</div>
            <div class="buy-item-desc">${skin.desc}</div>
          </div>
        </div>
        ${btnHtml}
      `;
      list.appendChild(card);
    });
  }

  /* ---------- Склад предметов (Быт) ---------- */
  function renderStorage() {
    const list = document.getElementById('storageList');
    if (!list) return;
    list.innerHTML = '';

    if (ownedProps.length === 0) {
      list.innerHTML = '<div style="text-align: center; color: #8da0be; padding: 20px 0;">На складе пока нет вещей. Купите их во вкладке «Покупка» в Магазине!</div>';
      return;
    }

    ownedProps.forEach(id => {
      const prop = PROPS_DATA[id];
      if (!prop) return;

      const isPlaced = !!placedProps[id];
      const card = document.createElement('div');
      card.className = 'storage-card';

      let btnHtml = isPlaced
        ? `<button class="storage-toggle-btn placed" onclick="returnPropToStorage('${id}')">Убрать на склад</button>`
        : `<button class="storage-toggle-btn" onclick="placePropOnScreen('${id}')">Выложить на стол</button>`;

      card.innerHTML = `
        <div class="buy-item-left">
          <div class="buy-item-img-box">
            <img class="buy-item-img" src="${prop.icon}" alt="${prop.name}" referrerpolicy="no-referrer"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
            <span style="display: none;">${prop.fallbackEmoji}</span>
          </div>
          <div class="buy-item-info">
            <div class="buy-item-name">${prop.name}</div>
            <div class="buy-item-desc">${isPlaced ? '🟢 Сейчас выложен на столе' : '📦 Находится на складе'}</div>
          </div>
        </div>
        <div class="storage-card-actions">
          ${btnHtml}
        </div>
      `;
      list.appendChild(card);
    });
  }

  function getPropDimensions(propId) {
    const el = document.getElementById('prop-' + propId);
    if (el && el.offsetWidth > 0 && el.offsetHeight > 0) {
      return { width: el.offsetWidth, height: el.offsetHeight };
    }
    if (propId === 'trashcan') return { width: 234, height: 234 };
    if (propId === 'incubator') return { width: 92, height: 92 };
    if (propId === 'plita') return { width: 96, height: 96 };
    if (propId === 'fridge') return { width: 88, height: 96 };
    if (propId === 'clock') return { width: 82, height: 82 };
    if (propId === 'lamp') return { width: 68, height: 110 };
    if (propId === 'skovoroda') return { width: 82, height: 82 };
    if (propId === 'dichlofos') return { width: 68, height: 90 };
    if (propId === 'key') return { width: 72, height: 72 };
    if (propId === 'knife') return { width: 76, height: 76 };
    if (propId === 'tape') return { width: 72, height: 72 };
    return { width: 85, height: 85 };
  }

  function placePropOnScreen(propId) {
    if (!ownedProps.includes(propId)) return;
    const el = document.getElementById('prop-' + propId);
    if (!el) return;

    const dims = getPropDimensions(propId);
    const propWidth = dims.width;
    const propHeight = dims.height;

    if (!placedProps[propId] || !placedProps[propId].left) {
      const offset = (propId === 'incubator') ? -140 :
                     (propId === 'plita') ? 60 : 
                     (propId === 'skovoroda' ? -60 : 
                     (propId === 'lamp' ? -180 : 
                     (propId === 'fridge' ? -120 : 
                     (propId === 'dichlofos' ? 140 : 
                     (propId === 'trashcan' ? 200 :
                     (propId === 'clock' ? -240 :
                     (propId === 'knife' ? -300 :
                     (propId === 'tape' ? 320 :
                     (propId === 'key' ? 260 : 0)))))))));
      const maxLeft = Math.max(20, window.innerWidth - propWidth - 20);
      const left = Math.max(20, Math.min(maxLeft, Math.round((window.innerWidth - propWidth) / 2 + offset))) + 'px';
      const maxTop = Math.max(70, window.innerHeight - propHeight - 20);
      const top = Math.max(70, Math.min(maxTop, Math.round(window.innerHeight - propHeight - 25))) + 'px';
      placedProps[propId] = { placed: true, left, top };
    } else {
      const curTop = parseFloat(placedProps[propId].top);
      if (!isNaN(curTop) && curTop + propHeight > window.innerHeight - 10) {
        placedProps[propId].top = Math.max(70, window.innerHeight - propHeight - 20) + 'px';
      }
      placedProps[propId].placed = true;
    }

    el.style.left = placedProps[propId].left;
    el.style.top = placedProps[propId].top;
    el.style.display = 'block';

    try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    corkPopSound();
    renderStorage();

    if (propId === 'lamp') {
      updateLampGlowUI();
    } else if (propId === 'fridge') {
      updateFridgeUI();
    } else if (propId === 'clock') {
      updateEggSpoilTimerDisplay();
      if (typeof updateStinkDebuffUI === 'function') updateStinkDebuffUI();
      if (typeof updateDeflationUI === 'function') updateDeflationUI();
      if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI();
      if (typeof updateIncubatorUI === 'function') updateIncubatorUI();
    }

    if (propId === 'skovoroda' || propId === 'plita') {
      checkStovePanCombine();
    }
  }
  window.placePropOnScreen = placePropOnScreen;

  function returnPropToStorage(propId) {
    const el = document.getElementById('prop-' + propId);
    if (el) {
      el.style.display = 'none';
      el.classList.remove('is-combined');
    }

    if (isStoveCombined && (propId === 'skovoroda' || propId === 'plita')) {
      separateStoveAndPan(false);
    }

    if (propId === 'incubator' && isIncubating) {
      if (incubatingType === 'golden') goldenEggs += incubatingCount;
      else normalEggs += incubatingCount;
      updateEggsDisplay();
      isIncubating = false;
      incubatingRemaining = 0;
      try {
        Storage.remove(IS_INCUBATING_KEY);
        Storage.remove(INCUBATING_REMAINING_KEY);
        Storage.remove(INCUBATING_COUNT_KEY);
        Storage.remove(INCUBATING_TYPE_KEY);
      } catch (e) {}
      updateIncubatorUI();
      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 30,
        vx: 0,
        vy: -90,
        size: 17,
        alpha: 1.3,
        text: `🥚 Инкубация прервана, яйца возвращены (+${incubatingCount} шт.)`,
        color: '#fbbf24'
      });
    }

    delete placedProps[propId];
    try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    corkPopSound();
    renderStorage();

    if (propId === 'lamp') {
      setLampState(false);
    } else if (propId === 'fridge') {
      setFridgeState(false);
    } else if (propId === 'clock') {
      updateEggSpoilTimerDisplay();
      if (typeof updateStinkDebuffUI === 'function') updateStinkDebuffUI();
      if (typeof updateDeflationUI === 'function') updateDeflationUI();
      if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI();
      if (typeof updateIncubatorUI === 'function') updateIncubatorUI();
    }
  }
  window.returnPropToStorage = returnPropToStorage;

  function combineStoveAndPan(withEffects = true) {
    const plitaEl = document.getElementById('prop-plita');
    const skovEl = document.getElementById('prop-skovoroda');
    if (!plitaEl || !skovEl) return;
    if (plitaEl.style.display === 'none' || skovEl.style.display === 'none') return;

    isStoveCombined = true;
    try { Storage.set(STOVE_COMBINED_KEY, '1'); } catch (e) {}

    const pX = parseFloat(plitaEl.style.left) || plitaEl.offsetLeft;
    const pY = parseFloat(plitaEl.style.top) || plitaEl.offsetTop;

    const panLeft = Math.round(pX + 8) + 'px';
    const panTop = Math.round(pY - 29) + 'px';

    skovEl.style.left = panLeft;
    skovEl.style.top = panTop;

    if (!placedProps.skovoroda) placedProps.skovoroda = { placed: true };
    placedProps.skovoroda.left = panLeft;
    placedProps.skovoroda.top = panTop;
    try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}

    plitaEl.classList.add('is-combined');
    skovEl.classList.add('is-combined');


    if (withEffects) {
      clinkSound();
      particles.push({
        x: pX + 45,
        y: pY - 35,
        vx: 0,
        vy: -150,
        size: 20,
        alpha: 1.2,
        text: '🔥 Сковорода на плите! Готово к жарке 🍳',
        color: '#ff9900'
      });
    }
  }
  window.combineStoveAndPan = combineStoveAndPan;

  function separateStoveAndPan(withEffects = true) {
    isStoveCombined = false;
    try { Storage.remove(STOVE_COMBINED_KEY); } catch (e) {}

    const plitaEl = document.getElementById('prop-plita');
    const skovEl = document.getElementById('prop-skovoroda');

    if (plitaEl) {
      plitaEl.classList.remove('is-combined');
    }
    if (skovEl) {
      skovEl.classList.remove('is-combined');

      if (withEffects && plitaEl) {
        const pX = parseFloat(plitaEl.style.left) || plitaEl.offsetLeft;
        const newLeft = Math.min(window.innerWidth - 90, pX + 105) + 'px';
        skovEl.style.left = newLeft;
        if (!placedProps.skovoroda) placedProps.skovoroda = { placed: true };
        placedProps.skovoroda.left = newLeft;
        try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
      }
    }

    if (withEffects) {
      corkPopSound();
      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 30,
        vx: 0,
        vy: -140,
        size: 20,
        alpha: 1.1,
        text: '🍳 Плита и сковорода разъединены',
        color: '#94a3b8'
      });
    }
  }
  window.separateStoveAndPan = separateStoveAndPan;

  function updateCombinedPartnerPosition(movedPropId, x, y) {
    const plitaEl = document.getElementById('prop-plita');
    const skovEl = document.getElementById('prop-skovoroda');
    if (!plitaEl || !skovEl) return;

    if (movedPropId === 'plita') {
      const panLeft = Math.max(0, Math.min(window.innerWidth - skovEl.offsetWidth, x + 8)) + 'px';
      const panTop = Math.max(0, Math.min(window.innerHeight - skovEl.offsetHeight, y - 29)) + 'px';
      skovEl.style.left = panLeft;
      skovEl.style.top = panTop;
      if (!placedProps.skovoroda) placedProps.skovoroda = { placed: true };
      placedProps.skovoroda.left = panLeft;
      placedProps.skovoroda.top = panTop;
    } else if (movedPropId === 'skovoroda') {
      const plitaLeft = Math.max(0, Math.min(window.innerWidth - plitaEl.offsetWidth, x - 8)) + 'px';
      const plitaTop = Math.max(0, Math.min(window.innerHeight - plitaEl.offsetHeight, y + 29)) + 'px';
      plitaEl.style.left = plitaLeft;
      plitaEl.style.top = plitaTop;
      if (!placedProps.plita) placedProps.plita = { placed: true };
      placedProps.plita.left = plitaLeft;
      placedProps.plita.top = plitaTop;
    }
  }

  function checkStovePanCombine() {
    if (isStoveCombined) return;
    const plitaEl = document.getElementById('prop-plita');
    const skovEl = document.getElementById('prop-skovoroda');
    if (!plitaEl || !skovEl) return;
    if (plitaEl.style.display === 'none' || skovEl.style.display === 'none') return;

    const rS = skovEl.getBoundingClientRect();
    const rP = plitaEl.getBoundingClientRect();

    const cS = { x: rS.left + rS.width / 2, y: rS.top + rS.height / 2 };
    const cP = { x: rP.left + rP.width / 2, y: rP.top + rP.height / 2 };

    const dist = Math.hypot(cS.x - cP.x, cS.y - cP.y);
    if (dist < 90 || isOverlapping(rS, rP)) {
      combineStoveAndPan(true);
    }
  }

  function getActiveDragTarget(propEl, clientX, clientY, propId) {
    const storageBtn = document.getElementById('storageBtn');
    const shopBtn = document.getElementById('shopBtn');

    const storageVisible = storageBtn && storageBtn.offsetParent !== null && window.getComputedStyle(storageBtn).display !== 'none';
    const shopVisible = shopBtn && shopBtn.offsetParent !== null && window.getComputedStyle(shopBtn).display !== 'none' && PROPS_DATA[propId] && PROPS_DATA[propId].cost > 0;

    if (!storageVisible && !shopVisible) return null;

    let px = clientX;
    let py = clientY;
    if (px === undefined || py === undefined) {
      if (!propEl) return null;
      const pr = propEl.getBoundingClientRect();
      px = pr.left + pr.width / 2;
      py = pr.top + pr.height / 2;
    }

    let distStorage = Infinity;
    let isNearStorage = false;
    if (storageVisible) {
      const sr = storageBtn.getBoundingClientRect();
      const inBox = (px >= sr.left - 6 && px <= sr.right + 6 && py >= sr.top - 8 && py <= sr.bottom + 20);
      const cx = sr.left + sr.width / 2;
      const cy = sr.top + sr.height / 2;
      distStorage = Math.hypot(px - cx, py - cy);
      isNearStorage = inBox || distStorage < 55;
    }

    let distShop = Infinity;
    let isNearShop = false;
    if (shopVisible) {
      const shr = shopBtn.getBoundingClientRect();
      const inBox = (px >= shr.left - 6 && px <= shr.right + 6 && py >= shr.top - 8 && py <= shr.bottom + 20);
      const cx = shr.left + shr.width / 2;
      const cy = shr.top + shr.height / 2;
      distShop = Math.hypot(px - cx, py - cy);
      isNearShop = inBox || distShop < 55;
    }

    if (!isNearStorage && !isNearShop) return null;

    // Строго раздельный фокус: подсвечивается только та кнопка, которая ближе к курсору
    if (isNearStorage && isNearShop) {
      return distShop < distStorage ? 'shop' : 'storage';
    }
    return isNearShop ? 'shop' : 'storage';
  }

  let activeContextPropId = null;
  const propContextMenu = document.getElementById('propContextMenu');
  const propCtxReturnBtn = document.getElementById('propCtxReturnBtn');
  const propCtxRefundBtn = document.getElementById('propCtxRefundBtn');

  function showPropContextMenu(propId, x, y) {
    if (!propContextMenu) return;
    activeContextPropId = propId;
    activeContextEggType = null;
    resetAllContextMenuButtons();

    if (propCtxReturnBtn) propCtxReturnBtn.style.display = 'flex';

    const prop = PROPS_DATA[propId];
    if (propCtxRefundBtn) {
      if (prop && prop.cost && prop.cost > 0) {
        const refundPrice = Math.floor(prop.cost / 2);
        propCtxRefundBtn.style.display = 'flex';
        propCtxRefundBtn.innerHTML = `<span class="prop-ctx-icon">💰</span> Сдать за ${refundPrice.toLocaleString('ru-RU')} 🦆`;
      } else {
        propCtxRefundBtn.style.display = 'none';
      }
    }

    const propCtxDiscardBtn = document.getElementById('propCtxDiscardBtn');
    if (propCtxDiscardBtn) {
      if (typeof isTrashcanOnTable === 'function' && isTrashcanOnTable() && propId !== 'trashcan') {
        propCtxDiscardBtn.style.display = 'flex';
        propCtxDiscardBtn.innerHTML = '<span class="prop-ctx-icon">🗑️</span> Выбросить в мусорку';
      } else {
        propCtxDiscardBtn.style.display = 'none';
      }
    }

    propContextMenu.style.display = 'block';

    let btnCount = 1;
    if (propCtxRefundBtn && propCtxRefundBtn.style.display !== 'none') btnCount++;
    if (propCtxDiscardBtn && propCtxDiscardBtn.style.display !== 'none') btnCount++;
    const menuW = 200;
    const menuH = btnCount * 38 + 12;
    const posX = Math.max(10, Math.min(window.innerWidth - menuW - 10, x));
    const posY = Math.max(10, Math.min(window.innerHeight - menuH - 10, y));

    propContextMenu.style.left = `${posX}px`;
    propContextMenu.style.top = `${posY}px`;
  }
  window.showPropContextMenu = showPropContextMenu;

  function hidePropContextMenu() {
    if (propContextMenu) {
      propContextMenu.style.display = 'none';
      activeContextPropId = null;
      activeContextEggType = null;
      resetAllContextMenuButtons();
    }
  }
  window.hidePropContextMenu = hidePropContextMenu;

  if (propCtxReturnBtn) {
    propCtxReturnBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeContextPropId) {
        returnPropToStorage(activeContextPropId);
        hidePropContextMenu();
      }
    });
  }

  if (propCtxRefundBtn) {
    propCtxRefundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeContextPropId) {
        refundShopItem('household', activeContextPropId);
        hidePropContextMenu();
      }
    });
  }

  const propCtxSell1Btn = document.getElementById('propCtxSell1Btn');
  if (propCtxSell1Btn) {
    propCtxSell1Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeContextEggType) {
        const isCreature = ['duckling', 'goldenDuckling', 'goose', 'goldenGoose', 'roastedGoose', 'goldenRoastedGoose'].includes(activeContextEggType);
        if (isCreature) {
          sellCreature(activeContextEggType, 1);
        } else {
          sellEgg(activeContextEggType, 1);
        }
        hidePropContextMenu();
      }
    });
  }

  const propCtxSellAllBtn = document.getElementById('propCtxSellAllBtn');
  if (propCtxSellAllBtn) {
    propCtxSellAllBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeContextEggType) {
        const isCreature = ['duckling', 'goldenDuckling', 'goose', 'goldenGoose', 'roastedGoose', 'goldenRoastedGoose'].includes(activeContextEggType);
        if (isCreature) {
          sellCreature(activeContextEggType, 'all');
        } else {
          sellEgg(activeContextEggType, 'all');
        }
        hidePropContextMenu();
      }
    });
  }

  function isCursorNearTrashcan(clientX, clientY, itemEl) {
    const trashEl = document.getElementById('prop-trashcan');
    if (!trashEl) return false;
    if (trashEl.style.display === 'none' || window.getComputedStyle(trashEl).display === 'none') return false;

    const tr = trashEl.getBoundingClientRect();
    if (tr.width === 0 || tr.height === 0) return false;

    let px = clientX;
    let py = clientY;
    if (typeof px !== 'number' || typeof py !== 'number' || px <= 0 || py <= 0) {
      if (itemEl && typeof itemEl.getBoundingClientRect === 'function') {
        const ir = itemEl.getBoundingClientRect();
        px = ir.left + ir.width / 2;
        py = ir.top + ir.height / 2;
      }
    }

    if (typeof px === 'number' && typeof py === 'number' && px > 0 && py > 0) {
      const inBox = (px >= tr.left - 25 && px <= tr.right + 25 &&
                     py >= tr.top - 25 && py <= tr.bottom + 35);
      const cx = tr.left + tr.width / 2;
      const cy = tr.top + tr.height / 2;
      const dist = Math.hypot(px - cx, py - cy);
      if (inBox || dist < 90) return true;
    }

    if (itemEl && typeof itemEl.getBoundingClientRect === 'function') {
      const ir = itemEl.getBoundingClientRect();
      if (ir.width > 0 && ir.height > 0) {
        const overlap = !(ir.right < tr.left - 10 ||
                          ir.left > tr.right + 10 ||
                          ir.bottom < tr.top - 10 ||
                          ir.top > tr.bottom + 10);
        if (overlap) return true;
      }
    }

    return false;
  }
  window.isCursorNearTrashcan = isCursorNearTrashcan;

  function getItemDiscardInfo(type, id) {
    if (type === 'prop') {
      const prop = PROPS_DATA[id];
      const name = prop ? prop.name : (id === 'key' ? 'Ключ' : id);
      const emojiMap = {
        skovoroda: '🍳', plita: '🔥', fridge: '❄️', knife: '🔪',
        tape: '🩹', lamp: '💡', clock: '⏰', dichlofos: '💨',
        incubator: '🐣', key: '🗝️'
      };
      return { name, emoji: emojiMap[id] || '📦' };
    }
    if (type === 'creature') {
      const map = {
        duckling: { name: 'Утёнок', emoji: '🐥' },
        goldenDuckling: { name: 'Золотой утёнок', emoji: '🐥' },
        goose: { name: 'Большая Утка', emoji: '🦆' },
        goldenGoose: { name: 'Золотая Большая Утка', emoji: '🦆' },
        roastedGoose: { name: 'Жареная утка', emoji: '🍗' },
        goldenRoastedGoose: { name: 'Золотая жареная утка', emoji: '🍗' }
      };
      return map[id] || { name: 'Питомец', emoji: '🐥' };
    }
    if (type === 'egg') {
      const map = {
        normal: { name: 'Обычное яйцо', emoji: '🥚' },
        golden: { name: 'Золотое яйцо', emoji: '🥚' },
        fried: { name: 'Жареное яйцо', emoji: '🍳' },
        goldenFried: { name: 'Золотое жареное яйцо', emoji: '🍳' }
      };
      return map[id] || { name: 'Яйцо', emoji: '🥚' };
    }
    return { name: id, emoji: '🗑️' };
  }
  window.getItemDiscardInfo = getItemDiscardInfo;

  function isItemOverDuck(clientX, clientY, el) {
    if (!duck) return false;
    const rDuck = duck.getBoundingClientRect();
    if (rDuck.width === 0 || rDuck.height === 0) return false;

    if (typeof clientX === 'number' && typeof clientY === 'number' && clientX > 0 && clientY > 0) {
      if (clientX >= rDuck.left && clientX <= rDuck.right &&
          clientY >= rDuck.top && clientY <= rDuck.bottom) {
        return true;
      }
    }

    if (el && typeof el.getBoundingClientRect === 'function') {
      const er = el.getBoundingClientRect();
      if (er.width > 0 && er.height > 0) {
        const overlap = !(er.right < rDuck.left ||
                          er.left > rDuck.right ||
                          er.bottom < rDuck.top ||
                          er.top > rDuck.bottom);
        if (overlap) return true;
      }
    }
    return false;
  }
  window.isItemOverDuck = isItemOverDuck;

  function returnItemToOrigin(el, startLeft, startTop, propId) {
    if (!el || !startLeft || !startTop) return;
    el.style.transition = 'left 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.28), top 0.28s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    el.style.left = startLeft;
    el.style.top = startTop;
    el.classList.add('is-wobbling');
    setTimeout(() => {
      el.style.transition = '';
      el.classList.remove('is-wobbling');
    }, 380);

    if (propId && placedProps && placedProps[propId]) {
      placedProps[propId].left = startLeft;
      placedProps[propId].top = startTop;
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    }
  }
  window.returnItemToOrigin = returnItemToOrigin;

  let pendingDiscardAction = null;
  let pendingDiscardCancel = null;

  function cancelDiscardConfirmation() {
    const modal = document.getElementById('discardConfirmModal');
    if (modal) modal.classList.remove('open');
    if (typeof pendingDiscardCancel === 'function') {
      const cancelFn = pendingDiscardCancel;
      pendingDiscardCancel = null;
      pendingDiscardAction = null;
      cancelFn();
    } else {
      pendingDiscardAction = null;
      pendingDiscardCancel = null;
    }
  }
  window.cancelDiscardConfirmation = cancelDiscardConfirmation;

  function requestDiscardConfirmation(itemName, emoji, onConfirm, onCancel) {
    const modal = document.getElementById('discardConfirmModal');
    const nameEl = document.getElementById('discardConfirmItemName');
    const emojiEl = document.getElementById('discardConfirmEmoji');

    if (!modal) {
      if (confirm(`Вы точно хотите выбросить ${itemName}? Это действие нельзя отменить, а предмет пропадёт со стола и его придётся добыть заново.`)) {
        onConfirm();
      } else if (typeof onCancel === 'function') {
        onCancel();
      }
      return;
    }

    if (nameEl) nameEl.textContent = `«${itemName}»`;
    if (emojiEl && emoji) emojiEl.textContent = emoji;
    pendingDiscardAction = onConfirm;
    pendingDiscardCancel = onCancel;
    modal.classList.add('open');
  }
  window.requestDiscardConfirmation = requestDiscardConfirmation;

  const discardConfirmModal = document.getElementById('discardConfirmModal');
  const discardCancelBtn = document.getElementById('discardCancelBtn');
  const discardConfirmBtn = document.getElementById('discardConfirmBtn');

  if (discardCancelBtn && discardConfirmModal) {
    discardCancelBtn.addEventListener('click', cancelDiscardConfirmation);
  }
  if (discardConfirmBtn && discardConfirmModal) {
    discardConfirmBtn.addEventListener('click', () => {
      discardConfirmModal.classList.remove('open');
      pendingDiscardCancel = null;
      if (typeof pendingDiscardAction === 'function') {
        const action = pendingDiscardAction;
        pendingDiscardAction = null;
        action();
      }
    });
  }
  if (discardConfirmModal) {
    discardConfirmModal.addEventListener('click', (e) => {
      if (e.target === discardConfirmModal) {
        cancelDiscardConfirmation();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (discardConfirmModal && discardConfirmModal.classList.contains('open')) {
        cancelDiscardConfirmation();
      }
    }
  });

  function performItemDiscard(type, id, spawnX, spawnY) {
    let itemName = '';

    if (type === 'prop') {
      const propId = id;
      if (propId === 'trashcan') return;
      const prop = PROPS_DATA[propId];
      itemName = prop ? prop.name : (propId === 'key' ? 'Ключ' : propId);

      const el = document.getElementById('prop-' + propId);
      if (el) {
        el.style.display = 'none';
        delete el.dataset.placed;
      }
      delete placedProps[propId];
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}

      const idx = ownedProps.indexOf(propId);
      if (idx !== -1) {
        ownedProps.splice(idx, 1);
        window.ownedProps = ownedProps;
        Storage.setJSON(OWNED_PROPS_KEY, ownedProps);
      }

      if (propId === 'incubator' && isIncubating) {
        isIncubating = false;
        try {
          Storage.remove(IS_INCUBATING_KEY);
          Storage.remove(INCUBATING_REMAINING_KEY);
          Storage.remove(INCUBATING_COUNT_KEY);
          Storage.remove(INCUBATING_TYPE_KEY);
        } catch (e) {}
        if (typeof updateIncubatorUI === 'function') updateIncubatorUI();
      }

      if (propId === 'lamp') {
        isLampOn = false;
        try { Storage.set(LAMP_ON_KEY, '0'); } catch (e) {}
        if (typeof updateLampGlowUI === 'function') updateLampGlowUI();
      }

      if (propId === 'fridge') {
        isFridgeOn = false;
        try { Storage.set(FRIDGE_ON_KEY, '0'); } catch (e) {}
        if (typeof updateFridgeUI === 'function') updateFridgeUI();
      }

      if (propId === 'skovoroda' || propId === 'plita') {
        if (typeof separateStoveAndPan === 'function' && isStoveCombined) {
          separateStoveAndPan(false);
        }
      }

      if (propId === 'key') {
        hasSpawnedKey = false;
        try { Storage.remove(SPAWNED_KEY_KEY); } catch (e) {}
      }

      renderShopBuyTab();
      renderStorage();
      updateShopButtonVisibility();
    } else if (type === 'creature') {
      const t = id;
      if (t === 'duckling') {
        normalDucklings = Math.max(0, normalDucklings - 1);
        try { Storage.set(DUCKLINGS_NORMAL_KEY, String(normalDucklings)); } catch (e) {}
        itemName = 'Утёнок';
      } else if (t === 'goldenDuckling') {
        goldenDucklings = Math.max(0, goldenDucklings - 1);
        try { Storage.set(DUCKLINGS_GOLDEN_KEY, String(goldenDucklings)); } catch (e) {}
        itemName = 'Золотой утёнок';
      } else if (t === 'goose') {
        normalGeese = Math.max(0, normalGeese - 1);
        try { Storage.set(GEESE_NORMAL_KEY, String(normalGeese)); } catch (e) {}
        itemName = 'Большая Утка';
      } else if (t === 'goldenGoose') {
        goldenGeese = Math.max(0, goldenGeese - 1);
        try { Storage.set(GEESE_GOLDEN_KEY, String(goldenGeese)); } catch (e) {}
        itemName = 'Золотая Большая Утка';
      } else if (t === 'roastedGoose') {
        normalRoastedGeese = Math.max(0, normalRoastedGeese - 1);
        try { Storage.set(ROASTED_GEESE_NORMAL_KEY, String(normalRoastedGeese)); } catch (e) {}
        itemName = 'Жареная утка';
      } else if (t === 'goldenRoastedGoose') {
        goldenRoastedGeese = Math.max(0, goldenRoastedGeese - 1);
        try { Storage.set(ROASTED_GEESE_GOLDEN_KEY, String(goldenRoastedGeese)); } catch (e) {}
        itemName = 'Золотая жареная утка';
      }
      if (typeof updateDeskCreatureUI === 'function') updateDeskCreatureUI();
      if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
      if (typeof updateShopSellTab === 'function') updateShopSellTab();
    } else if (type === 'egg') {
      const eggType = id;
      if (eggType === 'normal') {
        normalEggs = Math.max(0, normalEggs - 1);
        try { Storage.set(EGGS_NORMAL_KEY, String(normalEggs)); } catch (e) {}
        itemName = 'Обычное яйцо';
      } else if (eggType === 'golden') {
        goldenEggs = Math.max(0, goldenEggs - 1);
        try { Storage.set(EGGS_GOLDEN_KEY, String(goldenEggs)); } catch (e) {}
        itemName = 'Золотое яйцо';
      } else if (eggType === 'fried') {
        friedEggs = Math.max(0, friedEggs - 1);
        try { Storage.set(FRIED_EGGS_KEY, String(friedEggs)); } catch (e) {}
        itemName = 'Жареное яйцо';
      } else if (eggType === 'goldenFried') {
        goldenFriedEggs = Math.max(0, goldenFriedEggs - 1);
        try { Storage.set(GOLDEN_FRIED_EGGS_KEY, String(goldenFriedEggs)); } catch (e) {}
        itemName = 'Золотое жареное яйцо';
      }
      if (typeof updateEggsDisplay === 'function') updateEggsDisplay();
      if (typeof updateShopSellTab === 'function') updateShopSellTab();
    }

    splatSound();
    const trashEl = document.getElementById('prop-trashcan');
    const tr = trashEl ? trashEl.getBoundingClientRect() : null;
    const px = spawnX || (tr ? tr.left + tr.width / 2 : window.innerWidth / 2);
    const py = spawnY || (tr ? tr.top + 20 : window.innerHeight / 2);

    particles.push({
      x: px,
      y: py - 15,
      vx: 0,
      vy: -95,
      size: 19,
      alpha: 1.4,
      text: `🗑️ ${itemName} выброшен(о) в мусорку!`,
      color: '#a3e635'
    });

    const cleanItems = ['🗑️', '💨', '🟢', '✨'];
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      particles.push({
        x: px + (Math.random() - 0.5) * 20,
        y: py + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 40,
        size: 14 + Math.random() * 6,
        alpha: 1.1,
        text: cleanItems[Math.floor(Math.random() * cleanItems.length)],
        color: '#86efac'
      });
    }
  }
  window.performItemDiscard = performItemDiscard;

  const propCtxDiscardBtn = document.getElementById('propCtxDiscardBtn');
  if (propCtxDiscardBtn) {
    propCtxDiscardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const eggType = activeContextEggType;
      const propId = activeContextPropId;
      hidePropContextMenu();

      if (eggType === 'rotten') {
        discardRottenEgg();
        return;
      }

      if (eggType) {
        const isCreature = ['duckling', 'goldenDuckling', 'goose', 'goldenGoose', 'roastedGoose', 'goldenRoastedGoose'].includes(eggType);
        const info = getItemDiscardInfo(isCreature ? 'creature' : 'egg', eggType);
        requestDiscardConfirmation(info.name, info.emoji, () => {
          performItemDiscard(isCreature ? 'creature' : 'egg', eggType);
        });
        return;
      }

      if (propId && propId !== 'trashcan') {
        const info = getItemDiscardInfo('prop', propId);
        requestDiscardConfirmation(info.name, info.emoji, () => {
          performItemDiscard('prop', propId);
        });
        return;
      }
    });
  }

  document.addEventListener('pointerdown', (e) => {
    if (propContextMenu && propContextMenu.style.display === 'block') {
      if (!e.target.closest('#propContextMenu')) {
        hidePropContextMenu();
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hidePropContextMenu();
  });

  function initDraggableProp(el, propId) {
    if (!el) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastClientX = 0;
    let currentTilt = 0;
    let dragDistance = 0;
    let downX = 0;
    let downY = 0;
    let isDragAction = false;

    let startLeft = '';
    let startTop = '';

    el.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return; // Перетаскивание только ЛКМ (ПКМ для контекстного меню)
      if (e.target.closest('.stove-separate-btn')) return;
      hidePropContextMenu();
      isDragging = true;
      isDragAction = false;
      dragDistance = 0;
      downX = e.clientX;
      downY = e.clientY;
      el.classList.add('is-dragging');
      el.classList.remove('is-wobbling');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
      const rect = el.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;
      startLeft = el.style.left || `${rect.left}px`;
      startTop = el.style.top || `${rect.top}px`;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      currentTilt = 0;
      e.stopPropagation();
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      dragDistance = Math.hypot(e.clientX - downX, e.clientY - downY);
      if (dragDistance > 5) {
        isDragAction = true;
      }
      const dims = getPropDimensions(propId);
      const propW = Math.max(el.offsetWidth || 0, dims.width || 0);
      const propH = Math.max(el.offsetHeight || 0, dims.height || 0);
      const x = Math.max(10, Math.min(window.innerWidth - propW - 10, e.clientX - startX));
      const y = Math.max(60, Math.min(window.innerHeight - propH - 20, e.clientY - startY));
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      // Физичное качание при перемещении (tilt) — наклон увеличен на 10 градусов
      const dx = e.clientX - lastClientX;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      currentTilt = Math.max(-26, Math.min(26, dx * 2.4));
      el.style.setProperty('--sway-tilt', `${currentTilt || 15}deg`);
      el.style.transform = `scale(1.08) rotate(${currentTilt}deg)`;

      // Подсветка мусорки при наведении предмета (кроме самого мусорного ведра)
      let isNearTrash = false;
      const trashEl = document.getElementById('prop-trashcan');
      if (propId !== 'trashcan') {
        isNearTrash = isCursorNearTrashcan(e.clientX, e.clientY, el);
        if (trashEl) trashEl.classList.toggle('drag-target-hover', isNearTrash);
      }

      // Проверка наведения на кнопку «Склад» или «Магазин» (строго раздельный фокус)
      const activeTarget = isNearTrash ? null : getActiveDragTarget(el, e.clientX, e.clientY, propId);
      const storageBtn = document.getElementById('storageBtn');
      const shopBtn = document.getElementById('shopBtn');
      if (storageBtn) storageBtn.classList.toggle('drag-target-hover', activeTarget === 'storage');
      if (shopBtn) shopBtn.classList.toggle('drag-target-hover', activeTarget === 'shop');

      // Дихлофос: наведение на холодильник для избавления от тараканов
      if (propId === 'dichlofos') {
        const fridgeEl = document.getElementById('prop-fridge');
        if (fridgeEl && fridgeEl.style.display !== 'none' && !hasClearedRoaches) {
          const fr = fridgeEl.getBoundingClientRect();
          const isOverFridge = (e.clientX >= fr.left - 20 && e.clientX <= fr.right + 20 &&
                                e.clientY >= fr.top - 20 && e.clientY <= fr.bottom + 20);
          fridgeEl.classList.toggle('dichlofos-target-hover', isOverFridge);
        }
      }

      // Нож и Изолента: подсветка утки при наведении
      if (propId === 'knife' || propId === 'tape') {
        const rDuck = duck.getBoundingClientRect();
        const isOverDuck = (e.clientX >= rDuck.left && e.clientX <= rDuck.right && e.clientY >= rDuck.top && e.clientY <= rDuck.bottom);
        duck.classList.toggle('prop-target-hover', isOverDuck);
      }

      if (isStoveCombined && (propId === 'skovoroda' || propId === 'plita')) {
        updateCombinedPartnerPosition(propId, x, y);
        const partnerId = (propId === 'skovoroda') ? 'plita' : 'skovoroda';
        const partnerEl = document.getElementById('prop-' + partnerId);
        if (partnerEl) {
          partnerEl.classList.add('is-dragging');
          partnerEl.classList.remove('is-wobbling');
          partnerEl.style.setProperty('--sway-tilt', `${currentTilt || 15}deg`);
          partnerEl.style.transform = `scale(1.08) rotate(${currentTilt}deg)`;
        }
      }
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}
      el.classList.remove('is-dragging');
      el.style.transform = '';

      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) trashEl.classList.remove('drag-target-hover');

      const cx = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : lastClientX;
      const cy = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : lastClientY;

      // 1. Проверка сброса в мусорку (кроме самого мусорного ведра)
      if (propId !== 'trashcan' && isCursorNearTrashcan(cx, cy, el)) {
        const info = getItemDiscardInfo('prop', propId);
        requestDiscardConfirmation(
          info.name,
          info.emoji,
          () => {
            performItemDiscard('prop', propId, cx, cy);
          },
          () => {
            // Если в мусорку не выброшено (отмена) — возвращается на исходное место
            returnItemToOrigin(el, startLeft, startTop, propId);
          }
        );
        return;
      }

      // 2. Проверка переноса на утку
      if (isItemOverDuck(cx, cy, el)) {
        if (duck) duck.classList.remove('prop-target-hover');

        // Изолента: починка утки
        if (propId === 'tape') {
          if (isDuckDeflating) {
            applyTapeToDuck(); // Успешная починка: изолента исчезает!
            return;
          } else {
            applyTapeToDuck(); // Утка не сдута: не исчезает, возвращается на место!
            returnItemToOrigin(el, startLeft, startTop, propId);
            return;
          }
        }

        // Нож: укол утки (нож не исчезает, возвращается на место)
        if (propId === 'knife') {
          if (!isCookedDuckActive && !isDeflatedDuckActive) {
            stabDuckWithKnife(true);
          }
          returnItemToOrigin(el, startLeft, startTop, propId);
          return;
        }

        // Любой другой предмет перенесён на утку — не исчезает, возвращается на место
        corkPopSound();
        returnItemToOrigin(el, startLeft, startTop, propId);
        return;
      }

      const activeTarget = getActiveDragTarget(el, e.clientX, e.clientY, propId);
      const storageBtn = document.getElementById('storageBtn');
      const shopBtn = document.getElementById('shopBtn');
      if (storageBtn) storageBtn.classList.remove('drag-target-hover');
      if (shopBtn) shopBtn.classList.remove('drag-target-hover');
      if (duck) duck.classList.remove('prop-target-hover');

      if (isStoveCombined && (propId === 'skovoroda' || propId === 'plita')) {
        const partnerId = (propId === 'skovoroda') ? 'plita' : 'skovoroda';
        const partnerEl = document.getElementById('prop-' + partnerId);
        if (partnerEl) {
          partnerEl.classList.remove('is-dragging');
          partnerEl.style.transform = '';
          partnerEl.classList.add('is-wobbling');
          setTimeout(() => partnerEl.classList.remove('is-wobbling'), 650);
        }
      }

      // Дихлофос: перетаскивание на холодильник для уничтожения тараканов
      if (propId === 'dichlofos') {
        const fridgeEl = document.getElementById('prop-fridge');
        if (fridgeEl) {
          const wasOverFridge = fridgeEl.classList.contains('dichlofos-target-hover');
          fridgeEl.classList.remove('dichlofos-target-hover');
          if (wasOverFridge && !hasClearedRoaches) {
            hasUsedDichlofos = true;
            try {
              Storage.set(USED_DICHLOFOS_KEY, '1');
            } catch (err) {}
            applyDichlofos();
            tryUnlock();
            return;
          }
        }
      }

      if (activeTarget === 'shop' && PROPS_DATA[propId] && PROPS_DATA[propId].cost > 0) {
        const refundPrice = Math.floor(PROPS_DATA[propId].cost / 2);
        refundShopItem('household', propId);
        if (shopBtn) {
          const shRect = shopBtn.getBoundingClientRect();
          particles.push({
            x: shRect.left + shRect.width / 2,
            y: shRect.top + shRect.height / 2,
            vx: (Math.random() - 0.5) * 60,
            vy: -140,
            size: 16,
            alpha: 1.1,
            text: `💰 Сдано в магазин: +${refundPrice.toLocaleString('ru-RU')} 🦆`,
            color: '#34d399'
          });
        }
        return;
      }

      if (activeTarget === 'storage') {
        returnPropToStorage(propId);
        if (storageBtn) {
          const sRect = storageBtn.getBoundingClientRect();
          particles.push({
            x: sRect.left + sRect.width / 2,
            y: sRect.top + sRect.height / 2,
            vx: (Math.random() - 0.5) * 60,
            vy: -140,
            size: 16,
            alpha: 1.1,
            text: '📦 Убрано на склад!',
            color: '#fdba74'
          });
        }
        return;
      }

      el.classList.add('is-wobbling');
      setTimeout(() => el.classList.remove('is-wobbling'), 650);

      if (!placedProps[propId]) placedProps[propId] = { placed: true };
      placedProps[propId].left = el.style.left;
      placedProps[propId].top = el.style.top;
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (err) {}

      if (!isStoveCombined && (propId === 'skovoroda' || propId === 'plita')) {
        checkStovePanCombine();
      }
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);

    // Клик по предмету (для инкубатора): открывать меню только если предмет НЕ перетаскивали
    el.addEventListener('click', (e) => {
      if (isDragAction || dragDistance > 5) {
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();
        isDragAction = false;
        dragDistance = 0;
        return;
      }
      if (propId === 'incubator') {
        e.stopPropagation();
        e.preventDefault();
        if (typeof openIncubatorModal === 'function') {
          openIncubatorModal();
        }
      } else if (propId === 'lamp') {
        e.stopPropagation();
        e.preventDefault();
        if (typeof toggleLamp === 'function') {
          toggleLamp(e);
        }
      } else if (propId === 'fridge') {
        e.stopPropagation();
        e.preventDefault();
        if (typeof toggleFridge === 'function') {
          toggleFridge(e);
        }
      }
    }, true);

    // ПКМ по предмету: открытие контекстного меню
    el.addEventListener('contextmenu', (e) => {
      if (e.target.closest('.stove-separate-btn')) return;
      e.preventDefault();
      e.stopPropagation();
      const rect = el.getBoundingClientRect();
      const posX = e.clientX || (rect.left + rect.width / 2);
      const posY = e.clientY || (rect.top + rect.height / 2);
      showPropContextMenu(propId, posX, posY);
    });
  }

  function restorePropsOnScreen() {
    let changed = false;
    Object.keys(placedProps).forEach(id => {
      if (ownedProps.includes(id)) {
        const el = document.getElementById('prop-' + id);
        if (el && placedProps[id].left && placedProps[id].top) {
          const dims = getPropDimensions(id);
          let curTop = parseFloat(placedProps[id].top);
          let curLeft = parseFloat(placedProps[id].left);

          const maxTop = Math.max(70, window.innerHeight - dims.height - 20);
          if (isNaN(curTop) || curTop + dims.height > window.innerHeight - 10) {
            curTop = maxTop;
            placedProps[id].top = curTop + 'px';
            changed = true;
          }
          const maxLeft = Math.max(20, window.innerWidth - dims.width - 20);
          if (isNaN(curLeft) || curLeft > maxLeft) {
            curLeft = Math.min(maxLeft, Math.max(20, curLeft || 20));
            placedProps[id].left = curLeft + 'px';
            changed = true;
          }

          el.style.left = placedProps[id].left;
          el.style.top = placedProps[id].top;
          el.style.display = 'block';
        }
      }
    });
    if (changed) {
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    }

    if (isStoveCombined) {
      const plitaEl = document.getElementById('prop-plita');
      const skovEl = document.getElementById('prop-skovoroda');
      if (plitaEl && skovEl && ownedProps.includes('plita') && ownedProps.includes('skovoroda') && placedProps.plita && placedProps.skovoroda) {
        combineStoveAndPan(false);
      } else {
        isStoveCombined = false;
        try { Storage.remove(STOVE_COMBINED_KEY); } catch (e) {}
      }
    }

    if (placedProps.lamp && ownedProps.includes('lamp') && isLampOn) {
      updateLampGlowUI();
    } else {
      isLampOn = false;
      updateLampGlowUI();
    }
  }

  function clampAllPlacedPropsToScreen() {
    let changed = false;
    Object.keys(placedProps).forEach(id => {
      if (ownedProps.includes(id) && placedProps[id] && placedProps[id].placed) {
        const el = document.getElementById('prop-' + id);
        if (el && el.style.display !== 'none') {
          const dims = getPropDimensions(id);
          const propW = Math.max(el.offsetWidth || 0, dims.width || 0);
          const propH = Math.max(el.offsetHeight || 0, dims.height || 0);
          let curLeft = parseFloat(el.style.left || placedProps[id].left);
          let curTop = parseFloat(el.style.top || placedProps[id].top);
          if (!isNaN(curLeft)) {
            const maxL = Math.max(10, window.innerWidth - propW - 10);
            const clampedL = Math.max(10, Math.min(maxL, curLeft));
            if (Math.abs(clampedL - curLeft) > 1) {
              el.style.left = clampedL + 'px';
              placedProps[id].left = el.style.left;
              changed = true;
            }
          }
          if (!isNaN(curTop)) {
            const maxT = Math.max(60, window.innerHeight - propH - 20);
            const clampedT = Math.max(60, Math.min(maxT, curTop));
            if (Math.abs(clampedT - curTop) > 1) {
              el.style.top = clampedT + 'px';
              placedProps[id].top = el.style.top;
              changed = true;
            }
          }
        }
      }
    });
    if (changed) {
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    }
  }
  window.clampAllPlacedPropsToScreen = clampAllPlacedPropsToScreen;

  /* ---------- Механика напольной лампы ---------- */
  function lampSwitchSound(on) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(on ? 780 : 480, t);
      osc.frequency.exponentialRampToValueAtTime(on ? 1100 : 280, t + 0.05);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.07);

      if (on) {
        const warmOsc = audioCtx.createOscillator();
        const warmGain = audioCtx.createGain();
        warmOsc.type = 'sine';
        warmOsc.frequency.setValueAtTime(440, t + 0.02);
        warmOsc.frequency.exponentialRampToValueAtTime(587.33, t + 0.22);

        warmGain.gain.setValueAtTime(0.12, t + 0.02);
        warmGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

        warmOsc.connect(warmGain);
        warmGain.connect(audioCtx.destination);
        warmOsc.start(t + 0.02);
        warmOsc.stop(t + 0.25);
      }
    } catch (e) {}
  }

  function toggleLamp(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const lampEl = document.getElementById('prop-lamp');
    if (!lampEl || lampEl.style.display === 'none') {
      setLampState(false);
      return;
    }
    setLampState(!isLampOn);
  }
  window.toggleLamp = toggleLamp;

  function setLampState(active) {
    isLampOn = Boolean(active);
    try {
      Storage.set(LAMP_ON_KEY, isLampOn ? '1' : '0');
    } catch (e) {}

    updateLampGlowUI();
    lampSwitchSound(isLampOn);

    if (isLampOn) {
      spawnLampParticles();
    }
  }
  window.setLampState = setLampState;

  function updateLampGlowUI() {
    const overlay = document.getElementById('lampWarmGlowOverlay');
    const lampEl = document.getElementById('prop-lamp');

    if (overlay) {
      overlay.classList.toggle('active', isLampOn);
    }
    if (lampEl) {
      lampEl.classList.toggle('is-on', isLampOn);
      const badge = lampEl.querySelector('.prop-action-badge');
      if (badge) badge.classList.toggle('is-on', isLampOn);
    }
  }
  window.updateLampGlowUI = updateLampGlowUI;

  function spawnLampParticles() {
    if (!isWindowFocused()) return;
    const lampEl = document.getElementById('prop-lamp');
    if (!lampEl || lampEl.style.display === 'none') return;
    const rect = lampEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + 28;

    const list = window.particlesList || particles;
    const items = ['✨', '💡', '🌟', '🟡', '☀️'];
    for (let i = 0; i < 15; i++) {
      const ang = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 90;
      list.push({
        x: cx + (Math.random() - 0.5) * 20,
        y: cy + (Math.random() - 0.5) * 15,
        vx: Math.cos(ang) * speed,
        vy: -Math.abs(Math.sin(ang) * speed) - 30,
        size: 16 + Math.random() * 10,
        alpha: 1.0,
        text: items[Math.floor(Math.random() * items.length)],
        color: '#ffc107',
        rot: 0,
        rotSpeed: (Math.random() - 0.5) * 8
      });
    }
  }

  /* ---------- Механика холодильника ---------- */
  function fridgeSwitchSound(turningOn) {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(turningOn ? 320 : 540, t);
      osc.frequency.exponentialRampToValueAtTime(turningOn ? 640 : 260, t + 0.12);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  function setFridgeState(active) {
    const wasActive = isFridgeOn;
    isFridgeOn = Boolean(active);
    try {
      Storage.set(FRIDGE_ON_KEY, isFridgeOn ? '1' : '0');
    } catch (e) {}

    updateFridgeUI();

    if (isFridgeOn) {
      if (!wasActive) {
        // При включении добавляет +30 сек свежести (до 60 сек макс)
        if (hasAnyEggsOnPlayer()) {
          eggSpoilRemaining = Math.min(60, eggSpoilRemaining + 30);
        } else {
          eggSpoilRemaining = 60;
        }
        try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
      }
      // Тараканы появляются при включении холодильника (если еще не пройден квест)
      if (!hasClearedRoaches && !isRoachesActive) {
        hasPlacedFridge = true;
        isRoachesActive = true;
        try {
          Storage.set(PLACED_FRIDGE_KEY, '1');
          Storage.set(ROACHES_ACTIVE_KEY, '1');
        } catch (e) {}
        startRoaches();
        updateLevelDisplay();
        renderShopBuyTab();
        tryUnlock();
      }
    } else {
      if (wasActive) {
        // При выключении отнимает бонус 30 сек свежести
        if (hasAnyEggsOnPlayer()) {
          eggSpoilRemaining = Math.max(0, eggSpoilRemaining - 30);
          try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
          if (eggSpoilRemaining <= 0) {
            spoilEggs();
            return;
          }
        } else {
          eggSpoilRemaining = 30;
          try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
        }
      }
    }
    updateEggSpoilTimerDisplay();
  }
  window.setFridgeState = setFridgeState;

  function toggleFridge(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const fridgeEl = document.getElementById('prop-fridge');
    if (!fridgeEl || fridgeEl.style.display === 'none') {
      setFridgeState(false);
      return;
    }
    const nextState = !isFridgeOn;
    setFridgeState(nextState);
    fridgeSwitchSound(nextState);

    const fRect = fridgeEl.getBoundingClientRect();
    particles.push({
      x: fRect.left + fRect.width / 2,
      y: fRect.top - 15,
      vx: 0,
      vy: -90,
      size: 18,
      alpha: 1.3,
      text: nextState ? '❄️ Холодильник включён (+30 сек свежести!)' : '❄️ Холодильник выключен',
      color: '#38bdf8'
    });
  }
  window.toggleFridge = toggleFridge;

  function updateFridgeUI() {
    const fridgeEl = document.getElementById('prop-fridge');

    if (fridgeEl) {
      fridgeEl.classList.toggle('is-on', isFridgeOn);
      const badge = fridgeEl.querySelector('.prop-action-badge');
      if (badge) badge.classList.toggle('is-on', isFridgeOn);
    }
  }
  window.updateFridgeUI = updateFridgeUI;

  /* ---------- Механика тараканов и дихлофоса ---------- */
  const ROACH_SVG_MARKUP = `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 29 18 Q 14 7 6 5" stroke="#451806" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M 35 18 Q 50 7 58 5" stroke="#451806" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M 26 23 L 16 18 L 10 11" stroke="#451806" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 38 23 L 48 18 L 54 11" stroke="#451806" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 23 33 L 12 30 L 6 36" stroke="#451806" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 41 33 L 52 30 L 58 36" stroke="#451806" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 24 43 L 11 48 L 7 59" stroke="#451806" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 40 43 L 53 48 L 57 59" stroke="#451806" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 28 54 L 24 61" stroke="#451806" stroke-width="2" stroke-linecap="round"/>
    <path d="M 36 54 L 40 61" stroke="#451806" stroke-width="2" stroke-linecap="round"/>
    <ellipse cx="32" cy="38" rx="11" ry="16.5" fill="#8d3d18" stroke="#381305" stroke-width="1.8"/>
    <path d="M 32 25 L 32 54" stroke="#381305" stroke-width="1.6"/>
    <path d="M 27 30 Q 29 42 28 48" stroke="rgba(255, 210, 160, 0.45)" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 37 30 Q 35 42 36 48" stroke="rgba(0, 0, 0, 0.35)" stroke-width="1.4" stroke-linecap="round"/>
    <ellipse cx="32" cy="23.5" rx="9.5" ry="7" fill="#541e08" stroke="#2b0d03" stroke-width="1.8"/>
    <circle cx="32" cy="22" r="3.5" fill="#752a0c" opacity="0.6"/>
    <ellipse cx="32" cy="17" rx="4.5" ry="3.5" fill="#2b0d03"/>
    <circle cx="29.5" cy="16" r="1.2" fill="#110501"/>
    <circle cx="34.5" cy="16" r="1.2" fill="#110501"/>
  </svg>`;

  let roachesList = [];
  let roachesAnimId = null;

  function startRoaches() {
    const container = document.getElementById('roachesContainer');
    if (!container) return;
    if (roachesList.length > 0) return;

    const count = 12;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'roach-bug';
      el.innerHTML = ROACH_SVG_MARKUP;
      container.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = 1.4 + Math.random() * 2.2;
      const roach = {
        el,
        x: 40 + Math.random() * (window.innerWidth - 80),
        y: 60 + Math.random() * (window.innerHeight - 120),
        angle,
        speed,
        turnTimer: 20 + Math.random() * 40,
        dying: false
      };
      roachesList.push(roach);
    }

    if (!roachesAnimId) {
      roachesAnimId = requestAnimationFrame(roachesLoop);
    }
  }

  function roachesLoop() {
    if (roachesList.length === 0) {
      roachesAnimId = null;
      return;
    }

    const w = window.innerWidth;
    const h = window.innerHeight;

    roachesList.forEach(r => {
      if (!r.dying) {
        r.x += Math.cos(r.angle) * r.speed;
        r.y += Math.sin(r.angle) * r.speed;

        r.turnTimer--;
        if (r.turnTimer <= 0) {
          r.angle += (Math.random() - 0.5) * 1.5;
          r.turnTimer = 25 + Math.random() * 50;
        }

        if (r.x < 15) { r.angle = Math.PI - r.angle; r.x = 15; }
        if (r.x > w - 40) { r.angle = Math.PI - r.angle; r.x = w - 40; }
        if (r.y < 15) { r.angle = -r.angle; r.y = 15; }
        if (r.y > h - 40) { r.angle = -r.angle; r.y = h - 40; }

        r.el.style.transform = `translate(${r.x}px, ${r.y}px) rotate(${r.angle + Math.PI / 2}rad)`;
      }
    });

    roachesAnimId = requestAnimationFrame(roachesLoop);
  }

  function stopRoaches() {
    if (roachesAnimId) {
      cancelAnimationFrame(roachesAnimId);
      roachesAnimId = null;
    }
    const container = document.getElementById('roachesContainer');
    if (container) container.innerHTML = '';
    roachesList = [];
  }

  function toggleCheatRoaches() {
    if (isRoachesActive) {
      isRoachesActive = false;
      try { Storage.set(ROACHES_ACTIVE_KEY, '0'); } catch (e) {}
      stopRoaches();
    } else {
      isRoachesActive = true;
      try { Storage.set(ROACHES_ACTIVE_KEY, '1'); } catch (e) {}
      startRoaches();
    }
    updateLevelDisplay();
  }

  function applyDichlofos() {
    spraySound();

    const smokeContainer = document.getElementById('greenSmokeContainer');
    const smokeEmojis = ['💨', '🧪', '🟢', '💨'];
    let smokeInterval = null;

    if (smokeContainer) {
      smokeInterval = setInterval(() => {
        for (let i = 0; i < 4; i++) {
          const item = document.createElement('div');
          item.className = 'green-smoke-item';
          item.textContent = smokeEmojis[Math.floor(Math.random() * smokeEmojis.length)];
          item.style.left = Math.random() * (window.innerWidth - 60) + 'px';
          item.style.top = Math.random() * (window.innerHeight - 80) + 'px';
          item.style.fontSize = (36 + Math.random() * 32) + 'px';
          smokeContainer.appendChild(item);
          setTimeout(() => item.remove(), 2200);
        }
      }, 180);
    }

    particles.push({
      x: innerWidth / 2,
      y: innerHeight / 2 - 30,
      vx: 0,
      vy: -120,
      size: 24,
      alpha: 1.5,
      text: '🧴 ДИХЛОФОС В ДЕЙСТВИИ! 💨',
      color: '#4ade80'
    });

    // Анимация гибели тараканов
    roachesList.forEach(r => {
      r.dying = true;
      r.speed = 0;
      r.el.classList.add('dying');
      r.el.style.transform += ' rotate(180deg) scale(0.85)';
    });

    setTimeout(() => {
      if (smokeInterval) clearInterval(smokeInterval);
      if (smokeContainer) smokeContainer.innerHTML = '';

      isRoachesActive = false;
      hasClearedRoaches = true;
      try {
        Storage.set(ROACHES_ACTIVE_KEY, '0');
        Storage.set(CLEARED_ROACHES_KEY, '1');
      } catch (e) {}

      stopRoaches();

      // Дихлофос расходуется и пропадает, а холодильник остаётся!
      ownedProps = ownedProps.filter(id => id !== 'dichlofos');
      delete placedProps['dichlofos'];
      try {
        Storage.setJSON(OWNED_PROPS_KEY, ownedProps);
        Storage.setJSON(PLACED_PROPS_KEY, placedProps);
      } catch (e) {}

      const dEl = document.getElementById('prop-dichlofos');
      if (dEl) dEl.style.display = 'none';

      updateLevelDisplay();
      renderStorage();
      renderShopBuyTab();
      updateShopButtonVisibility();

      particles.push({
        x: innerWidth / 2,
        y: innerHeight / 2 - 40,
        vx: 0,
        vy: -140,
        size: 22,
        alpha: 1.4,
        text: '✨ Все тараканы уничтожены! Опыт снова накапливается! 🎉',
        color: '#4ade80'
      });
      xpSound();
    }, 5000);
  }
  window.applyDichlofos = applyDichlofos;

  // Модальное окно Гардероба
  const wardrobeBtn = document.getElementById('wardrobeBtn');
  const wardrobeModal = document.getElementById('wardrobeModal');
  const closeWardrobeBtn = document.getElementById('closeWardrobeBtn');

  if (wardrobeBtn && wardrobeModal && closeWardrobeBtn) {
    wardrobeBtn.addEventListener('click', () => {
      renderWardrobe();
      wardrobeModal.classList.add('open');
    });
    closeWardrobeBtn.addEventListener('click', () => {
      wardrobeModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    wardrobeModal.addEventListener('click', (e) => {
      if (e.target === wardrobeModal) {
        wardrobeModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }

  // Модальное окно Склада
  const storageBtn = document.getElementById('storageBtn');
  const storageModal = document.getElementById('storageModal');
  const closeStorageBtn = document.getElementById('closeStorageBtn');

  if (storageBtn && storageModal && closeStorageBtn) {
    storageBtn.addEventListener('click', () => {
      renderStorage();
      storageModal.classList.add('open');
    });
    closeStorageBtn.addEventListener('click', () => {
      storageModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    storageModal.addEventListener('click', (e) => {
      if (e.target === storageModal) {
        storageModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }

  // Модальное окно Филиалов
  const branchesBtn = document.getElementById('branchesBtn');
  const branchesModal = document.getElementById('branchesModal');
  const closeBranchesBtn = document.getElementById('closeBranchesBtn');

  if (branchesBtn && branchesModal && closeBranchesBtn) {
    branchesBtn.addEventListener('click', () => {
      renderBranchesModal();
      branchesModal.classList.add('open');
    });
    closeBranchesBtn.addEventListener('click', () => {
      branchesModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    branchesModal.addEventListener('click', (e) => {
      if (e.target === branchesModal) {
        branchesModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }

  // Модальное окно Ачивок
  const achvBtn = document.getElementById('achvBtn');
  const achievementsModal = document.getElementById('achievementsModal');
  const closeAchvBtn = document.getElementById('closeAchvBtn');

  if (achvBtn && achievementsModal && closeAchvBtn) {
    achvBtn.addEventListener('click', () => {
      achievementsModal.classList.add('open');
      updateAchvCounter();
    });
    closeAchvBtn.addEventListener('click', () => {
      achievementsModal.classList.remove('open');
      updateUpgradesButtonHighlight();
    });
    achievementsModal.addEventListener('click', (e) => {
      if (e.target === achievementsModal) {
        achievementsModal.classList.remove('open');
        updateUpgradesButtonHighlight();
      }
    });
  }
