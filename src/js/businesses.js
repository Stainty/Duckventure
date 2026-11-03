/* ---------- Механика филиалов бизнеса ---------- */
  function saveBusinessesState() {
    try { Storage.setJSON(BUSINESSES_STATE_KEY, businessesState); } catch (e) {}
  }
  window.saveBusinessesState = saveBusinessesState;

  function updateBranchesButtonUI() {
    const btn = document.getElementById('branchesBtn');
    const badge = document.getElementById('branchesAlertBadge');
    if (!btn) return;
    const canBusiness = upgradeLevels.features >= 5;
    btn.style.display = canBusiness ? 'inline-flex' : 'none';
    let hasAttention = false;
    Object.keys(businessesState).forEach(id => {
      if (businessesState[id]?.status === 'attention') hasAttention = true;
    });
    btn.classList.toggle('has-attention', hasAttention);
    if (badge) badge.style.display = hasAttention ? 'inline-block' : 'none';
  }
  window.updateBranchesButtonUI = updateBranchesButtonUI;

  function renderBranchesModal() {
    const list = document.getElementById('branchesList');
    const bBal = document.getElementById('branchesDucklesVal');
    if (bBal) bBal.textContent = duckles.toLocaleString('ru-RU');
    if (!list) return;

    const clockOn = isClockOnTable();
    let html = '';
    Object.values(BUSINESSES_DATA).forEach(b => {
      const state = businessesState[b.id];
      const isOwned = Boolean(state);
      const status = state ? state.status : 'not_owned';

      let actionHtml = '';
      if (!isOwned) {
        actionHtml = `<button class="business-btn business-buy-btn" onclick="buyBusiness('${b.id}')" ${duckles < b.cost ? 'disabled' : ''}>🏢 Купить бизнес (${b.cost.toLocaleString('ru-RU')} 🦆)</button>`;
      } else if (status === 'working') {
        const rem = state.remaining ?? b.workDuration;
        const mins = Math.floor(rem / 60);
        const secs = rem % 60;
        const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        const timeDisplay = clockOn ? timeFormatted : '⏳ (нужны часы)';
        const pct = Math.min(100, Math.max(0, Math.round((1 - rem / b.workDuration) * 100)));
        actionHtml = `
          <div class="business-status-box">
            <div class="business-status-text">⚙️ В работе: <b style="color: #67e8f9;">${timeDisplay}</b></div>
            <div class="business-progress-bg"><div class="business-progress-fill" style="width: ${pct}%;"></div></div>
          </div>
          <button class="business-btn business-work-btn" disabled>⚙️ В процессе</button>
        `;
      } else if (status === 'attention') {
        const rem = state.attentionRemaining ?? b.attentionDuration;
        const timeDisplay = clockOn ? `⏱️ ${rem} сек.` : '⚠️ Срочно! (< 1 мин)';
        const pct = Math.min(100, Math.max(0, Math.round((rem / b.attentionDuration) * 100)));
        actionHtml = `
          <div class="business-status-box">
            <div class="business-status-text attention">🚨 ТРЕБУЕТ ВНИМАНИЯ! <b style="color: #facc15;">${timeDisplay}</b></div>
            <div class="business-progress-bg"><div class="business-progress-fill attention" style="width: ${pct}%;"></div></div>
          </div>
          <button class="business-btn business-attention-btn" onclick="payBusinessAttention('${b.id}')">🎯 Уделить внимание (+${b.income.toLocaleString('ru-RU')} 🦆)</button>
        `;
      }

      html += `
        <div class="business-card ${isOwned ? 'owned' : ''} ${status === 'attention' ? 'requires-attention' : ''}" id="businessCard-${b.id}">
          <div class="business-card-header">
            <div class="business-card-icon">${b.icon}</div>
            <div class="business-card-info">
              <div class="business-card-title">${b.name}</div>
              <div class="business-card-desc">${b.desc}</div>
            </div>
          </div>
          <div class="business-card-stats">
            <div class="business-stat">
              <span class="business-stat-lbl">Стоимость:</span>
              <span class="business-stat-val cost">${b.cost.toLocaleString('ru-RU')} 🦆</span>
            </div>
            <div class="business-stat">
              <span class="business-stat-lbl">Доход:</span>
              <span class="business-stat-val income">+${b.income.toLocaleString('ru-RU')} 🦆</span>
            </div>
            <div class="business-stat">
              <span class="business-stat-lbl">Штраф:</span>
              <span class="business-stat-val penalty">-${b.penalty.toLocaleString('ru-RU')} 🦆</span>
            </div>
          </div>
          <div class="business-card-action-row">
            ${actionHtml}
          </div>
        </div>
      `;
    });
    list.innerHTML = html;
  }
  window.renderBranchesModal = renderBranchesModal;

  function buyBusiness(id) {
    const b = BUSINESSES_DATA[id];
    if (!b || businessesState[id]) return;
    if (!spendDuckles(b.cost)) return;
    corkPopSound();
    businessesState[id] = {
      status: 'working',
      remaining: b.workDuration,
      attentionRemaining: b.attentionDuration
    };
    saveBusinessesState();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 40,
      vx: 0,
      vy: -140,
      size: 22,
      alpha: 1.4,
      text: `🏢 Бизнес куплен: ${b.name}!`,
      color: '#38bdf8'
    });
    renderBranchesModal();
    updateBranchesButtonUI();
  }
  window.buyBusiness = buyBusiness;

  function payBusinessAttention(id) {
    const b = BUSINESSES_DATA[id];
    const state = businessesState[id];
    if (!b || !state || state.status !== 'attention') return;
    earnDuckles(b.income, false, true);
    xpSound();
    particles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2 - 40,
      vx: 0,
      vy: -140,
      size: 24,
      alpha: 1.5,
      text: `💰 Доход от бизнеса (${b.name}): +${b.income.toLocaleString('ru-RU')} 🦆!`,
      color: '#4ade80'
    });
    state.status = 'working';
    state.remaining = b.workDuration;
    state.attentionRemaining = b.attentionDuration;
    saveBusinessesState();
    renderBranchesModal();
    updateBranchesButtonUI();
  }
  window.payBusinessAttention = payBusinessAttention;

  function tickBusinesses(deltaSec = 1) {
    if (deltaSec <= 0) return;
    let changed = false;
    let totalPenalties = 0;
    let anyAttentionTriggered = false;

    Object.keys(businessesState).forEach(id => {
      const b = BUSINESSES_DATA[id];
      const state = businessesState[id];
      if (!b || !state) return;

      let remSec = deltaSec;
      let branchPenalties = 0;

      while (remSec > 0) {
        if (state.status === 'working') {
          const needed = (state.remaining !== undefined && state.remaining !== null) ? state.remaining : b.workDuration;
          if (remSec < needed) {
            state.remaining = needed - remSec;
            remSec = 0;
            changed = true;
          } else {
            remSec -= needed;
            state.status = 'attention';
            state.attentionRemaining = b.attentionDuration;
            state.remaining = 0;
            changed = true;
            anyAttentionTriggered = true;
          }
        } else if (state.status === 'attention') {
          const needed = (state.attentionRemaining !== undefined && state.attentionRemaining !== null) ? state.attentionRemaining : b.attentionDuration;
          if (remSec < needed) {
            state.attentionRemaining = needed - remSec;
            remSec = 0;
            changed = true;
          } else {
            remSec -= needed;
            branchPenalties++;
            // Пропуск внимания в течение 1 минуты -> штраф и перезапуск рабочего цикла
            state.status = 'working';
            state.remaining = b.workDuration;
            state.attentionRemaining = b.attentionDuration;
            changed = true;
          }
        } else {
          break;
        }
      }

      if (branchPenalties > 0) {
        const totalBranchPenalty = b.penalty * branchPenalties;
        penalizeDuckles(totalBranchPenalty);
        totalPenalties += totalBranchPenalty;

        particles.push({
          x: window.innerWidth / 2,
          y: 90,
          vx: 0,
          vy: -80,
          size: 20,
          alpha: 1.6,
          text: (branchPenalties === 1)
            ? `⚠️ Штраф за простой (${b.name}): -${b.penalty.toLocaleString('ru-RU')} 🦆! Доход упущен.`
            : `⚠️ Штраф за простой x${branchPenalties} (${b.name}): -${totalBranchPenalty.toLocaleString('ru-RU')} 🦆!`,
          color: '#ef4444'
        });
      }
    });

    if (totalPenalties > 0) {
      rottenEggSound();
    }

    if (anyAttentionTriggered) {
      corkPopSound();
      particles.push({
        x: window.innerWidth / 2,
        y: 80,
        vx: 0,
        vy: -80,
        size: 20,
        alpha: 1.6,
        text: `🚨 Филиал требует внимания в Филиалах!`,
        color: '#facc15'
      });
    }

    if (changed) {
      saveBusinessesState();
      const modal = document.getElementById('branchesModal');
      if (modal && modal.classList.contains('open')) {
        renderBranchesModal();
      }
      updateBranchesButtonUI();
    }
  }
  window.tickBusinesses = tickBusinesses;

  function showEggContextMenu(eggType, x, y) {
    if (!propContextMenu) return;
    activeContextEggType = eggType;
    activeContextPropId = null;
    resetAllContextMenuButtons();

    const propCtxDiscardBtn = document.getElementById('propCtxDiscardBtn');
    const propCtxSell1Btn = document.getElementById('propCtxSell1Btn');
    const propCtxSellAllBtn = document.getElementById('propCtxSellAllBtn');

    if (eggType === 'rotten') {
      if (propCtxDiscardBtn) propCtxDiscardBtn.style.display = 'flex';

      propContextMenu.style.display = 'block';
      const menuW = 210;
      const menuH = 46;
      const posX = Math.max(10, Math.min(window.innerWidth - menuW - 10, x));
      const posY = Math.max(10, Math.min(window.innerHeight - menuH - 10, y));

      propContextMenu.style.left = `${posX}px`;
      propContextMenu.style.top = `${posY}px`;
      return;
    }

    if (propCtxDiscardBtn) propCtxDiscardBtn.style.display = 'none';

    let count = 0;
    let price = 0;
    if (eggType === 'normal') { count = normalEggs; price = 200; }
    else if (eggType === 'golden') { count = goldenEggs; price = 5000; }
    else if (eggType === 'fried') { count = friedEggs; price = 1600; }
    else if (eggType === 'goldenFried') { count = goldenFriedEggs; price = 15000; }
    else if (eggType === 'roastedGoose') { count = (typeof normalRoastedGeese !== 'undefined' ? normalRoastedGeese : 0); price = 180000; }
    else if (eggType === 'goldenRoastedGoose') { count = (typeof goldenRoastedGeese !== 'undefined' ? goldenRoastedGeese : 0); price = 650000; }

    if (count <= 0) return;

    if (propCtxSell1Btn) {
      propCtxSell1Btn.style.display = 'flex';
      propCtxSell1Btn.innerHTML = `<span class="prop-ctx-icon">💰</span> Продать 1 (+${price.toLocaleString('ru-RU')} 🦆)`;
    }
    if (propCtxSellAllBtn) {
      if (count > 1) {
        propCtxSellAllBtn.style.display = 'flex';
        propCtxSellAllBtn.innerHTML = `<span class="prop-ctx-icon">✨</span> Продать всё (+${(count * price).toLocaleString('ru-RU')} 🦆)`;
      } else {
        propCtxSellAllBtn.style.display = 'none';
      }
    }

    propContextMenu.style.display = 'block';

    const menuW = 210;
    const menuH = (count > 1) ? 85 : 46;
    const posX = Math.max(10, Math.min(window.innerWidth - menuW - 10, x));
    const posY = Math.max(10, Math.min(window.innerHeight - menuH - 10, y));

    propContextMenu.style.left = `${posX}px`;
    propContextMenu.style.top = `${posY}px`;
  }
  window.showEggContextMenu = showEggContextMenu;
