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

    const sellHoneyCard = document.getElementById('sellHoneyCard');
    const shopHoneyCount = document.getElementById('shopHoneyCount');
    const sellHoney1Btn = document.getElementById('sellHoney1Btn');
    const sellHoneyAllBtn = document.getElementById('sellHoneyAllBtn');

    if (sellHoneyCard) {
      sellHoneyCard.style.display = (honeyCount > 0) ? 'flex' : 'none';
      if (shopHoneyCount) shopHoneyCount.textContent = honeyCount.toLocaleString('ru-RU');
      if (sellHoney1Btn) sellHoney1Btn.disabled = honeyCount < 1;
      if (sellHoneyAllBtn) {
        sellHoneyAllBtn.disabled = honeyCount < 1;
        sellHoneyAllBtn.textContent = `Продать всё (+${(honeyCount * 2500).toLocaleString('ru-RU')} 🦆)`;
      }
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
      sGDCard.style.display = (gdCount > 0 || hasHatchedGoldenDuckling) ? 'flex' : 'none';
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
      sGCard.style.display = (gCount > 0 || (hasHatchedDuckling && gCount > 0)) ? 'flex' : 'none';
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
      sGGCard.style.display = (ggCount > 0 || (hasHatchedGoldenDuckling && ggCount > 0)) ? 'flex' : 'none';
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
      removeEggsFromBatches('normal', qty);
      earned = qty * 200;
    } else if (type === 'golden') {
      const qty = (amount === 'all') ? goldenEggs : Math.min(amount, goldenEggs);
      if (qty <= 0) return;
      removeEggsFromBatches('golden', qty);
      earned = qty * 5000;
    } else if (type === 'fried') {
      const qty = (amount === 'all') ? friedEggs : Math.min(amount, friedEggs);
      if (qty <= 0) return;
      removeEggsFromBatches('fried', qty);
      earned = qty * 1600;
    } else if (type === 'goldenFried') {
      const qty = (amount === 'all') ? goldenFriedEggs : Math.min(amount, goldenFriedEggs);
      if (qty <= 0) return;
      removeEggsFromBatches('goldenFried', qty);
      earned = qty * 15000;
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
      isFoodBuyCollapsed = true;
      isGardeningCollapsed = true;
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
    } else if (category === 'household' || category === 'food' || category === 'gardening') {
      // Предметы, не предназначенные для прямой покупки в магазине
      if (itemId === 'tomato' || itemId === 'cucumber' || itemId === 'lettuce' || itemId === 'saladPlate' || itemId === 'key' || itemId === 'honey' || itemId === 'pixelMap') return;
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
        text: category === 'gardening' ? '🌱 Садовый инвентарь на столе!' : (category === 'food' ? '🥗 Еда на столе!' : '🍳 Предмет на столе!'),
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
    } else if (category === 'household' || category === 'food' || category === 'gardening') {
      if (itemId === 'tomato' || itemId === 'cucumber' || itemId === 'lettuce' || itemId === 'saladPlate' || itemId === 'key' || itemId === 'honey' || itemId === 'pixelMap') return;
      const prop = PROPS_DATA[itemId];
      if (!prop || !ownedProps.includes(itemId) || !prop.cost) return;
      const refundAmount = Math.floor(prop.cost / 2);

      // Если предмет сейчас на столе, возвращаем его со стола
      if (placedProps[itemId]) {
        returnPropToStorage(itemId);
      }

      if (itemId === 'pot') {
        potState = 'empty';
        potGrowRemaining = 0;
        try {
          Storage.set(POT_STATE_KEY, 'empty');
          Storage.set(POT_GROW_REMAINING_KEY, '0');
          Storage.set(BEE_ACTIVE_KEY, 'false');
          Storage.set(BEE_TIMER_KEY, '0');
        } catch (e) {}
        if (typeof stopBeeBuzz === 'function') stopBeeBuzz();
        const beeEl = document.getElementById('flowerBee');
        if (beeEl) beeEl.style.display = 'none';
        if (typeof updatePotUI === 'function') updatePotUI();
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
        if (id === 'key' || id === 'pixelMap') return;
        // Дихлофос не отображается в магазине до "Выложить Вонючий старый холодильник на стол"
        if (id === 'dichlofos' && !hasPlacedFridge) return;
        // Если тараканы уже выведены дихлофосом, дихлофос больше не продаётся в магазине
        if (id === 'dichlofos' && hasClearedRoaches) return;

        const prop = PROPS_DATA[id];
        if (prop.category !== 'household') return;
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
    const foodBuyContainer = document.getElementById('foodBuyList');
    if (foodBuyContainer) {
      foodBuyContainer.innerHTML = '';
      const sortedFoodKeys = Object.keys(PROPS_DATA).filter(id => {
        // Помидор, огурец, лист салата не продаются в магазине (получаются из овощного набора)
        // Тарелка салата готовится на разделочной доске и не продаётся в магазине
        if (id === 'tomato' || id === 'cucumber' || id === 'lettuce' || id === 'saladPlate' || id === 'honey') return false;
        return PROPS_DATA[id].category === 'food';
      }).sort((a, b) => {
        const aOwned = ownedProps.includes(a) ? 1 : 0;
        const bOwned = ownedProps.includes(b) ? 1 : 0;
        return aOwned - bOwned;
      });
      sortedFoodKeys.forEach(id => {
        const prop = PROPS_DATA[id];
        const isOwned = ownedProps.includes(id);
        const canAfford = duckles >= prop.cost;

        let actionHtml = '';
        if (isOwned) {
          const refundPrice = Math.floor(prop.cost / 2);
          actionHtml = `
            <div class="buy-owned-wrap">
              <div class="buy-owned-badge">✓ На складе</div>
              <button class="buy-refund-btn" title="Вернуть предмет в магазин за 50% стоимости" onclick="refundShopItem('food', '${id}')">
                Вернуть (+${refundPrice.toLocaleString('ru-RU')} 🦆)
              </button>
            </div>
          `;
        } else {
          const btnClass = canAfford ? 'buy-action-btn' : 'buy-action-btn disabled';
          actionHtml = `<button class="${btnClass}" onclick="buyShopItem('food', '${id}')">Купить (${prop.cost.toLocaleString('ru-RU')} 🦆)</button>`;
        }

        const card = document.createElement('div');
        card.className = 'buy-card' + (isOwned ? ' owned' : '');
        card.innerHTML = `
          <div class="buy-item-left">
            <div class="buy-item-img-box">
              <img class="buy-item-img" src="${prop.icon}" alt="${prop.name}" referrerpolicy="no-referrer"
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
              <span style="display: none;">${prop.fallbackEmoji || '🥗'}</span>
            </div>
            <div class="buy-item-info">
              <div class="buy-item-name">${prop.name}</div>
              <div class="buy-item-desc">${prop.desc}</div>
              <div class="buy-item-price">${prop.cost.toLocaleString('ru-RU')} 🦆</div>
            </div>
          </div>
          ${actionHtml}
        `;
        foodBuyContainer.appendChild(card);
      });
    }

    const gardeningContainer = document.getElementById('gardeningBuyList');
    if (gardeningContainer) {
      gardeningContainer.innerHTML = '';
      const sortedGardeningKeys = Object.keys(PROPS_DATA).filter(id => {
        return PROPS_DATA[id].category === 'gardening';
      }).sort((a, b) => {
        const aOwned = ownedProps.includes(a) ? 1 : 0;
        const bOwned = ownedProps.includes(b) ? 1 : 0;
        return aOwned - bOwned;
      });

      if (sortedGardeningKeys.length === 0) {
        gardeningContainer.innerHTML = `
          <div class="empty-shop-msg" style="padding: 16px 12px; text-align: center; color: #94a3b8; font-size: 13px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed rgba(255,255,255,0.08);">
            🌱 Товары для садоводства скоро появятся в продаже!
          </div>
        `;
      } else {
        sortedGardeningKeys.forEach(id => {
          const prop = PROPS_DATA[id];
          const isOwned = ownedProps.includes(id);
          const canAfford = duckles >= prop.cost;

          let actionHtml = '';
          if (isOwned) {
            const refundPrice = Math.floor(prop.cost / 2);
            actionHtml = `
              <div class="buy-owned-wrap">
                <div class="buy-owned-badge">✓ На складе</div>
                <button class="buy-refund-btn" title="Вернуть предмет в магазин за 50% стоимости" onclick="refundShopItem('gardening', '${id}')">
                  Вернуть (+${refundPrice.toLocaleString('ru-RU')} 🦆)
                </button>
              </div>
            `;
          } else {
            const btnClass = canAfford ? 'buy-action-btn' : 'buy-action-btn disabled';
            actionHtml = `<button class="${btnClass}" onclick="buyShopItem('gardening', '${id}')">Купить (${prop.cost.toLocaleString('ru-RU')} 🦆)</button>`;
          }

          const card = document.createElement('div');
          card.className = 'buy-card' + (isOwned ? ' owned' : '');
          card.innerHTML = `
            <div class="buy-item-left">
              <div class="buy-item-img-box">
                <img class="buy-item-img" src="${prop.icon}" alt="${prop.name}" referrerpolicy="no-referrer"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
                <span style="display: none;">${prop.fallbackEmoji || '🌱'}</span>
              </div>
              <div class="buy-item-info">
                <div class="buy-item-name">${prop.name}</div>
                <div class="buy-item-desc">${prop.desc}</div>
                <div class="buy-item-price">${prop.cost.toLocaleString('ru-RU')} 🦆</div>
              </div>
            </div>
            ${actionHtml}
          `;
          gardeningContainer.appendChild(card);
        });
      }
    }
    updateShopSectionCollapsedUI();
  }

  function updateShopSectionCollapsedUI() {
    const clothingSection = document.getElementById('clothingShopSection');
    const householdSection = document.getElementById('householdShopSection');
    const foodBuySection = document.getElementById('foodBuyShopSection');
    const gardeningSection = document.getElementById('gardeningShopSection');
    const foodSection = document.getElementById('foodShopSection');
    const animalsSection = document.getElementById('animalsShopSection');
    if (clothingSection) {
      clothingSection.classList.toggle('collapsed', isClothingCollapsed);
    }
    if (householdSection) {
      householdSection.classList.toggle('collapsed', isHouseholdCollapsed);
    }
    if (foodBuySection) {
      foodBuySection.classList.toggle('collapsed', isFoodBuyCollapsed);
    }
    if (gardeningSection) {
      gardeningSection.classList.toggle('collapsed', isGardeningCollapsed);
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
    } else if (sectionKey === 'foodBuy') {
      isFoodBuyCollapsed = !isFoodBuyCollapsed;
      try {
        Storage.set(SHOP_FOOD_BUY_COLLAPSED_KEY, isFoodBuyCollapsed ? '1' : '0');
      } catch (e) {}
    } else if (sectionKey === 'gardening') {
      isGardeningCollapsed = !isGardeningCollapsed;
      try {
        Storage.set(SHOP_GARDENING_COLLAPSED_KEY, isGardeningCollapsed ? '1' : '0');
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

  /* ---------- Определение местонахождения предмета ---------- */
  function getPropLocation(propId) {
    if (placedProps && placedProps[propId] && placedProps[propId].placed) {
      return { type: 'desk', label: '🟢 Сейчас выложен на столе' };
    }
    if (transferredProps) {
      for (const screen in transferredProps) {
        if (screen === 'savedDeskPos') continue;
        if (Array.isArray(transferredProps[screen]) && transferredProps[screen].includes(propId)) {
          const screenNames = {
            achievements: 'в окне «Ачивки»',
            map: 'на карте мира',
            branches: 'в окне «Филиалы»',
            shop: 'в окне «Магазин»'
          };
          const name = screenNames[screen] || `во вкладке «${screen}»`;
          return { type: 'screen', screen: screen, label: `🏆 Находится ${name}` };
        }
      }
    }
    return { type: 'storage', label: '📦 Находится на складе' };
  }
  window.getPropLocation = getPropLocation;

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

      const loc = getPropLocation(id);
      const isPlaced = loc.type === 'desk';
      const card = document.createElement('div');
      card.className = 'storage-card';

      let propIcon = prop.icon;
      let propFallbackEmoji = prop.fallbackEmoji;
      let propDescExtra = '';

      if (id === 'pot') {
        if (potState === 'dirt') {
          propIcon = (window.ASSETS && ASSETS.props && ASSETS.props.potDirt) || prop.icon;
          propFallbackEmoji = '🌱';
          propDescExtra = ' (С землёй)';
        } else if (potState === 'planted') {
          propIcon = (window.ASSETS && ASSETS.props && ASSETS.props.potDirt) || prop.icon;
          propFallbackEmoji = '🌱';
          propDescExtra = ' (Посажены семена)';
        } else if (potState === 'bloomed') {
          propIcon = (window.ASSETS && ASSETS.props && ASSETS.props.potFlower) || prop.icon;
          propFallbackEmoji = '🌸';
          propDescExtra = ' (С цветами)';
        } else {
          propIcon = (window.ASSETS && ASSETS.props && ASSETS.props.potEmpty) || prop.icon;
          propFallbackEmoji = '🪴';
          propDescExtra = ' (Пустой)';
        }
      }

      let btnHtml = isPlaced
        ? `<button class="storage-toggle-btn placed" onclick="returnPropToStorage('${id}')">Убрать на склад</button>`
        : `<button class="storage-toggle-btn" onclick="placePropOnScreen('${id}')">Выложить на стол</button>`;

      card.innerHTML = `
        <div class="buy-item-left">
          <div class="buy-item-img-box">
            <img class="buy-item-img" src="${propIcon}" alt="${prop.name}" referrerpolicy="no-referrer"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
            <span style="display: none;">${propFallbackEmoji}</span>
          </div>
          <div class="buy-item-info">
            <div class="buy-item-name">${prop.name}${propDescExtra}</div>
            <div class="buy-item-desc">${loc.label}</div>
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
    if (propId === 'pixelMap') return { width: 88, height: 66 };
    if (propId === 'knife') return { width: 76, height: 76 };
    if (propId === 'tape') return { width: 72, height: 72 };
    if (propId === 'pot') return { width: 90, height: 98 };
    if (propId === 'dirtBag') return { width: 80, height: 80 };
    if (propId === 'flowerSeeds') return { width: 72, height: 72 };
    if (propId === 'honey') return { width: 68, height: 68 };
    return { width: 85, height: 85 };
  }

  function placePropOnScreen(propId) {
    if (!ownedProps.includes(propId)) return;
    const el = document.getElementById('prop-' + propId);
    if (!el) return;

    // Снимаем предмет со всех экранов переноса, если он там был (не дублируем предметы)
    let wasTransferred = false;
    if (transferredProps) {
      for (const screen in transferredProps) {
        if (screen === 'savedDeskPos') continue;
        if (Array.isArray(transferredProps[screen])) {
          const idx = transferredProps[screen].indexOf(propId);
          if (idx !== -1) {
            transferredProps[screen].splice(idx, 1);
            wasTransferred = true;
            renderTransferredPropsTray(screen);
          }
        }
      }
      if (wasTransferred) {
        try { Storage.setJSON(TRANSFERRED_PROPS_KEY, transferredProps); } catch (e) {}
      }
    }

    const dims = getPropDimensions(propId);
    const propWidth = dims.width;
    const propHeight = dims.height;

    const savedPos = (transferredProps && transferredProps.savedDeskPos && transferredProps.savedDeskPos[propId]) || null;
    if (savedPos && savedPos.left && savedPos.top) {
      const sLeft = typeof savedPos.left === 'number' ? savedPos.left + 'px' : savedPos.left;
      const sTop = typeof savedPos.top === 'number' ? savedPos.top + 'px' : savedPos.top;
      placedProps[propId] = { placed: true, left: sLeft, top: sTop };
    } else if (!placedProps[propId] || !placedProps[propId].left) {
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
                     (propId === 'key' ? 260 : (propId === 'pixelMap' ? 140 : 0))))))))));
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
    el.dataset.placed = '1';

    el.classList.add('is-wobbling');
    setTimeout(() => el.classList.remove('is-wobbling'), 600);

    try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    corkPopSound();
    renderStorage();

    if (wasTransferred) {
      const propInfo = PROPS_DATA[propId];
      const pName = propInfo ? propInfo.name : 'Предмет';
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -90,
        size: 16,
        alpha: 1.3,
        text: `🗝️ ${pName} перенесён на стол!`,
        color: '#ffd24d'
      });
    }

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
    } else if (propId === 'pot') {
      if (typeof updatePotUI === 'function') updatePotUI();
    } else if (propId === 'pot') {
      if (typeof updatePotUI === 'function') updatePotUI();
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
      delete el.dataset.placed;
    }

    if (isStoveCombined && (propId === 'skovoroda' || propId === 'plita')) {
      separateStoveAndPan(false);
    }

    if (transferredProps) {
      let changed = false;
      for (const screen in transferredProps) {
        if (screen === 'savedDeskPos') continue;
        if (Array.isArray(transferredProps[screen])) {
          const idx = transferredProps[screen].indexOf(propId);
          if (idx !== -1) {
            transferredProps[screen].splice(idx, 1);
            changed = true;
            renderTransferredPropsTray(screen);
          }
        }
      }
      if (changed) {
        try { Storage.setJSON(TRANSFERRED_PROPS_KEY, transferredProps); } catch (e) {}
      }
    }

    if (propId === 'incubator' && isIncubating) {
      addEggBatch(incubatingType, incubatingCount);
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
    if (propId === 'honey') {
      if (propCtxReturnBtn) propCtxReturnBtn.style.display = 'none';
      if (propCtxRefundBtn) {
        propCtxRefundBtn.style.display = 'flex';
        propCtxRefundBtn.innerHTML = `<span class="prop-ctx-icon">💰</span> Продать за 2 500 🦆`;
      }
      if (propCtxSellAllBtn && honeyCount > 1) {
        propCtxSellAllBtn.style.display = 'flex';
        propCtxSellAllBtn.innerHTML = `<span class="prop-ctx-icon">✨</span> Продать всё (+${(honeyCount * 2500).toLocaleString('ru-RU')} 🦆)`;
      }
    } else if (propCtxRefundBtn) {
      if (prop && prop.cost && prop.cost > 0) {
        const refundPrice = Math.floor(prop.cost / 2);
        propCtxRefundBtn.style.display = 'flex';
        propCtxRefundBtn.innerHTML = `<span class="prop-ctx-icon">💰</span> Сдать за ${refundPrice.toLocaleString('ru-RU')} 🦆`;
      } else {
        propCtxRefundBtn.style.display = 'none';
      }
    }

    propContextMenu.style.display = 'block';

    let btnCount = 1;
    if (propCtxRefundBtn && propCtxRefundBtn.style.display !== 'none') btnCount++;
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
        if (activeContextPropId === 'honey') {
          sellHoney(1);
        } else {
          refundShopItem('household', activeContextPropId);
        }
        hidePropContextMenu();
      }
    });
  }

  const propCtxSell1Btn = document.getElementById('propCtxSell1Btn');
  if (propCtxSell1Btn) {
    propCtxSell1Btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeContextEggType) {
        if (activeContextPropId === 'honey' || activeContextEggType === 'honey') {
          sellHoney('all');
          hidePropContextMenu();
          return;
        }
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
        incubator: '🐣', key: '🗝️', pot: '🪴', dirtBag: '🌱', flowerSeeds: '🌸', honey: '🍯', pixelMap: '🗺️'
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
    } else if (type === 'prop' && id === 'honey') {
      honeyCount = Math.max(0, honeyCount - 1);
      try { Storage.set(HONEY_COUNT_KEY, String(honeyCount)); } catch (e) {}
      updateHoneyDeskProp();
      updateShopSellTab();
      updateShopTabsVisibility();
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
      removeEggsFromBatches(eggType, 1);
      if (eggType === 'normal') {
        itemName = 'Обычное яйцо';
      } else if (eggType === 'golden') {
        itemName = 'Золотое яйцо';
      } else if (eggType === 'fried') {
        itemName = 'Жареное яйцо';
      } else if (eggType === 'goldenFried') {
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

  // Выбрасывание в мусорку через ПКМ убрано (выбрасывание только через перетаскивание)

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

      // Подсветка кнопки Ачивки при наведении ключа
      const achvBtn = document.getElementById('achvBtn');
      if (propId === 'key' && achvBtn) {
        const ar = achvBtn.getBoundingClientRect();
        const isHoverAchv = (e.clientX >= ar.left - 20 && e.clientX <= ar.right + 20 &&
                             e.clientY >= ar.top - 20 && e.clientY <= ar.bottom + 20);
        achvBtn.classList.toggle('drag-target-hover', isHoverAchv);
      }

      // Подсветка Карты на столе при наведении любого предмета
      const mapDeskEl = document.getElementById('prop-pixelMap');
      if (propId !== 'pixelMap' && mapDeskEl && mapDeskEl.style.display !== 'none') {
        const mr = mapDeskEl.getBoundingClientRect();
        const isHoverMap = (e.clientX >= mr.left - 20 && e.clientX <= mr.right + 20 &&
                            e.clientY >= mr.top - 20 && e.clientY <= mr.bottom + 20);
        mapDeskEl.classList.toggle('drag-target-hover', isHoverMap);
      }

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

      // Овощи и Нож: подсветка разделочной доски при наведении
      if (propId === 'tomato' || propId === 'cucumber' || propId === 'lettuce' || propId === 'knife') {
        const cbEl = document.getElementById('prop-cuttingBoard');
        if (cbEl && cbEl.style.display !== 'none') {
          const cbr = cbEl.getBoundingClientRect();
          const isOverBoard = (e.clientX >= cbr.left - 15 && e.clientX <= cbr.right + 15 &&
                               e.clientY >= cbr.top - 15 && e.clientY <= cbr.bottom + 15);
          cbEl.classList.toggle('drag-target-hover', isOverBoard);
        }
      }

      // Нож и Изолента: подсветка утки при наведении
      if (propId === 'knife' || propId === 'tape' || propId === 'birdFeed' || propId === 'duckFeedAlpha' || propId === 'duckFeedBeta' || propId === 'saladPlate') {
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

      const potEl = document.getElementById('prop-pot');
      if (potEl) potEl.classList.remove('drag-target-hover');

      if ((propId === 'dirtBag' || propId === 'flowerSeeds') && potEl && potEl.style.display !== 'none') {
        const pr = potEl.getBoundingClientRect();
        const isOverPot = (cx >= pr.left - 20 && cx <= pr.right + 20 &&
                           cy >= pr.top - 20 && cy <= pr.bottom + 20);
        if (isOverPot) {
          if (propId === 'dirtBag') {
            applyDirtToPot(startLeft, startTop);
            return;
          }
          if (propId === 'flowerSeeds') {
            applySeedsToPot(startLeft, startTop);
            return;
          }
        }
      }

      if (propId === 'honey' && activeTarget === 'shop') {
        sellHoney(1);
        return;
      }

      const cbEl = document.getElementById('prop-cuttingBoard');
      if (cbEl) cbEl.classList.remove('drag-target-hover');

      // Проверка взаимодействия с разделочной доской
      if (cbEl && cbEl.style.display !== 'none') {
        const cbr = cbEl.getBoundingClientRect();
        const isOverBoard = (cx >= cbr.left - 15 && cx <= cbr.right + 15 &&
                             cy >= cbr.top - 15 && cy <= cbr.bottom + 15);
        if (isOverBoard) {
          if (propId === 'tomato' || propId === 'cucumber' || propId === 'lettuce') {
            addVeggieToBoard(propId);
            return;
          }
          if (propId === 'knife') {
            chopSaladOnBoard(startLeft, startTop);
            return;
          }
        }
      }

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

        // Кормление утки или употребление салата
        if (propId === 'birdFeed' || propId === 'duckFeedAlpha' || propId === 'duckFeedBeta') {
          feedDuck(propId);
          return;
        }
        if (propId === 'saladPlate') {
          eatSalad();
          return;
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

      // Перенос ключа на кнопку Ачивки
      const achvBtnEl = document.getElementById('achvBtn');
      if (achvBtnEl) achvBtnEl.classList.remove('drag-target-hover');
      if (propId === 'key' && achvBtnEl) {
        const ar = achvBtnEl.getBoundingClientRect();
        const isOverAchv = (cx >= ar.left - 25 && cx <= ar.right + 25 &&
                            cy >= ar.top - 25 && cy <= ar.bottom + 25);
        if (isOverAchv) {
          transferPropToScreen('achievements', 'key', startLeft, startTop);
          return;
        }
      }

      // Перенос предмета на Карту мира
      const mapDeskDropEl = document.getElementById('prop-pixelMap');
      if (mapDeskDropEl) mapDeskDropEl.classList.remove('drag-target-hover');
      if (propId !== 'pixelMap' && mapDeskDropEl && mapDeskDropEl.style.display !== 'none') {
        const mr = mapDeskDropEl.getBoundingClientRect();
        const isOverMap = (cx >= mr.left - 20 && cx <= mr.right + 20 &&
                           cy >= mr.top - 20 && cy <= mr.bottom + 20);
        if (isOverMap) {
          transferPropToScreen('map', propId, startLeft, startTop);
          return;
        }
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
      if (propId === 'veggieSet') {
        e.stopPropagation();
        e.preventDefault();
        unpackVeggieSet();
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
      } else if (propId === 'pixelMap') {
        e.stopPropagation();
        e.preventDefault();
        if (typeof openMapModal === 'function') {
          openMapModal();
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
      if (transferredProps) {
        if (transferredProps.achievements && transferredProps.achievements.includes(id)) {
          const trEl = document.getElementById('prop-' + id);
          if (trEl) trEl.style.display = 'none';
          return;
        }
        if (transferredProps.map && transferredProps.map.includes(id)) {
          const trEl = document.getElementById('prop-' + id);
          if (trEl) trEl.style.display = 'none';
          return;
        }
      }
      if (ownedProps.includes(id) || (id === 'honey' && typeof honeyCount !== 'undefined' && honeyCount > 0)) {
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

    updateHoneyDeskProp();
  }

  function clampAllPlacedPropsToScreen() {
    let changed = false;
    Object.keys(placedProps).forEach(id => {
      if ((ownedProps.includes(id) || (id === 'honey' && typeof honeyCount !== 'undefined' && honeyCount > 0)) && placedProps[id] && placedProps[id].placed) {
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
        // При включении добавляет +30 сек свежести ко всем партиям (до 60 сек макс)
        if (typeof eggBatches !== 'undefined' && eggBatches.length > 0) {
          for (const b of eggBatches) {
            b.remaining = Math.min(60, b.remaining + 30);
          }
          saveEggBatches();
        }
        eggSpoilRemaining = Math.min(60, eggSpoilRemaining + 30);
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
        // При выключении отнимает бонус 30 сек свежести у всех партий
        if (typeof eggBatches !== 'undefined' && eggBatches.length > 0) {
          let spoiled = [];
          for (const b of eggBatches) {
            b.remaining = Math.max(0, b.remaining - 30);
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
        eggSpoilRemaining = Math.max(0, eggSpoilRemaining - 30);
        try { Storage.set(EGG_SPOIL_TIMER_KEY, String(eggSpoilRemaining)); } catch (e) {}
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

  /* ---------- Просмотр карты мира (Pixel Map) ---------- */
  function openMapModal(skipDialog = false) {
    const hasSeenFirstMapDialog = typeof Storage !== 'undefined' && Storage.getBoolean(FIRST_MAP_DIALOG_SHOWN_KEY, false);
    if (!skipDialog && !hasSeenFirstMapDialog && typeof launchFirstMapDialog === 'function') {
      launchFirstMapDialog(() => {
        openMapModal(true);
      });
      return;
    }

    const modal = document.getElementById('mapModal');
    if (!modal) return;
    if (typeof closeAllModals === 'function') closeAllModals();
    modal.style.display = 'flex';
    modal.classList.add('open');
    isMapModalOpen = true;
    window.isMapModalOpen = true;
    renderTransferredPropsTray('map');
    if (typeof clickSound === 'function') clickSound();
  }
  window.openMapModal = openMapModal;

  /* ---------- Клики по локациям карты мира и переход между экранами ---------- */
  function onMapLocationClick(locId, locName) {
    if (typeof clickSound === 'function') clickSound();
    const locNames = {
      forest: 'Лес',
      cave: 'Пещера',
      village: 'Деревня',
      polyana: 'Поляна',
      lake: 'Озеро'
    };
    const name = locName || locNames[locId] || locId;

    const locImages = {
      forest: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.forest) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/forest.jfif',
      cave: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.cave) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/cave.jfif',
      lake: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.lake) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/lake.jfif',
      polyana: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.polyana) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/polyana.jfif',
      village: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.village) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/village.jfif',
      map: (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.map) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/map.jfif'
    };

    const mapImg = document.getElementById('mapModalImg');
    const hotspotsLayer = document.getElementById('mapHotspotsLayer');
    const backBtn = document.getElementById('mapBackBtn');
    const titleBadge = document.getElementById('mapLocationTitleBadge');
    const titleText = document.getElementById('mapLocationTitleText');

    if (locImages[locId] && mapImg) {
      mapImg.src = locImages[locId];
      currentMapScreen = locId;
      window.currentMapScreen = locId;

      if (hotspotsLayer) hotspotsLayer.style.display = 'none';
      if (backBtn) backBtn.style.display = 'flex';
      if (titleText) titleText.textContent = name;
      if (titleBadge) titleBadge.style.display = 'block';
    }

    const hotspot = document.querySelector(`.map-hotspot[data-location="${locId}"]`);
    if (hotspot && typeof particles !== 'undefined') {
      const hr = hotspot.getBoundingClientRect();
      const icons = {
        forest: '🌲',
        cave: '⛰️',
        village: '🏡',
        polyana: '🌸',
        lake: '🌊'
      };
      const sym = icons[locId] || '✨';
      for (let i = 0; i < 12; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 70 + Math.random() * 140;
        particles.push({
          x: hr.left + hr.width / 2,
          y: hr.top + hr.height / 2,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          size: 16 + Math.random() * 10,
          alpha: 1.2,
          text: sym,
          color: '#ffd24d'
        });
      }
    }
  }
  window.onMapLocationClick = onMapLocationClick;

  /* ---------- Возврат на карту мира из локаций ---------- */
  function returnToWorldMap() {
    if (typeof clickSound === 'function') clickSound();

    const mapImg = document.getElementById('mapModalImg');
    const hotspotsLayer = document.getElementById('mapHotspotsLayer');
    const backBtn = document.getElementById('mapBackBtn');
    const titleBadge = document.getElementById('mapLocationTitleBadge');

    const defaultMapSrc = (window.ASSETS && ASSETS.pixelmap && ASSETS.pixelmap.map) || 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/pixelmap/map.jfif';
    if (mapImg) {
      mapImg.src = defaultMapSrc;
    }

    currentMapScreen = 'map';
    window.currentMapScreen = 'map';

    if (hotspotsLayer) hotspotsLayer.style.display = 'block';
    if (backBtn) backBtn.style.display = 'none';
    if (titleBadge) titleBadge.style.display = 'none';

    if (backBtn && typeof particles !== 'undefined') {
      const br = backBtn.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 50 + Math.random() * 100;
        particles.push({
          x: br.left + br.width / 2,
          y: br.top + br.height / 2,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          size: 14 + Math.random() * 8,
          alpha: 1.1,
          text: '✨',
          color: '#60a5fa'
        });
      }
    }
  }
  window.returnToWorldMap = returnToWorldMap;

  function closeMapModal() {
    const modal = document.getElementById('mapModal');
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }
    if (typeof returnToWorldMap === 'function') {
      returnToWorldMap();
    }
    isMapModalOpen = false;
    window.isMapModalOpen = false;
    if (typeof lastGameTickTime !== 'undefined') {
      lastGameTickTime = Date.now();
    }
  }
  window.closeMapModal = closeMapModal;

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
      if (typeof renderTransferredPropsTray === 'function') renderTransferredPropsTray('achievements');
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

  // ---------- Механика переноса предметов между экранами ----------
  function transferPropToScreen(screen, propId, originLeft, originTop) {
    if (!transferredProps) transferredProps = { achievements: [], map: [] };
    if (!transferredProps[screen]) transferredProps[screen] = [];
    if (!transferredProps.savedDeskPos) transferredProps.savedDeskPos = {};

    const el = document.getElementById('prop-' + propId);
    let sLeft = (typeof originLeft === 'number' ? originLeft + 'px' : originLeft) || (placedProps[propId] && placedProps[propId].left) || (el && el.style.left) || '200px';
    let sTop = (typeof originTop === 'number' ? originTop + 'px' : originTop) || (placedProps[propId] && placedProps[propId].top) || (el && el.style.top) || '200px';
    transferredProps.savedDeskPos[propId] = { left: sLeft, top: sTop };

    if (!transferredProps[screen].includes(propId)) {
      transferredProps[screen].push(propId);
    }
    try { Storage.setJSON(TRANSFERRED_PROPS_KEY, transferredProps); } catch (e) {}

    if (el) {
      el.style.display = 'none';
      delete el.dataset.placed;
    }
    if (placedProps && placedProps[propId]) {
      delete placedProps[propId];
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    }

    corkPopSound();
    const pData = PROPS_DATA[propId] || {};
    const pName = pData.name || (propId === 'key' ? 'Ключ' : propId);

    if (screen === 'achievements') {
      const achvBtn = document.getElementById('achvBtn');
      if (achvBtn) {
        const ar = achvBtn.getBoundingClientRect();
        particles.push({
          x: ar.left + ar.width / 2,
          y: ar.top + ar.height / 2,
          vx: 0,
          vy: -90,
          size: 16,
          alpha: 1.3,
          text: `🗝️ ${pName} перенесён в Ачивки!`,
          color: '#ffd24d'
        });
      }
    } else if (screen === 'map') {
      const mapDeskEl = document.getElementById('prop-pixelMap');
      const targetRect = mapDeskEl ? mapDeskEl.getBoundingClientRect() : null;
      if (targetRect) {
        particles.push({
          x: targetRect.left + targetRect.width / 2,
          y: targetRect.top + targetRect.height / 2,
          vx: 0,
          vy: -90,
          size: 16,
          alpha: 1.3,
          text: `🗺️ ${pName} перенесён на Карту!`,
          color: '#60a5fa'
        });
      }
    }

    renderTransferredPropsTray(screen);
    renderStorage();
  }
  window.transferPropToScreen = transferPropToScreen;

  function returnTransferredPropToDesk(screen, propId) {
    if (!propId && screen) {
      propId = screen;
      screen = 'achievements';
    }
    if (!transferredProps || !transferredProps[screen]) return;
    const idx = transferredProps[screen].indexOf(propId);
    if (idx !== -1) {
      transferredProps[screen].splice(idx, 1);
      try { Storage.setJSON(TRANSFERRED_PROPS_KEY, transferredProps); } catch (e) {}
    }

    const savedPos = (transferredProps.savedDeskPos && transferredProps.savedDeskPos[propId]) || null;
    const el = document.getElementById('prop-' + propId);
    if (el) {
      const rawLeft = savedPos && savedPos.left;
      const rawTop = savedPos && savedPos.top;
      const destLeft = rawLeft ? (typeof rawLeft === 'number' ? rawLeft + 'px' : rawLeft) : (Math.max(20, Math.min(window.innerWidth - 100, Math.round(window.innerWidth / 2 - 36))) + 'px');
      const destTop = rawTop ? (typeof rawTop === 'number' ? rawTop + 'px' : rawTop) : (Math.max(80, Math.min(window.innerHeight - 100, Math.round(window.innerHeight / 2 - 36))) + 'px');
      el.style.left = destLeft;
      el.style.top = destTop;
      el.style.display = 'block';
      el.dataset.placed = '1';
      placedProps[propId] = { placed: true, left: destLeft, top: destTop };
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}

      el.classList.add('is-wobbling');
      setTimeout(() => el.classList.remove('is-wobbling'), 600);

      const r = el.getBoundingClientRect();
      particles.push({
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        vx: 0,
        vy: -90,
        size: 16,
        alpha: 1.3,
        text: '🗝️ Ключ возвращён на стол!',
        color: '#ffd24d'
      });
    }

    corkPopSound();
    renderTransferredPropsTray(screen);
    renderStorage();
  }
  window.returnTransferredPropToDesk = returnTransferredPropToDesk;

  function renderTransferredPropsTray(screen) {
    if (screen === 'achievements') {
      const windowEl = document.getElementById('achvTransferredWindow');
      const trayEl = document.getElementById('achvTransferredTray');
      if (!trayEl) return;

      trayEl.innerHTML = '';
      const items = (transferredProps && transferredProps.achievements) ? transferredProps.achievements : [];

      if (items.length === 0) {
        if (windowEl) windowEl.style.display = 'none';
        return;
      }

      if (windowEl) windowEl.style.display = 'flex';

      items.forEach(id => {
        const slot = document.createElement('div');
        slot.className = 'transferred-prop-slot';
        slot.id = 'trayProp_achv_' + id;
        slot.setAttribute('data-prop-id', id);
        const pData = PROPS_DATA[id] || {};
        const pName = pData.name || (id === 'key' ? 'Ключ' : id);
        const iconSrc = (window.ASSETS && ASSETS.props && ASSETS.props[id]) || pData.icon || '';
        slot.title = `${pName} (Зажми ЛКМ для переноса на ачивку, вынеси за окно или ПКМ — вернуть на стол)`;
        slot.innerHTML = `
          <img src="${iconSrc}" alt="${pName}" draggable="false" referrerpolicy="no-referrer"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
          <span style="display: none; font-size: 32px;">🔑</span>
        `;
        trayEl.appendChild(slot);
        initTransferredPropDrag(slot, 'achievements', id);
      });
    } else if (screen === 'map') {
      const trayEl = document.getElementById('mapInventoryTray');
      if (!trayEl) return;

      trayEl.innerHTML = '';
      const items = (transferredProps && transferredProps.map) ? transferredProps.map : [];

      if (items.length === 0) {
        trayEl.innerHTML = '<span class="transferred-prop-empty-hint">Перенесите предметы со стола на карту</span>';
        return;
      }

      items.forEach(id => {
        const slot = document.createElement('div');
        slot.className = 'transferred-prop-slot';
        slot.id = 'trayProp_map_' + id;
        slot.setAttribute('data-prop-id', id);
        const pData = PROPS_DATA[id] || {};
        const pName = pData.name || id;
        const iconSrc = (window.ASSETS && ASSETS.props && ASSETS.props[id]) || pData.icon || '';
        slot.title = `${pName} (Вынеси за окно или ПКМ — вернуть на стол)`;
        slot.innerHTML = `
          <img src="${iconSrc}" alt="${pName}" draggable="false" referrerpolicy="no-referrer"
               onerror="this.style.display='none'; this.nextElementSibling.style.display='inline'">
          <span style="display: none; font-size: 32px;">🎒</span>
        `;
        trayEl.appendChild(slot);
        initTransferredPropDrag(slot, 'map', id);
      });
    }
  }
  window.renderTransferredPropsTray = renderTransferredPropsTray;

  function initTransferredPropDrag(slot, screen, propId) {
    let isDragging = false;
    let proxy = null;
    let lastX = 0, lastY = 0;
    let startX = 0, startY = 0;

    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      returnTransferredPropToDesk(screen, propId);
    });

    slot.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;

      const rect = slot.getBoundingClientRect();
      startX = e.clientX - rect.left;
      startY = e.clientY - rect.top;

      try { slot.setPointerCapture(e.pointerId); } catch (err) {}

      proxy = document.createElement('div');
      proxy.id = 'draggingTransferredProxy';
      proxy.className = 'transferred-prop-slot dragging-transferred-proxy';
      proxy.innerHTML = slot.innerHTML;
      proxy.style.position = 'fixed';
      proxy.style.left = `${rect.left}px`;
      proxy.style.top = `${rect.top}px`;
      proxy.style.width = '48px';
      proxy.style.height = '48px';
      proxy.style.zIndex = '1500';
      proxy.style.pointerEvents = 'none';
      proxy.style.transform = 'scale(1.15)';
      proxy.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 14px rgba(255,210,77,0.8))';
      proxy.style.transition = 'transform 0.08s ease';
      document.body.appendChild(proxy);

      slot.style.opacity = '0.3';
      e.stopPropagation();
    });

    slot.addEventListener('pointermove', (e) => {
      if (!isDragging || !proxy) return;
      const x = e.clientX - startX;
      const y = e.clientY - startY;
      proxy.style.left = `${x}px`;
      proxy.style.top = `${y}px`;

      const dx = e.clientX - lastX;
      lastX = e.clientX;
      lastY = e.clientY;
      const tilt = Math.max(-25, Math.min(25, dx * 2.2));
      proxy.style.transform = `scale(1.18) rotate(${tilt}deg)`;

      let isInside = false;

      if (screen === 'achievements') {
        document.querySelectorAll('.achv-card.key-card-hover').forEach(c => c.classList.remove('key-card-hover'));
        const targetEl = document.elementFromPoint(e.clientX, e.clientY);
        const card = targetEl ? targetEl.closest('.achv-card') : null;
        if (card && !card.classList.contains('unlocked')) {
          card.classList.add('key-card-hover');
        }

        const achvDialog = document.getElementById('achvDialog');
        const achvWindow = document.getElementById('achvTransferredWindow');
        if (achvDialog) {
          const ar = achvDialog.getBoundingClientRect();
          if (e.clientX >= ar.left && e.clientX <= ar.right && e.clientY >= ar.top && e.clientY <= ar.bottom) isInside = true;
        }
        if (achvWindow) {
          const wr = achvWindow.getBoundingClientRect();
          if (e.clientX >= wr.left && e.clientX <= wr.right && e.clientY >= wr.top && e.clientY <= wr.bottom) isInside = true;
        }
      } else if (screen === 'map') {
        const mapDialog = document.getElementById('mapModalDialog');
        const mapWindow = document.getElementById('mapInventoryWindow');
        if (mapDialog) {
          const mr = mapDialog.getBoundingClientRect();
          if (e.clientX >= mr.left && e.clientX <= mr.right && e.clientY >= mr.top && e.clientY <= mr.bottom) isInside = true;
        }
        if (mapWindow) {
          const wr = mapWindow.getBoundingClientRect();
          if (e.clientX >= wr.left && e.clientX <= wr.right && e.clientY >= wr.top && e.clientY <= wr.bottom) isInside = true;
        }
      }

      if (!isInside) {
        proxy.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 16px #4ade80)';
      } else {
        proxy.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.6)) drop-shadow(0 0 14px rgba(255,210,77,0.8))';
      }
    });

    const finishDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      try { slot.releasePointerCapture(e.pointerId); } catch (err) {}
      if (proxy) {
        proxy.remove();
        proxy = null;
      }
      slot.style.opacity = '1';

      if (screen === 'achievements') {
        const targetEl = document.elementFromPoint(e.clientX, e.clientY);
        const card = targetEl ? targetEl.closest('.achv-card') : null;
        if (card && !card.classList.contains('unlocked')) {
          card.classList.remove('key-card-hover');

          hasUnlockedWithKey = true;
          try { Storage.set(STORAGE_PREFIX + 'universal-key', '1'); } catch (err) {}
          if (typeof unlockAchievementById === 'function') {
            unlockAchievementById('universal-key');
          }

          const cr = card.getBoundingClientRect();
          for (let i = 0; i < 16; i++) {
            const ang = Math.random() * Math.PI * 2;
            const spd = 100 + Math.random() * 200;
            particles.push({
              x: cr.left + cr.width / 2,
              y: cr.top + cr.height / 2,
              vx: Math.cos(ang) * spd,
              vy: Math.sin(ang) * spd,
              size: 20 + Math.random() * 15,
              alpha: 1.2,
              text: '✨',
              color: '#ffd24d'
            });
          }
          return;
        }

        document.querySelectorAll('.achv-card.key-card-hover').forEach(c => c.classList.remove('key-card-hover'));

        const achvDialog = document.getElementById('achvDialog');
        const achvWindow = document.getElementById('achvTransferredWindow');
        let isInside = false;
        if (achvDialog) {
          const ar = achvDialog.getBoundingClientRect();
          if (e.clientX >= ar.left && e.clientX <= ar.right && e.clientY >= ar.top && e.clientY <= ar.bottom) isInside = true;
        }
        if (achvWindow) {
          const wr = achvWindow.getBoundingClientRect();
          if (e.clientX >= wr.left && e.clientX <= wr.right && e.clientY >= wr.top && e.clientY <= wr.bottom) isInside = true;
        }

        if (!isInside) {
          returnTransferredPropToDesk('achievements', propId);
        }
      } else if (screen === 'map') {
        const mapDialog = document.getElementById('mapModalDialog');
        const mapWindow = document.getElementById('mapInventoryWindow');
        let isInside = false;
        if (mapDialog) {
          const mr = mapDialog.getBoundingClientRect();
          if (e.clientX >= mr.left && e.clientX <= mr.right && e.clientY >= mr.top && e.clientY <= mr.bottom) isInside = true;
        }
        if (mapWindow) {
          const wr = mapWindow.getBoundingClientRect();
          if (e.clientX >= wr.left && e.clientX <= wr.right && e.clientY >= wr.top && e.clientY <= wr.bottom) isInside = true;
        }

        if (!isInside) {
          returnTransferredPropToDesk('map', propId);
        }
      }
    };

    slot.addEventListener('pointerup', finishDrag);
    slot.addEventListener('pointercancel', finishDrag);
  }


  /* ---------- Овощной набор, корм и диарея ---------- */
  function unpackVeggieSet() {
    const vEl = document.getElementById('prop-veggieSet');
    if (!vEl || vEl.style.display === 'none') return;

    const r = vEl.getBoundingClientRect();
    const startX = r.left;
    const startY = r.top;

    returnPropToStorage('veggieSet');
    const idx = ownedProps.indexOf('veggieSet');
    if (idx !== -1) {
      ownedProps.splice(idx, 1);
      try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
    }
    renderShopBuyTab();

    corkPopSound();
    particles.push({
      x: startX + 40,
      y: startY + 20,
      vx: 0,
      vy: -150,
      size: 24,
      alpha: 1.4,
      text: '🥗 Овощи распакованы!',
      color: '#4ade80'
    });

    const items = [
      { id: 'tomato', vx: -140, vy: -360 },
      { id: 'cucumber', vx: 10, vy: -420 },
      { id: 'lettuce', vx: 150, vy: -340 }
    ];

    const gravity = 1200; // px/s²
    const duration = 0.65; // секунды

    items.forEach((item, index) => {
      if (!ownedProps.includes(item.id)) {
        ownedProps.push(item.id);
      }
      const el = document.getElementById('prop-' + item.id);
      if (!el) return;

      el.style.display = 'block';
      el.style.left = `${startX}px`;
      el.style.top = `${startY}px`;
      el.style.zIndex = '55';
      el.classList.add('is-dragging');

      const startTime = performance.now();
      const landX = Math.max(20, Math.min(window.innerWidth - 85, startX + item.vx * duration));
      const landY = Math.max(100, Math.min(window.innerHeight - 110, startY + item.vy * duration + 0.5 * gravity * duration * duration));

      function animateArc(now) {
        const t = Math.min(duration, (now - startTime) / 1000);
        const curX = Math.max(10, Math.min(window.innerWidth - 80, startX + item.vx * t));
        const curY = Math.max(50, Math.min(window.innerHeight - 80, startY + item.vy * t + 0.5 * gravity * t * t));
        const rot = (item.vx > 0 ? 1 : -1) * (t / duration) * 360;

        el.style.left = `${Math.round(curX)}px`;
        el.style.top = `${Math.round(curY)}px`;
        el.style.transform = `scale(1.05) rotate(${rot}deg)`;

        if (t < duration) {
          requestAnimationFrame(animateArc);
        } else {
          el.classList.remove('is-dragging');
          el.style.transform = '';
          el.style.left = `${Math.round(landX)}px`;
          el.style.top = `${Math.round(landY)}px`;
          el.classList.add('is-wobbling');
          setTimeout(() => el.classList.remove('is-wobbling'), 600);

          if (!placedProps[item.id]) placedProps[item.id] = { placed: true };
          placedProps[item.id].left = el.style.left;
          placedProps[item.id].top = el.style.top;
          try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
        }
      }

      setTimeout(() => {
        requestAnimationFrame(animateArc);
      }, index * 80);
    });

    try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
    renderStorage();
  }
  window.unpackVeggieSet = unpackVeggieSet;

  function feedDuck(feedType) {
    if (feedType === 'birdFeed') {
      returnPropToStorage('birdFeed');
      const idx = ownedProps.indexOf('birdFeed');
      if (idx !== -1) ownedProps.splice(idx, 1);
      try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
      renderShopBuyTab();
      renderStorage();

      rottenEggSound();
      duckDiarrheaRemaining = 60;
      try { Storage.set(DUCK_DIARRHEA_REMAINING_KEY, '60'); } catch (e) {}
      showDiarrheaAlert();
      updateFeedBuffsUI();

      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -120,
        size: 24,
        alpha: 2.0,
        text: '🦆🤢 О нет! Птичий корм вызвал диарею!',
        color: '#f59e0b'
      });

      spawnPoop();
    } else if (feedType === 'duckFeedAlpha') {
      returnPropToStorage('duckFeedAlpha');
      const idx = ownedProps.indexOf('duckFeedAlpha');
      if (idx !== -1) ownedProps.splice(idx, 1);
      try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
      renderShopBuyTab();
      renderStorage();

      xpSound();
      corkPopSound();
      duckFeedAlphaRemaining = 30;
      try { Storage.set(DUCK_FEED_ALPHA_REMAINING_KEY, '30'); } catch (e) {}
      updateFeedBuffsUI();
      if (typeof updateAutoQuackTimer === 'function') updateAutoQuackTimer();

      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -130,
        size: 22,
        alpha: 2.0,
        text: '🥫 Альфа-кряк! Автокрякалка бьёт силой клика (30с)!',
        color: '#38bdf8'
      });
    } else if (feedType === 'duckFeedBeta') {
      returnPropToStorage('duckFeedBeta');
      const idx = ownedProps.indexOf('duckFeedBeta');
      if (idx !== -1) ownedProps.splice(idx, 1);
      try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
      renderShopBuyTab();
      renderStorage();

      xpSound();
      corkPopSound();
      duckFeedBetaRemaining = 30;
      try { Storage.set(DUCK_FEED_BETA_REMAINING_KEY, '30'); } catch (e) {}
      updateFeedBuffsUI();
      if (typeof updateAutoQuackTimer === 'function') updateAutoQuackTimer();

      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -130,
        size: 22,
        alpha: 2.0,
        text: '⚡ Бета-турбо! Скорость автокрякалки x2 (30с)!',
        color: '#facc15'
      });
    }
  }
  window.feedDuck = feedDuck;

  function spawnPoop() {
    const container = document.getElementById('poopContainer');
    if (!container) return;

    const rDuck = duck.getBoundingClientRect();
    const dCenterX = rDuck.left + rDuck.width / 2;
    const dCenterY = rDuck.top + rDuck.height / 2;

    const angle = Math.random() * Math.PI * 2;
    const dist = 75 + Math.random() * 65;
    const px = Math.max(20, Math.min(window.innerWidth - 60, dCenterX + Math.cos(angle) * dist - 23));
    const py = Math.max(70, Math.min(window.innerHeight - 80, dCenterY + Math.sin(angle) * dist - 23));

    const poopEl = document.createElement('div');
    poopEl.className = 'draggable-prop poop-prop';
    poopEl.textContent = '💩';
    poopEl.style.left = `${Math.round(px)}px`;
    poopEl.style.top = `${Math.round(py)}px`;

    const poopId = 'poop_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
    poopEl.id = poopId;
    container.appendChild(poopEl);

    const poopObj = {
      id: poopId,
      el: poopEl,
      x: px,
      y: py,
      decayRemaining: 25,
      hasStunk: false
    };
    activePoops.push(poopObj);

    splatSound();
    particles.push({
      x: px + 23,
      y: py + 10,
      vx: (Math.random() - 0.5) * 40,
      vy: -70,
      size: 16,
      alpha: 1.2,
      text: '💩 Плюх!',
      color: '#b45309'
    });

    initDraggablePoop(poopEl, poopObj);
  }
  window.spawnPoop = spawnPoop;

  function initDraggablePoop(el, poopObj) {
    let isDragging = false;
    let startX = 0, startY = 0;
    let origLeft = 0, origTop = 0;

    el.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      origLeft = el.offsetLeft;
      origTop = el.offsetTop;
      el.classList.add('is-dragging');
      try { el.setPointerCapture(e.pointerId); } catch (err) {}
    });

    el.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const nx = Math.max(10, Math.min(window.innerWidth - 60, origLeft + dx));
      const ny = Math.max(60, Math.min(window.innerHeight - 60, origTop + dy));
      el.style.left = `${nx}px`;
      el.style.top = `${ny}px`;
      poopObj.x = nx;
      poopObj.y = ny;

      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) {
        trashEl.classList.toggle('drag-target-hover', isCursorNearTrashcan(e.clientX, e.clientY, el));
      }
    });

    const endDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      el.classList.remove('is-dragging');
      try { el.releasePointerCapture(e.pointerId); } catch (err) {}

      const trashEl = document.getElementById('prop-trashcan');
      if (trashEl) trashEl.classList.remove('drag-target-hover');

      const cx = (e && typeof e.clientX === 'number' && e.clientX > 0) ? e.clientX : poopObj.x;
      const cy = (e && typeof e.clientY === 'number' && e.clientY > 0) ? e.clientY : poopObj.y;

      if (isCursorNearTrashcan(cx, cy, el)) {
        splatSound();
        particles.push({
          x: cx,
          y: cy - 20,
          vx: 0,
          vy: -100,
          size: 18,
          alpha: 1.4,
          text: '🗑️ Какашка выброшена!',
          color: '#84cc16'
        });
        if (el.parentNode) el.parentNode.removeChild(el);
        const idx = activePoops.indexOf(poopObj);
        if (idx !== -1) activePoops.splice(idx, 1);
      }
    };

    el.addEventListener('pointerup', endDrag);
    el.addEventListener('pointercancel', endDrag);
  }
  window.initDraggablePoop = initDraggablePoop;

  function updateFeedBuffsUI() {
    const alphaBadge = document.getElementById('duckAlphaBadge');
    const alphaTimer = document.getElementById('duckAlphaTimer');
    if (alphaBadge) {
      if (duckFeedAlphaRemaining > 0) {
        alphaBadge.style.display = 'flex';
        if (alphaTimer) {
          const s = Math.ceil(duckFeedAlphaRemaining);
          alphaTimer.textContent = `00:${String(s).padStart(2, '0')}`;
          alphaTimer.style.display = 'inline-block';
        }
      } else {
        alphaBadge.style.display = 'none';
      }
    }

    const betaBadge = document.getElementById('duckBetaBadge');
    const betaTimer = document.getElementById('duckBetaTimer');
    if (betaBadge) {
      if (duckFeedBetaRemaining > 0) {
        betaBadge.style.display = 'flex';
        if (betaTimer) {
          const s = Math.ceil(duckFeedBetaRemaining);
          betaTimer.textContent = `00:${String(s).padStart(2, '0')}`;
          betaTimer.style.display = 'inline-block';
        }
      } else {
        betaBadge.style.display = 'none';
      }
    }

    const saladBadge = document.getElementById('duckSaladBadge');
    const saladTimer = document.getElementById('duckSaladTimer');
    if (saladBadge) {
      if (typeof saladBuffRemaining === 'number' && saladBuffRemaining > 0) {
        saladBadge.style.display = 'flex';
        if (saladTimer) {
          const m = Math.floor(saladBuffRemaining / 60);
          const s = Math.ceil(saladBuffRemaining % 60);
          saladTimer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          saladTimer.style.display = 'inline-block';
        }
      } else {
        saladBadge.style.display = 'none';
      }
    }

    const diaBadge = document.getElementById('duckDiarrheaBadge');
    const diaTimer = document.getElementById('duckDiarrheaTimer');
    if (diaBadge) {
      if (duckDiarrheaRemaining > 0) {
        diaBadge.style.display = 'flex';
        if (diaTimer) {
          const m = Math.floor(duckDiarrheaRemaining / 60);
          const s = Math.ceil(duckDiarrheaRemaining % 60);
          diaTimer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
          diaTimer.style.display = 'inline-block';
        }
      } else {
        diaBadge.style.display = 'none';
      }
    }
  }
  window.updateFeedBuffsUI = updateFeedBuffsUI;

  let diarrheaAlertTimeout = null;
  function showDiarrheaAlert() {
    const alertEl = document.getElementById('diarrheaAlert');
    if (!alertEl) return;
    const hintEl = document.getElementById('gameHintAlert');
    if (hintEl) hintEl.style.display = 'none';
    alertEl.style.display = 'flex';
    if (diarrheaAlertTimeout) clearTimeout(diarrheaAlertTimeout);
    diarrheaAlertTimeout = setTimeout(() => {
      alertEl.style.display = 'none';
    }, 12000);
  }
  window.showDiarrheaAlert = showDiarrheaAlert;


  /* ---------- Разделочная доска и приготовление салата ---------- */
  function renderCuttingBoardIngredients() {
    const cbEl = document.getElementById('prop-cuttingBoard');
    if (!cbEl) return;
    const tom = document.getElementById('boardVegTomato');
    const cuc = document.getElementById('boardVegCucumber');
    const letEl = document.getElementById('boardVegLettuce');

    if (tom) tom.style.display = (boardIngredients && boardIngredients.tomato) ? 'inline-block' : 'none';
    if (cuc) cuc.style.display = (boardIngredients && boardIngredients.cucumber) ? 'inline-block' : 'none';
    if (letEl) letEl.style.display = (boardIngredients && boardIngredients.lettuce) ? 'inline-block' : 'none';

    const isFull = boardIngredients && boardIngredients.tomato && boardIngredients.cucumber && boardIngredients.lettuce;
    cbEl.classList.toggle('board-is-ready', Boolean(isFull));
  }
  window.renderCuttingBoardIngredients = renderCuttingBoardIngredients;

  function addVeggieToBoard(vegId) {
    if (!boardIngredients) {
      boardIngredients = { tomato: false, cucumber: false, lettuce: false };
    }
    if (boardIngredients[vegId]) {
      // Этот овощ уже на доске
      corkPopSound();
      if (typeof showGameHintAlert === 'function') {
        showGameHintAlert('Разделочная доска', 'Этот овощ уже выложен на разделочную доску!', '⚠️');
      }
      returnPropToStorage(vegId);
      return;
    }

    boardIngredients[vegId] = true;
    try { Storage.setJSON(CUTTING_BOARD_INGREDIENTS_KEY, boardIngredients); } catch (e) {}

    // Убираем овощ со стола и из хранилища
    returnPropToStorage(vegId);
    const idx = ownedProps.indexOf(vegId);
    if (idx !== -1) ownedProps.splice(idx, 1);
    try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}

    renderCuttingBoardIngredients();
    renderStorage();

    const vegNames = { tomato: '🍅 Помидор', cucumber: '🥒 Огурец', lettuce: '🥬 Лист салата' };
    const placedCount = (boardIngredients.tomato ? 1 : 0) + (boardIngredients.cucumber ? 1 : 0) + (boardIngredients.lettuce ? 1 : 0);

    splatSound();
    if (placedCount === 3) {
      xpSound();
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 40,
        vx: 0,
        vy: -140,
        size: 22,
        alpha: 1.8,
        text: '✨ Доска заполнена (3/3)! Нарежьте овощи ножом 🔪!',
        color: '#4ade80'
      });
    } else {
      corkPopSound();
      particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2 - 30,
        vx: 0,
        vy: -110,
        size: 18,
        alpha: 1.4,
        text: `${vegNames[vegId] || 'Овощ'} на доске (${placedCount}/3)`,
        color: '#a3e635'
      });
    }
  }
  window.addVeggieToBoard = addVeggieToBoard;

  function chopSaladOnBoard(startLeft, startTop) {
    const knifeEl = document.getElementById('prop-knife');
    const isFull = boardIngredients && boardIngredients.tomato && boardIngredients.cucumber && boardIngredients.lettuce;

    if (!isFull) {
      if (knifeEl) returnItemToOrigin(knifeEl, startLeft, startTop, 'knife');
      corkPopSound();
      const placedCount = (boardIngredients.tomato ? 1 : 0) + (boardIngredients.cucumber ? 1 : 0) + (boardIngredients.lettuce ? 1 : 0);
      if (typeof showGameHintAlert === 'function') {
        const boardIcon = (typeof PROPS_DATA !== 'undefined' && PROPS_DATA.cuttingBoard && PROPS_DATA.cuttingBoard.icon)
          ? PROPS_DATA.cuttingBoard.icon
          : '🥗';
        showGameHintAlert(
          'Разделочная доска',
          `Сначала заполните доску всеми овощами (${placedCount}/3: 🍅 Помидор, 🥒 Огурец, 🥬 Лист салата)!`,
          boardIcon
        );
      }
      return;
    }

    // Доска заполнена: шинкуем салат!
    knifeStabSound();
    setTimeout(() => knifeStabSound(), 120);
    setTimeout(() => knifeStabSound(), 240);

    // Доска остается на столе, овощи пропадают
    boardIngredients = { tomato: false, cucumber: false, lettuce: false };
    try { Storage.setJSON(CUTTING_BOARD_INGREDIENTS_KEY, boardIngredients); } catch (e) {}
    renderCuttingBoardIngredients();

    if (knifeEl) returnItemToOrigin(knifeEl, startLeft, startTop, 'knife');

    // Получаем позицию разделочной доски для спавна тарелки салата рядом
    const cbEl = document.getElementById('prop-cuttingBoard');
    const cbr = cbEl ? cbEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 85, height: 85 };
    const plateX = Math.max(20, Math.min(window.innerWidth - 90, cbr.right + 12));
    const plateY = Math.max(70, Math.min(window.innerHeight - 90, cbr.top));

    // Спавним тарелку салата
    if (!ownedProps.includes('saladPlate')) {
      ownedProps.push('saladPlate');
      try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}
    }

    const plateEl = document.getElementById('prop-saladPlate');
    if (plateEl) {
      plateEl.style.display = 'block';
      plateEl.style.left = `${Math.round(plateX)}px`;
      plateEl.style.top = `${Math.round(plateY)}px`;
      plateEl.classList.add('is-wobbling');
      setTimeout(() => plateEl.classList.remove('is-wobbling'), 600);

      if (!placedProps.saladPlate) placedProps.saladPlate = { placed: true };
      placedProps.saladPlate.left = plateEl.style.left;
      placedProps.saladPlate.top = plateEl.style.top;
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
    }

    xpSound();
    particles.push({
      x: plateX + 40,
      y: plateY - 20,
      vx: 0,
      vy: -150,
      size: 24,
      alpha: 2.0,
      text: '🥗 Тарелка салата готова! Скормите утке!',
      color: '#4ade80'
    });

    renderStorage();
  }
  window.chopSaladOnBoard = chopSaladOnBoard;

  function eatSalad() {
    returnPropToStorage('saladPlate');
    const idx = ownedProps.indexOf('saladPlate');
    if (idx !== -1) ownedProps.splice(idx, 1);
    try { Storage.setJSON(OWNED_PROPS_KEY, ownedProps); } catch (e) {}

    quack();
    xpSound();

    saladBuffRemaining = Math.min(300, (saladBuffRemaining || 0) + 60);
    try { Storage.set(SALAD_BUFF_REMAINING_KEY, String(saladBuffRemaining)); } catch (e) {}
    updateFeedBuffsUI();

    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 30,
      vx: 0,
      vy: -130,
      size: 24,
      alpha: 2.2,
      text: '🥗 Хрум! Салат съеден! Бонус +20% к силе нажатий!',
      color: '#22c55e'
    });

    renderStorage();
  }
  window.eatSalad = eatSalad;

  /* ==========================================================================
     Садоводство, Цветочный горшок, Пчела и Мёд
     ========================================================================== */

  function updateHoneyDeskProp() {
    const honeyEl = document.getElementById('prop-honey');
    const badgeEl = document.getElementById('honeyCountBadge');
    if (!honeyEl) return;

    if (honeyCount > 0) {
      let curLeft = (placedProps['honey'] && placedProps['honey'].left) || honeyEl.style.left;
      let curTop = (placedProps['honey'] && placedProps['honey'].top) || honeyEl.style.top;

      const numLeft = parseFloat(curLeft);
      const numTop = parseFloat(curTop);

      // Если координаты отсутствуют, некорректны или за границами экрана — вычисляем рядом с горшком
      if (isNaN(numLeft) || isNaN(numTop) || numLeft < 0 || numLeft > window.innerWidth - 30 || numTop < 0 || numTop > window.innerHeight - 30) {
        const potEl = document.getElementById('prop-pot');
        const potRect = (potEl && potEl.offsetWidth > 0) ? potEl.getBoundingClientRect() : null;
        const pL = (potRect && potRect.left > 0) ? potRect.left : (parseFloat(potEl?.style.left) || (window.innerWidth / 2));
        const pT = (potRect && potRect.top > 0) ? potRect.top : (parseFloat(potEl?.style.top) || (window.innerHeight / 2));
        let targetL = pL + 95;
        if (targetL + 75 > window.innerWidth) {
          targetL = Math.max(20, pL - 75);
        }
        const targetT = Math.min(window.innerHeight - 90, pT + 12);
        curLeft = `${Math.round(targetL)}px`;
        curTop = `${Math.round(targetT)}px`;
      }

      honeyEl.style.left = curLeft;
      honeyEl.style.top = curTop;
      honeyEl.style.display = 'block';

      placedProps['honey'] = { placed: true, left: curLeft, top: curTop };
      try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}

      if (badgeEl) {
        badgeEl.style.display = honeyCount > 1 ? 'block' : 'none';
        badgeEl.textContent = String(honeyCount);
      }
    } else {
      honeyEl.style.display = 'none';
      if (badgeEl) badgeEl.style.display = 'none';
      if (placedProps['honey']) {
        delete placedProps['honey'];
        try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
      }
    }
  }
  window.updateHoneyDeskProp = updateHoneyDeskProp;

  function sellHoney(amount) {
    if (honeyCount <= 0) return;
    const qty = (amount === 'all') ? honeyCount : Math.min(amount, honeyCount);
    if (qty <= 0) return;

    honeyCount -= qty;
    try { Storage.set(HONEY_COUNT_KEY, String(honeyCount)); } catch (e) {}

    const earned = qty * 2500;
    earnDuckles(earned);

    corkPopSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 20,
      vx: 0,
      vy: -100,
      size: 20,
      alpha: 1.5,
      text: `+${earned.toLocaleString('ru-RU')} 🦆 (🍯 x${qty})`,
      color: '#fbbf24'
    });

    updateHoneyDeskProp();
    updateShopSellTab();
    updateShopTabsVisibility();
  }
  window.sellHoney = sellHoney;

  function animateBeeFlyIn(beeEl, potEl) {
    if (!beeEl || !potEl) return;
    const potRect = potEl.getBoundingClientRect();
    const fromRight = (potRect.left < window.innerWidth / 2);
    const startX = fromRight ? (window.innerWidth + 120) : -120;
    const startY = -80 - Math.random() * 80;
    const restX = potRect.left + (potRect.width || 80) - 16;
    const restY = potRect.top - 24;

    const dx = startX - restX;
    const dy = startY - restY;

    beeEl.style.setProperty('--fly-from-x', `${Math.round(dx)}px`);
    beeEl.style.setProperty('--fly-from-y', `${Math.round(dy)}px`);
    beeEl.classList.remove('is-flying-away');
    beeEl.classList.add('is-flying-in');
    beeEl.style.display = 'block';

    if (typeof startBeeBuzz === 'function') startBeeBuzz();

    setTimeout(() => {
      if (beeEl.classList.contains('is-flying-in')) {
        beeEl.classList.remove('is-flying-in');
      }
    }, 1800);
  }
  window.animateBeeFlyIn = animateBeeFlyIn;

  function updatePotUI() {
    const potImg = document.getElementById('potImg');
    const badgeEl = document.getElementById('potActionBadge');
    const timerBadge = document.getElementById('potTimerBadge');
    const beeEl = document.getElementById('flowerBee');
    const potEl = document.getElementById('prop-pot');

    if (!potImg) return;

    if (potState === 'empty') {
      potImg.src = ASSETS.props.potEmpty;
      if (badgeEl) { badgeEl.textContent = '🪴'; badgeEl.title = 'Пустой горшок. Добавьте землю!'; }
      if (timerBadge) timerBadge.style.display = 'none';
      if (beeEl) beeEl.style.display = 'none';
      stopBeeBuzz();
    } else if (potState === 'dirt') {
      potImg.src = ASSETS.props.potDirt;
      if (badgeEl) { badgeEl.textContent = '🌱'; badgeEl.title = 'Горшок с землёй. Посадите семена цветов!'; }
      if (timerBadge) timerBadge.style.display = 'none';
      if (beeEl) beeEl.style.display = 'none';
      stopBeeBuzz();
    } else if (potState === 'planted') {
      potImg.src = ASSETS.props.potDirt;
      if (badgeEl) { badgeEl.textContent = '⏳'; badgeEl.title = 'Цветы растут...'; }
      if (timerBadge) {
        timerBadge.style.display = 'block';
        const mins = Math.floor(potGrowRemaining / 60);
        const secs = Math.floor(potGrowRemaining % 60);
        timerBadge.textContent = `🌱 ${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }
      if (beeEl) beeEl.style.display = 'none';
      stopBeeBuzz();
    } else if (potState === 'bloomed') {
      potImg.src = ASSETS.props.potFlower;
      if (badgeEl) { badgeEl.textContent = '🌸'; badgeEl.title = 'Цветущий цветок'; }
      if (timerBadge) timerBadge.style.display = 'none';

      const isPotOnDesk = potEl && potEl.style.display !== 'none';
      if (beeActive && isPotOnDesk) {
        if (beeEl) {
          if (beeEl.style.display === 'none' && !beeEl.classList.contains('is-flying-away')) {
            animateBeeFlyIn(beeEl, potEl);
          } else if (!beeEl.classList.contains('is-flying-away')) {
            beeEl.style.display = 'block';
            if (typeof startBeeBuzz === 'function') startBeeBuzz();
          }
        }
      } else {
        if (beeEl && !beeEl.classList.contains('is-flying-away')) {
          beeEl.style.display = 'none';
          if (typeof stopBeeBuzz === 'function') stopBeeBuzz();
        }
      }
    }
    updateHoneyDeskProp();
    if (typeof renderStorage === 'function') renderStorage();
  }
  window.updatePotUI = updatePotUI;

  function applyDirtToPot(startLeft, startTop) {
    if (potState !== 'empty') {
      corkPopSound();
      if (typeof showGameHintAlert === 'function') {
        showGameHintAlert('Цветочный горшок', 'В горшке уже есть земля!', '🪴');
      }
      return;
    }

    potState = 'dirt';
    try { Storage.set(POT_STATE_KEY, 'dirt'); } catch (e) {}

    returnPropToStorage('dirtBag');
    const idx = ownedProps.indexOf('dirtBag');
    if (idx !== -1) ownedProps.splice(idx, 1);
    delete placedProps['dirtBag'];
    try {
      Storage.setJSON(OWNED_PROPS_KEY, ownedProps);
      Storage.setJSON(PLACED_PROPS_KEY, placedProps);
    } catch (e) {}

    corkPopSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 20,
      vx: 0,
      vy: -90,
      size: 18,
      alpha: 1.5,
      text: '🌱 Земля насыпана! Теперь посадите семена цветов 🌸',
      color: '#4ade80'
    });

    renderStorage();
    renderShopBuyTab();
    updatePotUI();
  }
  window.applyDirtToPot = applyDirtToPot;

  function applySeedsToPot(startLeft, startTop) {
    if (potState === 'empty') {
      corkPopSound();
      if (typeof showGameHintAlert === 'function') {
        showGameHintAlert('Цветочный горшок', 'Сначала насыпьте в горшок землю!', '🪴');
      }
      return;
    }
    if (potState === 'planted' || potState === 'bloomed') {
      corkPopSound();
      if (typeof showGameHintAlert === 'function') {
        showGameHintAlert('Цветочный горшок', 'В горшке уже посажены цветы!', '🌸');
      }
      return;
    }

    potState = 'planted';
    potGrowRemaining = 300; // 5 minutes = 300 sec
    try {
      Storage.set(POT_STATE_KEY, 'planted');
      Storage.set(POT_GROW_REMAINING_KEY, '300');
    } catch (e) {}

    returnPropToStorage('flowerSeeds');
    const idx = ownedProps.indexOf('flowerSeeds');
    if (idx !== -1) ownedProps.splice(idx, 1);
    delete placedProps['flowerSeeds'];
    try {
      Storage.setJSON(OWNED_PROPS_KEY, ownedProps);
      Storage.setJSON(PLACED_PROPS_KEY, placedProps);
    } catch (e) {}

    xpSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 20,
      vx: 0,
      vy: -95,
      size: 18,
      alpha: 1.6,
      text: '🌸 Семена посажены! Цветы вырастут через 5 минут',
      color: '#f472b6'
    });

    renderStorage();
    renderShopBuyTab();
    updatePotUI();
  }
  window.applySeedsToPot = applySeedsToPot;

  function bloomPotFlower() {
    potState = 'bloomed';
    potGrowRemaining = 0;
    try {
      Storage.set(POT_STATE_KEY, 'bloomed');
      Storage.set(POT_GROW_REMAINING_KEY, '0');
    } catch (e) {}

    beeTimer = Math.floor(300 + Math.random() * 300);
    beeActive = false;
    try {
      Storage.set(BEE_TIMER_KEY, String(beeTimer));
      Storage.set(BEE_ACTIVE_KEY, '0');
    } catch (e) {}

    xpSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 30,
      vx: 0,
      vy: -110,
      size: 22,
      alpha: 1.8,
      text: '🌸 Цветы расцвели в горшке! Скоро прилетит пчёлка 🐝',
      color: '#fb7185'
    });

    updatePotUI();
  }
  window.bloomPotFlower = bloomPotFlower;

  function tickPlantGrowth(deltaSec) {
    if (potState === 'planted') {
      potGrowRemaining = Math.max(0, potGrowRemaining - deltaSec);
      try { Storage.set(POT_GROW_REMAINING_KEY, String(potGrowRemaining)); } catch (e) {}
      if (potGrowRemaining <= 0) {
        bloomPotFlower();
      } else {
        updatePotUI();
      }
    } else if (potState === 'bloomed') {
      const potEl = document.getElementById('prop-pot');
      const isPotOnDesk = potEl && potEl.style.display !== 'none';
      if (isPotOnDesk && !beeActive) {
        beeTimer = Math.max(0, beeTimer - deltaSec);
        try { Storage.set(BEE_TIMER_KEY, String(beeTimer)); } catch (e) {}
        if (beeTimer <= 0) {
          spawnBee();
        }
      }
    }
  }
  window.tickPlantGrowth = tickPlantGrowth;

  function spawnBee() {
    beeActive = true;
    beeTimer = 0;
    try {
      Storage.set(BEE_ACTIVE_KEY, '1');
      Storage.set(BEE_TIMER_KEY, '0');
    } catch (e) {}

    const beeEl = document.getElementById('flowerBee');
    const potEl = document.getElementById('prop-pot');
    if (beeEl && potEl && potEl.style.display !== 'none' && potState === 'bloomed') {
      animateBeeFlyIn(beeEl, potEl);
    } else {
      updatePotUI();
    }

    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 25,
      vx: 0,
      vy: -80,
      size: 19,
      alpha: 1.6,
      text: '🐝 Прилетела пчёлка! Нажмите на неё, чтобы собрать мёд!',
      color: '#facc15'
    });
  }
  window.spawnBee = spawnBee;

  function clickBee() {
    if (!beeActive) return;
    beeActive = false;
    try { Storage.set(BEE_ACTIVE_KEY, '0'); } catch (e) {}

    const beeEl = document.getElementById('flowerBee');
    const potEl = document.getElementById('prop-pot');

    if (beeEl && potEl) {
      const potRect = potEl.getBoundingClientRect();
      const restX = potRect.left + (potRect.width || 80) - 16;
      const restY = potRect.top - 24;

      // Улетаем за пределы экрана
      const toRight = (potRect.left < window.innerWidth / 2);
      const targetX = toRight ? (window.innerWidth + 140) : -140;
      const targetY = -140 - Math.random() * 80;

      const outX = targetX - restX;
      const outY = targetY - restY;

      beeEl.style.setProperty('--fly-out-x', `${Math.round(outX)}px`);
      beeEl.style.setProperty('--fly-out-y', `${Math.round(outY)}px`);
      beeEl.classList.remove('is-flying-in');
      beeEl.classList.add('is-flying-away');

      // Жужжание плавно затихает по мере удаления пчелы за пределы экрана
      if (typeof stopBeeBuzz === 'function') stopBeeBuzz(1.3);

      setTimeout(() => {
        beeEl.classList.remove('is-flying-away');
        beeEl.style.display = 'none';
      }, 1400);
    } else {
      if (typeof stopBeeBuzz === 'function') stopBeeBuzz();
    }

    beeTimer = Math.floor(300 + Math.random() * 300);
    try { Storage.set(BEE_TIMER_KEY, String(beeTimer)); } catch (e) {}

    honeyCount++;
    try { Storage.set(HONEY_COUNT_KEY, String(honeyCount)); } catch (e) {}

    corkPopSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 20,
      vx: 0,
      vy: -100,
      size: 20,
      alpha: 1.6,
      text: '🍯 Пчёлка оставила баночку мёда (+2 500 🦆 при продаже)!',
      color: '#f59e0b'
    });

    const honeyEl = document.getElementById('prop-honey');
    if (potEl && honeyEl) {
      const curL = parseFloat(potEl.style.left) || (window.innerWidth / 2);
      const curT = parseFloat(potEl.style.top) || (window.innerHeight / 2);
      let targetL = curL + 95;
      if (targetL + 75 > window.innerWidth) {
        targetL = curL - 75;
      }
      const targetT = curT + 12;

      if (!placedProps['honey'] || !placedProps['honey'].placed) {
        honeyEl.style.left = `${targetL}px`;
        honeyEl.style.top = `${targetT}px`;
        placedProps['honey'] = { placed: true, left: `${targetL}px`, top: `${targetT}px` };
        try { Storage.setJSON(PLACED_PROPS_KEY, placedProps); } catch (e) {}
      }

      // Выпадение меда с анимацией
      honeyEl.style.display = 'block';
      honeyEl.classList.remove('is-dropping');
      void honeyEl.offsetWidth; // force DOM reflow
      honeyEl.classList.add('is-dropping');
      setTimeout(() => {
        honeyEl.classList.remove('is-dropping');
      }, 850);

      // Искрящиеся частицы вокруг выпадающей банки меда
      for (let i = 0; i < 6; i++) {
        const ang = (Math.PI * 2 / 6) * i + Math.random() * 0.3;
        const spd = 50 + Math.random() * 50;
        particles.push({
          x: targetL + 34,
          y: targetT + 34,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 40,
          size: 14 + Math.random() * 6,
          alpha: 1.4,
          text: i % 2 === 0 ? '✨' : '🍯',
          color: '#f59e0b'
        });
      }
    }

    updateHoneyDeskProp();
    updatePotUI();
    updateShopSellTab();
    updateShopTabsVisibility();
  }
  window.clickBee = clickBee;
