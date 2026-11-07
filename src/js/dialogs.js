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

    // 1. Левый персонаж (Уточка, всегда слева в центре левой трети)
    const charLeft = config.characterLeft || (config.characters && config.characters.left) || config.character || {};
    const speechEl = document.getElementById('characterSpeechText');
    const speechBubble = document.getElementById('characterSpeechBubble');
    if (speechEl) {
      speechEl.textContent = charLeft.speechText || 'Кря, приятной игры';
      if (speechBubble) speechBubble.style.display = (charLeft.speechText === '') ? 'none' : 'block';
    }

    const peekingImg = document.getElementById('characterPeekingImg');
    const peekingFallback = document.getElementById('characterPeekingFallback');
    const avatarUrl = charLeft.avatar || (window.ASSETS ? ASSETS.skins.default : 'https://cdn.jsdelivr.net/gh/Stainty/Duckventure@master/src/assets/images/skins/duck-default.png');
    if (peekingImg) {
      peekingImg.src = avatarUrl;
      peekingImg.style.display = 'block';
      if (peekingFallback) peekingFallback.style.display = 'none';
    }

    // 1b. Правый персонаж (второй персонаж в центре правой трети)
    const charRight = config.characterRight || (config.characters && config.characters.right) || null;
    const rightWrap = document.getElementById('characterPeekingWrapRight');
    if (rightWrap) {
      if (charRight) {
        rightWrap.style.visibility = 'visible';
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
        // Оставляем как невидимый элемент-распорку для сбалансированной 3-колоночной сетки
        rightWrap.style.visibility = 'hidden';
        const rightBubble = document.getElementById('characterSpeechBubbleRight');
        if (rightBubble) rightBubble.style.display = 'none';
      }
    }

    // 2. Центральное окно (текст)
    const content = config.content || {};
    const titleEl = document.getElementById('characterDialogTitle');
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

  // Экспорт в глобальное пространство
  window.showCharacterDialog = showCharacterDialog;
  window.closeCharacterDialog = closeCharacterDialog;
  window.showWelcomeDialog = showWelcomeDialog;

})();
