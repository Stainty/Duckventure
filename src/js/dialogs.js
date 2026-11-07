/* ==========================================================================
   Character Dialog System (Система диалоговых окон с персонажами)
   ========================================================================== */

(function() {
  'use strict';

  let activeDialogConfig = null;
  let dialogCloseTimeout = null;

  /**
   * Открывает диалоговое окно персонажа
   * @param {Object} config
   */
  function showCharacterDialog(config) {
    if (!config) return;
    activeDialogConfig = config;

    const modal = document.getElementById('characterDialogModal');
    if (!modal) return;

    if (dialogCloseTimeout) {
      clearTimeout(dialogCloseTimeout);
      dialogCloseTimeout = null;
    }

    // Ставим игру на паузу
    isCharacterDialogOpen = true;
    window.isCharacterDialogOpen = true;
    if (typeof lastGameTickTime !== 'undefined') {
      lastGameTickTime = Date.now();
    }

    // Скрываем утку на основном экране пока открыт диалог
    document.body.classList.add('has-character-dialog');
    const mainDuck = document.getElementById('duck');
    if (mainDuck) mainDuck.style.visibility = 'hidden';

    // Режим без персонажей: Вступление (intro), Прощание (outro) или повествование
    const isNarrative = (config.type === 'intro' || config.type === 'outro' || config.noCharacters === true);
    const layoutEl = document.getElementById('characterDialogLayout');
    if (layoutEl) {
      layoutEl.classList.toggle('is-narrative', isNarrative);
    }

    // 1. Левый персонаж (Уточка, слева в центре левой трети)
    const charLeft = config.characterLeft || (config.characters && config.characters.left) || config.character || {};
    const leftWrap = document.getElementById('characterPeekingWrapLeft') || document.querySelector('.character-peeking-wrap.character-left');
    const speechEl = document.getElementById('characterSpeechText');
    const speechBubble = document.getElementById('characterSpeechBubble');
    if (speechEl) {
      speechEl.textContent = charLeft.speechText || 'Кря, приятной игры';
      if (speechBubble) speechBubble.style.display = (charLeft.speechText === '' || isNarrative) ? 'none' : 'block';
    }

    const peekingImg = document.getElementById('characterPeekingImg');
    const peekingFallback = document.getElementById('characterPeekingFallback');

    // Определение аватара: по умолчанию используется текущий надетый скин игрока
    let avatarUrl;
    if (charLeft.avatar && charLeft.avatar !== 'current_player_skin') {
      avatarUrl = charLeft.avatar;
    } else {
      const curSkinId = (typeof getCurrentSkin === 'function') ? getCurrentSkin() : 'default';
      avatarUrl = (typeof SKINS_DATA !== 'undefined' && SKINS_DATA[curSkinId] && SKINS_DATA[curSkinId].img) ||
                  (window.ASSETS && ASSETS.skins && (ASSETS.skins[curSkinId] || ASSETS.skins.default)) ||
                  'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/skins/duck-default.png';
    }

    if (peekingImg) {
      peekingImg.src = avatarUrl;
      peekingImg.style.display = 'block';
      if (peekingFallback) peekingFallback.style.display = 'none';
    }

    // 1b. Правый персонаж (второй персонаж в центре правой трети)
    const charRight = config.characterRight || (config.characters && config.characters.right) || null;
    const rightWrap = document.getElementById('characterPeekingWrapRight');
    if (rightWrap) {
      if (charRight && !isNarrative) {
        rightWrap.style.visibility = 'visible';
        rightWrap.style.display = 'flex';
        const rightSpeechEl = document.getElementById('characterSpeechTextRight');
        const rightBubble = document.getElementById('characterSpeechBubbleRight');
        if (rightSpeechEl && charRight.speechText) {
          rightSpeechEl.textContent = charRight.speechText;
          if (rightBubble) rightBubble.style.display = 'block';
        } else if (rightBubble) {
          rightBubble.style.display = 'none';
        }

        const rightImg = document.getElementById('characterPeekingImgRight');
        const rightFallback = document.getElementById('characterPeekingFallbackRight');
        if (rightImg && charRight.avatar) {
          rightImg.src = charRight.avatar;
          rightImg.style.display = 'block';
          if (rightFallback) rightFallback.style.display = 'none';
        }
      } else {
        rightWrap.style.visibility = isNarrative ? 'hidden' : 'hidden';
        rightWrap.style.display = isNarrative ? 'none' : 'flex';
        const rightBubble = document.getElementById('characterSpeechBubbleRight');
        if (rightBubble) rightBubble.style.display = 'none';
      }
    }

    if (leftWrap) {
      leftWrap.style.display = isNarrative ? 'none' : 'flex';
    }

    // 1c. Настройка говорящего персонажа (speaker: 'left' | 'right' | 'both' | 'none')
    const speaker = config.speaker || (charLeft.isSpeaking ? 'left' : (charRight && charRight.isSpeaking ? 'right' : (charLeft.speechText && !charRight?.speechText ? 'left' : (charRight?.speechText && !charLeft.speechText ? 'right' : 'both'))));
    if (!isNarrative) {
      if (leftWrap) {
        leftWrap.classList.toggle('is-speaking', speaker === 'left' || speaker === 'both');
        leftWrap.classList.toggle('is-silent', speaker === 'right' || speaker === 'none');
      }
      if (rightWrap && charRight) {
        rightWrap.classList.toggle('is-speaking', speaker === 'right' || speaker === 'both');
        rightWrap.classList.toggle('is-silent', speaker === 'left' || speaker === 'none');
      }
    }

    // 1d. Индивидуальный размер/масштаб каждого персонажа
    if (leftWrap) {
      const leftScale = (typeof charLeft.scale === 'number') ? charLeft.scale : (charLeft.size ? (charLeft.size / 105) : 1);
      if (leftScale !== 1) {
        leftWrap.style.setProperty('--char-scale', leftScale);
      } else {
        leftWrap.style.removeProperty('--char-scale');
      }
    }
    if (rightWrap) {
      const rightScale = (typeof charRight?.scale === 'number') ? charRight.scale : (charRight?.size ? (charRight.size / 105) : 1);
      if (charRight && rightScale !== 1) {
        rightWrap.style.setProperty('--char-scale', rightScale);
      } else {
        rightWrap.style.removeProperty('--char-scale');
      }
    }

    // 2. Центральное окно (текст и бейдж)
    const content = config.content || {};
    const titleEl = document.getElementById('characterDialogTitle');
    const badgeHeader = document.querySelector('.character-dialog-card-header');
    const shouldHideBadge = Boolean(config.hideBadge || content.hideBadge || config.hideTitle || content.hideTitle);
    if (badgeHeader) {
      badgeHeader.style.display = shouldHideBadge ? 'none' : 'flex';
    }
    if (titleEl) {
      titleEl.textContent = content.title || 'Duckventure';
    }

    const bodyEl = document.getElementById('characterDialogBody');
    if (bodyEl) {
      if (content.html) {
        bodyEl.innerHTML = content.html;
      } else if (content.text) {
        // Если передан простой текст, форматируем абзацами
        const paragraphs = content.text.split('\n\n');
        bodyEl.innerHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
      }
    }

    // 3. Эксклюзивный чекбокс (например "Больше не показывать это сообщение")
    const cbWrap = document.getElementById('characterDialogCheckboxWrap');
    const cbInput = document.getElementById('characterDialogDontShowCheckbox');
    const cbLabel = document.getElementById('characterDialogCheckboxLabel');
    if (cbWrap && cbInput) {
      if (content.dontShowKey) {
        cbWrap.style.display = 'flex';
        cbInput.checked = false;
        if (cbLabel) {
          cbLabel.textContent = content.dontShowLabel || 'Больше не показывать это сообщение';
        }
      } else {
        cbWrap.style.display = 'none';
      }
    }

    // 4. Кнопки внизу
    const actionsEl = document.getElementById('characterDialogActions');
    if (actionsEl) {
      actionsEl.innerHTML = '';
      const buttons = (config.buttons && config.buttons.length > 0)
        ? config.buttons
        : [{
            text: 'Начать игру',
            primary: true,
            onClick: () => closeCharacterDialog()
          }];

      buttons.forEach(btnConfig => {
        const btn = document.createElement('button');
        btn.className = 'character-dialog-btn' + (btnConfig.primary ? ' primary' : '');
        btn.id = btnConfig.id || 'characterDialogStartBtn';
        btn.textContent = btnConfig.text || 'ОК';
        btn.addEventListener('click', () => {
          if (typeof btnConfig.onClick === 'function') {
            btnConfig.onClick();
          } else {
            closeCharacterDialog();
          }
        });
        actionsEl.appendChild(btn);
      });
    }

    // 5. Анимированное появление
    modal.classList.remove('closing');
    modal.style.display = 'flex';
    // Принудительный reflow для запуска CSS-перехода
    void modal.offsetHeight;
    modal.classList.add('open');

    // Звук появления диалога
    if (typeof corkPopSound === 'function') {
      try { corkPopSound(); } catch (e) {}
    }
  }

  /**
   * Закрывает активное диалоговое окно персонажа
   * @param {boolean} [immediate=false] - Закрыть немедленно без анимации
   */
  function closeCharacterDialog(immediate = false) {
    const modal = document.getElementById('characterDialogModal');
    if (!modal) return;

    if (dialogCloseTimeout) {
      clearTimeout(dialogCloseTimeout);
      dialogCloseTimeout = null;
    }

    // Проверяем состояние чекбокса "Больше не показывать"
    if (activeDialogConfig && activeDialogConfig.content && activeDialogConfig.content.dontShowKey) {
      const cbInput = document.getElementById('characterDialogDontShowCheckbox');
      if (cbInput && cbInput.checked) {
        try {
          Storage.set(activeDialogConfig.content.dontShowKey, '1');
        } catch (e) {}
      }
    }

    // Снимаем блокировку игры и восстанавливаем утку на основном экране
    document.body.classList.remove('has-character-dialog');
    const mainDuckEl = document.getElementById('duck');
    if (mainDuckEl) mainDuckEl.style.visibility = '';

    isCharacterDialogOpen = false;
    window.isCharacterDialogOpen = false;
    if (typeof lastGameTickTime !== 'undefined') {
      lastGameTickTime = Date.now();
    }

    const finalizeClose = () => {
      modal.classList.remove('open', 'closing');
      modal.style.display = 'none';
      const layoutEl = document.getElementById('characterDialogLayout');
      if (layoutEl) layoutEl.classList.remove('is-narrative');
      const leftW = document.getElementById('characterPeekingWrapLeft') || document.querySelector('.character-peeking-wrap.character-left');
      const rightW = document.getElementById('characterPeekingWrapRight');
      if (leftW) {
        leftW.classList.remove('is-speaking', 'is-silent');
        leftW.style.display = '';
        leftW.style.removeProperty('--char-scale');
      }
      if (rightW) {
        rightW.classList.remove('is-speaking', 'is-silent');
        rightW.style.display = '';
        rightW.style.removeProperty('--char-scale');
      }
      const bHeader = document.querySelector('.character-dialog-card-header');
      if (bHeader) bHeader.style.display = 'flex';
      if (activeDialogConfig && typeof activeDialogConfig.onClose === 'function') {
        activeDialogConfig.onClose();
      }
      activeDialogConfig = null;
    };

    if (immediate) {
      finalizeClose();
    } else {
      modal.classList.add('closing');
      modal.classList.remove('open');
      if (typeof quack === 'function') {
        try { quack(); } catch (e) {}
      }
      dialogCloseTimeout = setTimeout(finalizeClose, 280);
    }
  }

  /**
   * Отображает приветственное диалоговое окно в начале новой игры
   * @returns {boolean} Было ли показано окно
   */
  function showWelcomeDialog() {
    // Если игрок выбрал "Больше не показывать это сообщение", не показываем
    const isSuppressed = Storage.getBoolean(DONT_SHOW_WELCOME_DIALOG_KEY, false);
    if (isSuppressed) return false;

    showCharacterDialog({
      character: {
        name: 'Уточка',
        avatar: (window.ASSETS ? ASSETS.skins.default : 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/skins/duck-default.png'),
        speechText: 'Кря, приятной игры',
        position: 'left'
      },
      content: {
        title: 'Duckventure',
        html: `
          <p class="dialog-text-lead">Добро пожаловать в <strong>Duckventure</strong> — игру кликер с пачкой иммерсивных механик. Не бойтесь экспериментировать, если вы играли в Альфа-версию, попробуйте использовать старые предметы по-новому.</p>
          <p class="dialog-text-sub">Всем хорошего путешествия!</p>
        `,
        dontShowKey: DONT_SHOW_WELCOME_DIALOG_KEY,
        dontShowLabel: 'Больше не показывать это сообщение'
      },
      buttons: [
        {
          id: 'characterDialogStartBtn',
          text: 'Начать игру',
          primary: true,
          onClick: () => closeCharacterDialog()
        }
      ]
    });

    return true;
  }

  /* ==========================================================================
     Сюжетный диалог: Таинственная тёмная утка (через 2 минуты игры)
     ========================================================================== */
  const DARK_DUCK_DIALOG_TREE = {
    id: "new_dialog_dark_duck_1",
    title: "Таинственный незнакомец",
    startNode: "start",
    nodes: {
      "start": {
        id: "start",
        type: "intro",
        title: "Здесь есть кто-то ещё",
        speaker: "none",
        text: "Краем глаза вы замечаете незнакомую фигуру!\nОбернувшись, вы видите тёмный силуэт: он стоит почти неподвижно, лишь порванный плащ развевается на ветру.\nКапюшон оттеняет лицо незнакомца, а под ним лежат различные металлические предметы.\nИнтересно, кто он?\nПрежде чем вы успеваете обдумать это, незнакомец начинает говорить...",
        choices: [
          { text: ">", target: "step_2", style: "default" }
        ],
        hideBadge: false
      },
      "step_2": {
        id: "step_2",
        type: "dialogue",
        title: "Встреча",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        leftCharSize: 90,
        rightCharSize: 180,
        text: "Здравствуй.\nВижу, ты здесь недавно...",
        choices: [
          { text: "Да, я здесь недавно, вроде как...", target: "step_3", style: "primary" },
          { text: "Кря", target: "step_8", style: "primary" },
          { text: "Промолчать", target: "step_11", style: "default" }
        ],
        hideBadge: true
      },
      "step_3": {
        id: "step_3",
        type: "dialogue",
        title: "Ответ незнакомцу",
        speaker: "left",
        leftAvatar: "current_player_skin",
        leftSpeech: "",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "Продолжай...",
        leftCharSize: 100,
        rightCharSize: 180,
        text: "Да, я здесь недавно, вроде как...\nНа самом деле я практически ничего не помню...",
        choices: [
          { text: ">", target: "step_4", style: "default" }
        ],
        hideBadge: true
      },
      "step_4": {
        id: "step_4",
        type: "dialogue",
        title: "Вопрос о цели",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        rightCharSize: 180,
        text: "То есть, зачем ты здесь, тоже не помнишь?",
        choices: [
          { text: "Ну я...", target: "step_5", style: "primary" }
        ],
        hideBadge: true
      },
      "step_5": {
        id: "step_5",
        type: "dialogue",
        title: "Попытка вспомнить",
        speaker: "left",
        leftAvatar: "current_player_skin",
        leftSpeech: "",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "Продолжай...",
        leftCharSize: 100,
        rightCharSize: 180,
        text: "Ну я... да...\nНичего не помню...\nТы знаешь, кто я?",
        choices: [
          { text: ">", target: "step_6", style: "default" }
        ],
        hideBadge: true
      },
      "step_6": {
        id: "step_6",
        type: "dialogue",
        title: "Дар незнакомца",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        rightCharSize: 180,
        text: "Понятно...\nЧто ж, никто не знает в начале пути, кто он на самом деле.\nВажно, кем ты станешь в конце своего путешествия...\nПрими этот дар, отказ не принимается.",
        choices: [
          { text: "Далее", target: "outro_8", style: "primary" }
        ],
        hideBadge: true
      },
      "step_8": {
        id: "step_8",
        type: "dialogue",
        title: "Утиный ответ",
        speaker: "left",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря!",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "Продолжай...",
        leftCharSize: 100,
        rightCharSize: 180,
        text: "Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря! Кря!",
        choices: [
          { text: ">", target: "step_9", style: "default" }
        ],
        hideBadge: true
      },
      "step_9": {
        id: "step_9",
        type: "dialogue",
        title: "Реакция незнакомца",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        rightCharSize: 180,
        text: "Кажется, всё намного хуже, чем я думал...\nНадеюсь, несмотря на это, ты способен выполнить своё предназначение...",
        choices: [
          { text: "Кря!", target: "step_10", style: "primary" },
          { text: "На самом деле я умею разговаривать...", target: "step_10", style: "primary" }
        ],
        hideBadge: true
      },
      "step_10": {
        id: "step_10",
        type: "dialogue",
        title: "Подарок",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        rightCharSize: 180,
        text: "Понятно...\nВ общем, сейчас это уже не важно.\nВозьми-ка вот это.",
        choices: [
          { text: ">", target: "outro_8", style: "default" }
        ],
        hideBadge: true
      },
      "step_11": {
        id: "step_11",
        type: "dialogue",
        title: "Молчание",
        speaker: "right",
        leftAvatar: "current_player_skin",
        leftSpeech: "Кря",
        rightAvatar: (window.ASSETS && ASSETS.characters && ASSETS.characters.susDuck) || "https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/characters/sus-duck.png",
        rightSpeech: "",
        rightCharSize: 180,
        text: "Неразговорчивый, как я посмотрю...\nРади приличия, может, ответишь мне?",
        choices: [
          { text: "Привет?", target: "step_10", style: "primary" },
          { text: "Промолчать", target: "step_10", style: "default" }
        ],
        hideBadge: true
      },
      "outro_8": {
        id: "outro_8",
        type: "outro",
        title: "Таинственная фигура уходит",
        speaker: "none",
        text: "Фигура исчезает, как только вы отвлекаетесь, чтобы рассмотреть подарок незнакомца.\nНа земле остаётся лежать карта, и вы с ходу понимаете, что она не принадлежит этому миру.\nИнтересно, для чего она...",
        choices: [
          { text: ">", target: "end", style: "default" }
        ],
        hideBadge: false
      }
    }
  };

  function launchDarkDuckQuestDialog() {
    const tree = DARK_DUCK_DIALOG_TREE;

    function openStep(stepId) {
      if (!stepId || stepId === 'end' || !tree.nodes[stepId]) {
        closeCharacterDialog();
        return;
      }
      const step = tree.nodes[stepId];
      showCharacterDialog({
        type: step.type || 'dialogue',
        speaker: step.speaker || 'left',
        characterLeft: {
          avatar: (step.leftAvatar && step.leftAvatar !== 'current_player_skin') ? step.leftAvatar : undefined,
          speechText: step.leftSpeech || '',
          size: step.leftCharSize || 105
        },
        characterRight: step.rightAvatar ? {
          avatar: step.rightAvatar,
          speechText: step.rightSpeech || '',
          size: step.rightCharSize || 105
        } : null,
        content: {
          title: step.title || tree.title,
          hideBadge: Boolean(step.hideBadge),
          text: step.text || ''
        },
        buttons: (step.choices && step.choices.length > 0) ? step.choices.map(c => ({
          text: c.text,
          primary: c.style === 'primary',
          onClick: () => {
            if (c.reward && typeof earnDuckles === 'function' && c.reward.type === 'duckles') {
              earnDuckles(c.reward.amount || 0);
            }
            openStep(c.target);
          }
        })) : [{
          text: 'Завершить',
          primary: true,
          onClick: () => closeCharacterDialog()
        }]
      });
    }

    openStep(tree.startNode || 'start');
  }

  // Экспорт в глобальное пространство
  window.launchDarkDuckQuestDialog = launchDarkDuckQuestDialog;
  window.DARK_DUCK_DIALOG_TREE = DARK_DUCK_DIALOG_TREE;
  window.showCharacterDialog = showCharacterDialog;
  window.closeCharacterDialog = closeCharacterDialog;
  window.showWelcomeDialog = showWelcomeDialog;

})();
